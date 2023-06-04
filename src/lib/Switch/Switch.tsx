import { forwardRef } from 'react';
import cn from 'classnames';
import { AriaSwitchProps } from 'react-aria';
import { useToggleState } from 'react-stately';
import { useFocusRing, useSwitch, VisuallyHidden } from 'react-aria';

import { Spin } from '../Spin';
import { useDOMRef } from '../../utils/useDomRef';
import './Switch.css';

export interface SwitchProps extends AriaSwitchProps {
  label?: string;
  className?: string;
  agreeText?: string;
  disagreeText?: string;
  isLoading?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      onChange,
      agreeText,
      disagreeText,
      className,
      isDisabled,
      isLoading,
      ...props
    },
    refForwarded
  ) => {
    const state = useToggleState({
      ...props,
      onChange,
    });
    const ref = useDOMRef(refForwarded);

    const disabled = isDisabled || isLoading;
    const { inputProps } = useSwitch(
      {
        ...props,
        isDisabled: disabled,
      },
      state,
      ref
    );
    const { focusProps } = useFocusRing();

    function handleToggle() {
      if (disabled) return;
      state.toggle();
    }

    function handleToggleOn() {
      if (disabled) return;
      state.setSelected(true);
    }

    function handleToggleOff() {
      if (disabled) return;
      state.setSelected(false);
    }

    return (
      <div
        className={cn(className, 'ks-switch', {
          ['ks-switch_disabled']: isDisabled,
        })}
      >
        <div
          className={cn('ks-switch__text', {
            ['ks-switch__text_checked']: !state.isSelected,
          })}
          data-checked={!state.isSelected}
          onClick={handleToggleOff}
        >
          {disagreeText}
        </div>
        <div
          className={cn(className, "ks-switch__button", {
            ['ks-switch__button_disabled']: isDisabled,
            ['ks-switch__button_checked']: state.isSelected,
          })}
          onClick={handleToggle}
          aria-checked={state.isSelected}
        >
          <VisuallyHidden>
            <input {...inputProps} {...focusProps} ref={ref} />
          </VisuallyHidden>
          <span
            className={cn('ks-switch__area', {
              ['ks-switch__area_checked']: state.isSelected,
            })}
          >
            {isLoading && <Spin className="ks-switch__spin" size="small" />}
          </span>
        </div>
        <div
          className={cn('ks-switch__text', {
            ['ks-switch__text_checked']: state.isSelected,
          })}
          data-checked={state.isSelected}
          onClick={handleToggleOn}
        >
          {agreeText}
        </div>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
