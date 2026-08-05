import { getSupabaseServerClient } from "@/lib/supabaseServer";

export type Evento = {
  slug: string;
  titulo: string;
  descricao: string;
  detalhe: string | null;
  categoria: "geral" | "empreendedores";
  imagemUrl: string | null;
  inscricoesAbertas: boolean;
};

function mapRow(row: any): Evento {
  return {
    slug: row.slug,
    titulo: row.titulo,
    descricao: row.descricao,
    detalhe: row.detalhe,
    categoria: row.categoria,
    imagemUrl: row.imagem_url,
    inscricoesAbertas: row.inscricoes_abertas,
  };
}

export async function getEventos(): Promise<Evento[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("eventos")
    .select(
      "slug, titulo, descricao, detalhe, categoria, imagem_url, inscricoes_abertas"
    )
    .eq("publicado", true)
    .order("ordem", { ascending: true });

  return (data ?? []).map(mapRow);
}

export async function getEventoBySlug(slug: string): Promise<Evento | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("eventos")
    .select(
      "slug, titulo, descricao, detalhe, categoria, imagem_url, inscricoes_abertas"
    )
    .eq("slug", slug)
    .eq("publicado", true)
    .single();

  return data ? mapRow(data) : null;
}
