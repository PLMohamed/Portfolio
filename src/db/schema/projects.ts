import { sql } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

export const PROJECT_SCHEMA = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  image_url: varchar("image_url", { length: 255 }),
  preview_link: varchar("preview_link", { length: 255 }),
  source_link: varchar("source_link", { length: 255 }),
  download_link: varchar("download_link", { length: 255 }),
  is_visible: boolean("is_visible").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});

export type ProjectType = typeof PROJECT_SCHEMA.$inferSelect;
export type ProjectInsert = typeof PROJECT_SCHEMA.$inferInsert;
