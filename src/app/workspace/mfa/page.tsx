"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type Mode = "loading" | "enroll" | "verify";

type EnrollData = {
  factorId: string;
  qrSrc: string;
  secret: string;
};

function toQrSrc(raw: string): string {
  if (raw.startsWith("data:")) return raw;
  return `data:image/svg+xml;utf8,${encodeURIComponent(raw)}`;
}

export default function MfaPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("loading");
  const [enroll, setEnroll] = useState<EnrollData | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      const supabase = createClient();
      const { data: list, error: listError } = await supabase.auth.mfa.listFactors();
      if (cancelled) return;
      if (listError) {
        setError(listError.message);
        setMode("verify");
        return;
      }

      const verified = list?.totp?.find((f) => f.status === "verified");
      if (verified) {
        setFactorId(verified.id);
        setMode("verify");
        return;
      }

      const { data: enrolled, error: enrollError } =
        await supabase.auth.mfa.enroll({
          factorType: "totp",
          friendlyName: `ipekciapp-${new Date().toISOString().slice(0, 10)}`,
        });
      if (cancelled) return;
      if (enrollError) {
        setError(enrollError.message);
        setMode("verify");
        return;
      }

      setEnroll({
        factorId: enrolled.id,
        qrSrc: toQrSrc(enrolled.totp.qr_code),
        secret: enrolled.totp.secret,
      });
      setFactorId(enrolled.id);
      setMode("enroll");
    }

    void initialize();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleVerify(event: React.FormEvent) {
    event.preventDefault();
    if (!factorId) return;
    setBusy(true);
    setError(null);

    const supabase = createClient();
    const { data: challenge, error: challengeError } =
      await supabase.auth.mfa.challenge({ factorId });
    if (challengeError || !challenge) {
      setError(challengeError?.message ?? "Challenge failed");
      setBusy(false);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: code.replace(/\s/g, ""),
    });

    if (verifyError) {
      setError(verifyError.message);
      setBusy(false);
      return;
    }

    router.push("/workspace");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <header className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <ShieldCheck className="size-5" aria-hidden />
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          İki adımlı doğrulama
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "enroll"
            ? "Authenticator uygulamasıyla QR kodu tara, sonra 6 haneli kodu gir."
            : "Authenticator uygulamandaki 6 haneli kodu gir."}
        </p>
      </header>

      <div className="mt-8 space-y-4">
        {mode === "loading" && (
          <div className="flex justify-center py-6">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {mode === "enroll" && enroll && (
          <div className="space-y-3">
            <div className="flex justify-center rounded-xl border border-border bg-background p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={enroll.qrSrc}
                alt="MFA QR kodu"
                width={192}
                height={192}
                className="size-48"
              />
            </div>
            <details className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs">
              <summary className="cursor-pointer text-muted-foreground">
                Manuel kurulum kodu
              </summary>
              <code className="mt-2 block break-all font-mono">{enroll.secret}</code>
            </details>
          </div>
        )}

        {(mode === "enroll" || mode === "verify") && (
          <form onSubmit={handleVerify} className="space-y-3">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9 ]*"
              autoComplete="one-time-code"
              maxLength={7}
              required
              autoFocus
              placeholder="123 456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-center font-mono text-lg tracking-widest outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/40"
            />
            {error && (
              <p className="flex items-start gap-1.5 text-xs text-destructive">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                <span>{error}</span>
              </p>
            )}
            <Button
              type="submit"
              disabled={busy || code.length < 6}
              className="w-full"
              size="lg"
            >
              {busy ? "Doğrulanıyor…" : "Doğrula"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
