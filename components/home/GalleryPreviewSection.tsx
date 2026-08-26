"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { companyInfo } from "@/lib/company-info";

type GalleryPreviewSectionProps = {
  photos: string[];
};

export function GalleryPreviewSection({ photos }: GalleryPreviewSectionProps) {
  const { t } = useLanguage();

  if (photos.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>
            {t.gallery.eyebrow}
          </p>
          <h2 className="rd-balance mt-2 text-3xl font-bold sm:text-4xl" style={{ color: "var(--fg)" }}>
            {t.gallery.title}
          </h2>
        </div>
        <Link
          href="/media"
          className="hidden items-center gap-2 text-sm font-semibold sm:inline-flex"
          style={{ color: "var(--accent)" }}
        >
          {t.gallery.viewAll}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Link href="/media" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {photos.map((photo, index) => (
          <div key={photo} className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={photo}
              alt={`${companyInfo.companyNameJapanese} inspection and shipping photo ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition hover:scale-105"
            />
          </div>
        ))}
      </Link>

      <Link
        href="/media"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold sm:hidden"
        style={{ color: "var(--accent)" }}
      >
        {t.gallery.viewAll}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
