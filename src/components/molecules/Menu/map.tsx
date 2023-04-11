import { isValidElement } from 'react';
import { Item, Section } from 'react-stately';

import { type MenuItemProps } from './Menu.d';

export function getTextValue(item: MenuItemProps) {
  if (!isValidElement(item.label) && item.label) {
    return item.label?.toString();
  }

  if (item.id) {
    return item.id;
  }

  if (item.type) {
    return item.type;
  }

  return 'Item';
}

export const mapToAriaSectionProps = (
  menuBlocks: any[],
  ariaLabel: string
) => ({
  'aria-label': ariaLabel,
  'children': menuBlocks.map(({ id, ariaLabel: sectionLabel, menuItems }) => (
    <Section title={id} key={id} aria-label={sectionLabel}>
      {menuItems.map(({ id: itemId, title }) => (
        <Item key={itemId}>{title}</Item>
      ))}
    </Section>
  )),
});

export const mapToAriaProps = (
  menuItems: MenuItemProps[],
  ariaLabel: string
) => ({
  'aria-label': ariaLabel,
  'children': menuItems.map((props) => {
    const textValue = getTextValue(props);
    return (
      <Item textValue={textValue} key={props.id} {...props}>
        {props.label}
      </Item>
    );
  }),
});
