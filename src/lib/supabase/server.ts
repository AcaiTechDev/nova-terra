import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cliente Supabase "auth-aware": respeita a sessão do usuário logado
// (via cookies). Usado no painel admin para checar quem está logado.
// Diferente do client em @/lib/supabaseServer.ts, que usa a Service Role
// Key e ignora RLS — esse aqui usa a chave pública (anon) e por isso
// respeita as políticas de RLS normalmente.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Chamado a partir de um Server Component — pode ser
            // ignorado porque o middleware já cuida de renovar a sessão.
          }
        },
      },
    }
  );
}
