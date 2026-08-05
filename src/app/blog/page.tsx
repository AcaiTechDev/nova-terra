import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Notícias, testemunhos e conteúdo da Igreja Nova Terra.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Notícias"
        title="O que Deus tem feito na Nova Terra"
        description="Recapes de eventos, testemunhos reais de membros e histórias de impacto do Casa Amarela — em breve, disponíveis aqui."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-2xl border border-dashed border-terra-200 bg-terra-50/60 p-10">
          <p className="font-serif text-lg font-semibold text-night-900">
            Primeiras publicações em breve
          </p>
          <p className="mt-2 text-sm leading-relaxed text-night-800/70">
            Esta seção foi estruturada para receber recapes de eventos,
            testemunhos e conteúdo de ensino — o principal motor de tráfego
            orgânico e de conteúdo compartilhável do site. Assim que os
            primeiros textos forem definidos pela Rede de Mídia, eles
            aparecerão aqui.
          </p>
        </div>
      </section>
    </>
  );
}
