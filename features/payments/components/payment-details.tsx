import Link from "next/link";
import type { Payment, PaymentStatus } from "@/features/payments/types";
import { formatAmount, formatDate } from "@/features/payments/utils/format-payments";
import { Icon } from "@/components/icons";
import { PaymentMethodBadge, StatusBadge } from "./payments-badges";

const STATUS_DESCRIPTION: Record<PaymentStatus, string> = {
  Succeeded: "The payment was successful.",
  Pending: "The payment is awaiting completion.",
  Failed: "The payment did not succeed.",
  Refunded: "The payment was refunded.",
  Canceled: "The payment was canceled.",
  Blocked: "The payment was blocked.",
};

type PaymentDetailsProps = { payment: Payment };
export function PaymentDetails({ payment }: PaymentDetailsProps) {
  return (
    <article className="payment-detail">
      <Link className="back-link" href="/">
        <Icon name="chevronLeft" size={15} /> Payments
      </Link>
      <header className="detail-header">
        <div>
          <h1>
            {formatAmount(payment.amount, payment.currency)} <span>{payment.currency}</span>
          </h1>
          <p>Payment from {payment.customer}</p>
        </div>
        <StatusBadge status={payment.status} />
      </header>
      <div className="detail-grid">
        <div className="detail-primary">
          <section className="detail-card" aria-labelledby="overview-heading">
            <h2 id="overview-heading">Payment details</h2>
            <dl className="detail-list">
              <div>
                <dt>Payment ID</dt>
                <dd className="detail-id">{payment.id}</dd>
              </div>
              <div>
                <dt>Amount</dt>
                <dd>
                  {formatAmount(payment.amount, payment.currency)} {payment.currency}
                </dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <StatusBadge status={payment.status} />
                </dd>
              </div>
              <div>
                <dt>Payment method</dt>
                <dd>
                  <PaymentMethodBadge payment={payment} />
                </dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>{formatDate(payment.created)} UTC</dd>
              </div>
            </dl>
          </section>
          <section className="detail-card" aria-labelledby="activity-heading">
            <h2 id="activity-heading">Activity</h2>
            <ol className="activity-list">
              <li>
                <span className="activity-dot" />
                <div>
                  <strong>Current status: {payment.status}</strong>
                  <p>{STATUS_DESCRIPTION[payment.status]}</p>
                </div>
              </li>
              <li>
                <span className="activity-dot muted" />
                <div>
                  <strong>Payment created</strong>
                  <p>{formatDate(payment.created)} UTC</p>
                </div>
              </li>
            </ol>
          </section>
        </div>
        <aside className="detail-card customer-card" aria-labelledby="customer-heading">
          <h2 id="customer-heading">Customer</h2>
          <dl className="detail-list">
            <div>
              <dt>Name</dt>
              <dd>{payment.customer}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${payment.email}`}>{payment.email}</a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  );
}
