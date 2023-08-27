import { forwardRef } from "react";
import cn from "classnames";
import { DateFieldState, DateSegment } from "react-stately";
import { useDateSegment } from "react-aria";

import { useDOMRef } from "../../utils/useDomRef";

import styles from "./TimeField.module.css";

interface DateSegmentProps {
  segment: DateSegment;
  state: DateFieldState;
  className?: string;
}

export const DateSegmentTimeField = forwardRef<
  HTMLDivElement,
  DateSegmentProps
>(({ segment, state, className }, ref) => {
  let refSegment = useDOMRef(ref);
  let { segmentProps } = useDateSegment(segment, state, refSegment);

  return (
    <div
      ref={refSegment}
      {...segmentProps}
      className={cn(styles["time-picker__segment"], className)}
    >
      {segment.text}
    </div>
  );
});
