import type { Payment } from "../types";

export function toggleItem<T>(items: readonly T[], value: T): T[] {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}

export function selectPayment(ids: string[], id: string, selected: boolean): string[] {
  const remaining = ids.filter((item) => item !== id);
  return selected ? [...remaining, id] : remaining;
}

export function selectPage(ids: string[], pageIds: string[], selected: boolean): string[] {
  if (selected) return [...new Set([...ids, ...pageIds])];
  return ids.filter((id) => !pageIds.includes(id));
}

export function paymentsForExport(payments: Payment[], selectedIds: string[]): Payment[] {
  if (selectedIds.length === 0) return payments;
  return payments.filter((payment) => selectedIds.includes(payment.id));
}
