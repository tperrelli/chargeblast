import type { Payment, PaymentMethod, PaymentStatus } from "@/features/payments/types";
import { Icon } from "@/components/icons";

const STATUS_CONFIG: Record<PaymentStatus, { symbol: string; className: string }> = {
  Succeeded: { symbol: "✓", className: "status-succeeded" },
  Pending: { symbol: "◷", className: "status-pending" },
  Failed: { symbol: "×", className: "status-failed" },
  Refunded: { symbol: "↩", className: "status-refunded" },
  Canceled: { symbol: "×", className: "status-canceled" },
  Blocked: { symbol: "⊖", className: "status-blocked" },
};
const METHOD_ICON: Record<Exclude<PaymentMethod, "Card">, "bank" | "wallet"> = {
  ACH: "bank",
  Wallet: "wallet",
};

type StatusBadgeProps = { status: PaymentStatus };
export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`status ${config.className}`}>
      {status}
      <span aria-hidden="true">{config.symbol}</span>
    </span>
  );
}

type PaymentMethodBadgeProps = { payment: Payment; compact?: boolean };
export function PaymentMethodBadge({ payment, compact = false }: PaymentMethodBadgeProps) {
  return (
    <div className="method">
      {compact && payment.viaLink && (
        <span className="link-mark" aria-label="Link">
          <span aria-hidden="true">➜</span>
        </span>
      )}
      {payment.method === "Card" ? (
        <span className={`brand brand-${payment.brand.toLowerCase()}`}>{payment.brand}</span>
      ) : (
        <span
          className={`method-icon ${payment.method === "Wallet" && compact ? "wallet-icon" : ""}`}
        >
          {payment.method === "Wallet" && compact ? (
            "Pay"
          ) : (
            <Icon name={METHOD_ICON[payment.method]} size={15} />
          )}
        </span>
      )}
      <span>
        {!compact && <>{payment.brand} </>}
        <span className="method-digits">•••• {payment.last4}</span>
      </span>
    </div>
  );
}
