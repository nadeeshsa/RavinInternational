"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import profileLogo from "@/logo/profile.png";
import { companyInfo } from "@/lib/company-info";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LanguageToggle } from "@/components/LanguageToggle";

type NavLink = {
  href: string;
  label: string;
};

export function Navbar() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks: NavLink[] = [
    { href: "/", label: t.nav.home },
    { href: "/inventory", label: t.nav.inventory },
    { href: "/yahoo-auctions", label: t.nav.auctions },
    { href: "/media", label: t.nav.gallery },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header
      className="sticky top-0 z-40 transition-shadow"
      style={{
        background: "var(--bg)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--rd-shadow-sm)" : "none",
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src={profileLogo}
            alt="ラビンインターナショナル株式会社"
            className="h-10 w-auto shrink-0 object-contain sm:h-12"
            priority
          />
          <span
            className="hidden text-sm font-bold tracking-wide sm:block"
            style={{ color: "var(--fg)" }}
          >
            {language === "ja" ? companyInfo.companyNameJapanese : companyInfo.companyNameEnglish}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition"
                style={{
                  color: active ? "var(--accent-fg)" : "var(--fg-muted)",
                  background: active ? "var(--accent)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Link href="/contact" className="btn-rd-secondary hidden lg:inline-flex">
            {t.nav.contact}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            style={{ color: "var(--fg)" }}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          className="fixed inset-x-0 top-[57px] bottom-0 z-30 overflow-y-auto lg:hidden"
          style={{ background: "var(--bg)" }}
        >
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-base font-semibold"
                  style={{
                    color: active ? "var(--accent-fg)" : "var(--fg)",
                    background: active ? "var(--accent)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" className="btn-rd-primary mt-2 justify-center">
              {t.nav.contact}
            </Link>
            <div className="mt-4 flex justify-center">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
