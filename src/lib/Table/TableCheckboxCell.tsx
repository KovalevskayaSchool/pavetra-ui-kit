import { useRef } from "react";
import { useTableCell, useTableSelectionCheckbox } from "react-aria";
import { FocusableElement } from "@react-types/shared";

import { Checkbox } from "../Checkbox";

export const TableCheckboxCell = ({ cell, state }) => {
  const ref = useRef<FocusableElement | null>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey },
    state
  );
  return (
    <td {...gridCellProps} className="ks-table__table-data" ref={ref as any}>
      <Checkbox {...checkboxProps} className="ks-table__checkbox" />
    </td>
  );
};
