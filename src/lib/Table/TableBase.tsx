import { PropsWithChildren, forwardRef } from "react";
import { useTable } from "react-aria";
import { TableStateProps, useTableState } from "react-stately";
import { CollectionChildren } from "@react-types/shared";
import cn from "classnames";

import { useDOMRef } from "../../utils/useDomRef";

import { TableRowGroup } from "./TableRowGroup";
import { TableHeaderRow } from "./TableHeaderRow";
import { TableColumnHeader } from "./TableColumnHeader";
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";
import { TableSelectAllCell } from "./TableSelectAllCell";
import { TableCheckboxCell } from "./TableCheckboxCell";

import styles from "./Table.module.css";

export interface TableProps extends TableStateProps<object> {
  a11yLabel?: string;
  className?: string;
}

export const TableBase = forwardRef<
  HTMLTableElement,
  PropsWithChildren<TableProps>
>(
  (
    {
      children,
      selectionBehavior,
      selectionMode,
      a11yLabel,
      className,
      ...props
    },
    refForwarded
  ) => {
    const ref = useDOMRef(refForwarded);
    const state = useTableState({
      ...props,
      selectionMode,
      selectionBehavior,
      children: children as CollectionChildren<object>,
      showSelectionCheckboxes:
        selectionMode === "multiple" && selectionBehavior !== "replace",
    });

    const { collection } = state;
    const { gridProps } = useTable(
      { ...props, "aria-label": a11yLabel || "table" },
      state,
      ref
    );

    return (
      <table
        {...gridProps}
        className={cn(styles["table"], className)}
        ref={ref}
      >
        <TableRowGroup type="thead">
          {collection.headerRows.map((headerRow) => {
            const headerChildNodes =
              state.collection.getChildren?.(headerRow.key) || new Set();
            return (
              <TableHeaderRow
                key={headerRow.key}
                item={headerRow}
                state={state}
              >
                {Array.from(headerChildNodes).map((column) =>
                  column.props.isSelectionCell ? (
                    <TableSelectAllCell
                      key={column.key}
                      column={column}
                      state={state}
                    />
                  ) : (
                    <TableColumnHeader
                      key={column.key}
                      column={column}
                      state={state}
                    />
                  )
                )}
              </TableHeaderRow>
            );
          })}
        </TableRowGroup>
        <TableRowGroup type="tbody">
          {[...state.collection.rows].map((row) => {
            if (row.type !== "item") return;
            const childNodes =
              state.collection.getChildren?.(row.key) || new Set();
            return (
              <TableRow key={row.key} item={row} state={state}>
                {Array.from(childNodes).map((cell) =>
                  cell.props.isSelectionCell ? (
                    <TableCheckboxCell
                      key={cell.key}
                      cell={cell}
                      state={state}
                    />
                  ) : (
                    <TableCell key={cell.key} cell={cell} state={state} />
                  )
                )}
              </TableRow>
            );
          })}
        </TableRowGroup>
      </table>
    );
  }
);
