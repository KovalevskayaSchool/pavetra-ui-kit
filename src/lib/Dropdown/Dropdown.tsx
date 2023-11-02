import {
  useRef,
  forwardRef,
  isValidElement,
  cloneElement,
  PropsWithChildren,
  ReactNode,
} from "react";
import { useSelectState, SelectProps as SelectBaseProps } from "react-stately";
import { HiddenSelect, useButton, useFocusRing, useSelect } from "react-aria";
import cn from 'classnames'

import { ListBox, type MenuItemProps } from "../ListBox";

import { Popover } from "../Popover";
import { mapToAriaProps } from "../ListBox/map";
import { Box } from "../Box";
import { useDOMRef } from "../../utils/useDomRef";

import { type Placement } from "./Dropdown.d";

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
  dropdownRender?: (menu: ReactNode) => ReactNode;
}

export const Dropdown = forwardRef<
  HTMLElement,
  PropsWithChildren<DropdownProps>
>(
  (
    {
      children,
      dropdownRender,
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
        <ListBox
          ref={listboxRef}
          {...menuProps}
          disallowEmptySelection={true}
          shouldSelectOnPressUp={true}
          state={state}
        />
      );
    };

    const renderPopover = () => {
      if (!state.isOpen) {
        return;
      }

      return (
        <Popover
          isOpen={state.isOpen}
          triggerRef={triggerRef}
          state={state}
        >
          <Box className={cn(styles["dropdown__poppover"], className)}>
            {dropdownRender ? dropdownRender(renderItems()) : renderItems()}
          </Box>
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
