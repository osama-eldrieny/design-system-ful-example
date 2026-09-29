import { forwardRef, type HTMLAttributes } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

export type PaginationAppearance = 'full' | 'simple';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** The page being shown, starting at 1. */
  currentPage: number;
  /** Number of pages. */
  totalPages: number;
  /** Called with the page to show. */
  onPageChange?: (page: number) => void;
  /**
   * `full` (default) lists page numbers, shortening long ranges with “…”. `simple` shows
   * “Page 2 of 10” between the arrows, for narrow spaces.
   */
  appearance?: PaginationAppearance;
  /** How many pages to show on each side of the current page before “…”. */
  siblingCount?: number;
  /** Accessible name of the navigation landmark. Default "Pagination". */
  label?: string;
  /** Accessible names and summary wording, for translation. */
  labels?: {
    previous?: string;
    next?: string;
    page?: (page: number) => string;
    summary?: (page: number, total: number) => string;
  };
}

type Item = number | 'ellipsis-start' | 'ellipsis-end';

/** Page numbers to show: first, last, and a window around the current page. */
export function pageItems(current: number, total: number, siblings = 1): Item[] {
  const slots = siblings * 2 + 5; // first, last, current, two ellipses
  if (total <= slots) return Array.from({ length: total }, (_, i) => i + 1);
  const start = Math.max(2, Math.min(current - siblings, total - 1 - siblings * 2 - 1));
  const end = Math.min(total - 1, Math.max(current + siblings, 2 + siblings * 2 + 1));
  const middle = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return [
    1,
    ...(start > 2 ? (['ellipsis-start'] as const) : []),
    ...middle,
    ...(end < total - 1 ? (['ellipsis-end'] as const) : []),
    total,
  ];
}

/**
 * Moves between pages of a long list or table.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      appearance = 'full',
      siblingCount = 1,
      label = 'Pagination',
      labels = {},
      className,
      ...props
    },
    ref,
  ) => {
    const previous = labels.previous ?? 'Previous page';
    const next = labels.next ?? 'Next page';
    const pageLabel = labels.page ?? ((p: number) => `Page ${p}`);
    const summary = labels.summary ?? ((p: number, t: number) => `Page ${p} of ${t}`);
    const go = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) onPageChange?.(page);
    };

    return (
      <nav
        ref={ref}
        aria-label={label}
        className={['ds-pagination', className].filter(Boolean).join(' ')}
        {...props}
      >
        <ul className="ds-pagination__list">
          <li>
            <button
              type="button"
              className="ds-pagination__item ds-pagination__arrow"
              aria-label={previous}
              title={previous}
              disabled={currentPage <= 1}
              onClick={() => go(currentPage - 1)}
            >
              <ChevronLeft className="ds-pagination__icon" aria-hidden="true" />
            </button>
          </li>
          {appearance === 'simple' ? (
            <li className="ds-pagination__summary" aria-live="polite">
              {summary(currentPage, totalPages)}
            </li>
          ) : (
            pageItems(currentPage, totalPages, siblingCount).map((item) =>
              typeof item === 'number' ? (
                <li key={item}>
                  <button
                    type="button"
                    className="ds-pagination__item ds-pagination__number"
                    aria-label={pageLabel(item)}
                    aria-current={item === currentPage ? 'page' : undefined}
                    onClick={() => go(item)}
                  >
                    {item}
                  </button>
                </li>
              ) : (
                <li key={item} className="ds-pagination__ellipsis" aria-hidden="true">
                  …
                </li>
              ),
            )
          )}
          <li>
            <button
              type="button"
              className="ds-pagination__item ds-pagination__arrow"
              aria-label={next}
              title={next}
              disabled={currentPage >= totalPages}
              onClick={() => go(currentPage + 1)}
            >
              <ChevronRight className="ds-pagination__icon" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
