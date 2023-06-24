import { FC, PropsWithChildren, cloneElement, isValidElement } from 'react';
import { useField, AriaFieldProps } from 'react-aria';
import './FormField.css';

export interface FormFieldProps extends Omit<AriaFieldProps, 'errorMessage'> {
  error?: boolean | string | null;
  label?: string;
  name?: string;
  value?: string | number | undefined | null | boolean | Date;
  onChange?: (value: string | boolean | number | undefined) => void;
}

export const FormField: FC<PropsWithChildren<FormFieldProps>> = ({
  error,
  label,
  value,
  children,
  onChange,
  name,
  ...props
}) => {
  const { labelProps, fieldProps, errorMessageProps } = useField({
    ...props,
    label,
    errorMessage: error,
  });

  const renderChildren = () => {
    if (children && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<any>, {
        ...props,
        ...fieldProps,
        onChange,
        value,
        error
      });
    }
    return null;
  };

  return (
    <div className="ks-form-field">
      <label {...labelProps} className="ks-form-field__label">
        {label}
      </label>
      <div className="ks-form-field__content">
        {renderChildren()}
        {error && (
          <span {...errorMessageProps} className="ks-form-field__error">
            {error || ''}
          </span>
        )}
      </div>
      {error && <div className="ks-form-field__offset" />}
    </div>
  );
};
