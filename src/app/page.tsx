import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppCard } from "@/components/app-card";
import { apps } from "@/lib/apps-data";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-24">
        <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          ipekciapp.com
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Soner İpekci.
          <br />
          <span className="text-muted-foreground">
            Yazılım üretiyorum, gerçek sorunlar çözüyorum.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Pastacılar için ürettiğim mobil uygulamalar ve diğer kişisel
          projelerin tek adresi.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/apps">
              Uygulamalara göz at
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/support">
              <Mail />
              İletişim
            </Link>
          </Button>
        </div>
      </section>

      <section className="pb-20">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Uygulamalarım
          </h2>
          <Link
            href="/apps"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Tümü →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </div>
  );
}
