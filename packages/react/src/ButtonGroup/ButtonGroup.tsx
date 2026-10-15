import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './ButtonGroup.css';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Names the group for screen readers, e.g. "Text alignment". */
  'aria-label': string;
  /** Joins the buttons into one control instead of spacing them. */
  attached?: boolean;
  /** `horizontal` (default) or `vertical`. */
  orientation?: 'horizontal' | 'vertical';
  /** Button elements. */
  children: ReactNode;
}

/**
 * Related action buttons shown together, spaced or attached. To pick one of a few options or
 * views, use Tabs with the segmented appearance instead.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ attached = false, orientation = 'horizontal', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={[
          'ds-button-group',
          `ds-button-group--${orientation}`,
          attached && 'ds-button-group--attached',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ButtonGroup.displayName = 'ButtonGroup';
