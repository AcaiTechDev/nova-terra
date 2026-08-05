import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Missão e Visão",
  description: "Missão e visão da Igreja Nova Terra: ganhar, cuidar e capacitar.",
};

export default function MissaoVisaoPage() {
  return (
    <>
      <PageHero eyebrow="Quem Somos" title="Missão e Visão" />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-terra-100 bg-terra-50/60 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-terra-600">
              Visão
            </p>
            <p className="mt-2 font-serif text-xl font-semibold text-night-900">
              Tornar cada membro fruto permanente.
            </p>
          </div>
          <div className="rounded-2xl border border-terra-100 bg-terra-50/60 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-terra-600">
              Missão
            </p>
            <p className="mt-2 font-serif text-xl font-semibold text-night-900">
              Ganhar, cuidar e capacitar.
            </p>
          </div>
        </div>

        <p className="mt-8 leading-relaxed text-night-800/80">
          Nossa base bíblica está em Mateus 28:18-20 — a Grande Comissão, o
          chamado a &quot;ir e fazer discípulos&quot; — e em Deuteronômio
          6:10-12, o chamado a não esquecer a Deus em meio à bênção
          recebida.
        </p>

        <blockquote className="mt-8 border-l-4 border-terra-500 pl-5 italic text-night-800/80">
          &quot;Avivamento sem multiplicação morre.&quot; Não basta um momento
          de fé — o chamado é multiplicar discípulos, geração após geração.
        </blockquote>
      </article>
    </>
  );
}
