import type { Meta, StoryObj } from '@storybook/react';
import { SunOutline, CalendarOutline, CloseOutline } from '@kovalevskayaschool/pavetra-icons'

import { Button } from '..';


// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Controls/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Variants: Story = {
  args: {

  },


  render: () => {
    function handleClick() {
      console.log(111, 'onClick')
    }
    return (
      <>
        <Button onClick={handleClick} variant='primary'>Primary button</Button>
        <Button variant='inline'>InlineButton</Button>
        <Button variant='secondary'>SecondaryButton</Button>
        <Button variant='ghost'>GhostButton</Button>
        <Button variant='link'>LinkButton</Button>
      </>
    )
  }
};

export const withLoading: Story = {
  render: () => {
    return (
      <>
        <Button loading variant='primary'>Primary button</Button>
        <Button loading variant='inline'>InlineButton</Button>
        <Button loading variant='ghost'>GhostButton</Button>
        <Button loading variant='secondary'>SecondaryButton</Button>
        <Button loading variant='link'>LinkButton</Button>
      </>
    )
  }
};

export const disabled: Story = {
  render: () => {
    return (
      <>
        <Button disabled variant='primary'>Primary button</Button>
        <Button disabled variant='inline'>InlineButton</Button>
        <Button disabled variant='ghost'>GhostButton</Button>
        <Button disabled variant='secondary'>SecondaryButton</Button>
        <Button disabled variant='link'>LinkButton</Button>
      </>
    )
  }
};

export const withIcons: Story = {
  render: () => {
    return (
      <>
        <Button variant='primary' icon={<SunOutline />}>Primary button</Button>
        <Button variant='primary' icon={<SunOutline />} />
        <Button variant='primary' rounded icon={<CloseOutline />} />
        <Button variant='inline' icon={<CalendarOutline />}>InlineButton</Button>
      </>
    )
  }
};

export const shape: Story = {
  render: () => {
    return (
      <>
        <Button variant='primary'>Default button</Button>
        <Button variant='primary' rounded>Rounded button</Button>
      </>
    )
  }
};


export const Danger: Story = {
  render: () => {
    return (
      <>
        <Button variant='primary' danger icon={<SunOutline />}>Primary button</Button>
        <Button variant='primary' danger icon={<SunOutline />} />
        <Button variant='primary' danger rounded icon={<CloseOutline />} />
        <Button variant='inline'  icon={<CalendarOutline />}>InlineButton</Button>
      </>
    )
  }
};

export const Link: Story = {
  render: () => {
    return (
      <>
        <Button href='#' variant='primary'>Link button</Button>
        <Button href='#' variant='link'>Link button</Button>
      </>
    )
  }
};


