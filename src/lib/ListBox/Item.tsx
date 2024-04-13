import { cloneElement, FC, isValidElement, useRef } from "react";
import cn from "classnames";
import type { Node } from "@react-types/shared";
import { CheckmarkOutline } from "@symblight/pavetra-icons";
import type { ListState } from "react-stately";
import { useFocusRing, useOption, mergeProps, usePress } from "react-aria";

import { type MenuItemProps as MenuItemElProps } from "./Menu";
import styles from "./ListBox.module.css";

export interface MenuItemProps {
  className?: string;
  state: ListState<MenuItemElProps>;
  item: Node<MenuItemElProps>;
}

export const Item: FC<MenuItemProps> = ({ className, state, item }) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const refLink = useRef<HTMLLinkElement | null>(null);
  const label = !isValidElement(item.rendered) ? item.rendered?.toString() : "";
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref,
  );

  const { pressProps } = usePress({
    onPressStart: (e) => {
      if (refLink.current && refLink.current.tagName === "A") {
        const el = refLink.current;
        el.click();
      }
    },
    shouldCancelOnPointerExit: false,
    allowTextSelectionOnPress: true,
    preventFocusOnPress: true,
  });

  const classNames = cn(className, styles["listbox__item"], {
    [styles["listbox__item_selected"]]: isSelected,
    [styles["listbox__item_focused"]]: isFocused,
    [styles["listbox__item_disabled"]]: isDisabled,
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
      {...mergeProps(optionProps, pressProps)}
      ref={ref}
      className={classNames}
    >
      <div className={styles["listbox__item-content"]}>
        {item.props.icon && (
          <span className={styles["listbox__item-icon"]} role="img">
            {item.props.icon}
          </span>
        )}
        <div className={styles["listbox__label-container"]}>
          <span className={styles["listbox__label-item"]}>
            {renderChildren()}
          </span>
          {isSelected ? <CheckmarkOutline /> : null}
        </div>
      </div>
    </li>
  );
};
