import { forwardRef } from "react";
import { Node, TableState } from "react-stately";
import { mergeProps, useFocusRing, useTableCell } from "react-aria";
import { useDOMRef } from "../../utils/useDomRef";

interface TableCellProps {
  state: TableState<object>;
  cell: Node<object>;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ cell, state }, refForwarded) => {
    const ref = useDOMRef(refForwarded);
    let { gridCellProps } = useTableCell({ node: cell }, state, ref);
    let { isFocusVisible, focusProps } = useFocusRing();

    return (
      <td
        {...mergeProps(gridCellProps, focusProps)}
        className="ks-table__table-data"
        ref={ref}
      >
        {cell.rendered}
      </td>
    );
  }
);
