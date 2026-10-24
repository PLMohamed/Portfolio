/**
 * Creates the isolated test database and applies the tracked migrations.
 * Run with: pnpm run test:setup
 *
 * This only ever touches a database whose name ends in "_test".
 */
import "dotenv/config";
import { Client } from "pg";
import {
  ensureTestDatabase,
  getTestDatabaseUrl,
  migrateTestDatabase,
} from "../src/test/db";

async function main() {
  const url = getTestDatabaseUrl();

  if (!url) {
    console.error(
      "Could not determine a test database URL.\n" +
        "Set TEST_DATABASE_URL, or make sure .env has DATABASE_USER and DATABASE_PASSWORD.",
    );
    process.exit(1);
  }

  const name = new URL(url).pathname.slice(1);

  if (!name.endsWith("_test")) {
    console.error(`Refusing to set up "${name}": it must end in "_test".`);
    process.exit(1);
  }

  await ensureTestDatabase();

  const client = new Client({ connectionString: url });
  await client.connect();
  try {
    await client.query("DROP SCHEMA public CASCADE");
    await client.query("CREATE SCHEMA public");
  } finally {
    await client.end();
  }
  console.log(`✓ database ready: ${name}`);

  await migrateTestDatabase();
  console.log("✓ migrations applied");
}

main().catch((error) => {
  console.error("✗ test database setup failed:", error.message);
  process.exit(1);
});
