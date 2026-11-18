import assert from "node:assert/strict";
import { test } from "node:test";
import { getPaymentById, payments } from "../features/payments/mock-payments";
import type { Payment } from "../features/payments/types";
import { paymentsCsv } from "../features/payments/utils/export-payments";
import {
  filterPayments,
  INITIAL_FILTERS,
  nextSortRules,
  paginatePayments,
  sortPayments,
} from "../features/payments/utils/query-payments";

const NOW = Date.UTC(2026, 10, 18, 12);
const FIXTURE_DETAILS = {
  description: "Subscription update",
  refundedAt: null,
  declineReason: null,
  viaLink: false,
};
const FIXTURES: Payment[] = [
  {
    ...FIXTURE_DETAILS,
    id: "pi_a",
    customer: "A",
    email: "a@example.com",
    amount: 25,
    currency: "USD",
    status: "Succeeded",
    method: "Card",
    brand: "Visa",
    last4: "4242",
    created: "2026-11-18T09:00:00.000Z",
  },
  {
    ...FIXTURE_DETAILS,
    id: "pi_b",
    customer: "B",
    email: "b@example.com",
    amount: 70,
    currency: "EUR",
    status: "Pending",
    method: "ACH",
    brand: "US bank account",
    last4: "1212",
    created: "2026-11-17T09:00:00.000Z",
  },
  {
    ...FIXTURE_DETAILS,
    id: "pi_c",
    customer: "C",
    email: "c@example.com",
    amount: 45,
    currency: "USD",
    status: "Succeeded",
    method: "Card",
    brand: "Visa",
    last4: "4242",
    created: "2026-11-15T09:00:00.000Z",
  },
  {
    ...FIXTURE_DETAILS,
    id: "pi_d",
    customer: "D",
    email: "d@example.com",
    amount: 45,
    currency: "USD",
    status: "Failed",
    method: "Wallet",
    brand: "Apple Pay",
    last4: "9999",
    created: "2026-10-10T09:00:00.000Z",
  },
];

test("combines search, date, status, method and amount filters", () => {
  const filtered = filterPayments(
    FIXTURES,
    {
      ...INITIAL_FILTERS,
      query: "4242",
      period: "7 days",
      statuses: ["Succeeded"],
      methods: ["Card"],
      minimum: "30",
      maximum: "50",
    },
    NOW,
  );
  assert.deepEqual(
    filtered.map((payment) => payment.id),
    ["pi_c"],
  );
  assert.deepEqual(
    filterPayments(FIXTURES, { ...INITIAL_FILTERS, query: "B@EXAMPLE.COM" }, NOW).map(
      (payment) => payment.id,
    ),
    ["pi_b"],
  );
  assert.deepEqual(filterPayments(FIXTURES, { ...INITIAL_FILTERS, query: "missing" }, NOW), []);
});

test("uses inclusive UTC boundaries for preset and custom periods", () => {
  assert.deepEqual(
    filterPayments(FIXTURES, { ...INITIAL_FILTERS, period: "Today" }, NOW).map(
      (payment) => payment.id,
    ),
    ["pi_a"],
  );
  assert.deepEqual(
    filterPayments(
      FIXTURES,
      { ...INITIAL_FILTERS, period: "Custom", from: "2026-11-15", to: "2026-11-17" },
      NOW,
    ).map((payment) => payment.id),
    ["pi_b", "pi_c"],
  );
});

test("sorts by multiple priorities without mutating the original list", () => {
  const sorted = sortPayments(FIXTURES, [
    { key: "amount", direction: "asc" },
    { key: "status", direction: "asc" },
  ]);
  assert.deepEqual(
    sorted.map((payment) => payment.id),
    ["pi_a", "pi_d", "pi_c", "pi_b"],
  );
  assert.deepEqual(
    FIXTURES.map((payment) => payment.id),
    ["pi_a", "pi_b", "pi_c", "pi_d"],
  );
});

test("cycles sorting and clamps pagination after results change", () => {
  const ascending = nextSortRules([], "amount");
  const descending = nextSortRules(ascending, "amount");
  assert.deepEqual(descending, [{ key: "amount", direction: "desc" }]);
  assert.deepEqual(nextSortRules(descending, "amount"), []);
  const page = paginatePayments(FIXTURES, 5, 2);
  assert.equal(page.currentPage, 2);
  assert.deepEqual(
    page.visiblePayments.map((payment) => payment.id),
    ["pi_c", "pi_d"],
  );
  assert.equal(paginatePayments([], 3, 25).currentPage, 1);
});

test("sample data has unique IDs and all required statuses and methods", () => {
  assert.equal(payments.length, 420);
  assert.equal(new Set(payments.map((payment) => payment.id)).size, payments.length);
  assert.deepEqual(
    new Set(payments.map((payment) => payment.status)),
    new Set(["Succeeded", "Pending", "Failed", "Refunded", "Canceled", "Blocked"]),
  );
  assert.deepEqual(
    new Set(payments.map((payment) => payment.method)),
    new Set(["Card", "ACH", "Wallet"]),
  );
});

test("looks up the exact payment and rejects unknown IDs", () => {
  const payment = payments[0];
  assert.deepEqual(getPaymentById(payment.id), payment);
  assert.equal(getPaymentById("pi_unknown"), undefined);
});

test("filters currencies together with status and amount", () => {
  const result = filterPayments(
    FIXTURES,
    { ...INITIAL_FILTERS, currencies: ["USD"], statuses: ["Succeeded"], minimum: "30" },
    NOW,
  );
  assert.deepEqual(
    result.map((payment) => payment.id),
    ["pi_c"],
  );
});

test("exports valid CSV and escapes spreadsheet formulas and quotes", () => {
  const unsafe = {
    ...FIXTURES[0],
    customer: '=HYPERLINK("https://example.com")',
    description: 'Plan, "monthly"',
  };
  const csv = paymentsCsv([unsafe]);
  assert.ok(csv.includes(`"'=HYPERLINK(""https://example.com"")"`));
  assert.ok(csv.includes('"Plan, ""monthly"""'));
  assert.ok(csv.includes('"pi_a"'));
});
