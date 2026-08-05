"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export type NoticiaFormState = {
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
  const caminho = `noticias/${slug}-${Date.now()}.${extensao}`;

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
    resumo: String(formData.get("resumo") || "").trim(),
    conteudo: String(formData.get("conteudo") || "").trim(),
    publicado: formData.get("publicado") === "on",
  };
}

export async function criarNoticia(
  _prevState: NoticiaFormState,
  formData: FormData
): Promise<NoticiaFormState> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Conexão com o banco indisponível." };
  }

  const campos = lerCamposComuns(formData);
  if (!campos.titulo || !campos.slug || !campos.resumo || !campos.conteudo) {
    return {
      status: "error",
      message: "Preencha título, slug, resumo e conteúdo.",
    };
  }

  let imagemUrl: string | null = null;
  try {
    const imagemFile = formData.get("imagem") as File | null;
    imagemUrl = await uploadImagem(supabase, imagemFile, campos.slug);
  } catch (e) {
    return { status: "error", message: (e as Error).message };
  }

  const { error } = await (supabase.from("noticias") as any).insert({
    slug: campos.slug,
    titulo: campos.titulo,
    resumo: campos.resumo,
    conteudo: campos.conteudo,
    publicado: campos.publicado,
    ...(imagemUrl ? { imagem_url: imagemUrl } : {}),
  });

  if (error) {
    return {
      status: "error",
      message:
        "Não foi possível criar a notícia. Verifique se o slug já está em uso.",
    };
  }

  revalidatePath("/admin/noticias");
  revalidatePath("/blog");
  return { status: "success" };
}

export async function atualizarNoticia(
  id: string,
  _prevState: NoticiaFormState,
  formData: FormData
): Promise<NoticiaFormState> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Conexão com o banco indisponível." };
  }

  const campos = lerCamposComuns(formData);
  if (!campos.titulo || !campos.slug || !campos.resumo || !campos.conteudo) {
    return {
      status: "error",
      message: "Preencha título, slug, resumo e conteúdo.",
    };
  }

  let imagemUrl: string | null = null;
  try {
    const imagemFile = formData.get("imagem") as File | null;
    imagemUrl = await uploadImagem(supabase, imagemFile, campos.slug);
  } catch (e) {
    return { status: "error", message: (e as Error).message };
  }

  const { error } = await (supabase.from("noticias") as any)
    .update({
      slug: campos.slug,
      titulo: campos.titulo,
      resumo: campos.resumo,
      conteudo: campos.conteudo,
      publicado: campos.publicado,
      ...(imagemUrl ? { imagem_url: imagemUrl } : {}),
    })
    .eq("id", id);

  if (error) {
    return {
      status: "error",
      message:
        "Não foi possível salvar a notícia. Verifique se o slug já está em uso.",
    };
  }

  revalidatePath("/admin/noticias");
  revalidatePath("/blog");
  return { status: "success" };
}

export async function excluirNoticia(id: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { error: "Conexão com o banco indisponível." };
  }

  const { error } = await (supabase.from("noticias") as any)
    .delete()
    .eq("id", id);

  if (error) {
    return { error: "Não foi possível excluir a notícia." };
  }

  revalidatePath("/admin/noticias");
  revalidatePath("/blog");
  return { error: null };
}
