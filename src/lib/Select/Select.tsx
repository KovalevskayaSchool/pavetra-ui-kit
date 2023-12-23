import { ReactNode, forwardRef, useRef } from "react";
import cn from "classnames";
import { useSelectState, SelectProps as SelectBaseProps } from "react-stately";
import {
  HiddenSelect,
  useButton,
  useSelect,
  mergeProps,
  useFocusRing,
} from "react-aria";
import {
  ChevronDownOutline,
  CloseOutline,
} from "@symblight/pavetra-icons";

import { Input } from "../Input/Input";
import { Spin } from "../Spin";
import { Box } from "../Box";
import { Button } from "../Button";
import { Popover } from "../Popover";
import { ListBox, type MenuItemProps } from "../ListBox";
import { mapToAriaProps } from "../ListBox/map";

import { useDOMRef } from "../../utils/useDomRef";
import { useScrollSelectFocus } from "../../utils/useScrollSelectFocus";

import { type Placement } from "./Select.d";

import styles from "./Select.module.css";

export interface SelectProps
  extends Omit<
    SelectBaseProps<MenuItemProps>,
    "items" | "isDisabled" | "isLoading" | "children"
  > {
  menu?: MenuItemProps[];
  onChange?: (value: string, item: MenuItemProps) => void;
  onClose?: () => void;
  onOpen?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  onClick?: () => void;
  placement?: Placement;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  name?: string;
  label?: string;
  error?: boolean | string | null;
  dropdownChildren?: () => ReactNode;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      menu = [],
      defaultValue,
      onChange,
      onClose,
      onOpen,
      onOpenChange,
      placeholder,
      className,
      value,
      ariaLabel,
      disabled,
      loading,
      allowClear,
      error,
      onClick,
      dropdownChildren,
      ...props
    },
    ref
  ) => {
    const defaultMenu = [
      {
        id: "empty",
        label: "Empty",
      },
    ];
    const childrenMenu = menu.length > 0 ? menu : defaultMenu;

    const propsWithChildren = mapToAriaProps(childrenMenu, ariaLabel || "");
    let state = useSelectState<MenuItemProps>({
      ...propsWithChildren,
      autoFocus: true,
      defaultSelectedKey: defaultValue,
      isDisabled: disabled,
      selectedKey: value,
      disabledKeys: menu
        .filter((item) => item.disabled)
        .map((item) => item.id || ""),
      onSelectionChange(key) {
        const id = key.toString();
        const menuItem = menu.find((item) => item.id === id) as MenuItemProps;
        return onChange?.(id, menuItem);
      },
      onOpenChange,
    });
    const selectRef = useDOMRef(ref)
    const popoverRef = useRef<HTMLDivElement>(null);
    const listBoxRef = useRef<HTMLUListElement>(null);
    const triggerRef = useRef(null);
    let { triggerProps, menuProps } = useSelect(
      {
        ...props,
        isDisabled: disabled,
        "aria-label": ariaLabel || "select",
        autoFocus: true,
      },
      state,
      triggerRef
    );

    let { buttonProps } = useButton(triggerProps, triggerRef);
    const { isFocusVisible, focusProps } = useFocusRing();

    useScrollSelectFocus({
      isOpen: state.isOpen,
      popoverRef,
      listBoxRef,
      triggerRef,
    });

    function handleClear() {
      state.setSelectedKey("");
    }

    const renderItems = () => {
      if (!Array.isArray(menu) || menu.length === 0) {
        return (
          <Box className={styles["select__poppover"]}>
            <div className={styles["select__empty"]}>Нет данных</div>
          </Box>
        );
      }

      if (loading) {
        return (
          <Box className={styles["select__poppover"]}>
            <div className={styles["select__empty"]}>
              <Spin size="large" />
            </div>
          </Box>
        );
      }

      return (
        <ListBox
          className={styles["select__poppover"]}
          state={state}
          ref={listBoxRef}
          {...menuProps}
        />
      );
    };

    const renderInputSufix = () => {
      if (loading) {
        return <Spin size="small" />;
      }

      if (allowClear && state.selectedKey) {
        return (
          <Button
            size="small"
            variant="inline"
            className={styles["select__button-clear"]}
            icon={
              <div className={styles["select__clear"]}>
                <CloseOutline />
              </div>
            }
            onClick={handleClear}
          />
        );
      }

      return (
        <div
          aria-hidden="true"
          className={cn(styles["select__icon"], {
            [styles["select__icon_toggled"]]: state.isOpen,
          })}
        >
          <ChevronDownOutline />
        </div>
      );
    };

    function renderInput() {
      const isActive = state.isOpen || isFocusVisible;
      const value = state.selectedItem?.rendered?.toString() || "";

      return (
        <Input
          placeholder={placeholder}
          readOnly
          {...(focusProps as any)}
          disabled={disabled}
          error={!!error}
          value={value}
          active={isActive}
          suffix={renderInputSufix()}
        />
      );
    }

    return (
      <div ref={selectRef} className={cn(styles["select"], className)} {...props}>
        <HiddenSelect
          state={state}
          triggerRef={triggerRef}
          label={props.label}
          name={props.name}
        />
        <div
          ref={triggerRef}
          {...mergeProps(buttonProps)}
          className={cn(styles["select__button"], {
            [styles["select__button_disabled"]]: disabled,
          })}
        >
          {renderInput()}
        </div>
        {state.isOpen && (
          <Popover
            isOpen={state.isOpen}
            triggerRef={triggerRef}
            state={state}
            ref={popoverRef}
            fullWidth
          >
            {renderItems()}
          </Popover>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
