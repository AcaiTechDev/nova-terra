import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import InscricaoForm from "@/components/InscricaoForm";
import { getEventoBySlug } from "@/lib/eventos";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const evento = await getEventoBySlug(slug);
  if (!evento) return {};
  return {
    title: `Inscrição — ${evento.titulo}`,
    description: `Inscreva-se no evento ${evento.titulo} da Igreja Nova Terra.`,
  };
}

export default async function InscricaoPage({ params }: Props) {
  const { slug } = await params;
  const evento = await getEventoBySlug(slug);
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
