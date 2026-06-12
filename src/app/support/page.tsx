import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Destek",
  description:
    "ipekciapp ürünleri için iletişim, geri bildirim ve sıkça sorulan sorular.",
};

const SUPPORT_EMAIL = "snr061@gmail.com";

const faq = [
  {
    q: "Hangi platformlarda çalışıyor?",
    a: "Pastacım iPhone ve Android'de, Pastacım Pro buna ek olarak iPad'de tam ekran çalışır.",
  },
  {
    q: "Verilerim güvende mi?",
    a: "Hesap verileriniz uçtan uca şifreli olarak saklanır. Sadece sizin cihazlarınız erişebilir.",
  },
  {
    q: "Yeni özellik önermek istiyorum, nereye yazabilirim?",
    a: "Aşağıdaki e-posta adresine doğrudan ulaşabilirsiniz. Tüm önerileri okuyorum.",
  },
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-10">
        <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Destek
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Yardımcı olalım
        </h1>
        <p className="mt-3 text-muted-foreground">
          Sorularınız, geri bildirimleriniz veya iş birliği önerileriniz için
          doğrudan ulaşabilirsiniz.
        </p>
      </header>

      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
      >
        <Mail className="size-4" /> {SUPPORT_EMAIL}
      </a>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          Sıkça sorulanlar
        </h2>
        <dl className="mt-6 divide-y divide-border/60 border-y border-border/60">
          {faq.map((item) => (
            <div key={item.q} className="grid gap-1 py-5 sm:grid-cols-3">
              <dt className="font-medium">{item.q}</dt>
              <dd className="text-muted-foreground sm:col-span-2">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
