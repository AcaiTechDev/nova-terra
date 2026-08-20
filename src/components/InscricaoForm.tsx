"use client";

import { useState, useTransition } from "react";
import { inscreverEmEvento, type InscricaoState } from "@/app/eventos/actions";
import type { Evento } from "@/lib/eventos";
import InscricaoSucessoModal from "@/components/InscricaoSucessoModal";

export default function InscricaoForm({ evento }: { evento: Evento }) {
  const [state, setState] = useState<InscricaoState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();
  const [modalAberto, setModalAberto] = useState(false);

  async function handleSubmit(formData: FormData) {
    formData.set("eventoSlug", evento.slug);
    startTransition(async () => {
      const result = await inscreverEmEvento(state, formData);
      setState(result);
      if (result.status === "success") setModalAberto(true);
    });
  }

  if (state.status === "success") {
    return (
      <>
        <div className="rounded-2xl border border-terra-100 bg-terra-50/60 p-8 text-center">
          <p className="font-serif text-xl font-semibold text-night-900">
            Inscrição confirmada! 🎉
          </p>
          <p className="mt-2 text-sm leading-relaxed text-night-800/70">
            Recebemos os seus dados para o evento &quot;{evento.titulo}&quot;.
            Em breve alguém da equipe pode entrar em contato com mais
            detalhes.
          </p>
        </div>
        {modalAberto && (
          <InscricaoSucessoModal
            eventoTitulo={evento.titulo}
            onClose={() => setModalAberto(false)}
          />
        )}
      </>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-night-900">
          Nome completo
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          minLength={3}
          className="mt-1 w-full rounded-lg border border-terra-200 px-4 py-2.5 text-sm focus:border-terra-500 focus:outline-none focus:ring-1 focus:ring-terra-500"
          placeholder="Seu nome completo"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-night-900">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-terra-200 px-4 py-2.5 text-sm focus:border-terra-500 focus:outline-none focus:ring-1 focus:ring-terra-500"
          placeholder="seuemail@exemplo.com"
        />
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm font-medium text-night-900">
          Telefone / WhatsApp
        </label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          required
          className="mt-1 w-full rounded-lg border border-terra-200 px-4 py-2.5 text-sm focus:border-terra-500 focus:outline-none focus:ring-1 focus:ring-terra-500"
          placeholder="(91) 90000-0000"
        />
      </div>

      <div>
        <label htmlFor="endereco" className="block text-sm font-medium text-night-900">
          Endereço
        </label>
        <input
          id="endereco"
          name="endereco"
          type="text"
          required
          minLength={5}
          className="mt-1 w-full rounded-lg border border-terra-200 px-4 py-2.5 text-sm focus:border-terra-500 focus:outline-none focus:ring-1 focus:ring-terra-500"
          placeholder="Rua, número, bairro"
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-night-900">
          Você é membro da Nova Terra?
        </legend>
        <div className="mt-2 flex gap-6">
          <label className="flex items-center gap-2 text-sm text-night-800">
            <input type="radio" name="membro" value="sim" required className="accent-terra-600" />
            Sim
          </label>
          <label className="flex items-center gap-2 text-sm text-night-800">
            <input type="radio" name="membro" value="nao" required className="accent-terra-600" />
            Não
          </label>
        </div>
      </fieldset>

      {evento.categoria === "empreendedores" && (
        <div>
          <label htmlFor="segmento" className="block text-sm font-medium text-night-900">
            Em qual segmento você atua?
          </label>
          <input
            id="segmento"
            name="segmento"
            type="text"
            required
            className="mt-1 w-full rounded-lg border border-terra-200 px-4 py-2.5 text-sm focus:border-terra-500 focus:outline-none focus:ring-1 focus:ring-terra-500"
            placeholder="Ex.: alimentação, beleza, tecnologia, construção..."
          />
        </div>
      )}

      {state.status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-terra-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-terra-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Enviando..." : "Confirmar inscrição"}
      </button>
    </form>
  );
}
