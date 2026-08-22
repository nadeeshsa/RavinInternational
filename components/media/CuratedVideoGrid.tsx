"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

type MediaVideo = {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
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

const filterCategories = ["All", "Classic Vehicles", "Special Auctions", "Vehicle Inspections"];

export function CuratedVideoGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") {
      return mediaVideos;
    }
    return mediaVideos.filter((video) => video.category === activeCategory);
  }, [activeCategory]);

  return (
    <div id="videos" className="mt-8 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold tracking-[0.17em] text-blue-700">VIDEOS</p>
      <h2 className="font-industrial mt-2 text-3xl text-slate-900 sm:text-4xl">
        Operational Video Archive
      </h2>

      <div className="mt-5 flex flex-wrap gap-2">
        {filterCategories.map((category) => {
          const active = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "border-transparent text-white"
                  : "border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              }`}
              style={active ? { backgroundColor: "var(--color-site-accent)" } : undefined}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredVideos.map((video) => (
          <article
            key={video.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
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
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-[0.1em] text-blue-700">
                {video.category}
              </span>
              <h3 className="font-industrial mt-3 line-clamp-2 text-lg text-slate-900">
                {video.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{video.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-[var(--color-site-bg-soft)] p-6 text-center sm:p-8">
        <PlayCircle className="mx-auto h-8 w-8 text-blue-600" />
        <h3 className="font-industrial mt-3 text-2xl text-slate-900 sm:text-3xl">
          Subscribe to Our Official Channel for Real-Time Yard Updates
        </h3>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-slate-600">
          Get immediate video notifications whenever ラビンインターナショナル株式会社
          receives new stock or inspects rare auction arrivals.
        </p>
        <Link
          href="https://www.youtube.com/@Jdmpqa2994"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-5 inline-flex whitespace-normal text-center"
        >
          Visit @Jdmpqa2994 on YouTube
        </Link>
      </div>
    </div>
  );
}
