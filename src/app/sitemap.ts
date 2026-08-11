import type { MetadataRoute } from "next";
import { redes } from "@/lib/redes";

const base = "https://igrejanovaterra.com.br";

const staticRoutes = [
  "",
  "/quem-somos",
  "/quem-somos/historia",
  "/quem-somos/fe",
  "/quem-somos/missao-e-visao",
  "/quem-somos/lideranca",
  "/jornada-de-discipulado",
  "/jornada-de-discipulado/discipulado-na-mesa",
  "/redes",
  "/casa-amarela",
  "/eventos",
  "/empreendedores",
  "/como-doar",
  "/blog",
  "/fale-conosco",
  "/politica-de-privacidade",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
  const redeEntries = redes.map((r) => ({
    url: `${base}/redes/${r.slug}`,
    lastModified: new Date(),
  }));
  return [...staticEntries, ...redeEntries];
}
