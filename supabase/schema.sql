-- ============================================================
-- SYLREG & KIDS INVESTMENT LIMITED — Supabase schema
-- Run in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  first_name  text not null check (char_length(first_name) between 1 and 100),
  last_name   text not null check (char_length(last_name)  between 1 and 100),
  phone       text          check (phone   is null or char_length(phone)   <= 40),
  email       text          check (email   is null or char_length(email)   <= 200),
  service     text          check (service is null or char_length(service) <= 120),
  message     text not null check (char_length(message) between 1 and 5000),
  source      text not null default 'website',
  status      text not null default 'new' check (status in ('new','read','replied','closed'))
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

-- Website visitors (anon key) may ONLY insert new messages.
-- There is no select/update/delete policy, so nobody can read the table with the anon key.
drop policy if exists "Visitors can submit messages" on public.contact_messages;
create policy "Visitors can submit messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (status = 'new' and source = 'website');

grant insert on public.contact_messages to anon, authenticated;

-- Staff read the messages in the Supabase dashboard (Table Editor),
-- which uses the project owner role and is not affected by these policies.
