import { useState } from "react";
import { OPTIONAL_COLUMNS, type OptionalColumn } from "../utils/columns";
import { toggleItem } from "../utils/selection";

export function usePaymentColumns() {
  const [columns, setColumns] = useState<OptionalColumn[]>([...OPTIONAL_COLUMNS]);

  function toggleColumn(column: OptionalColumn) {
    setColumns((current) => toggleItem(current, column));
  }

  return { columns, toggleColumn };
}
