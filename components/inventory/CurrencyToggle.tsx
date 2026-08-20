"use client";

import type { InventoryCurrency } from "@/types/inventory";

type CurrencyToggleProps = {
  currency: InventoryCurrency;
  onCurrencyChange: (currency: InventoryCurrency) => void;
};

export function CurrencyToggle({ currency, onCurrencyChange }: CurrencyToggleProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700">
      <button
        type="button"
        onClick={() => onCurrencyChange("USD")}
        className={`rounded-full px-3 py-1 transition ${
          currency === "USD"
            ? "bg-blue-600 text-white"
            : "hover:bg-white hover:text-slate-900"
        }`}
      >
        USD ($)
      </button>
      <button
        type="button"
        onClick={() => onCurrencyChange("JPY")}
        className={`rounded-full px-3 py-1 transition ${
          currency === "JPY"
            ? "bg-blue-600 text-white"
            : "hover:bg-white hover:text-slate-900"
        }`}
      >
        JPY (¥)
      </button>
    </div>
  );
}
