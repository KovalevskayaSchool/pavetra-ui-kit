import { forwardRef } from 'react';
import cn from 'classnames';

import { Input, type InputProps } from './Input';

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      ref={ref as unknown as React.ForwardedRef<HTMLInputElement>}
      {...props}
      className={cn('ks-textarea', className)}
      renderInput={({ ...inputProps }) => (
        <textarea
          {...inputProps}
          className={cn('ks-textarea-control', inputProps.className)}
        />
      )}
    />
  )
);

TextArea.displayName = 'TextArea';
