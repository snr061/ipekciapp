// Private Workspace
// Bu alan ileride Supabase Auth (Magic Link + TOTP 2FA), Row-Level Security
// ve audit log ile korunacak. Public içerik göstermez. Auth gate eklenene
// kadar canlıda da sadece aşağıdaki placeholder görünür.

import type { Metadata } from "next";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Workspace",
  description: "Private Workspace — Coming Soon",
  robots: { index: false, follow: false },
};

export default function WorkspacePage() {
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
          Bu alan kişisel kullanım içindir. Erişim kontrolü hazırlanıyor.
        </p>
      </div>
    </div>
  );
}
