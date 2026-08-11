import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import ShareButton from "@/components/ShareButton";
import { getEventoBySlug, formatPreco } from "@/lib/eventos";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const evento = await getEventoBySlug(slug);
  if (!evento) return {};
  return {
    title: evento.titulo,
    description: evento.descricao,
  };
}

export default async function EventoDetalhePage({ params }: Props) {
  const { slug } = await params;
  const evento = await getEventoBySlug(slug);
  if (!evento) notFound();

  return (
    <>
      <PageHero
        eyebrow={evento.detalhe ?? "Evento"}
        title={evento.titulo}
        description={evento.descricao}
      />
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        {evento.imagemUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={evento.imagemUrl}
            alt={evento.titulo}
            className="mb-8 h-56 w-full rounded-2xl object-cover"
          />
        )}

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              evento.gratuito
                ? "bg-terra-50 text-terra-700"
                : "bg-night-900/5 text-night-900"
            }`}
          >
            {evento.gratuito ? "Gratuito" : formatPreco(evento.preco ?? 0)}
          </span>
          <ShareButton
            title={evento.titulo}
            text={`Confira: ${evento.titulo} — Igreja Nova Terra`}
            path={`/eventos/${evento.slug}`}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {evento.inscricoesAbertas ? (
            <CTAButton href={`/eventos/${evento.slug}/inscricao`}>
              Inscreva-se
            </CTAButton>
          ) : (
            <span className="inline-flex items-center justify-center rounded-full border border-terra-100 px-5 py-2.5 text-sm font-medium text-night-800/50">
              Sem inscrição necessária
            </span>
          )}
          <Link
            href="/eventos"
            className="inline-flex items-center justify-center rounded-full border border-terra-200 px-5 py-2.5 text-sm font-semibold text-night-800 transition hover:bg-terra-50"
          >
            Ver todos os eventos
          </Link>
        </div>
      </section>
    </>
  );
}
