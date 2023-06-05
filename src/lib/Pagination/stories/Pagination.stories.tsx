import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from '..';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'Data/Pagination',
    component: Pagination,
    tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        total: 100,
    },
};

export const NoPagination: Story = {
    args: {
        total: 5,
    },
};




