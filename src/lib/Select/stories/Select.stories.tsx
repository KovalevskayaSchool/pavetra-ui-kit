import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Select } from '..';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'DateView/Select',
    component: Select,
    tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledComponent = () => {
    const [value, setValue] = useState('test-2')

    function handleChange(value: string, item) {
        console.log('change', {value, item})
        setValue(value)
    }

    return (
        <div style={{
            height: 600,
        }}>
            <div style={{
                marginTop: 100
            }}>
                <Select
                    label="Controlled"
                    value={value}
                    onOpenChange={(isOpen) => console.log('onOpenChange', isOpen)}
                    onChange={handleChange}
                    menu={[
                        { id: 'test-1', label: 'Test 1', },
                        { id: 'test-2', label: 'Test 2' },
                        { id: 'test-3', label: 'Test 3', disabled: true },
                        { id: 'test-4', label: 'Test 4' }
                    ]}
                />
            </div>
        </div>
    )
}


export const Controlled: Story = {
    render: ControlledComponent
};


export const Loading: Story = {
    args: {
        loading: true,
        menu: [
            { id: 'test-1', label: 'Test 1', },
            { id: 'test-2', label: 'Test 2' },
            { id: 'test-3', label: 'Test 4' }
        ]
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        menu: [
            { id: 'test-1', label: 'Test 1', },
            { id: 'test-2', label: 'Test 2' },
            { id: 'test-3', label: 'Test 4' }
        ]
    },
};


export const Clear: Story = {
    args: {
        allowClear: true,
        menu: [
            { id: 'test-1', label: 'Test 1', },
            { id: 'test-2', label: 'Test 2' },
            { id: 'test-3', label: 'Test 4' }
        ]
    },
};

export const Empty: Story = {
    args: {
        menu: [],
        onClick:() => console.log('onClick'),
        onOpenChange:() => console.log('onOpenChange')
    },
};