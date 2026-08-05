import { getSupabaseServerClient } from "@/lib/supabaseServer";

export type Noticia = {
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  imagemUrl: string | null;
  publicadoEm: string;
};

function mapRow(row: any): Noticia {
  return {
    slug: row.slug,
    titulo: row.titulo,
    resumo: row.resumo,
    conteudo: row.conteudo,
    imagemUrl: row.imagem_url,
    publicadoEm: row.publicado_em,
  };
}

export async function getNoticias(): Promise<Noticia[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("noticias")
    .select("slug, titulo, resumo, conteudo, imagem_url, publicado_em")
    .eq("publicado", true)
    .order("publicado_em", { ascending: false });

  return (data ?? []).map(mapRow);
}

export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("noticias")
    .select("slug, titulo, resumo, conteudo, imagem_url, publicado_em")
    .eq("slug", slug)
    .eq("publicado", true)
    .single();

  return data ? mapRow(data) : null;
}
