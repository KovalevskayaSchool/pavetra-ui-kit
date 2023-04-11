import { forwardRef, isValidElement } from 'react';
import cn from 'classnames';
import { useRadio, useFocusRing } from 'react-aria';
import type { AriaRadioProps } from 'react-aria';

import { useRadioGroupContext } from './RadioGroup';
import { useDOMRef } from '../../../utils/useDomRef';
import './Radio.css';

interface Props extends AriaRadioProps {
  label?: string | React.ReactNode;
  className?: string;
}

export type RadioProps = Props;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, isDisabled, label, className, ...restProps }, refForwarded) => {
    const ref = useDOMRef(refForwarded);

    const { focusProps, isFocusVisible } = useFocusRing();
    const radioProps = { ...restProps };
    const groupContext = useRadioGroupContext() || {};

    const { inputProps } = useRadio(
      {
        ...radioProps,
        value,
        isDisabled,
        'aria-label': !isValidElement(label) ? label?.toString() : 'Radio',
      },
      groupContext,
      ref
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!groupContext.setSelectedValue) {
        //  inputProps?.value = value;
        return;
      }
      inputProps.onChange?.(e);
    };

    return (
      <label
        {...focusProps}
        className={cn(className, 'ks-radio__wrapper', {
          ['ks-radio--disabled']: isDisabled,
        })}
      >
        <span className={cn({ ['ks-radio--checked']: inputProps.checked })}>
          <input
            ref={ref}
            {...inputProps}
            {...focusProps}
            onChange={handleChange}
            type="radio"
            className="ks-radio__control"
            value={value}
            checked={inputProps.checked}
          />
          <span
            className={cn('ks-radio-inner', {
              ['ks-radio-inner--focus']: isFocusVisible,
            })}
          />
        </span>
        <span className="ks-radio__label">{label}</span>
      </label>
    );
  }
);

Radio.displayName = 'Radio';
