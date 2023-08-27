import { cloneElement, isValidElement, forwardRef, ReactNode } from "react";
import cn from "classnames";
import { AriaTextFieldProps, mergeProps, useFocusRing } from "react-aria";
import { useTextField } from "react-aria";

import { useDOMRef } from "../../utils/useDomRef";

import styles from "./Input.module.css";

type OverlayFunc<P> = (props: P) => React.ReactElement<P>;

type TSize = "medium" | "large" | "small";

export interface InputNative
  extends Omit<AriaTextFieldProps, "prefix" | "size"> {
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: TSize;
  active?: boolean;
  error?: boolean;
  label?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

type RenderProps = {
  renderInput?:
    | React.Component<Omit<InputNative, "onChange">>
    | React.FC<Omit<InputNative, "onChange">>
    | OverlayFunc<Omit<InputNative, "onChange">>;
};

export type InputProps = InputNative & RenderProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      className,
      prefix,
      disabled,
      renderInput,
      active,
      suffix,
      error,
      label = "Input",
      size = "medium",
      required,
      readOnly,
      ...props
    },
    refForwarded
  ) => {
    const ref = useDOMRef(refForwarded);
    const {
      inputProps: { onChange: onTextFieldChange, ...inputProps },
    } = useTextField(
      {
        ...props,
        value: value,
        isDisabled: disabled,
        isReadOnly: readOnly,
        isRequired: required,
        "aria-label": label,
      },
      ref
    );

    const { focusProps, isFocusVisible } = useFocusRing();

    const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
      onTextFieldChange?.(e);
    };

    const inputClasses = cn(styles["input__control"], {
      [styles["input__control_space_r"]]: !!prefix,
      [styles["input__control_space_l"]]: !!suffix,

      [styles["input__control_size_medium"]]: size === "medium",
      [styles["input__control_size_large"]]: size === "large",
      [styles["input__control_size_small"]]: size === "small",
      [styles["input__control_readonly"]]: readOnly,
      [styles["input__control_disabled"]]: disabled,
    });

    const renderInputOverlay = () => {
      const propsOverlay = {
        value,
        prefix,
        suffix,
        disabled,
        size,
        onChange: handleChange,
        className: inputClasses,
        ...focusProps,
        ...props,
        ref,
      };
      if (typeof renderInput === "function") {
        return renderInput(propsOverlay);
      }

      if (isValidElement(renderInput)) {
        return cloneElement(renderInput, propsOverlay);
      }

      return null;
    };

    const ariaProps = mergeProps(inputProps, focusProps);

    const isError = error;

    return (
      <div
        ref={ref}
        className={cn(
          styles["input"],
          {
            [styles["input_error"]]: isError,
            [styles["input_disabled"]]: disabled,
            [styles["input_focus"]]: isFocusVisible || active,
          },
          className
        )}
        aria-disabled={disabled}
      >
        {prefix && (
          <div className={styles["input__affix_space_left"]}>
            <div className={styles["input__affix"]}>{prefix}</div>
          </div>
        )}
        {!renderInput ? (
          <input
            {...ariaProps}
            {...props}
            readOnly={readOnly}
            onChange={handleChange}
            className={inputClasses}
            disabled={disabled}
          />
        ) : (
          renderInputOverlay()
        )}

        {suffix && (
          <div className={styles["input__affix_space_right"]}>
            <div className={styles["input__affix"]}>{suffix}</div>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
