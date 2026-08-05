import type { ReactNode } from "react";
import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = {
  title: "Painel Admin | Igreja Nova Terra",
  robots: { index: false, follow: false },
};

export default function AdminPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-terra-50/40">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-terra-100 bg-white px-6 py-4">
        <Link
          href="/admin"
          className="font-serif text-lg font-semibold text-night-900"
        >
          Painel Nova Terra
        </Link>
        <LogoutButton />
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
