// import { FC, useState } from 'react';

// import cn from 'classnames/bind';

// import { GhostButton, PrimaryButton } from '../../../../atoms/Button';

// import styles from './styles.module.css';

// const cx = cn.bind(styles);

// import { Modal } from '../../Modal';

// export interface ConfirmProps {
//   onOk?: () => void | Promise<unknown>;
//   onCancel?: () => void;
//   okText?: string | React.ReactNode;
//   cancelText?: string | React.ReactNode;
//   content?: string | React.ReactNode;
//   close?: () => void;
// }

// export const ConfirmDialog: FC<ConfirmProps> = ({
//   content,
//   onOk,
//   onCancel,
//   close,
//   ...props
// }) => {
//   const [loading, setLoading] = useState(false);

//   const handleOnOk = async () => {
//     try {
//       setLoading(true);
//       await onOk?.();
//     } finally {
//       setLoading(false);
//       close?.();
//     }
//   };
//   const handleCancel = () => {
//     onCancel?.();
//     close?.();
//   };
//   return (
//     <Modal
//       {...props}
//       visible
//       baseId="confirm"
//       closableButton={false}
//       className={cx('confirm-dialog')}
//       closable={false}
//     >
//       <div className={cx(styles.content)}>
//         <span>{content}</span>
//       </div>
//       <div className={cx(styles['actions-wrap'])}>
//         <div className={cx(styles.actions)}>
//           <GhostButton onClick={handleCancel}>No</GhostButton>
//           <PrimaryButton
//             loading={loading}
//             disabled={loading}
//             onClick={handleOnOk}
//           >
//             Yes
//           </PrimaryButton>
//         </div>
//       </div>
//     </Modal>
//   );
// };
