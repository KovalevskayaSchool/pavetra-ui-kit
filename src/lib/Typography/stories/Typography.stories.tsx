
import type { Meta, StoryObj } from '@storybook/react';
import './test.css'

import { Typography } from '..';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'Typography',
    component: Typography,
    tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Title: Story = {
    render: () => (
        <>
            <Typography.Title level={1}>Level 1</Typography.Title>
            <Typography.Title level={2}>Level 2</Typography.Title>
            <Typography.Title level={3}>Level 3</Typography.Title>
            <Typography.Title level={4}>Level 4</Typography.Title>
        </>
    )
};


export const Caption: Story = {
    render: () => (
        <>
            <Typography.Caption className='test-caption'>styled Caption</Typography.Caption>
            <Typography.Caption>Caption</Typography.Caption>
        </>
    )
};


export const Paragraph: Story = {
    render: () => (
        <>
            <Typography.Paragraph>Paragraph</Typography.Paragraph>
        </>
    )
};
