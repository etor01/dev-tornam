-- ============================================================
-- etornam.me CMS — Initial Schema Migration
-- Run this in the Supabase SQL Editor or via supabase db push
-- ============================================================

-- ── Extensions ────────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Admins allowlist ──────────────────────────────────────────────────────────
-- An authenticated Supabase user is NOT an admin unless their UUID
-- appears in this table. Provision the first admin manually.
create table if not exists admins (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  created_at  timestamptz not null default now()
);

-- ── Projects ─────────────────────────────────────────────────────────────────
create table if not exists projects (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  slug          text not null unique,
  description   text not null,
  content       text,
  cover_image   text,                          -- Supabase Storage URL
  gallery       text[] not null default '{}',  -- Array of Storage URLs
  tech_stack    text[] not null default '{}',
  category      text not null default 'software',
  github_url    text,
  live_url      text,
  year          int,
  status        text not null default 'active'
                  check (status in ('active', 'archived', 'wip')),
  featured      boolean not null default false,
  display_order int not null default 0,
  published     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  published_at  timestamptz
);

create index if not exists projects_slug_idx      on projects(slug);
create index if not exists projects_published_idx on projects(published, display_order);
create index if not exists projects_featured_idx  on projects(featured, published);

-- ── Notes (thoughts / articles) ───────────────────────────────────────────────
create table if not exists notes (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  slug         text not null unique,
  excerpt      text,
  content      text not null,
  cover_image  text,
  category     text,
  tags         text[] not null default '{}',
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists notes_slug_idx      on notes(slug);
create index if not exists notes_published_idx on notes(published, published_at desc);

-- ── Lab experiments ────────────────────────────────────────────────────────────
create table if not exists lab_experiments (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  slug        text not null unique,
  description text not null,
  content     text,
  tools       text[] not null default '{}',
  status      text not null default 'active'
                check (status in ('active', 'archived', 'wip')),
  images      text[] not null default '{}',
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists lab_slug_idx      on lab_experiments(slug);
create index if not exists lab_published_idx on lab_experiments(published, created_at desc);

-- ── Site settings (key–value) ─────────────────────────────────────────────────
create table if not exists site_settings (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now()
);

-- Seed default settings (existing hardcoded values)
insert into site_settings (key, value) values
  ('hero_name',         'Etornam Kordzo Ahiataku'),
  ('hero_lead',         'Software Engineer • I build functional, User-centric systems • Covering cloud and backend environments.'),
  ('hero_bio',          ''),
  ('hero_availability', 'true'),
  ('contact_email',     ''),
  ('social_linkedin',   'https://www.linkedin.com/in/ahiatakuetornam/'),
  ('social_github',     'https://github.com/etor01'),
  ('social_twitter',    'https://x.com/AhiatakuEtornam'),
  ('footer_text',       '')
on conflict (key) do nothing;

-- Seed existing hardcoded projects (published from day one)
insert into projects (title, slug, description, tech_stack, category, github_url, live_url, year, status, featured, display_order, published, published_at)
values
  ('Mediscan',           'mediscan',           'An AI-powered medical imaging analysis tool designed to assist healthcare professionals in early diagnosis of breast related diseases. Integrates local AI model engines.',   ARRAY['REST API','Ollama','Llama 3.2','HTML','JavaScript'], 'software', 'https://github.com/etor01/MediScan-Ai', 'https://etor01.github.io/MediScan-Ai/', 2024, 'active', true,  1, true, now()),
  ('AgriBoost',          'agriboost',          'Agricultural management platform connecting local farmers with distributors through data-driven insights and AI/IoT integration. Streamlines crop listing and bulk ordering.', ARRAY['NextJS','Supabase','PayStack','Tailwind','HuggingFace'], 'software', 'https://github.com/etor01/agriboost2', 'https://agriboost2.vercel.app/', 2023, 'active', true, 2, true, now()),
  ('Cleanse Guru',       'cleanse-guru',       'A service-booking platform connecting independent cleaners to customers, facilitating automated scheduling, notifications, and secure payment processing.',                    ARRAY['PHP','Bootstrap','JavaScript'],                        'software', null, null, 2023, 'active', false, 3, true, now()),
  ('EcoCycle',           'ecocycle',           'Smart recycling educational platform developed for Human Computer Interaction to teach local communities sustainable waste management practices.',                              ARRAY['JavaScript','Bootstrap','HTML5'],                      'software', 'https://github.com/etor01/HCI', 'https://etor01.github.io/HCI/', 2022, 'active', false, 4, true, now()),
  ('Github Project Card','github-project-card','A simple web component that pulls public repository information from GitHub and displays it as a styled card for portfolio inclusion.',                                       ARRAY['JavaScript','HTML5','CSS3'],                           'software', null, 'https://etor01.github.io/Github-Projects-Card/', 2022, 'active', false, 5, true, now()),
  ('Pulse Check API',    'pulse-check-api',    'A lightweight system monitoring API featuring a dead-man''s switch mechanism to instantly notify maintainers of service downtime.',                                            ARRAY['Node.js','Express','MongoDB'],                         'software', null, 'https://pulse-check-api.onrender.com/', 2023, 'active', false, 6, true, now())
on conflict (slug) do nothing;

-- Seed existing hardcoded thoughts as notes
insert into notes (title, slug, excerpt, content, published, published_at)
values
  ('On building in public',      'on-building-in-public',      'The most useful thing I have learned is to share progress early, even when the work is messy.',       'The most useful thing I have learned is to share progress early, even when the work is messy. It gathers input when changes are still cheap.', true, '2026-07-12 00:00:00+00'),
  ('I love design clarity',      'i-love-design-clarity',      'Simple interfaces reduce cognitive friction.',                                                          'Simple interfaces reduce cognitive friction. They make complex systems feel intuitive and welcoming.',                                          true, '2026-06-28 00:00:00+00'),
  ('The value of small experiments', 'value-of-small-experiments', 'Tiny prototypes teach more than big plans made in isolation.',                                 'I keep finding that tiny prototypes teach more than big plans made in isolation. Real feedback beat assumptions every single time.',            true, '2026-06-10 00:00:00+00'),
  ('A note on patience',         'a-note-on-patience',         'Great software rarely appears all at once.',                                                           'Great software rarely appears all at once. Most of it grows incrementally through repeated, deliberate refinement.',                           true, '2026-05-22 00:00:00+00'),
  ('Rethinking product constraints', 'rethinking-product-constraints', 'Constraints often sharpen creativity rather than stifle it.',                              'Constraints often sharpen creativity rather than stifle it. They force you to make better choices and stick to clearer priorities.',             true, '2026-04-15 00:00:00+00')
on conflict (slug) do nothing;

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

-- ── Enable RLS on all tables ──────────────────────────────────────────────────
alter table admins          enable row level security;
alter table projects        enable row level security;
alter table notes           enable row level security;
alter table lab_experiments enable row level security;
alter table site_settings   enable row level security;

-- ── Helper function: is current user an admin? ────────────────────────────────
create or replace function is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from admins where id = auth.uid()
  );
$$;

-- ── projects policies ─────────────────────────────────────────────────────────
-- Public: read published only
create policy "public_read_published_projects"
  on projects for select
  using (published = true);

-- Admin: full access
create policy "admin_all_projects"
  on projects for all
  using (is_admin())
  with check (is_admin());

-- ── notes policies ────────────────────────────────────────────────────────────
create policy "public_read_published_notes"
  on notes for select
  using (published = true);

create policy "admin_all_notes"
  on notes for all
  using (is_admin())
  with check (is_admin());

-- ── lab_experiments policies ──────────────────────────────────────────────────
create policy "public_read_published_lab"
  on lab_experiments for select
  using (published = true);

create policy "admin_all_lab"
  on lab_experiments for all
  using (is_admin())
  with check (is_admin());

-- ── site_settings policies ────────────────────────────────────────────────────
-- Public: read all settings (they're not sensitive)
create policy "public_read_settings"
  on site_settings for select
  using (true);

-- Admin: write settings
create policy "admin_write_settings"
  on site_settings for all
  using (is_admin())
  with check (is_admin());

-- ── admins table policies ─────────────────────────────────────────────────────
-- Only admins can see the admins table
create policy "admin_read_admins"
  on admins for select
  using (is_admin());

-- No one can insert/update/delete via RLS — manage manually via service role
-- (or add a specific super-admin policy if needed)

-- ============================================================
-- Storage bucket (create via Supabase dashboard or CLI)
-- See CMS_SETUP.md for instructions.
-- ============================================================
-- The `media` bucket should be created as PRIVATE with policies:
-- Public read: bucket_id = 'media' and name starts with 'public/'
-- Admin upload: is_admin() returning true
-- Admin delete: is_admin() returning true
