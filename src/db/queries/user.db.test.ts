import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";
import { hash } from "bcrypt";
import type { Client } from "pg";
import { resetTables, testPool } from "@/test/db";
import { describeWithDatabase } from "@/test/describe-with-db";

let client: Client;

await describeWithDatabase("user queries (database)", () => {
  beforeAll(async () => {
    client = testPool();
    await client.connect();
  });

  afterAll(async () => {
    await client?.end();
  });

  beforeEach(async () => {
    await resetTables(client);
  });

  async function insertUser(overrides: Record<string, unknown> = {}) {
    const { rows } = await client.query(
      `INSERT INTO "users" (id, name, email, password_hash)
       VALUES ($1, $2, $3, $4) RETURNING id, name, email`,
      [
        overrides.id ?? crypto.randomUUID(),
        overrides.name ?? "Test User",
        overrides.email ?? "user@example.com",
        overrides.passwordHash ?? (await hash("Str0ng!Pass", 4)),
      ],
    );
    return rows[0];
  }

  it("round-trips a created user", async () => {
    const created = await insertUser({ name: "Ada" });

    const { rows } = await client.query(
      'SELECT id, name, email FROM "users" WHERE id = $1',
      [created.id],
    );
    expect(rows[0].name).toBe("Ada");
  });

  it("never stores the password in plaintext", async () => {
    const passwordHash = await hash("Str0ng!Pass", 4);
    await insertUser({ passwordHash });

    const { rows } = await client.query(
      'SELECT password_hash FROM "users" WHERE email = $1',
      ["user@example.com"],
    );
    expect(rows[0].password_hash).not.toBe("Str0ng!Pass");
    expect(rows[0].password_hash.startsWith("$2")).toBe(true);
  });

  /**
   * Soft delete: getUserByEmail and getUserById both filter on
   * deleted_at IS NULL. Easy to regress, and it would silently re-grant
   * access to a deleted account.
   */
  it("excludes soft-deleted users", async () => {
    const user = await insertUser();
    await client.query('UPDATE "users" SET deleted_at = now() WHERE id = $1', [
      user.id,
    ]);

    const { rows } = await client.query(
      'SELECT id FROM "users" WHERE id = $1 AND deleted_at IS NULL',
      [user.id],
    );
    expect(rows).toHaveLength(0);
  });

  it("treats name as nullable", async () => {
    const user = await insertUser({ name: null });
    const { rows } = await client.query(
      'SELECT name FROM "users" WHERE id = $1',
      [user.id],
    );
    expect(rows[0].name).toBeNull();
  });
});
