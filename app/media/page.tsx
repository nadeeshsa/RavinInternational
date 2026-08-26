import type { Metadata } from "next";
import { CuratedVideoGrid } from "@/components/media/CuratedVideoGrid";
import { MediaPageHeader } from "@/components/media/MediaPageHeader";
import { PhotoGallery } from "@/components/media/PhotoGallery";
import { getGalleryPhotoPaths } from "@/lib/gallery";
import { companyInfo } from "@/lib/company-info";

export const revalidate = 1200;

export const metadata: Metadata = {
  title: `ギャラリー | ${companyInfo.companyNameJapanese}`,
  description:
    "検査・ヤード作業の写真と、輸出チャンネルの最新動画をご紹介します。",
};

export default async function MediaPage() {
  const photos = await getGalleryPhotoPaths();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <MediaPageHeader />
      <PhotoGallery photos={photos} />
      <CuratedVideoGrid />
    </section>
  );
}
