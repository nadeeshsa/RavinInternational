"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import {
  createInventoryItem,
  deleteInventoryItem,
  updateInventoryItem,
  type InventoryItemInput,
} from "@/lib/inventory-store";
import type { InventoryCategory, InventoryStatus } from "@/types/inventory";

function revalidatePublicPages() {
  revalidatePath("/admin/inventory");
  revalidatePath("/inventory");
  revalidatePath("/");
}

function parseItemForm(formData: FormData): InventoryItemInput {
  return {
    stockId: String(formData.get("stockId") || ""),
    title: String(formData.get("title") || ""),
    category: String(formData.get("category")) as InventoryCategory,
    make: String(formData.get("make") || ""),
    model: String(formData.get("model") || ""),
    year: Number(formData.get("year")) || new Date().getFullYear(),
    mileageOrHours: String(formData.get("mileageOrHours") || ""),
    engineSize: String(formData.get("engineSize") || ""),
    fobPriceUSD: Number(formData.get("fobPriceUSD")) || 0,
    fobPriceJPY: Number(formData.get("fobPriceJPY")) || 0,
    status: String(formData.get("status")) as InventoryStatus,
    images: formData.getAll("images").map(String).filter(Boolean),
  };
}

export async function createInventoryItemAction(formData: FormData) {
  await requireAdmin();
  const data = parseItemForm(formData);
  await createInventoryItem(data);
  revalidatePublicPages();
  redirect("/admin/inventory");
}

export async function updateInventoryItemAction(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseItemForm(formData);
  await updateInventoryItem(id, data);
  revalidatePublicPages();
  redirect("/admin/inventory");
}

export async function deleteInventoryItemAction(id: string) {
  await requireAdmin();
  await deleteInventoryItem(id);
  revalidatePublicPages();
}

export async function setStatusAction(id: string, status: InventoryStatus) {
  await requireAdmin();
  await updateInventoryItem(id, { status });
  revalidatePublicPages();
}
