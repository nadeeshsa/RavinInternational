"use client";

import Link from "next/link";
import { BadgeCheck, Mail, MapPin, MessageCircle, Phone, PlayCircle, Share2 } from "lucide-react";
import { companyInfo } from "@/lib/company-info";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const navPaths = [
  { href: "/", key: "home" as const },
  { href: "/inventory", key: "inventory" as const },
  { href: "/yahoo-auctions", key: "auctions" as const },
  { href: "/media", key: "gallery" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

const socialLinks = [
  { href: "https://www.youtube.com/@Jdmpqa2994", label: "YouTube", icon: PlayCircle },
  { href: "https://www.facebook.com/share/1Cd7GPhWLM/?mibextid=wwXIfr", label: "Facebook", icon: Share2 },
  { href: "https://linevoom.line.me/post/1174827056099759093", label: "LINE VOOM", icon: MessageCircle },
];

export function Footer() {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer style={{ marginTop: "3.5rem", borderTop: "1px solid var(--border)", background: "var(--bg-muted)" }}>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--fg-subtle)" }}>
            {t.footer.companyLabel}
          </p>
          <p className="mt-3 text-base font-bold" style={{ color: "var(--fg)" }}>
            {companyInfo.companyNameJapanese}
          </p>
          <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
            {companyInfo.companyNameEnglish}
          </p>

          <div className="mt-4 space-y-1.5 text-sm" style={{ color: "var(--fg-muted)" }}>
            <p className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {companyInfo.addressJapanese}
                <br />
                {companyInfo.addressEnglish}
              </span>
            </p>
            <p className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 shrink-0" />
              {language === "ja" ? companyInfo.dealerLicenseJapanese : companyInfo.dealerLicenseEnglish}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--fg-subtle)" }}>
            {t.footer.navLabel}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {navPaths.map((link) => (
              <li key={link.href}>
                <Link href={link.href} style={{ color: "var(--fg-muted)" }} className="transition hover:opacity-80">
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--fg-subtle)" }}>
            {t.footer.contactLabel}
          </p>
          <div className="mt-4 space-y-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            <a href={companyInfo.mobileCallLink} className="inline-flex items-center gap-2 transition hover:opacity-80">
              <Phone className="h-4 w-4" /> {companyInfo.mobile}
            </a>
            <a
              href={companyInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition hover:opacity-80"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp {companyInfo.whatsappDisplay}
            </a>
            <a href={companyInfo.emailLink} className="flex items-center gap-2 transition hover:opacity-80">
              <Mail className="h-4 w-4" /> {companyInfo.email}
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:opacity-80"
                style={{ border: "1px solid var(--border)", color: "var(--fg-muted)" }}
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className="px-4 py-4 text-center text-xs sm:px-6 lg:px-8"
        style={{ borderTop: "1px solid var(--border)", color: "var(--fg-subtle)" }}
      >
        © {year} {companyInfo.companyNameJapanese}. {t.footer.rights}
      </div>
    </footer>
  );
}
