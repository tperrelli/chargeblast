import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";

export default function PaymentNotFound() {
  return (
    <DashboardShell>
      <div className="detail-not-found">
        <h1>Payment not found</h1>
        <p>We couldn&apos;t find a payment with this ID.</p>
        <Link href="/" className="button">
          Back to payments
        </Link>
      </div>
    </DashboardShell>
  );
}
