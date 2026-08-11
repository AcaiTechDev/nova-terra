"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { optimizeImage } from "@/lib/imageProcessing";

export type EventoFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const MAX_PATROCINADORES = 5;

async function uploadImagemCapa(
  supabase: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
  file: File | null,
  slug: string
) {
  if (!file || file.size === 0) return null;

  const { buffer, contentType, extensao } = await optimizeImage(file, {
    width: 1200,
    height: 900,
    fit: "cover",
    // WhatsApp/Facebook nao renderizam bem preview de og:image em WebP
    format: "jpeg",
    quality: 85,
  });
  const caminho = `eventos/${slug}-${Date.now()}.${extensao}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(caminho, buffer, { upsert: true, contentType });

  if (error) {
    throw new Error("Não foi possível enviar a imagem.");
  }

  const { data } = supabase.storage.from("media").getPublicUrl(caminho);
  return data.publicUrl;
}

async function uploadLogoPatrocinador(
  supabase: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
  file: File | null,
  slug: string,
  indice: number
) {
  if (!file || file.size === 0) return null;

  const { buffer, contentType, extensao } = await optimizeImage(file, {
    width: 300,
    height: 300,
    fit: "contain",
  });
  const caminho = `eventos/patrocinadores/${slug}-${indice}-${Date.now()}.${extensao}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(caminho, buffer, { upsert: true, contentType });

  if (error) {
    throw new Error("Não foi possível enviar a logo do patrocinador.");
  }

  const { data } = supabase.storage.from("media").getPublicUrl(caminho);
  return data.publicUrl;
}

async function lerPatrocinadores(
  supabase: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
  formData: FormData,
  slug: string
) {
  const patrocinadores: { nome: string; logoUrl: string | null }[] = [];

  for (let i = 1; i <= MAX_PATROCINADORES; i++) {
    const nome = String(formData.get(`patrocinadorNome${i}`) || "").trim();
    if (!nome) continue;

    const arquivo = formData.get(`patrocinadorLogo${i}`) as File | null;
    const logoAtual = String(
      formData.get(`patrocinadorLogoAtual${i}`) || ""
    );

    const novoLogoUrl = await uploadLogoPatrocinador(supabase, arquivo, slug, i);
    patrocinadores.push({
      nome,
      logoUrl: novoLogoUrl || logoAtual || null,
    });
  }

  return patrocinadores;
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
    palestrante: String(formData.get("palestrante") || "").trim(),
    dataEvento: String(formData.get("dataEvento") || "").trim(),
    horaEvento: String(formData.get("horaEvento") || "").trim(),
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
  let patrocinadores: { nome: string; logoUrl: string | null }[] = [];
  try {
    const imagemFile = formData.get("imagem") as File | null;
    imagemUrl = await uploadImagemCapa(supabase, imagemFile, campos.slug);
    patrocinadores = await lerPatrocinadores(supabase, formData, campos.slug);
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
    palestrante: campos.palestrante || null,
    data_evento: campos.dataEvento || null,
    hora_evento: campos.horaEvento || null,
    patrocinadores,
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
  let patrocinadores: { nome: string; logoUrl: string | null }[] = [];
  try {
    const imagemFile = formData.get("imagem") as File | null;
    imagemUrl = await uploadImagemCapa(supabase, imagemFile, campos.slug);
    patrocinadores = await lerPatrocinadores(supabase, formData, campos.slug);
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
      palestrante: campos.palestrante || null,
      data_evento: campos.dataEvento || null,
      hora_evento: campos.horaEvento || null,
      patrocinadores,
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
