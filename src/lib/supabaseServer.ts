import "server-only";
import { createClient } from "@supabase/supabase-js";

// Cliente Supabase server-only. Usa a Service Role Key, que nunca deve
// ser exposta ao navegador — por isso este arquivo importa "server-only"
// e as variáveis de ambiente NÃO usam o prefixo NEXT_PUBLIC_.
let client: ReturnType<typeof createClient> | null = null;

export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  if (!client) {
    client = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });
  }

  return client;
}
