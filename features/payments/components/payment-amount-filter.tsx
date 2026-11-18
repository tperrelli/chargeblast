import type { PaymentFilters } from "@/features/payments/utils/query-payments";
import { FilterPopover } from "./filter-popover";

type FilterProps = {
  filters: PaymentFilters;
  updateFilter: <K extends keyof PaymentFilters>(key: K, value: PaymentFilters[K]) => void;
};

export function PaymentAmountFilter({ filters, updateFilter }: FilterProps) {
  return (
    <FilterPopover
      label={filters.minimum || filters.maximum ? "Amount · Active" : "Amount"}
      title="Amount"
      note="Any currency"
      icon="plusCircle"
      className="amount-popover"
    >
      <div className="amount-fields">
        <label>
          Minimum
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={filters.minimum}
            onChange={(event) => updateFilter("minimum", event.target.value)}
          />
        </label>
        <label>
          Maximum
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={filters.maximum}
            onChange={(event) => updateFilter("maximum", event.target.value)}
          />
        </label>
      </div>
      <p>Amounts are compared in their original currency.</p>
    </FilterPopover>
  );
}
