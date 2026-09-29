import { forwardRef, type HTMLAttributes } from 'react';
import './Spinner.css';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** `small` inside buttons and fields, `medium` (default), `large` for page areas. */
  size?: 'small' | 'medium' | 'large';
  /** What is loading, announced politely, e.g. "Loading orders". Default "Loading". */
  label?: string;
}

/**
 * A spinning indicator for loading that takes an unknown time. Announced once as a status.
 * For known progress, use Progress.
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'medium', label = 'Loading', className, ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      className={['ds-spinner', `ds-spinner--${size}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      <span className="ds-spinner__circle" aria-hidden="true" />
      <span className="ds-spinner__label">{label}</span>
    </span>
  ),
);
Spinner.displayName = 'Spinner';
