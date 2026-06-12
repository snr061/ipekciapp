# PROGRESS

## Oturum 1 — MVP iskelet (2026-06-12)

### Tamam
- Next.js 16 (App Router) + TypeScript + Tailwind v4 iskeleti kuruldu, src/ yapısına geçirildi.
- pnpm'e migrate edildi (`corepack` üzerinden), `pnpm-workspace.yaml` ile build script onayları (sharp, unrs-resolver) yönetiliyor.
- shadcn/ui (radix-nova style, neutral base) init edildi; `button`, `card` komponentleri eklendi.
- Ortak komponentler yazıldı: `site-header`, `site-footer`, `app-card`, `app-detail`, `store-badges`, `qr-placeholder`.
- Veri katmanı: `src/lib/apps-data.ts` — Pastacım ve Pastacım Pro tek kaynak meta verisi.
- 7 route tamam:
  - `/` — premium landing (hero + uygulama özet grid)
  - `/apps` — tüm uygulama listesi
  - `/apps/pastacim`, `/apps/pastacim-pro` — detay sayfaları (store badges + QR placeholder + screenshot grid)
  - `/support` — mailto + SSS
  - `/privacy` — gizlilik politikası iskeleti
  - `/workspace` — "Private Workspace — Coming Soon" (noindex, auth gate notu yorum olarak)
- Root layout: Inter font, TR locale, metadata (title template, OG).
- Public ikonlar: `pastacim-icon.svg`, `pastacim-pro-icon.svg` (placeholder gradient).
- `.env.example`, `.gitignore`, `CLAUDE.md`, `docs/{PROGRESS,DECISIONS,SETUP}.md` oluşturuldu.

### Sıradaki
- Gerçek App Store / Google Play URL'leri `apps-data.ts` üzerinden eklenecek.
- Gerçek QR kod üretimi (`qrcode` lib veya statik PNG).
- Gerçek ekran görüntüleri.
- Workspace auth: Supabase Auth (Magic Link + TOTP 2FA) + middleware gate + RLS şeması.
- Vercel'e ilk deploy + Cloudflare DNS bağlantısı.
- `og-image` üretimi (next/og) — gelecek oturum.
