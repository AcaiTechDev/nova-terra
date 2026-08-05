import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Lacuna from "@/components/Lacuna";

export const metadata: Metadata = {
  title: "Nossa História",
  description: "A história da Igreja Nova Terra, em Icoaraci, Belém-PA, desde 2007.",
};

export default function HistoriaPage() {
  return (
    <>
      <PageHero eyebrow="Quem Somos" title="Nossa História" />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="leading-relaxed text-night-800/80">
          A Igreja Pentecostal Missionária Nova Terra nasceu em 25 de janeiro
          de 2007, em Icoaraci, Belém do Pará, com um propósito simples e
          permanente: propagar o Evangelho de Jesus Cristo e promover o
          crescimento espiritual de cada pessoa que passa por suas portas.
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-amber-300 bg-amber-50/60 p-5">
          <p className="text-sm leading-relaxed text-night-800/70">
            Espaço reservado para a história narrativa completa: como a
            igreja começou, os marcos de crescimento, mudanças de endereço
            ou estrutura e os momentos decisivos até hoje.
          </p>
          <Lacuna>história narrativa completa da igreja (marcos, crescimento)</Lacuna>
        </div>

        <p className="mt-6 leading-relaxed text-night-800/80">
          Hoje, a Nova Terra é uma igreja organizada em 17 Redes de serviço,
          mantém um projeto social ativo (Casa Amarela) e segue com o mesmo
          propósito do início: ver vidas transformadas pelo Evangelho.
        </p>
        <div className="mt-3">
          <Lacuna>número exato de anos de história — dossiê menciona aniversário de 22 anos, tema &quot;No Secreto&quot;</Lacuna>
        </div>
      </article>
    </>
  );
}
