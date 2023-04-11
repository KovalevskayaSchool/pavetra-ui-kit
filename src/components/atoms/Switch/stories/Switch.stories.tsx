import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
// import '../../../../theme/index.css'

import { Switch } from '..';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'Controls/Switch',
    component: Switch,
    tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
    args: {
        label: "Switch",
    },
};

export const Text: Story = {
    args: {
        disagreeText: "disagreeText",
        agreeText: "agreeText"
    },
};

export const Disabled: Story = {
    args: {
        isDisabled: true,
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
    },
};

const ControlledComponent = () => {
    const [value, setValue] = useState(false)

    function handleChange(isSelected: boolean) {
        setValue(isSelected)
    }

    return (
        <Switch isSelected={value} onChange={handleChange} />
    )
}


export const Controlled: Story = {
    render: ControlledComponent
};


