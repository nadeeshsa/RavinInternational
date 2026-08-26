"use client";

import { useMemo, useState } from "react";
import { companyInfo } from "@/lib/company-info";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

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

export function InquiryForm({
  stockContext,
  submitLabel,
  onSuccess,
  redirectToWhatsApp = false,
}: InquiryFormProps) {
  const { t } = useLanguage();
  const c = t.contactPage;
  const defaultMessage =
    "Hello, I am interested in this unit. Please share final quote, shipping details, and payment terms.";

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
    if (!stockContext) return "";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(stockContext.fobPriceUSD);
  }, [stockContext]);

  const readonlyPriceJPY = useMemo(() => {
    if (!stockContext) return "";
    return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(stockContext.fobPriceJPY);
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
        `Hello ${companyInfo.companyNameJapanese}, I would like to submit a contact request.`,
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
      const whatsappUrl = `${companyInfo.whatsappLink}${separator}text=` + encodeURIComponent(whatsappLines.join("\n"));

      onSuccess?.();
      window.open(whatsappUrl, "_self");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = (await response.json()) as { message?: string };
      if (!response.ok) {
        setSubmitState({ kind: "error", message: body.message || c.errorFallback });
        return;
      }

      setSubmitState({ kind: "success", message: body.message || c.successFallback });

      setCustomerName("");
      setEmail("");
      setCountry("");
      setDestinationPort("");
      setPhoneNumber("");
      setMessage(defaultMessage);
      onSuccess?.();
    } catch {
      setSubmitState({ kind: "error", message: c.networkError });
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

          <div className="rounded-xl p-4" style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--accent)" }}>
              {c.stockQuoteContext}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <ReadonlyField label={c.stockId} value={stockContext.stockId} />
              <ReadonlyField label={c.vehicleName} value={stockContext.vehicleName} />
              <ReadonlyField label={c.fobPriceUSD} value={readonlyPriceUSD} />
              <ReadonlyField label={c.fobPriceJPY} value={readonlyPriceJPY} />
            </div>
          </div>
        </>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <TextField id="inquiry-name" label={c.nameLabel} value={customerName} onChange={setCustomerName} placeholder={c.namePlaceholder} required requiredLabel={c.required} />
        <TextField id="inquiry-email" label={c.emailLabel} value={email} onChange={setEmail} type="email" placeholder={c.emailPlaceholder} required requiredLabel={c.required} />
        <TextField id="inquiry-country" label={c.countryLabel} value={country} onChange={setCountry} placeholder={c.countryPlaceholder} required requiredLabel={c.required} />
        <TextField id="inquiry-destination" label={c.destinationLabel} value={destinationPort} onChange={setDestinationPort} placeholder={c.destinationPlaceholder} required requiredLabel={c.required} />
        <TextField id="inquiry-phone" label={c.phoneLabel} value={phoneNumber} onChange={setPhoneNumber} placeholder={c.phonePlaceholder} required requiredLabel={c.required} />
      </div>

      <label htmlFor="inquiry-message" className="block">
        <span className="mb-2 block text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
          {c.messageLabel} <span style={{ color: "var(--danger)" }}>({c.required})</span>
        </span>
        <textarea
          id="inquiry-message"
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--fg)" }}
        />
      </label>

      {submitState.kind !== "idle" ? (
        <p
          className="rounded-xl px-4 py-3 text-sm"
          style={
            submitState.kind === "success"
              ? { border: "1px solid var(--success)", background: "var(--bg-muted)", color: "var(--success)" }
              : { border: "1px solid var(--danger)", background: "var(--bg-muted)", color: "var(--danger)" }
          }
        >
          {submitState.message}
        </p>
      ) : null}

      <button type="submit" disabled={isSubmitting} className="btn-rd-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
        {isSubmitting ? c.submitting : submitLabel || c.submit}
      </button>
    </form>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email";
  required?: boolean;
  requiredLabel?: string;
};

function TextField({ id, label, value, onChange, placeholder, type = "text", required, requiredLabel }: TextFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
        {label}
        {required ? (
          <span style={{ color: "var(--danger)" }}> ({requiredLabel})</span>
        ) : null}
      </span>
      <input
        id={id}
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--fg)" }}
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
      <span className="mb-2 block text-xs font-semibold tracking-[0.1em]" style={{ color: "var(--fg-subtle)" }}>
        {label}
      </span>
      <input
        readOnly
        value={value}
        className="w-full rounded-xl px-4 py-3 text-sm"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}
      />
    </label>
  );
}
