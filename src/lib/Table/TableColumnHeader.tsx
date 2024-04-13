import { PropsWithChildren, forwardRef, useRef } from "react";
import { Node, TableState } from "react-stately";
import type { TableColumnResizeState } from "react-stately";
import {
  mergeProps,
  useFocusRing,
  useHover,
  useTableColumnHeader,
} from "react-aria";
import cn from "classnames";

import { useDOMRef } from "../../utils/useDomRef";

import { Resizer } from "./Resizer";

import styles from "./Table.module.css";

interface TableColumnHeaderProps<T> {
  state: TableState<object>;
  column: Node<object>;
  layoutState: TableColumnResizeState<T>;
  resize?: boolean;
}

export const TableColumnHeader = forwardRef<
  HTMLTableCellElement,
  PropsWithChildren<TableColumnHeaderProps<any>>
>(({ column, state, layoutState, resize }, refForwarded) => {
  const ref = useDOMRef(refForwarded);
  let resizerRef = useRef(null);
  let triggerRef = useRef(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref,
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  let { hoverProps, isHovered } = useHover({});
  const arrowIcon = state.sortDescriptor?.direction === "ascending" ? "▲" : "▼";
  let showResizer =
    (isHovered || layoutState.resizingColumn === column.key) && resize;

  return (
    <th
      className={styles["table__header-row"]}
      style={{
        width: layoutState.getColumnWidth(column.key),
      }}
      {...mergeProps(columnHeaderProps, focusProps, hoverProps)}
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
        {showResizer && (
          <Resizer
            showResizer={showResizer}
            ref={resizerRef}
            triggerRef={triggerRef}
            column={column}
            layoutState={layoutState}
          />
        )}
      </div>
    </th>
  );
});
