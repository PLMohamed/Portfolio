import { describe, expect, it } from "vitest";
import { getTestDatabaseUrl, hasTestDatabase } from "./db";

describe("test database isolation guard", () => {
  it("derives a URL whose database name ends in _test", () => {
    delete process.env.TEST_DATABASE_URL;
    const name = new URL(getTestDatabaseUrl()!).pathname.slice(1);
    console.log("DERIVED DB NAME:", name);
    expect(name.endsWith("_test")).toBe(true);
  });

  it("REFUSES a test URL pointing at the real dev database", () => {
    process.env.TEST_DATABASE_URL = "postgresql://u:p@127.0.0.1:5432/portfolio";
    expect(() => hasTestDatabase()).toThrow(/_test/);
    delete process.env.TEST_DATABASE_URL;
  });

  it("REFUSES when TEST_DATABASE_URL equals DATABASE_URL", () => {
    process.env.TEST_DATABASE_URL = "postgresql://u:p@h:5432/portfolio_test";
    process.env.DATABASE_URL = "postgresql://u:p@h:5432/portfolio_test";
    expect(() => hasTestDatabase()).toThrow(/equals DATABASE_URL/);
    delete process.env.TEST_DATABASE_URL;
    delete process.env.DATABASE_URL;
  });

  it("ACCEPTS a properly isolated test URL", () => {
    process.env.TEST_DATABASE_URL = "postgresql://u:p@h:5432/portfolio_test";
    delete process.env.DATABASE_URL;
    expect(hasTestDatabase()).toBe(true);
    delete process.env.TEST_DATABASE_URL;
  });
});
