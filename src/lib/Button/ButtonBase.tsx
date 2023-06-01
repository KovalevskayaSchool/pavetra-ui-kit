import { forwardRef, PropsWithChildren, ButtonHTMLAttributes } from 'react';

import { AriaButtonProps } from 'react-aria';
import cn from 'classnames';
import { useDOMRef } from '../../utils/useDomRef';
import './Button.css';

interface ButtonProps extends AriaButtonProps {
  icon?: React.ReactNode;
  rounded?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'inline' | 'ghost' | 'link';
  danger?: boolean;
  href?: string;
}

export type BaseProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<BaseProps>
>(
  (
    {
      children,
      className,
      icon,
      danger = false,
      rounded,
      size = 'medium',
      href,
      variant = 'secondary',
      onMouseDown,
      ...props
    },
    refButton
  ) => {
    const ref = useDOMRef(refButton);

    // const { buttonProps } = useButton(
    //   {
    //     ...props,
    //     isDisabled: props.disabled,
    //     onPress: props.onClick,
    //   },
    //   ref
    // );

    const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (navigator.userAgent.match(/safari/i)) {
        event.preventDefault();
      }

      onMouseDown?.(event);
    };

    const classNames = cn(
      'ks-button',
      {
        ['ks-button_rounded']: rounded,
        ['ks-button-with-icon']: icon,
        /* SIZE */
        ['ks-button_large']: size === 'large',
        ['ks-button_medium']: size === 'medium',
        ['ks-button_small']: size === 'small',
        /* VARIANTS */
        ['ks-button_primary']: variant === 'primary',
        ['ks-button_secondary']: variant === 'secondary',
        ['ks-button_inline']: variant === 'inline',
        ['ks-button_ghost']: variant === 'ghost',
        ['ks-button_link']: variant === 'link',
        /* DISABLED */
        ['ks-button_disabled']: props.disabled,
      },
      {
        ['ks-button_danger']: danger,
      },
      className
    );

    // const { onClick: onButtonClick, ...restButtonProps } = buttonProps;

    if (href !== undefined) {
      return (
        <a href={href} className={classNames} {...(props as any)}>
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        {...props}
        onMouseDown={handleMouseDown}
        className={classNames}
      >
        {children}
      </button>
    );
  }
);
