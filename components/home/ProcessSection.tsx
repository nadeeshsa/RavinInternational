"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>
        {t.process.eyebrow}
      </p>
      <h2 className="rd-balance mt-2 text-3xl font-bold sm:text-4xl" style={{ color: "var(--fg)" }}>
        {t.process.title}
      </h2>

      <div className="relative mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {t.process.steps.map((step, index) => (
          <div key={step.title} className="relative">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
              style={{ background: "var(--accent)", color: "var(--accent-fg)" }}
            >
              {index + 1}
            </div>
            <h3 className="mt-4 text-base font-bold" style={{ color: "var(--fg)" }}>
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-6" style={{ color: "var(--fg-muted)" }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
