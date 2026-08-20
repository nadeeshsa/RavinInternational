import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { companyInfo } from "@/lib/company-info";

type ContactPayload = {
  customerName?: string;
  email?: string;
  country?: string;
  destinationPort?: string;
  phoneNumber?: string;
  message?: string;
  stockId?: string;
  vehicleName?: string;
  fobPriceUSD?: number;
  fobPriceJPY?: number;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatMoneyUSD(value: number | undefined): string {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMoneyJPY(value: number | undefined): string {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "N/A";
  }

  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(value);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const customerName = payload.customerName?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const country = payload.country?.trim() ?? "";
  const destinationPort = payload.destinationPort?.trim() ?? "";
  const phoneNumber = payload.phoneNumber?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (
    !customerName ||
    !email ||
    !country ||
    !destinationPort ||
    !phoneNumber ||
    !message
  ) {
    return NextResponse.json(
      { message: "Please complete all required inquiry fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "A valid email address is required." },
      { status: 400 },
    );
  }

  const smtpHost = process.env.SMTP_HOST?.trim() ?? "";
  const smtpPortRaw = process.env.SMTP_PORT?.trim() ?? "";
  const smtpUser = process.env.SMTP_USER?.trim() ?? "";
  const smtpPass = process.env.SMTP_PASS?.trim() ?? "";
  const smtpPort = Number(smtpPortRaw);

  if (!smtpHost || !smtpPortRaw || !smtpUser || !smtpPass || Number.isNaN(smtpPort)) {
    return NextResponse.json(
      {
        message:
          "SMTP configuration is incomplete. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in .env.local.",
      },
      { status: 500 },
    );
  }

  const stockId = payload.stockId?.trim() ?? "";
  const vehicleName = payload.vehicleName?.trim() ?? "";
  const subject = stockId
    ? `Stock Inquiry ${stockId} - ${vehicleName || "Vehicle"}`
    : "Website Contact Inquiry";

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #0b1e35; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">New Inquiry Received</h2>
      <p style="margin: 0 0 16px;">A customer submitted an inquiry from the website.</p>

      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; border-color: #b8cde0; width: 100%; max-width: 760px;">
        <tr><td><strong>Customer Name</strong></td><td>${escapeHtml(customerName)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Country</strong></td><td>${escapeHtml(country)}</td></tr>
        <tr><td><strong>Target Destination Port</strong></td><td>${escapeHtml(destinationPort)}</td></tr>
        <tr><td><strong>Phone Number</strong></td><td>${escapeHtml(phoneNumber)}</td></tr>
        <tr><td><strong>Message</strong></td><td>${escapeHtml(message).replaceAll("\n", "<br />")}</td></tr>
        <tr><td><strong>Stock ID</strong></td><td>${escapeHtml(stockId || "N/A")}</td></tr>
        <tr><td><strong>Vehicle Name</strong></td><td>${escapeHtml(vehicleName || "N/A")}</td></tr>
        <tr><td><strong>FOB Price (USD)</strong></td><td>${escapeHtml(formatMoneyUSD(payload.fobPriceUSD))}</td></tr>
        <tr><td><strong>FOB Price (JPY)</strong></td><td>${escapeHtml(formatMoneyJPY(payload.fobPriceJPY))}</td></tr>
      </table>

      <p style="margin-top: 16px;">Sent from ${escapeHtml(companyInfo.companyNameEnglish)} website.</p>
    </div>
  `;

  const textBody = [
    "New Inquiry Received",
    "",
    `Customer Name: ${customerName}`,
    `Email: ${email}`,
    `Country: ${country}`,
    `Target Destination Port: ${destinationPort}`,
    `Phone Number: ${phoneNumber}`,
    `Message: ${message}`,
    `Stock ID: ${stockId || "N/A"}`,
    `Vehicle Name: ${vehicleName || "N/A"}`,
    `FOB Price (USD): ${formatMoneyUSD(payload.fobPriceUSD)}`,
    `FOB Price (JPY): ${formatMoneyJPY(payload.fobPriceJPY)}`,
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `Website Inquiry <${smtpUser}>`,
      to: companyInfo.email,
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({
      message: "Inquiry sent successfully. We will contact you shortly.",
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Email delivery failed. Please verify SMTP credentials or use direct WhatsApp contact.",
      },
      { status: 500 },
    );
  }
}
