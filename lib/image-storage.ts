import "server-only";
import { del, put } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";

const BLOB_HOST_PATTERN =
  /(^https?:\/\/.+\.blob\.vercel-storage\.com\/)|(^https?:\/\/.+\.public\.blob\.vercel-storage\.com\/)/i;

export async function persistImage(buffer: Buffer, fileName: string, contentType: string) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/${fileName}`, buffer, {
      access: "public",
      addRandomSuffix: true,
      contentType,
    });

    return blob.url;
  }

  const uploadPath = path.join(process.cwd(), "public/uploads", fileName);
  await fs.writeFile(uploadPath, buffer);
  return fileName;
}

export async function removeStoredImage(value: string | null | undefined, fallbackFile: string) {
  if (!value || value === fallbackFile) return;

  if (BLOB_HOST_PATTERN.test(value)) {
    await del(value);
    return;
  }

  if (/^https?:\/\//i.test(value)) return;

  const filePath = path.join(process.cwd(), "public/uploads", value);
  await fs.unlink(filePath);
}
