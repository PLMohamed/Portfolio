import { describe, expect, it } from "vitest";
import { projectCreateValidator, projectFilterValidator } from "./project";

const base = {
  title: "Portfolio",
  description: "A personal portfolio built with Next.js.",
  downloadLink: null,
  previewLink: null,
  sourceLink: null,
  image: null,
  sortOrder: 0,
  stack: [],
  removeImage: false,
};

function fileOf(type: string, size = 1024) {
  return new File([new Uint8Array(size)], "image", { type });
}

describe("projectCreateValidator", () => {
  it("accepts a minimal valid payload", () => {
    expect(projectCreateValidator.safeParse(base).success).toBe(true);
  });

  it("requires a title and a description", () => {
    expect(
      projectCreateValidator.safeParse({ ...base, title: "" }).success,
    ).toBe(false);
    expect(
      projectCreateValidator.safeParse({ ...base, description: "" }).success,
    ).toBe(false);
  });

  it("rejects links that are not valid URLs", () => {
    const result = projectCreateValidator.safeParse({
      ...base,
      previewLink: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("allows null links", () => {
    expect(
      projectCreateValidator.safeParse({
        ...base,
        previewLink: null,
        sourceLink: null,
        downloadLink: null,
      }).success,
    ).toBe(true);
  });

  describe("image mime validation", () => {
    it.each(["image/jpeg", "image/png", "image/webp", "image/jpg"])(
      "accepts %s",
      (type) => {
        expect(
          projectCreateValidator.safeParse({ ...base, image: fileOf(type) })
            .success,
        ).toBe(true);
      },
    );

    /**
     * Regression: Vercel Blob stores uploads under a bare UUID with no file
     * extension, so it served application/octet-stream and the edit form
     * rebuilt the File from that header, failing validation on prod only.
     */
    it("rejects application/octet-stream", () => {
      expect(
        projectCreateValidator.safeParse({
          ...base,
          image: fileOf("application/octet-stream"),
        }).success,
      ).toBe(false);
    });

    it("rejects an image over 5MB", () => {
      expect(
        projectCreateValidator.safeParse({
          ...base,
          image: fileOf("image/webp", 5 * 1024 * 1024 + 1),
        }).success,
      ).toBe(false);
    });
  });

  describe("sortOrder", () => {
    it("accepts zero and positive integers", () => {
      for (const sortOrder of [0, 1, 9999]) {
        expect(
          projectCreateValidator.safeParse({ ...base, sortOrder }).success,
        ).toBe(true);
      }
    });

    it("rejects negatives, fractions and out-of-range values", () => {
      for (const sortOrder of [-1, 1.5, 10000]) {
        expect(
          projectCreateValidator.safeParse({ ...base, sortOrder }).success,
        ).toBe(false);
      }
    });
  });

  describe("defaults", () => {
    /**
     * Fields use .default(x).nonoptional() (the repo-wide pattern), so a
     * default is applied only when the key is present but undefined — an
     * omitted key is rejected as nonoptional.
     */
    it("applies defaults when the key is present but undefined", () => {
      const result = projectCreateValidator.safeParse({
        ...base,
        sortOrder: undefined,
        stack: undefined,
        removeImage: undefined,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sortOrder).toBe(0);
        expect(result.data.stack).toEqual([]);
        expect(result.data.removeImage).toBe(false);
      }
    });

    it("rejects a payload that omits them entirely", () => {
      const { sortOrder: _s, removeImage: _r, stack: _st, ...rest } = base;
      expect(projectCreateValidator.safeParse(rest).success).toBe(false);
    });
  });

  describe("stack", () => {
    it("accepts a list of tech names", () => {
      expect(
        projectCreateValidator.safeParse({
          ...base,
          stack: ["Typescript", "Next.js"],
        }).success,
      ).toBe(true);
    });

    it("rejects an empty string inside the list", () => {
      expect(
        projectCreateValidator.safeParse({ ...base, stack: ["  "] }).success,
      ).toBe(false);
    });

    it("rejects more than 24 entries", () => {
      const stack = Array.from({ length: 25 }, (_, i) => `tech-${i}`);
      expect(projectCreateValidator.safeParse({ ...base, stack }).success).toBe(
        false,
      );
    });
  });
});

describe("projectFilterValidator", () => {
  it("coerces page and limit from query strings", () => {
    const result = projectFilterValidator.safeParse({
      page: "3",
      limit: "25",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(3);
      expect(result.data.limit).toBe(25);
    }
  });

  it("sorts by sort_order so the admin table can order by display order", () => {
    const result = projectFilterValidator.safeParse({
      sortBy: "sort_order",
      order: "asc",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.sortBy).toBe("sort_order");
  });

  it("rejects an unknown sort column", () => {
    expect(
      projectFilterValidator.safeParse({ sortBy: "image_url" }).success,
    ).toBe(false);
  });
});
