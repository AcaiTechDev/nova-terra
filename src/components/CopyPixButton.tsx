"use client";

import { useState } from "react";

export default function CopyPixButton({ chave }: { chave: string }) {
  const [copiado, setCopiado] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(chave);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // clipboard indisponível — usuário pode selecionar o texto manualmente
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-terra-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-terra-700"
    >
      {copiado ? "Chave copiada!" : "Copiar chave PIX"}
    </button>
  );
}
