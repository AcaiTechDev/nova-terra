import Link from "next/link";
import type { Evento } from "@/lib/eventos";

const iconesPorCategoria: Record<Evento["categoria"], string> = {
  geral: "✦",
  empreendedores: "◆",
};

export default function EventCard({ evento }: { evento: Evento }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-terra-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-terra-100 via-terra-50 to-white">
        <span className="text-4xl text-terra-400" aria-hidden="true">
          {iconesPorCategoria[evento.categoria]}
        </span>
        {evento.categoria === "empreendedores" && (
          <span className="absolute right-3 top-3 rounded-full bg-terra-600 px-3 py-1 text-xs font-semibold text-white">
            Empreendedores
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-lg font-semibold text-night-900">
          {evento.titulo}
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
