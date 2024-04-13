import { forwardRef } from "react";
import cn from "classnames";

import { Input, type InputProps } from "./Input";
import styles from "./Input.module.css";

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      ref={ref as unknown as React.ForwardedRef<HTMLInputElement>}
      {...props}
      className={cn(styles["textarea"], className)}
      renderInput={({ ...inputProps }) => (
        <textarea
          {...inputProps}
          className={cn(styles["textarea__control"], inputProps.className)}
        />
      )}
    />
  ),
);

TextArea.displayName = "TextArea";
