import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import './Container.css';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Maximum width: small for reading, medium for forms and articles, large (default) for apps. */
  size?: 'small' | 'medium' | 'large' | 'full';
  as?: ElementType;
}

/** Centers page content with a maximum width and page gutters that follow density. */
export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ size = 'large', as: Component = 'div', className, ...props }, ref) => (
    <Component
      ref={ref}
      className={['ds-container', `ds-container--${size}`, className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);
Container.displayName = 'Container';
