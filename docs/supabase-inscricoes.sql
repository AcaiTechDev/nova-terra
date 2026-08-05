-- Tabela de inscrições em eventos do site da Igreja Nova Terra.
-- Rode este script no SQL Editor do seu projeto Supabase.

create table if not exists public.inscricoes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  evento_slug text not null,
  evento_titulo text not null,
  nome text not null,
  email text,
  telefone text not null,
  endereco text not null,
  membro boolean not null,
  segmento text
);

-- Row Level Security: bloqueia acesso via API pública (anon/authenticated).
-- As gravações do site usam a Service Role Key (servidor), que sempre
-- ignora RLS, então a tabela fica protegida de leitura/escrita externa.
alter table public.inscricoes enable row level security;

-- Índice útil para filtrar inscritos por evento no painel do Supabase.
create index if not exists inscricoes_evento_slug_idx
  on public.inscricoes (evento_slug);
