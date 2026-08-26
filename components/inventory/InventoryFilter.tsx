"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export type InventoryFilterValues = {
  search: string;
  category: string;
  make: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
};

type InventoryFilterProps = {
  values: InventoryFilterValues;
  categories: string[];
  makes: string[];
  onChange: (partial: Partial<InventoryFilterValues>) => void;
  onReset: () => void;
};

const fieldStyle = {
  borderColor: "var(--border)",
  background: "var(--bg-elevated)",
  color: "var(--fg)",
} as const;

export function InventoryFilter({ values, categories, makes, onChange, onReset }: InventoryFilterProps) {
  const { t } = useLanguage();
  const i = t.inventoryPage;

  return (
    <div
      className="rounded-2xl p-5 sm:p-6"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
    >
      <label className="block">
        <span className="mb-2 block text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
          {i.searchLabel}
        </span>
        <input
          type="text"
          value={values.search}
          onChange={(event) => onChange({ search: event.target.value })}
          placeholder={i.searchPlaceholder}
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition"
          style={fieldStyle}
        />
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.length > 1 ? (
          <label className="block">
            <span className="mb-2 block text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
              {i.categoryLabel}
            </span>
            <select
              value={values.category}
              onChange={(event) => onChange({ category: event.target.value })}
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
              style={fieldStyle}
            >
              <option value="All">{i.categoryAll}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {makes.length > 1 ? (
          <label className="block">
            <span className="mb-2 block text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
              {i.makeLabel}
            </span>
            <select
              value={values.make}
              onChange={(event) => onChange({ make: event.target.value })}
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
              style={fieldStyle}
            >
              <option value="All">{i.makeAll}</option>
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <div>
          <span className="mb-2 block text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
            {i.yearRangeLabel}
          </span>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={values.minYear}
              onChange={(event) => onChange({ minYear: event.target.value })}
              placeholder={i.yearFrom}
              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
              style={fieldStyle}
            />
            <input
              type="number"
              value={values.maxYear}
              onChange={(event) => onChange({ maxYear: event.target.value })}
              placeholder={i.yearTo}
              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
              style={fieldStyle}
            />
          </div>
        </div>

        <div>
          <span className="mb-2 block text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
            {i.priceRangeLabel}
          </span>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={values.minPrice}
              onChange={(event) => onChange({ minPrice: event.target.value })}
              placeholder={i.priceMin}
              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
              style={fieldStyle}
            />
            <input
              type="number"
              value={values.maxPrice}
              onChange={(event) => onChange({ maxPrice: event.target.value })}
              placeholder={i.priceMax}
              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
              style={fieldStyle}
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="btn-rd-secondary mt-4"
      >
        {i.resetFilters}
      </button>
    </div>
  );
}
