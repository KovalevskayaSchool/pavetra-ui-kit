import { PropsWithChildren, forwardRef } from "react";
import { useTableHeaderRow } from "react-aria";
import { Node, TableState } from "react-stately";
import { useDOMRef } from "../../utils/useDomRef";

interface TableHeaderRowProps {
  state: TableState<object>;
  item: Node<object>;
}

export const TableHeaderRow = forwardRef<
  HTMLTableRowElement,
  PropsWithChildren<TableHeaderRowProps>
>(({ item, state, children }, refForwarded) => {
  const ref = useDOMRef(refForwarded);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} ref={ref}>
      {children}
    </tr>
  );
});
