import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {year} Soner İpekci · ipekciapp.com</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/apps" className="hover:text-foreground">
            Uygulamalar
          </Link>
          <Link href="/support" className="hover:text-foreground">
            Destek
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            Gizlilik
          </Link>
        </nav>
      </div>
    </footer>
  );
}
