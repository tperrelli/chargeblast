export const PAYMENT_STATUSES = [
  "Succeeded",
  "Pending",
  "Failed",
  "Refunded",
  "Canceled",
  "Blocked",
] as const;
export const PAYMENT_METHODS = ["Card", "ACH", "Wallet"] as const;
export const PAYMENT_CURRENCIES = ["USD", "EUR", "GBP", "CAD", "BRL"] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export type PaymentCurrency = (typeof PAYMENT_CURRENCIES)[number];
export type CardBrand = "Visa" | "Mastercard" | "Amex";
export type PaymentBrand = CardBrand | "Apple Pay" | "US bank account";

export type Payment = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  currency: PaymentCurrency;
  status: PaymentStatus;
  method: PaymentMethod;
  brand: PaymentBrand;
  last4: string;
  created: string;
  description: string;
  refundedAt: string | null;
  declineReason: string | null;
  viaLink: boolean;
};
