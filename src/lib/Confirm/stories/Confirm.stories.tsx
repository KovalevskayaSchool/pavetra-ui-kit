import type { Meta, StoryObj } from "@storybook/react";

import { confirmDialog } from "..";
import { Confirm } from "../Confirm";
import { Button } from "../../Button";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Controls/Confirm",
  component: Confirm,
  tags: ["autodocs"],
} satisfies Meta<typeof Confirm>;

export default meta;
type Story = StoryObj<typeof meta>;

function ConfirmToggle() {
  return (
    <Button
      onClick={() =>
        confirmDialog({
          title: 'Do you Want to delete these items?',
          content: "Some descriptions",
          onOk() {
            console.log("OK");
          },
          onCancel() {
            console.log("Cancel");
          },
        })
      }
    >
      Open
    </Button>
  );
}

export const Default: Story = {
  args: {},
  render: ConfirmToggle,
};

function ConfirmProps() {
  const onFetch = () => new Promise((res) => setTimeout(() => res('Ok'), 500))
  return (
    <Button
      onClick={() =>
        confirmDialog({
          title: 'Danger?',
          content: "Some descriptions",
          okType: 'danger',
          okText: 'Yes',
          close: (e) => console.log('close', e),
          onOk() {
            return onFetch()
          },
          onCancel() {
            console.log("Cancel");
          },
        })
      }
    >
      Open
    </Button>
  );
}

export const Danger: Story = {
  args: {},
  render: ConfirmProps,
};

function ConfirmTitle() {
  const onFetch = () => new Promise((res) => setTimeout(() => res('Ok'), 500))
  return (
    <Button
      onClick={() =>
        confirmDialog({
          title: 'Without title?',
          onOk() {
            return onFetch()
          },
          onCancel() {
            console.log("Cancel");
          },
        })
      }
    >
      Open
    </Button>
  );
}

export const Title: Story = {
  args: {},
  render: ConfirmTitle,
};
