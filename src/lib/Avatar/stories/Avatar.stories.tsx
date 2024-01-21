import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Views/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
    },
    imageSrc: {
      control: { type: "text" },
    },
    shape: {
      options: ["circle", "rect"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageSrc =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Rembrandt_Self-portrait_%28Kenwood%29.jpg/800px-Rembrandt_Self-portrait_%28Kenwood%29.jpg";

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    size: "large",
    imageSrc,
  },
};

export const Sizes: Story = {
  render: () => (
    <>
      <Avatar imageSrc={imageSrc} size="small" />
      <Avatar imageSrc={imageSrc} size="medium" />
      <Avatar imageSrc={imageSrc} size="large" />
    </>
  ),
};

export const Shape: Story = {
  render: () => (
    <>
      <Avatar imageSrc={imageSrc} shape="circle" />
      <Avatar imageSrc={imageSrc} shape="rect" />
    </>
  ),
};
