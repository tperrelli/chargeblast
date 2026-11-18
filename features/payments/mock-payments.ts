import type { Payment, PaymentCurrency, PaymentMethod, PaymentStatus } from "./types";

const firstNames = [
  "Olivia",
  "Noah",
  "Emma",
  "Liam",
  "Ava",
  "James",
  "Sophia",
  "Lucas",
  "Mia",
  "Ethan",
  "Isabella",
  "Amelia",
  "Benjamin",
  "Charlotte",
  "Daniel",
  "Harper",
  "Henry",
  "Evelyn",
  "Alexander",
  "Sofia",
];
const lastNames = [
  "Martin",
  "Wilson",
  "Thompson",
  "Garcia",
  "Anderson",
  "Taylor",
  "Lee",
  "Johnson",
  "Brown",
  "Davis",
  "Clark",
  "Lewis",
  "Walker",
  "Hall",
  "Young",
  "Allen",
];
const statuses: PaymentStatus[] = [
  "Succeeded",
  "Succeeded",
  "Succeeded",
  "Succeeded",
  "Succeeded",
  "Pending",
  "Failed",
  "Refunded",
  "Canceled",
  "Blocked",
];
const methods: PaymentMethod[] = ["Card", "Card", "Card", "Card", "ACH", "Wallet"];
const currencies: PaymentCurrency[] = ["USD", "USD", "USD", "EUR", "GBP", "CAD", "BRL"];
const brands = ["Visa", "Mastercard", "Amex"];
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const PAYMENT_COUNT = 420;
const ID_LENGTH = 24;
const RANDOM_SEED = 92_741;
const RANDOM_MULTIPLIER = 16_807;
const RANDOM_MODULUS = 2_147_483_647;
const MAX_AMOUNT_CENTS = 48_000;
const MIN_AMOUNT_CENTS = 900;
const CENTS_PER_UNIT = 100;
const MAX_CARD_NUMBER = 10_000;
const MINUTES_PER_HOUR = 60;
const MS_PER_MINUTE = 60_000;
const HOURS_BETWEEN_PAYMENTS = 4;
const MAX_MINUTE_OFFSET = 50;
const LAST_FOUR_LENGTH = 4;
const REFUND_DELAY_HOURS = 24;
const LINK_SAMPLE_INTERVAL = 3;
const DECLINE_REASONS = ["Insufficient funds", "Do not honor", "Transaction declined"];
const REFERENCE_DATE = Date.UTC(2026, 10, 18, 17, 42);

// A fixed seed and timestamp keep sample records identical on every load.
function makePayments(): Payment[] {
  let seed = RANDOM_SEED;
  function random(max: number): number {
    seed = (seed * RANDOM_MULTIPLIER) % RANDOM_MODULUS;
    return seed % max;
  }
  const payments: Payment[] = [];
  for (let index = 0; index < PAYMENT_COUNT; index++) {
    const first = firstNames[random(firstNames.length)];
    const last = lastNames[random(lastNames.length)];
    let suffix = "";
    for (let character = 0; character < ID_LENGTH; character++)
      suffix += alphabet[random(alphabet.length)];
    const method = methods[random(methods.length)];
    const status = statuses[random(statuses.length)];
    const amount = (random(MAX_AMOUNT_CENTS) + MIN_AMOUNT_CENTS) / CENTS_PER_UNIT;
    const currency = currencies[random(currencies.length)];
    const brand =
      method === "Card"
        ? brands[random(brands.length)]
        : method === "Wallet"
          ? "Apple Pay"
          : "US bank account";
    const last4 = String(random(MAX_CARD_NUMBER)).padStart(LAST_FOUR_LENGTH, "0");
    const createdAt =
      REFERENCE_DATE -
      index * HOURS_BETWEEN_PAYMENTS * MINUTES_PER_HOUR * MS_PER_MINUTE -
      random(MAX_MINUTE_OFFSET) * MS_PER_MINUTE;
    payments.push({
      id: `pi_${suffix}`,
      customer: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${index + 1}@example.com`,
      amount,
      currency,
      status,
      method,
      brand,
      last4,
      created: new Date(createdAt).toISOString(),
      description: "Subscription update",
      viaLink: method === "Card" && status === "Succeeded" && index % LINK_SAMPLE_INTERVAL === 0,
      refundedAt:
        status === "Refunded"
          ? new Date(
              createdAt + REFUND_DELAY_HOURS * MINUTES_PER_HOUR * MS_PER_MINUTE,
            ).toISOString()
          : null,
      declineReason:
        status === "Failed" || status === "Blocked"
          ? DECLINE_REASONS[index % DECLINE_REASONS.length]
          : null,
    });
  }
  return payments;
}

export const payments = makePayments();

export function getPaymentById(id: string): Payment | undefined {
  return payments.find((payment) => payment.id === id);
}
