import React, { FC, forwardRef, PropsWithChildren } from 'react';

import { Title } from './Title';
import './Typography.css';

export interface OriginTypography {
  className?: string;
  component?: string;
  ariaLabel?: string;
  ref?: React.Ref<HTMLElement> | null;
}

export const Control: FC<PropsWithChildren<OriginTypography>> = forwardRef(
  ({ className, ariaLabel, component = Title, children, ...rest }, ref) => {
    const Component = component as any;

    return (
      <Component
        className={className}
        aria-label={ariaLabel}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);
