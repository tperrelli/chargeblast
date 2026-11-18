"use client";

import { usePaymentsFilters } from "@/features/payments/hooks/use-payments-filters";
import { usePaymentColumns } from "@/features/payments/hooks/use-payment-columns";
import { usePaymentSelection } from "@/features/payments/hooks/use-payment-selection";
import type { Payment } from "@/features/payments/types";
import type { PaymentFilters } from "@/features/payments/utils/query-payments";
import { Icon } from "@/components/icons";
import { PaymentsActions } from "./payments-actions";
import { PaymentsFilters } from "./payments-filters";
import { PaymentsPagination } from "./payments-pagination";
import { PaymentsTable } from "./payments-table";

type PaymentsViewProps = { payments: Payment[]; initialTimestamp: number };
export function PaymentsView({ payments, initialTimestamp }: PaymentsViewProps) {
  const {
    state,
    filteredPayments,
    pagination,
    hasActiveFilters,
    updateFilter,
    resetFilters,
    changeSort,
    changePage,
    changePageSize,
  } = usePaymentsFilters(payments, initialTimestamp);
  const { columns, toggleColumn } = usePaymentColumns();
  const { selectedIds, exportRows, updateSelection, updatePageSelection, clearSelection } =
    usePaymentSelection(pagination.visiblePayments, filteredPayments);
  function updateAndClear<K extends keyof PaymentFilters>(key: K, value: PaymentFilters[K]) {
    clearSelection();
    updateFilter(key, value);
  }
  function resetAndClear() {
    clearSelection();
    resetFilters();
  }
  return (
    <section className="payments-section" aria-label="Payments">
      <div className="toolbar">
        <PaymentsFilters
          filters={state.filters}
          hasActiveFilters={hasActiveFilters}
          updateFilter={updateAndClear}
          resetFilters={resetAndClear}
          changeSort={changeSort}
          sort={state.sort}
        />
        {selectedIds.length > 0 && (
          <span className="selected-count">{selectedIds.length} selected</span>
        )}
        <PaymentsActions payments={exportRows} columns={columns} onColumnToggle={toggleColumn} />
      </div>
      <PaymentsTable
        payments={pagination.visiblePayments}
        sort={state.sort}
        onSort={changeSort}
        initialTimestamp={initialTimestamp}
        columns={columns}
        selectedIds={selectedIds}
        onSelect={updateSelection}
        onSelectPage={updatePageSelection}
      />
      {filteredPayments.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <Icon name="search" size={20} />
          </div>
          <strong>No payments found</strong>
          <p>Try adjusting your search or filters to find what you&apos;re looking for.</p>
          <button className="button" type="button" onClick={resetAndClear}>
            Clear filters
          </button>
        </div>
      )}
      <PaymentsPagination
        total={filteredPayments.length}
        firstIndex={pagination.firstIndex}
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        pageSize={state.pageSize}
        onPageChange={changePage}
        onPageSizeChange={changePageSize}
      />
      <p className="table-hint">
        Click Amount or Date to sort; use the Status filter to sort by status. Select multiple sorts
        to set priorities. Dates shown in UTC.
      </p>
    </section>
  );
}
