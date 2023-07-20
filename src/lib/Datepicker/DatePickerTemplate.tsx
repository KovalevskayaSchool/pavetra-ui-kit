import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import { Box } from "../Box";

import { useDatePickerCtx } from "./useDatePickerCtx";
import styles from "./DatePicker.module.css";

interface DatePickerTemplateProps {
  navigation: React.ReactNode;
  footer?: React.ReactNode;
}

export const DatePickerTemplate: FC<
  PropsWithChildren<DatePickerTemplateProps>
> = ({ children, footer, navigation }) => {
  const { inline, type } = useDatePickerCtx();
  return (
    <Box
      className={cn(styles["datepicker__view"], {
        [styles["datepicker__view_mode_inline"]]: !!inline,
      })}
    >
      <div
        className={cn(styles["datepicker__container"], {
          [styles["datepicker__year"]]: type === "year",
          [styles["datepicker__month"]]: type === "month",
        })}
      >
        <div className={styles["datepicker__nav"]}>{navigation}</div>
        <table className={styles["datepicker__content"]}>{children}</table>
        {footer && <div className={styles["datepicker__footer"]}>{footer}</div>}
      </div>
    </Box>
  );
};
