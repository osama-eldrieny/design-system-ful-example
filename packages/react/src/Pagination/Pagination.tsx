import { forwardRef, type HTMLAttributes } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

export type PaginationAppearance = 'full' | 'simple' | 'card' | 'dots';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** The page being shown, starting at 1. */
  currentPage: number;
  /** Number of pages. */
  totalPages: number;
  /** Called with the page to show. */
  onPageChange?: (page: number) => void;
  /**
   * `full` (default) lists page numbers, shortening long ranges with “…”. `simple` shows
   * “Page 2 of 10” between the arrows, for narrow spaces. `card` is a bordered bar with the
   * summary on the start side and labelled Previous / Next on the end, under tables and cards.
   * `dots` shows one dot per page and no arrows, for carousels and onboarding steps.
   */
  appearance?: PaginationAppearance;
  /** How many pages to show on each side of the current page before “…”. */
  siblingCount?: number;
  /** Shows "Previous" and "Next" as text beside the arrows. */
  showArrowLabels?: boolean;
  /**
   * `compact` (default) keeps everything together. `spread` pushes previous and next to the
   * edges with the pages centered, e.g. under a table.
   */
  layout?: 'compact' | 'spread';
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
      showArrowLabels = false,
      layout = 'compact',
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

    if (appearance === 'dots')
      return (
        <nav
          ref={ref}
          aria-label={label}
          className={['ds-pagination', 'ds-pagination--dots', className].filter(Boolean).join(' ')}
          {...props}
        >
          <ul className="ds-pagination__list">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className="ds-pagination__dot"
                  aria-label={pageLabel(item)}
                  aria-current={item === currentPage ? 'page' : undefined}
                  onClick={() => go(item)}
                />
              </li>
            ))}
          </ul>
        </nav>
      );

    if (appearance === 'card')
      return (
        <nav
          ref={ref}
          aria-label={label}
          className={['ds-pagination', 'ds-pagination--card', className].filter(Boolean).join(' ')}
          {...props}
        >
          <span className="ds-pagination__summary" aria-live="polite">
            {summary(currentPage, totalPages)}
          </span>
          <span className="ds-pagination__card-actions">
            <button
              type="button"
              className="ds-pagination__item ds-pagination__arrow ds-pagination__card-button"
              disabled={currentPage <= 1}
              onClick={() => go(currentPage - 1)}
            >
              {labels.previous ?? 'Previous'}
            </button>
            <button
              type="button"
              className="ds-pagination__item ds-pagination__arrow ds-pagination__card-button"
              disabled={currentPage >= totalPages}
              onClick={() => go(currentPage + 1)}
            >
              {labels.next ?? 'Next'}
            </button>
          </span>
        </nav>
      );

    return (
      <nav
        ref={ref}
        aria-label={label}
        className={[
          'ds-pagination',
          layout === 'spread' && 'ds-pagination--spread',
          showArrowLabels && 'ds-pagination--labelled',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        <ul className="ds-pagination__list">
          <li>
            <button
              type="button"
              className="ds-pagination__item ds-pagination__arrow"
              aria-label={showArrowLabels ? undefined : previous}
              title={showArrowLabels ? undefined : previous}
              disabled={currentPage <= 1}
              onClick={() => go(currentPage - 1)}
            >
              <ChevronLeft className="ds-pagination__icon" aria-hidden="true" />
              {showArrowLabels && <span>{labels.previous ?? 'Previous'}</span>}
            </button>
          </li>
          {appearance === 'simple' ? (
            <li className="ds-pagination__summary ds-pagination__middle" aria-live="polite">
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
              aria-label={showArrowLabels ? undefined : next}
              title={showArrowLabels ? undefined : next}
              disabled={currentPage >= totalPages}
              onClick={() => go(currentPage + 1)}
            >
              {showArrowLabels && <span>{labels.next ?? 'Next'}</span>}
              <ChevronRight className="ds-pagination__icon" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
