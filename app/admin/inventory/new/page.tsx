import { requireAdmin } from "@/lib/admin-auth";
import { InventoryForm } from "@/components/admin/InventoryForm";
import { createInventoryItemAction } from "../actions";

export default async function NewInventoryItemPage() {
  await requireAdmin();

  return (
    <section className="py-8">
      <h1 className="font-industrial text-3xl text-slate-900">Add Listing</h1>
      <p className="mt-1 text-sm text-slate-600">
        Fill in the details and upload real photos for this vehicle or machine.
      </p>

      <div className="mt-6 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <InventoryForm action={createInventoryItemAction} submitLabel="Publish Listing" />
      </div>
    </section>
  );
}
