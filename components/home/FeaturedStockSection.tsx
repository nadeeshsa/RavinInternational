"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { InventoryItem } from "@/types/inventory";

type FeaturedStockSectionProps = {
  items: InventoryItem[];
};

export function FeaturedStockSection({ items }: FeaturedStockSectionProps) {
  const { t } = useLanguage();
  const featured = [...items]
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);

  return (
    <section style={{ background: "var(--bg-muted)" }}>
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>
              {t.featured.eyebrow}
            </p>
            <h2 className="rd-balance mt-2 text-3xl font-bold sm:text-4xl" style={{ color: "var(--fg)" }}>
              {t.featured.title}
            </h2>
          </div>
          {featured.length > 0 ? (
            <Link
              href="/inventory"
              className="hidden items-center gap-2 text-sm font-semibold sm:inline-flex"
              style={{ color: "var(--accent)" }}
            >
              {t.featured.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>

        {featured.length === 0 ? (
          <div
            className="mt-8 rounded-2xl p-10 text-center"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
          >
            <p style={{ color: "var(--fg-muted)" }}>{t.featured.empty}</p>
          </div>
        ) : featured.length === 1 ? (
          <div className="mt-8">
            <FeaturedHeroCard item={featured[0]} label={t.common.viewDetails} />
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <StockTile key={item.id} item={item} label={t.common.viewDetails} />
            ))}
          </div>
        )}

        {featured.length > 0 ? (
          <Link
            href="/inventory"
            className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold sm:hidden"
            style={{ color: "var(--accent)" }}
          >
            {t.featured.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function FeaturedHeroCard({ item, label }: { item: InventoryItem; label: string }) {
  const image = item.images[0];
  return (
    <div
      className="grid overflow-hidden rounded-2xl md:grid-cols-2"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
    >
      <div className="relative aspect-[4/3] md:aspect-auto">
        {image ? (
          <Image src={image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        ) : (
          <div className="h-full w-full" style={{ background: "var(--bg-muted)" }} />
        )}
      </div>
      <div className="flex flex-col justify-center p-8">
        <p className="text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--accent)" }}>
          {item.stockId} · {item.category}
        </p>
        <h3 className="mt-2 text-2xl font-bold" style={{ color: "var(--fg)" }}>
          {item.title.trim()}
        </h3>
        <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
          {item.make} {item.model} · {item.year} · {item.mileageOrHours}
        </p>
        <p className="mt-4 text-xl font-bold" style={{ color: "var(--fg)" }}>
          ${item.fobPriceUSD.toLocaleString()} <span className="text-sm font-medium" style={{ color: "var(--fg-subtle)" }}>FOB</span>
        </p>
        <Link href="/inventory" className="btn-rd-primary mt-6 w-fit">
          {label}
        </Link>
      </div>
    </div>
  );
}

function StockTile({ item, label }: { item: InventoryItem; label: string }) {
  const image = item.images[0];
  return (
    <Link
      href="/inventory"
      className="group overflow-hidden rounded-2xl transition hover:-translate-y-1"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
    >
      <div className="relative aspect-[4/3]">
        {image ? (
          <Image src={image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        ) : (
          <div className="h-full w-full" style={{ background: "var(--bg-muted)" }} />
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--accent)" }}>
          {item.stockId}
        </p>
        <h3 className="mt-1.5 text-lg font-bold" style={{ color: "var(--fg)" }}>
          {item.title.trim()}
        </h3>
        <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>
          {item.category} · {item.year}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-bold" style={{ color: "var(--fg)" }}>
            ${item.fobPriceUSD.toLocaleString()}
          </p>
          <span className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}
