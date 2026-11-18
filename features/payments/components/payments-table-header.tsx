import { useEffect, useRef } from "react";
import type { Payment } from "@/features/payments/types";
import type { OptionalColumn } from "@/features/payments/utils/columns";
import type { SortKey, SortRule } from "@/features/payments/utils/query-payments";

type SortButtonProps = {
  label: string;
  sortKey: SortKey;
  rules: SortRule[];
  onSort: (key: SortKey) => void;
};
function SortButton({ label, sortKey, rules, onSort }: SortButtonProps) {
  const index = rules.findIndex((rule) => rule.key === sortKey);
  const rule = rules[index];
  const description = rule
    ? `Sorted ${rule.direction === "asc" ? "ascending" : "descending"}, priority ${index + 1}`
    : "Not sorted";
  return (
    <button
      type="button"
      className="sort-button"
      onClick={() => onSort(sortKey)}
      title={description}
      aria-label={`Sort by ${label}. ${description}`}
    >
      {label}{" "}
      {rule && (
        <span className="sort-active">
          {rule.direction === "asc" ? "↑" : "↓"}
          {index + 1}
        </span>
      )}
    </button>
  );
}

type PaymentsTableHeaderProps = {
  payments: Payment[];
  sort: SortRule[];
  onSort: (key: SortKey) => void;
  columns: OptionalColumn[];
  selectedIds: string[];
  onSelectPage: (selected: boolean) => void;
};

export function PaymentsTableHeader({
  payments,
  sort,
  onSort,
  columns,
  selectedIds,
  onSelectPage,
}: PaymentsTableHeaderProps) {
  const checkbox = useRef<HTMLInputElement>(null);
  const selectedCount = payments.filter((payment) => selectedIds.includes(payment.id)).length;
  const allSelected = payments.length > 0 && selectedCount === payments.length;
  useEffect(() => {
    if (checkbox.current) checkbox.current.indeterminate = selectedCount > 0 && !allSelected;
  }, [selectedCount, allSelected]);
  return (
    <thead>
      <tr>
        <th className="select-column" scope="col">
          <input
            ref={checkbox}
            type="checkbox"
            checked={allSelected}
            disabled={!payments.length}
            onChange={(event) => onSelectPage(event.target.checked)}
            aria-label="Select all payments on this page"
          />
        </th>
        <th className="amount-column" scope="col">
          <SortButton label="Amount" sortKey="amount" rules={sort} onSort={onSort} />
        </th>
        <th className="method-column" scope="col">
          Payment method
        </th>
        {columns.includes("description") && (
          <th className="description-column" scope="col">
            Description
          </th>
        )}
        {columns.includes("customer") && (
          <th className="customer-column" scope="col">
            Customer
          </th>
        )}
        <th className="date-column" scope="col">
          <SortButton label="Date" sortKey="created" rules={sort} onSort={onSort} />
        </th>
        {columns.includes("refundedAt") && (
          <th className="refund-column" scope="col">
            Refunded date
          </th>
        )}
        {columns.includes("declineReason") && (
          <th className="decline-column" scope="col">
            Decline reason
          </th>
        )}
        <th className="id-column" scope="col">
          Payment ID
        </th>
        <th className="row-action" scope="col">
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );
}
