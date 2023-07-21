import { useState } from "react";
import { addDays } from "date-fns";
import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker, PickerDay } from "..";
import { Button } from "../../Button";
import isToday from "date-fns/isToday";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "DateView/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledComponent = () => {
  const [value, setValue] = useState<Date | null>(addDays(new Date(), 3));

  function handleChange(value: PickerDay) {
    setValue(value.date);
    console.log(value.date);
  }

  return (
    <div
      style={{
        marginTop: 50,
      }}
    >
      <DatePicker
        value={value}
        onChange={handleChange}
        renderCell={(date, label) => (isToday(date) ? <div>today</div> : label)}
      />
      <Button onClick={() => setValue(null)}>Reset</Button>
    </div>
  );
};

export const Controlled: Story = {
  render: ControlledComponent,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Inline: Story = {
  args: {
    inline: true,
  },
};

export const Clear: Story = {
  args: {
    allowClear: true,
  },
};
