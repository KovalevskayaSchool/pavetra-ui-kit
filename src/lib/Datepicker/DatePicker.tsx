import { useState, forwardRef, useEffect, useMemo } from "react";
import { useButton, useDatePicker } from "react-aria";
import { useDatePickerState } from "react-stately";
import cn from "classnames";
import { Locale } from "date-fns/types";
import format from "date-fns/format";
import {
  ChevronDownOutline,
  CloseOutline,
} from "@symblight/pavetra-icons";

import type { PickerType, DatePickerEvent, PickerDay } from "./DatePicker.d";
import { Input } from "../Input";
import { Button } from "../Button";
import { Popover } from "../Popover";
import { DatePickerBase } from "./DatePickerBase";
import { useDOMRef } from "../../utils/useDomRef";
import { useControlled } from "../../utils/useControlled";
import { DatePickerContext as DatePickerCtx } from "./useDatePickerCtx";
import styles from "./DatePicker.module.css";

export interface DatePickerProps {
  type?: PickerType;
  date?: Date;
  locale?: Locale;
  inline?: boolean;
  events?: DatePickerEvent[];
  disableDate?: ((date: Date) => boolean) | undefined;
  renderCell?: (date: Date, dayOfMonth: string) => void;
  className?: string;
  value?: Date | null | undefined;
  defaultValue?: Date;
  allowClear?: boolean;
  open?: boolean;
  onChange?: (day: PickerDay) => void;
  dateFormat?: string;
  disabled?: boolean;
  error?: boolean | string | null;
  a11yLabel?: string;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      allowClear,
      open,
      events = [],
      value,
      defaultValue,
      locale,
      inline = false,
      disabled,
      onChange,
      dateFormat = "yyyy-MM-dd",
      a11yLabel,
      error,
      ...props
    },
    ref
  ) => {
    const [type, setType] = useState<PickerType>("week");
    const [date, setDate] = useState<Date>(new Date());
    const triggerRef = useDOMRef<HTMLDivElement>(ref);

    const [valueDate, setValueDate] = useControlled(value, defaultValue);

    const state = useDatePickerState({
      isOpen: open,
      isDisabled: disabled,
    });
    const { groupProps, fieldProps, buttonProps, dialogProps } = useDatePicker(
      {
        "aria-label": a11yLabel || "Datepicker",
      },
      state,
      triggerRef
    );
    const { buttonProps: pressProps } = useButton(
      {
        ...buttonProps,
        "aria-label": a11yLabel || "Datepicker",
        isDisabled: disabled,
      },
      triggerRef
    );

    useEffect(() => {
      if (!valueDate) {
        setDate(new Date());
      }
    }, [valueDate]);

    function handleChangeMonth() {
      setType("month");
    }

    function handleChangeYear() {
      setType("year");
    }

    function handleChangeWeek() {
      setType("week");
    }

    function handleClear() {
      setValueDate(null);
    }

    function handleDayClick(day: PickerDay) {
      onChange?.(day);
      if (inline) return;
      state.close();
    }

    function handleClick(event) {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    /*@TOOD refactor */
    const renderInputSufix = () => {
      if (allowClear) {
        return (
          <Button
            size="small"
            type="button"
            variant="inline"
            className={styles["datepicker__clear-button"]}
            icon={<CloseOutline />}
            onClick={handleClear}
          />
        );
      }

      return (
        <div
          aria-hidden="true"
          className={cn(styles["datepicker__chevron-icon"], {
            [styles["datepicker__chevron-icon_toggled"]]: state.isOpen,
          })}
        >
          <ChevronDownOutline />
        </div>
      );
    };

    const renderContent = () => {
      if (inline) {
        return <DatePickerBase viewType={type} />;
      }

      return (
        <div
          {...groupProps}
          className={cn(styles["datepicker"], className)}
          onClick={handleClick}
        >
          <div
            ref={triggerRef}
            {...pressProps}
            className={styles["datepicker__trigger"]}
          >
            <Input
              readOnly
              id={fieldProps.id}
              aria-describedby={fieldProps["aria-describedby"]}
              aria-label={fieldProps["aria-label"]}
              value={inputValue}
              disabled={disabled}
              active={state.isOpen}
              suffix={renderInputSufix()}
              error={!!error}
            />
          </div>

          {state.isOpen && (
            <Popover
              isOpen={state.isOpen}
              triggerRef={triggerRef}
              state={state}
            >
              <div
                {...dialogProps}
                className={styles["datepicker__poppover-content"]}
              >
                <DatePickerBase viewType={type} />
              </div>
            </Popover>
          )}
        </div>
      );
    };

    const inputValue = valueDate
      ? format(valueDate, dateFormat, { locale })
      : "";

    const eventsMap = useMemo(
      () =>
        events.reduce(
          (map, event) => map.set(format(event.date, "yyyy-MM-dd"), event),
          new Map<string, DatePickerEvent>()
        ),
      [events]
    );

    return (
      <DatePickerCtx.Provider
        value={{
          ...props,
          inline,
          locale: locale,
          type,
          selectedValue: valueDate,
          date,
          value: valueDate,
          events,
          eventsMap,
          setDate,
          setMonth: handleChangeMonth,
          setYear: handleChangeYear,
          setWeek: handleChangeWeek,
          setValue: setValueDate,
          onDayClick: handleDayClick,
        }}
      >
        {renderContent()}
      </DatePickerCtx.Provider>
    );
  }
);
