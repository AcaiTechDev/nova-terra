import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import InscricaoForm from "@/components/InscricaoForm";
import { eventos, getEventoBySlug } from "@/lib/eventos";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return eventos.filter((e) => e.inscricoesAbertas).map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const evento = getEventoBySlug(params.slug);
  if (!evento) return {};
  return {
    title: `Inscrição — ${evento.titulo}`,
    description: `Inscreva-se no evento ${evento.titulo} da Igreja Nova Terra.`,
  };
}

export default function InscricaoPage({ params }: Props) {
  const evento = getEventoBySlug(params.slug);
  if (!evento || !evento.inscricoesAbertas) notFound();

  return (
    <>
      <PageHero
        eyebrow="Inscrição"
        title={evento.titulo}
        description={evento.descricao}
      />
      <section className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <InscricaoForm evento={evento} />
      </section>
    </>
  );
}
