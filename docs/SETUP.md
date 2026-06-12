# SETUP

Yeni bir makinede projeyi ayağa kaldırma rehberi.

---

## Gereksinimler
- **Node.js 20+** (öneri: 22 LTS)
- **pnpm** — `corepack enable && corepack prepare pnpm@latest --activate`
- macOS / Linux / WSL

## Lokal geliştirme
```bash
git clone git@github.com:<kullanici>/ipekciapp.git
cd ipekciapp
cp .env.example .env.local        # değerleri doldur (boş bırakılabilir, default'lar çalışır)
pnpm install
pnpm dev
```
Tarayıcı: <http://localhost:3000>

Komutlar:
- `pnpm dev` — geliştirme sunucusu
- `pnpm build` — production build
- `pnpm start` — production sunucu (build sonrası)
- `pnpm lint` — ESLint
- `pnpm tsc --noEmit` — type check

## Supabase (workspace fazına gelince)

> **Proje adı:** `ipekciapp` (oluşturulmuş — sahibi `snr061@gmail.com`).
> **DB şifresi, anon key, service_role key:** password manager'da. Bu repo'da
> **asla** tutulmaz. Bu dosyaya sadece proje adı yazılır.

1. <https://supabase.com/dashboard> → mevcut `ipekciapp` projesini aç (veya henüz oluşturulmadıysa New project)
2. Project Settings → API:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (**sadece server**)
3. Auth → Providers → Email (Magic Link) açık; TOTP factor enable.
4. Database → şema ve RLS politikaları (ayrı dokümanda).
5. `.env.local`'a yaz, **commit etme**.

## Brevo (gelecek)
1. <https://app.brevo.com> → SMTP & API → API Keys → "Generate".
2. `.env.local` → `BREVO_API_KEY=...`

## Vercel deploy
1. `pnpm dlx vercel login`
2. `pnpm dlx vercel link` (proje seç veya oluştur: `ipekciapp`)
3. Vercel Dashboard → Project → Settings → Environment Variables:
   - `NEXT_PUBLIC_SITE_URL=https://ipekciapp.com`
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (workspace fazı)
   - `SUPABASE_SERVICE_ROLE_KEY` (yalnız "Production" + "Preview", "Sensitive" işaretli)
4. `pnpm dlx vercel --prod` veya `main` branch'e push.

## Domain bağlama (Cloudflare → Vercel)
1. Vercel Dashboard → Domains → Add → `ipekciapp.com`
2. Vercel'in verdiği CNAME / A kayıtlarını al.
3. Cloudflare Dashboard → ipekciapp.com → DNS:
   - `@` → A `76.76.21.21` (Vercel)
   - `www` → CNAME `cname.vercel-dns.com`
   - "Proxied" yerine **"DNS only"** (gri bulut) — Vercel SSL kendi yönetir.
4. SSL otomatik gelir (~1-2 dk).

## Yeni MCP / API / servis eklenince
Bu dosya güncellenir: bağlantı adımları, env değişken adı, yerel test komutu.
