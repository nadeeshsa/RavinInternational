"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { companyInfo } from "@/lib/company-info";

type PhotoGalleryProps = {
  photos: string[];
};

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const { t } = useLanguage();
  const m = t.mediaPage;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (event.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    }

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, photos.length]);

  return (
    <div id="photos" className="mt-8 scroll-mt-28 rounded-2xl p-6 sm:p-8" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>
            {m.photosEyebrow}
          </p>
          <h2 className="rd-balance mt-2 text-3xl font-bold" style={{ color: "var(--fg)" }}>
            {m.photosTitle}
          </h2>
        </div>
        <Link
          href={companyInfo.googleMapsEmbedUrl.replace("&output=embed", "")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-rd-secondary"
        >
          {m.openInMaps}
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="overflow-hidden rounded-xl text-left"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={photo}
                alt={`${m.photoAlt} ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 px-4 py-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label={m.lightboxClose}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
            }}
            aria-label={m.lightboxPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative max-h-[85vh] w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={photos[openIndex]}
                alt={`${m.photoAlt} ${openIndex + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-white/70">
              {openIndex + 1} {m.lightboxOf} {photos.length}
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
            }}
            aria-label={m.lightboxNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
