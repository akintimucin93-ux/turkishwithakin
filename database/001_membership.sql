-- Run once in a NEW Supabase project's SQL editor. Does not touch existing lesson files.
begin;
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 first_name text not null check(char_length(first_name) between 1 and 80),
 last_name text not null check(char_length(last_name) between 1 and 80),
 email text not null, level text not null check(level in ('a1','a2','b1')),
 timezone text not null default 'Europe/Istanbul',
 marketing_consent boolean not null default false,
 consent_updated_at timestamptz not null default now(),
 created_at timestamptz not null default now()
);
create table public.user_roles(user_id uuid primary key references auth.users(id) on delete cascade, role text not null check(role in ('student','admin')) default 'student');
create table public.progress (
 user_id uuid references auth.users(id) on delete cascade,
 content_id text not null, state text not null check(state in ('started','completed')),
 updated_at timestamptz not null default now(), completed_at timestamptz,
 primary key(user_id,content_id)
);
create table public.attempts (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 assessment_id text not null, correct integer not null check(correct>=0), total integer not null check(total>0 and correct<=total),
 answers jsonb not null, mistakes jsonb not null, created_at timestamptz not null default now()
);
create table public.lesson_slots (
 id uuid primary key default gen_random_uuid(), starts_at timestamptz not null, ends_at timestamptz not null,
 kind text not null check(kind in ('conversation','a1-group','a2-group','b1-group')), capacity integer not null default 1 check(capacity between 1 and 12),
 active boolean not null default true, check(ends_at>starts_at), unique(starts_at,kind)
);
create table public.lesson_requests (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 slot_id uuid not null references public.lesson_slots(id), phone text not null check(char_length(phone) between 7 and 32),
 note text not null default '' check(char_length(note)<=1000), status text not null default 'pending' check(status in ('pending','confirmed','declined','cancelled')),
 email_status text not null default 'pending' check(email_status in ('pending','sent','failed')), created_at timestamptz not null default now()
);
create unique index request_active_unique on public.lesson_requests(user_id,slot_id) where status in ('pending','confirmed');
create table public.feedback (
 user_id uuid not null references auth.users(id) on delete cascade, level text not null, fingerprint text not null,
 language text not null, text text not null, source text not null, created_at timestamptz not null default now(),
 primary key(user_id,level,language)
);
create table public.admin_audit(id bigint generated always as identity primary key, actor uuid references auth.users(id), action text not null, target text not null, created_at timestamptz default now());
create function public.new_student_profile() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,first_name,last_name,email,level,timezone,marketing_consent)
 values(new.id,trim(new.raw_user_meta_data->>'first_name'),trim(new.raw_user_meta_data->>'last_name'),new.email,
 new.raw_user_meta_data->>'level',coalesce(nullif(new.raw_user_meta_data->>'timezone',''),'Europe/Istanbul'),coalesce((new.raw_user_meta_data->>'marketing_consent')::boolean,false));
 -- A role supplied in signup metadata is deliberately ignored.
 insert into public.user_roles(user_id,role) values(new.id,'student');
 return new;
end $$;
create trigger on_student_signup after insert on auth.users for each row execute procedure public.new_student_profile();
create function public.sync_student_email() returns trigger language plpgsql security definer set search_path='' as $$
begin update public.profiles set email=new.email where id=new.id; return new; end $$;
create trigger on_student_email_change after update of email on auth.users for each row execute procedure public.sync_student_email();
-- All writes are made by the Worker after verifying the access token. Browser keys cannot write scores or grant roles.
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.progress enable row level security;
alter table public.attempts enable row level security;
alter table public.lesson_slots enable row level security;
alter table public.lesson_requests enable row level security;
alter table public.feedback enable row level security;
alter table public.admin_audit enable row level security;
create policy own_profile on public.profiles for select to authenticated using(id=auth.uid());
create policy own_role on public.user_roles for select to authenticated using(user_id=auth.uid());
create policy own_progress on public.progress for select to authenticated using(user_id=auth.uid());
create policy own_attempts on public.attempts for select to authenticated using(user_id=auth.uid());
create policy visible_slots on public.lesson_slots for select to authenticated using(active and starts_at>now());
create policy own_requests on public.lesson_requests for select to authenticated using(user_id=auth.uid());
create policy own_feedback on public.feedback for select to authenticated using(user_id=auth.uid());
revoke all on public.profiles,public.user_roles,public.progress,public.attempts,public.lesson_slots,public.lesson_requests,public.feedback,public.admin_audit from anon;
grant all on public.profiles,public.user_roles,public.progress,public.attempts,public.lesson_slots,public.lesson_requests,public.feedback,public.admin_audit to service_role;
revoke all on public.profiles,public.user_roles,public.progress,public.attempts,public.lesson_slots,public.lesson_requests,public.feedback,public.admin_audit from authenticated;
grant select on public.profiles,public.user_roles,public.progress,public.attempts,public.lesson_slots,public.lesson_requests,public.feedback to authenticated;
create function public.reserve_lesson(p_user uuid,p_slot uuid,p_phone text,p_note text) returns setof public.lesson_requests language plpgsql security definer set search_path='' as $$
declare s public.lesson_slots; n integer;
begin
 perform id from public.profiles where id=p_user for update;
 if not found then raise exception 'Student profile unavailable'; end if;
 select count(*) into n from public.lesson_requests where user_id=p_user and status='pending';
 if n>=5 then raise exception 'Too many pending requests'; end if;
 select * into s from public.lesson_slots where id=p_slot for update;
 if not found or not s.active or s.starts_at<=now() then raise exception 'Slot unavailable'; end if;
 select count(*) into n from public.lesson_requests where slot_id=p_slot and status in ('pending','confirmed');
 if n>=s.capacity then raise exception 'Slot full'; end if;
 return query insert into public.lesson_requests(user_id,slot_id,phone,note) values(p_user,p_slot,p_phone,p_note) returning *;
end $$;
revoke all on function public.reserve_lesson(uuid,uuid,text,text) from public,anon,authenticated;
grant execute on function public.reserve_lesson(uuid,uuid,text,text) to service_role;
revoke all on function public.new_student_profile() from public,anon,authenticated;
revoke all on function public.sync_student_email() from public,anon,authenticated;
grant usage,select on sequence public.admin_audit_id_seq to service_role;
commit;
-- Grant your own verified account admin access MANUALLY, never through the signup form:
-- update public.user_roles set role='admin' where user_id=(select id from auth.users where email='YOUR_VERIFIED_OWNER_EMAIL');
