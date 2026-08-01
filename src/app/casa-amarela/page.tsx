import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import Lacuna from "@/components/Lacuna";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Casa Amarela",
  description:
    "Casa Amarela — cuidado real para mulheres de Icoaraci. Um projeto voluntário da Igreja Nova Terra.",
};

const ofertas = [
  {
    title: "Aconselhamento e apoio emocional",
    desc: "Atendimento de terapeutas e psicólogos voluntários.",
  },
  {
    title: "Apoio educacional",
    desc: "Aulas de reforço, apoio em lições escolares, preparação para provas e orientação acadêmica.",
  },
  {
    title: "Capacitação prática",
    desc: "Workshops de habilidades voltados à entrada no mercado de trabalho.",
  },
];

export default function CasaAmarelaPage() {
  return (
    <>
      <PageHero
        eyebrow="Projetos Sociais"
        title="Casa Amarela — cuidado real para mulheres de Icoaraci"
        description="Um projeto voluntário da Igreja Nova Terra dedicado a oferecer suporte emocional, educacional e social para mulheres em situação de vulnerabilidade em Icoaraci. Desde maio de 2024, funciona inteiramente com voluntários e doações — sem fins lucrativos."
      >
        <CTAButton href={whatsappLink("Olá! Quero ajudar o Casa Amarela.")} external>
          Quero ajudar o Casa Amarela
        </CTAButton>
      </PageHero>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-2xl font-bold text-night-900">
          O que oferecemos
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {ofertas.map((o) => (
            <div key={o.title} className="rounded-2xl border border-terra-100 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-night-900">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-night-800/70">{o.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-serif text-2xl font-bold text-night-900">
          Como ajudar
        </h2>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-terra-100 bg-terra-50/60 p-5">
            <p className="font-semibold text-night-900">Doe materiais e produtos</p>
            <Lacuna>lista específica do que é aceito como doação</Lacuna>
          </div>
          <div className="rounded-xl border border-terra-100 bg-terra-50/60 p-5">
            <p className="font-semibold text-night-900">Seja voluntário(a)</p>
            <p className="text-sm text-night-800/70">
              Profissionais de psicologia, terapia, educação e áreas afins.
            </p>
            <Lacuna>canal de inscrição para voluntários</Lacuna>
          </div>
          <div className="rounded-xl border border-terra-100 bg-terra-50/60 p-5">
            <p className="font-semibold text-night-900">Contribua financeiramente</p>
            <Lacuna>chave PIX / dados bancários oficiais</Lacuna>
          </div>
        </div>

        <div className="mt-10 text-center">
          <CTAButton href={whatsappLink("Olá! Quero ajudar o Casa Amarela.")} external>
            Quero ajudar o Casa Amarela
          </CTAButton>
        </div>
      </section>
    </>
  );
}
