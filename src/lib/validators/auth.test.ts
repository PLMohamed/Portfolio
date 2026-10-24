import { describe, expect, it } from "vitest";
import { loginValidator, signupValidator } from "./auth";

const validPassword = "Str0ng!Pass";

describe("loginValidator", () => {
  it("accepts a valid email and strong password", () => {
    expect(
      loginValidator.safeParse({
        email: "user@example.com",
        password: validPassword,
      }).success,
    ).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(
      loginValidator.safeParse({ email: "not-an-email", password: validPassword })
        .success,
    ).toBe(false);
  });

  describe("password rules", () => {
    it("requires at least one letter", () => {
      const result = loginValidator.safeParse({
        email: "user@example.com",
        password: "12345678!",
      });
      expect(result.success).toBe(false);
    });

    it("requires at least one number", () => {
      expect(
        loginValidator.safeParse({
          email: "user@example.com",
          password: "abcdefgh!",
        }).success,
      ).toBe(false);
    });

    it("requires at least one special character", () => {
      expect(
        loginValidator.safeParse({
          email: "user@example.com",
          password: "Abcdefgh1",
        }).success,
      ).toBe(false);
    });

    it("requires a minimum length of 8", () => {
      expect(
        loginValidator.safeParse({
          email: "user@example.com",
          password: "A1!xyz",
        }).success,
      ).toBe(false);
    });

    it("rejects an empty password", () => {
      expect(
        loginValidator.safeParse({ email: "user@example.com", password: "" })
          .success,
      ).toBe(false);
    });
  });
});

describe("signupValidator", () => {
  const base = {
    email: "user@example.com",
    password: validPassword,
    confirmPassword: validPassword,
    name: "Test User",
  };

  it("accepts matching passwords", () => {
    expect(signupValidator.safeParse(base).success).toBe(true);
  });

  it("rejects mismatched passwords and points at confirmPassword", () => {
    const result = signupValidator.safeParse({
      ...base,
      confirmPassword: "Different1!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("confirmPassword");
    }
  });

  it("allows name to be omitted", () => {
    const { name: _name, ...rest } = base;
    expect(signupValidator.safeParse(rest).success).toBe(true);
  });
});
