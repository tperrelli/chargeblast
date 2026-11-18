import type { Payment } from "@/features/payments/types";
import type { OptionalColumn } from "@/features/payments/utils/columns";
import type { SortKey, SortRule } from "@/features/payments/utils/query-payments";
import { PaymentsRow } from "./payments-row";
import { PaymentsTableHeader } from "./payments-table-header";

type PaymentsTableProps = {
  payments: Payment[];
  sort: SortRule[];
  onSort: (key: SortKey) => void;
  initialTimestamp: number;
  columns: OptionalColumn[];
  selectedIds: string[];
  onSelect: (id: string, selected: boolean) => void;
  onSelectPage: (selected: boolean) => void;
};
export function PaymentsTable({
  payments,
  sort,
  onSort,
  initialTimestamp,
  columns,
  selectedIds,
  onSelect,
  onSelectPage,
}: PaymentsTableProps) {
  return (
    <div className="table-scroll">
      <table className="payments-table">
        <PaymentsTableHeader
          payments={payments}
          sort={sort}
          onSort={onSort}
          columns={columns}
          selectedIds={selectedIds}
          onSelectPage={onSelectPage}
        />
        <tbody>
          {payments.map((payment) => (
            <PaymentsRow
              key={payment.id}
              payment={payment}
              initialTimestamp={initialTimestamp}
              columns={columns}
              selected={selectedIds.includes(payment.id)}
              onSelect={onSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
