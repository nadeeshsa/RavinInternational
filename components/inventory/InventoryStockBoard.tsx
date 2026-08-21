"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { InventoryCurrency, InventoryItem } from "@/types/inventory";
import {
  InventoryFilter,
  type InventoryFilterValues,
} from "@/components/inventory/InventoryFilter";
import { InquiryModal } from "@/components/contact/InquiryModal";
import { CurrencyToggle } from "@/components/inventory/CurrencyToggle";
import { StockCard } from "@/components/inventory/StockCard";
import { StockDetailModal } from "@/components/inventory/StockDetailModal";

const defaultFilters: InventoryFilterValues = {
  search: "",
  category: "All",
  make: "All",
  minYear: "",
  maxYear: "",
  minPrice: "",
  maxPrice: "",
};

const statusSortOrder: Record<InventoryItem["status"], number> = {
  Available: 0,
  Reserved: 1,
  Sold: 2,
};

type InventoryStockBoardProps = {
  items: InventoryItem[];
};

export function InventoryStockBoard({ items }: InventoryStockBoardProps) {
  const [currency, setCurrency] = useState<InventoryCurrency>("USD");
  const [filters, setFilters] = useState<InventoryFilterValues>(defaultFilters);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [inquiryItem, setInquiryItem] = useState<InventoryItem | null>(null);

  const makes = useMemo(
    () => Array.from(new Set(items.map((item) => item.make))).sort(),
    [items],
  );

  const filteredItems = useMemo(() => {
    const searchText = filters.search.trim().toLowerCase();
    const minYear = Number(filters.minYear) || 0;
    const maxYear = Number(filters.maxYear) || Number.MAX_SAFE_INTEGER;
    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || Number.MAX_SAFE_INTEGER;

    return items
      .filter((item) => {
        const matchesSearch =
          !searchText ||
          [item.title, item.stockId, item.make, item.model]
            .join(" ")
            .toLowerCase()
            .includes(searchText);

        const matchesCategory =
          filters.category === "All" || item.category === filters.category;
        const matchesMake = filters.make === "All" || item.make === filters.make;
        const matchesYear = item.year >= minYear && item.year <= maxYear;
        const matchesPrice =
          item.fobPriceUSD >= minPrice && item.fobPriceUSD <= maxPrice;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesMake &&
          matchesYear &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        const statusDiff = statusSortOrder[a.status] - statusSortOrder[b.status];
        if (statusDiff !== 0) {
          return statusDiff;
        }
        return b.year - a.year;
      });
  }, [items, filters]);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
      <InventoryFilter
        values={filters}
        makes={makes}
        onChange={(partial) => setFilters((current) => ({ ...current, ...partial }))}
        onReset={() => setFilters(defaultFilters)}
      />

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="inline-flex items-center gap-2 text-sm text-slate-600">
            <SlidersHorizontal className="h-4 w-4 text-blue-600" />
            Showing <span className="font-semibold">{filteredItems.length}</span> of{" "}
            {items.length} verified listings
          </p>
          <CurrencyToggle
            currency={currency}
            onCurrencyChange={(nextCurrency) => setCurrency(nextCurrency)}
          />
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <StockCard
                key={item.id}
                item={item}
                currency={currency}
                onOpenDetails={setSelectedItem}
                onOpenInquiry={setInquiryItem}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="font-industrial text-2xl text-slate-900">No Matching Stock</p>
            <p className="mt-2 text-sm text-slate-600">
              Try broadening year or price range, or reset filters.
            </p>
          </div>
        )}
      </div>

      <StockDetailModal
        key={selectedItem?.id ?? "empty"}
        item={selectedItem}
        currency={currency}
        onClose={() => setSelectedItem(null)}
        onInquire={setInquiryItem}
      />

      <InquiryModal item={inquiryItem} onClose={() => setInquiryItem(null)} />
    </div>
  );
}
