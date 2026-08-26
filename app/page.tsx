import type { Metadata } from "next";
import { getPublicInventory } from "@/lib/inventory-store";
import { getYahooSellerFeed } from "@/lib/external-feeds";
import { getGalleryPhotoPaths } from "@/lib/gallery";
import { companyInfo } from "@/lib/company-info";
import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedStockSection } from "@/components/home/FeaturedStockSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FeaturedAuctionsSection } from "@/components/home/FeaturedAuctionsSection";
import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { ContactBand } from "@/components/home/ContactBand";
import { ValueStrip } from "@/components/home/ValueStrip";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${companyInfo.companyNameJapanese} | 中古車・重機・部品の輸出`,
  description: `${companyInfo.companyNameCombined} — ${companyInfo.businessScopeJapanese}。`,
};

export default async function Home() {
  const [inventory, auctionFeed, galleryPhotos] = await Promise.all([
    getPublicInventory(),
    getYahooSellerFeed(6),
    getGalleryPhotoPaths(),
  ]);

  const activeAuctions = auctionFeed.listings.filter((listing) => {
    if (!listing.priceValidUntil) return true;
    const validUntil = new Date(listing.priceValidUntil).getTime();
    return Number.isNaN(validUntil) || validUntil > Date.now();
  });

  return (
    <>
      <HomeHero />
      <ValueStrip />
      <FeaturedStockSection items={inventory} />
      <ProcessSection />
      <FeaturedAuctionsSection listings={activeAuctions.slice(0, 4)} />
      <GalleryPreviewSection photos={galleryPhotos.slice(0, 8)} />
      <ContactBand />
    </>
  );
}
