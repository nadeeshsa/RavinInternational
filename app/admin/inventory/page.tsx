import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllInventory, SOLD_VISIBILITY_DAYS } from "@/lib/inventory-store";
import { DeleteButton, StatusButtons } from "./ListControls";

export default async function AdminInventoryPage() {
  await requireAdmin();
  const items = await getAllInventory();

  return (
    <section className="py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-industrial text-3xl text-slate-900">Manage Inventory</h1>
          <p className="mt-1 text-sm text-slate-600">
            {items.length} listing{items.length === 1 ? "" : "s"} total. Sold items stay
            visible on the public site for {SOLD_VISIBILITY_DAYS} days, then disappear
            automatically.
          </p>
        </div>
        <Link href="/admin/inventory/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add Listing
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="font-industrial text-xl text-slate-900">No listings yet</p>
          <p className="mt-2 text-sm text-slate-600">
            Add your first vehicle or machine to get it live on the site.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {items.map((item) => {
            const daysLeft =
              item.status === "Sold" && item.soldAt
                ? Math.max(
                    0,
                    SOLD_VISIBILITY_DAYS -
                      Math.floor((Date.now() - new Date(item.soldAt).getTime()) / 86400000),
                  )
                : null;

            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:w-32">
                  {item.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.images[0]} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-[0.1em] text-blue-700">
                    {item.stockId}
                  </p>
                  <h2 className="font-industrial truncate text-xl text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.make} {item.model} | {item.year} | {item.category}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    ${item.fobPriceUSD.toLocaleString()} / ¥{item.fobPriceJPY.toLocaleString()}
                  </p>
                  {daysLeft !== null ? (
                    <p className="mt-1 text-xs text-amber-700">
                      {daysLeft > 0
                        ? `Hides from public site in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`
                        : "No longer visible on public site"}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <StatusButtons id={item.id} currentStatus={item.status} />
                  <Link
                    href={`/admin/inventory/${item.id}/edit`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Link>
                  <DeleteButton id={item.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
