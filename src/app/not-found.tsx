import Link from "next/link";
import CTAButton from "@/components/CTAButton";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-serif text-6xl font-bold text-terra-300">404</p>
      <h1 className="mt-4 font-serif text-2xl font-bold text-night-900">
        Página não encontrada
      </h1>
      <p className="mt-2 text-night-800/70">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <div className="mt-6">
        <CTAButton href="/">Voltar para o início</CTAButton>
      </div>
      <Link href="/redes" className="mt-4 text-sm text-terra-700 underline">
        Ver todas as Redes
      </Link>
    </section>
  );
}
