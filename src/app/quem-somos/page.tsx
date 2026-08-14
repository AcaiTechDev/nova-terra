import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a história, a fé, a missão e a liderança da Igreja Nova Terra, em Icoaraci, Belém-PA.",
};

const links = [
  {
    href: "/quem-somos/historia",
    title: "Nossa História",
    desc: "Como a Nova Terra nasceu em 2007 e onde estamos hoje.",
  },
  {
    href: "/quem-somos/fe",
    title: "Nossa Fé",
    desc: "O que cremos, em poucas palavras.",
  },
  {
    href: "/quem-somos/missao-e-visao",
    title: "Missão e Visão",
    desc: "Ganhar, cuidar e capacitar — tornar cada membro fruto permanente.",
  },
  {
    href: "/quem-somos/lideranca",
    title: "Liderança",
    desc: "Quem caminha à frente da Nova Terra.",
  },
];

export default function QuemSomosPage() {
  return (
    <>
      <PageHero
        eyebrow="Quem Somos"
        title="Uma igreja em avivamento em Icoaraci"
        description="Desde 2007, propagando o Evangelho de Jesus Cristo e promovendo o crescimento espiritual de cada pessoa que passa por nossas portas."
      />
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group rounded-2xl border border-terra-100 bg-gradient-to-br from-terra-100 via-terra-50 to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="font-serif text-xl font-semibold text-night-900">
                {l.title}
              </h2>
              <p className="mt-2 text-sm text-night-800/70">{l.desc}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-terra-700">
                Ler mais →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
