import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { companyInfo } from "@/lib/company-info";

export const metadata: Metadata = {
  title: `お問い合わせ | ${companyInfo.companyNameJapanese}`,
  description: `${companyInfo.companyNameJapanese}への在庫・オークション・輸出手続きに関するお問い合わせはこちらから。`,
};

export default function ContactPage() {
  return <ContactPageContent />;
}
