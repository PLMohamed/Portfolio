import { describe, expect, it } from "vitest";
import { planImageUpdate } from "./project-image";

const EXISTING = "https://xxx.public.blob.vercel-storage.com/uuid-123";

describe("planImageUpdate", () => {
  /**
   * Regression: editing a project's title without touching the image used to
   * fail in production, because the form re-fetched the blob and the stored
   * content type (application/octet-stream) failed the validator's mime check.
   * An untouched image must now be left completely alone.
   */
  it("keeps the stored image when the admin changes nothing about it", () => {
    const plan = planImageUpdate(
      { hasNewImage: false, removeImage: false },
      EXISTING,
    );

    expect(plan.nextImageUrl).toBe(EXISTING);
    expect(plan.shouldDeleteExisting).toBe(false);
  });

  it("uploads a replacement and deletes the old blob when a new file is given", () => {
    const plan = planImageUpdate(
      { hasNewImage: true, removeImage: false },
      EXISTING,
    );

    expect(plan.nextImageUrl).toBe("PENDING_UPLOAD");
    expect(plan.shouldDeleteExisting).toBe(true);
  });

  it("clears the image when removal is explicitly requested", () => {
    const plan = planImageUpdate(
      { hasNewImage: false, removeImage: true },
      EXISTING,
    );

    expect(plan.nextImageUrl).toBeNull();
    expect(plan.shouldDeleteExisting).toBe(true);
  });

  it("treats a new file as taking precedence over a remove flag", () => {
    const plan = planImageUpdate(
      { hasNewImage: true, removeImage: true },
      EXISTING,
    );

    expect(plan.nextImageUrl).toBe("PENDING_UPLOAD");
    expect(plan.shouldDeleteExisting).toBe(true);
  });

  describe("when no image is stored", () => {
    it("does not attempt a delete", () => {
      for (const intent of [
        { hasNewImage: false, removeImage: false },
        { hasNewImage: false, removeImage: true },
        { hasNewImage: true, removeImage: false },
      ]) {
        expect(planImageUpdate(intent, null).shouldDeleteExisting).toBe(false);
      }
    });

    it("leaves the url null when untouched", () => {
      expect(
        planImageUpdate({ hasNewImage: false, removeImage: false }, null)
          .nextImageUrl,
      ).toBeNull();
    });
  });
});
