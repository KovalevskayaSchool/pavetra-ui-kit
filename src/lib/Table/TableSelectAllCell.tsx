import { useRef } from "react";
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
  VisuallyHidden,
} from "react-aria";
import { Checkbox } from "../Checkbox";

import styles from "./Table.module.css";

export const TableSelectAllCell = ({ column, state }) => {
  const ref = useRef<HTMLTableCellElement | null>(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  const { checkboxProps } = useTableSelectAllCheckbox(state);

  return (
    <th
      {...columnHeaderProps}
      ref={ref}
      className={styles["table__header-row"]}
    >
      {state.selectionManager.selectionMode === "single" ? (
        <VisuallyHidden>{checkboxProps["aria-label"]}</VisuallyHidden>
      ) : (
        <Checkbox {...checkboxProps} aria-label="all" />
      )}
    </th>
  );
};
