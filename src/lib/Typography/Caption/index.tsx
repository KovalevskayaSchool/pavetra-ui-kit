import { createElement, PropsWithChildren } from 'react';
import cn from 'classnames';

interface CaptionProps {
  className?: string;
  as?: string;
  target?: string;
  rel?: string;
  href?: string;
}

export function Caption({
  children,
  className,
  as = 'span',
  ...rest
}: PropsWithChildren<CaptionProps>) {
  return createElement(
    as,
    {
      ...rest,
      className: cn('ks-caption', className),
    },
    children
  );
};

Caption.displayName = 'Caption';
