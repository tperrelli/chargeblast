import type { PaymentFilters, Period } from "@/features/payments/utils/query-payments";
import { FilterPopover } from "./filter-popover";

const PERIODS: Period[] = ["All time", "Today", "7 days", "30 days", "Custom"];
type FilterProps = {
  filters: PaymentFilters;
  updateFilter: <K extends keyof PaymentFilters>(key: K, value: PaymentFilters[K]) => void;
};

export function PaymentDateFilter({ filters, updateFilter }: FilterProps) {
  return (
    <FilterPopover
      label={filters.period === "All time" ? "Date and time" : filters.period}
      title="Date created"
      note="UTC"
      icon="plusCircle"
    >
      {PERIODS.map((period) => (
        <label className="check-option" key={period}>
          <input
            type="radio"
            name="period"
            checked={filters.period === period}
            onChange={() => updateFilter("period", period)}
          />
          {period}
        </label>
      ))}
      {filters.period === "Custom" && (
        <div className="date-fields">
          <label>
            From
            <input
              type="date"
              value={filters.from}
              max={filters.to || undefined}
              onChange={(event) => updateFilter("from", event.target.value)}
            />
          </label>
          <label>
            To
            <input
              type="date"
              value={filters.to}
              min={filters.from || undefined}
              onChange={(event) => updateFilter("to", event.target.value)}
            />
          </label>
        </div>
      )}
    </FilterPopover>
  );
}
