import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CalendarOutline, SunOutline } from "@symblight/pavetra-icons";
import { Input } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Controls/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {},
};

// export const Disabled: Story = {
//     args: {
//         label: "Checkbox",
//         disabled: true
//     },
// };

const ControlledComponent = () => {
  const [value, setValue] = useState("");

  function handleChange(value: string) {
    setValue(value);
  }

  console.log({ value });

  return <Input label="Controlled" value={value} onChange={handleChange} />;
};

export const Controlled: Story = {
  render: ControlledComponent,
};

export const SuffixAndPrefix: Story = {
  args: {
    suffix: <SunOutline />,
    prefix: <CalendarOutline />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Input size="small" defaultValue="small" />
      <Input size="medium" defaultValue="medium" />
      <Input size="large" defaultValue="large" />
    </>
  ),
};

export const Password: Story = {
  render: () => (
    <>
      <Input.Password defaultValue="longpassword" />
    </>
  ),
};

export const TextArea: Story = {
  render: () => (
    <>
      <Input.TextArea />
    </>
  ),
};
