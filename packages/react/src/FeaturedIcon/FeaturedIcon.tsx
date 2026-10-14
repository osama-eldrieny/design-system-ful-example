import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { BadgeColor } from '../Badge';
import './FeaturedIcon.css';

export type FeaturedIconColor = BadgeColor;
export type FeaturedIconAppearance = 'light' | 'solid' | 'outline' | 'modern';
export type FeaturedIconSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface FeaturedIconProps extends HTMLAttributes<HTMLSpanElement> {
  /** The icon, e.g. a lucide-react icon. */
  icon: ReactNode;
  /** Color: a meaning (primary default, success, warning, danger, secondary) or a category hue. */
  tone?: FeaturedIconColor;
  /**
   * `light` (default) tinted background, `solid` filled, `outline` concentric rings, `modern`
   * a neutral tile with a border.
   */
  appearance?: FeaturedIconAppearance;
  /** `small` 32px, `medium` 40px (default), `large` 48px, `xlarge` 56px. */
  size?: FeaturedIconSize;
  /** `circle` (default) or `square` with rounded corners. */
  shape?: 'circle' | 'square';
  /**
   * What the icon means, when it isn't said in nearby text. Without it the icon is
   * decorative and hidden from screen readers.
   */
  label?: string;
}

/**
 * An icon in a colored shape that draws the eye: at the top of a modal, empty state, alert or
 * metric card.
 */
export const FeaturedIcon = forwardRef<HTMLSpanElement, FeaturedIconProps>(
  (
    {
      icon,
      tone = 'primary',
      appearance = 'light',
      size = 'medium',
      shape = 'circle',
      label,
      className,
      ...props
    },
    ref,
  ) => (
    <span
      ref={ref}
      className={[
        'ds-featured-icon',
        appearance === 'modern'
          ? 'ds-featured-icon--modern'
          : `ds-featured-icon--${tone}-${appearance}`,
        appearance === 'outline' && 'ds-featured-icon--outline',
        size !== 'medium' && `ds-featured-icon--${size}`,
        shape === 'square' && 'ds-featured-icon--square',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      {...props}
    >
      {icon}
    </span>
  ),
);
FeaturedIcon.displayName = 'FeaturedIcon';
