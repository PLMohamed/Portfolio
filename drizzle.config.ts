import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export default defineConfig({
  out: "./migrations",
  schema: "./src/db/schema",
  dialect: "postgresql",
  breakpoints: true,
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
