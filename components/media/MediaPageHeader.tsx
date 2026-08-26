"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function MediaPageHeader() {
  const { t } = useLanguage();
  const m = t.mediaPage;

  return (
    <>
      <div className="rounded-2xl p-8 sm:p-10" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
        <p className="mb-4 inline-flex rounded-full border px-4 py-1 text-xs font-semibold tracking-[0.1em]" style={{ borderColor: "var(--border-strong)", color: "var(--accent)" }}>
          {m.eyebrow}
        </p>
        <h1 className="rd-balance text-4xl font-bold sm:text-5xl" style={{ color: "var(--fg)" }}>
          {m.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 sm:text-base" style={{ color: "var(--fg-muted)" }}>
          {m.description}
        </p>
      </div>

      <nav className="mt-6 flex w-fit flex-wrap gap-2 rounded-full p-1" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
        <a href="#photos" className="rounded-full px-4 py-2 text-sm font-semibold transition" style={{ color: "var(--fg-muted)" }}>
          {m.tabPhotos}
        </a>
        <a href="#videos" className="rounded-full px-4 py-2 text-sm font-semibold transition" style={{ color: "var(--fg-muted)" }}>
          {m.tabVideos}
        </a>
      </nav>
    </>
  );
}
