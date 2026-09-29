import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import './Stack.css';

export type SpaceStep = 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** Space between children, from the spacing scale (follows density). Default md. */
  gap?: SpaceStep;
  /** Cross-axis alignment. Default stretch. */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Element to render, e.g. section or ul. Default div. */
  as?: ElementType;
}

/** Lays children out vertically with even spacing. */
export const Stack = forwardRef<HTMLElement, StackProps>(
  ({ gap = 'md', align = 'stretch', as: Component = 'div', className, ...props }, ref) => (
    <Component
      ref={ref}
      className={['ds-stack', `ds-stack--gap-${gap}`, `ds-stack--align-${align}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
);
Stack.displayName = 'Stack';
