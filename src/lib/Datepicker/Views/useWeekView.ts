import { useEffect, useMemo, useState } from "react";

import format from "date-fns/format";
import subMonths from "date-fns/subMonths";
import subDays from "date-fns/subDays";
import addMonths from "date-fns/addMonths";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import getDaysInMonth from "date-fns/getDaysInMonth";
import startOfMonth from "date-fns/startOfMonth";
import isSameDay from "date-fns/isSameDay";

import type { DatePickerContext, PickerDay } from "../DatePicker.d";
import { getGroupedBy, getWeekNameLabels, DAYS_OF_WEEK_LENGTH } from "../util";

const INITIAL_YEAR = new Date().getFullYear();
const INITIAL_MONTH = new Date().getMonth();

export const useWeekView = (state: DatePickerContext) => {
  const {
    disableDate,
    setMonth,
    setYear,
    locale,
    setValue,
    setDate: setDefaultDate,
    onDayClick,
    events,
    date: defaultDate,
    value,
  } = state;
  const [days, setDays] = useState<PickerDay[]>([]);

  function handleMonthClick() {
    setMonth();
  }

  function handleYearClick() {
    setYear();
  }

  function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
    const currentMonthDays = createDaysForCurrentMonth(year, month);

    const previousMonthDays = createDaysForPreviousMonth(
      year,
      month - 1,
      currentMonthDays[0].date
    );

    const nextMonthDays = createDaysForNextMonth(year, month);

    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    setDays(days);
  }

  function createDate({
    month = 1,
    isCurrentMonth = false,
    dayNumber = 0,
    dayOfMonth = 0,
    year,
  }: {
    month: number;
    isCurrentMonth: boolean;
    dayNumber: number;
    dayOfMonth: number;
    year: number;
  }): PickerDay {
    const date = new Date(year, Number(month), dayNumber);
    return {
      label: format(date, "yyyy-MM-dd", { locale }),
      dayOfMonth,
      isCurrentMonth,
      date,
      event: undefined,
    };
  }

  function getNumberOfDaysInMonth(year: number, month: number) {
    return getDaysInMonth(new Date(year, month));
  }

  function createDaysForCurrentMonth(year: number, month: number) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
      return createDate({
        year,
        month,
        dayOfMonth: index + 1,
        isCurrentMonth: true,
        dayNumber: index + 1,
      });
    });
  }

  function createDaysForPreviousMonth(
    year: number,
    month: number,
    firstDayOfMonth: Date
  ) {
    const firstDayOfTheMonthWeekday = firstDayOfMonth.getDay();

    const previousMonth = subMonths(new Date(year, month, 0), 1);

    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;

    const previousMonthLastMondayDayOfMonth = subDays(
      new Date(firstDayOfMonth),
      visibleNumberOfDaysFromPreviousMonth
    ).getDate();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
      (day, index) => {
        return createDate({
          year: previousMonth.getFullYear(),
          month: previousMonth.getMonth() + 1,
          dayOfMonth: previousMonthLastMondayDayOfMonth + index,
          isCurrentMonth: false,
          dayNumber: previousMonthLastMondayDayOfMonth + index,
        });
      }
    );
  }

  function createDaysForNextMonth(year: number, month: number) {
    const lastDayOfTheMonthWeekday = lastDayOfMonth(
      new Date(year, month)
    ).getDay();

    const nextMonth = addMonths(new Date(year, month), 1);

    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return createDate({
        year: nextMonth.getFullYear(),
        month: nextMonth.getMonth(),
        dayOfMonth: index + 1,
        isCurrentMonth: false,
        dayNumber: index + 1,
      });
    });
  }

  function cloneDate(d: Date) {
    return new Date(d.getTime());
  }

  function handleDayClick(day: PickerDay) {
    const { date } = day;

    if (disableDate?.(day.date)) {
      return;
    }

    const clonedValue = cloneDate(date);
    setValue(clonedValue);
    onDayClick?.({
      ...day,
      event: hasEvent(date),
    });
  }

  function handlePrevMonth() {
    setDefaultDate(startOfMonth(subMonths(defaultDate, 1)));
  }

  function handleNextMonth() {
    setDefaultDate(startOfMonth(addMonths(defaultDate, 1)));
  }

  function onPresentMonth() {
    setDefaultDate(new Date());
  }

  function hasEvent(day: Date) {
    const event = events.find((ev) => isSameDay(ev.date, day));

    return event;
  }

  useEffect(() => {
    createCalendar(defaultDate?.getFullYear(), defaultDate.getMonth());
  }, [defaultDate]);

  const grouped = useMemo(() => {
    return getGroupedBy(days, DAYS_OF_WEEK_LENGTH);
  }, [days]);

  const weekDayLabels = useMemo(() => {
    return getWeekNameLabels(locale);
  }, [locale]);

  const selected = value || new Date();
  return {
    weekDayLabels,
    grouped,
    selected,
    onPresentMonth,
    handleNextMonth,
    handlePrevMonth,
    handleDayClick,
    handleMonthClick,
    handleYearClick,
    hasEvent,
  };
};
