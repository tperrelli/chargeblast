import { MS_PER_DAY, MS_PER_HOUR, MS_PER_MINUTE } from "./query-payments";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});
const relativeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

export function relativeDate(value: string, now: number): string {
  const difference = new Date(value).getTime() - now;
  const absolute = Math.abs(difference);
  if (absolute < MS_PER_HOUR)
    return relativeFormatter.format(Math.round(difference / MS_PER_MINUTE), "minute");
  if (absolute < MS_PER_DAY)
    return relativeFormatter.format(Math.round(difference / MS_PER_HOUR), "hour");
  return relativeFormatter.format(Math.round(difference / MS_PER_DAY), "day");
}

const tableDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

export function formatTableDate(value: string): string {
  return tableDateFormatter.format(new Date(value));
}
