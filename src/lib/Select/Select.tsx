import { forwardRef } from "react";
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
} from "@kovalevskayaschool/pavetra-icons";

import { Input } from "../Input/Input";
import { Spin } from "../Spin";
import { Box } from "../Box";
import { ListBox, type MenuItemProps } from "../ListBox";

import { type Placement } from "./Select.d";
import { mapToAriaProps } from "../ListBox/map";
import { Popover } from "../Popover";
import { Button } from "../Button";
import { useDOMRef } from "../../utils/useDomRef";
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
    const state = useSelectState<MenuItemProps>({
      ...propsWithChildren,
      defaultSelectedKey: defaultValue,
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

    const triggerRef = useDOMRef(ref);
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

    const { buttonProps } = useButton(triggerProps, triggerRef);
    const { isFocusVisible, focusProps } = useFocusRing();

    function handleClose() {
      onClose?.();
      state.close();
    }

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
        <Box className={styles["select__poppover"]}>
          <ListBox {...menuProps} state={state} />
        </Box>
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

    return (
      <div className={cn(styles["select"], className)} {...props}>
        <HiddenSelect
          state={state}
          triggerRef={triggerRef}
          label={props.label}
          name={props.name}
        />
        <div
          {...(mergeProps(buttonProps) as any)}
          className={cn(styles["select__button"], {
            [styles["select__button_disabled"]]: disabled,
          })}
          ref={triggerRef}
        >
          <Input
            placeholder={placeholder}
            readOnly
            {...(focusProps as any)}
            disabled={disabled}
            error={!!error}
            value={state.selectedItem?.rendered?.toString() || ""}
            active={state.isOpen || isFocusVisible}
            suffix={renderInputSufix()}
            onClick={onClick}
          />
        </div>
        {state.isOpen && (
          <Popover
            onClose={handleClose}
            isOpen={state.isOpen}
            triggerRef={triggerRef}
          >
            {renderItems()}
          </Popover>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
