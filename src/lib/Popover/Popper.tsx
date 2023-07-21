import { FC, PropsWithChildren, useState } from "react";
import { AriaOverlayProps } from "react-aria";
import type { AriaPopoverProps } from "react-aria";
import { usePopper } from "react-popper";

import { Overlay } from "../Overlay";
import cl from "./Popover.module.css";

interface PopoverProps
  extends Omit<AriaPopoverProps, "popoverRef">,
    AriaOverlayProps {
  children: React.ReactNode;
  className?: string;
}

export const Popover: FC<PropsWithChildren<PopoverProps>> = ({
  children,
  offset = 5,
  className,
  onClose,
  isOpen,
  ...props
}) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(
    props.triggerRef.current,
    popperElement,
    {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 5],
          },
        },
      ],
    }
  );

  const width = props.triggerRef.current?.getBoundingClientRect().width || 0;

  return (
    <Overlay className={className} isOpen={isOpen} onClose={onClose}>
      <div
        ref={setPopperElement}
        style={{ ...styles.popper, minWidth: width, width: "fit-content" }}
        {...attributes.popper}
        className={cl["popover"]}
      >
        {children}
      </div>
    </Overlay>
  );
};
