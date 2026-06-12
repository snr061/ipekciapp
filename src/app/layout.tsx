import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://ipekciapp.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Soner İpekci — ipekciapp",
    template: "%s · ipekciapp",
  },
  description:
    "Soner İpekci'nin kişisel dijital merkezi. Ürettiği uygulamalar, iletişim ve gizlilik bilgileri.",
  openGraph: {
    title: "Soner İpekci — ipekciapp",
    description:
      "Kişisel dijital merkez. Pastacım ve Pastacım Pro uygulamalarının evi.",
    url: siteUrl,
    siteName: "ipekciapp",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
