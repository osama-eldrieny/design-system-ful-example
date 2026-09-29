import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import './Progress.css';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** What is progressing, e.g. "Uploading report.pdf". Names the bar. */
  label: ReactNode;
  /** Hides the label visually but keeps it for screen readers. */
  hideLabel?: boolean;
  /** Current value. Leave out for unknown progress (an animated, indeterminate bar). */
  value?: number;
  /** Value when complete. Default 100. */
  max?: number;
  /** Shows the value, e.g. "45%", next to the label. */
  showValue?: boolean;
  /** Formats the shown and announced value. Default a percentage. */
  formatValue?: (value: number, max: number) => string;
  /** Color meaning: primary (default), success, warning, danger. */
  tone?: 'primary' | 'success' | 'warning' | 'danger';
  /** `small` for a thin bar in cards and tables, `medium` by default. */
  size?: 'small' | 'medium';
}

const percent = (value: number, max: number) => `${Math.round((value / max) * 100)}%`;

/** A bar showing how far a task has got, such as an upload. Indeterminate without a value. */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      label,
      hideLabel = false,
      value,
      max = 100,
      showValue = false,
      formatValue = percent,
      tone = 'primary',
      size = 'medium',
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const clamped = value === undefined ? undefined : Math.min(Math.max(value, 0), max);
    const text = clamped === undefined ? undefined : formatValue(clamped, max);
    return (
      <div
        ref={ref}
        className={[
          'ds-progress',
          `ds-progress--${tone}`,
          `ds-progress--${size}`,
          clamped === undefined && 'ds-progress--indeterminate',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {(!hideLabel || (showValue && text)) && (
          <div className="ds-progress__header">
            <span
              className={hideLabel ? 'ds-progress__hidden' : 'ds-progress__label'}
              id={`${id}-label`}
            >
              {label}
            </span>
            {showValue && text && (
              <span className="ds-progress__value" aria-hidden="true">
                {text}
              </span>
            )}
          </div>
        )}
        {hideLabel && !(showValue && text) && (
          <span className="ds-progress__hidden" id={`${id}-label`}>
            {label}
          </span>
        )}
        <div
          role="progressbar"
          className="ds-progress__track"
          aria-labelledby={`${id}-label`}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={clamped}
          aria-valuetext={text}
        >
          <div
            className="ds-progress__bar"
            style={clamped === undefined ? undefined : { inlineSize: `${(clamped / max) * 100}%` }}
          />
        </div>
      </div>
    );
  },
);
Progress.displayName = 'Progress';
