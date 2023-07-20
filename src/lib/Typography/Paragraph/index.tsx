import { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from '../Typography.module.css'

interface ParagraphProps {
  className?: string;
}

export const Paragraph: FC<PropsWithChildren<ParagraphProps>> = ({
  children,
  className,
  ...rest
}) => (
  <p {...rest} className={cn(className, styles['paragraph'])}>
    {children}
  </p>
);
