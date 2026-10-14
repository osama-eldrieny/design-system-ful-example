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
  /**
   * Where the value shows with showValue: `top` (default) beside the label, `end` after the
   * bar, `bottom` under the bar's end.
   */
  valuePosition?: 'top' | 'end' | 'bottom';
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
      valuePosition = 'top',
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const clamped = value === undefined ? undefined : Math.min(Math.max(value, 0), max);
    const text = clamped === undefined ? undefined : formatValue(clamped, max);
    const valueOnTop = showValue && text && valuePosition === 'top';
    const valueText = showValue && text && (
      <span className="ds-progress__value" aria-hidden="true">
        {text}
      </span>
    );
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
        {(!hideLabel || valueOnTop) && (
          <div className="ds-progress__header">
            <span
              className={hideLabel ? 'ds-progress__hidden' : 'ds-progress__label'}
              id={`${id}-label`}
            >
              {label}
            </span>
            {valueOnTop && valueText}
          </div>
        )}
        {hideLabel && !valueOnTop && (
          <span className="ds-progress__hidden" id={`${id}-label`}>
            {label}
          </span>
        )}
        <div className={`ds-progress__body ds-progress__body--${valuePosition}`}>
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
              style={
                clamped === undefined ? undefined : { inlineSize: `${(clamped / max) * 100}%` }
              }
            />
          </div>
          {!valueOnTop && valueText}
        </div>
      </div>
    );
  },
);
Progress.displayName = 'Progress';

export interface ProgressCircleProps extends HTMLAttributes<HTMLDivElement> {
  /** What is measured, e.g. "Storage used". Names the progress bar; shown under the ring. */
  label: ReactNode;
  /** Hides the label visually; it is still announced. */
  hideLabel?: boolean;
  /** Current value, 0 to max. */
  value: number;
  max?: number;
  /** Text in the middle. Default: the percentage. */
  formatValue?: (value: number, max: number) => string;
  /** Small caption under the value inside the ring, e.g. "Active users". */
  caption?: ReactNode;
  /** `circle` (default) full ring, `half` a semicircle gauge. */
  shape?: 'circle' | 'half';
  /** `small` 64px, `medium` 120px (default), `large` 200px. */
  size?: 'small' | 'medium' | 'large';
  tone?: 'primary' | 'success' | 'warning' | 'danger';
}

/** A ring or half-ring gauge showing how far along something is, with the value inside. */
export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  (
    {
      label,
      hideLabel = false,
      value,
      max = 100,
      formatValue = percent,
      caption,
      shape = 'circle',
      size = 'medium',
      tone = 'primary',
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const clamped = Math.min(Math.max(value, 0), max);
    const text = formatValue(clamped, max);
    const ratio = max > 0 ? clamped / max : 0;
    // Path length 100 so the dash maps straight to the ratio.
    const half = shape === 'half';
    const d = half ? 'M 6 50 A 44 44 0 0 1 94 50' : 'M 50 6 A 44 44 0 1 1 49.99 6';
    return (
      <div
        ref={ref}
        className={[
          'ds-progress-circle',
          `ds-progress-circle--${size}`,
          `ds-progress-circle--${tone}`,
          half && 'ds-progress-circle--half',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <div
          className="ds-progress-circle__ring"
          role="progressbar"
          aria-labelledby={`${id}-label`}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={clamped}
          aria-valuetext={text}
        >
          <svg viewBox={half ? '0 0 100 56' : '0 0 100 100'} aria-hidden="true">
            <path className="ds-progress-circle__track" d={d} pathLength={100} />
            <path
              className="ds-progress-circle__bar"
              d={d}
              pathLength={100}
              strokeDasharray={`${ratio * 100} 100`}
            />
          </svg>
          <span className="ds-progress-circle__content" aria-hidden="true">
            <span className="ds-progress-circle__value">{text}</span>
            {caption && <span className="ds-progress-circle__caption">{caption}</span>}
          </span>
        </div>
        <span
          className={hideLabel ? 'ds-progress__hidden' : 'ds-progress-circle__label'}
          id={`${id}-label`}
        >
          {label}
        </span>
      </div>
    );
  },
);
ProgressCircle.displayName = 'ProgressCircle';
