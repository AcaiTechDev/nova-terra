"use client";

import { useState } from "react";

export default function ShareButton({
  title,
  text,
  path,
}: {
  title: string;
  text: string;
  path: string;
}) {
  const [copiado, setCopiado] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}${path}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // usuário cancelou o compartilhamento — não faz nada
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
        "_blank"
      );
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Compartilhar"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-terra-100 text-terra-700 transition hover:bg-terra-50"
    >
      {copiado ? (
        <span className="text-xs font-semibold">✓</span>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.5]">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 3.9M15.4 6.6L8.6 10.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
