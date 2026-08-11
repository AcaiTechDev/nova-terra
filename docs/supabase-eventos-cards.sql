-- Novos campos dos cards de evento: data, hora, palestrante e patrocinadores.
-- Rode este script uma única vez no SQL Editor do Supabase.

alter table public.eventos
  add column if not exists data_evento date;

alter table public.eventos
  add column if not exists hora_evento text;

alter table public.eventos
  add column if not exists palestrante text;

alter table public.eventos
  add column if not exists patrocinadores jsonb not null default '[]'::jsonb;
