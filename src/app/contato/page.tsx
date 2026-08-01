import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import Lacuna from "@/components/Lacuna";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Igreja Nova Terra, em Icoaraci, Belém-PA.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Fale com a gente"
        description="Estamos aqui para conversar, orar com você e receber sua visita."
      />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-lg font-semibold text-night-900">
            Endereço
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-night-800/70">
            {site.address}
          </p>

          <h2 className="mt-8 font-serif text-lg font-semibold text-night-900">
            Cultos
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-night-800/70">
            {site.cultos.map((c) => (
              <li key={c.label}>
                <span className="font-medium text-night-900">{c.label}:</span>{" "}
                {c.quando}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-serif text-lg font-semibold text-night-900">
            WhatsApp / E-mail
          </h2>
          <p className="mt-2 text-sm text-night-800/70">
            WhatsApp: {site.whatsappDisplay}
          </p>
          <p className="text-sm text-night-800/70">E-mail: {site.email}</p>
          <div className="mt-2">
            <Lacuna>telefone/WhatsApp oficial, e-mail e links de redes sociais</Lacuna>
          </div>

          <div className="mt-6">
            <CTAButton href={whatsappLink("Olá! Vim pelo site da Nova Terra.")} external>
              Falar no WhatsApp
            </CTAButton>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-terra-100">
          <iframe
            title="Localização da Igreja Nova Terra"
            src="https://www.google.com/maps?q=Travessa+S-5,+199,+Icoaraci,+Belém-PA&output=embed"
            className="h-full min-h-[320px] w-full"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
