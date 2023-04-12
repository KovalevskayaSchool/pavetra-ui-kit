import { forwardRef, PropsWithChildren } from 'react';
import cn from 'classnames';
import './Badge.css';;

export interface BadgeProps {
  className?: string;
  count?: number;
}

export const Badge = forwardRef<HTMLSpanElement, PropsWithChildren<BadgeProps>>(
  ({ className, count = 0, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(className, 'ks-badge')} {...props}>
        {count > 0 && (
          <sup className="ks-badge__counter">
            <span className="ks-badge__label">{count.toString()}</span>
          </sup>
        )}
        {children}
      </span>
    );
  }
);
