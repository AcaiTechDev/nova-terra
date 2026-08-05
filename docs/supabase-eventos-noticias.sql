-- Tabelas de Eventos e Notícias do site da Igreja Nova Terra.
-- Este script já foi executado no projeto Supabase (via SQL Editor).
-- Mantido aqui como referência/documentação do schema.

create table if not exists public.eventos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  titulo text not null,
  detalhe text,
  descricao text not null,
  categoria text not null default 'geral' check (categoria in ('geral', 'empreendedores')),
  imagem_url text,
  inscricoes_abertas boolean not null default false,
  publicado boolean not null default true,
  ordem integer not null default 0
);

create table if not exists public.noticias (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  titulo text not null,
  resumo text not null,
  conteudo text not null,
  imagem_url text,
  publicado boolean not null default true,
  publicado_em timestamptz not null default now()
);

-- Row Level Security: bloqueia acesso via API pública (anon/authenticated).
-- Leitura e escrita acontecem sempre pelo servidor (Service Role Key),
-- que ignora RLS. Assim as tabelas ficam protegidas de acesso externo
-- direto, mas o site e o painel admin continuam funcionando normalmente
-- porque tudo passa por Server Actions / Server Components.
alter table public.eventos enable row level security;
alter table public.noticias enable row level security;

create index if not exists eventos_slug_idx on public.eventos (slug);
create index if not exists eventos_ordem_idx on public.eventos (ordem);
create index if not exists noticias_slug_idx on public.noticias (slug);
create index if not exists noticias_publicado_em_idx on public.noticias (publicado_em desc);

-- Mantém updated_at atualizado automaticamente.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists eventos_set_updated_at on public.eventos;
create trigger eventos_set_updated_at
  before update on public.eventos
  for each row execute function public.set_updated_at();

drop trigger if exists noticias_set_updated_at on public.noticias;
create trigger noticias_set_updated_at
  before update on public.noticias
  for each row execute function public.set_updated_at();

-- Seed: migra os eventos estáticos que já existiam no código para o banco.
insert into public.eventos (slug, titulo, detalhe, descricao, categoria, inscricoes_abertas, ordem)
values
  ('aniversario-da-igreja', 'Aniversário da Igreja', 'Edição mais recente: tema "No Secreto"', 'Uma celebração especial de tudo que Deus tem feito na história da Nova Terra — com louvor, testemunhos e muita gratidão.', 'geral', true, 1),
  ('desperta-debora-congresso', 'Desperta Débora — Congresso Anual', 'Congresso anual de intercessão', 'Um encontro anual dedicado à intercessão pelos filhos e pela próxima geração, parte da rede nacional Desperta Débora (MPC Brasil).', 'geral', true, 2),
  ('pentecostes', 'Pentecostes', 'Celebração anual', 'Celebração anual da efusão do Espírito Santo, com um culto especial para toda a igreja.', 'geral', false, 3),
  ('encontro-de-empreendedores', 'Encontro de Empreendedores', 'Rede do Empreendedor', 'Capacitação financeira, palestras e networking entre membros empreendedores da igreja, promovido pela Rede do Empreendedor.', 'empreendedores', true, 4),
  ('imersao-de-homens', 'Imersão de Homens', 'Rede de Homens', 'Dois dias de imersão na Palavra, discipulado e cura interior, promovidos pela Rede de Homens.', 'geral', true, 5),
  ('imersao-das-mulheres', 'Imersão das Mulheres', 'Rede de Mulheres', 'Dois dias dedicados a conhecer a Palavra e cuidar do coração, promovidos pela Rede de Mulheres.', 'geral', true, 6),
  ('cultos-de-casais', 'Cultos de Casais', 'Rede de Casais', 'Um momento especial para fortalecer casamentos com base bíblica, promovido pela Rede de Casais.', 'geral', false, 7),
  ('ebf-escola-biblica-de-ferias', 'E.B.F. — Escola Bíblica de Férias', 'Rede Kids', 'Uma semana de férias recheada de ensino bíblico, brincadeiras e muita diversão para as crianças da Nova Terra.', 'geral', true, 8),
  ('feiras-da-rede-kids', 'Feiras da Rede Kids', 'Rede Kids', 'Feiras temáticas organizadas pela Rede Kids para toda a família.', 'geral', false, 9),
  ('especial-dia-das-criancas', 'Especial Dia das Crianças', 'Rede Kids', 'Uma festa especial para celebrar o Dia das Crianças com a Rede Kids.', 'geral', false, 10),
  ('santa-ceia', 'Santa Ceia', 'Mensal', 'Celebração mensal da Santa Ceia durante os cultos da família.', 'geral', false, 11)
on conflict (slug) do nothing;
