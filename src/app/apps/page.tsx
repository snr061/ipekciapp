import type { Metadata } from "next";

import { AppCard } from "@/components/app-card";
import { apps } from "@/lib/apps-data";

export const metadata: Metadata = {
  title: "Uygulamalar",
  description: "Soner İpekci tarafından üretilen mobil uygulamaların listesi.",
};

export default function AppsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-10">
        <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Uygulamalar
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Üretilen yazılımlar
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Hepsi günlük kullanım için tasarlandı. Detay sayfasında platform
          bilgileri ve mağaza linklerini bulabilirsin.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {apps.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
      </div>
    </div>
  );
}
