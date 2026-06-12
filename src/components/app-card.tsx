import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { type AppMeta, platformLabels } from "@/lib/apps-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function AppCard({ app }: { app: AppMeta }) {
  return (
    <Link
      href={`/apps/${app.slug}`}
      className="group block focus:outline-none"
    >
      <Card className="relative h-full overflow-hidden border-border/70 transition-all group-hover:-translate-y-0.5 group-hover:border-foreground/20 group-hover:shadow-lg group-focus-visible:border-ring group-focus-visible:ring-3 group-focus-visible:ring-ring/40">
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${app.accent} opacity-60`}
          aria-hidden
        />
        <CardHeader className="relative">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-xl">{app.name}</CardTitle>
              <CardDescription className="mt-1 text-sm">
                {app.tagline}
              </CardDescription>
            </div>
            <ArrowUpRight
              className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-muted-foreground">{app.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {app.platforms.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {platformLabels[p]}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
