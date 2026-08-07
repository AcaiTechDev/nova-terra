"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export type EmpresaFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

async function uploadImagem(
  supabase: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
  file: File | null,
  pasta: string,
  slug: string
) {
  if (!file || file.size === 0) return null;

  const extensao = file.name.split(".").pop() || "jpg";
  const caminho = `empresas/${pasta}/${slug}-${Date.now()}.${extensao}`;

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
    nome: String(formData.get("nome") || "").trim(),
    slug: String(formData.get("slug") || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-"),
    categoria: String(formData.get("categoria") || "outros"),
    descricao: String(formData.get("descricao") || "").trim(),
    nomeResponsavel: String(formData.get("nomeResponsavel") || "").trim(),
    whatsapp: String(formData.get("whatsapp") || "").replace(/\D/g, ""),
    instagram: String(formData.get("instagram") || "").trim(),
    publicado: formData.get("publicado") === "on",
    ordem: Number(formData.get("ordem") || 0),
  };
}

export async function criarEmpresa(
  _prevState: EmpresaFormState,
  formData: FormData
): Promise<EmpresaFormState> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Conexão com o banco indisponível." };
  }

  const campos = lerCamposComuns(formData);
  if (!campos.nome || !campos.slug || !campos.descricao || !campos.whatsapp) {
    return {
      status: "error",
      message: "Preencha nome, slug, descrição e WhatsApp.",
    };
  }

  let logoUrl: string | null = null;
  let capaUrl: string | null = null;
  try {
    const logoFile = formData.get("logo") as File | null;
    const capaFile = formData.get("capa") as File | null;
    logoUrl = await uploadImagem(supabase, logoFile, "logo", campos.slug);
    capaUrl = await uploadImagem(supabase, capaFile, "capa", campos.slug);
  } catch (e) {
    return { status: "error", message: (e as Error).message };
  }

  const { error } = await (supabase.from("empresas") as any).insert({
    slug: campos.slug,
    nome: campos.nome,
    categoria: campos.categoria,
    descricao: campos.descricao,
    nome_responsavel: campos.nomeResponsavel || null,
    whatsapp: campos.whatsapp,
    instagram: campos.instagram || null,
    publicado: campos.publicado,
    ordem: campos.ordem,
    ...(logoUrl ? { logo_url: logoUrl } : {}),
    ...(capaUrl ? { capa_url: capaUrl } : {}),
  });

  if (error) {
    return {
      status: "error",
      message:
        "Não foi possível cadastrar a empresa. Verifique se o slug já está em uso.",
    };
  }

  revalidatePath("/admin/empresas");
  revalidatePath("/empreendedores");
  return { status: "success" };
}

export async function atualizarEmpresa(
  id: string,
  _prevState: EmpresaFormState,
  formData: FormData
): Promise<EmpresaFormState> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "Conexão com o banco indisponível." };
  }

  const campos = lerCamposComuns(formData);
  if (!campos.nome || !campos.slug || !campos.descricao || !campos.whatsapp) {
    return {
      status: "error",
      message: "Preencha nome, slug, descrição e WhatsApp.",
    };
  }

  let logoUrl: string | null = null;
  let capaUrl: string | null = null;
  try {
    const logoFile = formData.get("logo") as File | null;
    const capaFile = formData.get("capa") as File | null;
    logoUrl = await uploadImagem(supabase, logoFile, "logo", campos.slug);
    capaUrl = await uploadImagem(supabase, capaFile, "capa", campos.slug);
  } catch (e) {
    return { status: "error", message: (e as Error).message };
  }

  const { error } = await (supabase.from("empresas") as any)
    .update({
      slug: campos.slug,
      nome: campos.nome,
      categoria: campos.categoria,
      descricao: campos.descricao,
      nome_responsavel: campos.nomeResponsavel || null,
      whatsapp: campos.whatsapp,
      instagram: campos.instagram || null,
      publicado: campos.publicado,
      ordem: campos.ordem,
      ...(logoUrl ? { logo_url: logoUrl } : {}),
      ...(capaUrl ? { capa_url: capaUrl } : {}),
    })
    .eq("id", id);

  if (error) {
    return {
      status: "error",
      message:
        "Não foi possível salvar a empresa. Verifique se o slug já está em uso.",
    };
  }

  revalidatePath("/admin/empresas");
  revalidatePath("/empreendedores");
  return { status: "success" };
}

export async function excluirEmpresa(id: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { error: "Conexão com o banco indisponível." };
  }

  const { error } = await (supabase.from("empresas") as any)
    .delete()
    .eq("id", id);

  if (error) {
    return { error: "Não foi possível excluir a empresa." };
  }

  revalidatePath("/admin/empresas");
  revalidatePath("/empreendedores");
  return { error: null };
}
