import { ReactNode, forwardRef, useMemo } from "react";
import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableStateProps,
} from "react-stately";
import { useDOMRef } from "../../utils/useDomRef";

import { TableBase } from "./TableBase";
import { Box } from "../Box";
import { Spin } from "../Spin";

import styles from "./Table.module.css";

export interface TableColumnDef {
  name: string;
  key: string;
  allowsSorting?: boolean;
  render?: (value: unknown, key: string) => ReactNode;
  width?: number | `${number}` | `${number}%` | null | undefined;
  allowsResizing?: boolean;
}

export interface TableProps extends TableStateProps<object> {
  dataSource: any[];
  columns: TableColumnDef[];
  pagination?: boolean;
  resize?: boolean;
  isLoading?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    { dataSource, columns, pagination, resize, isLoading, ...props },
    refForwarded,
  ) => {
    const ref = useDOMRef(refForwarded);

    const mapColumn = useMemo(
      () => columns?.reduce((map, col) => map.set(col.key, col), new Map()),
      [columns],
    );

    return (
      <Box className={styles["table__container"]}>
        <TableBase ref={ref} resize={resize} {...props}>
          <TableHeader columns={columns}>
            {(column) => (
              <Column
                allowsSorting={column.allowsSorting}
                allowsResizing={column.allowsResizing && resize}
                defaultWidth={column.width}
              >
                {column.name}
              </Column>
            )}
          </TableHeader>
          <TableBody items={dataSource}>
            {(item) => (
              <Row>
                {(columnKey) => {
                  const content = item[columnKey];

                  const col = mapColumn.get(columnKey);
                  const value = col.render?.(item, columnKey) || content;
                  return <Cell>{value}</Cell>;
                }}
              </Row>
            )}
          </TableBody>
        </TableBase>
        {isLoading && (
          <div className={styles["table__spinner"]}>
            <Spin size="large" />
          </div>
        )}
      </Box>
    );
  },
);
