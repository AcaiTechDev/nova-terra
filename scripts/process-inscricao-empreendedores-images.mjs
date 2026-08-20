import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "..", "imagens-site", "paginas inscricao");
const outDir = path.join(__dirname, "..", "public", "eventos", "empreendedores");

async function run() {
  // Hero de fundo (fachada Comercial do Norte) — cover full-bleed atras do degrade laranja
  await sharp(path.join(srcDir, "fundo.png"))
    .resize(1920, 1080, { fit: "cover", position: sharp.strategy.attention })
    .webp({ quality: 80 })
    .toFile(path.join(outDir, "hero-desktop.webp"));

  await sharp(path.join(srcDir, "fundo.png"))
    .resize(900, 1200, { fit: "cover", position: sharp.strategy.attention })
    .webp({ quality: 80 })
    .toFile(path.join(outDir, "hero-mobile.webp"));

  // Retrato do palestrante (James Holanda) para o card de credibilidade
  await sharp(path.join(srcDir, "james.png"))
    .resize(720, 900, { fit: "cover", position: "top" })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, "palestrante.webp"));

  // Foto apontando, usada perto do formulario/CTA
  await sharp(path.join(srcDir, "IMG_1603.jpg"))
    .rotate()
    .resize(800, 800, { fit: "cover", position: sharp.strategy.attention })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, "cta.webp"));

  console.log("✓ imagens da pagina de inscricao (empreendedores) processadas");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
