import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import Lacuna from "@/components/Lacuna";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Como Ajudar",
  description: "Três formas de contribuir com a Igreja Nova Terra.",
};

export default function ComoAjudarPage() {
  return (
    <>
      <PageHero
        eyebrow="Como Ajudar"
        title="Três formas de contribuir"
        description="O tempo, os talentos e os recursos que você oferece sustentam a missão da Nova Terra e do Casa Amarela."
      />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="space-y-6">
          <div className="rounded-2xl border border-terra-100 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-lg font-semibold text-night-900">
              1. Dízimos e ofertas
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-night-800/70">
              O sustento da igreja e de sua missão acontece através dos
              dízimos e ofertas dos membros.
            </p>
            <Lacuna>canal de doação online (PIX/gateway de pagamento)</Lacuna>
          </div>

          <div className="rounded-2xl border border-terra-100 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-lg font-semibold text-night-900">
              2. Casa Amarela
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-night-800/70">
              Doações e voluntariado para o projeto social de apoio a
              mulheres em vulnerabilidade em Icoaraci.
            </p>
            <div className="mt-3">
              <CTAButton href="/casa-amarela" variant="secondary">
                Conheça o Casa Amarela
              </CTAButton>
            </div>
          </div>

          <div className="rounded-2xl border border-terra-100 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-lg font-semibold text-night-900">
              3. Sirva numa Rede
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-night-800/70">
              O tempo e os talentos também são uma forma de doação. Encontre
              a Rede certa para você entre as 17 frentes de serviço da
              igreja.
            </p>
            <div className="mt-3">
              <CTAButton href="/redes" variant="secondary">
                Ver todas as Redes
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <CTAButton href={whatsappLink("Olá! Quero saber mais sobre como ajudar a Nova Terra.")} external>
            Falar com a igreja
          </CTAButton>
        </div>
      </section>
    </>
  );
}
