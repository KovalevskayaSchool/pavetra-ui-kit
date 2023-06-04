import { FC, PropsWithChildren } from 'react';
import cn from 'classnames';
import { Box } from '../Box';

import { useDatePickerCtx } from './useDatePickerCtx';

interface DatePickerTemplateProps {
  navigation: React.ReactNode;
  footer?: React.ReactNode;
}

export const DatePickerTemplate: FC<
  PropsWithChildren<DatePickerTemplateProps>
> = ({ children, footer, navigation }) => {
  const { inline, type } = useDatePickerCtx();
  return (
    <Box className={cn('ks-datepicker', { ['ks-datepicker_mode_inline']: !!inline })}>
      <div
        className={cn('ks-datepicker__container', {
          ['ks-datepicker__year']: type === 'year',
          ['ks-datepicker__month']: type === 'month',
        })}
        tabIndex={0}
      >
        <div className="ks-datepicker__nav">{navigation}</div>
        <table className="ks-datepicker__content">{children}</table>
        {footer && <div className="ks-datepicker__footer">{footer}</div>}
      </div>
    </Box>
  );
};
