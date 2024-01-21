import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "..";

const meta = {
  title: "Controls/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
    },
    isSelected: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    label: "Checkbox",
  },
};

export const Disabled: Story = {
  args: {
    label: "Checkbox",
    disabled: true,
  },
};

const ControlledComponent = () => {
  const [checked, setChecked] = useState(true);

  function handleChange(isSelected: boolean) {
    setChecked(isSelected);
  }

  return (
    <Checkbox label="Controlled" isSelected={checked} onChange={handleChange} />
  );
};

export const Controlled: Story = {
  render: ControlledComponent,
};
