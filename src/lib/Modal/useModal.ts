import { DOMProps } from "@react-types/shared";
import { useState } from "react";
import { AriaButtonProps, useOverlayTrigger } from "react-aria";
import {
  useOverlayTriggerState,
  OverlayTriggerProps,
  OverlayTriggerState,
} from "react-stately";

export type UseModalProps = Partial<OverlayTriggerProps>;
export type ModalState = OverlayTriggerState;

export interface OverlayTriggerStateModal
  extends Omit<OverlayTriggerState, "open"> {
  open: (values?: any) => void;
}

export type UseModalResponse = {
  state: OverlayTriggerStateModal;
  triggerProps: AriaButtonProps;
  modalProps: DOMProps;
  data: any;
};

export const useModal = (props?: UseModalProps): UseModalResponse => {
  const [data, setData] = useState(null);
  const stateModal = useOverlayTriggerState(props || {});
  const { triggerProps: triggerStateProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    stateModal,
  );

  const { onPress, ...restTriggerProps } = triggerStateProps;

  const triggerProps = {
    ...restTriggerProps,
  };

  function open(values) {
    setData(values);
    stateModal.open();
  }

  function close() {
    stateModal.close();
    setData(null);
  }

  const state = { ...stateModal, open, close };

  return { state, data, triggerProps, modalProps: overlayProps };
};
