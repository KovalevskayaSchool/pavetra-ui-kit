import { forwardRef } from "react";
import { OverlayTriggerState } from "react-stately";
import { usePopover, DismissButton, Overlay } from "react-aria";
import type { AriaPopoverProps, AriaOverlayProps } from "react-aria";

import { useDOMRef } from "../../utils/useDomRef";

import cl from "./Popover.module.css";

interface PopoverProps
  extends Omit<AriaPopoverProps, "popoverRef">,
    AriaOverlayProps {
  children: React.ReactNode;
  className?: string;
  state: OverlayTriggerState;
  fullWidth?: boolean;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      className,
      state,
      placement = "bottom start",
      isNonModal,
      fullWidth,
      ...props
    },
    refForwarded,
  ) => {
    const popoverRef = useDOMRef(refForwarded);

    const { popoverProps, underlayProps } = usePopover(
      {
        ...props,
        popoverRef,
        placement,
        offset: 5,
      },
      state,
    );

    const width = fullWidth
      ? {
          minWidth:
            props.triggerRef.current?.getBoundingClientRect().width || 0,
        }
      : {};

    return (
      <Overlay>
        {!isNonModal && <div {...underlayProps} />}
        <div
          ref={popoverRef}
          {...popoverProps}
          className={className}
          style={{
            ...popoverProps.style,
            ...width,
            width: "fit-content",
          }}
        >
          {!isNonModal && <DismissButton onDismiss={state.close} />}
          {children}
          <DismissButton onDismiss={state.close} />
        </div>
      </Overlay>
    );
  },
);
