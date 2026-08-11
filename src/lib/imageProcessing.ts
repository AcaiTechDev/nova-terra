import "server-only";
import sharp from "sharp";

type ProcessOptions = {
  width: number;
  height?: number;
  fit?: "cover" | "contain" | "inside";
  quality?: number;
};

export async function optimizeImage(
  file: File,
  options: ProcessOptions
): Promise<{ buffer: Buffer; contentType: string; extensao: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const input = Buffer.from(arrayBuffer);

  const pipeline = sharp(input).rotate();

  if (options.height) {
    pipeline.resize(options.width, options.height, {
      fit: options.fit ?? "cover",
      withoutEnlargement: false,
    });
  } else {
    pipeline.resize({
      width: options.width,
      fit: options.fit ?? "inside",
      withoutEnlargement: true,
    });
  }

  const buffer = await pipeline
    .webp({ quality: options.quality ?? 80 })
    .toBuffer();

  return { buffer, contentType: "image/webp", extensao: "webp" };
}
