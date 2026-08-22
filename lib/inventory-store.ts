import { list, put } from "@vercel/blob";
import type { InventoryItem } from "@/types/inventory";

const INVENTORY_BLOB_PATHNAME = "data/inventory.json";
const SOLD_VISIBILITY_DAYS = 7;

export type StoredInventoryItem = InventoryItem & {
  soldAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type InventoryItemInput = Omit<
  StoredInventoryItem,
  "id" | "soldAt" | "createdAt" | "updatedAt"
>;

async function findInventoryBlobUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: INVENTORY_BLOB_PATHNAME, limit: 1 });
  return blobs[0]?.url ?? null;
}

export async function getAllInventory(): Promise<StoredInventoryItem[]> {
  const url = await findInventoryBlobUrl();
  if (!url) {
    return [];
  }

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as unknown;
  return Array.isArray(data) ? (data as StoredInventoryItem[]) : [];
}

async function saveAllInventory(items: StoredInventoryItem[]): Promise<void> {
  await put(INVENTORY_BLOB_PATHNAME, JSON.stringify(items, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

/**
 * Items shown on the public site. A "Sold" item keeps showing (with its
 * badge) for SOLD_VISIBILITY_DAYS after the status flipped, then drops out
 * automatically — no cron job, this filter runs on every read.
 */
export async function getPublicInventory(): Promise<InventoryItem[]> {
  const all = await getAllInventory();
  const now = Date.now();
  const cutoffMs = SOLD_VISIBILITY_DAYS * 24 * 60 * 60 * 1000;

  return all
    .filter((item) => {
      if (item.status !== "Sold") {
        return true;
      }
      if (!item.soldAt) {
        return true;
      }
      return now - new Date(item.soldAt).getTime() <= cutoffMs;
    })
    .map(({ soldAt: _soldAt, createdAt: _createdAt, updatedAt: _updatedAt, ...rest }) => rest);
}

export async function createInventoryItem(
  input: InventoryItemInput,
): Promise<StoredInventoryItem> {
  const items = await getAllInventory();
  const now = new Date().toISOString();

  const newItem: StoredInventoryItem = {
    ...input,
    id: crypto.randomUUID(),
    soldAt: input.status === "Sold" ? now : null,
    createdAt: now,
    updatedAt: now,
  };

  items.unshift(newItem);
  await saveAllInventory(items);
  return newItem;
}

export async function updateInventoryItem(
  id: string,
  input: Partial<InventoryItemInput>,
): Promise<StoredInventoryItem | null> {
  const items = await getAllInventory();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const current = items[index];
  const now = new Date().toISOString();

  let soldAt = current.soldAt;
  if (input.status !== undefined) {
    if (input.status === "Sold") {
      soldAt = current.status === "Sold" ? current.soldAt : now;
    } else {
      soldAt = null;
    }
  }

  const updated: StoredInventoryItem = {
    ...current,
    ...input,
    soldAt,
    updatedAt: now,
  };

  items[index] = updated;
  await saveAllInventory(items);
  return updated;
}

export async function deleteInventoryItem(id: string): Promise<void> {
  const items = await getAllInventory();
  const filtered = items.filter((item) => item.id !== id);
  await saveAllInventory(filtered);
}

export { SOLD_VISIBILITY_DAYS };
