import { FC, useMemo } from "react";
import cn from "classnames";
import isDate from "date-fns/isDate";
import subYears from "date-fns/subYears";
import addYears from "date-fns/addYears";
import isSameYear from "date-fns/isSameYear";
import {
  ChevronLeftOutline,
  ChevronRightOutline,
} from "@symblight/pavetra-icons";

import { useDatePickerCtx } from "../useDatePickerCtx";
import { DatePickerTemplate } from "../DatePickerTemplate";
import { Button } from "../../Button";
import type { PickerYear } from "../DatePicker.d";
import {
  getGroupedBy,
  getRangeYears,
  getYears,
  YEAR_QUARTER_LENGTH,
  YEAR_RANGE_LENGTH,
} from "../util";

import styles from "../DatePicker.module.css";

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
            type="button"
            onClick={handlePrevYear}
            icon={<ChevronLeftOutline />}
          />
          <div className={styles["datepicker__range"]}>
            {yearRange.start.getFullYear()} – {yearRange.end.getFullYear()}
          </div>
          <Button
            variant="inline"
            type="button"
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
                className={cn(styles["datepicker__cell"], {
                  [styles["datepicker__cell_today"]]: isSameYear(
                    year.date,
                    new Date(),
                  ),
                  [styles["datepicker__cell_selected"]]: isDate(state.value)
                    ? isSameYear(year.date, selected)
                    : false,
                })}
                onClick={() => handleClick(year)}
              >
                <div className={styles["datepicker__cell-inner"]}>
                  {year.label}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </DatePickerTemplate>
  );
};
