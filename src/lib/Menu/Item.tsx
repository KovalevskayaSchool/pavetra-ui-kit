import { cloneElement, FC, isValidElement, useRef } from "react";
import cn from "classnames";
import type { Node } from "@react-types/shared";
import type { ListState } from "react-stately";
import { useFocusRing, useOption, mergeProps } from "react-aria";

import { type MenuItemProps as MenuItemElProps } from "./Menu.d";
import styles from "./Menu.module.css";

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
  const label = !isValidElement(item.rendered) ? item.rendered?.toString() : "";
  const { optionProps, isDisabled, isSelected } = useOption(
    {
      key: item.key,
    },
    state,
    ref,
  );

  const classNames = cn(className, styles["menu__item"], {
    [styles["menu__item_selected"]]: isSelected,
    [styles["menu__item_active"]]: isFocusVisible,
    [styles["menu__item_disabled"]]: isDisabled,
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
      <div className={styles["menu__item-content"]}>
        {item.props.icon && (
          <div
            className={cn(styles["menu__icon"], {
              [styles["menu__icon_selected"]]: isSelected,
            })}
            role="img"
          >
            {item.props.icon}
          </div>
        )}
        <span className={styles["menu__label"]}>{renderChildren()}</span>
      </div>
    </li>
  );
};
