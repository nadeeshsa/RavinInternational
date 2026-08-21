import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPinned, MessageCircle, PhoneCall } from "lucide-react";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { companyInfo } from "@/lib/company-info";

export const metadata: Metadata = {
  title: "Contact Us | ラビンインターナショナル株式会社",
  description:
    "Contact ラビンインターナショナル株式会社 for stock inquiries, auction support, and export coordination. Reach us by form, phone, email, or WhatsApp.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle at center, var(--color-site-accent), transparent 66%)" }}
        />
        <div className="relative">
          <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-blue-700">
            CONTACT & INQUIRY DESK
          </p>
          <h1 className="font-industrial text-4xl text-slate-900 sm:text-5xl">
            Request Quote Or Shipping Consultation
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            Submit your inquiry for vehicles, machinery, equipment, or parts. Our
            export team will respond with availability, destination port estimate,
            and payment process details.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-industrial text-3xl text-slate-900">Send Inquiry</h2>
          <p className="mt-2 text-sm text-slate-600">
            Fill in your details and destination information. We usually reply
            within one business day.
          </p>
          <div className="mt-6">
            <InquiryForm
              submitLabel="Submit Contact Request"
              redirectToWhatsApp
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-industrial text-2xl text-slate-900">Direct Contact</h2>

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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Link>
              <Link
                href={companyInfo.emailLink}
                className="btn-primary justify-center"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
                title="ラビンインターナショナル株式会社 Office Map"
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
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[var(--color-site-bg-soft)] px-4 py-3 text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
    >
      <Icon className="h-4 w-4 text-blue-600" />
      <div>
        <p className="text-xs tracking-[0.12em] text-[var(--color-site-accent)]">{label}</p>
        <p className="text-sm font-semibold text-[var(--color-site-text)]">{value}</p>
      </div>
    </Link>
  );
}
