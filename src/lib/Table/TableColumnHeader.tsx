import { PropsWithChildren, forwardRef } from "react";
import { Node, TableState } from "react-stately";
import { mergeProps, useFocusRing, useTableColumnHeader } from "react-aria";
import cn from "classnames";

import { useDOMRef } from "../../utils/useDomRef";
import styles from "./Table.module.css";

interface TableColumnHeaderProps {
  state: TableState<object>;
  column: Node<object>;
}

export const TableColumnHeader = forwardRef<
  HTMLTableCellElement,
  PropsWithChildren<TableColumnHeaderProps>
>(({ column, state }, refForwarded) => {
  const ref = useDOMRef(refForwarded);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const arrowIcon = state.sortDescriptor?.direction === "ascending" ? "▲" : "▼";

  return (
    <th
      className={styles["table__header-row"]}
      {...mergeProps(columnHeaderProps, focusProps)}
      ref={ref}
    >
      <div className={styles["table__header-row-inner"]}>
        <span className={styles["table__header-text"]}>{column.rendered}</span>
        {column.props.allowsSorting && (
          <span
            aria-hidden="true"
            className={cn(styles["table__header-sort"], {
              [styles["table__header-sort_visibility_visible"]]:
                state.sortDescriptor?.column === column.key,
            })}
          >
            {arrowIcon}
          </span>
        )}
      </div>
    </th>
  );
});
