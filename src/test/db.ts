import { Client } from "pg";
import { readFileSync, readdirSync } from "fs";
import path from "path";

/**
 * Helpers for tests that need a real database.
 *
 * Safety rules, enforced here rather than trusted to the caller:
 *  - only ever connects to a database whose name ends in "_test"
 *  - refuses to run if TEST_DATABASE_URL points at DATABASE_URL
 *  - never reads a webhook, blob or redis credential
 */

const TEST_DB_SUFFIX = "_test";

function readDotEnv(): Record<string, string> {
  const raw = readFileSync(path.join(process.cwd(), ".env"), "utf8");
  const out: Record<string, string> = {};

  for (const line of raw.split("\n")) {
    // Strip a trailing CR: .env files on Windows use CRLF, and leaving it in
    // would corrupt credentials and produce a malformed connection URL.
    const clean = line.replace(/\r$/, "");
    const match = clean.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && match[2] !== "") out[match[1]] = match[2];
  }
  return out;
}

function databaseNameOf(url: string): string {
  try {
    return decodeURIComponent(new URL(url).pathname.replace(/^\//, ""));
  } catch {
    return "";
  }
}

/**
 * Builds the test connection string from the dev credentials, forcing the
 * database name to end in "_test" so a typo cannot point at real data.
 */
export function getTestDatabaseUrl(): string | null {
  const explicit = process.env.TEST_DATABASE_URL;
  if (explicit) return explicit;

  const env = readDotEnv();
  if (!env.DATABASE_USER || !env.DATABASE_PASSWORD) return null;

  const name = `${env.DATABASE_NAME ?? "portfolio"}${TEST_DB_SUFFIX}`;
  return `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@127.0.0.1:${env.DATABASE_PORT ?? "5432"}/${name}`;
}

/** True when a usable, isolated test database is configured. */
export function hasTestDatabase(): boolean {
  const url = getTestDatabaseUrl();
  if (!url) return false;

  const name = databaseNameOf(url);
  if (!name.endsWith(TEST_DB_SUFFIX)) {
    throw new Error(
      `Refusing to use test database "${name}": name must end in "${TEST_DB_SUFFIX}".`,
    );
  }

  if (process.env.DATABASE_URL && url === process.env.DATABASE_URL) {
    throw new Error("Refusing to run: TEST_DATABASE_URL equals DATABASE_URL.");
  }

  return true;
}

/** Creates the test database if it does not exist. Safe to call repeatedly. */
export async function ensureTestDatabase(): Promise<void> {
  const url = getTestDatabaseUrl();
  if (!url) throw new Error("Could not determine a test database URL.");

  const target = databaseNameOf(url);
  if (!target.endsWith(TEST_DB_SUFFIX)) {
    throw new Error(
      `Refusing to create "${target}": name must end in "${TEST_DB_SUFFIX}".`,
    );
  }

  const base = new URL(url);
  const admin = new Client({
    host: base.hostname,
    port: Number(base.port || 5432),
    user: decodeURIComponent(base.username),
    password: decodeURIComponent(base.password),
    database: "postgres",
  });

  await admin.connect();
  try {
    const { rows } = await admin.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [target],
    );
    if (rows.length === 0) {
      await admin.query(`CREATE DATABASE "${target}"`);
    }
  } finally {
    await admin.end();
  }
}

/** Applies every tracked SQL migration to the test database. */
export async function migrateTestDatabase(): Promise<void> {
  const url = getTestDatabaseUrl();
  if (!url) throw new Error("Could not determine a test database URL.");

  const dir = path.join(process.cwd(), "migrations");
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const client = new Client({ connectionString: url });
  await client.connect();
  try {
    for (const file of files) {
      const sql = readFileSync(path.join(dir, file), "utf8")
        // Migrations ship wrapped in a /* ... */ block.
        .replace(/^\/\*[\s\S]*?\*\//m, "")
        .split("--> statement-breakpoint")
        .map((s) => s.trim())
        .filter(Boolean);

      for (const statement of sql) {
        await client.query(statement);
      }
    }
  } finally {
    await client.end();
  }
}

/** A pool connected to the isolated test database. */
export function testPool() {
  const url = getTestDatabaseUrl();
  if (!url) throw new Error("Could not determine a test database URL.");
  return new Client({ connectionString: url });
}

/** Empties the tables used by tests, leaving the schema in place. */
export async function resetTables(): Promise<void> {
  const client = testPool();
  await client.connect();
  try {
    await client.query(
      'TRUNCATE TABLE "projects", "forms", "tokens", "users" RESTART IDENTITY CASCADE',
    );
  } finally {
    await client.end();
  }
}

export const testDatabaseAvailable = () => {
  try {
    return hasTestDatabase();
  } catch {
    return false;
  }
};

/**
 * True when the test database is configured AND reachable.
 * Configured-but-down (e.g. Docker stopped) should skip, not fail.
 */
export async function isTestDatabaseReachable(): Promise<boolean> {
  if (!testDatabaseAvailable()) return false;

  let client: Client | undefined;
  try {
    client = testPool();
    await client.connect();
    return true;
  } catch {
    return false;
  } finally {
    await client?.end().catch(() => {});
  }
}
