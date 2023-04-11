import { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

interface ParagraphProps {
  className?: string;
}

export const Paragraph: FC<PropsWithChildren<ParagraphProps>> = ({
  children,
  className,
  ...rest
}) => (
  <p {...rest} className={cn(className, 'ks-paragraph')}>
    {children}
  </p>
);
