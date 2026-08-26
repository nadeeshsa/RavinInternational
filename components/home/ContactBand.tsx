"use client";

import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { companyInfo } from "@/lib/company-info";

export function ContactBand() {
  const { t } = useLanguage();

  return (
    <section style={{ background: "var(--bg-muted)", borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="rd-balance text-3xl font-bold sm:text-4xl" style={{ color: "var(--fg)" }}>
          {t.contactBand.title}
        </h2>
        <p className="mt-3 text-base" style={{ color: "var(--fg-muted)" }}>
          {t.contactBand.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium" style={{ color: "var(--fg-muted)" }}>
          <a href={companyInfo.mobileCallLink} className="inline-flex items-center gap-2 transition hover:opacity-80">
            <Phone className="h-4 w-4" /> {companyInfo.mobile}
          </a>
          <a
            href={companyInfo.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:opacity-80"
          >
            <MessageCircle className="h-4 w-4" /> {companyInfo.whatsappDisplay}
          </a>
          <a href={companyInfo.emailLink} className="inline-flex items-center gap-2 transition hover:opacity-80">
            <Mail className="h-4 w-4" /> {companyInfo.email}
          </a>
        </div>

        <Link href="/contact" className="btn-rd-primary mt-8">
          {t.contactBand.cta}
        </Link>
      </div>
    </section>
  );
}
