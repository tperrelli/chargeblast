import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { Icon } from "@/components/icons";
import { PaymentDetails } from "@/features/payments/components/payment-details";
import { getPaymentById, payments } from "@/features/payments/mock-payments";

export function generateStaticParams() {
  return payments.slice(0, 1).map((payment) => ({ id: payment.id }));
}

export default async function PaymentPage({ params }: PageProps<"/payments/[id]">) {
  const { id } = await params;
  const payment = getPaymentById(id);
  if (!payment) notFound();

  return (
    <DashboardShell>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Payments</Link>
        <Icon name="chevronRight" size={14} />
        <Link href="/">Transactions</Link>
        <Icon name="chevronRight" size={14} />
        <span>Payment details</span>
      </nav>
      <PaymentDetails payment={payment} />
    </DashboardShell>
  );
}
