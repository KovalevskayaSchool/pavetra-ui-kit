import { FC, PropsWithChildren } from 'react';
import cn from 'classnames';
import { Card } from '../../atoms/Card';
import { useDatePickerCtx } from './DatePicker';

interface DatePickerTemplateProps {
  navigation: React.ReactNode;
  footer?: React.ReactNode;
}

export const DatePickerTemplate: FC<
  PropsWithChildren<DatePickerTemplateProps>
> = ({ children, footer, navigation }) => {
  const { inline, type } = useDatePickerCtx();
  return (
    <Card className={cn('ks-picker', { ['ks-picker--inline']: !!inline })}>
      <div
        className={cn('ks-picker__container', {
          ['ks-picker__year']: type === 'year',
          ['ks-picker__month']: type === 'month',
        })}
        tabIndex={0}
      >
        <div className="ks-picker__nav">{navigation}</div>
        <table className="ks-picker__content">{children}</table>
        {footer && <div className="ks-picker__footer">{footer}</div>}
      </div>
    </Card>
  );
};
