import { forwardRef, useState, type HTMLAttributes, type MouseEvent } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  /** Link to that page. The last item is the current page and isn’t a link. */
  href?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** From the top level down to the current page (last). */
  items: BreadcrumbItem[];
  /**
   * Shows at most this many items; the middle collapses into a “…” button that expands
   * them. At least 3.
   */
  maxItems?: number;
  /** Accessible name of the “…” button. Default "Show all pages". */
  expandLabel?: string;
  /** `chevron` (default) or `slash` between items. */
  separator?: 'chevron' | 'slash';
  /** Shows a home icon instead of the first item's text (its label stays the accessible name). */
  homeIcon?: boolean;
  /** `text` (default) or `button`: items get a tinted background on hover and when current. */
  appearance?: 'text' | 'button';
  /** Names the navigation landmark. Default "Breadcrumb". */
  'aria-label'?: string;
}

/** Shows where the current page sits in the site’s hierarchy, with links back up. */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      maxItems,
      expandLabel = 'Show all pages',
      separator = 'chevron',
      homeIcon = false,
      appearance = 'text',
      'aria-label': ariaLabel = 'Breadcrumb',
      className,
      ...props
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useState(false);
    const limit = maxItems ? Math.max(3, maxItems) : Infinity;
    const collapse = !expanded && items.length > limit;
    const shown = collapse ? [items[0], null, ...items.slice(items.length - (limit - 2))] : items;

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={['ds-breadcrumb', appearance === 'button' && 'ds-breadcrumb--button', className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <ol className="ds-breadcrumb__list">
          {shown.map((item, i) => {
            const last = i === shown.length - 1;
            return (
              <li key={item ? `${item.label}-${i}` : 'more'} className="ds-breadcrumb__item">
                {item === null ? (
                  <button
                    type="button"
                    className="ds-breadcrumb__more"
                    aria-label={expandLabel}
                    onClick={() => setExpanded(true)}
                  >
                    …
                  </button>
                ) : last ? (
                  <span className="ds-breadcrumb__current" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <a
                    className="ds-breadcrumb__link"
                    href={item.href}
                    onClick={item.onClick}
                    aria-label={homeIcon && i === 0 ? item.label : undefined}
                  >
                    {homeIcon && i === 0 ? (
                      <Home className="ds-breadcrumb__home" aria-hidden="true" />
                    ) : (
                      item.label
                    )}
                  </a>
                )}
                {!last &&
                  (separator === 'slash' ? (
                    <span className="ds-breadcrumb__slash" aria-hidden="true">
                      /
                    </span>
                  ) : (
                    <ChevronRight className="ds-breadcrumb__separator" aria-hidden="true" />
                  ))}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);
Breadcrumb.displayName = 'Breadcrumb';
