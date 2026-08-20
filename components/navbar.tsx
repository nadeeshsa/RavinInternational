"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoImage from "@/logo/logo.jpeg";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { companyInfo } from "@/lib/company-info";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Stock Inventory" },
  { href: "/yahoo-auctions", label: "Yahoo Auctions" },
  { href: "/media", label: "YouTube Videos" },
  { href: "/about", label: "About / Legal" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md" style={{ borderColor: "var(--color-site-line)" }}>
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="group inline-flex items-center gap-3">
          <span className="overflow-hidden rounded-xl border bg-white shadow-sm transition" style={{ borderColor: "var(--color-site-line)" }}>
            <Image
              src={logoImage}
              alt="Ravin International logo"
              width={56}
              height={56}
              className="h-14 w-14 object-cover"
              priority
            />
          </span>
          <div>
            <p className="font-industrial text-lg leading-none text-[var(--color-site-text)] sm:text-xl">
              {companyInfo.shortDisplayName}
            </p>
            <p className="mt-1 text-xs tracking-[0.2em] text-[var(--color-site-subtext)]">
              EXPORT SOLUTIONS
            </p>
          </div>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 justify-end items-center gap-6 pl-8 lg:pl-12">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
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

        <div className="ml-6 flex items-center gap-4">
          <div className="hidden md:flex items-center">
            <div className="relative w-44">
              <input
                placeholder="Site Search"
                aria-label="Site search"
                className="w-full rounded border border-transparent bg-slate-50 px-3 py-1 text-sm outline-none focus:border-slate-200"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-site-subtext)]" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-[var(--color-site-subtext)] border border-transparent shadow-sm md:ml-4"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t bg-white px-4 py-4 md:hidden" style={{ borderColor: "var(--color-site-line)" }}>
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
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
          </nav>
        </div>
      ) : null}
    </header>
  );
}

// language toggle removed — restored simpler header layout
