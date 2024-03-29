import type { Meta, StoryObj } from "@storybook/react";
import {
  SunOutline,
  CalendarOutline,
  CloseOutline,
} from "@symblight/pavetra-icons";

import { Button } from "..";

const meta = {
  title: "Controls/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "secondary", "inline", "ghost", "link"],
      control: { type: "select" },
    },
    danger: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    rounded: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: {
    variant: "primary",
  },
  render: (props) => {
    return (
      <>
        <Button {...props}>Primary button</Button>
      </>
    );
  },
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Variants: Story = {
  args: {},
  render: () => {
    function handleClick() {
      console.log(111, "onClick");
    }
    return (
      <>
        <Button onClick={handleClick} variant="primary">
          Primary button
        </Button>
        <Button variant="inline">InlineButton</Button>
        <Button variant="secondary">SecondaryButton</Button>
        <Button variant="ghost">GhostButton</Button>
        <Button variant="link">LinkButton</Button>
      </>
    );
  },
};

export const size: Story = {
  render: () => {
    return (
      <>
        <Button variant="primary" size="small" icon={<SunOutline />}>
          Small
        </Button>
        <Button variant="primary" icon={<SunOutline />}>
          Medium
        </Button>
        <Button variant="primary" size="large" icon={<SunOutline />}>
          Large
        </Button>
        <Button
          variant="primary"
          rounded
          size="small"
          icon={<CloseOutline />}
        />
        <Button variant="primary" rounded icon={<CloseOutline />} />
        <Button
          variant="primary"
          rounded
          size="large"
          icon={<CloseOutline />}
        />
      </>
    );
  },
};

export const withLoading: Story = {
  render: () => {
    return (
      <>
        <Button loading variant="primary">
          Primary button
        </Button>
        <Button loading variant="inline">
          InlineButton
        </Button>
        <Button loading variant="ghost">
          GhostButton
        </Button>
        <Button loading variant="secondary">
          SecondaryButton
        </Button>
        <Button loading variant="link">
          LinkButton
        </Button>
      </>
    );
  },
};

export const disabled: Story = {
  render: () => {
    return (
      <>
        <Button disabled variant="primary">
          Primary button
        </Button>
        <Button disabled variant="inline">
          InlineButton
        </Button>
        <Button disabled variant="ghost">
          GhostButton
        </Button>
        <Button disabled variant="secondary">
          SecondaryButton
        </Button>
        <Button disabled variant="link">
          LinkButton
        </Button>
      </>
    );
  },
};

export const withIcons: Story = {
  render: () => {
    return (
      <>
        <Button variant="primary" icon={<SunOutline />}>
          Primary button
        </Button>
        <Button variant="primary" icon={<SunOutline />} />
        <Button variant="primary" rounded icon={<CloseOutline />} />
        <Button variant="inline" icon={<CalendarOutline />}>
          InlineButton
        </Button>
      </>
    );
  },
};

export const shape: Story = {
  render: () => {
    return (
      <>
        <Button variant="primary">Default button</Button>
        <Button variant="primary" rounded>
          Rounded button
        </Button>
      </>
    );
  },
};

export const Danger: Story = {
  render: () => {
    return (
      <>
        <Button variant="primary" danger icon={<SunOutline />}>
          Primary button
        </Button>
        <Button variant="primary" danger icon={<SunOutline />} />
        <Button variant="primary" danger rounded icon={<CloseOutline />} />
        <Button variant="inline" danger icon={<CalendarOutline />}>
          InlineButton
        </Button>
      </>
    );
  },
};

export const Link: Story = {
  render: () => {
    return (
      <>
        <Button href="#" variant="primary">
          Link button
        </Button>
        <Button href="#" variant="link">
          Link button
        </Button>
      </>
    );
  },
};
