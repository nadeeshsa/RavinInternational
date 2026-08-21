import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { companyInfo } from "@/lib/company-info";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bilingual.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--color-site-bg)] text-[var(--color-site-text)]">
        <div className="flex min-h-full flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
        </div>
      </body>
    </html>
  );
}
