import React, { forwardRef, isValidElement, PropsWithChildren } from 'react';
import cn from 'classnames';

import { Spin } from '../Spin';

import { Button as Base, BaseProps } from './ButtonBase';
// @ts-ignore
import styles from './Button.css';

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
      if (isValidElement(icon)) {
        if (children) {
          return !loading ? (
            <div className="ks-button__icon">
              <div className="ks-button-icon__container">
                <div className="ks-button-icon__inner">
                  <div className="ks-button-icon__wrap-right ks-button__icon-layout">
                    <div className="ks-button__spacer"></div>
                    {icon}
                  </div>
                </div>
              </div>
            </div>
          ) : null;
        }
        return (
          <div className="ks-button-icon__wrap">
            {loading ? <Spin className="ks-button__spin" /> : icon}
          </div>
        );
      }

      if (loading) {
        return (
          <div className="ks-button__icon ks-button--loading">
            <div className="ks-button-icon__container">
              <div className="ks-button-icon__inner">
                <div className="ks-button-icon__wrap ks-button-icon__wrap-right ks-button__icon-layout">
                  <div className="ks-button__spacer"></div>
                  <Spin className="ks-button__spin" />
                </div>
              </div>
            </div>
          </div>
        );
      }
      return null;
    };

    const renderChildren = () => {
      if (children) {
        return (
          <div className="ks-button__container">
            <div
              className={cn('ks-button__content', {
                ['ks-button__content-with-icon']: !!icon,
                ['ks-button__content-with-loading']: loading,
              })}
            >
              {children}
            </div>
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
        {renderIcon()}
        {renderChildren()}
      </Base>
    );
  }
);

Button.displayName = 'Button';
