import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";
import { site, whatsappLink } from "@/lib/site";

const heroSlides: HeroSlide[] = [
  {
    id: "avivamento",
    eyebrow: "Icoaraci, Belém-PA",
    title: "Nós somos o Avivamento. E ele também pode ter o seu nome.",
    subtitle:
      "A Igreja Nova Terra existe para ganhar, cuidar e capacitar vidas para o Reino de Deus. Se você está buscando um lugar para recomeçar, crescer na fé ou servir, este é o seu convite.",
    buttons: [
      { label: "Quero visitar um culto", href: "/jornada-de-discipulado" },
      {
        label: "Quero pedir oração",
        href: whatsappLink("Olá! Gostaria de pedir oração."),
        variant: "secondary",
        external: true,
      },
    ],
  },
  {
    id: "culto",
    title: "Aqui, cada domingo é um novo começo",
    subtitle: "Vidas sendo transformadas, toda semana",
    buttons: [
      { label: "Ver horários dos cultos", href: "/jornada-de-discipulado" },
    ],
    image: {
      desktop: "/hero/culto-desktop.webp",
      mobile: "/hero/culto-mobile.webp",
      alt: "Culto da Igreja Nova Terra com banda no palco e congregação reunida",
    },
  },
  {
    id: "avivamento-multiplicacao",
    title: "Avivamento sem multiplicação morre",
    buttons: [
      { label: "Nossa missão e visão", href: "/quem-somos/missao-e-visao" },
    ],
    image: {
      desktop: "/hero/trigo-desktop.webp",
      mobile: "/hero/trigo-mobile.webp",
      alt: "Trigo em destaque durante momento de adoração na Igreja Nova Terra",
    },
  },
  {
    id: "oracao",
    title: "Um lugar seguro para orar e recomeçar",
    buttons: [
      {
        label: "Quero pedir oração",
        href: whatsappLink("Olá! Gostaria de pedir oração."),
        variant: "secondary",
        external: true,
      },
    ],
    image: {
      desktop: "/hero/oracao-desktop.webp",
      mobile: "/hero/oracao-mobile.webp",
      alt: "Mulher em momento de oração",
    },
  },
];

const destaques = [
  {
    title: "Cultos da Família",
    detail: "Domingos às 08h30 e 18h30",
    cta: "Ver localização",
    href: "/fale-conosco",
  },
  {
    title: "JAVAN, a Rede Jovem",
    detail: "Sábados, 19h",
    cta: "Saiba mais",
    href: "/redes/javan",
  },
  {
    title: "Casa Amarela",
    detail: "Apoio a mulheres em vulnerabilidade em Icoaraci",
    cta: "Conheça o projeto",
    href: "/casa-amarela",
  },
  {
    title: "Encontre sua Rede",
    detail: "17 frentes de serviço e comunhão",
    cta: "Ver todas as Redes",
    href: "/redes",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSlider slides={heroSlides} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col justify-between rounded-2xl border border-terra-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <h3 className="font-serif text-lg font-semibold text-night-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-night-800/70">{item.detail}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-terra-700 group-hover:gap-2 transition-all">
                {item.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-terra-50/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-terra-600">
              Nossa visão
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-night-900 sm:text-3xl">
              Tornar cada membro fruto permanente.
            </h2>
            <p className="mt-4 leading-relaxed text-night-800/70">
              Nossa missão é ganhar, cuidar e capacitar. Cremos que
              avivamento sem multiplicação morre — por isso caminhamos
              juntos, geração após geração, formando discípulos que também
              fazem discípulos.
            </p>
            <div className="mt-6">
              <CTAButton href="/quem-somos/missao-e-visao" variant="secondary">
                Conheça nossa fé e visão
              </CTAButton>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["17", "Redes de serviço"],
              ["2007", "Ano de fundação"],
              ["6", "Passos na Jornada de Discipulado"],
              ["1", "Projeto social — Casa Amarela"],
            ].map(([n, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-terra-100 bg-white p-6 text-center"
              >
                <p className="font-serif text-3xl font-bold text-terra-700">{n}</p>
                <p className="mt-1 text-sm text-night-800/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-serif text-2xl font-bold text-night-900 sm:text-3xl">
          Primeira vez por aqui?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-night-800/70">
          Ficamos felizes com sua visita. Dê o próximo passo agora mesmo —
          estamos prontos para caminhar com você.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CTAButton href="/jornada-de-discipulado">
            Quero começar minha jornada
          </CTAButton>
          <CTAButton
            href={whatsappLink("Olá! Gostaria de pedir oração.")}
            external
            variant="secondary"
          >
            Quero pedir oração
          </CTAButton>
          <CTAButton href="/casa-amarela" variant="secondary">
            Quero ajudar o Casa Amarela
          </CTAButton>
        </div>
      </section>
    </>
  );
}
