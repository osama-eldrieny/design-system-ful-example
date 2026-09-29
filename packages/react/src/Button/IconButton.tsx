import { forwardRef, type ReactNode } from 'react';
import { Button, type ButtonProps } from './Button';

export interface IconButtonProps extends Omit<
  ButtonProps,
  'iconStart' | 'iconEnd' | 'children' | 'fullWidth' | 'aria-label'
> {
  /** The icon to show. */
  icon: ReactNode;
  /**
   * What the button does, e.g. "Delete message". Required: it is the accessible name
   * screen readers announce and the tooltip sighted users see, since there is no
   * visible text.
   */
  label: string;
}

/**
 * A button that shows only an icon. Use it for compact, well-known actions (close, edit,
 * delete) where an icon is understood without text.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, className, title, ...props }, ref) => (
    <Button
      ref={ref}
      aria-label={label}
      title={title ?? label}
      iconStart={icon}
      className={['ds-button--icon-only', className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);

IconButton.displayName = 'IconButton';
