import { FC, PropsWithChildren, useRef } from 'react';
import {
  Overlay,
  useModalOverlay,
  AriaModalOverlayProps,
  useDialog,
} from 'react-aria';
import { OverlayTriggerState } from 'react-stately';
import cn from 'classnames';
import { CloseOutline } from '@kovalevskayaschool/pavetra-icons';

import { Portal } from '../Portal';
import { Button } from '../Button';
import { Card } from '../Card';

import { Typography } from '../Typography';
import './Modal.css';

export interface DialogProps extends AriaModalOverlayProps {
  footerChildren?: React.ReactNode;
  headerLabel?: string | React.ReactNode;
  onClose?: () => void;
  closable?: boolean;
  closableButton?: boolean;
  className?: string;
  id?: string;
  state: OverlayTriggerState;
}

export const Modal: FC<PropsWithChildren<DialogProps>> = ({
  className,
  closableButton = true,
  footerChildren,
  headerLabel,
  onClose,
  state,
  children,
  id,
  isDismissable,
  isKeyboardDismissDisabled,
  ...props
}) => {
  const ref = useRef(null);

  const { modalProps, underlayProps } = useModalOverlay(
    {
      isDismissable,
      isKeyboardDismissDisabled,
      ...props,
    },
    state,
    ref
  );
  const { dialogProps, titleProps } = useDialog(
    {
      id,
      ...props,
    },
    ref
  );

  return (
    <>
      {state.isOpen && (
        <Portal>
          <Overlay>
            <div className={cn(className, 'modal__container')}>
              <div className="modal__overlay" />
              <div className="modal__wrapper" {...underlayProps}>
                <Card
                  id={id}
                  ref={ref}
                  tabIndex={-1}
                  className="modal__content"
                  {...modalProps}
                  {...dialogProps}
                >
                  {closableButton && (
                    <div className="modal__close-button">
                      <Button
                        onClick={onClose}
                        variant="inline"
                        size="large"
                        tabIndex={0}
                        icon={<CloseOutline />}
                      />
                    </div>
                  )}
                  <div className="modal__header" {...titleProps}>
                    <Typography.Title level={4}>{headerLabel}</Typography.Title>
                  </div>
                  <div className="modal__body">{children}</div>
                  {footerChildren}
                </Card>
              </div>
            </div>
          </Overlay>
        </Portal>
      )}
    </>
  );
};
