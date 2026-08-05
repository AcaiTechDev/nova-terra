"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Início", exact: true },
  { href: "/admin/inscritos", label: "Inscritos" },
  { href: "/admin/eventos", label: "Eventos" },
  { href: "/admin/noticias", label: "Notícias" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full shrink-0 flex-col gap-1 border-terra-100 sm:w-56 sm:border-r sm:pr-4">
      {links.map((link) => {
        const isActive = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-terra-600 text-white"
                : "text-night-800 hover:bg-terra-50"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
