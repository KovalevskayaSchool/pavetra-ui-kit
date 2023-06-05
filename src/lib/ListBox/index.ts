import { ListBox as List } from './ListBox';
import type { MenuProps as MenuBaseProps } from './ListBox';
import { Item } from './Item';

export type SelectMenuProps = typeof List & {
  Item: typeof Item;
};

const ListBox = List as SelectMenuProps;

Item.displayName = 'ListBoxItem';
ListBox.displayName = 'ListBox';

ListBox.Item = Item;

export { ListBox };
export type { MenuBaseProps };
export type { MenuItemProps } from './Menu';
