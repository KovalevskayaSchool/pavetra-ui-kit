import { createElement, PropsWithChildren } from "react";
import cn from "classnames";
import styles from "../Typography.module.css";

interface CaptionProps {
  className?: string;
  as?: string;
  target?: string;
  rel?: string;
  href?: string;
}

export function Caption({
  children,
  className,
  as = "span",
  ...rest
}: PropsWithChildren<CaptionProps>) {
  return createElement(
    as,
    {
      ...rest,
      className: cn(styles["caption"], className),
    },
    children,
  );
}

Caption.displayName = "Caption";
