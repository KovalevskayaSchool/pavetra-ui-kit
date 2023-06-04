import { forwardRef, HTMLAttributes, PropsWithChildren, Ref } from "react";
import cn from "classnames";

import "./Box.css";

export interface BoxProps extends Partial<HTMLAttributes<HTMLDivElement>>{
  ref?: Ref<HTMLDivElement>;
}

export const Box = forwardRef<HTMLDivElement, PropsWithChildren<BoxProps>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} {...props} className={cn("ks-box", className)}>
      {children}
    </div>
  )
);

Box.displayName = "Box";
