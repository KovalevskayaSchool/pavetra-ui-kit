import React, { Key, ReactElement, RefObject } from "react";
import type { TableColumnResizeState } from "react-stately";
import { useTableColumnResize } from "react-aria";
import { VisuallyHidden } from "react-aria";

import styles from "./Table.module.css";

type GridNode<T> = any;

interface ResizerProps<T> {
  column: GridNode<T>;
  layoutState: TableColumnResizeState<T>;
  onResizeStart?: (widths: Map<Key, number | string>) => void;
  onResize?: (widths: Map<Key, number | string>) => void;
  onResizeEnd?: (widths: Map<Key, number | string>) => void;
  triggerRef: RefObject<HTMLButtonElement>;
  showResizer: boolean;
}

function ResizerBase<T>(
  props: ResizerProps<T>,
  ref: RefObject<HTMLInputElement>,
) {
  let {
    column,
    layoutState,
    onResizeStart,
    onResize,
    onResizeEnd,
    triggerRef,
    showResizer,
  } = props;
  let { resizerProps, inputProps } = useTableColumnResize(
    {
      column,
      "aria-label": "Resizer",
      onResizeStart,
      onResize,
      onResizeEnd,
      triggerRef,
    },
    layoutState,
    ref,
  );

  return (
    <div
      role="presentation"
      className={styles["table__resizer"]}
      {...resizerProps}
    >
      <VisuallyHidden>
        <input ref={ref} type="range" {...inputProps} />
      </VisuallyHidden>
    </div>
  );
}

export const Resizer = React.forwardRef(ResizerBase) as <T>(
  props: ResizerProps<T> & { ref?: RefObject<HTMLInputElement> },
) => ReactElement;
