// Private Workspace
// Erişim middleware tarafından korunur (src/middleware.ts):
// 1) Supabase auth oturumu zorunlu (yoksa /workspace/login)
// 2) E-posta WORKSPACE_ALLOWED_EMAILS allowlist'inde olmalı
// 3) MFA AAL2 zorunlu (TOTP) — yoksa /workspace/mfa'ya yönlenir
// Bu sayfa env yoksa minimal "Coming Soon" placeholder gösterir.

import type { Metadata } from "next";
import { Lock } from "lucide-react";

import { SignOutButton } from "@/components/sign-out-button";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Workspace",
  description: "Private Workspace",
  robots: { index: false, follow: false },
};

export default async function WorkspacePage() {
  const supabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseConfigured) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Lock className="size-5" aria-hidden />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Private Workspace — Coming Soon
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Erişim kontrolü hazırlanıyor.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            Workspace
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Hoş geldin
          </h1>
          {user?.email && (
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          )}
        </div>
        <SignOutButton />
      </header>

      <section className="rounded-2xl border border-border bg-muted/20 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Workspace içeriği hazırlanıyor. Burada finans, hedefler, kişisel
          kasa ve özel notlar yer alacak.
        </p>
      </section>
    </div>
  );
}
