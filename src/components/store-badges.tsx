import { Apple, Play } from "lucide-react";

type Props = {
  appStoreUrl: string | null;
  playStoreUrl: string | null;
};

export function StoreBadges({ appStoreUrl, playStoreUrl }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <StoreLink
        href={appStoreUrl}
        title="App Store"
        subtitle="iPhone ve iPad için"
        icon={<Apple className="size-6" aria-hidden />}
      />
      <StoreLink
        href={playStoreUrl}
        title="Google Play"
        subtitle="Android için"
        icon={<Play className="size-6" aria-hidden />}
      />
    </div>
  );
}

function StoreLink({
  href,
  title,
  subtitle,
  icon,
}: {
  href: string | null;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  const isLive = Boolean(href);
  const className =
    "inline-flex min-w-[180px] items-center gap-3 rounded-xl border border-border bg-foreground px-4 py-3 text-background transition-colors hover:bg-foreground/90 aria-disabled:cursor-not-allowed aria-disabled:opacity-60 aria-disabled:hover:bg-foreground";

  const inner = (
    <>
      {icon}
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[10px] uppercase tracking-wider opacity-80">
          {isLive ? "İndir" : "Yakında"}
        </span>
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-[11px] opacity-70">{subtitle}</span>
      </span>
    </>
  );

  if (!isLive) {
    return (
      <span className={className} aria-disabled="true" role="button">
        {inner}
      </span>
    );
  }

  return (
    <a
      href={href!}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {inner}
    </a>
  );
}
