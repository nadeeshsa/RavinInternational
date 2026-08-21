import Link from "next/link";
import { BadgeCheck, Image, Mail, MapPin, MessageCircle, Phone, PlayCircle } from "lucide-react";
import { companyInfo } from "@/lib/company-info";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/yahoo-auctions", label: "Auctions" },
  { href: "/media", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.youtube.com/@Jdmpqa2994", label: "YouTube", icon: PlayCircle, external: true },
  { href: "https://www.facebook.com/share/1Cd7GPhWLM/?mibextid=wwXIfr", label: "Facebook", icon: MessageCircle, external: true },
  { href: "https://linevoom.line.me/post/1174827056099759093", label: "LINE VOOM", icon: MessageCircle, external: true },
  { href: "#", label: "Instagram", icon: Image, external: false },
  { href: companyInfo.emailLink, label: "Email", icon: Mail, external: false },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 border-t bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8" style={{ borderColor: "var(--color-site-line)" }}>
        <div>
          <p className="font-industrial text-lg text-slate-900">{companyInfo.shortDisplayName}</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-site-subtext)]">
            An authoritative international exporter of Japanese vehicles, heavy
            machinery, and genuine parts, providing secure, reliable, and
            bilingual global shipping support.
          </p>
          <div className="mt-5 space-y-2 text-sm text-[var(--color-site-subtext)]">
            <p className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href={companyInfo.mobileCallLink} className="transition hover:text-[var(--color-site-text)]">
                {companyInfo.mobile}
              </a>
            </p>
            <p className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href={companyInfo.emailLink} className="transition hover:text-[var(--color-site-text)]">
                {companyInfo.email}
              </a>
            </p>
          </div>
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
            {socialLinks.map(({ href, label, icon: Icon, external }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm text-[var(--color-site-subtext)] transition"
                style={{ border: `1px solid var(--color-site-line)` }}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-5 space-y-2 rounded-2xl border bg-[var(--color-site-bg-soft)] p-4 text-xs leading-6 text-[var(--color-site-subtext)]" style={{ borderColor: "var(--color-site-line)" }}>
            <p className="inline-flex items-start gap-2">
              <BadgeCheck className="mt-0.5 h-3.5 w-3.5" />
              Licensed Dealer No. {companyInfo.dealerLicenseNumber}
            </p>
            <p className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                {companyInfo.addressJapanese}
                <br />
                {companyInfo.addressEnglish}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t px-4 py-4 text-center text-xs tracking-[0.08em] text-[var(--color-site-subtext)] sm:px-6 lg:px-8" style={{ borderColor: "var(--color-site-line)" }}>
        © {year} {companyInfo.shortDisplayName}. All rights reserved.
      </div>
    </footer>
  );
}
