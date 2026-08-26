"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import type { InventoryCurrency, InventoryItem } from "@/types/inventory";
import {
  InventoryFilter,
  type InventoryFilterValues,
} from "@/components/inventory/InventoryFilter";
import { InquiryModal } from "@/components/contact/InquiryModal";
import { CurrencyToggle } from "@/components/inventory/CurrencyToggle";
import { StockCard } from "@/components/inventory/StockCard";
import { StockDetailModal } from "@/components/inventory/StockDetailModal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

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

const PAGE_SIZE = 12;

type InventoryStockBoardProps = {
  items: InventoryItem[];
};

export function InventoryStockBoard({ items }: InventoryStockBoardProps) {
  const { t } = useLanguage();
  const i = t.inventoryPage;
  const [currency, setCurrency] = useState<InventoryCurrency>("USD");
  const [filters, setFilters] = useState<InventoryFilterValues>(defaultFilters);
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [inquiryItem, setInquiryItem] = useState<InventoryItem | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))).sort(),
    [items],
  );
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

        const matchesCategory = filters.category === "All" || item.category === filters.category;
        const matchesMake = filters.make === "All" || item.make === filters.make;
        const matchesYear = item.year >= minYear && item.year <= maxYear;
        const matchesPrice = item.fobPriceUSD >= minPrice && item.fobPriceUSD <= maxPrice;

        return matchesSearch && matchesCategory && matchesMake && matchesYear && matchesPrice;
      })
      .sort((a, b) => {
        const statusDiff = statusSortOrder[a.status] - statusSortOrder[b.status];
        if (statusDiff !== 0) return statusDiff;
        return b.year - a.year;
      });
  }, [items, filters]);

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function updateFilters(partial: Partial<InventoryFilterValues>) {
    setFilters((current) => ({ ...current, ...partial }));
    setPage(1);
  }

  return (
    <div className="mt-8 space-y-6">
      <InventoryFilter
        values={filters}
        categories={categories}
        makes={makes}
        onChange={updateFilters}
        onReset={() => {
          setFilters(defaultFilters);
          setPage(1);
        }}
      />

      <div
        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
      >
        <p className="inline-flex items-center gap-2 text-sm" style={{ color: "var(--fg-muted)" }}>
          <SlidersHorizontal className="h-4 w-4" style={{ color: "var(--accent)" }} />
          {i.showing} <span className="font-semibold" style={{ color: "var(--fg)" }}>{filteredItems.length}</span> {i.of}{" "}
          {items.length} {i.listings}
        </p>
        <CurrencyToggle currency={currency} onCurrencyChange={setCurrency} />
      </div>

      {paginatedItems.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paginatedItems.map((item) => (
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
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
        >
          <p className="text-xl font-bold" style={{ color: "var(--fg)" }}>
            {i.empty}
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            {i.emptyHint}
          </p>
        </div>
      )}

      {pageCount > 1 ? (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn-rd-secondary px-3 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={i.prev}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm" style={{ color: "var(--fg-muted)" }}>
            {i.page} {currentPage} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className="btn-rd-secondary px-3 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={i.next}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}

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
