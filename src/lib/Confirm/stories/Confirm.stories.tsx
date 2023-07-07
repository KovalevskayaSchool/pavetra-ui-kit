import type { Meta, StoryObj } from "@storybook/react";

import { confirmDialog } from "..";
import { Confirm } from "../Confirm";
import { Button } from "../../Button";
import {Radio, RadioGroup} from "../../"
import { useState } from "react";

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
          title: "Do you Want to delete these items?",
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
  const onFetch = () => new Promise((res) => setTimeout(() => res("Ok"), 500));
  return (
    <Button
      onClick={() =>
        confirmDialog({
          title: "Danger?",
          okType: "danger",
          okText: "Yes",
          close: (e) => console.log("close", e),
          onOk() {
            return onFetch();
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

function TestContent({ onChange, value }) {
  return (
    <RadioGroup onChange={onChange} value={value} label="test">
      <Radio value="all" label="All" />
      <Radio value="single" label="single" />
    </RadioGroup>
  );
}

function ConfirmContentProps() {
  const onFetch = () => new Promise((res) => setTimeout(() => res("Ok"), 500));
  const [value, setValue] = useState("single");
  return (
    <Button
      onClick={() =>
        confirmDialog({
          title: "Danger?",
          content: () => <TestContent value={value} onChange={setValue} />,
          okType: "danger",
          okText: "Yes",
          close: (e) => console.log("close", e),
          onOk() {
            console.log({ value });
            return onFetch();
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

export const StateContent: Story = {
  args: {},
  render: ConfirmContentProps,
};

function ConfirmTitle() {
  const onFetch = () => new Promise((res) => setTimeout(() => res("Ok"), 500));
  return (
    <Button
      onClick={() =>
        confirmDialog({
          title: "Without title?",
          onOk() {
            return onFetch();
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
