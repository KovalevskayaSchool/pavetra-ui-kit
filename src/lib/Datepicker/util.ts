import addYears from "date-fns/addYears";
import getYear from "date-fns/getYear";
import startOfYear from "date-fns/startOfYear";
import subYears from "date-fns/subYears";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import type { PickerMonth, PickerYear } from "./DatePicker.d";

export const DAYS_OF_WEEK_LENGTH = 7;
export const MONTHS_LENGTH = 12;
export const MONTHS_QUARTER_LENGTH = 3;
export const YEARS_LENGTH = 12;
export const YEAR_QUARTER_LENGTH = 3;
export const YEAR_RANGE_LENGTH = 9;

export const getGroupedBy = <T>(data: T[], groupCount = 0): T[][] => {
  return [...new Array(data.length / groupCount)].reduce((acc, _, index) => {
    const start = index === 0 ? index : index * groupCount;
    const end = groupCount + start;
    const group = data.slice(start, end);
    return [...acc, group];
  }, []);
};

export function getWeekNameLabels(locale: Locale) {
  return [...new Array(DAYS_OF_WEEK_LENGTH)].map((day, index) =>
    format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), index), "EE", {
      locale,
    }),
  );
}

export function getMonths(
  start: Date = new Date(),
  locale: Locale,
): PickerMonth[] {
  const startRange = startOfYear(start);
  return [...new Array(MONTHS_LENGTH)].map((_, index) => ({
    label: format(addMonths(startRange, index), "LLLL", { locale }),
    date: addMonths(startRange, index),
  }));
}

export function getRangeYears(date: Date) {
  const start = subYears(new Date(Math.trunc(getYear(date) / 10) * 10, 0), 1);
  return {
    start,
    end: addYears(start, YEARS_LENGTH - 1),
  };
}

export function getYears(start: Date = new Date()): PickerYear[] {
  return [...new Array(YEARS_LENGTH)].map((_, index) => ({
    label: getYear(addYears(start, index)),
    date: addYears(start, index),
  }));
}
