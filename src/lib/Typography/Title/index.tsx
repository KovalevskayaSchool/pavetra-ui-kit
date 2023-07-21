import React, { FC, forwardRef, PropsWithChildren } from "react";
import cn from "classnames";

import styles from "../Typography.module.css";

export interface TTitle extends Partial<React.HTMLAttributes<HTMLHtmlElement>> {
  className?: string;
  ref?: React.Ref<HTMLSpanElement>;
  level?: number;
  id?: string;
}

export const Title: FC<PropsWithChildren<TTitle>> = forwardRef(
  ({ children, className, level, id, ...rest }, ref) => {
    const rc = React.createElement;
    const getHTMLTag = () => {
      switch (level) {
        case 1:
          return "h1";
        case 2:
          return "h2";
        case 3:
          return "h3";
        case 4:
          return "h4";
        default:
          return "h2";
      }
    };

    const getLevel = (level = 1) => {
      switch (level) {
        case 1: {
          return "h1";
        }
        case 2: {
          return "h2";
        }
        case 3: {
          return "h3";
        }
        case 4: {
          return "h4";
        }
        // case 5: {
        //   return cx(styles.h1)
        // }
        default:
          return "h1";
      }
    };
    return rc(
      getHTMLTag(),
      {
        ref,
        className: cn(styles[getLevel(level)], className),
        id,
        ...rest,
      },
      children
    );
  }
);
