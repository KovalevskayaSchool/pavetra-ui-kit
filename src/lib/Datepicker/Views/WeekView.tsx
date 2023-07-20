import { FC } from "react";
import cn from "classnames";
import isDate from "date-fns/isDate";
import isToday from "date-fns/isToday";
import getYear from "date-fns/getYear";
import isSameDay from "date-fns/isSameDay";
import format from "date-fns/format";
import {
  ChevronLeftOutline,
  ChevronRightOutline,
} from "@kovalevskayaschool/pavetra-icons";

import { useDatePickerCtx } from "../useDatePickerCtx";
import { DatePickerTemplate } from "../DatePickerTemplate";
import { Button } from "../../Button";
import { useWeekView } from "./useWeekView";
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
              <td
                key={day.date.toString()}
                className={cn(styles["datepicker__cell"], {
                  [styles["datepicker__cell_not-current"]]: !day.isCurrentMonth,
                  [styles["datepicker__cell_today"]]: isToday(day.date),
                  [styles["datepicker__cell_selected"]]: isDate(state.value)
                    ? isSameDay(day.date, selected)
                    : false,
                  [styles["datepicker__cell__event"]]: !!hasEvent(day.date),
                  [styles["datepicker__cell_disabled"]]: state.disableDate?.(
                    day.date
                  ),
                  [styles["datepicker__cell_event"]]: getEvent(day.date),
                })}
                onClick={() => handleDayClick(day)}
                title={day.label}
              >
                <div className={styles["datepicker__cell-inner"]}>
                  {state.renderCell?.(day.date, day.dayOfMonth) || day.dayOfMonth}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </DatePickerTemplate>
  );
};
