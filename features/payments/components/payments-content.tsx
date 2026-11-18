import { payments } from "@/features/payments/mock-payments";
import { getRequestTimestamp } from "@/lib/request-time";
import { PaymentsView } from "./payments-view";

export async function PaymentsContent() {
  const initialTimestamp = await getRequestTimestamp();
  return <PaymentsView payments={payments} initialTimestamp={initialTimestamp} />;
}
