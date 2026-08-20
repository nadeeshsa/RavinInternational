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

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-[var(--color-site-line)] bg-[linear-gradient(135deg,rgba(15,63,105,0.9)_0%,rgba(6,33,57,0.95)_100%)] p-8 shadow-2xl shadow-cyan-900/20 sm:p-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-300/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-cyan-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            ABOUT US / LEGAL INFO
          </p>
          <h1 className="font-industrial mt-5 text-4xl text-white sm:text-5xl">
            Licensed, Transparent, Export-Ready
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-site-subtext)] sm:text-lg">
            {companyInfo.companyNameCombined} operates with verified legal
            credentials and direct communication channels for global buyers.
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

        <aside className="rounded-3xl border border-cyan-200/35 bg-[#0b3558] p-7 shadow-xl shadow-cyan-950/30">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-cyan-200">
            <BadgeCheck className="h-3.5 w-3.5" />
            COMPLIANCE VERIFIED
          </p>
          <h2 className="font-industrial mt-4 text-2xl text-white">Official License</h2>
          <p className="mt-4 text-sm text-cyan-100">Secondhand Dealer License No.</p>
          <p className="font-industrial mt-1 break-all text-3xl text-cyan-200">
            452740019730
          </p>
          <p className="mt-4 rounded-xl border border-cyan-200/20 bg-[#072642] p-4 text-sm leading-7 text-[var(--color-site-subtext)]">
            {companyInfo.dealerLicenseEnglish}
            <br />
            {companyInfo.dealerLicenseJapanese}
          </p>
        </aside>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl border border-[var(--color-site-line)] bg-[var(--color-site-panel)]/70 p-7 sm:p-8">
          <h2 className="font-industrial flex items-center gap-2 text-3xl text-white">
            <Building2 className="h-7 w-7 text-cyan-300" />
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

        <div className="rounded-3xl border border-[var(--color-site-line)] bg-[#072945] p-5 sm:p-6">
          <h2 className="font-industrial flex items-center gap-2 text-2xl text-white">
            <MapPinned className="h-6 w-6 text-cyan-300" />
            Kanagawa Office
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-site-subtext)]">
            959 Sanmasu, Aikawa-machi, Aiko-gun, Kanagawa 243-0308, Japan
            <br />
            〒243-0308 神奈川県愛甲郡愛川町三増 959
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-200/20">
            <iframe
              title="Ravin International Kanagawa Location"
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
      className="group rounded-2xl border border-cyan-200/25 bg-[#062743] px-4 py-4 transition hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-[#0b3458]"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <Icon className="h-5 w-5 text-cyan-300" />
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
