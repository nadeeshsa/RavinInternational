"use client";

import { useMemo, useState } from "react";

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

          <div className="rounded-2xl border border-cyan-300/30 bg-[#062743] p-4">
            <p className="text-xs font-semibold tracking-[0.13em] text-cyan-200">
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
        <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-cyan-200">
          Message
        </span>
        <textarea
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          className="w-full rounded-xl border border-cyan-300/25 bg-[#041f36] px-4 py-3 text-sm text-white outline-none placeholder:text-cyan-200/50 focus:border-cyan-300/55"
        />
      </label>

      {submitState.kind !== "idle" ? (
        <p
          className={`rounded-xl border px-4 py-3 text-sm ${
            submitState.kind === "success"
              ? "border-emerald-300/45 bg-emerald-300/10 text-emerald-100"
              : "border-rose-300/45 bg-rose-300/10 text-rose-100"
          }`}
        >
          {submitState.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#06253f] transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
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
      <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-cyan-200">
        {label}
      </span>
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-cyan-300/25 bg-[#041f36] px-4 py-3 text-sm text-white outline-none placeholder:text-cyan-200/50 focus:border-cyan-300/55"
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
      <span className="mb-2 block text-xs font-semibold tracking-[0.12em] text-cyan-200">
        {label}
      </span>
      <input
        readOnly
        value={value}
        className="w-full rounded-xl border border-cyan-300/25 bg-[#041f36] px-4 py-3 text-sm text-cyan-50"
      />
    </label>
  );
}
