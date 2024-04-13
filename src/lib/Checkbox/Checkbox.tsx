import React, { forwardRef, isValidElement } from "react";
import { useToggleState } from "react-stately";
import {
  useCheckbox,
  AriaCheckboxProps,
  useFocusRing,
  mergeProps,
} from "react-aria";

import cn from "classnames";
import { useDOMRef } from "../../utils/useDomRef";
import styles from "./Checkbox.module.css";

interface Props extends AriaCheckboxProps {
  label?: string | React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export type CheckboxProps = Props;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, disabled, onChange, ...props }, refForwarded) => {
    const state = useToggleState({
      ...props,
      onChange,
    });

    const { focusProps, isFocusVisible } = useFocusRing();
    const ref = useDOMRef(refForwarded);

    const { inputProps } = useCheckbox(
      {
        ...props,
        isDisabled: disabled,
        "aria-label":
          props["aria-label"] ||
          (!isValidElement(label) ? label?.toString() : ""),
      },
      state,
      ref,
    );

    return (
      <label
        className={cn(
          styles["checkbox"],
          {
            [styles["checkbox_disabled"]]: disabled,
          },
          className,
        )}
        {...focusProps}
      >
        <input
          ref={ref}
          className={cn(styles["checkbox__input"], {
            [styles["checkbox__input_checked"]]: state.isSelected,
            [styles["checkbox__input_focus"]]: isFocusVisible,
            [styles["checkbox__input_disabled"]]: disabled,
          })}
          {...mergeProps(inputProps)}
        />

        <span className={styles["checkbox__label"]}>{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
