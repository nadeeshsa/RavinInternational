import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { CuratedVideoGrid } from "@/components/media/CuratedVideoGrid";
import { companyInfo } from "@/lib/company-info";

export const revalidate = 1200;

export const metadata: Metadata = {
  title: "Gallery | ラビンインターナショナル株式会社",
  description:
    "Gallery photos and latest export channel videos including vehicle walkarounds, inspections, and shipping-related updates.",
};

const fallbackImage =
  "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg";

async function getGalleryPhotoPaths(): Promise<string[]> {
  const photosDir = path.join(process.cwd(), "public", "photos");

  try {
    const entries = await readdir(photosDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((name) => `/photos/${encodeURIComponent(name)}`);
  } catch {
    return [];
  }
}

export default async function MediaPage() {
  const placeImages = await getGalleryPhotoPaths();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle at center, var(--color-site-accent), transparent 66%)" }}
        />
        <div className="relative">
          <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold tracking-[0.17em] text-blue-700">
            OPERATIONS &amp; EXPORT MEDIA
          </p>
          <h1 className="font-industrial text-4xl text-slate-900 sm:text-5xl">
            Documented Inspections, Yard Operations, and Rare Finds
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            Explore our live operational video archive. See how
            ラビンインターナショナル株式会社 inspects, tests, and prepares
            vehicles and machinery for global shipping.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.17em] text-blue-700">
              PHOTOS
            </p>
            <h2 className="font-industrial mt-2 text-3xl text-slate-900">
              Verified Operational Archives
            </h2>
          </div>
          <Link
            href={companyInfo.googleMapsEmbedUrl.replace("&output=embed", "")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open In Google Maps
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {placeImages.length > 0
            ? placeImages.map((imageUrl, index) => (
                <article
                  key={`${imageUrl}-${index}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <Image
                    src={imageUrl}
                    alt={`ラビンインターナショナル株式会社 location photo ${index + 1}`}
                    width={1200}
                    height={900}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </article>
              ))
            : (
                <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <Image
                    src={fallbackImage}
                    alt="ラビンインターナショナル株式会社 gallery fallback"
                    width={1200}
                    height={900}
                    sizes="100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </article>
              )}
        </div>
      </div>

      <CuratedVideoGrid />
    </section>
  );
}
