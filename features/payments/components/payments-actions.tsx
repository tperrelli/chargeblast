import type { Payment } from "@/features/payments/types";
import {
  COLUMN_LABELS,
  OPTIONAL_COLUMNS,
  type OptionalColumn,
} from "@/features/payments/utils/columns";
import { paymentsCsv } from "@/features/payments/utils/export-payments";
import { FilterPopover } from "./filter-popover";
import { Icon } from "@/components/icons";

type PaymentsActionsProps = {
  payments: Payment[];
  columns: OptionalColumn[];
  onColumnToggle: (column: OptionalColumn) => void;
};
export function PaymentsActions({ payments, columns, onColumnToggle }: PaymentsActionsProps) {
  function exportPayments() {
    const blob = new Blob([paymentsCsv(payments)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "payments.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="table-actions">
      <button
        className="button"
        type="button"
        onClick={exportPayments}
        disabled={payments.length === 0}
      >
        <Icon name="export" size={15} />
        Export
      </button>
      <FilterPopover
        label="Edit columns"
        title="Edit columns"
        icon="settings"
        variant="button"
        align="end"
      >
        {OPTIONAL_COLUMNS.map((column) => (
          <label className="check-option" key={column}>
            <input
              type="checkbox"
              checked={columns.includes(column)}
              onChange={() => onColumnToggle(column)}
            />
            {COLUMN_LABELS[column]}
          </label>
        ))}
      </FilterPopover>
    </div>
  );
}
