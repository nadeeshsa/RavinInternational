"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { InquiryModal } from "@/components/contact/InquiryModal";
import type { InventoryCurrency, InventoryItem } from "@/types/inventory";
import { CurrencyToggle } from "@/components/inventory/CurrencyToggle";
import { StockCard } from "@/components/inventory/StockCard";
import { StockDetailModal } from "@/components/inventory/StockDetailModal";

type FeaturedInventorySectionProps = {
  items: InventoryItem[];
};

export function FeaturedInventorySection({ items }: FeaturedInventorySectionProps) {
  const [currency, setCurrency] = useState<InventoryCurrency>("USD");
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [inquiryItem, setInquiryItem] = useState<InventoryItem | null>(null);

  const featuredItems = useMemo(() => {
    return items
      .filter((item) => item.status === "Available")
      .sort((a, b) => b.year - a.year)
      .slice(0, 4);
  }, [items]);

  return (
    <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] text-blue-700">
            FEATURED STOCK
          </p>
          <h2 className="font-industrial mt-2 text-3xl text-slate-900 sm:text-4xl">
            Latest Export-Ready Vehicles & Machinery
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Browse handpicked units from current Japan stock. Open each listing to
            inspect specs and estimate shipment totals by destination route.
          </p>
        </div>

        <CurrencyToggle
          currency={currency}
          onCurrencyChange={(nextCurrency) => setCurrency(nextCurrency)}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featuredItems.map((item) => (
          <StockCard
            key={item.id}
            item={item}
            currency={currency}
            onOpenDetails={setSelectedItem}
            onOpenInquiry={setInquiryItem}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          href="/inventory"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          View Full Inventory
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <StockDetailModal
        key={selectedItem?.id ?? "empty"}
        item={selectedItem}
        currency={currency}
        onClose={() => setSelectedItem(null)}
        onInquire={setInquiryItem}
      />

      <InquiryModal item={inquiryItem} onClose={() => setInquiryItem(null)} />
    </section>
  );
}
