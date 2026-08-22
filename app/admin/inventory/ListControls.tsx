"use client";

import { Trash2 } from "lucide-react";
import type { InventoryStatus } from "@/types/inventory";
import { inventoryStatuses } from "@/types/inventory";
import { deleteInventoryItemAction, setStatusAction } from "./actions";

export function StatusButtons({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: InventoryStatus;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
      {inventoryStatuses.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => setStatusAction(id, status)}
          disabled={status === currentStatus}
          className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
            status === currentStatus
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export function DeleteButton({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (window.confirm("Delete this listing permanently? This cannot be undone.")) {
          deleteInventoryItemAction(id);
        }
      }}
      aria-label="Delete listing"
      className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
    >
      <Trash2 className="h-4 w-4" />
      Delete
    </button>
  );
}
