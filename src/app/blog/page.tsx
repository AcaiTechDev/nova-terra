import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getNoticias } from "@/lib/noticias";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Notícias, testemunhos e conteúdo da Igreja Nova Terra.",
};

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const noticias = await getNoticias();

  return (
    <>
      <PageHero
        eyebrow="Notícias"
        title="O que Deus tem feito na Nova Terra"
        description="Recapes de eventos, testemunhos reais de membros e histórias de impacto do Casa Amarela."
      />

      {noticias.length === 0 ? (
        <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <div className="rounded-2xl border border-dashed border-terra-200 bg-terra-50/60 p-10">
            <p className="font-serif text-lg font-semibold text-night-900">
              Primeiras publicações em breve
            </p>
            <p className="mt-2 text-sm leading-relaxed text-night-800/70">
              Esta seção foi estruturada para receber recapes de eventos,
              testemunhos e conteúdo de ensino. Assim que os primeiros
              textos forem publicados pela Rede de Mídia, eles aparecerão
              aqui.
            </p>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((n) => (
              <Link
                key={n.slug}
                href={`/blog/${n.slug}`}
                className="flex flex-col overflow-hidden rounded-2xl border border-terra-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-terra-100 via-terra-50 to-white">
                  {n.imagemUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={n.imagemUrl}
                      alt={n.titulo}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl text-terra-400" aria-hidden="true">
                      ✦
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-terra-600">
                    {formatarData(n.publicadoEm)}
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-night-900">
                    {n.titulo}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-night-800/70">
                    {n.resumo}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
