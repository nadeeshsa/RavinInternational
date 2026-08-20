"use client";

import Image from "next/image";
import { CalendarClock, CircleGauge, Cog, Search } from "lucide-react";
import type { InventoryCurrency, InventoryItem } from "@/types/inventory";

type StockCardProps = {
  item: InventoryItem;
  currency: InventoryCurrency;
  onOpenDetails: (item: InventoryItem) => void;
  onOpenInquiry: (item: InventoryItem) => void;
};

const statusStyles: Record<InventoryItem["status"], string> = {
  Available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Reserved: "bg-amber-50 text-amber-700 border-amber-200",
  Sold: "bg-rose-50 text-rose-700 border-rose-200",
};

function formatCurrency(item: InventoryItem, currency: InventoryCurrency) {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(item.fobPriceUSD);
  }

  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(item.fobPriceJPY);
}

export function StockCard({
  item,
  currency,
  onOpenDetails,
  onOpenInquiry,
}: StockCardProps) {
  const previewImage =
    item.images[0] ??
    "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
      <div className="relative">
        <Image
          src={previewImage}
          alt={item.title}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="h-52 w-full object-cover"
        />
        <span
          className={`absolute left-3 top-3 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
        >
          {item.status}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold tracking-[0.12em] text-blue-700">
          STOCK ID: {item.stockId}
        </p>
        <h3 className="font-industrial mt-2 text-2xl text-slate-900">{item.title}</h3>
        <p className="mt-1 text-sm text-slate-600">
          {item.make} {item.model} | {item.category}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-700 sm:grid-cols-3">
          <SpecPill icon={CalendarClock} label="Year" value={String(item.year)} />
          <SpecPill icon={CircleGauge} label="Usage" value={item.mileageOrHours} />
          <SpecPill icon={Cog} label="Engine" value={item.engineSize} />
        </div>

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs tracking-[0.12em] text-slate-500">FOB PRICE</p>
          <p className="font-industrial mt-1 text-2xl text-slate-900">
            {formatCurrency(item, currency)}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenDetails(item)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <Search className="h-4 w-4" />
            View Specs
          </button>
          <button
            type="button"
            onClick={() => onOpenInquiry(item)}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Inquire Now
          </button>
        </div>
      </div>
    </article>
  );
}

type SpecPillProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

function SpecPill({ icon: Icon, label, value }: SpecPillProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
      <div className="inline-flex items-center gap-1.5 text-xs text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1 truncate text-xs font-medium text-slate-700">{value}</p>
    </div>
  );
}
