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

### Tamam (devam) — 2026-06-12 (Step 2)
- Repo görünürlüğü: PRIVATE → **PUBLIC** (GitHub Free + private'da branch protection / Rulesets kapalı olduğu için). Workspace verisi RLS ile Supabase'te koruma altında, secret yok.
- GitHub Ruleset `main-protection` (id 17604313): `deletion`, `non_fast_forward`, `required_linear_history` — silme & force-push yasak, linear history zorunlu.
- Vercel GitHub App bağlandı: push → otomatik production deploy + commit status (`Vercel`).
- Git local config düzeltildi: `user.email=snr061@gmail.com`, `user.name=Soner İpekci`. Önceki commit'lerde bozuk author (`613463App@`) vardı — Vercel "no GitHub account match" hatası bu yüzdendi.

### Tamam (devam) — 2026-06-12 (Step 3 — kod tarafı)
- Supabase paketleri: `@supabase/supabase-js` + `@supabase/ssr` eklendi.
- Supabase client'ları: `src/lib/supabase/{server,client,middleware}.ts`.
- Root middleware: `src/middleware.ts` — `/workspace/**` ve `/auth/**` gate; auth yoksa → login, email allowlist dışıysa → home + signOut, AAL2 yoksa → MFA.
- Workspace sayfaları: `/workspace` (auth'lu dashboard placeholder), `/workspace/login` (Magic Link), `/workspace/mfa` (TOTP enroll & verify), `/auth/callback` (PKCE exchange).
- `src/lib/auth.ts` — `WORKSPACE_ALLOWED_EMAILS` env'inden allowlist (default: `snr061@gmail.com`).
- `.env.example` güncellendi: `WORKSPACE_ALLOWED_EMAILS` eklendi, Supabase env'leri canlı (artık MVP'de kullanılıyor).
- Git rewrite: `613463App@` author bilgisi 3 eski commit'ten temizlendi (filter-repo + force-push). Ruleset yeniden kuruldu. Vercel'de eski hash'li 5 deploy silindi.
- Git config global: `Soner İpekci <snr061@gmail.com>` — bu makinedeki tüm yeni projelere de varsayılan.

### Sıradaki
- Supabase Dashboard config: anon key + URL local/Vercel env'lere, Auth URL Configuration, Sign-ups kapat, TOTP enable, e-posta SMTP (Brevo).
- Workspace test: lokal magic link akışı, MFA enrollment.
- Workspace içerik: finans/hedef/kasa şemaları (RLS politikalarıyla), audit log.
- Gerçek App Store / Google Play URL'leri, gerçek QR, gerçek ekran görüntüleri.
- `og-image` üretimi (next/og).
