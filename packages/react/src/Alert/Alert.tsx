import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';
import './Alert.css';

export type AlertVariant = 'primary' | 'success' | 'warning' | 'danger';
export type AlertAppearance = 'subtle' | 'solid' | 'outline';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * What kind of message it is. `primary` for information, `success` for a completed
   * action, `warning` for something that needs attention, `danger` for errors and failures.
   */
  variant?: AlertVariant;
  /**
   * Visual weight. `subtle` (default) for most messages, `solid` for the most important one
   * on the page, `outline` on busy or tinted backgrounds.
   */
  appearance?: AlertAppearance;
  /** Short summary of the message. */
  title: ReactNode;
  /** Longer explanation under the title. */
  children?: ReactNode;
  /** Replaces the variant's default icon. Pass `null` for no icon. */
  icon?: ReactNode;
  /** Buttons or links related to the message, e.g. "Retry". */
  actions?: ReactNode;
  /** Shows a dismiss button that calls this. */
  onDismiss?: () => void;
  /** Accessible name of the dismiss button. Default "Dismiss". */
  dismissLabel?: string;
}

const ICONS: Record<AlertVariant, ReactNode> = {
  primary: <Info />,
  success: <CircleCheck />,
  warning: <TriangleAlert />,
  danger: <CircleAlert />,
};

/**
 * A message about the page or an action: information, success, a warning or an error.
 * Danger and warning alerts are announced to screen readers immediately; the others politely.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'primary',
      appearance = 'subtle',
      title,
      children,
      icon,
      actions,
      onDismiss,
      dismissLabel = 'Dismiss',
      className,
      ...props
    },
    ref,
  ) => {
    const shownIcon = icon === undefined ? ICONS[variant] : icon;
    return (
      <div
        ref={ref}
        role={variant === 'danger' || variant === 'warning' ? 'alert' : 'status'}
        className={['ds-alert', `ds-alert--${variant}`, `ds-alert--${appearance}`, className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {shownIcon && (
          <span className="ds-alert__icon" aria-hidden="true">
            {shownIcon}
          </span>
        )}
        <div className="ds-alert__content">
          <div className="ds-alert__title">{title}</div>
          {children && <div className="ds-alert__description">{children}</div>}
          {actions && <div className="ds-alert__actions">{actions}</div>}
        </div>
        {onDismiss && (
          <button
            type="button"
            className="ds-alert__dismiss"
            aria-label={dismissLabel}
            title={dismissLabel}
            onClick={onDismiss}
          >
            <X aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
