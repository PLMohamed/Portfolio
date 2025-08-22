import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const FORM_SCHEMA = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  is_read: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export type FormType = typeof FORM_SCHEMA.$inferSelect;
export type FormInsert = typeof FORM_SCHEMA.$inferInsert;
