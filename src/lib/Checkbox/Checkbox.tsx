import React, { forwardRef, isValidElement } from 'react';
import { useToggleState } from 'react-stately';
import {
  useCheckbox,
  AriaCheckboxProps,
  useFocusRing,
  mergeProps,
} from 'react-aria';

import cn from 'classnames';
import { useDOMRef } from '../../utils/useDomRef';
import './Checkbox.css';

interface Props extends AriaCheckboxProps {
  label?: string | React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export type CheckboxProps = Props;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, disabled, onChange, ...props }, refForwarded) => {
    const state = useToggleState({
      ...props,
      onChange,
    });

    const { focusProps, isFocusVisible } = useFocusRing();
    const ref = useDOMRef(refForwarded);

    const { inputProps } = useCheckbox(
      {
        ...props,
        'isDisabled': disabled,
        'aria-label': !isValidElement(label) ? label?.toString() : '',
      },
      state,
      ref
    );

    return (
      <label
        className={cn(className, 'ks-checkbox', {
          ['ks-checkbox_disabled']: disabled,
        })}
        {...focusProps}
      >
        <input
          ref={ref}
          className={cn(
            'ks-checkbox__input',
            {
              ['ks-checkbox__input_checked']: state.isSelected,
              ['ks-checkbox__input_focus']: isFocusVisible,
            },

            className
          )}
          {...mergeProps(inputProps)}
        />

        <span data-disabled={disabled}>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
