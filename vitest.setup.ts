import "dotenv/config";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Ensure application code imported by integration tests uses the isolated
// database rather than the normal development database.
if (process.env.TEST_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL.replace(
    "localhost",
    "127.0.0.1",
  );
}

afterEach(() => {
  cleanup();
});
