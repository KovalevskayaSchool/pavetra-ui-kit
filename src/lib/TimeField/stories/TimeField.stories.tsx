import { useState } from "react";
import { Time } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react";

import { TimeField } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Date/TimeField",
  component: TimeField,
  tags: ["autodocs"],
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledComponent = () => {
  const [value, setValue] = useState(new Time(10, 30));

  return (
    <div
      style={{
        height: 600,
      }}
    >
      <div
        style={{
          marginTop: 100,
        }}
      >
        <TimeField
          aria-label="Controlled"
          value={value}
          onChange={(time) => setValue(time)}
        />
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    "aria-label": "Default",
  },
};

export const Controlled: Story = {
  render: ControlledComponent,
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    "aria-label": "Disabled",
  },
};

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    value: new Time(14, 30),
    "aria-label": "ReadOnly",
  },
};
