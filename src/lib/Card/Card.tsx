import { forwardRef, PropsWithChildren, Ref } from "react";
import cn from "classnames";
import styles from "./Card.module.css";

export interface CardProps {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  title?: React.ReactNode | string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, PropsWithChildren<CardProps>>(
  ({ className, children, title, icon, action, ...props }, ref) => (
    <div ref={ref} {...props} className={cn(styles["card"], className)}>
      {title && (
        <div className={styles["card__header"]}>
          <div className={styles["card__wrap-title"]}>
            {icon && <div className={styles["card__icon"]}>{icon}</div>}
            <span className={styles["card__title"]}>{title}</span>
          </div>
          {action}
        </div>
      )}
      <div className={styles["card__body"]}>{children}</div>
    </div>
  ),
);

Card.displayName = "Card";
