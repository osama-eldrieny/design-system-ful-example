import { forwardRef, type CSSProperties, type ElementType, type HTMLAttributes } from 'react';
import type { SpaceStep } from '../Stack';
import './Grid.css';

export interface GridProps extends HTMLAttributes<HTMLElement> {
  /**
   * A number of equal columns, or `auto` (default) to fit as many columns of at least
   * minItemWidth as there is room for, so it reflows on small screens.
   */
  columns?: number | 'auto';
  /** Smallest column width for columns="auto", e.g. "16rem". Default the grid token. */
  minItemWidth?: string;
  /** Space between cells (follows density). Default md. */
  gap?: SpaceStep;
  as?: ElementType;
}

/** A grid of equal columns, e.g. for cards. Reflows to fewer columns on narrow screens. */
export const Grid = forwardRef<HTMLElement, GridProps>(
  (
    {
      columns = 'auto',
      minItemWidth,
      gap = 'md',
      as: Component = 'div',
      className,
      style,
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      className={[
        'ds-grid',
        `ds-grid--gap-${gap}`,
        columns === 'auto' ? 'ds-grid--auto' : 'ds-grid--fixed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          ...(columns !== 'auto' ? { ['--_columns' as string]: columns } : {}),
          ...(minItemWidth ? { ['--_min' as string]: minItemWidth } : {}),
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  ),
);
Grid.displayName = 'Grid';
