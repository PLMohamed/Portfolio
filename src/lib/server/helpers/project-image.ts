/**
 * Decides what should happen to a project's stored image on update.
 *
 * The edit form no longer re-uploads the existing image, so "no new file" must
 * mean "keep what is stored" rather than "clear it". `removeImage` carries the
 * explicit intent to clear.
 */

export interface ImageUpdateIntent {
  /** Whether a replacement file was supplied. */
  hasNewImage: boolean;
  /** Whether the admin explicitly cleared the image. */
  removeImage: boolean;
}

export interface ImageUpdatePlan {
  /** True when the stored blob should be deleted. */
  shouldDeleteExisting: boolean;
  /** The image_url to persist: a new upload, null to clear, or the existing URL. */
  nextImageUrl: string | null;
}

export function planImageUpdate(
  { hasNewImage, removeImage }: ImageUpdateIntent,
  existingImageUrl: string | null,
): ImageUpdatePlan {
  const shouldClear = !hasNewImage && removeImage;

  return {
    shouldDeleteExisting: (hasNewImage || shouldClear) && !!existingImageUrl,
    nextImageUrl: hasNewImage
      ? "PENDING_UPLOAD"
      : shouldClear
        ? null
        : existingImageUrl,
  };
}
