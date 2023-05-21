import { useTableRowGroup } from 'react-aria';

export const TableRowGroup = ({ children, type: Element }) => {
  const { rowGroupProps } = useTableRowGroup();
  return (
    <Element
      {...rowGroupProps}
      className='ks-table__thead'
    >
      {children}
    </Element>
  );
}