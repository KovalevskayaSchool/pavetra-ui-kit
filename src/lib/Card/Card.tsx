import { forwardRef, PropsWithChildren, Ref } from 'react';
import cn from 'classnames';
import './Card.css';

export interface CardProps {
  ref?: Ref<HTMLDivElement>;
  className?: string;
}

export const Card = forwardRef<HTMLDivElement, PropsWithChildren<CardProps>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} {...props} className={cn(className, 'ks-card')}>
      <div className={cn('ks-card__body')}>{children}</div>
    </div>
  )
);

Card.displayName = 'Card';
