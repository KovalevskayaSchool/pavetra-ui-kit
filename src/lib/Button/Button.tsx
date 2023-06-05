import {
  Children,
  forwardRef,
  PropsWithChildren,
  ButtonHTMLAttributes,
  isValidElement,
} from "react";

import { AriaButtonProps } from "react-aria";
import cn from "classnames";
import { Spin } from "../Spin";

import { useDOMRef } from "../../utils/useDomRef";
import "./Button.css";

interface BaseProps extends AriaButtonProps {
  icon?: React.ReactNode;
  rounded?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "inline" | "ghost" | "link";
  danger?: boolean;
  href?: string;
  loading?: boolean;
}

export type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      children,
      className,
      icon,
      danger = false,
      rounded,
      size = "medium",
      href,
      variant = "secondary",
      onMouseDown,
      loading,
      ...props
    },
    refButton
  ) => {
    const ref = useDOMRef(refButton);

    const onlyIcon = !!icon && Children.count(children) === 0;

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
      "ks-button",
      {
        ["ks-button_icon"]: !!onlyIcon,
        ["ks-button_rounded"]: rounded,
        /* SIZE */
        ["ks-button_size_large"]: size === "large",
        ["ks-button_size_medium"]: size === "medium",
        ["ks-button_size_small"]: size === "small",
        /* VARIANTS */
        ["ks-button_variant_primary"]: variant === "primary",
        ["ks-button_variant_secondary"]: variant === "secondary",
        ["ks-button_variant_inline"]: variant === "inline",
        ["ks-button_variant_ghost"]: variant === "ghost",
        ["ks-button_variant_link"]: variant === "link",
        /* DISABLED */
        ["ks-button_disabled"]: props.disabled,
        /* DANGER */
        ["ks-button_danger"]: danger,
      },
      className
    );

    // const { onClick: onButtonClick, ...restButtonProps } = buttonProps;
    function renderIcon() {
      if (isValidElement(icon) || loading) {
        return (
          <div className="ks-button__icon">
            {loading ? <Spin className="ks-button__spin" /> : icon}
          </div>
        );
      }
      return null;
    }

    function renderContent() {
      return (
        <span className="ks-button__content">
          {renderIcon()}
          {children}
        </span>
      );
    }

    if (href !== undefined) {
      return (
        <a
          ref={ref}
          {...(props as any)}
          href={href}
          onMouseDown={handleMouseDown}
          className={classNames}
          aria-busy={loading}
        >
          {renderContent()}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        {...props}
        aria-busy={loading}
        disabled={props.disabled}
        onMouseDown={handleMouseDown}
        className={classNames}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = "Button";
