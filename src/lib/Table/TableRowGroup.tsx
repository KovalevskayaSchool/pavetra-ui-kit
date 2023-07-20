import { useTableRowGroup } from 'react-aria';

import styles from "./Table.module.css";

export const TableRowGroup = ({ children, type: Element }) => {
  const { rowGroupProps } = useTableRowGroup();
  return (
    <Element
      {...rowGroupProps}
      className={styles['table__thead']}
    >
      {children}
    </Element>
  );
}