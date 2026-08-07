-- ============================================================
-- Digital Developers — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

-- ---------- 1. PROFILES (extends auth.users) ----------
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  role text not null default 'pending' check (role in ('admin','super_admin','pending')),
  status text not null default 'pending' check (status in ('active','pending','rejected')),
  created_at timestamptz not null default now()
);

-- First registered user becomes Super Admin (change this manually in
-- Dashboard → Authentication → Users if you prefer a different account):
insert into public.profiles (id, email, full_name, role, status)
select id, email, 'Super Admin', 'super_admin', 'active'
from auth.users
on conflict (id) do nothing;

-- ---------- 2. SERVICES ----------
create table if not exists public.services (
  id bigint generated always as identity primary key,
  title text not null,
  "desc" text not null default '',
  icon text default 'briefcase',
  sort int default 0,
  created_at timestamptz not null default now()
);

-- ---------- 3. PORTFOLIO ----------
create table if not exists public.portfolio (
  id bigint generated always as identity primary key,
  title text not null,
  cat text default 'Web',
  img text default '',
  "desc" text default '',
  created_at timestamptz not null default now()
);

-- ---------- 4. BLOGS ----------
create table if not exists public.blogs (
  id bigint generated always as identity primary key,
  title text not null,
  cat text default 'Web Design',
  slug text default '',
  img text default '',
  excerpt text default '',
  date date default current_date,
  created_at timestamptz not null default now()
);

-- ---------- 5. TESTIMONIALS ----------
create table if not exists public.testimonials (
  id bigint generated always as identity primary key,
  name text not null,
  company text default '',
  rating int default 5 check (rating between 1 and 5),
  text text default '',
  created_at timestamptz not null default now()
);

-- ---------- 6. TEAM ----------
create table if not exists public.team (
  id bigint generated always as identity primary key,
  name text not null,
  role text default '',
  photo text default '',
  bio text default '',
  created_at timestamptz not null default now()
);

-- ---------- 7. CONTACT SUBMISSIONS ----------
create table if not exists public.contact_submissions (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text default '',
  message text default '',
  status text not null default 'unread' check (status in ('unread','read')),
  created_at timestamptz not null default now()
);

-- ---------- 8. ADMIN REQUESTS ----------
create table if not exists public.admin_requests (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  full_name text,
  reason text default '',
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

-- ---------- 9. SETTINGS (single row) ----------
create table if not exists public.settings (
  id bigint generated always as identity primary key,
  hero_title text default 'Building Digital Experiences That Help Businesses Grow.',
  hero_sub text default 'We craft premium websites and web applications for ambitious brands.',
  email text default 'ri590590590@gmail.com',
  phone text default '+923710753644',
  address text default 'Lahore, Punjab, Pakistan',
  whatsapp text default '923710753644',
  facebook text default '',
  instagram text default '',
  updated_at timestamptz not null default now()
);
insert into public.settings (id) values (1) on conflict (id) do nothing;

-- ---------- STORAGE BUCKET ----------
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

-- ---------- ROW LEVEL SECURITY ----------
alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.portfolio enable row level security;
alter table public.blogs enable row level security;
alter table public.testimonials enable row level security;
alter table public.team enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.admin_requests enable row level security;
alter table public.settings enable row level security;

-- Public can read content (the website reads via anon key):
create policy "public read services" on public.services for select using (true);
create policy "public read portfolio" on public.portfolio for select using (true);
create policy "public read blogs" on public.blogs for select using (true);
create policy "public read testimonials" on public.testimonials for select using (true);
create policy "public read team" on public.team for select using (true);
create policy "public read settings" on public.settings for select using (true);

-- Public can insert contact submissions (contact form):
create policy "public insert submissions" on public.contact_submissions for insert with check (true);

-- Authenticated admins can write content:
create policy "admin write services" on public.services for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'));
create policy "admin write portfolio" on public.portfolio for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'));
create policy "admin write blogs" on public.blogs for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'));
create policy "admin write testimonials" on public.testimonials for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'));
create policy "admin write team" on public.team for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'));
create policy "admin write settings" on public.settings for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'));

-- Admins can manage submissions (read all, update status, delete):
create policy "admin manage submissions" on public.contact_submissions for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'));

-- Users can read their own profile; super_admin can read/update all profiles:
create policy "users read own profile" on public.profiles for select
  using (auth.uid() = id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'super_admin'));

-- Admin requests: any authenticated user can insert (request access); super_admin manages:
create policy "any user can request" on public.admin_requests for insert with check (auth.uid() is not null);
create policy "super admin manage requests" on public.admin_requests for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'super_admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'super_admin'));

-- Storage: public read, authenticated admins can upload:
create policy "public read storage" on storage.objects for select using (bucket_id = 'site-images');
create policy "admin upload storage" on storage.objects for insert
  with check (bucket_id = 'site-images' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','super_admin') and p.status = 'active'));

-- ============================================================
-- SETUP INSTRUCTIONS (also shown in the dashboard)
-- 1. Create a project at supabase.com
-- 2. Run this whole file in SQL Editor
-- 3. Settings → API → copy Project URL + anon key
-- 4. Paste both into the SUPABASE_CONFIG object at the top of
--    the <script> in admin/index.html
-- 5. The FIRST registered user is auto-promoted to Super Admin
-- ============================================================
