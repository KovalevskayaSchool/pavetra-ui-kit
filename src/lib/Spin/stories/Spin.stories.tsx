import type { Meta, StoryObj } from "@storybook/react";

import { Spin } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Views/Spin",
  component: Spin,
  tags: ["autodocs"],
} satisfies Meta<typeof Spin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "large",
  },
};

export const Size: Story = {
  render: () => (
    <>
      <Spin size="small" />
      <Spin size="default" />
      <Spin size="large" />
    </>
  ),
};
