import { Locale } from "date-fns";

export type PickerDay = {
  label: string;
  dayOfMonth: string;
  isCurrentMonth: boolean;
  date: Date;
  event: DatePickerEvent | undefined;
};

export type PickerMonth = {
  label: string;
  date: Date;
};

export type PickerYear = {
  label: number;
  date: Date;
};

export type PickerType = "month" | "week" | "year";

export type DatePickerContext = {
  type: PickerType;
  date: Date;
  locale: Locale;
  selectedValue: Date | null | undefined;
  setWeek: () => void;
  setMonth: () => void;
  setYear: () => void;
  value: Date | undefined | null;
  setValue: (data: Date) => void;
  setDate: (data: Date) => void;
  inline: boolean;
  events: DatePickerEvent[];
  eventsMap: Map<string, DatePickerEvent>;
  disableDate?: ((date: Date) => boolean) | undefined;
  renderCell?: (date: Date, dayOfMonth: string) => void;
  onDayClick?: (day: PickerDay) => void;
};

export type DatePickerEvent<T = unknown> = {
  id: string;
  title: string;
  date: Date;
  data: T;
  items?: {
    id: string;
    title: string;
  }[];
};
