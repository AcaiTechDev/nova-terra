import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { getNoticiaBySlug } from "@/lib/noticias";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);
  if (!noticia) return {};
  return {
    title: noticia.titulo,
    description: noticia.resumo,
  };
}

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;
  const noticia = await getNoticiaBySlug(slug);
  if (!noticia) notFound();

  const paragrafos = noticia.conteudo
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={formatarData(noticia.publicadoEm)}
        title={noticia.titulo}
        description={noticia.resumo}
      />
      <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        {noticia.imagemUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={noticia.imagemUrl}
            alt={noticia.titulo}
            className="mb-8 w-full rounded-2xl object-cover"
          />
        )}
        <div className="space-y-4 text-base leading-relaxed text-night-800">
          {paragrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </>
  );
}
