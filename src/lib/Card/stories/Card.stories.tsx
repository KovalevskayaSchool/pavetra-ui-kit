import type { Meta, StoryObj } from "@storybook/react";
import { CalendarOutline } from "@symblight/pavetra-icons";

import { Card } from "..";
import { Avatar, Button } from "../..";

const imageSrc =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Rembrandt_Self-portrait_%28Kenwood%29.jpg/800px-Rembrandt_Self-portrait_%28Kenwood%29.jpg";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Views/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {},
  render: () => {
    return (
      <>
        <Card>content</Card>
      </>
    );
  },
};

export const WithTitle: Story = {
  args: {},
  render: () => {
    return (
      <>
        <Card title="My teacher">
          <Avatar imageSrc={imageSrc} shape="circle" />
          <div>Contacts</div>
        </Card>
        <Card title="My teacher" icon={<CalendarOutline />}>
          <Avatar imageSrc={imageSrc} shape="circle" />
          <div>Contacts</div>
        </Card>
        <Card
          title="My teacher"
          icon={<CalendarOutline />}
          action={<Button variant="ghost">Open</Button>}
        >
          <Avatar imageSrc={imageSrc} shape="circle" />
          <div>Contacts</div>
        </Card>
      </>
    );
  },
};
