import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ListBox } from '..';
import { useSelect } from 'react-aria';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Controls/ListBox',
  component: ListBox,
  tags: ['autodocs'],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledComponent = () => {
  // const { triggerProps, menuProps } = useSelect(
  //   {
  //     ...props,
  //     ...propsWithChildren,
  //     isDisabled: disabled,
  //     items: menu,
  //     "aria-label": ariaLabel || "select",
  //   },
  //   state,
  //   triggerRef
  // );

  //   return <ListBox state={}  />
}


// export const Default: Story = {
//   render: ControlledComponent
// };
