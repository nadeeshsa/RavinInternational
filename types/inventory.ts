export const inventoryCategories = [
  "Used Cars",
  "Heavy Machinery",
  "Equipment",
  "Parts",
] as const;

export const inventoryStatuses = ["Available", "Reserved", "Sold"] as const;

export type InventoryCategory = (typeof inventoryCategories)[number];
export type InventoryStatus = (typeof inventoryStatuses)[number];
export type InventoryCurrency = "USD" | "JPY";

export type InventoryItem = {
  id: string;
  stockId: string;
  title: string;
  category: InventoryCategory;
  make: string;
  model: string;
  year: number;
  mileageOrHours: string;
  engineSize: string;
  fobPriceUSD: number;
  fobPriceJPY: number;
  images: string[];
  status: InventoryStatus;
};
