import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import type { SpaceStep } from '../Stack';
import './Inline.css';

export interface InlineProps extends HTMLAttributes<HTMLElement> {
  /** Space between children (follows density). Default sm. */
  gap?: SpaceStep;
  /** Vertical alignment. Default center. */
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  /** Horizontal distribution. Default start. */
  justify?: 'start' | 'center' | 'end' | 'between';
  /** Wrap onto more lines when there isn’t room. Default true. */
  wrap?: boolean;
  as?: ElementType;
}

/** Lays children out in a row that wraps, e.g. buttons or tags. */
export const Inline = forwardRef<HTMLElement, InlineProps>(
  (
    {
      gap = 'sm',
      align = 'center',
      justify = 'start',
      wrap = true,
      as: Component = 'div',
      className,
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      className={[
        'ds-inline',
        `ds-inline--gap-${gap}`,
        `ds-inline--align-${align}`,
        `ds-inline--justify-${justify}`,
        !wrap && 'ds-inline--nowrap',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
);
Inline.displayName = 'Inline';
