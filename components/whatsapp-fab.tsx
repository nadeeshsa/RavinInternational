import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { companyInfo } from "@/lib/company-info";

export function WhatsAppFab() {
  return (
    <Link
      href={companyInfo.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-emerald-200/40 bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-900/30 transition hover:scale-[1.03] hover:bg-emerald-400"
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </Link>
  );
}
