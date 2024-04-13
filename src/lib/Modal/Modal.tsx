import { FC, PropsWithChildren, useRef } from "react";
import {
  Overlay,
  useModalOverlay,
  AriaModalOverlayProps,
  useDialog,
} from "react-aria";
import { OverlayTriggerState } from "react-stately";
import cn from "classnames";
import { CloseOutline } from "@symblight/pavetra-icons";
import { OverlayTriggerStateModal } from "./useModal";

import { Portal } from "../Portal";
import { Button } from "../Button";
import { Box } from "../Box";
import { Typography } from "../Typography";

import styles from "./Modal.module.css";

export interface DialogProps extends AriaModalOverlayProps {
  footerChildren?: React.ReactNode;
  headerLabel?: string | React.ReactNode;
  onClose?: () => void;
  closable?: boolean;
  fullScreen?: boolean;
  closableButton?: boolean;
  className?: string;
  id?: string;
  state: OverlayTriggerStateModal;
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
  fullScreen,
  ...props
}) => {
  const ref = useRef(null);

  const { modalProps, underlayProps } = useModalOverlay(
    {
      isDismissable,
      isKeyboardDismissDisabled,
      ...props,
    },
    state as OverlayTriggerState,
    ref,
  );
  const { dialogProps, titleProps } = useDialog(
    {
      id,
      ...props,
    },
    ref,
  );

  return (
    <>
      {state.isOpen && (
        <Portal>
          <Overlay>
            <div className={cn(styles["modal__container"], className)}>
              <div className={styles["modal__overlay"]} />
              <div className={styles["modal__wrapper"]} {...underlayProps}>
                <Box
                  id={id}
                  ref={ref}
                  tabIndex={-1}
                  className={cn(styles["modal__content"], {
                    [styles["modal__content_full"]]: fullScreen,
                  })}
                  {...modalProps}
                  {...dialogProps}
                >
                  {closableButton && (
                    <div className={styles["modal__close-button"]}>
                      <Button
                        onClick={onClose}
                        variant="inline"
                        tabIndex={0}
                        icon={<CloseOutline />}
                      />
                    </div>
                  )}
                  <div className={styles["modal__header"]} {...titleProps}>
                    <Typography.Title level={4}>{headerLabel}</Typography.Title>
                  </div>
                  <div className={styles["modal__body"]}>{children}</div>
                  {footerChildren}
                </Box>
              </div>
            </div>
          </Overlay>
        </Portal>
      )}
    </>
  );
};
