import { forwardRef, useRef } from "react";
import cn from "classnames";
import { Time } from "@internationalized/date";
import { useTimeFieldState } from "react-stately";
import { AriaTimeFieldProps, useTimeField } from "react-aria";
import { ClockOutline } from "@symblight/pavetra-icons";
import ru from "date-fns/locale/ru";
import { Locale } from "date-fns";
import { Input } from "../Input/Input";

import { useDOMRef } from "../../utils/useDomRef";
import { DateSegmentTimeField } from "./TimeFieldSegment";

import styles from "./TimeField.module.css";

type TSize = "medium" | "large" | "small";

export interface TimeFieldProps
  extends Omit<AriaTimeFieldProps<Time>, "locale"> {
  className?: string;
  error?: string | boolean;
  locale?: Locale;
  size?: TSize;
}

export const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>(
  ({ className, size, locale = ru, ...props }, ref) => {
    const pickerRef = useDOMRef(ref);
    const inputRef = useRef(null);

    let timeFieldState = useTimeFieldState({
      ...props,
      errorMessage: props.error || props.errorMessage,
      locale: locale.code as string,
    });
    let { fieldProps, inputProps } = useTimeField(
      { ...props },
      timeFieldState,
      pickerRef
    );

    return (
      <div ref={pickerRef} className={styles["time-picker"]}>
        <Input
          ref={inputRef}
          type={inputProps.type}
          name={inputProps.name}
          value={inputProps.value?.toString()}
          disabled={props.isDisabled}
          error={!!props.error}
          suffix={<ClockOutline />}
          size={size}
          renderInput={({ className, ref: innerRef }) => (
            <div
              {...fieldProps}
              ref={innerRef}
              className={cn(styles["time-picker__input"], className)}
            >
              {timeFieldState.segments.map((segment, i) => (
                <DateSegmentTimeField
                  key={i}
                  segment={segment}
                  state={timeFieldState}
                />
              ))}
              {timeFieldState.validationState === "invalid" && (
                <span aria-hidden="true">🚫</span>
              )}
            </div>
          )}
        />
      </div>
    );
  }
);

TimeField.displayName = "TimeField";
