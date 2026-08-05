import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jornada de Discipulado",
  description:
    "Seu próximo passo na Nova Terra: do acolhimento ao serviço numa Rede.",
};

const passos = [
  {
    n: "01",
    title: "Visite e seja acolhido",
    desc: "A Rede de Acolhimento existe para que ninguém se sinta sozinho na primeira vez.",
  },
  {
    n: "02",
    title: "Torne-se membro / Fruto Permanente",
    desc: "Cadastro, integração e batismo nas águas (realizado em cultos de acolhimento, em junho e dezembro).",
  },
  {
    n: "03",
    title: "Discipulado na Mesa",
    desc: "8 encontros em grupos pequenos, na casa de anfitriões, para trabalhar caráter e caminhar em comunhão real.",
  },
  {
    n: "04",
    title: "Imersão + Escola de Cura",
    desc: "Dois dias dedicados a conhecer a Palavra e olhar para dentro, com apoio para lidar com traumas e mágoas.",
  },
  {
    n: "05",
    title: "Escola de Paulo",
    desc: "Formação bíblica estruturada (módulos de discípulo e líder, 2 anos), preparando cada pessoa para servir com profundidade.",
  },
  {
    n: "06",
    title: "Sirva numa Rede",
    desc: "O passo final é o começo de tudo: usar dons e talentos numa das 17 Redes da igreja.",
  },
];

export default function JornadaPage() {
  return (
    <>
      <PageHero
        eyebrow="Jornada de Discipulado"
        title="Seu próximo passo na Nova Terra"
        description="Toda pessoa que chega à Nova Terra é convidada a percorrer o mesmo caminho — o caminho que transformou quem já está aqui."
      >
        <CTAButton href={whatsappLink("Olá! Quero começar minha jornada de discipulado na Nova Terra.")} external>
          Quero começar minha jornada
        </CTAButton>
      </PageHero>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ol className="space-y-6">
          {passos.map((p) => (
            <li key={p.n} className="flex gap-5 rounded-2xl border border-terra-100 bg-white p-6 shadow-sm">
              <span className="font-serif text-2xl font-bold text-terra-300">{p.n}</span>
              <div>
                <h2 className="font-serif text-lg font-semibold text-night-900">{p.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-night-800/70">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <CTAButton href={whatsappLink("Olá! Quero começar minha jornada de discipulado na Nova Terra.")} external>
            Quero começar minha jornada
          </CTAButton>
        </div>
      </section>
    </>
  );
}
