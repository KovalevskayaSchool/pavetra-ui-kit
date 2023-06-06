import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  Ref,
  ElementType,
} from "react";
import cn from "classnames";

import "./Box.css";

export interface BoxProps extends Partial<HTMLAttributes<HTMLDivElement>> {
  ref?: Ref<HTMLElement>;
  as?: ElementType;
}

export const Box = forwardRef<HTMLElement, PropsWithChildren<BoxProps>>(
  ({ className, children, as = "div", ...props }, ref) => {
    const Component = as;
    return (
      <Component ref={ref} {...props} className={cn("ks-box", className)}>
        {children}
      </Component>
    );
  }
);

Box.displayName = "Box";
