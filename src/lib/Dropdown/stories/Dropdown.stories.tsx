import { forwardRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Dropdown } from "..";
import { Button } from "../../Button";
import { BookOutline } from "@kovalevskayaschool/pavetra-icons";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "DateView/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const LinkComponent = forwardRef((props, ref) => {
  function handleClick(e) {
    console.log(e, "click");
  }

  return (
    <div ref={ref} {...props}>
      <div>Child component</div>
    </div>
  );
});

const ControlledComponent = () => {
  const [value, setValue] = useState("test-2");

  function handleChange(value: string) {
    setValue(value);
  }

  return (
    <div
      style={{
        height: 400,
        width: 200,
      }}
    >
      <div
        style={{
          marginTop: 50,
        }}
      >
        <Dropdown
          label="Controlled"
          value={value}
          onChange={handleChange}
          menu={[
            { id: "test-1", label: "1st element of menu" },
            { id: "test-2", label: "2st element of menu" },
            { id: "test-3", label: "3st element of menu", disabled: true },
            { id: "test-6", label: <LinkComponent>router link</LinkComponent> },
            { type: "divider" },
            {
              id: "test-x",
              label: "4st element of menu with icon",
              icon: <BookOutline />,
            },
            { type: "divider" },
            { id: "test-4", label: "5st element of menu" },
            {
              id: "test-5",
              label: (
                <a href="https://chat.openai.com">6st link element of menu</a>
              ),
            },
          ]}
        >
          <Button>Click on me!</Button>
        </Dropdown>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: ControlledComponent,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    menu: [
      { id: "test-1", label: "Test 1" },
      { id: "test-2", label: "Test 2" },
      { id: "test-3", label: "Test 4" },
    ],
    children: <Button>Click on me!</Button>,
  },
};

const CustomComponent = () => {
  return (
    <div
      style={{
        height: 400,
        width: 200,
      }}
    >
      <div
        style={{
          marginTop: 50,
        }}
      >
        <Dropdown
          label="Controlled"
          menu={[
            { id: "test-1", label: "1st element of menu" },
            { id: "test-2", label: "2st element of menu" },
            { id: "test-3", label: "3st element of menu", disabled: true },
            { type: "divider" },
            {
              id: "test-x",
              label: "4st element of menu with icon",
              icon: <BookOutline />,
            },
            { type: "divider" },
            { id: "test-4", label: "5st element of menu" },
            {
              id: "test-5",
              label: (
                <a href="https://chat.openai.com">6st link element of menu</a>
              ),
            },
          ]}
          dropdownRender={(menu) => (
            <div>
              <div>header</div>
              {menu}
            </div>
          )}
        >
          <Button>Click on me!</Button>
        </Dropdown>
      </div>
    </div>
  );
};

export const customRenderDropdown: Story = {
  render: CustomComponent,
};
