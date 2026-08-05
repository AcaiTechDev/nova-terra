import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EventCard from "@/components/EventCard";
import { eventos } from "@/lib/eventos";

export const metadata: Metadata = {
  title: "Eventos e Agenda",
  description: "Agenda de eventos da Igreja Nova Terra.",
};

export default function EventosPage() {
  return (
    <>
      <PageHero
        eyebrow="Eventos e Agenda"
        title="O que está acontecendo na Nova Terra"
        description="Calendário de eventos das nossas Redes e da igreja como um todo. Agenda em atualização contínua pela Rede de Mídia."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eventos.map((evento) => (
            <EventCard key={evento.slug} evento={evento} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm italic text-amber-700">
          Calendário com datas específicas e filtro por Rede será adicionado
          na próxima fase, junto com a integração de conteúdo em tempo real.
        </p>
      </section>
    </>
  );
}
