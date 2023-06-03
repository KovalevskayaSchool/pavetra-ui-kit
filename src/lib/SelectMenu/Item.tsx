import { cloneElement, FC, isValidElement, useRef } from 'react';
import cn from 'classnames';
import type { Node } from '@react-types/shared';
import type { ListState } from 'react-stately';
import { useFocusRing, useOption, mergeProps, usePress } from 'react-aria';

import { type MenuItemProps as MenuItemElProps } from './Menu';

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

  const { pressProps } = usePress({
    onPressStart: (e) => {
      if (refLink.current && refLink.current.tagName === 'A') {
        const el = refLink.current;
        el.click();
      }
    },
    shouldCancelOnPointerExit: false,
    allowTextSelectionOnPress: true,
    preventFocusOnPress: true,
  });

  const classNames = cn(className, 'ks-listbox__item', {
    ['ks-listbox__item_selected']: isSelected,
    ['ks-listbox__item_active']: isFocusVisible,
    ['ks-listbox__item_disabled']: isDisabled,
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
      {...mergeProps(optionProps, pressProps, focusProps)}
      className={classNames}
      title={label}
    >
      <div className="ks-listbox__item-content">
        {item.props.icon && (
          <div className="ks-listbox__item-icon" data-icon="left" role="img">
            {item.props.icon}
          </div>
        )}
        <span className="ks-listbox__label-item">
          {renderChildren()}
        </span>
      </div>
    </li>
  );
};
