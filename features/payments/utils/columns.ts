export const OPTIONAL_COLUMNS = ["description", "customer", "refundedAt", "declineReason"] as const;
export type OptionalColumn = (typeof OPTIONAL_COLUMNS)[number];
export const COLUMN_LABELS: Record<OptionalColumn, string> = {
  description: "Description",
  customer: "Customer",
  refundedAt: "Refunded date",
  declineReason: "Decline reason",
};
