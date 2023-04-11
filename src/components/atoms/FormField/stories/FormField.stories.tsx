import type { Meta, StoryObj } from '@storybook/react';
// import '../../../../theme/index.css';

import { FormField } from '..';
import { Input } from '../../../atoms/Input';
import { Switch } from '../../../atoms/Switch';
import { Radio, RadioGroup } from '../../../atoms/Radio';
import { Checkbox } from '../../../atoms/Checkbox';
import { Select } from '../../../molecules/Select';
import { DatePicker } from '../../../molecules/Datepicker';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Forms/FormField',
  component: FormField,
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledComponent = () => {
  return (
    <form>
      <FormField name="email" label="Email">
        <Input />
      </FormField>
      <FormField
        value="Username"
        onChange={(value) => console.log(value, 'username')}
        name="username"
        label="Username"
        error="required"
      >
        <Input />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, 'password')}
        name="password"
        label="Password"
        error="required"
      >
        <Input.Password />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, 'textarea')}
        name="textarea"
        label="Description"
        error="required"
      >
        <Input.TextArea />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, 'radiogroup')}
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
        onChange={(value) => console.log(value, 'checkbox')}
        name="checkbox"
        label="Checkbox"
        error="required"
      >
        <Checkbox value="name" label="Today" />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, 'switch')}
        name="switch"
        label="Switch"
        error="required"
      >
        <Switch />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, 'select')}
        name="select"
        label="Select"
        error="required"
      >
        <Select
          menu={[
            {
              id: 'text',
              label: 'Jack',
            },

            {
              id: 'alex',
              label: 'Alex',
            },
          ]}
        />
      </FormField>
      <FormField
        onChange={(value) => console.log(value, 'DatePicker')}
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
