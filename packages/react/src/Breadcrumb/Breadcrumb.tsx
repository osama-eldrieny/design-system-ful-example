import { forwardRef, useState, type HTMLAttributes, type MouseEvent } from 'react';
import { ChevronRight } from 'lucide-react';
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
        className={['ds-breadcrumb', className].filter(Boolean).join(' ')}
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
                  <a className="ds-breadcrumb__link" href={item.href} onClick={item.onClick}>
                    {item.label}
                  </a>
                )}
                {!last && <ChevronRight className="ds-breadcrumb__separator" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);
Breadcrumb.displayName = 'Breadcrumb';
