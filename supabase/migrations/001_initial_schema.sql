-- VisionForge AI Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table public.users (
  id uuid default uuid_generate_v4() primary key,
  clerk_id text unique not null,
  email text not null,
  name text not null,
  avatar text,
  credits integer default 5 not null,
  plan text default 'free' not null check (plan in ('free', 'basic', 'pro', 'unlimited')),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Projects table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  description text,
  status text default 'draft' not null check (status in ('draft', 'processing', 'completed', 'failed')),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Images table
create table public.images (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  original_url text not null,
  generated_url text,
  prompt text not null,
  enhanced_prompt text,
  negative_prompt text,
  style text,
  status text default 'pending' not null check (status in ('pending', 'processing', 'completed', 'failed')),
  created_at timestamp with time zone default now() not null
);

-- Credit transactions table
create table public.credit_transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  amount integer not null,
  type text not null check (type in ('purchase', 'usage', 'bonus', 'refund', 'subscription')),
  description text not null,
  created_at timestamp with time zone default now() not null
);

-- Subscriptions table
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  stripe_subscription_id text unique,
  plan text not null check (plan in ('free', 'basic', 'pro', 'unlimited')),
  status text not null check (status in ('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid', 'trialing')),
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Collections table
create table public.collections (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Collection items table
create table public.collection_items (
  id uuid default uuid_generate_v4() primary key,
  collection_id uuid references public.collections(id) on delete cascade not null,
  image_id uuid references public.images(id) on delete cascade not null,
  created_at timestamp with time zone default now() not null,
  unique(collection_id, image_id)
);

-- Favorites table
create table public.favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  image_id uuid references public.images(id) on delete cascade not null,
  created_at timestamp with time zone default now() not null,
  unique(user_id, image_id)
);

-- Notifications table
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  message text not null,
  type text default 'info' not null check (type in ('info', 'success', 'warning', 'error')),
  read boolean default false not null,
  created_at timestamp with time zone default now() not null
);

-- Create indexes
create index idx_users_clerk_id on public.users(clerk_id);
create index idx_projects_user_id on public.projects(user_id);
create index idx_images_project_id on public.images(project_id);
create index idx_credit_transactions_user_id on public.credit_transactions(user_id);
create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_favorites_user_id on public.favorites(user_id);
create index idx_notifications_user_id on public.notifications(user_id);

-- Create RLS policies
alter table public.users enable row level security;
alter table public.projects enable row level security;
alter table public.images enable row level security;
alter table public.credit_transactions enable row level security;
alter table public.subscriptions enable row level security;
alter table public.collections enable row level security;
alter table public.collection_items enable row level security;
alter table public.favorites enable row level security;
alter table public.notifications enable row level security;

-- Users policies
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = clerk_id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = clerk_id);

-- Projects policies
create policy "Users can view own projects" on public.projects
  for select using (user_id in (select id from public.users where clerk_id = auth.uid()));

create policy "Users can create own projects" on public.projects
  for insert with check (user_id in (select id from public.users where clerk_id = auth.uid()));

create policy "Users can update own projects" on public.projects
  for update using (user_id in (select id from public.users where clerk_id = auth.uid()));

create policy "Users can delete own projects" on public.projects
  for delete using (user_id in (select id from public.users where clerk_id = auth.uid()));

-- Images policies
create policy "Users can view own images" on public.images
  for select using (project_id in (
    select id from public.projects where user_id in (
      select id from public.users where clerk_id = auth.uid()
    )
  ));

create policy "Users can create own images" on public.images
  for insert with check (project_id in (
    select id from public.projects where user_id in (
      select id from public.users where clerk_id = auth.uid()
    )
  ));

-- Credit transactions policies
create policy "Users can view own transactions" on public.credit_transactions
  for select using (user_id in (select id from public.users where clerk_id = auth.uid()));

-- Collections policies
create policy "Users can view own collections" on public.collections
  for select using (user_id in (select id from public.users where clerk_id = auth.uid()));

create policy "Users can create own collections" on public.collections
  for insert with check (user_id in (select id from public.users where clerk_id = auth.uid()));

-- Favorites policies
create policy "Users can view own favorites" on public.favorites
  for select using (user_id in (select id from public.users where clerk_id = auth.uid()));

create policy "Users can create own favorites" on public.favorites
  for insert with check (user_id in (select id from public.users where clerk_id = auth.uid()));

create policy "Users can delete own favorites" on public.favorites
  for delete using (user_id in (select id from public.users where clerk_id = auth.uid()));

-- Notifications policies
create policy "Users can view own notifications" on public.notifications
  for select using (user_id in (select id from public.users where clerk_id = auth.uid()));

create policy "Users can update own notifications" on public.notifications
  for update using (user_id in (select id from public.users where clerk_id = auth.uid()));

-- Create storage buckets
insert into storage.buckets (id, name, public) values ('images', 'images', true);
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

-- Storage policies
create policy "Anyone can view images" on storage.objects
  for select using (bucket_id = 'images');

create policy "Authenticated users can upload images" on storage.objects
  for insert with check (bucket_id = 'images' and auth.role() = 'authenticated');

create policy "Anyone can view avatars" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Authenticated users can upload avatars" on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');
