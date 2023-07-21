import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Views/Box",
  component: Box,
  tags: ["autodocs"],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ background: "#e9e39e", padding: "30px" }}>
        <Box>content</Box>
      </div>
    );
  },
};

export const As: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ background: "#e9e39e", padding: "30px" }}>
        <Box as="main">content</Box>
      </div>
    );
  },
};
