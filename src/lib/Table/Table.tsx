import { forwardRef, useMemo } from "react";
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
import "./Table.css";

export interface TableProps extends TableStateProps<object> {
  dataSource?: any[];
  columns?: any[];
  pagination?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ dataSource, columns, pagination, ...props }, refForwarded) => {
    const ref = useDOMRef(refForwarded);

    const mapColumn = useMemo(
      () => columns?.reduce((map, col) => map.set(col.key, col), new Map()),
      [columns]
    );

    return (
      <Box>
        <TableBase ref={ref} {...props}>
          <TableHeader columns={columns}>
            {(column) => (
              <Column allowsSorting={column.allowsSorting}>
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
      </Box>
    );
  }
);
