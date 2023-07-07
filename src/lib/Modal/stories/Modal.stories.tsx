import type { Meta, StoryObj } from "@storybook/react";

import { Modal, useModal } from "..";
import { Button } from "../../Button";
import { Input } from "../../Input";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Controls/Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledComponent = () => {
  const modal = useModal();

  function handleOpen() {
    modal.state.open({ test: "value" });
  }

  return (
    <>
      <Button {...modal.triggerProps} onClick={handleOpen}>
        Show modal
      </Button>
      <Button {...modal.triggerProps} onClick={() => modal.state.close()}>
        Close
      </Button>
      <Modal
        {...modal.modalProps}
        headerLabel="Test modal state"
        isDismissable
        state={modal.state}
        onClose={() => modal.state.close()}
      >
        <div>
          <form>
            <Input value={modal.data?.test} />
            <Button variant="primary">Submit</Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: ControlledComponent,
};
