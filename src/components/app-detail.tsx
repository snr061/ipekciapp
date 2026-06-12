import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { StoreBadges } from "@/components/store-badges";
import { QrPlaceholder } from "@/components/qr-placeholder";
import { type AppMeta, platformLabels } from "@/lib/apps-data";

export function AppDetail({ app }: { app: AppMeta }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/apps"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Tüm uygulamalar
      </Link>

      <header className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div
          className={`flex size-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br ${app.accent} ring-1 ring-border`}
        >
          <Image
            src={app.iconPath}
            alt={`${app.name} ikonu`}
            width={72}
            height={72}
            className="size-16 rounded-2xl"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {app.name}
          </h1>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg">
            {app.tagline}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {app.platforms.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {platformLabels[p]}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="mt-10 max-w-2xl">
        <h2 className="text-lg font-semibold tracking-tight">Hakkında</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {app.longDescription}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">İndir</h2>
        <div className="mt-4 flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-12">
          <StoreBadges
            appStoreUrl={app.appStoreUrl}
            playStoreUrl={app.playStoreUrl}
          />
          <div className="flex gap-6">
            {app.appStoreUrl !== undefined && (
              <QrPlaceholder label="App Store QR" />
            )}
            {app.playStoreUrl !== undefined && (
              <QrPlaceholder label="Google Play QR" />
            )}
          </div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-lg font-semibold tracking-tight">
          Ekran görüntüleri
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[9/16] rounded-2xl border border-dashed border-border bg-muted/40"
              aria-hidden
            />
          ))}
        </div>
      </section>
    </div>
  );
}
