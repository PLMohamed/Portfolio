import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { ValidationError, withActionValidator } from "./validators";

const schema = z.tuple([z.object({ name: z.string().min(2) })]);

describe("withActionValidator", () => {
  it("passes parsed values through to the action", async () => {
    const action = vi.fn().mockResolvedValue("ok");
    const wrapped = withActionValidator(action, schema);

    await expect(wrapped({ name: "Ada" })).resolves.toBe("ok");
    expect(action).toHaveBeenCalledWith({ name: "Ada" });
  });

  it("throws a ValidationError when the input does not match", async () => {
    const action = vi.fn();
    const wrapped = withActionValidator(action, schema);

    await expect(wrapped({ name: "A" })).rejects.toBeInstanceOf(
      ValidationError,
    );
    expect(action).not.toHaveBeenCalled();
  });

  it("exposes the zod issues on the ValidationError", async () => {
    const wrapped = withActionValidator(vi.fn(), schema);

    try {
      await wrapped({ name: "A" });
      expect.unreachable("should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).issues.length).toBeGreaterThan(0);
    }
  });

  it("does not swallow unexpected errors thrown by the action", async () => {
    const action = vi.fn().mockRejectedValue(new Error("boom"));
    const wrapped = withActionValidator(action, schema);

    await expect(wrapped({ name: "Ada" })).rejects.toThrow("boom");
  });
});
