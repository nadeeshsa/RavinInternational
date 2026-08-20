"use client";

import type { InventoryCategory } from "@/types/inventory";

export type InventoryFilterValues = {
  search: string;
  category: InventoryCategory | "All";
  make: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
};

type InventoryFilterProps = {
  values: InventoryFilterValues;
  makes: string[];
  onChange: (partial: Partial<InventoryFilterValues>) => void;
  onReset: () => void;
};

const categories: Array<InventoryCategory | "All"> = [
  "All",
  "Used Cars",
  "Heavy Machinery",
  "Equipment",
  "Parts",
];

export function InventoryFilter({ values, makes, onChange, onReset }: InventoryFilterProps) {
  return (
    <aside className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <p className="font-industrial text-xl text-slate-900">Find Stock</p>
        <p className="mt-1 text-sm text-slate-600">
          Search by stock ID, title, make, or model.
        </p>
      </div>

      <label className="block">
        <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
          Search
        </span>
        <input
          type="text"
          value={values.search}
          onChange={(event) => onChange({ search: event.target.value })}
          placeholder="e.g. HiAce, Komatsu, RVN-HM"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
            Category
          </span>
          <select
            value={values.category}
            onChange={(event) =>
              onChange({ category: event.target.value as InventoryCategory | "All" })
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
            Make
          </span>
          <select
            value={values.make}
            onChange={(event) => onChange({ make: event.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400"
          >
            <option value="All">All Makes</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <div>
          <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
            Year Range
          </span>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={values.minYear}
              onChange={(event) => onChange({ minYear: event.target.value })}
              placeholder="From"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400"
            />
            <input
              type="number"
              value={values.maxYear}
              onChange={(event) => onChange({ maxYear: event.target.value })}
              placeholder="To"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400"
            />
          </div>
        </div>

        <div>
          <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
            Price Range (USD)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={values.minPrice}
              onChange={(event) => onChange({ minPrice: event.target.value })}
              placeholder="Min"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400"
            />
            <input
              type="number"
              value={values.maxPrice}
              onChange={(event) => onChange({ maxPrice: event.target.value })}
              placeholder="Max"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
      >
        Reset Filters
      </button>
    </aside>
  );
}
