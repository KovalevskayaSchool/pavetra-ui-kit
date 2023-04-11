import { forwardRef, PropsWithChildren } from 'react';
import { FocusScope, AriaOverlayProps } from 'react-aria';
import { DismissButton, useOverlay } from 'react-aria';
import { useDOMRef } from '../../utils/useDomRef';

export interface OverlayProps extends AriaOverlayProps {
  className?: string;
}

export const Overlay = forwardRef<
  HTMLDivElement,
  PropsWithChildren<OverlayProps>
>(({ isOpen, onClose, children, className }, ref) => {
  const overlayRef = useDOMRef(ref);

  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: true,
    },
    overlayRef
  );

  return (
    <FocusScope restoreFocus>
      <div
        style={overlayProps.style}
        className={className}
        ref={overlayRef}
        role="dialog"
      >
        <DismissButton onDismiss={onClose} />
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  );
});
