"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { CircleX, ImagePlus, Loader2 } from "lucide-react";
import { inventoryCategories, inventoryStatuses } from "@/types/inventory";
import type { InventoryItem } from "@/types/inventory";

type InventoryFormProps = {
  action: (formData: FormData) => void;
  initialItem?: InventoryItem;
  submitLabel: string;
};

export function InventoryForm({ action, initialItem, submitLabel }: InventoryFormProps) {
  const [images, setImages] = useState<string[]>(initialItem?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) {
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const uploaded = await Promise.all(
        Array.from(fileList).map((file) =>
          upload(`inventory/${Date.now()}-${file.name}`, file, {
            access: "public",
            handleUploadUrl: "/api/admin/blob-upload",
          }),
        ),
      );
      setImages((prev) => [...prev, ...uploaded.map((result) => result.url)]);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((image) => image !== url));
  }

  return (
    <form action={action} className="space-y-6">
      {images.map((url) => (
        <input key={url} type="hidden" name="images" value={url} />
      ))}

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Title" name="title" defaultValue={initialItem?.title} required />
        <TextField label="Stock ID" name="stockId" defaultValue={initialItem?.stockId} required />

        <SelectField
          label="Category"
          name="category"
          defaultValue={initialItem?.category ?? inventoryCategories[0]}
          options={inventoryCategories}
        />
        <SelectField
          label="Status"
          name="status"
          defaultValue={initialItem?.status ?? "Available"}
          options={inventoryStatuses}
        />

        <TextField label="Make" name="make" defaultValue={initialItem?.make} required />
        <TextField label="Model" name="model" defaultValue={initialItem?.model} required />

        <TextField
          label="Year"
          name="year"
          type="number"
          defaultValue={initialItem?.year}
          required
        />
        <TextField
          label="Mileage / Hours"
          name="mileageOrHours"
          placeholder="e.g. 89,200 km"
          defaultValue={initialItem?.mileageOrHours}
          required
        />

        <TextField
          label="Engine"
          name="engineSize"
          placeholder="e.g. 2.8L Turbo Diesel"
          defaultValue={initialItem?.engineSize}
          required
        />
        <div />

        <TextField
          label="FOB Price (USD)"
          name="fobPriceUSD"
          type="number"
          defaultValue={initialItem?.fobPriceUSD}
          required
        />
        <TextField
          label="FOB Price (JPY)"
          name="fobPriceJPY"
          type="number"
          defaultValue={initialItem?.fobPriceJPY}
          required
        />
      </div>

      <div>
        <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
          Photos
        </span>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((url) => (
            <div key={url} className="group relative overflow-hidden rounded-xl border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="aspect-square w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                aria-label="Remove photo"
                className="absolute right-1.5 top-1.5 rounded-full bg-white/90 p-1 text-slate-700 shadow-sm transition hover:bg-white"
              >
                <CircleX className="h-4 w-4" />
              </button>
            </div>
          ))}

          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700">
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <ImagePlus className="h-6 w-6" />
            )}
            <span className="text-xs font-semibold">Add Photos</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={uploading}
              onChange={(event) => handleFiles(event.target.files)}
              className="hidden"
            />
          </label>
        </div>

        {uploadError ? (
          <p className="mt-2 text-sm text-rose-700">{uploadError}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitLabel}
      </button>
    </form>
  );
}

type TextFieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  type?: "text" | "number";
  required?: boolean;
};

function TextField({ label, name, defaultValue, placeholder, type = "text", required }: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
        {label}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400"
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  defaultValue: string;
  options: readonly string[];
};

function SelectField({ label, name, defaultValue, options }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
