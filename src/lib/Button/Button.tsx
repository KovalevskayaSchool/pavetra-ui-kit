import React, { forwardRef, isValidElement, PropsWithChildren } from 'react';

import { Spin } from '../Spin';

import { Button as Base, BaseProps } from './ButtonBase';
import './Button.css';

export interface ButtonProps extends BaseProps {
  loading?: boolean;
  component?: string | React.ElementType;
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      children,
      rounded = false,
      loading,
      icon,
      component = Base,
      className,
      ...props
    },
    ref
  ) => {
    const renderIcon = () => {
      if (isValidElement(icon) || loading) {
        return (
          <div className="ks-button__icon">
            {loading ? <Spin className="ks-button__spin" /> : icon}
          </div>
        );
      }
      return null;
    };

    return (
      <Base
        ref={ref}
        {...props}
        rounded={rounded}
        icon={!!icon && React.Children.count(children) === 0}
        className={className}
        aria-busy={loading}
      >
        <div
          className='ks-button__container'
        >
          {renderIcon()}
          {children}
        </div>
      </Base>
    );
  }
);

Button.displayName = 'Button';
