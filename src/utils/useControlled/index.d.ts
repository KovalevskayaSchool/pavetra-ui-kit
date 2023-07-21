/// <reference types="react" />
export declare function useControlled<T = any, P = any>(
  controlledValue: T,
  defaultValue: T,
  formatValue?: (value: T) => T
): [T, (value: React.SetStateAction<T>) => void, boolean];
