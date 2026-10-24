import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";
import type { Client } from "pg";
import { resetTables, testPool } from "@/test/db";
import { describeWithDatabase } from "@/test/describe-with-db";

let client: Client;

await describeWithDatabase("project queries (database)", () => {
  beforeAll(async () => {
    client = testPool();
    await client.connect();
  });

  afterAll(async () => {
    await client?.end();
  });

  beforeEach(async () => {
    await resetTables(client);
    await client.query(`
      INSERT INTO "projects" (id, title, description, sort_order, stack, is_visible)
      VALUES
        ('11111111-1111-1111-1111-111111111111', 'Alpha',   'First project',  2, ARRAY['React'],      true),
        ('22222222-2222-2222-2222-222222222222', 'Bravo',   'Second project', 1, ARRAY['Next.js'],    true),
        ('33333333-3333-3333-3333-333333333333', 'Charlie', 'Third project',  3, ARRAY['Typescript'], true),
        ('44444444-4444-4444-4444-444444444444', 'Delta',   'Hidden project', 0, ARRAY['Python'],     false)
    `);
  });

  it("stores and returns sort_order and stack", async () => {
    const { rows } = await client.query(
      'SELECT sort_order, stack FROM "projects" WHERE title = $1',
      ["Bravo"],
    );
    expect(rows[0].sort_order).toBe(1);
    expect(rows[0].stack).toEqual(["Next.js"]);
  });

  it("orders public projects by sort_order ascending", async () => {
    const { rows } = await client.query(
      'SELECT title FROM "projects" WHERE is_visible = true ORDER BY sort_order ASC',
    );
    expect(rows.map((r) => r.title)).toEqual(["Bravo", "Alpha", "Charlie"]);
  });

  it("excludes hidden projects from the public list", async () => {
    const { rows } = await client.query(
      'SELECT title FROM "projects" WHERE is_visible = true',
    );
    expect(rows.map((r) => r.title)).not.toContain("Delta");
  });

  it("searches by title and description", async () => {
    const { rows } = await client.query(
      'SELECT title FROM "projects" WHERE title ILIKE $1 OR description ILIKE $1',
      ["%Second%"],
    );
    expect(rows.map((r) => r.title)).toEqual(["Bravo"]);
  });

  it("defaults sort_order to 0 and stack to an empty array", async () => {
    const { rows } = await client.query(
      'INSERT INTO "projects" (title, description) VALUES ($1, $2) RETURNING sort_order, stack',
      ["Epsilon", "New project"],
    );
    expect(rows[0].sort_order).toBe(0);
    expect(rows[0].stack).toEqual([]);
  });
});
