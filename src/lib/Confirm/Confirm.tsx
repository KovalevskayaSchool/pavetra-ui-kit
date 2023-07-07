import ReactDOM from "react-dom/client";
import { useState } from "react";

import { Modal, useModal } from "../Modal";
import { Button } from "../";
import "./Confirm.css";

export interface ConfirmFuncProps {
  onClose?: () => void;
  close?: Function;
  content?: React.ReactNode | string | Function;
  footer?: React.ReactNode | Function;
  onOk?: Function;
  onCancel?: Function;
  title?: string;
  okText?: string;
  cancelText?: string;
  okType?: "regular" | "danger";
}

export const confirmDialog = (props: ConfirmFuncProps) =>  {
  const div = document.createElement("div");

  const root = ReactDOM.createRoot(div);
  document.body.appendChild(div);

  function destroy(...args: any[]) {
    root.unmount();
    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function close() {
    destroy();
  }
  function render({ ...props }: any) {
    root.render(<Confirm {...props} onClose={close} />);
  }
  render(props);
  return {
    close,
  };
}

export const Confirm = ({
  onClose,
  close,
  content,
  footer,
  onOk,
  onCancel,
  title,
  okText = "Ok",
  cancelText = "Cancel",
  okType = "regular",
}: ConfirmFuncProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const modal = useModal({
    defaultOpen: true,
  });

  function onInternalClose(...args) {
    close?.(...args);
    modal.state.close();
  }

  function handleAction() {
    const returnValueOfOnOk = onOk?.();
    const isThenable = returnValueOfOnOk?.then;
    if (isThenable) {
      setIsLoading(true);
      returnValueOfOnOk.then(
        (...args: any[]) => {
          setIsLoading(false);
          onInternalClose(...args);
        },
        (e: Error) => {
          setIsLoading(false);
          return Promise.reject(e);
        }
      );
    } else {
      onInternalClose();
    }
  }

  function handleCancel() {
    onCancel?.();
    onInternalClose();
  }

  const contentComponent = typeof content === "function" ? content() : content;
  const footerComponent = typeof footer === "function" ? footer() : footer;

  return (
    <Modal
      {...modal}
      onClose={onClose}
      headerLabel={title}
      closableButton={false}
    >
      <div className="confirm__modal">
        {contentComponent ? (
          <div className="confirm__content">{contentComponent}</div>
        ) : null}
        {!footerComponent ? (
          <div className="confirm__actions">
            <Button variant="ghost" onClick={handleCancel}>
              {cancelText}
            </Button>
            <Button
              loading={isLoading}
              danger={okType === "danger"}
              variant="primary"
              onClick={handleAction}
            >
              {okText}
            </Button>
          </div>
        ) : (
          footerComponent
        )}
      </div>
    </Modal>
  );
}
