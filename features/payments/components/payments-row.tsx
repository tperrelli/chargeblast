import Link from "next/link";
import type { Payment } from "@/features/payments/types";
import type { OptionalColumn } from "@/features/payments/utils/columns";
import {
  formatAmount,
  formatDate,
  formatTableDate,
  relativeDate,
} from "@/features/payments/utils/format-payments";
import { Icon } from "@/components/icons";
import { useCopyPaymentId } from "@/features/payments/hooks/use-copy-payment-id";
import { PaymentMethodBadge, StatusBadge } from "./payments-badges";
import { PaymentRowActions } from "./payment-row-actions";

const ID_PREVIEW_LENGTH = 15;
type PaymentsRowProps = {
  payment: Payment;
  initialTimestamp: number;
  columns: OptionalColumn[];
  selected: boolean;
  onSelect: (id: string, selected: boolean) => void;
};
export function PaymentsRow({
  payment,
  initialTimestamp,
  columns,
  selected,
  onSelect,
}: PaymentsRowProps) {
  const { copyId, message } = useCopyPaymentId(payment.id);
  const relative = relativeDate(payment.created, initialTimestamp);
  return (
    <tr data-selected={selected}>
      <td className="select-column">
        <input
          type="checkbox"
          checked={selected}
          onChange={(event) => onSelect(payment.id, event.target.checked)}
          aria-label={`Select payment ${payment.id}`}
        />
      </td>
      <td>
        <div className="amount-cell">
          <span className="amount">{formatAmount(payment.amount, payment.currency)}</span>
          <span className="currency">{payment.currency}</span>
          <StatusBadge status={payment.status} />
        </div>
      </td>
      <td>
        <PaymentMethodBadge payment={payment} compact />
      </td>
      {columns.includes("description") && <td>{payment.description}</td>}
      {columns.includes("customer") && <td title={payment.customer}>{payment.email}</td>}
      <td>
        <span
          className="created"
          title={relative}
          tabIndex={0}
          aria-label={`${formatDate(payment.created)} UTC, ${relative}`}
        >
          {formatTableDate(payment.created)}
        </span>
      </td>
      {columns.includes("refundedAt") && (
        <td>{payment.refundedAt ? formatTableDate(payment.refundedAt) : "—"}</td>
      )}
      {columns.includes("declineReason") && <td>{payment.declineReason ?? "—"}</td>}
      <td>
        <div className="payment-id">
          <Link
            href={`/payments/${payment.id}`}
            title={payment.id}
            aria-label={`View payment ${payment.id}`}
          >
            {payment.id.slice(0, ID_PREVIEW_LENGTH)}…
          </Link>
          <button
            className="copy-button"
            type="button"
            aria-label={`Copy payment ID ${payment.id}`}
            onClick={() => void copyId()}
          >
            <Icon name="copy" size={14} />
          </button>
          <span className="sr-only" role="status">
            {message}
          </span>
        </div>
      </td>
      <td className="row-action">
        <PaymentRowActions id={payment.id} />
      </td>
    </tr>
  );
}
