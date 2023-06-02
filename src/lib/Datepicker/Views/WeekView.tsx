import { FC } from 'react';
import cn from 'classnames';
import isDate from 'date-fns/isDate';
import isToday from 'date-fns/isToday';
import getYear from 'date-fns/getYear';
import isSameDay from 'date-fns/isSameDay';
import format from 'date-fns/format';
import {
  ChevronLeftOutline,
  ChevronRightOutline,
} from '@kovalevskayaschool/pavetra-icons';

import { useDatePickerCtx } from '../useDatePickerCtx';
import { DatePickerTemplate } from '../DatePickerTemplate';
import { Button } from '../../Button';
import { useWeekView } from './useWeekView';

export interface WeekViewProps {}

export const WeekView: FC<WeekViewProps> = () => {
  const state = useDatePickerCtx();

  const {
    handleDayClick,
    handleMonthClick,
    handleNextMonth,
    handlePrevMonth,
    handleYearClick,
    weekDayLabels,
    onPresentMonth,
    grouped,
    selected,
    hasEvent,
  } = useWeekView(state);

  return (
    <DatePickerTemplate
      navigation={
        <>
          <Button
            variant="inline"
            onClick={handlePrevMonth}
            icon={<ChevronLeftOutline />}
          />
          <div>
            <Button variant="inline" onClick={handleMonthClick}>
              {format(state.date, 'LLLL', { locale: state.locale })}
            </Button>
            <Button variant="inline" onClick={handleYearClick}>
              {getYear(state.date)}
            </Button>
          </div>
          <Button
            variant="inline"
            onClick={handleNextMonth}
            icon={<ChevronRightOutline />}
          />
        </>
      }
      footer={
        <>
          <Button variant="inline" onClick={onPresentMonth}>
            Сегодня
          </Button>
        </>
      }
    >
      <thead>
        <tr>
          {weekDayLabels.map((weekday) => (
            <th key={weekday}>
              <span className="ks-datepicker__week">{weekday}</span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {grouped.map((week, i) => (
          <tr key={`week-${i}`}>
            {week.map((day) => (
              <td
                key={day.date.toString()}
                className={cn('ks-datepicker__cell', {
                  ['ks-datepicker__cell_not-current']: !day.isCurrentMonth,
                  ['ks-datepicker__cell_today']: isToday(day.date),
                  ['ks-datepicker__cell_selected']: isDate(state.value)
                    ? isSameDay(day.date, selected)
                    : false,
                  ['ks-datepicker__cell__event']: !!hasEvent(day.date),
                  ['ks-datepicker__cell_disabled']: state.disableDate?.(day.date),
                })}
                onClick={() => handleDayClick(day)}
                title={day.label}
              >
                <div className="ks-datepicker__cell-inner">{day.dayOfMonth}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </DatePickerTemplate>
  );
};
