"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "sent" | "error";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const supabase = createClient();
    const origin = window.location.origin;

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${origin}/auth/callback?next=/workspace` },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("sent");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <header className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Workspace girişi
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          E-posta adresine tek seferlik bir giriş bağlantısı göndereceğiz.
        </p>
      </header>

      <div className="mt-8">
        {status === "sent" ? (
          <div className="rounded-xl border border-border bg-muted/40 p-6 text-center">
            <Mail className="mx-auto size-8 text-muted-foreground" aria-hidden />
            <p className="mt-3 text-sm font-medium">Bağlantı gönderildi</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {email} adresine gelen e-postadaki bağlantıya tıkla. Bağlantı tek
              seferliktir.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              autoFocus
              autoComplete="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/40"
            />
            {status === "error" && (
              <p className="text-xs text-destructive">{message}</p>
            )}
            <Button
              type="submit"
              disabled={status === "sending"}
              className="w-full"
              size="lg"
            >
              <Mail />
              {status === "sending" ? "Gönderiliyor…" : "Giriş bağlantısı gönder"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
