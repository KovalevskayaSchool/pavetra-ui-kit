import { FC, PropsWithChildren, cloneElement, isValidElement } from "react";
import { useField, AriaFieldProps } from "react-aria";
import cn from "classnames";
import styles from "./FormField.module.css";

export interface FormFieldProps extends Omit<AriaFieldProps, "errorMessage"> {
  error?: boolean | string | null;
  label?: string;
  name?: string;
  className?: string;
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
  className,
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
        error,
      });
    }
    return null;
  };

  return (
    <div className={cn(styles["form-field"], className)}>
      {label && (
        <label {...labelProps} className={styles["form-field__label"]}>
          {label}
        </label>
      )}
      <div className={styles["form-field__content"]}>
        {renderChildren()}
        {error && (
          <span {...errorMessageProps} className={styles["form-field__error"]}>
            {error || ""}
          </span>
        )}
      </div>
    </div>
  );
};
