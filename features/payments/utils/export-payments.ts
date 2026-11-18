import type { Payment } from "@/features/payments/types";

function csvCell(value: string | number): string {
  let text = String(value);
  if (/^[\s]*[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export function paymentsCsv(payments: Payment[]): string {
  const headings = [
    "Payment ID",
    "Amount",
    "Currency",
    "Status",
    "Payment method",
    "Last four",
    "Description",
    "Customer",
    "Email",
    "Created (UTC)",
    "Refunded (UTC)",
    "Decline reason",
  ];
  const rows = payments.map((payment) =>
    [
      payment.id,
      payment.amount,
      payment.currency,
      payment.status,
      payment.brand,
      payment.last4,
      payment.description,
      payment.customer,
      payment.email,
      payment.created,
      payment.refundedAt ?? "",
      payment.declineReason ?? "",
    ]
      .map(csvCell)
      .join(","),
  );
  return [headings.map(csvCell).join(","), ...rows].join("\r\n");
}
