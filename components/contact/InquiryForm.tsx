"use client";

import { useMemo, useState } from "react";
import { companyInfo } from "@/lib/company-info";

type StockContext = {
  stockId: string;
  vehicleName: string;
  fobPriceUSD: number;
  fobPriceJPY: number;
};

type InquiryFormProps = {
  stockContext?: StockContext;
  submitLabel?: string;
  onSuccess?: () => void;
  redirectToWhatsApp?: boolean;
};

type InquiryPayload = {
  customerName: string;
  email: string;
  country: string;
  destinationPort: string;
  phoneNumber: string;
  message: string;
  stockId?: string;
  vehicleName?: string;
  fobPriceUSD?: number;
  fobPriceJPY?: number;
};

const defaultMessage =
  "Hello, I am interested in this unit. Please share final quote, shipping details, and payment terms.";

export function InquiryForm({
  stockContext,
  submitLabel = "Send Inquiry",
  onSuccess,
  redirectToWhatsApp = false,
}: InquiryFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [destinationPort, setDestinationPort] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(defaultMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<{
    kind: "idle" | "success" | "error";
    message: string;
  }>({ kind: "idle", message: "" });

  const readonlyPriceUSD = useMemo(() => {
    if (!stockContext) {
      return "";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(stockContext.fobPriceUSD);
  }, [stockContext]);

  const readonlyPriceJPY = useMemo(() => {
    if (!stockContext) {
      return "";
    }

    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(stockContext.fobPriceJPY);
  }, [stockContext]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ kind: "idle", message: "" });

    const payload: InquiryPayload = {
      customerName,
      email,
      country,
      destinationPort,
      phoneNumber,
      message,
      stockId: stockContext?.stockId,
      vehicleName: stockContext?.vehicleName,
      fobPriceUSD: stockContext?.fobPriceUSD,
      fobPriceJPY: stockContext?.fobPriceJPY,
    };

    if (redirectToWhatsApp) {
      const whatsappLines = [
        "Hello ラビンインターナショナル株式会社, I would like to submit a contact request.",
        "",
        `Customer Name: ${payload.customerName}`,
        `Email: ${payload.email}`,
        `Country: ${payload.country}`,
        `Target Destination Port: ${payload.destinationPort}`,
        `Phone Number: ${payload.phoneNumber}`,
        `Message: ${payload.message}`,
      ];

      if (payload.stockId || payload.vehicleName) {
        whatsappLines.push(
          "",
          `Stock ID: ${payload.stockId || "N/A"}`,
          `Vehicle Name: ${payload.vehicleName || "N/A"}`,
          `FOB Price (USD): ${readonlyPriceUSD || "N/A"}`,
          `FOB Price (JPY): ${readonlyPriceJPY || "N/A"}`,
        );
      }

      const separator = companyInfo.whatsappLink.includes("?") ? "&" : "?";
      const whatsappUrl =
        `${companyInfo.whatsappLink}${separator}text=` +
        encodeURIComponent(whatsappLines.join("\n"));

      onSuccess?.();
      window.open(whatsappUrl, "_self");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = (await response.json()) as { message?: string };
      if (!response.ok) {
        setSubmitState({
          kind: "error",
          message:
            body.message ||
            "Unable to send inquiry right now. Please try WhatsApp or email.",
        });
        return;
      }

      setSubmitState({
        kind: "success",
        message:
          body.message ||
          "Inquiry sent successfully. Our team will contact you soon.",
      });

      setCustomerName("");
      setEmail("");
      setCountry("");
      setDestinationPort("");
      setPhoneNumber("");
      setMessage(defaultMessage);
      onSuccess?.();
    } catch {
      setSubmitState({
        kind: "error",
        message: "Network issue while submitting inquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {stockContext ? (
        <>
          <input type="hidden" name="stockId" value={stockContext.stockId} />
          <input type="hidden" name="vehicleName" value={stockContext.vehicleName} />
          <input type="hidden" name="fobPriceUSD" value={stockContext.fobPriceUSD} />
          <input type="hidden" name="fobPriceJPY" value={stockContext.fobPriceJPY} />

          <div className="rounded-2xl border border-slate-200 bg-[var(--color-site-bg-soft)] p-4">
            <p className="text-xs font-semibold tracking-[0.13em] text-blue-700">
              STOCK QUOTE CONTEXT
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <ReadonlyField label="Stock ID" value={stockContext.stockId} />
              <ReadonlyField label="Vehicle Name" value={stockContext.vehicleName} />
              <ReadonlyField label="FOB Price (USD)" value={readonlyPriceUSD} />
              <ReadonlyField label="FOB Price (JPY)" value={readonlyPriceJPY} />
            </div>
          </div>
        </>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          label="Customer Name"
          value={customerName}
          onChange={setCustomerName}
          placeholder="Your full name"
        />
        <TextField
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="you@example.com"
        />
        <TextField
          label="Country"
          value={country}
          onChange={setCountry}
          placeholder="e.g. Kenya"
        />
        <TextField
          label="Target Destination Port"
          value={destinationPort}
          onChange={setDestinationPort}
          placeholder="e.g. Mombasa"
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={setPhoneNumber}
          placeholder="+254 ..."
        />
      </div>

      <label className="block">
        <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
          Message
        </span>
        <textarea
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400"
        />
      </label>

      {submitState.kind !== "idle" ? (
        <p
          className={`rounded-xl border px-4 py-3 text-sm ${
            submitState.kind === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {submitState.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email";
};

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
        {label}
      </span>
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400"
      />
    </label>
  );
}

type ReadonlyFieldProps = {
  label: string;
  value: string;
};

function ReadonlyField({ label, value }: ReadonlyFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-slate-600">
        {label}
      </span>
      <input
        readOnly
        value={value}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
      />
    </label>
  );
}
