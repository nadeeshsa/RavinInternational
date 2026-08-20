import { InventoryStockBoard } from "@/components/inventory/InventoryStockBoard";
import { mockInventory } from "@/data/mock-inventory";

export default function InventoryPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-xs font-semibold tracking-[0.18em] text-blue-700">
          LIVE STOCK CATALOG
        </p>
        <h1 className="font-industrial mt-3 text-4xl text-slate-900 sm:text-5xl">
          Vehicles, Heavy Machinery, Equipment, and Parts
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
          Explore export-ready listings inspired by modern Japanese stock portals.
          Filter by category, make, year, and price, then open each stock card for
          full specs and shipping estimates.
        </p>
      </div>

      <InventoryStockBoard items={mockInventory} />
    </section>
  );
}
