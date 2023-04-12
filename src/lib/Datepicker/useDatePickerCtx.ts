import { useContext, createContext } from "react";
import ru from 'date-fns/locale/ru';
import { type DatePickerContext as DatePickerContextProps } from './DatePicker.d';

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