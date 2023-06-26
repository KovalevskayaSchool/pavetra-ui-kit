import { forwardRef, isValidElement, useState } from "react";
import cn from "classnames";
import { RadioGroupState } from "react-stately";
import { useRadio, useFocusRing } from "react-aria";
import type { AriaRadioProps } from "react-aria";

import { useRadioGroupContext } from "./RadioGroup";
import { useDOMRef } from "../../utils/useDomRef";
import "./Radio.css";

interface Props extends AriaRadioProps {
  label?: string | React.ReactNode;
  className?: string;
}

export type RadioProps = Props;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, isDisabled, label, className, ...restProps }, refForwarded) => {
    const [active, setActive] = useState(false);
    const ref = useDOMRef(refForwarded);

    const { focusProps, isFocusVisible } = useFocusRing();
    const radioProps = { ...restProps };
    const groupContext = useRadioGroupContext() || {};

    const { inputProps, isDisabled: disabled } = useRadio(
      {
        ...radioProps,
        value,
        isDisabled,
        "aria-label": !isValidElement(label) ? label?.toString() : "Radio",
      },
      groupContext as RadioGroupState,
      ref
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!(groupContext as RadioGroupState)?.setSelectedValue) {
        //  inputProps?.value = value;
        return;
      }
      inputProps.onChange?.(e);
    };

    function handleMouseEnter() {
      setActive(true);
    }

    function handleMouseLeave() {
      setActive(false);
    }

    return (
      <label
        className={cn("ks-radio__container", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          className={cn("ks-radio", {
            ["ks-radio_disabled"]: disabled,
            ["ks-radio_checked"]: inputProps.checked,
            ["ks-radio_focus"]: isFocusVisible,
            ["ks-radio_active"]: active,
          })}
        >
          <input
            ref={ref}
            {...inputProps}
            {...focusProps}
            className="ks-radio__control"
            checked={inputProps.checked}
            disabled={disabled}
            onChange={handleChange}
            type="radio"
            value={value}
          />
        </span>
        <span
          className={cn("ks-radio__label", {
            ["ks-radio__label_disabled"]: disabled,
          })}
        >
          {label}
        </span>
      </label>
    );
  }
);

Radio.displayName = "Radio";
