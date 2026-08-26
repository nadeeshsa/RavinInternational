"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type MediaVideo = {
  id: string;
  youtubeId: string;
  title: string;
  category: "Classic Vehicles" | "Special Auctions" | "Vehicle Inspections" | "Specialized Units";
  description: string;
};

const mediaVideos: MediaVideo[] = [
  {
    id: "1",
    youtubeId: "FAFZAyG-OUw",
    title: "Datsun Bluebird SSS L16 — Yard Inspection & Walkaround",
    category: "Classic Vehicles",
    description:
      "Detailed yard inspection and engine check for a classic Datsun Bluebird SSS L16 prepared for overseas export by ラビンインターナショナル株式会社.",
  },
  {
    id: "2",
    youtubeId: "u0LnlketP1o",
    title: "Toyota Sports 800 (Yotahachi UP15) — Rare Classic Sourcing",
    category: "Special Auctions",
    description:
      "Complete vehicle walkthrough and condition check for a rare Toyota Sports 800 UP15 sourced directly in Japan.",
  },
  {
    id: "3",
    youtubeId: "EYjN_2O9H50",
    title: "Toyota Sports 800 UP15 — Pre-Export Inspection Highlights",
    category: "Vehicle Inspections",
    description:
      "Operational check and body inspection documentation managed by the expert team at ラビンインターナショナル株式会社.",
  },
  {
    id: "4",
    youtubeId: "o8juasFbARc",
    title: "Volkswagen Westfalia Camper — Japanese Yard Inventory",
    category: "Specialized Units",
    description:
      "Overview of specialized camper and commercial units available for international procurement.",
  },
  {
    id: "5",
    youtubeId: "u-OwAAzaDSg",
    title: "Toyota Carina TA45 1600GT 2TG DOHC 5MT Walkaround",
    category: "Classic Vehicles",
    description:
      "Engine audio and operational walkthrough for a vintage Toyota Carina 1600GT twin-cam manual.",
  },
];

export function CuratedVideoGrid() {
  const { t } = useLanguage();
  const m = t.mediaPage;
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categoryLabels: Record<MediaVideo["category"], string> = {
    "Classic Vehicles": m.categoryClassic,
    "Special Auctions": m.categoryAuctions,
    "Vehicle Inspections": m.categoryInspections,
    "Specialized Units": m.categorySpecialized,
  };

  const filterCategories: string[] = ["All", "Classic Vehicles", "Special Auctions", "Vehicle Inspections"];

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") return mediaVideos;
    return mediaVideos.filter((video) => video.category === activeCategory);
  }, [activeCategory]);

  return (
    <div id="videos" className="mt-8 scroll-mt-28 rounded-2xl p-6 sm:p-8" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>
        {m.videosEyebrow}
      </p>
      <h2 className="rd-balance mt-2 text-3xl font-bold sm:text-4xl" style={{ color: "var(--fg)" }}>
        {m.videosTitle}
      </h2>

      <div className="mt-5 flex flex-wrap gap-2">
        {filterCategories.map((category) => {
          const active = category === activeCategory;
          const label = category === "All" ? m.filterAll : categoryLabels[category as MediaVideo["category"]];
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className="rounded-full border px-4 py-2 text-sm font-semibold transition"
              style={
                active
                  ? { background: "var(--accent)", borderColor: "var(--accent)", color: "var(--accent-fg)" }
                  : { borderColor: "var(--border-strong)", color: "var(--fg-muted)" }
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredVideos.map((video) => (
          <article key={video.id} className="overflow-hidden rounded-2xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                title={video.title}
                className="absolute left-0 top-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="p-4">
              <span
                className="inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.08em]"
                style={{ border: "1px solid var(--border-strong)", color: "var(--accent)" }}
              >
                {categoryLabels[video.category]}
              </span>
              <h3 className="mt-3 line-clamp-2 text-base font-bold" style={{ color: "var(--fg)" }}>
                {video.title}
              </h3>
              <p className="mt-2 text-sm leading-6" style={{ color: "var(--fg-muted)" }}>
                {video.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl p-6 text-center sm:p-8" style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
        <PlayCircle className="mx-auto h-8 w-8" style={{ color: "var(--accent)" }} />
        <h3 className="rd-balance mt-3 text-2xl font-bold sm:text-3xl" style={{ color: "var(--fg)" }}>
          {m.subscribeTitle}
        </h3>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6" style={{ color: "var(--fg-muted)" }}>
          {m.subscribeBody}
        </p>
        <Link
          href="https://www.youtube.com/@Jdmpqa2994"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-rd-primary mt-5 inline-flex whitespace-normal text-center"
        >
          {m.subscribeCta}
        </Link>
      </div>
    </div>
  );
}
