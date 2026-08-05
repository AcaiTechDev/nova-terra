"use server";

import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getEventoBySlug } from "@/lib/eventos";

export type InscricaoState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function limparTelefone(telefone: string) {
  return telefone.replace(/\D/g, "");
}

export async function inscreverEmEvento(
  _prevState: InscricaoState,
  formData: FormData
): Promise<InscricaoState> {
  const eventoSlug = String(formData.get("eventoSlug") || "");
  const nome = String(formData.get("nome") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const telefone = String(formData.get("telefone") || "").trim();
  const endereco = String(formData.get("endereco") || "").trim();
  const membroRaw = String(formData.get("membro") || "");
  const segmento = String(formData.get("segmento") || "").trim();

  const evento = await getEventoBySlug(eventoSlug);
  if (!evento) {
    return { status: "error", message: "Evento não encontrado." };
  }

  if (!nome || nome.length < 3) {
    return { status: "error", message: "Informe seu nome completo." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { status: "error", message: "Informe um e-mail válido." };
  }
  if (limparTelefone(telefone).length < 10) {
    return {
      status: "error",
      message: "Informe um telefone/WhatsApp válido, com DDD.",
    };
  }
  if (!endereco || endereco.length < 5) {
    return { status: "error", message: "Informe seu endereço." };
  }
  if (membroRaw !== "sim" && membroRaw !== "nao") {
    return { status: "error", message: "Informe se você é membro da igreja." };
  }
  if (evento.categoria === "empreendedores" && !segmento) {
    return {
      status: "error",
      message: "Informe o segmento em que você atua.",
    };
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return {
      status: "error",
      message:
        "As inscrições estão temporariamente indisponíveis. Tente novamente mais tarde ou fale com a gente pelo WhatsApp.",
    };
  }

  const novaInscricao = {
    evento_slug: evento.slug,
    evento_titulo: evento.titulo,
    nome,
    email,
    telefone: limparTelefone(telefone),
    endereco,
    membro: membroRaw === "sim",
    segmento: evento.categoria === "empreendedores" ? segmento : null,
  };

  // O client Supabase não tem os tipos gerados do banco (não geramos
  // Database types para este projeto), então o insert é tipado como
  // `any` aqui de propósito — os dados já foram validados acima.
  const { error } = await (supabase.from("inscricoes") as any).insert(
    novaInscricao
  );

  if (error) {
    console.error("Erro ao gravar inscrição:", error);
    return {
      status: "error",
      message: "Não conseguimos salvar sua inscrição agora. Tente novamente em instantes.",
    };
  }

  return { status: "success" };
}
