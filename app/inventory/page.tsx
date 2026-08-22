import type { Metadata } from "next";
import { InventoryStockBoard } from "@/components/inventory/InventoryStockBoard";
import { getPublicInventory } from "@/lib/inventory-store";

export const metadata: Metadata = {
  title: "Stock Inventory | ラビンインターナショナル株式会社",
  description:
    "Browse export-ready vehicles, heavy machinery, and parts with filters for category, make, model year, and budget.",
};

export default async function InventoryPage() {
  const inventory = await getPublicInventory();
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-blue-700">
          LIVE EXPORT CATALOG
        </p>
        <h1 className="font-industrial mt-3 text-4xl text-slate-900 sm:text-5xl">
          Verified Vehicles, Heavy Machinery, Equipment, and Parts
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
          Explore our export-ready inventory, fully inspected and sourced by
          ラビンインターナショナル株式会社. Filter by category, make, year, and
          price, then view each stock card for detailed specifications and
          accurate global shipping estimates.
        </p>
      </div>

      <InventoryStockBoard items={inventory} />
    </section>
  );
}
