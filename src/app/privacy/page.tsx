import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik",
  description:
    "ipekciapp uygulamalarının kişisel verileri nasıl topladığı ve sakladığına dair bilgilendirme.",
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 dark:prose-invert">
      <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
        Gizlilik
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        Gizlilik politikası
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Son güncelleme: 2026-06-12
      </p>

      <Section title="Toplanan veriler">
        ipekciapp ürünleri, hizmetin sağlanabilmesi için gereken asgari veriyi
        toplar. Hesap bilgileri (e-posta), kullanım verisi ve uygulama
        içerisinde girdiğiniz iş verileri (sipariş, müşteri vb.) kullanıcının
        kontrolündedir.
      </Section>

      <Section title="Verilerin saklanması">
        Veriler, kullanıcının kendi hesabıyla ilişkili olarak güvenli sunucu
        altyapısında saklanır. Hassas alanlar şifrelenerek tutulur. Üçüncü
        taraflarla paylaşılmaz.
      </Section>

      <Section title="Çerezler ve analitik">
        ipekciapp.com web sitesi pazarlama veya takip amaçlı üçüncü taraf
        çerez kullanmaz. Yalnızca temel oturum gereksinimleri için teknik
        çerezler kullanılabilir.
      </Section>

      <Section title="Haklarınız">
        Verilerinizin silinmesini, dışa aktarılmasını veya düzeltilmesini her
        zaman talep edebilirsiniz. Bunun için destek sayfasındaki e-posta
        adresinden ulaşabilirsiniz.
      </Section>

      <p className="mt-10 text-sm text-muted-foreground">
        Bu metin başlangıç sürümüdür ve uygulamalar yayımlandıkça
        güncellenecektir.
      </p>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{children}</p>
    </section>
  );
}
