# Custom CMS Setup & Deployment Guide — etornam.me

This guide provides instructions to connect, configure, and operate the custom Content Management System (CMS) for `etornam.me`.

---

## 1. Create a Supabase Project

1. Go to [database.new](https://database.new) or sign in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New project**.
3. Choose your organization, assign a project name (e.g. `dev-tornam-cms`), enter a strong database password, and pick a hosting region close to your primary audience.
4. Wait 1–2 minutes while Supabase provisions your PostgreSQL database, Auth engine, and Storage bucket infrastructure.

---

## 2. Environment Variables Configuration

Copy `.env.example` to your local environment file:

```bash
cp .env.example .env.local
```

Retrieve your project API keys from **Project Settings → API**:

| Variable | Description | Where to find |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your project URL | Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key (safe for browser) | Project Settings → API → `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret service role key (server-only) | Project Settings → API → `service_role` `secret` key |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS Service ID | EmailJS Dashboard (already configured) |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS Template ID | EmailJS Dashboard (already configured) |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS Public Key | EmailJS Dashboard (already configured) |

> [!CAUTION]
> **Never commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY`** in browser-accessible code. It bypasses Row Level Security and is only used in server-side administrative contexts.

---

## 3. Run Database Migrations

1. In the Supabase Dashboard, open the **SQL Editor** from the left navigation bar.
2. Click **New query**.
3. Open the migration file in this repository:
   [`supabase/migrations/001_initial_schema.sql`](file:///home/etor01/Desktop/github-bucket/dev-tornam/supabase/migrations/001_initial_schema.sql)
4. Copy its entire contents, paste them into the SQL Editor, and click **Run**.

This migration automatically:
- Creates the `admins` allowlist table.
- Creates content tables: `projects`, `notes`, `lab_experiments`, and `site_settings`.
- Configures indexes for fast slug lookup, sorting, and publication status queries.
- Seeds all existing hardcoded projects, thoughts, and site settings.
- Enables Row Level Security (RLS) on all tables with public read policies for published content and admin-only write permissions.

---

## 4. Provision the First Administrator

For security, an authenticated Supabase user is **not** an administrator by default. Administrator access requires an entry in the `admins` allowlist table.

### Step A: Create User in Supabase Auth
1. Go to **Authentication → Users** in your Supabase Dashboard.
2. Click **Add User → Create User**.
3. Enter your administrative email (e.g. `etornam@...`) and set a secure password.
4. Ensure **Auto Confirm User** is checked.
5. Click **Create User**.
6. Copy the newly created user's **User UID** (a UUID such as `9c7b4198-....`).

### Step B: Add User to Admins Allowlist
In the **SQL Editor**, execute the following SQL statement (replacing with your UID and email):

```sql
insert into admins (id, email)
values (
  'PASTE_YOUR_USER_UID_HERE',
  'your-email@example.com'
);
```

You can now log in at `/admin/login` using this email and password.

---

## 5. Configure the Storage Bucket

1. In the Supabase Dashboard, open **Storage**.
2. Click **New bucket**.
3. Set the bucket name to exactly:
   ```
   media
   ```
4. Toggle **Public bucket** to **ON** (allows public visitors to view published images).
5. Leave other settings as default and click **Save bucket**.

### Storage Security Policies (RLS)
Execute the following in the **SQL Editor** to ensure only authorized administrators can upload and delete images:

```sql
-- Allow public viewing of images in the media bucket
create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');

-- Allow only administrators to upload media
create policy "Admin upload media"
  on storage.objects for insert
  with check (
    bucket_id = 'media'
    and is_admin()
  );

-- Allow only administrators to delete media
create policy "Admin delete media"
  on storage.objects for delete
  using (
    bucket_id = 'media'
    and is_admin()
  );
```

---

## 6. Run the Project Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the test suite:
   ```bash
   npm test
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. Visit [http://localhost:3000/admin](http://localhost:3000/admin) — unauthenticated visitors are automatically redirected to `/admin/login`.
6. Log in with your admin credentials to access the CMS Dashboard.

---

## 7. Deploy to Production (Vercel)

1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New → Project** and import the repository.
3. In **Settings → Environment Variables**, add the environment variables from Section 2:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. Click **Deploy**.
5. Once deployed, verify:
   - Public pages (`/`, `/projects`, `/projects/[slug]`, `/thoughts`, `/lab`) render correctly.
   - Visiting `/admin` prompts for authentication.
   - CMS edits and newly published items reflect immediately on the site.

---

## 8. CMS Dashboard Overview

| Section | Route | Capabilities |
|---|---|---|
| **Overview** | `/admin` | Summary metrics (projects, notes, experiments count) & recent content |
| **Projects** | `/admin/projects` | Full CRUD, markdown editor, slug generator, cover image, tech stack, featured flag, display order, publish toggle |
| **Notes** | `/admin/notes` | Full CRUD, markdown editor, category & tag management, draft/publish controls |
| **Lab** | `/admin/lab` | Full CRUD for experimental prototypes, status tracking (`active`, `wip`, `archived`) |
| **Media** | `/admin/media` | Drag & drop file uploads to Supabase Storage, copy public URL, delete with confirmation |
| **Settings** | `/admin/settings` | Editable hero title, lead, biography, social links, contact email, and footer text |

---

## 9. Architecture & Security Highlights

- **Dual-Layer Authorisation**:
  - Edge middleware redirects unauthenticated users away from `/admin/*`.
  - Every protected server action and API route independently invokes `requireAdmin()`, validating the user's UUID against the `admins` PostgreSQL allowlist.
- **Row Level Security (RLS)**: Enforced directly at the database engine level. Unauthenticated public traffic can only `SELECT` records where `published = true`.
- **Zero-Break Fallbacks**: If Supabase credentials are missing or the database is temporarily unreachable, all public pages automatically fall back to existing portfolio data with zero downtime.
- **Next.js Cache Revalidation**: Mutations call `revalidatePath()` across affected public routes, ensuring content updates appear immediately after publishing.
