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

### Tamam (devam) — 2026-06-12
- GitHub repo: `snr061/ipekciapp` (PRIVATE), `main` push edildi. gh CLI snr061 hesabı keychain'e bağlı.
- Vercel project: `ipekciapp-s-projects/ipekciapp` (org `ipekciapp-s-projects`). İlk production deploy başarılı.
- Vercel env: `NEXT_PUBLIC_SITE_URL=https://ipekciapp.com` (production).
- Domain: `ipekciapp.com` ve `www.ipekciapp.com` Vercel projeye eklendi.
- Cloudflare DNS: `A @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com` (her ikisi de DNS-only / gri bulut). Brevo email kayıtları (DKIM/DMARC/verification) korundu.
- SSL: Vercel otomatik (Let's Encrypt, 90 gün, auto-renew). HSTS max-age=2y.
- Canlı: <https://ipekciapp.com> + <https://www.ipekciapp.com> tüm 7 route 200.

### Sıradaki
- GitHub: `main` branch protection (PR + review zorunlu), Vercel GitHub App bağlantısı (push'ta otomatik preview/prod).
- Workspace auth: Supabase project `ipekciapp` env'leri, Magic Link + TOTP, middleware gate `/workspace`, RLS şema taslağı.
- Gerçek App Store / Google Play URL'leri, gerçek QR, gerçek ekran görüntüleri.
- `og-image` üretimi (next/og) — gelecek oturum.
