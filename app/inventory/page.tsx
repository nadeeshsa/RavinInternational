import type { Metadata } from "next";
import { InventoryStockBoard } from "@/components/inventory/InventoryStockBoard";
import { InventoryPageHeader } from "@/components/inventory/InventoryPageHeader";
import { getPublicInventory } from "@/lib/inventory-store";
import { companyInfo } from "@/lib/company-info";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `在庫一覧 | ${companyInfo.companyNameJapanese}`,
  description:
    "カテゴリー・メーカー・年式・価格で絞り込み、輸出可能な車両・重機・部品をご確認いただけます。",
};

export default async function InventoryPage() {
  const inventory = await getPublicInventory();
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <InventoryPageHeader />
      <InventoryStockBoard items={inventory} />
    </section>
  );
}
