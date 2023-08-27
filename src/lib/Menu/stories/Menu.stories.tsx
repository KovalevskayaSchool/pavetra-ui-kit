import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CalendarOutline, SunOutline } from "@kovalevskayaschool/pavetra-icons";

import { Menu } from "..";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "DateView/Menu",
  component: Menu,
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledComponent = () => {
  const [value, setValue] = useState("test-2");

  function handleChange(value: string) {
    console.log("menu onChange", value);
    setValue(value);
  }

  return (
    <div
      style={{
        height: 300,
      }}
    >
      <div
        style={{
          marginTop: 100,
        }}
      >
        <Menu
          label="Controlled"
          selectedKey={value}
          onChange={handleChange}
          className="test"
          menu={[
            { id: "test-1", label: "Profile", icon: <SunOutline /> },
            { id: "test-2", label: "Settings", icon: <CalendarOutline /> },
            { id: "test-3", label: "Schedule", disabled: true },
            { type: "divider" },
            {
              id: "test-4",
              label: <div onClick={() => console.log("PROFILE")}>Профиль</div>,
            },
            {
              id: "test-5",
              disabled: true,
              label: (
                <a href="#" onClick={() => console.log("PROFILE")}>
                  Link
                </a>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: ControlledComponent,
};

export const Horizontal: Story = {
  args: {
    mode: "horizontal",
    menu: [
      { id: "test-1", label: "Test 1" },
      { id: "test-2", label: "Test 2" },
      { id: "test-3", label: "Test 4" },
    ],
  },
};

export const Listbox: Story = {
  args: {
    type: "listbox",
    menu: [
      { id: "test-1", label: "Test 1" },
      { id: "test-2", label: "Test 2" },
      { id: "test-3", label: "Test 4" },
    ],
  },
};
