import { useOverlayTrigger } from 'react-aria';
import {
  useOverlayTriggerState,
  OverlayTriggerProps,
  OverlayTriggerState,
} from 'react-stately';

export type UseModalProps = Partial<OverlayTriggerProps>;
export type ModalState = OverlayTriggerState;

export const useModal = (props?: UseModalProps) => {
  const state = useOverlayTriggerState(props || {});
  const { triggerProps: triggerStateProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state
  );

  const { onPress, ...restTriggerProps } = triggerStateProps;

  const triggerProps = {
    ...restTriggerProps,
  };

  return { state, triggerProps, modalProps: overlayProps };
};
