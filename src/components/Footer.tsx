import Image from "next/image";
import Link from "next/link";
import { mainNav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-terra-100 bg-white text-night-800">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/logo-igreja-nova-terra.webp"
            alt="Igreja Nova Terra — ícone de leão e chama com o nome da igreja"
            width={974}
            height={482}
            className="h-10 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-night-800/70">
            Existimos para ganhar, cuidar e capacitar vidas para o Reino de
            Deus, em Icoaraci, Belém-PA. {site.closing}
          </p>
          <p className="mt-4 text-sm text-night-800/70">{site.address}</p>
        </div>

        <div>
          <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-night-900">
            Navegue
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-night-800/70 hover:text-terra-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-night-900">
            Contato
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-night-800/70">
            <li>WhatsApp: {site.whatsappDisplay}</li>
            <li>E-mail: {site.email}</li>
            <li className="flex gap-3 pt-2">
              <a href={site.social.instagram} className="hover:text-terra-600">
                Instagram
              </a>
              <a href={site.social.youtube} className="hover:text-terra-600">
                YouTube
              </a>
              <a href={site.social.facebook} className="hover:text-terra-600">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-terra-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-night-800/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} Igreja Pentecostal Missionária Nova
            Terra. Todos os direitos reservados.
          </p>
          <Link href="/politica-de-privacidade" className="hover:text-terra-600">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
