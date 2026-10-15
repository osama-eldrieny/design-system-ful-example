import { forwardRef, useId, useState, type HTMLAttributes } from 'react';
import { Star } from 'lucide-react';
import './Rating.css';

export type RatingSize = 'small' | 'medium' | 'large';

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** What is rated, e.g. "Rate this template". Names the group. */
  label: string;
  /** Rating shown (controlled). 0 means not rated. Halves show in read-only mode. */
  value?: number;
  /** Initial rating when uncontrolled. Default 0. */
  defaultValue?: number;
  /** Called with the chosen rating. */
  onValueChange?: (value: number) => void;
  /** Number of stars. Default 5. */
  max?: number;
  /** Shows a rating without letting people change it, e.g. an average of 4.5. */
  readOnly?: boolean;
  /** `small` in lists and cards, `medium` (default), `large` for a rating form. */
  size?: RatingSize;
  /** Shows the number after the stars, e.g. "4.5". */
  showValue?: boolean;
  /** Words for each star, for translation. Default "1 star", "2 stars"… */
  starLabel?: (n: number, max: number) => string;
  /** Words for the read-only summary. Default "Rated 4.5 out of 5". */
  summaryLabel?: (value: number, max: number) => string;
}

/**
 * Stars for giving or showing a rating. Interactive ratings are a radio group (arrow keys move
 * between scores); read-only ratings are a single image with a spoken summary.
 */
export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      label,
      value,
      defaultValue = 0,
      onValueChange,
      max = 5,
      readOnly = false,
      size = 'medium',
      showValue = false,
      starLabel = (n) => `${n} star${n === 1 ? '' : 's'}`,
      summaryLabel = (v, m) => `Rated ${v} out of ${m}`,
      className,
      ...props
    },
    ref,
  ) => {
    const [own, setOwn] = useState(defaultValue);
    const current = value ?? own;
    const name = useId();
    const stars = Array.from({ length: max }, (_, i) => i + 1);
    const classes = ['ds-rating', `ds-rating--${size}`, readOnly && 'ds-rating--readonly', className]
      .filter(Boolean)
      .join(' ');
    const number = showValue && (
      <span className="ds-rating__value" aria-hidden={readOnly ? undefined : true}>
        {Number.isInteger(current) ? current : current.toFixed(1)}
      </span>
    );

    if (readOnly)
      return (
        <div ref={ref} className={classes} {...props}>
          <span className="ds-rating__stars" role="img" aria-label={`${label}: ${summaryLabel(current, max)}`}>
            {stars.map((n) => {
              const fill = Math.max(0, Math.min(1, current - (n - 1)));
              return (
                <span key={n} className="ds-rating__star" aria-hidden="true">
                  <Star className="ds-rating__icon ds-rating__icon--empty" />
                  <span className="ds-rating__fill" style={{ inlineSize: `${fill * 100}%` }}>
                    <Star className="ds-rating__icon ds-rating__icon--full" />
                  </span>
                </span>
              );
            })}
          </span>
          {number}
        </div>
      );

    return (
      <div ref={ref} role="radiogroup" aria-label={label} className={classes} {...props}>
        <span className="ds-rating__stars">
          {stars.map((n) => (
            <label key={n} className="ds-rating__star ds-rating__option">
              <input
                type="radio"
                className="ds-rating__input"
                name={name}
                value={n}
                checked={current === n}
                aria-label={starLabel(n, max)}
                onChange={() => {
                  setOwn(n);
                  onValueChange?.(n);
                }}
              />
              <Star
                className={['ds-rating__icon', n <= current ? 'ds-rating__icon--full' : 'ds-rating__icon--empty'].join(' ')}
                aria-hidden="true"
              />
            </label>
          ))}
        </span>
        {number}
      </div>
    );
  },
);
Rating.displayName = 'Rating';
