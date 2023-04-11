import { Title } from './Title';
import { Caption } from './Caption';
import { Paragraph } from './Paragraph';
import { Control } from './Typography';

export type TypographyProps = typeof Control & {
  Title: typeof Title;
  Caption: typeof Caption;
  Paragraph: typeof Paragraph;
};

const Typography = Control as TypographyProps;

export { Typography };

Typography.Title = Title;
Typography.Caption = Caption;
Typography.Paragraph = Paragraph;
