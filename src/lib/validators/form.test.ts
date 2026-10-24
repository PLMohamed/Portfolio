import { describe, expect, it } from "vitest";
import { formValidator } from "./form";

const base = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  subject: "Freelance project",
  message: "Hi there, I would like a quote for a website.",
};

describe("formValidator", () => {
  it("accepts a complete submission", () => {
    expect(formValidator.safeParse(base).success).toBe(true);
  });

  it("requires every field", () => {
    for (const field of Object.keys(base)) {
      const result = formValidator.safeParse({ ...base, [field]: "" });
      expect(result.success, `${field} should be required`).toBe(false);
    }
  });

  it("enforces minimum lengths", () => {
    expect(
      formValidator.safeParse({ ...base, fullName: "Al" }).success,
    ).toBe(false);
    expect(
      formValidator.safeParse({ ...base, message: "too short" }).success,
    ).toBe(false);
  });

  it("enforces maximum lengths", () => {
    expect(
      formValidator.safeParse({ ...base, message: "x".repeat(1001) }).success,
    ).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(
      formValidator.safeParse({ ...base, email: "nope" }).success,
    ).toBe(false);
  });

  it("trims surrounding whitespace", () => {
    const result = formValidator.safeParse({
      ...base,
      fullName: "  Ada Lovelace  ",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.fullName).toBe("Ada Lovelace");
  });
});
