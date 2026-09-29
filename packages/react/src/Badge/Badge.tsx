import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Badge.css';

export type BadgeTone = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Meaning: primary (default), secondary (neutral), success, warning, danger. */
  tone?: BadgeTone;
  /** `solid` for strong emphasis (counts), `subtle` (default) for status labels. */
  appearance?: 'solid' | 'subtle';
  /** A number, e.g. unread messages. Shown as max+ above max. */
  count?: number;
  /** Largest count shown before “99+”. Default 99. */
  max?: number;
  /** Shows a small dot instead of text. Give it a label. */
  dot?: boolean;
  /**
   * Text for screen readers, e.g. "3 unread messages". Replaces what is shown; required for
   * dots and bare counts, whose meaning isn't in the text.
   */
  label?: string;
  children?: ReactNode;
}

/** A small label for a status or a count, e.g. “New”, “Paid” or 3 unread. Not interactive. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      tone = 'primary',
      appearance = 'subtle',
      count,
      max = 99,
      dot = false,
      label,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const shown = dot
      ? null
      : count !== undefined
        ? count > max
          ? `${max}+`
          : String(count)
        : children;
    return (
      <span
        ref={ref}
        className={[
          'ds-badge',
          `ds-badge--${tone}-${appearance}`,
          dot && 'ds-badge--dot',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <span aria-hidden={label ? true : undefined}>{shown}</span>
        {label && <span className="ds-badge__label">{label}</span>}
      </span>
    );
  },
);
Badge.displayName = 'Badge';
