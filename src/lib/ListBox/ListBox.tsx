import { forwardRef } from "react";

import cn from "classnames";
import { SelectState } from "react-stately";
import { useListBox, AriaListBoxOptions } from "react-aria";
import { Item } from "./Item";
import { SeperatorItem } from "./SeperatorItem";
import { type MenuItemProps } from "./Menu";

import { useDOMRef } from "../../utils/useDomRef";

import styles from "./ListBox.module.css";

export interface MenuProps extends AriaListBoxOptions<MenuItemProps> {
  className?: string;
  state: SelectState<MenuItemProps>;
}

export const ListBox = forwardRef<HTMLUListElement, MenuProps>(
  (
    {
      className,
      state,
      ...props
    },
    refForwarded
  ) => {
    const listBoxRef = useDOMRef(refForwarded);

    const { listBoxProps } = useListBox(
      {
        ...props,
        autoFocus: state.focusStrategy || true,
        disallowEmptySelection: true
      },
      state,
      listBoxRef
    );
    const renderItems = () =>
      [...state.collection]?.map((item) =>
        item.props.type === "divider" ? (
          <SeperatorItem key={item.key} />
        ) : (
          <Item key={item.key} state={state} item={item} />
        )
      );

    return (
      <ul
        {...listBoxProps}
        ref={listBoxRef}
        className={cn(styles["listbox"], className)}
      >
        {renderItems()}
      </ul>
    );
  }
);
