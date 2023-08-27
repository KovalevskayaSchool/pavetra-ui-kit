import { forwardRef } from "react";

import cn from "classnames";
import { useListState } from "react-stately";
import { useListBox, AriaListBoxOptions } from "react-aria";

import { Item } from "./Item";
import { SeperatorItem } from "./SeperatorItem";
import { type MenuItemProps } from "./Menu.d";
import { useDOMRef } from "../../utils/useDomRef";
import { mapToAriaProps } from "./map";

import styles from "./Menu.module.css";

export interface MenuProps
  extends Omit<
    AriaListBoxOptions<MenuItemProps>,
    "defaultSelectedKeys" | "selectedKeys"
  > {
  className?: string;
  menu?: MenuItemProps[];
  defaultSelectedKey?: string | undefined;
  selectedKey?: string;
  onChange?: (key: string) => void;
  mode?: "horizontal" | "vertical";
  type?: "listbox" | "menu";
}

export const Menu = forwardRef<HTMLUListElement, MenuProps>(
  (
    {
      className,
      disallowEmptySelection,
      shouldSelectOnPressUp,
      menu = [],
      defaultSelectedKey,
      selectedKey,
      onChange,
      mode = "vertical",
      type = "menu",
      ...props
    },
    refForwarded
  ) => {
    const listBoxRef = useDOMRef(refForwarded);

    const state = useListState({
      ...props,
      ...mapToAriaProps(menu, ""),
      selectionMode: "single",
      defaultSelectedKeys: defaultSelectedKey
        ? [defaultSelectedKey]
        : undefined,
      selectedKeys: selectedKey ? [selectedKey] : undefined,
      disabledKeys: menu
        .filter((item) => item.disabled)
        .map((item) => item.id || ""),
      onSelectionChange(key) {
        const value = [...Array.from(key)][0];
        if (!value) return;
        return onChange?.(value.toString());
      },
    });
    const { listBoxProps } = useListBox(
      {
        ...props,
        "aria-label": props["aria-label"] || "menu",
        disallowEmptySelection,
        shouldSelectOnPressUp,
      },
      state,
      listBoxRef
    );

    const renderItems = () =>
      [...Array.from(state.collection)]?.map((item) =>
        item.props.type === "divider" ? (
          <SeperatorItem key={item.key} />
        ) : (
          <Item
            state={state}
            key={item.key}
            item={item}
            className={cn({
              [styles["menu__item_mode_horizontal"]]:
                mode === "horizontal" && type !== "listbox",
              [styles["menu__item_mode_vertical"]]:
                mode === "vertical" && type !== "listbox",
            })}
          />
        )
      );

    return (
      <ul
        ref={listBoxRef}
        {...listBoxProps}
        className={cn(
          styles["menu"],
          {
            [styles["menu_mode_horizontal"]]: mode === "horizontal",
            [styles["menu_mode_vertical"]]: mode === "vertical",
          },
          className,
        )}
      >
        {renderItems()}
      </ul>
    );
  }
);
