import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import InscricaoForm from "@/components/InscricaoForm";
import { getEventoBySlug, formatPreco } from "@/lib/eventos";

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
        description={
          evento.gratuito
            ? evento.descricao
            : `${evento.descricao} — Valor: ${formatPreco(evento.preco ?? 0)}`
        }
      />
      <section className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        {evento.imagemUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={evento.imagemUrl}
            alt={evento.titulo}
            className="mb-8 aspect-[4/3] w-full rounded-2xl object-cover"
          />
        )}
        <h2 className="mb-6 font-serif text-2xl font-bold text-night-900">
          Faça sua Inscrição.
        </h2>
        <InscricaoForm evento={evento} />
      </section>
    </>
  );
}
