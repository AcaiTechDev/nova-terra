"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function excluirInscricao(id: string) {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { error: "Conexão com o banco indisponível." };
  }

  const { error } = await (supabase.from("inscricoes") as any)
    .delete()
    .eq("id", id);

  if (error) {
    return { error: "Não foi possível excluir a inscrição." };
  }

  revalidatePath("/admin/inscritos");
  return { error: null };
}
