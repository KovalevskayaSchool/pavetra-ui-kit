import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { useField, AriaFieldProps, FieldAria } from 'react-aria';
import './FormField.css';

export interface FormFieldProps extends Omit<AriaFieldProps, 'errorMessage'> {
  error?: boolean | string | null;
  label?: string;
  name?: string;
  value?: string | number | undefined | null | boolean;
  onChange?: (value: string | boolean | number | undefined) => void;
}

const FormFieldContext = createContext<{
  fieldProps: FieldAria['fieldProps'];
  labelProps: FieldAria['labelProps'];
  value: string | number | undefined | null | boolean;
  error: boolean | string | null | undefined;
  name?: string;
  onChange?: (
    value: string | boolean | number | undefined | Date | never
  ) => void;
} | null>(null);

export const useFormField = () => useContext(FormFieldContext);

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

  return (
    <FormFieldContext.Provider
      value={{
        fieldProps,
        labelProps,
        value,
        error,
        onChange,
        name,
      }}
    >
      <div className="ks-form-field">
        <div className="ks-form__row">
          <div className="ks-form-field__label-wrapper">
            <label {...labelProps} className="ks-form-field__label">
              {label}
            </label>
          </div>
          <div className="ks-form__inner">
            <div className="ks-form-field__item">
              {children}
              {error && (
                <div className="ks-form-field__helper">
                  <span {...errorMessageProps} className="ks-form-field__error">
                    {error || ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {error && <div className="ks-form__margin-offset" />}
      </div>
    </FormFieldContext.Provider>
  );
};
