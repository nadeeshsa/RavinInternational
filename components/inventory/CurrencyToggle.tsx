"use client";

import type { InventoryCurrency } from "@/types/inventory";

type CurrencyToggleProps = {
  currency: InventoryCurrency;
  onCurrencyChange: (currency: InventoryCurrency) => void;
};

export function CurrencyToggle({ currency, onCurrencyChange }: CurrencyToggleProps) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border p-1 text-xs font-semibold"
      style={{ borderColor: "var(--border-strong)", background: "var(--bg-muted)" }}
    >
      <button
        type="button"
        onClick={() => onCurrencyChange("USD")}
        className="rounded-full px-3 py-1 transition"
        style={
          currency === "USD"
            ? { background: "var(--accent)", color: "var(--accent-fg)" }
            : { color: "var(--fg-muted)" }
        }
      >
        USD ($)
      </button>
      <button
        type="button"
        onClick={() => onCurrencyChange("JPY")}
        className="rounded-full px-3 py-1 transition"
        style={
          currency === "JPY"
            ? { background: "var(--accent)", color: "var(--accent-fg)" }
            : { color: "var(--fg-muted)" }
        }
      >
        JPY (¥)
      </button>
    </div>
  );
}
