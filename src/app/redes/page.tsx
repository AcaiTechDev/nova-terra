import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { redes } from "@/lib/redes";

export const metadata: Metadata = {
  title: "Redes",
  description:
    "Conheça as 17 Redes de serviço, cuidado e crescimento da Igreja Nova Terra.",
};

export default function RedesPage() {
  return (
    <>
      <PageHero
        eyebrow="Redes"
        title="Encontre sua Rede"
        description="Na Nova Terra, chamamos nossos ministérios de Redes. São 17 frentes de serviço, cuidado e crescimento — cada uma com um propósito específico, mas todas conectadas pelo mesmo alvo: ganhar, cuidar e capacitar vidas."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {redes.map((rede, i) => (
            <Reveal key={rede.slug} delay={(i % 6) * 70}>
              <Link
                href={`/redes/${rede.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-terra-100 bg-gradient-to-br from-terra-100 via-terra-50 to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <h2 className="font-serif text-lg font-semibold text-night-900">
                    {rede.nome}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-night-800/70">
                    {rede.resumo}
                  </p>
                </div>
                <span className="mt-5 inline-flex text-sm font-semibold text-terra-700">
                  Saiba mais →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
