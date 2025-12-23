-- Create a table for public profiles (linked to auth.users)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  balance numeric(10, 2) default 10000.00,
  equity numeric(10, 2) default 10000.00,
  created_at timestamp with time zone default now()
);

-- Turn on Row Level Security
alter table profiles enable row level security;

-- Create policies for profiles
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- Create a table for trading positions
create table positions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  symbol text not null,
  type text check (type in ('BUY', 'SELL')) not null,
  volume numeric(10, 2) not null,
  entry_price numeric(10, 5) not null,
  profit numeric(10, 2) default 0.00,
  status text default 'OPEN',
  created_at timestamp with time zone default now()
);

-- Turn on Row Level Security
alter table positions enable row level security;

-- Create policies for positions
create policy "Users can view their own positions." on positions
  for select using ((select auth.uid()) = user_id);

create policy "Users can insert their own positions." on positions
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update their own positions." on positions
  for update using ((select auth.uid()) = user_id);

-- Optional: Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
