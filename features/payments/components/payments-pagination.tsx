import { Icon } from "@/components/icons";

const PAGE_SIZES = [25, 50, 100];
type PaymentsPaginationProps = {
  total: number;
  firstIndex: number;
  page: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};
export function PaymentsPagination({
  total,
  firstIndex,
  page,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaymentsPaginationProps) {
  return (
    <div className="table-footer">
      <span>
        {total === 0 ? 0 : firstIndex + 1}–{Math.min(firstIndex + pageSize, total)} of{" "}
        {total.toLocaleString("en-US")} results
      </span>
      <div className="pagination">
        <label>
          Rows per page{" "}
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          className="page-button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <Icon name="chevronLeft" />
        </button>
        <button
          type="button"
          className="page-button"
          aria-label="Next page"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <Icon name="chevronRight" />
        </button>
      </div>
    </div>
  );
}
