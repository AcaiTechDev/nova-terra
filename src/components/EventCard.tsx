import Link from "next/link";
import { formatPreco, type Evento } from "@/lib/eventos";
import ShareButton from "@/components/ShareButton";

const iconesPorCategoria: Record<Evento["categoria"], string> = {
  geral: "✦",
  empreendedores: "◆",
};

export default function EventCard({ evento }: { evento: Evento }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-terra-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-terra-100 via-terra-50 to-white">
        {evento.imagemUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={evento.imagemUrl}
            alt={evento.titulo}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-4xl text-terra-400" aria-hidden="true">
            {iconesPorCategoria[evento.categoria]}
          </span>
        )}
        {evento.categoria === "empreendedores" && (
          <span className="absolute right-3 top-3 rounded-full bg-terra-600 px-3 py-1 text-xs font-semibold text-white">
            Empreendedores
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
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

        <h3 className="mt-3 font-serif text-lg font-semibold text-night-900">
          <Link href={`/eventos/${evento.slug}`} className="hover:text-terra-700">
            {evento.titulo}
          </Link>
        </h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-terra-600">
          {evento.detalhe}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-night-800/70">
          {evento.descricao}
        </p>

        <div className="mt-5">
          {evento.inscricoesAbertas ? (
            <Link
              href={`/eventos/${evento.slug}/inscricao`}
              className="inline-flex w-full items-center justify-center rounded-full bg-terra-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-terra-700"
            >
              Inscreva-se
            </Link>
          ) : (
            <span className="inline-flex w-full items-center justify-center rounded-full border border-terra-100 px-5 py-2.5 text-sm font-medium text-night-800/50">
              Sem inscrição necessária
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
