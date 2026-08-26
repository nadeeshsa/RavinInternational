"use client";

import { BadgeCheck, Boxes, Globe2, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const icons = [BadgeCheck, ShieldCheck, Globe2, Boxes];

export function ValueStrip() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.value.items.map((item, index) => {
          const Icon = icons[index];
          return (
            <div
              key={item.title}
              className="rounded-2xl p-6"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
            >
              <Icon className="h-6 w-6" style={{ color: "var(--accent)" }} />
              <h3 className="mt-4 text-base font-bold" style={{ color: "var(--fg)" }}>
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6" style={{ color: "var(--fg-muted)" }}>
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
