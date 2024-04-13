import {
  PropsWithChildren,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { useTable } from "react-aria";
import {
  TableStateProps,
  useTableColumnResizeState,
  useTableState,
} from "react-stately";
import { CollectionChildren } from "@react-types/shared";
import { useResizeObserver } from "@react-aria/utils";

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

type GridNode<T> = any;

export interface TableProps extends TableStateProps<object> {
  a11yLabel?: string;
  className?: string;
  resize?: boolean;
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
      resize,
      ...props
    },
    refForwarded,
  ) => {
    const ref = useDOMRef(refForwarded);
    let [tableWidth, setTableWidth] = useState(0);
    const state = useTableState({
      ...props,
      selectionMode,
      selectionBehavior,
      children: children as TableStateProps<object>["children"],
      showSelectionCheckboxes:
        selectionMode === "multiple" && selectionBehavior !== "replace",
    });

    const { collection } = state;
    const { gridProps } = useTable(
      { ...props, "aria-label": a11yLabel || "table" },
      state,
      ref,
    );

    // resize
    let getDefaultWidth = useCallback((node: GridNode<object>) => {
      if (node.props.isSelectionCell) {
        return 20;
      }
      return undefined;
    }, []);

    let getDefaultMinWidth = useCallback((node: GridNode<object>) => {
      if (node.props.isSelectionCell) {
        return 20;
      }
      return 75;
    }, []);

    let layoutState = useTableColumnResizeState(
      {
        getDefaultWidth,
        getDefaultMinWidth,
        tableWidth: tableWidth,
      },
      state,
    );

    useLayoutEffect(() => {
      if (ref && ref.current) {
        setTableWidth(ref.current.clientWidth);
      }
    }, []);

    useResizeObserver({
      ref,
      onResize: () => setTableWidth(ref.current ? ref.current.clientWidth : 0),
    });

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
                      layoutState={layoutState}
                      resize={resize}
                    />
                  ),
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
                  ),
                )}
              </TableRow>
            );
          })}
        </TableRowGroup>
      </table>
    );
  },
);
