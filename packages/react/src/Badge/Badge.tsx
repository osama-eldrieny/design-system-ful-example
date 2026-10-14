import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { ArrowRight, X } from 'lucide-react';
import './Badge.css';

/** Colors that carry meaning. */
export type BadgeTone = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
/** Categorical colors with no meaning of their own, e.g. for labels and departments. */
export type BadgeHue = 'gray' | 'blue' | 'sky' | 'indigo' | 'purple' | 'pink' | 'orange' | 'teal';
export type BadgeColor = BadgeTone | BadgeHue;
export type BadgeShape = 'pill' | 'rounded' | 'modern';
export type BadgeSize = 'small' | 'medium' | 'large';

export const BADGE_TONES: BadgeTone[] = ['primary', 'secondary', 'success', 'warning', 'danger'];
export const BADGE_HUES: BadgeHue[] = [
  'gray',
  'blue',
  'sky',
  'indigo',
  'purple',
  'pink',
  'orange',
  'teal',
];

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Color: a meaning (primary default, secondary, success, warning, danger) or a category hue
   * (gray, blue, sky, indigo, purple, pink, orange, teal).
   */
  tone?: BadgeColor;
  /** `solid` for strong emphasis (counts), `subtle` (default) for status labels. */
  appearance?: 'solid' | 'subtle';
  /** `pill` (default) fully rounded, `rounded` small corners, `modern` neutral with a border. */
  shape?: BadgeShape;
  /** `small`, `medium` (default) or `large`. */
  size?: BadgeSize;
  /** Adds a thin border in the tone's color to subtle badges. */
  bordered?: boolean;
  /** A number, e.g. unread messages. Shown as max+ above max. */
  count?: number;
  /** Largest count shown before “99+”. Default 99. */
  max?: number;
  /** Shows only a small dot instead of text. Give it a label. */
  dot?: boolean;
  /** Adds a status dot before the text, e.g. ● Active. */
  withDot?: boolean;
  /** Decorative icon before the text. Alone (no text), the badge is icon-only: give it a label. */
  iconStart?: ReactNode;
  /** Decorative icon after the text. */
  iconEnd?: ReactNode;
  /** Small round picture before the text, e.g. a person or a country flag. Decorative. */
  image?: string;
  /** Shows a remove button that calls this, e.g. for a filter. */
  onDismiss?: () => void;
  /** Accessible name of the remove button. Default "Remove {text}". */
  dismissLabel?: string;
  /**
   * Text for screen readers, e.g. "3 unread messages". Replaces what is shown; required for
   * dots, icon-only badges and bare counts, whose meaning isn't in the text.
   */
  label?: string;
  children?: ReactNode;
}

/**
 * A small label for a status, category or count, e.g. “Paid”, “Design” or 3 unread. Not
 * interactive, except for its optional remove button.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      tone = 'primary',
      appearance = 'subtle',
      shape = 'pill',
      size = 'medium',
      bordered = false,
      count,
      max = 99,
      dot = false,
      withDot = false,
      iconStart,
      iconEnd,
      image,
      onDismiss,
      dismissLabel,
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
    const hasText = shown !== null && shown !== undefined && shown !== '';
    const iconOnly = !dot && !hasText && Boolean(iconStart ?? iconEnd);
    const look = shape === 'modern' ? 'subtle' : appearance;
    return (
      <span
        ref={ref}
        className={[
          'ds-badge',
          `ds-badge--${tone}-${look}`,
          size !== 'medium' && `ds-badge--${size}`,
          shape !== 'pill' && `ds-badge--${shape}`,
          bordered && 'ds-badge--bordered',
          dot && 'ds-badge--dot',
          iconOnly && 'ds-badge--icon-only',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {!dot && withDot && <span className="ds-badge__status" aria-hidden="true" />}
        {!dot && image && <img className="ds-badge__image" src={image} alt="" />}
        {!dot && iconStart && (
          <span className="ds-badge__icon" aria-hidden="true">
            {iconStart}
          </span>
        )}
        {hasText && <span aria-hidden={label ? true : undefined}>{shown}</span>}
        {!dot && iconEnd && (
          <span className="ds-badge__icon" aria-hidden="true">
            {iconEnd}
          </span>
        )}
        {label && <span className="ds-badge__label">{label}</span>}
        {!dot && onDismiss && (
          <button
            type="button"
            className="ds-badge__dismiss"
            aria-label={
              dismissLabel ?? `Remove ${label ?? (typeof shown === 'string' ? shown : '')}`.trim()
            }
            onClick={onDismiss}
          >
            <X aria-hidden="true" />
          </button>
        )}
      </span>
    );
  },
);
Badge.displayName = 'Badge';

export interface BadgeGroupProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** The short badge text, e.g. "New". */
  badge: ReactNode;
  /** The message next to the badge, e.g. "We've just released a new feature". */
  children: ReactNode;
  /** Color of the whole group. Default primary. */
  tone?: BadgeColor;
  /** `leading` (default): badge first. `trailing`: message first, badge last. */
  badgePosition?: 'leading' | 'trailing';
  /** Icon after the message. Default an arrow when the group is a link; `null` hides it. */
  icon?: ReactNode;
}

/**
 * A badge with a message, e.g. “New · Dashboards are here →”, to announce something. With
 * `href` it is a link.
 */
export const BadgeGroup = forwardRef<HTMLAnchorElement, BadgeGroupProps>(
  (
    {
      badge,
      children,
      tone = 'primary',
      badgePosition = 'leading',
      icon,
      href,
      className,
      ...props
    },
    ref,
  ) => {
    const classes = [
      'ds-badge-group',
      `ds-badge-group--${tone}`,
      badgePosition === 'trailing' && 'ds-badge-group--trailing',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    const shownIcon = icon === undefined ? href ? <ArrowRight /> : null : icon;
    const pill = (
      <Badge tone={tone} shape="modern">
        {badge}
      </Badge>
    );
    const content = (
      <>
        {badgePosition === 'leading' && pill}
        <span>{children}</span>
        {shownIcon && (
          <span className="ds-badge-group__icon" aria-hidden="true">
            {shownIcon}
          </span>
        )}
        {badgePosition === 'trailing' && pill}
      </>
    );
    if (href) {
      return (
        <a ref={ref} href={href} className={classes} {...props}>
          {content}
        </a>
      );
    }
    return (
      <span className={classes} {...(props as HTMLAttributes<HTMLSpanElement>)}>
        {content}
      </span>
    );
  },
);
BadgeGroup.displayName = 'BadgeGroup';
