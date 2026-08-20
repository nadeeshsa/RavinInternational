"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Calculator, CircleX, Ship } from "lucide-react";
import type { InventoryCurrency, InventoryItem } from "@/types/inventory";

const jpyRate = 155;

const shippingRoutes = [
  { code: "durban", route: "Yokohama -> Durban", freightUSD: 1900, docsUSD: 420, eta: "26-31 days" },
  {
    code: "mombasa",
    route: "Yokohama -> Mombasa",
    freightUSD: 2100,
    docsUSD: 420,
    eta: "28-34 days",
  },
  {
    code: "dar",
    route: "Yokohama -> Dar es Salaam",
    freightUSD: 2200,
    docsUSD: 450,
    eta: "31-37 days",
  },
  { code: "dubai", route: "Yokohama -> Jebel Ali", freightUSD: 1550, docsUSD: 380, eta: "18-24 days" },
  {
    code: "auckland",
    route: "Yokohama -> Auckland",
    freightUSD: 2400,
    docsUSD: 460,
    eta: "19-25 days",
  },
];

type StockDetailModalProps = {
  item: InventoryItem | null;
  currency: InventoryCurrency;
  onClose: () => void;
  onInquire: (item: InventoryItem) => void;
};

export function StockDetailModal({
  item,
  currency,
  onClose,
  onInquire,
}: StockDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [routeCode, setRouteCode] = useState<string>(shippingRoutes[0].code);

  useEffect(() => {
    if (!item) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
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

  if (!item) {
    return null;
  }

  const activeImage =
    item.images[activeImageIndex] ??
    item.images[0] ??
    "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg";

  const fobUSD = item.fobPriceUSD;
  const totalUSD = fobUSD + selectedRoute.freightUSD + selectedRoute.docsUSD;
  const totalJPY = Math.round(totalUSD * jpyRate);

  const priceText =
    currency === "USD"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(fobUSD)
      : new Intl.NumberFormat("ja-JP", {
          style: "currency",
          currency: "JPY",
          maximumFractionDigits: 0,
        }).format(item.fobPriceJPY);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-slate-300 bg-white p-2 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          aria-label="Close stock details"
        >
          <CircleX className="h-5 w-5" />
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Image
              src={activeImage}
              alt={item.title}
              width={1400}
              height={900}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="h-72 w-full rounded-2xl border border-slate-200 object-cover"
            />

            <div className="mt-3 grid grid-cols-3 gap-2">
              {item.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`overflow-hidden rounded-xl border transition ${
                    activeImageIndex === index
                      ? "border-blue-500"
                      : "border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${item.title} preview`}
                    width={360}
                    height={220}
                    sizes="120px"
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-blue-700">
              STOCK ID: {item.stockId}
            </p>
            <h3 className="font-industrial mt-2 text-3xl text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600">
              {item.make} {item.model} | {item.category}
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs tracking-[0.12em] text-slate-500">FOB PRICE</p>
              <p className="font-industrial mt-1 text-3xl text-slate-900">{priceText}</p>
            </div>

            <button
              type="button"
              onClick={() => onInquire(item)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Inquire Now
            </button>

            <dl className="mt-5 space-y-3 text-sm">
              <SpecRow label="Status" value={item.status} />
              <SpecRow label="Year" value={String(item.year)} />
              <SpecRow label="Engine" value={item.engineSize} />
              <SpecRow label="Mileage / Hours" value={item.mileageOrHours} />
              <SpecRow label="Make / Model" value={`${item.make} ${item.model}`} />
              <SpecRow label="Category" value={item.category} />
            </dl>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h4 className="font-industrial flex items-center gap-2 text-2xl text-slate-900">
            <Calculator className="h-5 w-5 text-blue-600" />
            Shipping Port Estimate Calculator
          </h4>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
                Destination Route
              </span>
              <select
                value={routeCode}
                onChange={(event) => setRouteCode(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400"
              >
                {shippingRoutes.map((route) => (
                  <option key={route.code} value={route.code}>
                    {route.route}
                  </option>
                ))}
              </select>
            </label>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              <p className="inline-flex items-center gap-2">
                <Ship className="h-4 w-4 text-blue-600" />
                Estimated Transit: {selectedRoute.eta}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <CostRow label="FOB Price (USD)" value={formatUSD(fobUSD)} />
            <CostRow label="Ocean Freight" value={formatUSD(selectedRoute.freightUSD)} />
            <CostRow label="Documentation + Handling" value={formatUSD(selectedRoute.docsUSD)} />
            <CostRow label="Estimated Landed Total" value={formatUSD(totalUSD)} highlight />
            <CostRow label="Estimated Landed Total (JPY)" value={formatJPY(totalJPY)} highlight />
            <p className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
              Estimates are indicative and can vary by destination port charges,
              customs, and local taxes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type SpecRowProps = {
  label: string;
  value: string;
};

function SpecRow({ label, value }: SpecRowProps) {
  return (
    <div className="grid grid-cols-[135px_1fr] gap-3 border-b border-slate-200 pb-2">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-slate-700">{value}</dd>
    </div>
  );
}

type CostRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function CostRow({ label, value, highlight = false }: CostRowProps) {
  return (
    <div
      className={`rounded-xl border px-3 py-2 ${
        highlight
          ? "border-blue-200 bg-blue-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-xs tracking-[0.11em] text-slate-500">{label}</p>
      <p className="font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatJPY(value: number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(value);
}
