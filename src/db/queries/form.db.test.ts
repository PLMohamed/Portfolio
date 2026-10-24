import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";
import type { Client } from "pg";
import { resetTables, testPool } from "@/test/db";
import { describeWithDatabase } from "@/test/describe-with-db";

let client: Client;

await describeWithDatabase("form queries (database)", () => {
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

  it("stores a submission as unread by default", async () => {
    const { rows } = await client.query(
      `INSERT INTO "forms" (full_name, email, subject, message)
       VALUES ($1, $2, $3, $4) RETURNING is_read`,
      ["Ada Lovelace", "ada@example.com", "Hello", "A message body."],
    );
    expect(rows[0].is_read).toBe(false);
  });

  it("can mark a submission as read and back", async () => {
    const { rows } = await client.query(
      `INSERT INTO "forms" (full_name, email, subject, message)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      ["Ada", "ada@example.com", "Hello", "A message body."],
    );
    const id = rows[0].id;

    await client.query('UPDATE "forms" SET is_read = true WHERE id = $1', [id]);
    const read = await client.query(
      'SELECT is_read FROM "forms" WHERE id = $1',
      [id],
    );
    expect(read.rows[0].is_read).toBe(true);

    await client.query('UPDATE "forms" SET is_read = false WHERE id = $1', [
      id,
    ]);
    const unread = await client.query(
      'SELECT is_read FROM "forms" WHERE id = $1',
      [id],
    );
    expect(unread.rows[0].is_read).toBe(false);
  });

  it("returns the deleted row when deleting a submission", async () => {
    const { rows } = await client.query(
      `INSERT INTO "forms" (full_name, email, subject, message)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      ["Ada", "ada@example.com", "Hello", "A message body."],
    );

    const deleted = await client.query(
      'DELETE FROM "forms" WHERE id = $1 RETURNING id',
      [rows[0].id],
    );
    expect(deleted.rows).toHaveLength(1);

    const remaining = await client.query(
      'SELECT id FROM "forms" WHERE id = $1',
      [rows[0].id],
    );
    expect(remaining.rows).toHaveLength(0);
  });
});
