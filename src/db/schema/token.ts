import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { USER_SCHEMA } from "./user";

export const TOKEN_SCHEMA = pgTable("tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => USER_SCHEMA.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});

export type TokenType = typeof TOKEN_SCHEMA.$inferSelect;
export type TokenInsert = typeof TOKEN_SCHEMA.$inferInsert;
