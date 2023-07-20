import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
} from "react";
import cn from "classnames";

import styles from "./Grid.module.css";

interface GridProps extends Partial<HTMLAttributes<HTMLDivElement>> {
  ref?: Ref<HTMLDivElement>;
}

export interface RowProps extends GridProps {
  gutter: [number, number];
}

export interface ColProps extends GridProps {
  span: number;
}

const Row = forwardRef<HTMLDivElement, PropsWithChildren<RowProps>>(
  ({ gutter, children, className, ...props }, ref) => {
    const rowClass = gutter ? styles["row-with-gutter"] : styles["row"];

    return (
      <div ref={ref} {...props} className={cn(rowClass, className)}>
        {children}
      </div>
    );
  }
);

const Col = forwardRef<HTMLDivElement, PropsWithChildren<ColProps>>(
  ({ span, children, className, ...props }, ref) => {
    const colClass = `${styles['col']} ${styles[`col-${span}`]}`;

    return (
      <div ref={ref} {...props} className={cn(colClass, className)}>
        {children}
      </div>
    );
  }
);

export const Grid = {
  Row,
  Col,
};
