import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Nossa Fé",
  description: "O que a Igreja Nova Terra crê.",
};

const cremos = [
  "Cremos na Bíblia Sagrada como única regra infalível de fé e de vida.",
  "Cremos em um só Deus, eternamente subsistente em três pessoas: Pai, Filho e Espírito Santo.",
  "Cremos na salvação por meio de Jesus Cristo e no batismo em água, por imersão, como testemunho público dessa decisão.",
  "Vivemos nossa fé em comunidade, através de Redes de discipulado, serviço e cuidado mútuo.",
];

export default function FePage() {
  return (
    <>
      <PageHero eyebrow="Quem Somos" title="Nossa Fé" />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ul className="space-y-4">
          {cremos.map((item) => (
            <li key={item} className="flex gap-3 rounded-xl border border-terra-100 bg-white p-5 shadow-sm">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-terra-600" />
              <p className="leading-relaxed text-night-800/80">{item}</p>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
