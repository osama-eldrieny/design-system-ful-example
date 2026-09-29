import { forwardRef, type AnchorHTMLAttributes, type ElementType, type ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import './Link.css';

export type LinkSize = 'small' | 'medium' | 'large';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Destination. */
  href?: string;
  /**
   * `inline` (default) sits in running text, underlined and in the text's size; `standalone`
   * stands on its own, e.g. “View all orders”, and can have an icon and a size.
   */
  appearance?: 'inline' | 'standalone';
  /** `primary` (default) in the brand color; `secondary` neutral, for footers and dense UI. */
  variant?: 'primary' | 'secondary';
  /** Size of a standalone link. */
  size?: LinkSize;
  /** Icon after the text of a standalone link, e.g. an arrow. Hidden from screen readers. */
  icon?: ReactNode;
  /**
   * Opens in a new tab with an external-link icon and “(opens in a new tab)” for screen
   * readers. Use for other sites only.
   */
  external?: boolean;
  /** Text announced for external links, for translation. */
  externalLabel?: string;
  /** Render another element, e.g. your router's Link. It receives href and className. */
  as?: ElementType;
  children: ReactNode;
}

/** A link to another page or place. Links go somewhere; for actions, use a Button. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      appearance = 'inline',
      variant = 'primary',
      size = 'medium',
      icon,
      external = false,
      externalLabel = '(opens in a new tab)',
      as: Component = 'a',
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      className={[
        'ds-link',
        `ds-link--${appearance}`,
        variant === 'secondary' && 'ds-link--secondary',
        appearance === 'standalone' && `ds-link--${size}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
      {appearance === 'standalone' && icon && !external && (
        <span className="ds-link__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {external && (
        <>
          <span className="ds-link__icon" aria-hidden="true">
            <ExternalLink />
          </span>
          <span className="ds-link__hidden"> {externalLabel}</span>
        </>
      )}
    </Component>
  ),
);
Link.displayName = 'Link';
