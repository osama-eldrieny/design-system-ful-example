import { forwardRef, type HTMLAttributes } from 'react';
import './Spinner.css';

export type SpinnerAppearance = 'ring' | 'dots' | 'line';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * `ring` (default) a turning circle. `dots` three pulsing dots, e.g. while someone types.
   * `line` a thin bar sliding across, e.g. at the top of a panel.
   */
  appearance?: SpinnerAppearance;
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
  ({ size = 'medium', appearance = 'ring', label = 'Loading', className, ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      className={['ds-spinner', `ds-spinner--${size}`, `ds-spinner--${appearance}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {appearance === 'ring' && <span className="ds-spinner__circle" aria-hidden="true" />}
      {appearance === 'dots' && (
        <span className="ds-spinner__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      )}
      {appearance === 'line' && (
        <span className="ds-spinner__line" aria-hidden="true">
          <span />
        </span>
      )}
      <span className="ds-spinner__label">{label}</span>
    </span>
  ),
);
Spinner.displayName = 'Spinner';
