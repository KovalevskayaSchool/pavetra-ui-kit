export * from './Input';

import { Input as InputComponent, InputProps as InputBaseProps } from './Input';
import { Password } from './Password';
import { TextArea } from './TextArea';

export type InputProps = typeof InputComponent & {
  Password: typeof Password;
  TextArea: typeof TextArea;
};

const Input = InputComponent as InputProps;

Input.Password = Password;
Input.TextArea = TextArea;

export type { InputBaseProps };

export { Input };
