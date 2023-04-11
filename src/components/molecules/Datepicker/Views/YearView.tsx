import { FC, useMemo } from 'react';
import cn from 'classnames';
import isDate from 'date-fns/isDate';
import subYears from 'date-fns/subYears';
import addYears from 'date-fns/addYears';
import isSameYear from 'date-fns/isSameYear';
import {
  ChevronLeftOutline,
  ChevronRightOutline,
} from '@kovalevskayaschool/pavetra-icons';

import { useDatePickerCtx } from '../DatePicker';
import { DatePickerTemplate } from '../DatePickerTemplate';
import { Button } from '../../../atoms/Button';
import { PickerYear } from '../DatePicker.d';
import {
  getGroupedBy,
  getRangeYears,
  getYears,
  YEAR_QUARTER_LENGTH,
  YEAR_RANGE_LENGTH,
} from '../util';

export interface YearViewProps {}

export const YearView: FC<YearViewProps> = () => {
  const state = useDatePickerCtx();

  function handleClick(year: PickerYear) {
    state.setDate(year.date);
    state.setMonth();
  }

  function handlePrevYear() {
    state.setDate(subYears(state.date, YEAR_RANGE_LENGTH));
  }
  function handleNextYear() {
    state.setDate(addYears(state.date, YEAR_RANGE_LENGTH));
  }

  const yearRange = useMemo(() => getRangeYears(state.date), [state.date]);
  const years = getYears(state.date);
  const grouped = getGroupedBy(years, YEAR_QUARTER_LENGTH);
  const selected = state.value || new Date();

  return (
    <DatePickerTemplate
      navigation={
        <>
          <Button
            variant="inline"
            onClick={handlePrevYear}
            icon={<ChevronLeftOutline />}
          />
          <div className="ks-picker__range">
            {yearRange.start.getFullYear()} – {yearRange.end.getFullYear()}
          </div>
          <Button
            variant="inline"
            onClick={handleNextYear}
            icon={<ChevronRightOutline />}
          />
        </>
      }
    >
      <tbody>
        {grouped.map((group, i) => (
          <tr key={`group-${i}`}>
            {group.map((year) => (
              <td
                key={year.date.toString()}
                className={cn('ks-picker-cell', {
                  ['ks-picker-cell--today']: isSameYear(year.date, new Date()),
                  ['ks-picker-cell--selected']: isDate(state.value)
                    ? isSameYear(year.date, selected)
                    : false,
                })}
                onClick={() => handleClick(year)}
              >
                <div className="ks-picker-cell__inner">{year.label}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </DatePickerTemplate>
  );
};
