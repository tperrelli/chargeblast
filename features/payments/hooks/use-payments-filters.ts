import { useMemo, useState } from "react";
import type { Payment } from "@/features/payments/types";
import {
  filterPayments,
  hasActiveFilters,
  INITIAL_FILTERS,
  INITIAL_TABLE_STATE,
  nextSortRules,
  paginatePayments,
  sortPayments,
  type PaymentFilters,
  type PaymentTableState,
  type SortKey,
} from "@/features/payments/utils/query-payments";

export function usePaymentsFilters(payments: Payment[], initialTimestamp: number) {
  const [state, setState] = useState<PaymentTableState>(INITIAL_TABLE_STATE);
  const filteredPayments = useMemo(() => {
    const filtered = filterPayments(payments, state.filters, initialTimestamp);
    return sortPayments(filtered, state.sort);
  }, [payments, state.filters, state.sort, initialTimestamp]);
  const pagination = paginatePayments(filteredPayments, state.page, state.pageSize);

  function updateFilter<K extends keyof PaymentFilters>(key: K, value: PaymentFilters[K]) {
    setState((previous) => ({
      ...previous,
      filters: { ...previous.filters, [key]: value },
      page: 1,
    }));
  }
  function resetFilters() {
    setState((previous) => ({ ...previous, filters: INITIAL_FILTERS, page: 1 }));
  }
  function changeSort(key: SortKey) {
    setState((previous) => ({ ...previous, sort: nextSortRules(previous.sort, key), page: 1 }));
  }
  function changePage(page: number) {
    setState((previous) => ({ ...previous, page }));
  }
  function changePageSize(pageSize: number) {
    setState((previous) => ({ ...previous, pageSize, page: 1 }));
  }
  return {
    state,
    filteredPayments,
    pagination,
    hasActiveFilters: hasActiveFilters(state.filters),
    updateFilter,
    resetFilters,
    changeSort,
    changePage,
    changePageSize,
  };
}
