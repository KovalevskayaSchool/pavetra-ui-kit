import { FC } from 'react';
import cn from 'classnames';
import isDate from 'date-fns/isDate';
import getYear from 'date-fns/getYear';
import subYears from 'date-fns/subYears';
import addYears from 'date-fns/addYears';
import isSameMonth from 'date-fns/isSameMonth';
import {
  ChevronDownOutline,
  ChevronUpOutline,
} from '@kovalevskayaschool/pavetra-icons';

import { useDatePickerCtx } from '../useDatePickerCtx';
import { DatePickerTemplate } from '../DatePickerTemplate';
import { Button } from '../../Button';
import type { PickerMonth } from '../DatePicker.d';
import { getGroupedBy, getMonths, MONTHS_QUARTER_LENGTH } from '../util';

export interface MonthViewProps {}

export const MonthView: FC<MonthViewProps> = () => {
  const state = useDatePickerCtx();

  function handleClick(month: PickerMonth) {
    state.setDate(month.date);
    state.setWeek();
  }

  function handlePrevYear() {
    state.setDate(subYears(state.date, 1));
  }
  function handleNextYear() {
    state.setDate(addYears(state.date, 1));
  }

  const months = getMonths(state.date, state.locale);
  const grouped = getGroupedBy(months, MONTHS_QUARTER_LENGTH);
  const selected = state.value || new Date();

  return (
    <DatePickerTemplate
      navigation={
        <>
          <Button
            variant="inline"
            onClick={handlePrevYear}
            icon={<ChevronUpOutline />}
          />
          <div className="ks-picker__range">{getYear(state.date)}</div>
          <Button
            variant="inline"
            onClick={handleNextYear}
            icon={<ChevronDownOutline />}
          />
        </>
      }
    >
      <tbody>
        {grouped.map((group, i) => (
          <tr key={`group-${i}`}>
            {group.map((month) => (
              <td
                key={month.date.toString()}
                className={cn('ks-picker-cell', {
                  ['ks-picker-cell--today']: isSameMonth(
                    month.date,
                    new Date()
                  ),
                  ['ks-picker-cell--selected']: isDate(state.value)
                    ? isSameMonth(month.date, selected)
                    : false,
                })}
                onClick={() => handleClick(month)}
              >
                <div className="ks-picker-cell__inner">{month.label}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </DatePickerTemplate>
  );
};
