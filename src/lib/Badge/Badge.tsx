import { forwardRef, PropsWithChildren } from "react";
import cn from "classnames";
import styles from "./Badge.module.css";

export interface BadgeProps {
  className?: string;
  count?: number;
}

export const Badge = forwardRef<HTMLSpanElement, PropsWithChildren<BadgeProps>>(
  ({ className, count = 0, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(className, styles["badge"])} {...props}>
        {count > 0 && (
          <sup className={styles["badge__counter"]}>
            <span className={styles["badge__label"]}>{count.toString()}</span>
          </sup>
        )}
        {children}
      </span>
    );
  }
);
