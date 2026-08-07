import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EmpresaCard from "@/components/EmpresaCard";
import { getEmpresas } from "@/lib/empresas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Empreendedores",
  description:
    "Conheça e apoie os negócios de membros e empreendedores da Igreja Nova Terra.",
};

export default async function EmpreendedoresPage() {
  const empresas = await getEmpresas();

  return (
    <>
      <PageHero
        eyebrow="Rede do Empreendedor"
        title="Empreendedores da Nova Terra"
        description="Conheça os negócios de membros e empreendedores da nossa igreja. Fortalecer uns aos outros também é uma forma de servir."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {empresas.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {empresas.map((empresa) => (
              <EmpresaCard key={empresa.slug} empresa={empresa} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-night-800/60">
            Em breve, os primeiros empreendedores cadastrados aparecerão
            aqui.
          </p>
        )}
      </section>
    </>
  );
}
