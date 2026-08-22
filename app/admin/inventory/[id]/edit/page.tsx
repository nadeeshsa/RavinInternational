import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllInventory } from "@/lib/inventory-store";
import { InventoryForm } from "@/components/admin/InventoryForm";
import { updateInventoryItemAction } from "../../actions";

type EditInventoryItemPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditInventoryItemPage({ params }: EditInventoryItemPageProps) {
  await requireAdmin();
  const { id } = await params;

  const items = await getAllInventory();
  const item = items.find((candidate) => candidate.id === id);

  if (!item) {
    notFound();
  }

  const updateWithId = updateInventoryItemAction.bind(null, id);

  return (
    <section className="py-8">
      <h1 className="font-industrial text-3xl text-slate-900">Edit Listing</h1>
      <p className="mt-1 text-sm text-slate-600">{item.stockId} — {item.title}</p>

      <div className="mt-6 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <InventoryForm action={updateWithId} initialItem={item} submitLabel="Save Changes" />
      </div>
    </section>
  );
}
