import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { companyInfo } from "@/lib/company-info";

export const metadata: Metadata = {
  title: `会社概要 | ${companyInfo.companyNameJapanese}`,
  description: `${companyInfo.companyNameCombined} の会社情報、古物商許可、所在地をご紹介します。`,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
