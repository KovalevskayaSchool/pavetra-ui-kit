import { forwardRef, PropsWithChildren, Ref } from 'react';
import cn from 'classnames';
import './Card.css';

export interface CardProps {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  title?: React.ReactNode | string;
  icon?: React.ReactNode
  action?: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, PropsWithChildren<CardProps>>(
  ({ className, children, title, icon, action, ...props }, ref) => (
    <div ref={ref} {...props} className={cn(className, 'ks-card')}>
      {title && (
        <div className='ks-card__header'>
          <div className='ks-card__wrap-title'>
            {icon && <div className='ks-card__icon'>{icon}</div>}
            <span className='ks-card__title'>{title}</span>
          </div>
          {action}
        </div>
      )}
      <div className='ks-card__body'>{children}</div>
    </div>
  )
);

Card.displayName = 'Card';
