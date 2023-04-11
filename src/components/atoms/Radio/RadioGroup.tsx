import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useRadioGroupState, RadioGroupState } from 'react-stately';
import { useRadioGroup, type AriaRadioGroupProps } from 'react-aria';

import { useFormField } from '../FormField/FormField';

const RadioContext = createContext<RadioGroupState>({
  isDisabled: false,
  selectedValue: '',
  setSelectedValue: (value: string) => {
    return;
  },
} as RadioGroupState);

// #TODO Omit
export type RadioGroupProps = AriaRadioGroupProps;

export const useRadioGroupContext = () => useContext(RadioContext);

export const RadioGroup: FC<PropsWithChildren<RadioGroupProps>> = ({
  children,
  onChange,
  ...props
}) => {
  const formField = useFormField();
  const formProps = formField
    ? {
        ...formField.fieldProps,
      }
    : {};
  const state = useRadioGroupState({
    ...props,
    onChange: (value) => {
      formField?.onChange?.(value);
      onChange?.(value);
    },
  });
  const { radioGroupProps } = useRadioGroup(
    {
      ...props,
      ...formProps,
      label: formProps?.['aria-label'],
    },
    state
  );

  return (
    <div {...radioGroupProps} className="ks-radio__group">
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  );
};
