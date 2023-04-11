// import { Modal as ModalComponent } from './Modal';
//import { confirm } from './Confirm';

// export type ModalProps = typeof ModalComponent & {
//   confirm: typeof confirm;
// };

// const Modal = ModalComponent as ModalProps;

// Modal.confirm = function confirmFn(props: any) {
//   return confirm(props);
// };

export { Modal } from './Modal';
export { useModal } from './useModal';
export type { UseModalProps, ModalState } from './useModal';
