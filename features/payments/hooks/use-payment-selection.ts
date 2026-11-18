import { useState } from "react";
import type { Payment } from "../types";
import { paymentsForExport, selectPage, selectPayment } from "../utils/selection";

export function usePaymentSelection(visiblePayments: Payment[], filteredPayments: Payment[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function updateSelection(id: string, selected: boolean) {
    setSelectedIds((ids) => selectPayment(ids, id, selected));
  }
  function updatePageSelection(selected: boolean) {
    const pageIds = visiblePayments.map((payment) => payment.id);
    setSelectedIds((ids) => selectPage(ids, pageIds, selected));
  }
  function clearSelection() {
    setSelectedIds([]);
  }

  return {
    selectedIds,
    exportRows: paymentsForExport(filteredPayments, selectedIds),
    updateSelection,
    updatePageSelection,
    clearSelection,
  };
}
