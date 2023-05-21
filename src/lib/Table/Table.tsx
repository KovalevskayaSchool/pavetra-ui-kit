import { forwardRef } from "react";
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
import { Card } from "../Card";
import { Pagination } from "../Pagination";
import "./Table.css";

export interface TableProps extends TableStateProps<object> {
  dataSource?: any[];
  columns?: any[];
  pagination?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ dataSource, columns, pagination, ...props }, refForwarded) => {
    const ref = useDOMRef(refForwarded);

    return (
      <Card>
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
              <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>
            )}
          </TableBody>
        </TableBase>
        {pagination && <Pagination total={50} current={1}/>}
      </Card>
    );
  }
);
