import { PropsWithChildren, forwardRef } from "react";
import { Node, TableState } from "react-stately";
import { mergeProps, useFocusRing, useTableColumnHeader } from "react-aria";
import { useDOMRef } from "../../utils/useDomRef";

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
      className="ks-table__header-row"
      {...mergeProps(columnHeaderProps, focusProps)}
      ref={ref}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          style={{
            padding: "0 2px",
            visibility:
              state.sortDescriptor?.column === column.key
                ? "visible"
                : "hidden",
          }}
        >
          {arrowIcon}
        </span>
      )}
    </th>
  );
});
