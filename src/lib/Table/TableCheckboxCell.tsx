import { useRef } from "react";
import { useTableCell, useTableSelectionCheckbox } from "react-aria";
import { FocusableElement } from "@react-types/shared";

import { Checkbox } from "../Checkbox";
import styles from "./Table.module.css";

export const TableCheckboxCell = ({ cell, state }) => {
  const ref = useRef<FocusableElement | null>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey },
    state,
  );
  return (
    <td
      {...gridCellProps}
      className={styles["table__table-data"]}
      ref={ref as any}
    >
      <div>
        <Checkbox
          {...checkboxProps}
          aria-label="checkbox"
          className={styles["table__checkbox"]}
        />
      </div>
    </td>
  );
};
