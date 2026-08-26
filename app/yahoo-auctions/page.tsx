import type { Metadata } from "next";
import { getYahooSellerFeed } from "@/lib/external-feeds";
import { companyInfo } from "@/lib/company-info";
import { AuctionsPageContent } from "@/components/auctions/AuctionsPageContent";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: `ヤフオク出品情報 | ${companyInfo.companyNameJapanese}`,
  description:
    "日本全国のヤフオク出品情報をリアルタイムで掲載。入札代行と輸出手続きをサポートします。",
};

export default async function YahooAuctionsPage() {
  const feed = await getYahooSellerFeed(10);
  return <AuctionsPageContent feed={feed} />;
}
