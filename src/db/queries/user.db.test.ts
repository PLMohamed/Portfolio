import { db } from "@/db";
import { describeWithDatabase } from "@/test/describe-with-db";
import { hash } from "bcrypt";
import { sql } from "drizzle-orm";
import { expect, it } from "vitest";
import { USER_SCHEMA } from "../schema";
import { createUser, getUserByEmail, getUserById } from "./user";

await describeWithDatabase("user queries (database)", () => {
  it("round-trips a created user", async () => {
    const created = await createUser({
      name: "Ada",
      email: "ada@example.com",
      passwordHash: await hash("Str0ng!Pass", 4),
    });

    const rows = await getUserById(created.insertedId);
    expect(rows?.name).toBe("Ada");
  });

  it("never stores the password in plaintext", async () => {
    const passwordHash = await hash("Str0ng!Pass", 4);
    const created = await createUser({
      name: "Alice",
      email: "alice-password@example.com",
      passwordHash,
    });

    const user = await getUserById(created.insertedId, {
      passwordHash: USER_SCHEMA.passwordHash,
    });
    expect(user?.passwordHash).not.toBe("Str0ng!Pass");
    expect(user?.passwordHash.startsWith("$2")).toBe(true);
  });

  it("excludes soft-deleted users", async () => {
    const email = "deleted@example.com";
    const created = await createUser({
      name: "Deleted User",
      email,
      passwordHash: await hash("Str0ng!Pass", 4),
    });

    await db.execute(
      sql`UPDATE "users" SET "deleted_at" = now() WHERE "id" = ${created.insertedId}`,
    );

    expect(await getUserById(created.insertedId)).toBeNull();
    expect(await getUserByEmail(email)).toBeNull();
  });

  it("treats name as nullable", async () => {
    const created = await createUser({
      name: null,
      email: "alice-nullable@example.com",
      passwordHash: await hash("Str0ng!Pass", 4),
    });

    const user = await getUserById(created.insertedId);
    expect(user?.name).toBeNull();
  });
});
