import { List } from './List';
import type { MenuProps as MenuBaseProps } from './List';
import { Item } from './Item';

export type SelectMenuProps = typeof List & {
  Item: typeof Item;
};

const SelectMenu = List as SelectMenuProps;

Item.displayName = 'Item';
SelectMenu.displayName = 'Menu';

SelectMenu.Item = Item;

export { SelectMenu };
export type { MenuBaseProps };
export type { MenuItemProps } from './Menu';
