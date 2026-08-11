-- Adiciona campos de preço aos eventos (gratuito por padrão, ou valor pago).
-- Rode este script uma única vez no SQL Editor do Supabase.

alter table public.eventos
  add column if not exists gratuito boolean not null default true;

alter table public.eventos
  add column if not exists preco numeric(10, 2);
