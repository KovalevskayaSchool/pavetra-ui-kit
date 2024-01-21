import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "..";
import { Avatar } from "../../Avatar";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Views/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "number" },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageSrc =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Rembrandt_Self-portrait_%28Kenwood%29.jpg/800px-Rembrandt_Self-portrait_%28Kenwood%29.jpg";

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    count: 5,
  },
  render: ({ count }) => (
    <Badge count={count}>
      <Avatar imageSrc={imageSrc} size={35} />
    </Badge>
  ),
};
