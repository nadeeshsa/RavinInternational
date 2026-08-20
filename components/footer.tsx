import Link from "next/link";
import { Image, Mail, MessageCircle, PlayCircle } from "lucide-react";
import { companyInfo } from "@/lib/company-info";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Stock Inventory" },
  { href: "/yahoo-auctions", label: "Yahoo Auctions" },
  { href: "/media", label: "YouTube Videos" },
  { href: "/about", label: "About / Legal" },
  { href: "/contact", label: "Contact Us" },
];

const socialLinks = [
  { href: "#", label: "YouTube", icon: PlayCircle },
  { href: "#", label: "Facebook", icon: MessageCircle },
  { href: "#", label: "Instagram", icon: Image },
  { href: companyInfo.emailLink, label: "Email", icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 border-t bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8" style={{ borderColor: "var(--color-site-line)" }}>
        <div>
          <p className="font-industrial text-2xl text-[var(--color-site-text)]">{companyInfo.shortDisplayName}</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-site-subtext)]">
            International exporter of Japanese vehicles, heavy machinery, and
            genuine parts with global shipping support.
          </p>
        </div>

        <div>
          <p className="font-industrial text-lg text-slate-900">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--color-site-subtext)] transition"
                  style={{ textDecorationColor: "transparent" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-industrial text-lg text-slate-900">Connect</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-[var(--color-site-subtext)] transition"
                style={{ border: `1px solid var(--color-site-line)` }}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t px-4 py-4 text-center text-xs tracking-[0.08em] text-[var(--color-site-subtext)] sm:px-6 lg:px-8" style={{ borderColor: "var(--color-site-line)" }}>
        © {year} {companyInfo.shortDisplayName}. All rights reserved.
      </div>
    </footer>
  );
}
