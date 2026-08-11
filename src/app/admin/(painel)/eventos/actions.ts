"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export type EventoFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

async function uploadImagem(
  supabase: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
  file: File | null,
  slug: string
) {
  if (!file || file.size === 0) return null;

  const extensao = file.name.split(".").pop() || "jpg";
  const caminho = `eventos/${slug}-${Date.now()}.${extensao}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(caminho, file, { upsert: true, contentType: file.type });

  if (error) {
    throw new Error("Não foi possível enviar a imagem.");
  }

  const { data } = supabase.storage.from("media").getPublicUrl(caminho);
  return data.publicUrl;
}

function lerCamposComuns(formData: FormData) {
  return {
    titulo: String(formData.get("titulo") || "").trim(),
    slug: String(formData.get("slug") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-"),
    detalhe: String(formData.get("detalhe") || "").trim(),
    descricao: String(formData.get("descricao") || "").trim(),
    categoria: String(formData.get("categoria") || "geral"),
    inscricoesAbertas: formData.get("inscricoesAbertas") === "on",
    publicado: formData.get("publicado") === "on",
    ordem: Number(formData.get("ordem") || 0),
    gratuito: formData.get("valorTipo") !== "pago",
    preco:
      formData.get("valorTipo") !== "pago"
        ? null
        : Number(String(formData.get("preco") || "0").replace(",", ".")) || 0,
  };
}

export async function criarEvento(
  _prevState: EventoFormState,
  formData: FormData
): Promise<EventoFormState> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Conexão com o banco indisponível." };
  }

  const campos = lerCamposComuns(formData);
  if (!campos.titulo || !campos.slug || !campos.descricao) {
    return {
      status: "error",
      message: "Preencha título, slug e descrição.",
    };
  }

  let imagemUrl: string | null = null;
  try {
    const imagemFile = formData.get("imagem") as File | null;
    imagemUrl = await uploadImagem(supabase, imagemFile, campos.slug);
  } catch (e) {
    return { status: "error", message: (e as Error).message };
  }

  const { error } = await (supabase.from("eventos") as any).insert({
    slug: campos.slug,
    titulo: campos.titulo,
    detalhe: campos.detalhe || null,
    descricao: campos.descricao,
    categoria: campos.categoria,
    inscricoes_abertas: campos.inscricoesAbertas,
    publicado: campos.publicado,
    ordem: campos.ordem,
    gratuito: campos.gratuito,
    preco: campos.preco,
    ...(imagemUrl ? { imagem_url: imagemUrl } : {}),
  });

  if (error) {
    return {
      status: "error",
      message:
        "Não foi possível criar o evento. Verifique se o slug já está em uso.",
    };
  }

  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  return { status: "success" };
}

export async function atualizarEvento(
  id: string,
  _prevState: EventoFormState,
  formData: FormData
): Promise<EventoFormState> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Conexão com o banco indisponível." };
  }

  const campos = lerCamposComuns(formData);
  if (!campos.titulo || !campos.slug || !campos.descricao) {
    return {
      status: "error",
      message: "Preencha título, slug e descrição.",
    };
  }

  let imagemUrl: string | null = null;
  try {
    const imagemFile = formData.get("imagem") as File | null;
    imagemUrl = await uploadImagem(supabase, imagemFile, campos.slug);
  } catch (e) {
    return { status: "error", message: (e as Error).message };
  }

  const { error } = await (supabase.from("eventos") as any)
    .update({
      slug: campos.slug,
      titulo: campos.titulo,
      detalhe: campos.detalhe || null,
      descricao: campos.descricao,
      categoria: campos.categoria,
      inscricoes_abertas: campos.inscricoesAbertas,
      publicado: campos.publicado,
      ordem: campos.ordem,
      gratuito: campos.gratuito,
      preco: campos.preco,
      ...(imagemUrl ? { imagem_url: imagemUrl } : {}),
    })
    .eq("id", id);

  if (error) {
    return {
      status: "error",
      message:
        "Não foi possível salvar o evento. Verifique se o slug já está em uso.",
    };
  }

  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  return { status: "success" };
}

export async function excluirEvento(id: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { error: "Conexão com o banco indisponível." };
  }

  const { error } = await (supabase.from("eventos") as any)
    .delete()
    .eq("id", id);

  if (error) {
    return { error: "Não foi possível excluir o evento." };
  }

  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  return { error: null };
}
