import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, undefined, null, "", "b")).toBe("a b");
  });

  it("resolves conflicting Tailwind utilities in favour of the last", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("supports conditional objects and arrays", () => {
    expect(cn(["a", { b: true, c: false }])).toBe("a b");
  });
});
