import { FC, useRef } from 'react';
import cn from 'classnames';
import { useSeparator } from 'react-aria';

import styles from './ListBox.module.css'

export interface MenuItemProps {
  className?: string;
}

export const SeperatorItem: FC<MenuItemProps> = ({ className, ...props }) => {
  const ref = useRef<HTMLLIElement | null>(null);

  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  return (
    <li
      ref={ref}
      {...props}
      {...separatorProps}
      className={cn(className, styles["listbox__seperator"])}
    />
  );
};
