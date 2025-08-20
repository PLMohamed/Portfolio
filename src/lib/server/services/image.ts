import "server-only";
import { put, del } from "@vercel/blob";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import sharp from "sharp";
import path from "path";

const isVercel = !!process.env.BLOB_READ_WRITE_TOKEN;

/**
 * Uploads an image to the server.
 * @param image The image file to upload.
 * @returns The URL of the uploaded image.
 */
export async function uploadImage(image: File): Promise<string> {
  const optimizedImage = await optimizeImage(image);
  const imageId = randomUUID();

  if (isVercel) {
    const blob = await put(imageId, optimizedImage, {
      access: "public",
    });
    return blob.url;
  }

  try {
    const publicDir = path.join(process.cwd(), "public", "projects");

    await fs.mkdir(publicDir, { recursive: true });
    const filePath = path.join(publicDir, `${imageId}.webp`);
    await fs.writeFile(filePath, optimizedImage);

    return `/projects/${imageId}.webp`;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

/**
 * Deletes an image from the server.
 * @param imageUrl The ID of the image to delete.
 */
export async function deleteImage(imageUrl: string) {
  const imageId = path.basename(imageUrl).replace(".webp", "");

  if (isVercel) {
    await del(imageId);
    return;
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "projects",
      `${imageId}.webp`,
    );
    await fs.unlink(filePath);
  } catch (error) {
    console.error("Error deleting image:", error);
    return; // Ignore errors if the file does not exist
  }
}

/**
 * Optimizes an image for web use.
 * @param image The image file to optimize.
 * @returns The optimized image buffer.
 */
export async function optimizeImage(image: File) {
  const imageBuffer = await image.arrayBuffer();
  const optimizedImage = await sharp(imageBuffer)
    .resize(1200, 900, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 90,
      nearLossless: true,
    })
    .toBuffer();
  return optimizedImage;
}
