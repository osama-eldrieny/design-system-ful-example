import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
export type ButtonAppearance = 'filled' | 'outline' | 'ghost' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * What kind of action this is. `primary` for the main action on a screen, `secondary`
   * for supporting actions, `success` to confirm a positive outcome, `danger` for
   * destructive actions, `warning` for actions that need caution.
   */
  variant?: ButtonVariant;
  /**
   * Visual weight. `filled` for the most important action, `outline` for secondary
   * emphasis, `ghost` for low emphasis in toolbars and dense UI, `text` for inline,
   * link-like actions.
   */
  appearance?: ButtonAppearance;
  /** `small` for dense UI, `medium` by default, `large` for prominent calls to action. */
  size?: ButtonSize;
  /** Icon before the label (after it in right-to-left languages). Hidden from screen readers. */
  iconStart?: ReactNode;
  /** Icon after the label (before it in right-to-left languages). Hidden from screen readers. */
  iconEnd?: ReactNode;
  /**
   * Shows a spinner and ignores clicks while an action runs. The button stays focusable
   * and is announced as busy.
   */
  loading?: boolean;
  /** Stretches the button to the full width of its container. */
  fullWidth?: boolean;
  /** Button label. */
  children?: ReactNode;
}

/**
 * Triggers an action. Use a link instead when it navigates to another page.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      appearance = 'filled',
      size = 'medium',
      iconStart,
      iconEnd,
      loading = false,
      fullWidth = false,
      type = 'button',
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const classes = [
      'ds-button',
      `ds-button--${variant}`,
      `ds-button--${appearance}`,
      `ds-button--${size}`,
      fullWidth && 'ds-button--full-width',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        onClick={handleClick}
        {...props}
      >
        {loading ? (
          <span className="ds-button__spinner" aria-hidden="true" />
        ) : (
          iconStart && (
            <span className="ds-button__icon" aria-hidden="true">
              {iconStart}
            </span>
          )
        )}
        {children !== undefined && children !== null && (
          <span className="ds-button__label">{children}</span>
        )}
        {iconEnd && !loading && (
          <span className="ds-button__icon" aria-hidden="true">
            {iconEnd}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
