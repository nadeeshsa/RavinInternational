"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Calculator, CircleX, Ship } from "lucide-react";
import type { InventoryCurrency, InventoryItem } from "@/types/inventory";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const jpyRate = 155;

const shippingRoutes = [
  { code: "durban", route: "Yokohama -> Durban", freightUSD: 1900, docsUSD: 420, eta: "26-31 days" },
  { code: "mombasa", route: "Yokohama -> Mombasa", freightUSD: 2100, docsUSD: 420, eta: "28-34 days" },
  { code: "dar", route: "Yokohama -> Dar es Salaam", freightUSD: 2200, docsUSD: 450, eta: "31-37 days" },
  { code: "dubai", route: "Yokohama -> Jebel Ali", freightUSD: 1550, docsUSD: 380, eta: "18-24 days" },
  { code: "auckland", route: "Yokohama -> Auckland", freightUSD: 2400, docsUSD: 460, eta: "19-25 days" },
];

type StockDetailModalProps = {
  item: InventoryItem | null;
  currency: InventoryCurrency;
  onClose: () => void;
  onInquire: (item: InventoryItem) => void;
};

export function StockDetailModal({ item, currency, onClose, onInquire }: StockDetailModalProps) {
  const { t } = useLanguage();
  const i = t.inventoryPage;
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [routeCode, setRouteCode] = useState<string>(shippingRoutes[0].code);

  useEffect(() => {
    if (!item) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose]);

  const selectedRoute = useMemo(
    () => shippingRoutes.find((route) => route.code === routeCode) ?? shippingRoutes[0],
    [routeCode],
  );

  if (!item) return null;

  const title = item.title.trim();
  const activeImage =
    item.images[activeImageIndex] ??
    item.images[0] ??
    "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg";

  const fobUSD = item.fobPriceUSD;
  const totalUSD = fobUSD + selectedRoute.freightUSD + selectedRoute.docsUSD;
  const totalJPY = Math.round(totalUSD * jpyRate);

  const priceText =
    currency === "USD"
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(fobUSD)
      : new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(item.fobPriceJPY);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 backdrop-blur-sm"
      style={{ background: "rgba(15, 15, 13, 0.45)" }}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl p-6 sm:p-8"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", boxShadow: "var(--rd-shadow-md)" }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 transition"
          style={{ border: "1px solid var(--border-strong)", background: "var(--bg-elevated)", color: "var(--fg-muted)" }}
          aria-label="Close stock details"
        >
          <CircleX className="h-5 w-5" />
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Image
              src={activeImage}
              alt={title}
              width={1400}
              height={900}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="h-72 w-full rounded-2xl object-cover"
              style={{ border: "1px solid var(--border)" }}
            />

            <div className="mt-3 grid grid-cols-3 gap-2">
              {item.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className="overflow-hidden rounded-xl border transition"
                  style={{ borderColor: activeImageIndex === index ? "var(--accent)" : "var(--border)" }}
                >
                  <Image src={image} alt={`${title} preview`} width={360} height={220} sizes="120px" className="h-20 w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.14em]" style={{ color: "var(--accent)" }}>
              {item.stockId}
            </p>
            <h3 className="mt-2 text-3xl font-bold" style={{ color: "var(--fg)" }}>
              {title}
            </h3>
            <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
              {item.make} {item.model} · {item.category}
            </p>

            <div className="mt-5 rounded-2xl p-4" style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
              <p className="text-xs tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
                {i.fobPrice.toUpperCase()}
              </p>
              <p className="mt-1 text-3xl font-bold" style={{ color: "var(--fg)" }}>
                {priceText}
              </p>
            </div>

            <button type="button" onClick={() => onInquire(item)} className="btn-rd-primary mt-4 w-full">
              {i.inquireNow}
            </button>

            <dl className="mt-5 space-y-3 text-sm">
              <SpecRow label={i.year} value={String(item.year)} />
              <SpecRow label={i.engine} value={item.engineSize} />
              <SpecRow label={i.usage} value={item.mileageOrHours} />
              <SpecRow label={i.makeLabel} value={`${item.make} ${item.model}`} />
              <SpecRow label={i.categoryLabel} value={item.category} />
            </dl>
          </div>
        </div>

        <div className="mt-8 rounded-2xl p-5" style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
          <h4 className="flex items-center gap-2 text-xl font-bold" style={{ color: "var(--fg)" }}>
            <Calculator className="h-5 w-5" style={{ color: "var(--accent)" }} />
            Shipping Port Estimate Calculator
          </h4>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
                Destination Route
              </span>
              <select
                value={routeCode}
                onChange={(event) => setRouteCode(event.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--fg)" }}
              >
                {shippingRoutes.map((route) => (
                  <option key={route.code} value={route.code}>
                    {route.route}
                  </option>
                ))}
              </select>
            </label>

            <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}>
              <p className="inline-flex items-center gap-2">
                <Ship className="h-4 w-4" style={{ color: "var(--accent)" }} />
                Estimated Transit: {selectedRoute.eta}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
            <CostRow label="FOB Price (USD)" value={formatUSD(fobUSD)} />
            <CostRow label="Ocean Freight" value={formatUSD(selectedRoute.freightUSD)} />
            <CostRow label="Documentation + Handling" value={formatUSD(selectedRoute.docsUSD)} />
            <CostRow label="Estimated Landed Total" value={formatUSD(totalUSD)} highlight />
            <CostRow label="Estimated Landed Total (JPY)" value={formatJPY(totalJPY)} highlight />
            <p className="rounded-xl px-3 py-2 text-xs" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--fg-subtle)" }}>
              Estimates are indicative and can vary by destination port charges, customs, and local taxes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[135px_1fr] gap-3 pb-2" style={{ borderBottom: "1px solid var(--border)" }}>
      <dt style={{ color: "var(--fg-subtle)" }}>{label}</dt>
      <dd style={{ color: "var(--fg-muted)" }}>{value}</dd>
    </div>
  );
}

function CostRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className="rounded-xl px-3 py-2"
      style={{
        border: `1px solid ${highlight ? "var(--accent)" : "var(--border)"}`,
        background: highlight ? "var(--bg-elevated)" : "var(--bg-elevated)",
      }}
    >
      <p className="text-xs tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
        {label}
      </p>
      <p className="font-semibold" style={{ color: "var(--fg)" }}>
        {value}
      </p>
    </div>
  );
}

function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function formatJPY(value: number) {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(value);
}
