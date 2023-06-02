import {
  useState,
  forwardRef,
  useEffect,
} from 'react';
import { useButton, useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';
import cn from 'classnames';
import { Locale } from 'date-fns/types';
import format from 'date-fns/format';
import {
  ChevronDownOutline,
  CloseOutline,
} from '@kovalevskayaschool/pavetra-icons';

import type { PickerType, DatePickerEvent, PickerDay,  } from './DatePicker.d';
import { Input } from '../Input';
import { Button } from '../Button';
import { Popover } from '../Popover';
import { DatePickerBase } from './DatePickerBase';
import { useDOMRef } from '../../utils/useDomRef';
import { useFormField } from '../FormField/FormField';
import { useControlled } from '../../utils/useControlled';
import { DatePickerContext as DatePickerCtx } from './useDatePickerCtx';
import './DatePicker.css';

export interface DatePickerProps {
  type?: PickerType;
  date?: Date;
  locale?: Locale;
  inline?: boolean;
  events?: DatePickerEvent[];
  disableDate?: ((date: Date) => boolean) | undefined;
  className?: string;
  selectedValue?: Date | null | undefined;
  defaultValue?: Date;
  allowClear?: boolean;
  open?: boolean;
  onDayClick?: (day: PickerDay) => void;
  dateFormat?: string;
  disabled?: boolean;
  a11yLabel?: string;
}


export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      allowClear,
      open,
      events = [],
      selectedValue,
      defaultValue,
      locale,
      inline = false,
      disabled,
      onDayClick,
      dateFormat = 'yyyy-MM-dd',
      a11yLabel,
      ...props
    },
    ref
  ) => {
    const [type, setType] = useState<PickerType>('week');
    const [date, setDate] = useState<Date>(new Date());
    const formField = useFormField();
    const triggerRef = useDOMRef<HTMLDivElement>(ref);

    const [valueDate, setValueDate] = useControlled(
      selectedValue,
      defaultValue
    );

    const state = useDatePickerState({
      isOpen: open,
      isDisabled: disabled,
    });
    const formProps = formField?.labelProps || {};
    const { groupProps, fieldProps, buttonProps, dialogProps } = useDatePicker(
      {
        'aria-label': formProps?.['aria-label'] || a11yLabel || 'Datepicker',
        'aria-describedby': formProps?.['aria-describedby'] || '',
      },
      state,
      triggerRef
    );
    const { buttonProps: pressProps } = useButton(
      {
        ...buttonProps,
        'aria-label': a11yLabel || 'Datepicker',
      },
      triggerRef
    );

    useEffect(() => {
      if (!valueDate) {
        setDate(new Date());
      }
    }, [valueDate]);

    function handleChangeMonth() {
      setType('month');
    }

    function handleChangeYear() {
      setType('year');
    }

    function handleChangeWeek() {
      setType('week');
    }

    function handleClear() {
      setValueDate(null);
    }

    function handleDayClick(day: PickerDay) {
      formField?.onChange?.(day as never);
      onDayClick?.(day);
      if (inline) return;
      state.close();
    }

    /*@TOOD refactor */
    const renderInputSufix = () => {
      if (allowClear) {
        return (
          <Button
            size="small"
            variant="inline"
            className="ks-datepicker__clear-button"
            icon={
                <CloseOutline />
            }
            onClick={handleClear}
          />
        );
      }

      return (
        <div
          aria-hidden="true"
          className={cn("ks-datepicker__chevron-icon", { ["ks-datepicker__chevron-icon_toggled"]: state.isOpen })}
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
        <div {...groupProps} className={cn(className, 'ks-datepicker')}>
          <div
            ref={triggerRef}
            {...pressProps}
            className="ks-datepicker__trigger"
          >
            <Input
              readOnly
              id={fieldProps.id}
              aria-describedby={fieldProps['aria-describedby']}
              aria-label={fieldProps['aria-label']}
              value={inputValue}
              disabled={disabled}
              active={state.isOpen}
              suffix={renderInputSufix()}
            />
          </div>

          {state.isOpen && (
            <Popover
              onClose={state.close}
              isOpen={state.isOpen}
              triggerRef={triggerRef}
            >
              <div {...dialogProps} className="ks-datepicker__poppover-content">
                <DatePickerBase viewType={type} />
              </div>
            </Popover>
          )}
        </div>
      );
    };

    const inputValue = valueDate
      ? format(valueDate, dateFormat, { locale })
      : '';

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
