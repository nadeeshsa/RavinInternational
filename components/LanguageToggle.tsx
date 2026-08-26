"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border p-1 ${className}`}
      style={{ borderColor: "var(--border-strong)" }}
      role="group"
      aria-label={t.common.langToggle}
    >
      <button
        type="button"
        onClick={() => setLanguage("ja")}
        aria-pressed={language === "ja"}
        className="rounded-full px-3 py-1 text-xs font-semibold transition"
        style={
          language === "ja"
            ? { background: "var(--fg)", color: "var(--bg)" }
            : { color: "var(--fg-muted)" }
        }
      >
        日本語
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className="rounded-full px-3 py-1 text-xs font-semibold transition"
        style={
          language === "en"
            ? { background: "var(--fg)", color: "var(--bg)" }
            : { color: "var(--fg-muted)" }
        }
      >
        EN
      </button>
    </div>
  );
}
