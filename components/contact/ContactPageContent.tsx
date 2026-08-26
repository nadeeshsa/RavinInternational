"use client";

import Link from "next/link";
import { Mail, MapPinned, MessageCircle, PhoneCall } from "lucide-react";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { companyInfo } from "@/lib/company-info";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ContactPageContent() {
  const { t } = useLanguage();
  const c = t.contactPage;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative overflow-hidden rounded-2xl p-8 sm:p-10" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
        <div
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle at center, var(--accent), transparent 66%)" }}
        />
        <div className="relative">
          <p className="mb-4 inline-flex rounded-full border px-4 py-1 text-xs font-semibold tracking-[0.1em]" style={{ borderColor: "var(--border-strong)", color: "var(--accent)" }}>
            {c.eyebrow}
          </p>
          <h1 className="rd-balance text-4xl font-bold sm:text-5xl" style={{ color: "var(--fg)" }}>
            {c.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 sm:text-base" style={{ color: "var(--fg-muted)" }}>
            {c.subtitle}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl p-6 sm:p-8" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
          <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--fg)" }}>
            {c.formTitle}
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            {c.formSubtitle}
          </p>
          <div className="mt-6">
            <InquiryForm submitLabel={c.submit} redirectToWhatsApp />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl p-6" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <h2 className="text-xl font-bold" style={{ color: "var(--fg)" }}>
              {c.directContactTitle}
            </h2>

            <div className="mt-4 space-y-3 text-sm">
              <ContactCard icon={PhoneCall} label={c.mobileLabel} value={companyInfo.mobile} href={companyInfo.mobileCallLink} />
              <ContactCard icon={PhoneCall} label={c.telFaxLabel} value={companyInfo.telFax} href={companyInfo.telFaxCallLink} />
              <ContactCard icon={Mail} label={c.emailLabel2} value={companyInfo.email} href={companyInfo.emailLink} />
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Link
                href={companyInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: "#25D366" }}
              >
                <MessageCircle className="h-4 w-4" />
                {c.whatsappButton}
              </Link>
              <Link href={companyInfo.emailLink} className="btn-rd-primary">
                <Mail className="h-4 w-4" />
                {c.emailButton}
              </Link>
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: "var(--fg)" }}>
              <MapPinned className="h-5 w-5" style={{ color: "var(--accent)" }} />
              {c.officeTitle}
            </h2>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--fg-muted)" }}>
              {companyInfo.addressJapanese}
              <br />
              {companyInfo.addressEnglish}
            </p>

            <div className="mt-4 overflow-hidden rounded-xl" style={{ border: "1px solid var(--border)" }}>
              <iframe
                title={`${companyInfo.companyNameJapanese} Office Map`}
                src={companyInfo.googleMapsEmbedUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ContactCardProps = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  href: string;
};

function ContactCard({ icon: Icon, label, value, href }: ContactCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:-translate-y-0.5"
      style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}
    >
      <Icon className="h-4 w-4" style={{ color: "var(--accent)" }} />
      <div>
        <p className="text-xs tracking-[0.1em]" style={{ color: "var(--accent)" }}>
          {label}
        </p>
        <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
          {value}
        </p>
      </div>
    </Link>
  );
}
