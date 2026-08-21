import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Mail,
  MapPinned,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { companyInfo } from "@/lib/company-info";

export const metadata: Metadata = {
  title: "About And Legal Information | ラビンインターナショナル株式会社",
  description:
    "View company credentials, dealer license details, and office information for ラビンインターナショナル株式会社.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div
            className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle at center, var(--color-site-accent), transparent 66%)" }}
          />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-blue-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              ABOUT OUR COMPANY
            </p>
            <h1 className="font-industrial mt-5 text-4xl text-slate-900 sm:text-5xl">
              Proven Integrity in Japanese Vehicle &amp; Machinery Export
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Operating directly from Kanagawa, Japan, {companyInfo.shortDisplayName} is
              a licensed Japanese dealer providing reliable global export services.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <ContactCta
                href={companyInfo.mobileCallLink}
                label="Call Mobile"
                value={companyInfo.mobile}
                icon={PhoneCall}
              />
              <ContactCta
                href={companyInfo.emailLink}
                label="Email"
                value={companyInfo.email}
                icon={Mail}
              />
              <ContactCta
                href={companyInfo.whatsappLink}
                label="WhatsApp"
                value="Direct chat"
                icon={MessageCircle}
                external
              />
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-blue-700">
            <BadgeCheck className="h-3.5 w-3.5" />
            COMPLIANCE VERIFIED
          </p>
          <h2 className="font-industrial mt-4 text-2xl text-slate-900">Official License</h2>
          <p className="mt-4 text-sm text-slate-600">Secondhand Dealer License No.</p>
          <p className="font-industrial mt-1 break-all text-3xl text-[var(--color-site-accent-strong)]">
            452740019730
          </p>
          <p className="mt-4 rounded-xl border border-slate-200 bg-[var(--color-site-bg-soft)] p-4 text-sm leading-7 text-slate-600">
            {companyInfo.dealerLicenseEnglish}
            <br />
            {companyInfo.dealerLicenseJapanese}
          </p>
        </aside>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
          <h2 className="font-industrial flex items-center gap-2 text-3xl text-slate-900">
            <Building2 className="h-7 w-7 text-blue-600" />
            Company Credentials
          </h2>

          <dl className="mt-6 space-y-4 text-sm sm:text-base">
            <CredentialRow label="Company Name" value={companyInfo.companyNameCombined} />
            <CredentialRow
              label="Business Scope"
              value={`${companyInfo.businessScopeEnglish} (${companyInfo.businessScopeJapanese})`}
            />
            <CredentialRow
              label="Representative Director"
              value={companyInfo.representativeDirectorCombined}
            />
            <CredentialRow
              label="Dealer License"
              value={`${companyInfo.dealerLicenseEnglish} (${companyInfo.dealerLicenseJapanese})`}
            />
            <CredentialRow label="Address" value={companyInfo.addressCombined} />
            <CredentialRow label="Mobile" value={companyInfo.mobile} />
            <CredentialRow label="TEL/FAX" value={companyInfo.telFax} />
            <CredentialRow label="Email" value={companyInfo.email} />
          </dl>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-industrial flex items-center gap-2 text-2xl text-slate-900">
            <MapPinned className="h-6 w-6 text-blue-600" />
            Kanagawa Office
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {companyInfo.addressJapanese}
            <br />
            {companyInfo.addressEnglish}
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="ラビンインターナショナル株式会社 Kanagawa Location"
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
  );
}

type ContactCtaProps = {
  href: string;
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
};

function ContactCta({ href, label, value, icon: Icon, external }: ContactCtaProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-[var(--color-site-bg-soft)] px-4 py-4 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <Icon className="h-5 w-5 text-blue-600" />
      <p className="mt-3 text-xs tracking-[0.15em] text-[var(--color-site-accent)]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[var(--color-site-text)]">{value}</p>
    </Link>
  );
}

type CredentialRowProps = {
  label: string;
  value: string;
};

function CredentialRow({ label, value }: CredentialRowProps) {
  return (
    <div className="grid gap-2 border-b pb-4 sm:grid-cols-[190px_1fr]" style={{ borderColor: 'var(--color-site-line)' }}>
      <dt className="font-semibold tracking-wide text-[var(--color-site-accent-strong)]">{label}</dt>
      <dd className="text-[var(--color-site-text)]">{value}</dd>
    </div>
  );
}
