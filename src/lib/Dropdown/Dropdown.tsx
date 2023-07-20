import {
  useRef,
  forwardRef,
  isValidElement,
  cloneElement,
  PropsWithChildren,
} from "react";
import { useSelectState, SelectProps as SelectBaseProps } from "react-stately";
import { HiddenSelect, useButton, useFocusRing, useSelect } from "react-aria";

import { ListBox, type MenuItemProps } from "../ListBox";

import { type Placement } from "./Dropdown.d";
import { Popover } from "../Popover";
import { Box } from "../Box";
import { mapToAriaProps } from "../ListBox/map";
import { useDOMRef } from "../../utils/useDomRef";
import styles from "./Dropdown.module.css";

export interface DropdownProps
  extends Omit<
    SelectBaseProps<MenuItemProps>,
    "items" | "isDisabled" | "isLoading" | "children"
  > {
  menu?: MenuItemProps[];
  onChange?: (value: string) => void;
  onClose?: () => void;
  onOpen?: () => void;
  placement?: Placement;
  value?: string;
  defaultValue?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  name?: string;
  label?: string;
}

export const Dropdown = forwardRef<
  HTMLElement,
  PropsWithChildren<DropdownProps>
>(
  (
    {
      children,
      menu = [],
      defaultValue,
      onChange,
      onClose,
      onOpen,
      className,
      value,
      ariaLabel,
      disabled,
      ...props
    },
    ref
  ) => {
    const triggerRef = useDOMRef(ref);
    const propsWithChildren = mapToAriaProps(menu, ariaLabel || "");
    const state = useSelectState<MenuItemProps>({
      ...propsWithChildren,
      defaultSelectedKey: defaultValue,
      selectedKey: value,
      disabledKeys: menu
        .filter((item) => item.disabled)
        .map((item) => item.id || ""),
      onSelectionChange(key) {
        return onChange?.(key.toString());
      },
      onOpenChange() {
        return onOpen?.();
      },
    });
    const listboxRef = useRef<HTMLUListElement | null>(null);

    const { triggerProps, menuProps } = useSelect(
      {
        ...props,
        ...propsWithChildren,
        isDisabled: disabled,
        items: menu,
        "aria-label": ariaLabel || "select",
      },
      state,
      triggerRef
    );

    const { buttonProps } = useButton(
      { ...triggerProps, isDisabled: disabled },
      triggerRef
    );
    const { focusProps } = useFocusRing();

    function handleClose() {
      onClose?.();
      state.close();
    }

    const renderChildren = () => {
      if (children && isValidElement(children)) {
        return cloneElement(children as React.ReactElement<any>, {
          ...focusProps,
          ...buttonProps,
          ref: triggerRef,
        });
      }
      return null;
    };

    const renderItems = () => {
      return (
        <Box className={styles["dropdown__poppover"]}>
          <ListBox
            ref={listboxRef}
            {...menuProps}
            disallowEmptySelection={true}
            shouldSelectOnPressUp={true}
            state={state}
          />
        </Box>
      );
    };

    const renderPopover = () => {
      if (!state.isOpen) {
        return;
      }

      return (
        <Popover
          onClose={handleClose}
          isOpen={state.isOpen}
          triggerRef={triggerRef}
          className={className}
        >
          {renderItems()}
        </Popover>
      );
    };

    return (
      <>
        <HiddenSelect
          state={state}
          triggerRef={triggerRef}
          label={props.label}
          name={props.name}
        />
        {renderChildren()}
        {renderPopover()}
      </>
    );
  }
);

Dropdown.defaultProps = {};

Dropdown.displayName = "Dropdown";
