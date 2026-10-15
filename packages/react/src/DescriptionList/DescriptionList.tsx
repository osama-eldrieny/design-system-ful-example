import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './DescriptionList.css';

export interface DescriptionListItem {
  /** The label, e.g. "Subtotal". */
  term: ReactNode;
  /** The value, e.g. "$120.00". */
  description: ReactNode;
  /** Emphasises the row, e.g. a total: bold and set apart by a line above. */
  emphasis?: boolean;
}

export type DescriptionListLayout = 'horizontal' | 'stacked';

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  items: DescriptionListItem[];
  /** `horizontal` (default) puts terms and values side by side; `stacked` puts values under terms. */
  layout?: DescriptionListLayout;
  /** Draws a line between rows. */
  divided?: boolean;
}

/** Pairs of labels and values, such as an invoice summary, order totals or account details. */
export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ items, layout = 'horizontal', divided = false, className, ...props }, ref) => (
    <dl
      ref={ref}
      className={[
        'ds-description-list',
        `ds-description-list--${layout}`,
        divided && 'ds-description-list--divided',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={['ds-description-list__row', item.emphasis && 'ds-description-list__row--emphasis']
            .filter(Boolean)
            .join(' ')}
        >
          <dt className="ds-description-list__term">{item.term}</dt>
          <dd className="ds-description-list__description">{item.description}</dd>
        </div>
      ))}
    </dl>
  ),
);
DescriptionList.displayName = 'DescriptionList';
