import { PropsWithChildren, forwardRef } from "react";
import cn from 'classnames'
import { Node, TableState } from "react-stately";
import { mergeProps, useFocusRing, useTableRow } from "react-aria";
import { useDOMRef } from "../../utils/useDomRef";

import styles from "./Table.module.css";

interface TableRowProps {
  state: TableState<object>;
  item: Node<object>;
}

export const TableRow = forwardRef<
  HTMLTableRowElement,
  PropsWithChildren<TableRowProps>
>(({ item, children, state }, refForwarded) => {
  const ref = useDOMRef(refForwarded);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { rowProps, isPressed } = useTableRow(
    {
      node: item,
    },
    state,
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <tr
      className={cn(styles["table__row"], {
        [styles['table__row_selected']]: isSelected
      })}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </tr>
  );
});
