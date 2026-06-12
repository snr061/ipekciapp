# DECISIONS (ADR)

Mimari kararlar — kronolojik. Her giriş: bağlam, karar, sonuç.

---

## ADR-001 — Next.js App Router (2026-06-12)
**Bağlam:** Public site + ileride private workspace. SSR/RSC, route bazlı kod bölme, metadata API ve `next/image` gerek.
**Karar:** Next.js 16, App Router, `src/` dizini, TypeScript strict.
**Sonuç:** Modern React 19 + Server Components hazır; workspace için server-side auth/middleware kolay.

## ADR-002 — Paket yöneticisi: pnpm (2026-06-12)
**Bağlam:** Diskte hızlı, lockfile tutarlı, monorepo'ya açık kalmak istiyoruz.
**Karar:** pnpm (corepack üzerinden aktif). `pnpm-workspace.yaml` build script onayı için.
**Sonuç:** `package-lock.json` silindi, `pnpm-lock.yaml` repo'ya commit edilir.

## ADR-003 — UI: Tailwind v4 + shadcn/ui (radix-nova) (2026-06-12)
**Bağlam:** Premium hisli, hızlı geliştirilebilir, erişilebilir komponentler.
**Karar:** Tailwind v4 + shadcn radix-nova style, neutral base color, CSS variables, lucide ikonları.
**Sonuç:** Komponentler kod tabanında, ileride tam kontrol. Dark mode CSS değişkenleri hazır.

## ADR-004 — Backend: Supabase (2026-06-12)
**Bağlam:** Workspace için kimlik doğrulama (Magic Link + 2FA), Postgres + RLS, audit log ihtiyacı.
**Karar:** Supabase. MVP'de henüz bağlanmıyor — sadece env değişken adları `.env.example`'a yazıldı.
**Sonuç:** Bir sonraki fazda Supabase project + schema + RLS politikaları + middleware gate.

## ADR-005 — Hosting: Vercel + Cloudflare DNS (2026-06-12)
**Bağlam:** Next.js için en kısa yol Vercel; `ipekciapp.com` Cloudflare'de.
**Karar:** Vercel'de proje, Cloudflare DNS'te CNAME `ipekciapp.com` → Vercel.
**Sonuç:** Auto preview deploy + SSL otomatik. Adımları `SETUP.md`'de.

## ADR-006 — Dil: Sadece Türkçe (MVP) (2026-06-12)
**Bağlam:** Hedef kitle TR. i18n MVP'yi şişirir.
**Karar:** MVP tek dil TR (`html[lang="tr"]`, `og:locale=tr_TR`). i18n sonra.
**Sonuç:** `next-intl` veya benzeri sonradan eklenebilir; metinler kodda hardcoded.

## ADR-007 — Workspace: MVP'de placeholder (2026-06-12)
**Bağlam:** Workspace alanı içeriği son derece hassas. Auth/RLS/audit log altyapısı tam olana kadar yayınlanmamalı.
**Karar:** `/workspace` route'u sadece "Private Workspace — Coming Soon" gösterir, `robots: noindex`.
**Sonuç:** Gerçek implementasyon ayrı bir fazda. Yorum bloğu route'un üstüne not olarak yazıldı.

## ADR-008 — Secrets disiplini (2026-06-12)
**Bağlam:** Apple ID, banka, parola gibi hassas veriler asla repo'ya girmemeli.
**Karar:** `.env.example` sadece **isim + amaç** içerir. Gerçek değerler `.env.local` (gitignored) veya Vercel env panelinde.
**Sonuç:** `CLAUDE.md`'de açıkça yazılı; CI'a sonra `git secrets` veya `gitleaks` eklenebilir.
