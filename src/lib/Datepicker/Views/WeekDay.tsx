import { FC } from "react";
import cn from "classnames";
import isDate from "date-fns/isDate";
import isToday from "date-fns/isToday";
import isSameDay from "date-fns/isSameDay";
import { format } from "date-fns";
import { usePress } from "react-aria";

import type { DatePickerContext, PickerDay } from "../DatePicker.d";

import styles from "../DatePicker.module.css";

interface WeekDayProps {
  day: PickerDay;
  state: DatePickerContext;
  onClick: (day: PickerDay) => void;
  isEvent: boolean;
  selected?: boolean;
}

export function WeekDay({
  onClick,
  day,
  state,
  selected,
  isEvent,
}: WeekDayProps) {
  const { pressProps } = usePress({
    onPress: () => onClick?.(day),
  });

  function getEvent(dayDate) {
    const value = state.eventsMap.get(format(dayDate, "yyyy-MM-dd"));

    return !!value;
  }
  return (
    <td
      {...pressProps}
      key={day.date.toString()}
      className={cn(styles["datepicker__cell"], {
        [styles["datepicker__cell_not-current"]]: !day.isCurrentMonth,
        [styles["datepicker__cell_today"]]: isToday(day.date),
        [styles["datepicker__cell_selected"]]: isDate(state.value)
          ? isSameDay(day.date, selected)
          : false,
        [styles["datepicker__cell__event"]]: isEvent,
        [styles["datepicker__cell_disabled"]]: state.disableDate?.(day.date),
        [styles["datepicker__cell_event"]]: getEvent(day.date),
      })}
      title={day.label}
    >
      <div className={styles["datepicker__cell-inner"]}>
        {state.renderCell?.(day.date, day.dayOfMonth) || day.dayOfMonth}
      </div>
    </td>
  );
}
