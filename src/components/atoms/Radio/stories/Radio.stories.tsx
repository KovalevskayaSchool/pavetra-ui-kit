import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
// import '../../../../theme/index.css'

import { Radio, RadioGroup } from '..';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'Controls/Radio',
    component: Radio,
    tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
    args: {
        label: "Radio",
        value: 'Test'
    },
};

export const Disabled: Story = {
    args: {
        label: "Radio",
        isDisabled: true,
        value: 'Test'
    },
};


const ControlledComponent = () => {
    const [value, setValue] = useState('')

    function handleChange(value: string) {
        setValue(value)
    }

    return (
    <RadioGroup value={value} onChange={handleChange} >
        <Radio value='Yes' label="Yes" />
        <Radio value='No' label="No" />
    </RadioGroup>
    )
}


export const Group: Story = {
    render: ControlledComponent
};


