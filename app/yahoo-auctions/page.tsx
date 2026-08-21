import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarClock, CircleAlert, Gavel, PackageSearch, Scale } from "lucide-react";
import { getYahooSellerFeed } from "@/lib/external-feeds";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Yahoo Auctions Feed | ラビンインターナショナル株式会社",
  description:
    "Live Yahoo! Japan Auctions seller listings with pricing, condition, and link-out details for sourcing support.",
};

function formatJPY(value: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatTime(value: string): string {
  if (!value) {
    return "Not published";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const fallbackImage =
  "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg";

export default async function YahooAuctionsPage() {
  const feed = await getYahooSellerFeed(10);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle at center, var(--color-site-accent), transparent 66%)" }}
        />
        <div className="relative">
          <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold tracking-[0.17em] text-blue-700">
            DIRECT JAPANESE AUCTION ACCESS
          </p>
          <h1 className="font-industrial text-4xl text-slate-900 sm:text-5xl">
            Transparent Bidding &amp; Procurement from Japanese Auctions
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            Access live automotive and machinery auctions across Japan.
            ラビンインターナショナル株式会社 provides expert bidding support,
            pre-bid condition report translations, and full export logistics.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={feed.sellerUrl || "https://auctions.yahoo.co.jp/"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Gavel className="h-4 w-4" />
              Open Seller Page
            </Link>
            <p className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold tracking-[0.1em] text-blue-700">
              SELLER ID: {feed.sellerId || "Not configured"}
            </p>
          </div>
        </div>
      </div>

      {feed.error ? (
        <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="inline-flex items-center gap-2 font-semibold">
            <CircleAlert className="h-4 w-4" />
            Feed notice
          </p>
          <p className="mt-1">{feed.error}</p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {feed.listings.map((listing) => (
          <article
            key={listing.auctionId}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
          >
            <div className="relative">
              <Image
                src={listing.imageUrl || fallbackImage}
                alt={listing.title}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="h-52 w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full border border-blue-200 bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700">
                {listing.availability}
              </span>
            </div>

            <div className="p-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-blue-700">
                AUCTION ID: {listing.auctionId}
              </p>
              <h2 className="font-industrial mt-2 line-clamp-2 text-2xl text-slate-900">
                {listing.title}
              </h2>

              <div className="mt-4 grid gap-2 text-sm text-slate-600">
                <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-[var(--color-site-bg-soft)] px-3 py-2">
                  <Scale className="h-4 w-4 text-blue-600" />
                  Current: {formatJPY(listing.priceJPY)}
                </p>
                <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-[var(--color-site-bg-soft)] px-3 py-2">
                  <PackageSearch className="h-4 w-4 text-blue-600" />
                  Condition: {listing.condition}
                </p>
                <p className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-[var(--color-site-bg-soft)] px-3 py-2">
                  <CalendarClock className="h-4 w-4 text-blue-600" />
                  Valid Until: {formatTime(listing.priceValidUntil)}
                </p>
              </div>

              <Link
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 w-full justify-center"
              >
                View Auction Listing
              </Link>
            </div>
          </article>
        ))}
      </div>

      {feed.listings.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="font-industrial text-2xl text-slate-900">No Listings Available</p>
          <p className="mt-2 text-sm text-slate-600">
            Verify seller ID configuration and check if active auctions are visible
            publicly on Yahoo! Auctions.
          </p>
        </div>
      ) : null}
    </section>
  );
}
