import { createClient } from "@/lib/supabase/server";

export default async function AdminHomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-night-900">
        Bem-vindo{user?.email ? `, ${user.email}` : ""}
      </h1>
      <p className="mt-2 text-sm text-night-800/70">
        Use o menu para gerenciar inscritos, eventos e notícias.
      </p>
    </div>
  );
}
