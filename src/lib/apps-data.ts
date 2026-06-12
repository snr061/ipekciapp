export type AppPlatform = "ios" | "android" | "ipados";

export type AppMeta = {
  slug: "pastacim" | "pastacim-pro";
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  platforms: AppPlatform[];
  appStoreUrl: string | null;
  playStoreUrl: string | null;
  iconPath: string;
  accent: string;
};

export const apps: AppMeta[] = [
  {
    slug: "pastacim",
    name: "Pastacım",
    tagline: "Pasta atölyenizin cebinizdeki yardımcısı.",
    description:
      "Sipariş, müşteri ve teslimat takibini tek bir sade arayüzde toplar.",
    longDescription:
      "Pastacım, küçük ve orta ölçekli pasta atölyeleri için tasarlanmıştır. Siparişlerinizi tek bir akışta yönetir, müşteri kartlarını saklar, teslimat tarihlerini hatırlatır ve günün özetini ana ekranda sunar. İnternet bağlantınız olmasa bile çalışmaya devam eder.",
    platforms: ["ios", "android"],
    appStoreUrl: null,
    playStoreUrl: null,
    iconPath: "/apps/pastacim-icon.svg",
    accent: "from-rose-200/40 to-amber-200/40",
  },
  {
    slug: "pastacim-pro",
    name: "Pastacım Pro",
    tagline: "Profesyonel ekipler için genişletilmiş atölye yönetimi.",
    description:
      "Çoklu kullanıcı, gelişmiş raporlama ve maliyet analizi içerir.",
    longDescription:
      "Pastacım Pro, büyüyen atölyeler için Pastacım'ın tüm özelliklerine ek olarak çoklu kullanıcı yönetimi, rol bazlı yetkiler, detaylı satış ve maliyet raporları, stok takibi ve API entegrasyonları sunar. iPad'de tam ekran çalışma akışı için optimize edilmiştir.",
    platforms: ["ios", "ipados", "android"],
    appStoreUrl: null,
    playStoreUrl: null,
    iconPath: "/apps/pastacim-pro-icon.svg",
    accent: "from-violet-200/40 to-sky-200/40",
  },
];

export const platformLabels: Record<AppPlatform, string> = {
  ios: "iPhone",
  ipados: "iPad",
  android: "Android",
};

export function getApp(slug: AppMeta["slug"]): AppMeta | undefined {
  return apps.find((a) => a.slug === slug);
}
