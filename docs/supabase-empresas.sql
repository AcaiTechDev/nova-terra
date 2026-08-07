-- Tabela de Empresas/Empreendedores (Vitrine de Negócios) do site da Igreja Nova Terra.
-- Rode este script uma única vez no SQL Editor do Supabase.

create table if not exists public.empresas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  nome text not null,
  categoria text not null default 'outros',
  descricao text not null,
  nome_responsavel text,
  whatsapp text not null,
  instagram text,
  logo_url text,
  capa_url text,
  publicado boolean not null default true,
  ordem integer not null default 0
);

-- Row Level Security: bloqueia acesso via API pública (anon/authenticated).
-- Leitura e escrita acontecem sempre pelo servidor (Service Role Key),
-- que ignora RLS. Assim a tabela fica protegida de acesso externo
-- direto, mas o site e o painel admin continuam funcionando normalmente
-- porque tudo passa por Server Actions / Server Components.
alter table public.empresas enable row level security;

create index if not exists empresas_slug_idx on public.empresas (slug);
create index if not exists empresas_ordem_idx on public.empresas (ordem);

drop trigger if exists empresas_set_updated_at on public.empresas;
create trigger empresas_set_updated_at
  before update on public.empresas
  for each row execute function public.set_updated_at();
