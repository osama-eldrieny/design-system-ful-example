import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import './EmptyState.css';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Decorative icon. Default an inbox. */
  icon?: ReactNode;
  /** What’s empty, e.g. "No orders yet". */
  title: ReactNode;
  /** Why it’s empty and what to do next. */
  description?: ReactNode;
  /** Actions, e.g. a Button to create the first item. */
  actions?: ReactNode;
  /** Heading level that fits the page. Default h2. */
  titleAs?: 'h2' | 'h3' | 'h4';
  /** `small` inside cards and tables, `medium` (default), `large` for a whole page. */
  size?: 'small' | 'medium' | 'large';
  /** An image or illustration shown instead of the icon. Decorative. */
  illustration?: ReactNode;
}

/** Fills a space with nothing to show yet, explaining why and offering a next step. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon = <Inbox />,
      title,
      description,
      actions,
      titleAs: Heading = 'h2',
      size = 'medium',
      illustration,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={['ds-empty-state', size !== 'medium' && `ds-empty-state--${size}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {illustration ? (
        <span className="ds-empty-state__illustration" aria-hidden="true">
          {illustration}
        </span>
      ) : (
        <span className="ds-empty-state__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <Heading className="ds-empty-state__title">{title}</Heading>
      {description && <p className="ds-empty-state__description">{description}</p>}
      {actions && <div className="ds-empty-state__actions">{actions}</div>}
    </div>
  ),
);
EmptyState.displayName = 'EmptyState';
