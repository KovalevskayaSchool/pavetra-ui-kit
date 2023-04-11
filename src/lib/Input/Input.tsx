import { cloneElement, isValidElement, forwardRef, ReactNode } from 'react';
import cn from 'classnames';
import { AriaTextFieldProps, mergeProps, useFocusRing } from 'react-aria';
import { useTextField } from 'react-aria';
import { useFormField } from '../FormField/FormField';
import { useDOMRef } from '../../utils/useDomRef';

import './Input.css';

type OverlayFunc<P> = (props: P) => React.ReactElement<P>;

type TSize = 'medium' | 'large' | 'small';

export interface InputNative
  extends Omit<AriaTextFieldProps, 'prefix' | 'size'> {
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: TSize;
  active?: boolean;
  error?: boolean;
  label?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

type RenderProps = {
  renderInput?:
    | React.Component<Omit<InputNative, 'onChange'>>
    | React.FC<Omit<InputNative, 'onChange'>>
    | OverlayFunc<Omit<InputNative, 'onChange'>>;
};

export type InputProps = InputNative & RenderProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      className,
      prefix,
      disabled,
      renderInput,
      active,
      suffix,
      error,
      label = 'Input',
      size = 'medium',
      required,
      readOnly,
      ...props
    },
    refForwarded
  ) => {
    const ref = useDOMRef(refForwarded);
    const formField = useFormField();
    const {
      inputProps: { onChange: onTextFieldChange, ...inputProps },
    } = useTextField(
      {
        ...props,
        'value': formField?.value?.toString() || value,
        'isDisabled': disabled,
        'isReadOnly': readOnly,
        'isRequired': required,
        'aria-label': label,
      },
      ref
    );

    const { focusProps, isFocusVisible } = useFocusRing();

    const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
      onTextFieldChange?.(e);
      formField?.onChange?.(e.target.value);
    };

    const renderInputOverlay = () => {
      const propsOverlay = {
        value,
        prefix,
        suffix,
        disabled,
        onChange: handleChange,
        className: cn(['ks-input__control'], {
          ['pd-r']: !!prefix,
          ['pd-l']: !!suffix,
        }),
        ...focusProps,
        ...props,
        ref,
      };
      if (typeof renderInput === 'function') {
        return renderInput(propsOverlay);
      }

      if (isValidElement(renderInput)) {
        return cloneElement(renderInput, propsOverlay);
      }

      return null;
    };

    const ariaProps = formField
      ? mergeProps(inputProps, focusProps, formField.fieldProps)
      : mergeProps(inputProps, focusProps);

    const isError = error || formField?.error;

    return (
      <div
        className={cn(className, 'ks-input', { ['ks-input--error']: isError })}
        data-focus={isFocusVisible || active}
        aria-disabled={disabled}
      >
        {prefix && (
          <div className="ks-input__prefix-left">
            <div className="ks-input__icon-wrapper">{prefix}</div>
          </div>
        )}
        {!renderInput ? (
          <input
            {...ariaProps}
            {...props}
            readOnly={readOnly}
            onChange={handleChange}
            className={cn(['ks-input__control'], {
              ['pd-r']: !!prefix,
              ['pd-l']: !!suffix,

              ['ks-input__control--medium']: size === 'medium',
              ['ks-input__control--large']: size === 'large',
              ['ks-input__control--small']: size === 'small',
            })}
            ref={ref}
            disabled={disabled}
          />
        ) : (
          renderInputOverlay()
        )}

        {suffix && (
          <div className="ks-input__prefix-right">
            <div className="ks-input__icon-wrapper">{suffix}</div>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
