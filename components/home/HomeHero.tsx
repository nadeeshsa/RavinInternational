"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function HomeHero() {
  const { t } = useLanguage();

  return (
    <section style={{ background: "var(--bg)" }}>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:min-h-[70vh] md:grid-cols-2 md:items-center lg:px-8 lg:py-0">
        <div>
          <p
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.08em]"
            style={{ borderColor: "var(--border-strong)", color: "var(--fg-muted)" }}
          >
            <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} />
            {t.hero.eyebrow}
          </p>

          <h1
            className="rd-balance text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl"
            style={{ color: "var(--fg)" }}
          >
            {t.hero.title}
          </h1>

          <p
            className="mt-6 max-w-md text-base leading-8"
            style={{ color: "var(--fg-muted)" }}
          >
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/inventory" className="btn-rd-primary">
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-rd-secondary">
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[5/4]">
          <Image
            src="/photos/unnamed%20(35).jpg"
            alt="Vehicle carrier loading multiple units for export"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>
    </section>
  );
}
