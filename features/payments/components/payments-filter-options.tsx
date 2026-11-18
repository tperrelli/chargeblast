import { PAYMENT_CURRENCIES, PAYMENT_METHODS, PAYMENT_STATUSES } from "@/features/payments/types";
import type { PaymentFilters, SortKey, SortRule } from "@/features/payments/utils/query-payments";
import { toggleItem } from "@/features/payments/utils/selection";
import { FilterPopover } from "./filter-popover";
import { StatusBadge } from "./payments-badges";
import { PaymentDateFilter } from "./payment-date-filter";
import { PaymentAmountFilter } from "./payment-amount-filter";

type FilterOptionsProps = {
  filters: PaymentFilters;
  updateFilter: <K extends keyof PaymentFilters>(key: K, value: PaymentFilters[K]) => void;
  changeSort: (key: SortKey) => void;
  sort: SortRule[];
};

export function PaymentsFilterOptions({
  filters,
  updateFilter,
  changeSort,
  sort,
}: FilterOptionsProps) {
  const statusSort = sort.find((rule) => rule.key === "status");
  return (
    <>
      <PaymentDateFilter filters={filters} updateFilter={updateFilter} />
      <PaymentAmountFilter filters={filters} updateFilter={updateFilter} />
      <FilterPopover
        label={filters.currencies.length ? `Currency (${filters.currencies.length})` : "Currency"}
        title="Currency"
        icon="plusCircle"
      >
        {PAYMENT_CURRENCIES.map((currency) => (
          <label className="check-option" key={currency}>
            <input
              type="checkbox"
              checked={filters.currencies.includes(currency)}
              onChange={() => updateFilter("currencies", toggleItem(filters.currencies, currency))}
            />
            {currency}
          </label>
        ))}
      </FilterPopover>
      <FilterPopover
        label={filters.statuses.length ? `Status (${filters.statuses.length})` : "Status"}
        title="Status"
        icon="plusCircle"
      >
        {PAYMENT_STATUSES.map((status) => (
          <label className="check-option" key={status}>
            <input
              type="checkbox"
              checked={filters.statuses.includes(status)}
              onChange={() => updateFilter("statuses", toggleItem(filters.statuses, status))}
            />
            <StatusBadge status={status} />
          </label>
        ))}
        <button className="popover-action" type="button" onClick={() => changeSort("status")}>
          Sort by status: {statusSort?.direction ?? "off"}
        </button>
      </FilterPopover>
      <FilterPopover
        label={
          filters.methods.length ? `Payment method (${filters.methods.length})` : "Payment method"
        }
        title="Payment method"
        icon="plusCircle"
      >
        {PAYMENT_METHODS.map((method) => (
          <label className="check-option" key={method}>
            <input
              type="checkbox"
              checked={filters.methods.includes(method)}
              onChange={() => updateFilter("methods", toggleItem(filters.methods, method))}
            />
            {method}
          </label>
        ))}
      </FilterPopover>
    </>
  );
}
