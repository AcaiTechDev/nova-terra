import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Eventos e Agenda",
  description: "Agenda de eventos da Igreja Nova Terra.",
};

const eventos = [
  { nome: "Aniversário da igreja", detalhe: "Edição mais recente: tema \"No Secreto\"" },
  { nome: "Desperta Débora — congresso anual", detalhe: "Congresso anual de intercessão" },
  { nome: "Pentecostes", detalhe: "Celebração anual" },
  { nome: "Encontro de Empreendedores", detalhe: "Rede do Empreendedor" },
  { nome: "Imersão de Homens", detalhe: "Rede de Homens" },
  { nome: "Imersão das Mulheres", detalhe: "Rede de Mulheres" },
  { nome: "Cultos de Casais", detalhe: "Rede de Casais" },
  { nome: "E.B.F. — Escola Bíblica de Férias", detalhe: "Rede Kids" },
  { nome: "Feiras da Rede Kids", detalhe: "Rede Kids" },
  { nome: "Especial Dia das Crianças", detalhe: "Rede Kids" },
  { nome: "Santa Ceia", detalhe: "Mensal" },
];

export default function EventosPage() {
  return (
    <>
      <PageHero
        eyebrow="Eventos e Agenda"
        title="O que está acontecendo na Nova Terra"
        description="Calendário de eventos das nossas Redes e da igreja como um todo. Agenda em atualização contínua pela Rede de Mídia."
      />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <ul className="divide-y divide-terra-100 rounded-2xl border border-terra-100 bg-white shadow-sm">
          {eventos.map((e) => (
            <li key={e.nome} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-semibold text-night-900">{e.nome}</span>
              <span className="text-sm text-night-800/60">{e.detalhe}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm italic text-amber-700">
          Calendário dinâmico com datas específicas e filtro por Rede será
          adicionado na próxima fase, junto com a integração de conteúdo em
          tempo real.
        </p>
      </section>
    </>
  );
}
