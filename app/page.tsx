import Link from "next/link";
import { ArrowRight, CarFront, Gavel, HardHat, Video } from "lucide-react";
import { FeaturedInventorySection } from "@/components/inventory/FeaturedInventorySection";
import { mockInventory } from "@/data/mock-inventory";
import { companyInfo } from "@/lib/company-info";

export default function Home() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-blue-700">
          JAPAN TO GLOBAL MARKETS
        </p>
        <h1 className="font-industrial max-w-3xl text-4xl leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Trusted Export Partner For Vehicles, Machinery, And Parts
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
          {companyInfo.shortDisplayName} connects buyers worldwide with
          high-quality Japanese stock, auction opportunities, and industrial
          equipment sourcing.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Inventory
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            Contact Our Team
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          href="/inventory"
          icon={CarFront}
          title="Stock Inventory"
          description="Cars, trucks, and commercial fleets ready for export."
        />
        <FeatureCard
          href="/yahoo-auctions"
          icon={Gavel}
          title="Yahoo Auctions"
          description="Real-time support for bidding and procurement from Japan."
        />
        <FeatureCard
          href="/media"
          icon={Video}
          title="YouTube Videos"
          description="Walkarounds, inspections, and shipment highlights."
        />
        <FeatureCard
          href="/contact"
          icon={HardHat}
          title="Heavy Machinery"
          description="Reliable sourcing of industrial and construction units."
        />
      </div>

      <FeaturedInventorySection items={mockInventory} />
    </section>
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
