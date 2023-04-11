import { FC, createElement, PropsWithChildren } from 'react';
import cn from 'classnames';

interface CaptionProps {
  className?: string;
  as?: string;
  target?: string;
  rel?: string;
  href?: string;
}

export const Caption: FC<PropsWithChildren<CaptionProps>> = ({
  children,
  className,
  as = 'span',
  ...rest
}) => {
  return createElement(
    as,
    {
      ...rest,
      className: cn(className, 'ks-caption'),
    },
    children
  );
};

Caption.displayName = 'Caption';
