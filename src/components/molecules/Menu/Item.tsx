import { cloneElement, FC, isValidElement, useRef } from 'react';
import cn from 'classnames';
import type { Node } from '@react-types/shared';
import type { ListState } from 'react-stately';
import { useFocusRing, useOption, mergeProps } from 'react-aria';

import { type MenuItemProps as MenuItemElProps } from './Menu.d';

export interface MenuItemProps {
  className?: string;
  state: ListState<MenuItemElProps>;
  item: Node<MenuItemElProps>;
}

export const Item: FC<MenuItemProps> = ({
  className,
  state,
  item,
  ...props
}) => {
  state.collection.getItem(item.key);
  const ref = useRef<HTMLLIElement | null>(null);
  const refLink = useRef<HTMLLinkElement | null>(null);
  const { isFocusVisible, focusProps } = useFocusRing();
  const label = !isValidElement(item.rendered) ? item.rendered?.toString() : '';
  const { optionProps, isDisabled, isSelected } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  const classNames = cn(className, 'ks-menu__item', {
    ['ks-menu__item--selected']: isSelected,
    ['ks-menu__item--active']: isFocusVisible,
    ['ks-menu__item--disabled']: isDisabled,
  });

  const renderChildren = () => {
    if (isValidElement(item.rendered)) {
      return cloneElement(item.rendered as React.ReactComponentElement<any>, {
        ref: refLink,
      });
    }
    return item.rendered;
  };

  return (
    <li
      ref={ref}
      {...props}
      {...mergeProps(optionProps, focusProps)}
      className={cn(classNames)}
      title={label}
    >
      <div className="ks-menu-item__wrapper">
        <div className="ks-menu-item__content">
          {item.props.icon && (
            <div className="ks-menu-item__icon" data-icon="left" role="img">
              {item.props.icon}
            </div>
          )}
          <span className="ks-menu-item__label-container">
            {renderChildren()}
          </span>
        </div>
      </div>
    </li>
  );
};
