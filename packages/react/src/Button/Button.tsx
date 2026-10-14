import type React from 'react';
import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
export type ButtonAppearance = 'filled' | 'outline' | 'ghost' | 'text';
export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

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
  /**
   * `xsmall` for table rows and chips, `small` for dense UI, `medium` by default, `large` and
   * `xlarge` for prominent calls to action.
   */
  size?: ButtonSize;
  /**
   * Makes it a link styled as a button (an `<a>`), for navigation that should look like an
   * action, e.g. "View report". Disabled links are not followed.
   */
  href?: string;
  /** With href: where to open the link, e.g. `_blank`. */
  target?: string;
  /** With href: link relationship, e.g. `noopener`. */
  rel?: string;
  /** Text shown next to the spinner while loading, e.g. "Saving…". Default: the label. */
  loadingText?: ReactNode;
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
      href,
      target,
      rel,
      loadingText,
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
      if (loading || (href && props.disabled)) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const label = loading && loadingText !== undefined ? loadingText : children;
    const content = (
      <>
        {loading ? (
          <span className="ds-button__spinner" aria-hidden="true" />
        ) : (
          iconStart && (
            <span className="ds-button__icon" aria-hidden="true">
              {iconStart}
            </span>
          )
        )}
        {label !== undefined && label !== null && <span className="ds-button__label">{label}</span>}
        {iconEnd && !loading && (
          <span className="ds-button__icon" aria-hidden="true">
            {iconEnd}
          </span>
        )}
      </>
    );

    if (href !== undefined) {
      const { disabled, ...rest } = props;
      return (
        <a
          ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          href={disabled ? undefined : href}
          target={target}
          rel={rel}
          className={classes}
          aria-busy={loading || undefined}
          aria-disabled={disabled || loading || undefined}
          role={disabled ? 'link' : undefined}
          onClick={handleClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

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
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';
