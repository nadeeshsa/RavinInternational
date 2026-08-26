import { readdir } from "node:fs/promises";
import path from "node:path";

export async function getGalleryPhotoPaths(): Promise<string[]> {
  const photosDir = path.join(process.cwd(), "public", "photos");

  try {
    const entries = await readdir(photosDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((name) => `/photos/${encodeURIComponent(name)}`);
  } catch {
    return [];
  }
}
