"use client";

import Link from "next/link";
import { BadgeCheck, Building2, Mail, MapPinned, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";
import { companyInfo } from "@/lib/company-info";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ContactBand } from "@/components/home/ContactBand";

export function AboutPageContent() {
  const { t } = useLanguage();
  const a = t.aboutPage;

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="relative overflow-hidden rounded-2xl p-8 sm:p-10" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
          <div
            className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle at center, var(--accent), transparent 66%)" }}
          />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold tracking-[0.1em]" style={{ borderColor: "var(--border-strong)", color: "var(--accent)" }}>
              <ShieldCheck className="h-3.5 w-3.5" />
              {a.eyebrow}
            </p>
            <h1 className="rd-balance mt-5 text-4xl font-bold sm:text-5xl" style={{ color: "var(--fg)" }}>
              {a.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 sm:text-lg" style={{ color: "var(--fg-muted)" }}>
              {a.subtitle}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <ContactCta href={companyInfo.mobileCallLink} label={a.callMobile} value={companyInfo.mobile} icon={PhoneCall} />
              <ContactCta href={companyInfo.emailLink} label={a.email} value={companyInfo.email} icon={Mail} />
              <ContactCta href={companyInfo.whatsappLink} label={a.whatsapp} value={a.directChat} icon={MessageCircle} external />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl p-7 sm:p-8" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.1em]" style={{ borderColor: "var(--border-strong)", color: "var(--accent)" }}>
              <BadgeCheck className="h-3.5 w-3.5" />
              {a.complianceVerified}
            </p>
            <h2 className="mt-4 flex items-center gap-2 text-2xl font-bold" style={{ color: "var(--fg)" }}>
              <Building2 className="h-6 w-6" style={{ color: "var(--accent)" }} />
              {a.credentialsTitle}
            </h2>

            <dl className="mt-6 space-y-4 text-sm sm:text-base">
              <CredentialRow label={a.companyName} value={companyInfo.companyNameCombined} />
              <CredentialRow
                label={a.dealerLicense}
                value={`${companyInfo.dealerLicenseEnglish} / ${companyInfo.dealerLicenseJapanese}`}
                emphasize
              />
              <CredentialRow label={a.businessScope} value={`${companyInfo.businessScopeEnglish} (${companyInfo.businessScopeJapanese})`} />
              <CredentialRow label={a.representativeDirector} value={companyInfo.representativeDirectorCombined} />
              <CredentialRow label={a.address} value={companyInfo.addressCombined} />
              <CredentialRow label={a.mobile} value={companyInfo.mobile} />
              <CredentialRow label={a.telFax} value={companyInfo.telFax} />
              <CredentialRow label={a.email} value={companyInfo.email} last />
            </dl>
          </div>

          <div className="rounded-2xl p-5 sm:p-6" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: "var(--fg)" }}>
              <MapPinned className="h-5 w-5" style={{ color: "var(--accent)" }} />
              {a.officeTitle}
            </h2>
            <p className="mt-3 text-sm leading-7" style={{ color: "var(--fg-muted)" }}>
              {companyInfo.addressJapanese}
              <br />
              {companyInfo.addressEnglish}
            </p>
            <div className="mt-4 overflow-hidden rounded-xl" style={{ border: "1px solid var(--border)" }}>
              <iframe
                title={`${companyInfo.companyNameJapanese} Kanagawa Location`}
                src={companyInfo.googleMapsEmbedUrl}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}

type ContactCtaProps = {
  href: string;
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  external?: boolean;
};

function ContactCta({ href, label, value, icon: Icon, external }: ContactCtaProps) {
  return (
    <Link
      href={href}
      className="rounded-xl px-4 py-4 transition hover:-translate-y-1"
      style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <Icon className="h-5 w-5" style={{ color: "var(--accent)" }} />
      <p className="mt-3 text-xs tracking-[0.1em]" style={{ color: "var(--accent)" }}>
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold" style={{ color: "var(--fg)" }}>
        {value}
      </p>
    </Link>
  );
}

type CredentialRowProps = {
  label: string;
  value: string;
  emphasize?: boolean;
  last?: boolean;
};

function CredentialRow({ label, value, emphasize, last }: CredentialRowProps) {
  return (
    <div
      className="grid gap-2 pb-4 sm:grid-cols-[190px_1fr]"
      style={{ borderBottom: last ? "none" : "1px solid var(--border)" }}
    >
      <dt className="font-semibold tracking-wide" style={{ color: "var(--accent)" }}>
        {label}
      </dt>
      <dd style={{ color: "var(--fg)", fontWeight: emphasize ? 700 : 400 }}>{value}</dd>
    </div>
  );
}
