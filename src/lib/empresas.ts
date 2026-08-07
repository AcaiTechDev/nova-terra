import { getSupabaseServerClient } from "@/lib/supabaseServer";

export type Empresa = {
  slug: string;
  nome: string;
  categoria: string;
  descricao: string;
  nomeResponsavel: string | null;
  whatsapp: string;
  instagram: string | null;
  logoUrl: string | null;
  capaUrl: string | null;
};

function mapRow(row: any): Empresa {
  return {
    slug: row.slug,
    nome: row.nome,
    categoria: row.categoria,
    descricao: row.descricao,
    nomeResponsavel: row.nome_responsavel,
    whatsapp: row.whatsapp,
    instagram: row.instagram,
    logoUrl: row.logo_url,
    capaUrl: row.capa_url,
  };
}

export async function getEmpresas(): Promise<Empresa[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("empresas")
    .select(
      "slug, nome, categoria, descricao, nome_responsavel, whatsapp, instagram, logo_url, capa_url"
    )
    .eq("publicado", true)
    .order("ordem", { ascending: true });

  return (data ?? []).map(mapRow);
}
