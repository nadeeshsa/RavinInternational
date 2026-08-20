import Link from "next/link";
import { Mail, MapPinned, MessageCircle, PhoneCall } from "lucide-react";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { companyInfo } from "@/lib/company-info";

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-3xl border border-[var(--color-site-line)] bg-[linear-gradient(140deg,rgba(9,44,75,0.94)_0%,rgba(6,28,49,0.98)_100%)] p-8 sm:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200">
          CONTACT & INQUIRY DESK
        </p>
        <h1 className="font-industrial mt-3 text-4xl text-white sm:text-5xl">
          Request Quote Or Shipping Consultation
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--color-site-subtext)] sm:text-base">
          Submit your inquiry for vehicles, machinery, equipment, or parts. Our
          export team will respond with availability, destination port estimate,
          and payment process details.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-[var(--color-site-line)] bg-[#072945]/85 p-6 sm:p-8">
          <h2 className="font-industrial text-3xl text-white">Send Inquiry</h2>
          <p className="mt-2 text-sm text-[var(--color-site-subtext)]">
            Fill in your details and destination information. We usually reply
            within one business day.
          </p>
          <div className="mt-6">
            <InquiryForm submitLabel="Submit Contact Request" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-[var(--color-site-line)] bg-[#072945]/85 p-6">
            <h2 className="font-industrial text-2xl text-white">Direct Contact</h2>

            <div className="mt-4 space-y-3 text-sm">
              <ContactCard
                icon={PhoneCall}
                label="Mobile"
                value={companyInfo.mobile}
                href={companyInfo.mobileCallLink}
              />
              <ContactCard
                icon={PhoneCall}
                label="TEL / FAX"
                value={companyInfo.telFax}
                href={companyInfo.telFaxCallLink}
              />
              <ContactCard
                icon={Mail}
                label="Email"
                value={companyInfo.email}
                href={companyInfo.emailLink}
              />
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Link
                href={companyInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200/35 bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Link>
              <Link
                href={companyInfo.emailLink}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-[#052643] transition hover:bg-cyan-200"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--color-site-line)] bg-[#072945]/85 p-6">
            <h2 className="font-industrial flex items-center gap-2 text-2xl text-white">
              <MapPinned className="h-6 w-6 text-cyan-300" />
              Kanagawa Office
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-site-subtext)]">
              {companyInfo.addressEnglish}
              <br />
              {companyInfo.addressJapanese}
            </p>

            <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-300/20">
              <iframe
                title="Ravin International Office Map"
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
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
};

function ContactCard({ icon: Icon, label, value, href }: ContactCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-cyan-300/20 bg-[#062743] px-4 py-3 text-cyan-100 transition hover:border-cyan-300/45"
    >
      <Icon className="h-4 w-4 text-cyan-300" />
      <div>
        <p className="text-xs tracking-[0.12em] text-[var(--color-site-accent)]">{label}</p>
        <p className="text-sm font-semibold text-[var(--color-site-text)]">{value}</p>
      </div>
    </Link>
  );
}
