import {
  createContext,
  useContext,
  useState,
  forwardRef,
  useEffect,
} from 'react';
import { useButton, useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';
import cn from 'classnames';
import { ru } from 'date-fns/locale';
import { Locale } from 'date-fns/types';
import format from 'date-fns/format';
import {
  ChevronDownOutline,
  CloseOutline,
} from '@kovalevskayaschool/pavetra-icons';

import { PickerType, DatePickerEvent, PickerDay } from './DatePicker.d';
import { type DatePickerContext as DatePickerContextProps } from './DatePicker.d';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { Popover } from '../../atoms/Popover';
import { DatePickerBase } from './DatePickerBase';
import { useDOMRef } from '../../../utils/useDomRef';
import { useFormField } from '../../atoms/FormField/FormField';
import { useControlled } from '../../../lib/useControlled';
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

export const DatePickerContext = createContext<DatePickerContextProps>({
  type: 'week',
  date: new Date(),
  events: [],
  inline: false,
  locale: ru,
  value: null,
  setValue: () => undefined,
  setDate: () => undefined,
  setWeek: () => undefined,
  setYear: () => undefined,
  setMonth: () => undefined,
  disableDate: undefined,
  selectedValue: null,
  onDayClick: () => undefined,
});

export const useDatePickerCtx = () => useContext(DatePickerContext);

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

    const renderInputSufix = () => {
      if (allowClear) {
        return (
          <Button
            size="small"
            variant="inline"
            className="ks-select__button-clear"
            icon={
              <div className="ks-select__clear">
                <CloseOutline />
              </div>
            }
            onClick={handleClear}
          />
        );
      }

      return (
        <div
          aria-hidden="true"
          className="ks-select__icon"
          data-visible={state.isOpen}
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
        <div {...groupProps} className={cn(className, 'ks-date-time-picker')}>
          <div
            ref={triggerRef}
            {...pressProps}
            className="ks-data-time-picker__trigger"
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
              <div {...dialogProps} className="ks-datepicker__base">
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
      <DatePickerContext.Provider
        value={{
          ...props,
          inline,
          locale: locale || ru,
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
      </DatePickerContext.Provider>
    );
  }
);
