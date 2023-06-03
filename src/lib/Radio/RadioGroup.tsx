import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useRadioGroupState, RadioGroupState } from 'react-stately';
import { useRadioGroup, type AriaRadioGroupProps } from 'react-aria';

const RadioContext = createContext<RadioGroupState | null>({
  isDisabled: false,
  selectedValue: '',
  setSelectedValue: (_: string) => undefined,
} as RadioGroupState);

// #TODO Omit
export type RadioGroupProps = AriaRadioGroupProps;

export const useRadioGroupContext = () => useContext(RadioContext);

export const RadioGroup: FC<PropsWithChildren<RadioGroupProps>> = ({
  children,
  onChange,
  ...props
}) => {

  const state = useRadioGroupState({
    ...props,
    onChange,
  });
  const { radioGroupProps } = useRadioGroup(
    {
      ...props,
    },
    state
  );

  return (
    <div {...radioGroupProps} className="ks-radio__group">
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  );
};
