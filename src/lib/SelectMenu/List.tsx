import { forwardRef } from 'react';

import cn from 'classnames';
import { SelectState } from 'react-stately';
import { useListBox, AriaListBoxOptions } from 'react-aria';

import { Item } from './Item';
import { SeperatorItem } from './SeperatorItem';
import { type MenuItemProps } from './Menu';
import { useDOMRef } from '../../utils/useDomRef';
import './SelectMenu.css';

export interface MenuProps extends AriaListBoxOptions<MenuItemProps> {
  className?: string;
  state: SelectState<MenuItemProps>;
}

export const List = forwardRef<HTMLUListElement, MenuProps>(
  (
    {
      className,
      disallowEmptySelection,
      shouldSelectOnPressUp,
      state,
      ...props
    },
    refForwarded
  ) => {
    const listBoxRef = useDOMRef(refForwarded);

    const { listBoxProps } = useListBox(
      {
        ...props,
        disallowEmptySelection,
        shouldSelectOnPressUp,
      },
      state,
      listBoxRef
    );

    const renderItems = () =>
      [...Array.from(state.collection)]?.map((item) =>
        item.props.type === 'divider' ? (
          <SeperatorItem key={item.key} />
        ) : (
          <Item state={state} key={item.key} item={item} />
        )
      );

    return (
      <ul
        ref={listBoxRef}
        {...listBoxProps}
        className={cn('ks-listbox', className)}
      >
        {renderItems()}
      </ul>
    );
  }
);
