import type { PaymentFilters, SortKey, SortRule } from "@/features/payments/utils/query-payments";
import { FilterPopover } from "./filter-popover";
import { PaymentsFilterOptions } from "./payments-filter-options";

type PaymentsFiltersProps = {
  filters: PaymentFilters;
  hasActiveFilters: boolean;
  updateFilter: <K extends keyof PaymentFilters>(key: K, value: PaymentFilters[K]) => void;
  resetFilters: () => void;
  changeSort: (key: SortKey) => void;
  sort: SortRule[];
};

export function PaymentsFilters({
  filters,
  hasActiveFilters,
  updateFilter,
  resetFilters,
  changeSort,
  sort,
}: PaymentsFiltersProps) {
  return (
    <div className="filters">
      <PaymentsFilterOptions
        filters={filters}
        updateFilter={updateFilter}
        changeSort={changeSort}
        sort={sort}
      />
      <FilterPopover label="More filters" title="More filters" icon="plusCircle">
        <label className="more-search">
          Search by ID, email, or last 4
          <input
            value={filters.query}
            onChange={(event) => updateFilter("query", event.target.value)}
            placeholder="Search payments"
          />
        </label>
      </FilterPopover>
      {hasActiveFilters && (
        <button type="button" className="clear-filters" onClick={resetFilters}>
          Clear filters
        </button>
      )}
    </div>
  );
}
