# ipekciapp.com — Claude için kısa rehber

## Proje
Soner İpekci'nin kişisel dijital merkezi. İki bölüm: **public** (tanıtım, uygulamalar,
support, privacy) ve **private workspace** (kişisel finans, hedefler, kasa — şimdilik
"Coming Soon" placeholder).

## Stack
Next.js 16 (App Router) · TypeScript · Tailwind v4 · shadcn/ui (radix-nova) · Supabase (planlı) · Vercel · pnpm

## Klasör haritası
- `src/app/` — route'lar (`/`, `/apps`, `/apps/pastacim`, `/apps/pastacim-pro`, `/support`, `/privacy`, `/workspace`)
- `src/components/` — `site-header`, `site-footer`, `app-card`, `app-detail`, `store-badges`, `qr-placeholder`, `ui/` (shadcn)
- `src/lib/apps-data.ts` — uygulama meta verisi (tek kaynak)
- `src/lib/utils.ts` — `cn()` (shadcn)
- `public/apps/` — uygulama ikonları (placeholder SVG)
- `docs/` — PROGRESS, DECISIONS, SETUP

## Komutlar
- `pnpm dev` — local dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm lint` — ESLint
- `pnpm tsc --noEmit` — type check

## Güvenlik kuralları (sıkı)
- **Secret, API key, token, parola, Apple ID, banka bilgisi — repo'ya asla yazılmaz.**
- `.env.local` git'lenmez. Sadece `.env.example` commit edilir, sadece **isim + amaç** içerir.
- Workspace verisi gelecekte Supabase RLS + audit log altında saklanır.
- Service role key sadece server-side kullanılır, `NEXT_PUBLIC_` prefix asla.

## Hafıza protokolü
- Her önemli iş bitiminde **`docs/PROGRESS.md`** güncellenir (yeni "Oturum N" bölümü).
- Yeni MCP / API / config eklenince **`docs/SETUP.md`** güncellenir.
- Mimari kararlar **`docs/DECISIONS.md`** içine ADR formatında yazılır.
- Oturum başında sadece `PROGRESS.md` **son bölümü** okunur.
- 5 oturumdan eski detaylar tek satıra özetlenir.

## Hesap referansları
- github · supabase · cloudflare · brevo · iletişim/destek → **`snr061@gmail.com`**
- Gerçek kimlik bilgileri (parola, token, Apple ID): **password manager**, repo değil.
