"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function InventoryPageHeader() {
  const { t } = useLanguage();
  const i = t.inventoryPage;

  return (
    <div className="rounded-2xl p-8 sm:p-10" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>
        {i.eyebrow}
      </p>
      <h1 className="rd-balance mt-3 text-4xl font-bold sm:text-5xl" style={{ color: "var(--fg)" }}>
        {i.title}
      </h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 sm:text-base" style={{ color: "var(--fg-muted)" }}>
        {i.description}
      </p>
    </div>
  );
}
