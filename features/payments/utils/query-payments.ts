import type {
  Payment,
  PaymentCurrency,
  PaymentMethod,
  PaymentStatus,
} from "@/features/payments/types";

export type Period = "All time" | "Today" | "7 days" | "30 days" | "Custom";
export type SortKey = "created" | "amount" | "status";
export type SortRule = { key: SortKey; direction: "asc" | "desc" };
export type PaymentFilters = {
  query: string;
  period: Period;
  from: string;
  to: string;
  statuses: PaymentStatus[];
  methods: PaymentMethod[];
  currencies: PaymentCurrency[];
  minimum: string;
  maximum: string;
};
export type PaymentTableState = {
  filters: PaymentFilters;
  sort: SortRule[];
  page: number;
  pageSize: number;
};

export const MS_PER_MINUTE = 60_000;
export const MS_PER_HOUR = 60 * MS_PER_MINUTE;
export const MS_PER_DAY = 24 * MS_PER_HOUR;
export const DEFAULT_PAGE_SIZE = 25;
export const INITIAL_FILTERS: PaymentFilters = {
  query: "",
  period: "All time",
  from: "",
  to: "",
  statuses: [],
  methods: [],
  currencies: [],
  minimum: "",
  maximum: "",
};
export const INITIAL_TABLE_STATE: PaymentTableState = {
  filters: INITIAL_FILTERS,
  sort: [{ key: "created", direction: "desc" }],
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

const PERIOD_DAYS: Partial<Record<Period, number>> = { Today: 1, "7 days": 7, "30 days": 30 };
const COMPARATORS: Record<SortKey, (a: Payment, b: Payment) => number> = {
  amount: (a, b) => a.amount - b.amount,
  created: (a, b) => a.created.localeCompare(b.created),
  status: (a, b) => a.status.localeCompare(b.status),
};

export function filterPayments(
  payments: Payment[],
  filters: PaymentFilters,
  now: number,
): Payment[] {
  const term = filters.query.trim().toLowerCase();
  const today = new Date(now);
  const startOfToday = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const days = PERIOD_DAYS[filters.period];
  let start = Number.NEGATIVE_INFINITY;
  let end = Number.POSITIVE_INFINITY;
  if (days !== undefined) {
    start = startOfToday - (days - 1) * MS_PER_DAY;
    end = startOfToday + MS_PER_DAY - 1;
  }
  if (filters.period === "Custom") {
    if (filters.from) start = Date.parse(`${filters.from}T00:00:00.000Z`);
    if (filters.to) end = Date.parse(`${filters.to}T23:59:59.999Z`);
  }
  return payments.filter((payment) => {
    const created = Date.parse(payment.created);
    return (
      (!term || `${payment.id} ${payment.email} ${payment.last4}`.toLowerCase().includes(term)) &&
      created >= start &&
      created <= end &&
      (filters.statuses.length === 0 || filters.statuses.includes(payment.status)) &&
      (filters.methods.length === 0 || filters.methods.includes(payment.method)) &&
      (filters.currencies.length === 0 || filters.currencies.includes(payment.currency)) &&
      (filters.minimum === "" || payment.amount >= Number(filters.minimum)) &&
      (filters.maximum === "" || payment.amount <= Number(filters.maximum))
    );
  });
}

export function sortPayments(payments: Payment[], rules: SortRule[]): Payment[] {
  return [...payments].sort((a, b) => {
    for (let index = 0; index < rules.length; index++) {
      const rule = rules[index];
      const result = COMPARATORS[rule.key](a, b);
      if (result !== 0) return rule.direction === "desc" ? -result : result;
    }
    return a.id.localeCompare(b.id);
  });
}

export function nextSortRules(rules: SortRule[], key: SortKey): SortRule[] {
  const current = rules.find((rule) => rule.key === key);
  if (!current) return [...rules, { key, direction: "asc" }];
  if (current.direction === "asc")
    return rules.map((rule) => (rule.key === key ? { ...rule, direction: "desc" } : rule));
  return rules.filter((rule) => rule.key !== key);
}

export function paginatePayments(payments: Payment[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(payments.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const firstIndex = (currentPage - 1) * pageSize;
  return {
    totalPages,
    currentPage,
    firstIndex,
    visiblePayments: payments.slice(firstIndex, firstIndex + pageSize),
  };
}

export function hasActiveFilters(filters: PaymentFilters): boolean {
  return Boolean(
    filters.query ||
    filters.period !== "All time" ||
    filters.statuses.length ||
    filters.methods.length ||
    filters.currencies.length ||
    filters.minimum ||
    filters.maximum,
  );
}
