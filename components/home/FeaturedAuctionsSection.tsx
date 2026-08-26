"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gavel } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { YahooAuctionItem } from "@/types/external-feeds";

type FeaturedAuctionsSectionProps = {
  listings: YahooAuctionItem[];
};

function formatJPY(value: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatValidUntil(value: string, locale: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

export function FeaturedAuctionsSection({ listings }: FeaturedAuctionsSectionProps) {
  const { t, language } = useLanguage();

  return (
    <section style={{ background: "var(--bg-muted)" }}>
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>
              {t.auctions.eyebrow}
            </p>
            <h2 className="rd-balance mt-2 text-3xl font-bold sm:text-4xl" style={{ color: "var(--fg)" }}>
              {t.auctions.title}
            </h2>
          </div>
          {listings.length > 0 ? (
            <Link
              href="/yahoo-auctions"
              className="hidden items-center gap-2 text-sm font-semibold sm:inline-flex"
              style={{ color: "var(--accent)" }}
            >
              {t.auctions.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>

        {listings.length === 0 ? (
          <div
            className="mt-8 rounded-2xl p-10 text-center"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
          >
            <p style={{ color: "var(--fg-muted)" }}>{t.auctions.empty}</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {listings.map((listing) => (
              <div
                key={listing.auctionId}
                className="flex gap-4 overflow-hidden rounded-2xl p-4"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
              >
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-32">
                  <Image
                    src={listing.imageUrl}
                    alt={listing.title}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-xs font-semibold" style={{ color: "var(--fg-subtle)" }}>
                    {listing.auctionId}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-bold" style={{ color: "var(--fg)" }}>
                    {listing.title}
                  </h3>
                  <p className="mt-1 font-bold" style={{ color: "var(--fg)" }}>
                    {formatJPY(listing.priceJPY)}
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--fg-subtle)" }}>
                    {language === "ja" ? "有効期限" : "Valid until"}: {formatValidUntil(listing.priceValidUntil, language === "ja" ? "ja-JP" : "en-GB")}
                  </p>
                  <Link
                    href={listing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    <Gavel className="h-3.5 w-3.5" />
                    {t.auctions.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
