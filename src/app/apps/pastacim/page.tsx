import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppDetail } from "@/components/app-detail";
import { getApp } from "@/lib/apps-data";

const app = getApp("pastacim");

export const metadata: Metadata = {
  title: app?.name,
  description: app?.tagline,
};

export default function PastacimPage() {
  if (!app) notFound();
  return <AppDetail app={app} />;
}
