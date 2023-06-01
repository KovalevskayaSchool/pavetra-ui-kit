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
        ['ks-button_icon']: !!icon,
        /* SIZE */
        ['ks-button_size_large']: size === 'large',
        ['ks-button_size_medium']: size === 'medium',
        ['ks-button_size_small']: size === 'small',
        /* VARIANTS */
        ['ks-button_variant_primary']: variant === 'primary',
        ['ks-button_variant_secondary']: variant === 'secondary',
        ['ks-button_variant_inline']: variant === 'inline',
        ['ks-button_variant_ghost']: variant === 'ghost',
        ['ks-button_variant_link']: variant === 'link',
        /* DISABLED */
        ['ks-button_disabled']: props.disabled,
        /* DANGER */
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
