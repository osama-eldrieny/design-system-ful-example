import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import './Skeleton.css';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** `text` lines (default), a `rect` block such as an image, or a `circle` such as an avatar. */
  variant?: 'text' | 'rect' | 'circle';
  /** Number of text lines; the last is shorter. */
  lines?: number;
  /** Width, e.g. "60%" or 120 (px). Text defaults to full width. */
  width?: CSSProperties['inlineSize'];
  /** Height of a rect or circle, e.g. 160 (px). */
  height?: CSSProperties['blockSize'];
}

/**
 * A placeholder in the shape of content that is loading. Hidden from screen readers: mark the
 * loading region with aria-busy and announce loading once (e.g. with a Spinner).
 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ variant = 'text', lines = 1, width, height, className, style, ...props }, ref) => {
    const size: CSSProperties = { inlineSize: width, blockSize: height };
    if (variant === 'circle') size.blockSize = height ?? width;
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={['ds-skeleton', `ds-skeleton--${variant}`, className].filter(Boolean).join(' ')}
        style={{ ...(variant === 'text' ? { inlineSize: width } : size), ...style }}
        {...props}
      >
        {variant === 'text' &&
          Array.from({ length: lines }, (_, i) => <span key={i} className="ds-skeleton__line" />)}
      </span>
    );
  },
);
Skeleton.displayName = 'Skeleton';
