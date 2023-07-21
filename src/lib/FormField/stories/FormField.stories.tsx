import type { Meta, StoryObj } from "@storybook/react";

import { FormField } from "..";
import { Input } from "../../Input";
import { Switch } from "../../Switch";
import { Radio, RadioGroup } from "../../Radio";
import { Checkbox } from "../../Checkbox";
import { Select } from "../../Select";
import { DatePicker } from "../../Datepicker";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Forms/FormField",
  component: FormField,
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledComponent = () => {
  const [username, setUsername] = useState<any>("");
  return (
    <form>
      {/* <FormField name="email" label="Email">
        <Input />
      </FormField> */}
      <FormField
        name="username"
        onChange={(value) => setUsername(value)}
        value={username}
        label="Username"
        error="required"
      >
        <Input />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, "password")}
        name="password"
        label="Password"
        error="required"
      >
        <Input.Password />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, "textarea")}
        name="textarea"
        label="Description"
        error="required"
      >
        <Input.TextArea />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, "radiogroup")}
        name="mode"
        label="Mode"
        error="required"
      >
        <RadioGroup>
          <Radio value="name" label="Name" />
          <Radio value="gender" label="Gender" />
        </RadioGroup>
      </FormField>
      <FormField
        onChange={(value) => console.log(value, "checkbox")}
        name="checkbox"
        label="Checkbox"
        error="required"
      >
        <Checkbox value="name" label="Today" />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, "switch")}
        name="switch"
        label="Switch"
        error="required"
      >
        <Switch />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, "select")}
        name="select"
        label="Select"
        error="required"
      >
        <Select
          menu={[
            {
              id: "text",
              label: "Jack",
            },

            {
              id: "alex",
              label: "Alex",
            },
          ]}
        />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, "DatePicker")}
        value={new Date()}
        name="DatePicker"
        label="DatePicker"
        error="required"
      >
        <DatePicker />
      </FormField>
    </form>
  );
};

export const Controlled: Story = {
  render: ControlledComponent,
};
