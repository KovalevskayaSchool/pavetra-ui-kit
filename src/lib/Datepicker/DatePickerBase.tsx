import { FC } from 'react';
import type { PickerType } from './DatePicker.d';
import { MonthView } from './Views/MonthView';
import { WeekView } from './Views/WeekView';
import { YearView } from './Views/YearView';

interface DatePickerBaseProps {
  viewType?: PickerType;
}

export const DatePickerBase: FC<DatePickerBaseProps> = ({
  viewType = 'week',
}) => {
  if (viewType === 'month') {
    return <MonthView />;
  }

  if (viewType === 'year') {
    return <YearView />;
  }
  return <WeekView />;
};
