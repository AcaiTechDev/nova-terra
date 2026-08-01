"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-terra-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terra-600 font-serif text-lg font-bold text-white">
            NT
          </span>
          <span className="font-serif text-lg font-semibold text-night-900">
            Nova Terra
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
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
                  className="rounded-md px-3 py-2 text-sm font-medium text-night-800 hover:bg-terra-50 hover:text-terra-700"
                >
                  {item.label}
                </Link>
                <div
                  className={`absolute left-0 top-full min-w-[220px] rounded-lg border border-terra-100 bg-white p-2 shadow-lg ${
                    subOpen === item.href ? "block" : "hidden"
                  }`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-md px-3 py-2 text-sm text-night-800 hover:bg-terra-50 hover:text-terra-700"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-night-800 hover:bg-terra-50 hover:text-terra-700"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/como-ajudar"
            className="ml-2 rounded-full bg-terra-600 px-4 py-2 text-sm font-semibold text-white hover:bg-terra-700"
          >
            Como Ajudar
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-terra-200 lg:hidden"
          aria-label="Abrir menu"
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
        <nav className="border-t border-terra-100 bg-white px-4 pb-4 lg:hidden">
          {mainNav.map((item) => (
            <div key={item.href} className="py-1">
              <Link
                href={item.href}
                className="block rounded-md px-2 py-2 text-sm font-medium text-night-800"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-3 border-l border-terra-100 pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-md px-2 py-1.5 text-sm text-night-800/80"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
