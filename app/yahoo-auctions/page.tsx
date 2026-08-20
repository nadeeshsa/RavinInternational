import Image from "next/image";
import Link from "next/link";
import { CalendarClock, CircleAlert, Gavel, PackageSearch, Scale } from "lucide-react";
import { getYahooSellerFeed } from "@/lib/external-feeds";

export const revalidate = 1800;

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
      <div className="rounded-3xl border border-[var(--color-site-line)] bg-[linear-gradient(135deg,rgba(12,53,90,0.9)_0%,rgba(6,33,57,0.95)_100%)] p-8 sm:p-10">
        <p className="text-xs font-semibold tracking-[0.17em] text-cyan-200">
          LIVE EXTERNAL FEED
        </p>
        <h1 className="font-industrial mt-3 text-4xl text-white sm:text-5xl">
          Yahoo! Japan Auctions Seller Stream
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--color-site-subtext)] sm:text-base">
          Active listings are fetched from your configured Yahoo seller account and
          refreshed periodically.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={feed.sellerUrl || "https://auctions.yahoo.co.jp/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-[#06253f] transition hover:bg-cyan-200"
          >
            <Gavel className="h-4 w-4" />
            Open Seller Page
          </Link>
          <p className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[0.1em] text-cyan-100">
            SELLER ID: {feed.sellerId || "Not configured"}
          </p>
        </div>
      </div>

      {feed.error ? (
        <div className="mt-6 rounded-2xl border border-amber-300/40 bg-amber-300/10 p-4 text-sm text-amber-100">
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
            className="overflow-hidden rounded-2xl border border-[var(--color-site-line)] bg-[#072945]/85 shadow-lg shadow-cyan-950/20"
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
              <span className="absolute left-3 top-3 rounded-full border border-cyan-300/45 bg-[#052a47]/80 px-3 py-1 text-xs font-semibold text-cyan-100">
                {listing.availability}
              </span>
            </div>

            <div className="p-5">
              <p className="text-xs font-semibold tracking-[0.12em] text-cyan-200">
                AUCTION ID: {listing.auctionId}
              </p>
              <h2 className="font-industrial mt-2 line-clamp-2 text-2xl text-white">
                {listing.title}
              </h2>

              <div className="mt-4 grid gap-2 text-sm text-cyan-100">
                <p className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-[#062743] px-3 py-2">
                  <Scale className="h-4 w-4 text-cyan-300" />
                  Current: {formatJPY(listing.priceJPY)}
                </p>
                <p className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-[#062743] px-3 py-2">
                  <PackageSearch className="h-4 w-4 text-cyan-300" />
                  Condition: {listing.condition}
                </p>
                <p className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-[#062743] px-3 py-2">
                  <CalendarClock className="h-4 w-4 text-cyan-300" />
                  Valid Until: {formatTime(listing.priceValidUntil)}
                </p>
              </div>

              <Link
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-[#052643] transition hover:bg-cyan-200"
              >
                View Auction Listing
              </Link>
            </div>
          </article>
        ))}
      </div>

      {feed.listings.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[var(--color-site-line)] bg-[#072945]/80 p-8 text-center">
          <p className="font-industrial text-2xl text-white">No Listings Available</p>
          <p className="mt-2 text-sm text-[var(--color-site-subtext)]">
            Verify seller ID configuration and check if active auctions are visible
            publicly on Yahoo! Auctions.
          </p>
        </div>
      ) : null}
    </section>
  );
}
