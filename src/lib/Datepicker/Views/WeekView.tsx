import { FC } from "react";
import getYear from "date-fns/getYear";
import format from "date-fns/format";
import {
  ChevronLeftOutline,
  ChevronRightOutline,
} from "@symblight/pavetra-icons";

import { useDatePickerCtx } from "../useDatePickerCtx";
import { DatePickerTemplate } from "../DatePickerTemplate";
import { Button } from "../../Button";
import { useWeekView } from "./useWeekView";
import { WeekDay } from "./WeekDay";

import styles from "../DatePicker.module.css";

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

  function getEvent(dayDate) {
    const value = state.eventsMap.get(format(dayDate, "yyyy-MM-dd"));

    return !!value;
  }

  return (
    <DatePickerTemplate
      navigation={
        <>
          <Button
            variant="inline"
            type="button"
            onClick={handlePrevMonth}
            icon={<ChevronLeftOutline />}
          />
          <div>
            <Button type="button" variant="inline" onClick={handleMonthClick}>
              {format(state.date, "LLLL", { locale: state.locale })}
            </Button>
            <Button type="button" variant="inline" onClick={handleYearClick}>
              {getYear(state.date)}
            </Button>
          </div>
          <Button
            variant="inline"
            type="button"
            onClick={handleNextMonth}
            icon={<ChevronRightOutline />}
          />
        </>
      }
      footer={
        <>
          <Button type="button" variant="inline" onClick={onPresentMonth}>
            Сегодня
          </Button>
        </>
      }
    >
      <thead>
        <tr>
          {weekDayLabels.map((weekday) => (
            <th key={weekday}>
              <span className={styles["datepicker__week"]}>{weekday}</span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {grouped.map((week, i) => (
          <tr key={`week-${i}`}>
            {week.map((day) => (
              <WeekDay
                key={day.date.toString()}
                state={state}
                isEvent={!!hasEvent(day.date)}
                selected
                day={day}
                onClick={handleDayClick}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </DatePickerTemplate>
  );
};
