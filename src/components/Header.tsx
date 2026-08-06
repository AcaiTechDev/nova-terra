"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setMobileSubOpen(null);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-terra-100 bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-igreja-nova-terra.webp"
            alt="Igreja Nova Terra — ícone de leão e chama com o nome da igreja"
            width={974}
            height={482}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center xl:flex xl:gap-0 2xl:gap-0.5">
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="group relative"
                onMouseEnter={() => setSubOpen(item.href)}
                onMouseLeave={() => setSubOpen(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-medium text-night-800 transition hover:bg-terra-50 hover:text-terra-700 2xl:px-3 2xl:text-sm"
                >
                  {item.label}
                  <svg
                    viewBox="0 0 12 12"
                    className={`h-3 w-3 fill-none stroke-current stroke-[1.5] transition-transform duration-200 ${
                      subOpen === item.href ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <div
                  className={`fixed inset-x-0 top-16 z-40 px-3 transition-all duration-200 sm:px-6 ${
                    subOpen === item.href
                      ? "pointer-events-auto visible translate-y-0 opacity-100"
                      : "pointer-events-none invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-terra-600 shadow-2xl ring-1 ring-black/5">
                    <div className="grid gap-8 p-7 sm:p-8 md:grid-cols-[220px_1fr] md:gap-12">
                      <div className="md:border-r md:border-white/15 md:pr-8">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/55">
                          {item.label}
                        </p>
                        {item.description && (
                          <p className="mt-3 text-sm leading-relaxed text-white/80">
                            {item.description}
                          </p>
                        )}
                        <Link
                          href={item.href}
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all hover:gap-2.5"
                        >
                          Ver visão geral
                          <span aria-hidden>→</span>
                        </Link>
                      </div>

                      <div
                        className={`grid gap-x-6 gap-y-1 ${
                          item.children.length > 8
                            ? "sm:grid-cols-2 lg:grid-cols-3"
                            : "sm:grid-cols-2"
                        }`}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-lg px-3 py-2.5 transition hover:bg-white/10"
                          >
                            <span className="block text-sm font-medium leading-snug text-white">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="mt-0.5 block text-xs leading-snug text-white/60">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-medium text-night-800 transition hover:bg-terra-50 hover:text-terra-700 2xl:px-3 2xl:text-sm"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/como-doar"
            className="ml-1 whitespace-nowrap rounded-full bg-terra-600 px-3 py-2 text-[13px] font-semibold text-white shadow-sm shadow-terra-900/10 transition hover:bg-terra-700 2xl:ml-2 2xl:px-4 2xl:text-sm"
          >
            Como Doar
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-terra-200 xl:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-night-900 stroke-2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-terra-100 bg-white px-4 pb-4 lg:hidden">
          {mainNav.map((item) => (
            <div key={item.href} className="border-b border-terra-50 py-1 last:border-b-0">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  className="block flex-1 rounded-md px-2 py-2.5 text-sm font-medium text-night-800"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    aria-label={`Expandir ${item.label}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center text-terra-600"
                    onClick={() =>
                      setMobileSubOpen((v) => (v === item.href ? null : item.href))
                    }
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className={`h-3.5 w-3.5 fill-none stroke-current stroke-[1.5] transition-transform duration-200 ${
                        mobileSubOpen === item.href ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>
              {item.children && mobileSubOpen === item.href && (
                <div className="ml-3 grid grid-cols-2 gap-x-3 border-l border-terra-100 pb-2 pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-md py-1.5 text-sm text-night-800/80"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/como-doar"
            className="mt-3 block rounded-full bg-terra-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Como Doar
          </Link>
        </nav>
      )}
    </header>
  );
}
