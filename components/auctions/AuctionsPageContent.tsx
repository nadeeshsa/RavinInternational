"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarClock, CircleAlert, Gavel, PackageSearch, Scale } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { YahooAuctionFeed } from "@/types/external-feeds";

type AuctionsPageContentProps = {
  feed: YahooAuctionFeed;
};

function formatJPY(value: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatTime(value: string, locale: string): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const fallbackImage =
  "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg";

export function AuctionsPageContent({ feed }: AuctionsPageContentProps) {
  const { t, language } = useLanguage();
  const a = t.auctions;
  const locale = language === "ja" ? "ja-JP" : "en-GB";
  const now = Date.now();

  const listings = [...feed.listings].sort((first, second) => {
    const firstEnded = isEnded(first.priceValidUntil, now);
    const secondEnded = isEnded(second.priceValidUntil, now);
    if (firstEnded === secondEnded) return 0;
    return firstEnded ? 1 : -1;
  });

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-2xl p-8 sm:p-10" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
        <p className="mb-4 inline-flex rounded-full border px-4 py-1 text-xs font-semibold tracking-[0.1em]" style={{ borderColor: "var(--border-strong)", color: "var(--accent)" }}>
          {a.eyebrow}
        </p>
        <h1 className="rd-balance text-4xl font-bold sm:text-5xl" style={{ color: "var(--fg)" }}>
          {a.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 sm:text-base" style={{ color: "var(--fg-muted)" }}>
          {a.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={feed.sellerUrl || "https://auctions.yahoo.co.jp/"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rd-primary"
          >
            <Gavel className="h-4 w-4" />
            {a.openSellerPage}
          </Link>
          <p className="inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.08em]" style={{ borderColor: "var(--border-strong)", color: "var(--fg-muted)" }}>
            {a.sellerId}: {feed.sellerId || a.notConfigured}
          </p>
        </div>
      </div>

      {feed.error ? (
        <div className="mt-6 rounded-2xl p-4 text-sm" style={{ background: "var(--bg-muted)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}>
          <p className="inline-flex items-center gap-2 font-semibold" style={{ color: "var(--fg)" }}>
            <CircleAlert className="h-4 w-4" />
            {a.feedNotice}
          </p>
          <p className="mt-1">{feed.error}</p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((listing) => {
          const ended = isEnded(listing.priceValidUntil, now);
          return (
            <article
              key={listing.auctionId}
              className="overflow-hidden rounded-2xl transition hover:-translate-y-1"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                opacity: ended ? 0.7 : 1,
              }}
            >
              <div className="relative">
                <Image
                  src={listing.imageUrl || fallbackImage}
                  alt={listing.title.trim()}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="h-52 w-full object-cover"
                />
                <span
                  className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    background: "var(--bg-elevated)",
                    border: `1px solid ${ended ? "var(--danger)" : "var(--border-strong)"}`,
                    color: ended ? "var(--danger)" : "var(--fg-muted)",
                  }}
                >
                  {ended ? a.ended : listing.availability}
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--accent)" }}>
                  {listing.auctionId}
                </p>
                <h2 className="mt-2 line-clamp-2 text-xl font-bold" style={{ color: "var(--fg)" }}>
                  {listing.title.trim()}
                </h2>

                <div className="mt-4 grid gap-2 text-sm" style={{ color: "var(--fg-muted)" }}>
                  <p className="inline-flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
                    <Scale className="h-4 w-4" style={{ color: "var(--accent)" }} />
                    {a.currentPrice}: {formatJPY(listing.priceJPY)}
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
                    <PackageSearch className="h-4 w-4" style={{ color: "var(--accent)" }} />
                    {a.condition}: {listing.condition}
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
                    <CalendarClock className="h-4 w-4" style={{ color: "var(--accent)" }} />
                    {a.validUntil}: {formatTime(listing.priceValidUntil, locale)}
                  </p>
                </div>

                <Link
                  href={listing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ended ? "btn-rd-secondary mt-5 w-full justify-center" : "btn-rd-primary mt-5 w-full justify-center"}
                >
                  {ended ? a.auctionEnded : a.cta}
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {feed.listings.length === 0 ? (
        <div className="mt-8 rounded-2xl p-8 text-center" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
          <p className="text-xl font-bold" style={{ color: "var(--fg)" }}>
            {a.empty}
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            {a.emptyHint}
          </p>
        </div>
      ) : null}
    </section>
  );
}

function isEnded(priceValidUntil: string, now: number): boolean {
  if (!priceValidUntil) return false;
  const validUntil = new Date(priceValidUntil).getTime();
  if (Number.isNaN(validUntil)) return false;
  return validUntil < now;
}
