"use client";

import { useEffect } from "react";
import { CircleX, FileText } from "lucide-react";
import { InquiryForm } from "@/components/contact/InquiryForm";
import type { InventoryItem } from "@/types/inventory";

type InquiryModalProps = {
  item: InventoryItem | null;
  onClose: () => void;
};

export function InquiryModal({ item, onClose }: InquiryModalProps) {
  useEffect(() => {
    if (!item) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#010a14]/85 px-4 py-8"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-cyan-300/30 bg-[#05223d] p-6 shadow-2xl shadow-black/60 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close inquiry form"
          className="absolute right-4 top-4 rounded-full border border-cyan-300/30 bg-cyan-300/10 p-2 text-cyan-100 transition hover:bg-cyan-300/20"
        >
          <CircleX className="h-5 w-5" />
        </button>

        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-cyan-200">
          <FileText className="h-3.5 w-3.5" />
          STOCK INQUIRY REQUEST
        </p>
        <h3 className="font-industrial mt-4 text-3xl text-white">Request Quote</h3>
        <p className="mt-2 text-sm text-[var(--color-site-subtext)]">
          Submit your destination and contact details. Our export desk will provide
          shipping terms, total estimate, and payment options.
        </p>

        <div className="mt-6">
          <InquiryForm
            stockContext={{
              stockId: item.stockId,
              vehicleName: item.title,
              fobPriceUSD: item.fobPriceUSD,
              fobPriceJPY: item.fobPriceJPY,
            }}
            submitLabel="Send Quote Request"
          />
        </div>
      </div>
    </div>
  );
}
