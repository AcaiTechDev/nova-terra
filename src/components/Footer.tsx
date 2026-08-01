import Link from "next/link";
import { mainNav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-night-900 text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terra-600 font-serif text-lg font-bold text-white">
              NT
            </span>
            <span className="font-serif text-lg font-semibold text-white">
              Igreja Nova Terra
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Existimos para ganhar, cuidar e capacitar vidas para o Reino de
            Deus, em Icoaraci, Belém-PA. {site.closing}
          </p>
          <p className="mt-4 text-sm text-white/60">{site.address}</p>
        </div>

        <div>
          <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-white">
            Navegue
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/60 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-sm font-semibold uppercase tracking-wide text-white">
            Contato
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>WhatsApp: {site.whatsappDisplay}</li>
            <li>E-mail: {site.email}</li>
            <li className="flex gap-3 pt-2">
              <a href={site.social.instagram} className="hover:text-white">
                Instagram
              </a>
              <a href={site.social.youtube} className="hover:text-white">
                YouTube
              </a>
              <a href={site.social.facebook} className="hover:text-white">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} Igreja Pentecostal Missionária Nova
            Terra. Todos os direitos reservados.
          </p>
          <Link href="/politica-de-privacidade" className="hover:text-white">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
