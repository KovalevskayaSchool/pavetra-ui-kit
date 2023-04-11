import { useCallback, useRef, useState } from 'react';

export function useControlled<T = any, P = any>(
  controlledValue: T,
  defaultValue: T,
  formatValue?: (value: T) => T
): [T, (value: React.SetStateAction<T>) => void, boolean] {
  const { current: isControlled } = useRef(controlledValue !== undefined);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  let value = isControlled ? controlledValue : uncontrolledValue;
  value = formatValue ? formatValue(value) : value;

  const setValue = useCallback(
    (nextValue: React.SetStateAction<T>) => {
      // Only update the value in state when it is not under control.
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
    },
    [isControlled]
  );

  return [value, setValue, isControlled];
}
