"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import profileLogo from "@/logo/profile.png";
import { companyInfo } from "@/lib/company-info";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/yahoo-auctions", label: "Auctions" },
  { href: "/media", label: "Gallery" },
  { href: "/about", label: "About Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 shadow-[0_8px_28px_-24px_rgba(5,44,72,0.65)] backdrop-blur-xl" style={{ borderColor: "var(--color-site-line)" }}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:gap-4">
            <Image
              src={profileLogo}
              alt="ラビンインターナショナル株式会社 logo"
              className="h-10 w-auto shrink-0 object-contain sm:h-14 lg:h-16"
              priority
            />
            <span className="flex min-w-0 flex-col">
              <span className="font-industrial break-words text-sm font-bold leading-snug tracking-wide text-[var(--color-site-text)] sm:text-lg lg:text-2xl">
                {companyInfo.shortDisplayName}
              </span>
              <span className="hidden break-words text-xs text-[var(--color-site-subtext)] sm:block sm:text-sm">
                {companyInfo.businessScopeJapanese}
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-3">
            <Link href="/contact" className="hidden lg:inline-flex btn-secondary">
              Contact
            </Link>
            <div className="relative hidden w-44 lg:block">
              <input
                placeholder="Site Search"
                aria-label="Site search"
                className="w-full rounded border border-transparent bg-slate-50 px-3 py-1 text-sm outline-none focus:border-slate-200"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-site-subtext)]" />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-transparent bg-white text-[var(--color-site-subtext)] shadow-sm sm:h-11 sm:w-11 lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav className="hidden border-t pb-3 pt-7 lg:flex lg:items-center lg:gap-3" style={{ borderColor: "var(--color-site-line)" }}>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "text-white"
                    : "text-[var(--color-site-subtext)] hover:text-[var(--color-site-text)]"
                }`}
                style={active ? { backgroundColor: "var(--color-site-accent)" } : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {menuOpen ? (
        <div className="border-t bg-white px-4 py-4 lg:hidden" style={{ borderColor: "var(--color-site-line)" }}>
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`whitespace-nowrap rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    active
                      ? "text-white"
                      : "text-[var(--color-site-text)] hover:text-[var(--color-site-text)]"
                  }`}
                  style={active ? { backgroundColor: "var(--color-site-accent)" } : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2">
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn-secondary justify-center">
                Contact
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

// language toggle removed — restored simpler header layout
