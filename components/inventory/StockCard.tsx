"use client";

import Image from "next/image";
import { CalendarClock, CircleGauge, Cog, Search } from "lucide-react";
import type { InventoryCurrency, InventoryItem } from "@/types/inventory";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type StockCardProps = {
  item: InventoryItem;
  currency: InventoryCurrency;
  onOpenDetails: (item: InventoryItem) => void;
  onOpenInquiry: (item: InventoryItem) => void;
};

const statusColor: Record<InventoryItem["status"], string> = {
  Available: "var(--success)",
  Reserved: "var(--accent)",
  Sold: "var(--danger)",
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

export function StockCard({ item, currency, onOpenDetails, onOpenInquiry }: StockCardProps) {
  const { t } = useLanguage();
  const i = t.inventoryPage;
  const previewImage =
    item.images[0] ??
    "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg";
  const statusText = item.status;

  return (
    <article
      className="overflow-hidden rounded-2xl transition hover:-translate-y-1"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
    >
      <div className="relative">
        <Image
          src={previewImage}
          alt={item.title.trim()}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="h-52 w-full object-cover"
        />
        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: "var(--bg-elevated)",
            color: statusColor[item.status],
            border: `1px solid ${statusColor[item.status]}`,
          }}
        >
          {statusText}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--accent)" }}>
          {item.stockId}
        </p>
        <h3 className="mt-2 text-xl font-bold" style={{ color: "var(--fg)" }}>
          {item.title.trim()}
        </h3>
        <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
          {item.make} {item.model} · {item.category}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
          <SpecPill icon={CalendarClock} label={i.year} value={String(item.year)} />
          <SpecPill icon={CircleGauge} label={i.usage} value={item.mileageOrHours} />
          <SpecPill icon={Cog} label={i.engine} value={item.engineSize} />
        </div>

        <div
          className="mt-5 rounded-xl px-4 py-3"
          style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}
        >
          <p className="text-xs tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
            {i.fobPrice.toUpperCase()}
          </p>
          <p className="mt-1 text-xl font-bold" style={{ color: "var(--fg)" }}>
            {formatCurrency(item, currency)}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onOpenDetails(item)} className="btn-rd-secondary text-sm">
            <Search className="h-4 w-4" />
            {i.viewSpecs}
          </button>
          <button type="button" onClick={() => onOpenInquiry(item)} className="btn-rd-primary text-sm">
            {i.inquireNow}
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
    <div className="rounded-xl px-3 py-2" style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
      <div className="inline-flex items-center gap-1.5 text-xs" style={{ color: "var(--fg-subtle)" }}>
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1 truncate text-xs font-medium" style={{ color: "var(--fg-muted)" }}>
        {value}
      </p>
    </div>
  );
}
