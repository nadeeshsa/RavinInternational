import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { companyInfo } from "@/lib/company-info";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

const inter = Inter({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const bilingual = Noto_Sans_JP({
  variable: "--font-bilingual",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: `${companyInfo.companyNameEnglish} | Exports`,
  description:
    `${companyInfo.businessScopeEnglish} (${companyInfo.businessScopeJapanese}).`,
  icons: {
    icon: "/logo/logo.jpeg",
    shortcut: "/logo/logo.jpeg",
    apple: "/logo/logo.jpeg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#161512" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${bilingual.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <LanguageProvider>
          <div className="flex min-h-full flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFab />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
