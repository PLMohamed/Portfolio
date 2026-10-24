import { describe } from "vitest";
import { isTestDatabaseReachable } from "./db";

/**
 * A describe block that only runs when a reachable, isolated test database is
 * available. Skips otherwise, so contributors without a database (or with
 * Docker stopped) can still run the rest of the suite.
 *
 * Usage: `await describeWithDatabase("name", () => { ... });`
 */
export async function describeWithDatabase(
  name: string,
  suite: () => void,
): Promise<void> {
  if (await isTestDatabaseReachable()) {
    describe(name, suite);
  } else {
    describe.skip(name, suite);
  }
}
