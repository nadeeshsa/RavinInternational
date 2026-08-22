import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CarFront, Gavel, Globe, HardHat, MessageCircle, Video } from "lucide-react";
import { FeaturedInventorySection } from "@/components/inventory/FeaturedInventorySection";
import { getPublicInventory } from "@/lib/inventory-store";
import { companyInfo } from "@/lib/company-info";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ラビンインターナショナル株式会社 | Japanese Vehicle And Machinery Export",
  description:
    `${companyInfo.shortDisplayName} provides stock list updates, auction support, and export coordination for vehicles, heavy machinery, and parts from Japan.`,
};

export default async function Home() {
  const inventory = await getPublicInventory();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle at center, var(--color-site-accent), transparent 66%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle at center, var(--color-site-accent-alt), transparent 68%)" }}
        />

        <div className="relative">
          <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-blue-700">
            Certified Japanese Exporter | {companyInfo.shortDisplayName}
          </p>
          <h1 className="font-industrial max-w-4xl text-4xl leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Seamless Japanese Export Support for Vehicles, Machinery, and Parts
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {companyInfo.shortDisplayName} connects global buyers to live auctions,
            real-time stock updates, and hassle-free shipping through fast,
            bilingual service.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/inventory" className="btn-primary whitespace-normal text-center">
              View Stock List at {companyInfo.shortDisplayName}
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
            <Link href="/contact" className="btn-secondary whitespace-normal text-center">
              Register for Auction Access
            </Link>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <TrustPill
              icon={BadgeCheck}
              label={`Licensed Dealer No. ${companyInfo.dealerLicenseNumber}`}
            />
            <TrustPill
              icon={Globe}
              label="Dedicated bilingual support for overseas buyers"
            />
            <TrustPill
              icon={MessageCircle}
              label={`Direct WhatsApp support: ${companyInfo.mobile}`}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          href="/inventory"
          icon={CarFront}
          title="Export Stock List"
          description={`High-quality cars, commercial trucks, and fleets thoroughly inspected by ${companyInfo.shortDisplayName} and ready for secure global export.`}
        />
        <FeatureCard
          href="/yahoo-auctions"
          icon={Gavel}
          title="Live Auction Access"
          description="Real-time, trusted procurement support allowing you to bid on top-tier vehicles from auctions across Japan with confidence."
        />
        <FeatureCard
          href="/media"
          icon={Video}
          title="Operations Gallery"
          description="Transparent photo archives and video documentation showcasing our rigorous inspection and loading processes."
        />
        <FeatureCard
          href="/contact"
          icon={HardHat}
          title="Heavy Machinery Sourcing"
          description={`Reliable procurement of durable industrial and construction equipment, sourced by ${companyInfo.shortDisplayName} to meet heavy-duty global demands.`}
        />
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--color-site-accent-strong)]">
              SECURE & TRANSPARENT WORKFLOW
            </p>
            <h2 className="font-industrial mt-2 text-3xl text-slate-900 sm:text-4xl">
              How {companyInfo.shortDisplayName} Secures Your Export Process
            </h2>
          </div>
          <Link href="/about" className="btn-secondary">
            About And Legal Details
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <ProcessStep
            step="01"
            title="Define Your Procurement Needs"
            description={`Specify your required vehicles, heavy machinery, budget, and destination port. The expert team at ${companyInfo.shortDisplayName} will immediately begin targeted sourcing.`}
          />
          <ProcessStep
            step="02"
            title="Evaluate Verified Inventory"
            description="Review thoroughly inspected stock or live auction candidates. We provide completely transparent condition reports, photos, and real-time updates to ensure confident buying."
          />
          <ProcessStep
            step="03"
            title="Seamless Global Fulfillment"
            description={`Upon your approval, ${companyInfo.shortDisplayName} manages all complex export procedures, official documentation, and bilingual coordination until your shipment safely departs Japan.`}
          />
        </div>
      </div>

      <FeaturedInventorySection items={inventory} />
    </section>
  );
}

type TrustPillProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

function TrustPill({ icon: Icon, label }: TrustPillProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
      <Icon className="h-4 w-4 text-blue-700" />
      <span>{label}</span>
    </div>
  );
}

type ProcessStepProps = {
  step: string;
  title: string;
  description: string;
};

function ProcessStep({ step, title, description }: ProcessStepProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-[var(--color-site-bg-soft)] p-5">
      <p className="text-xs font-semibold tracking-[0.16em] text-[var(--color-site-accent-strong)]">
        STEP {step}
      </p>
      <h3 className="font-industrial mt-2 text-xl text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}

type FeatureCardProps = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

function FeatureCard({ href, icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
    >
      <Icon className="h-6 w-6 text-blue-600" />
      <h2 className="mt-4 font-industrial text-xl text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        {description}
      </p>
      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition group-hover:text-blue-800">
        Learn more
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
