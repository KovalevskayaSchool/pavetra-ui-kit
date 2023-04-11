import { forwardRef, PropsWithChildren, ButtonHTMLAttributes } from 'react';

import { AriaButtonProps } from 'react-aria';
import cn from 'classnames';
import { useDOMRef } from '../../utils/useDomRef';

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
        ['ks-button--rounded']: rounded,
        ['ks-button-with-icon']: icon,
        /* SIZE */
        ['ks-button--large']: size === 'large',
        ['ks-button--medium']: size === 'medium',
        ['ks-button--small']: size === 'small',
        /* VARIANTS */
        ['ks-button--primary']: variant === 'primary',
        ['ks-button--secondary']: variant === 'secondary',
        ['ks-button--inline']: variant === 'inline',
        ['ks-button--ghost']: variant === 'ghost',
        ['ks-button--link']: variant === 'link',
        /* DISABLED */
        ['ks-button--disabled']: props.disabled,
      },
      {
        ['ks-button--danger']: danger,
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
