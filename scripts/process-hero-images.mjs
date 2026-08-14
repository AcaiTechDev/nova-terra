import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "..", "imagens-site");
const outDir = path.join(__dirname, "..", "public", "hero");

const slides = [
  {
    src: "20250601_205747.jpg",
    name: "culto",
    // recorte manual: o corte automatico mostrava teto demais; desce o
    // enquadramento para dar mais destaque ao palco e a congregacao
    desktopCrop: { left: 0, top: 450, width: 4000, height: 1714 },
  },
  { src: "IMG_2835.JPG", name: "trigo" },
  {
    src: "IMG_2956.JPG",
    name: "oracao",
    // recorte manual: a deteccao automatica de foco cortava as maos postadas
    desktopCrop: { left: 750, top: 1300, width: 4050, height: 1750 },
    mobileCrop: { left: 1450, top: 500, width: 2720, height: 3400 },
  },
  { src: "20240825_192958.jpg", name: "fachada" },
  { src: "20250420_211644.jpg", name: "bandeira" },
];

const DESKTOP = { width: 1920, height: 823 }; // 21:9
const MOBILE = { width: 1000, height: 1250 }; // 4:5

async function run() {
  for (const slide of slides) {
    const input = path.join(srcDir, slide.src);

    const desktopPipeline = slide.desktopCrop
      ? sharp(input).rotate().extract(slide.desktopCrop)
      : sharp(input).rotate();

    await desktopPipeline
      .resize(DESKTOP.width, DESKTOP.height, {
        fit: "cover",
        position: sharp.strategy.attention,
      })
      .webp({ quality: 78 })
      .toFile(path.join(outDir, `${slide.name}-desktop.webp`));

    const mobilePipeline = slide.mobileCrop
      ? sharp(input).rotate().extract(slide.mobileCrop)
      : sharp(input).rotate();

    await mobilePipeline
      .resize(MOBILE.width, MOBILE.height, {
        fit: "cover",
        position: sharp.strategy.attention,
      })
      .webp({ quality: 78 })
      .toFile(path.join(outDir, `${slide.name}-mobile.webp`));

    console.log(`✓ ${slide.name} processado`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
