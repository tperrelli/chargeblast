import { PAYMENT_CURRENCIES, PAYMENT_METHODS, PAYMENT_STATUSES } from "./types";
import type {
  CardBrand,
  Payment,
  PaymentBrand,
  PaymentCurrency,
  PaymentMethod,
  PaymentStatus,
} from "./types";

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
const STATUS_WEIGHTS: Record<PaymentStatus, number> = {
  Succeeded: 5,
  Pending: 1,
  Failed: 1,
  Refunded: 1,
  Canceled: 1,
  Blocked: 1,
};
const METHOD_WEIGHTS: Record<PaymentMethod, number> = { Card: 4, ACH: 1, Wallet: 1 };
const CURRENCY_WEIGHTS: Record<PaymentCurrency, number> = {
  USD: 3,
  EUR: 1,
  GBP: 1,
  CAD: 1,
  BRL: 1,
};
const brands: CardBrand[] = ["Visa", "Mastercard", "Amex"];

function weightedChoices<T extends string>(choices: readonly T[], weights: Record<T, number>): T[] {
  return choices.flatMap((choice) => Array.from({ length: weights[choice] }, () => choice));
}
const statuses = weightedChoices(PAYMENT_STATUSES, STATUS_WEIGHTS);
const methods = weightedChoices(PAYMENT_METHODS, METHOD_WEIGHTS);
const currencies = weightedChoices(PAYMENT_CURRENCIES, CURRENCY_WEIGHTS);
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

function chooseBrand(method: PaymentMethod, random: (max: number) => number): PaymentBrand {
  if (method === "Card") return brands[random(brands.length)];
  if (method === "Wallet") return "Apple Pay";
  return "US bank account";
}

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
    const brand = chooseBrand(method, random);
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
