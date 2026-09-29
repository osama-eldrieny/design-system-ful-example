import { forwardRef, type HTMLAttributes, type MouseEvent, type ReactNode, type Ref } from 'react';
import './List.css';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /** Lines between items. */
  divided?: boolean;
  /** Numbered list (ol) when order matters. */
  ordered?: boolean;
  children: ReactNode;
}

/** A vertical list of related items, e.g. files, people or settings. */
export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ divided = false, ordered = false, className, ...props }, ref) => {
    const Tag = ordered ? 'ol' : 'ul';
    return (
      <Tag
        ref={ref as Ref<HTMLUListElement & HTMLOListElement>}
        className={['ds-list', divided && 'ds-list--divided', className].filter(Boolean).join(' ')}
        {...props}
      />
    );
  },
);
List.displayName = 'List';

export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'title' | 'onClick'> {
  /** Main text. */
  title: ReactNode;
  /** Second line. */
  description?: ReactNode;
  /** Leading icon or Avatar. Icons are decorative. */
  icon?: ReactNode;
  /** Trailing content, e.g. a date, Badge or Switch. */
  meta?: ReactNode;
  /** Makes the item a link. */
  href?: string;
  /** Makes the item a button (when there is no href). */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

/** One item of a List. With href or onClick, the whole row is the target. */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ title, description, icon, meta, href, onClick, className, ...props }, ref) => {
    const content = (
      <>
        {icon && (
          <span className="ds-list__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="ds-list__text">
          <span className="ds-list__title">{title}</span>
          {description && <span className="ds-list__description">{description}</span>}
        </span>
      </>
    );
    return (
      <li ref={ref} className={['ds-list__item', className].filter(Boolean).join(' ')} {...props}>
        {href ? (
          <a className="ds-list__row ds-list__row--interactive" href={href} onClick={onClick}>
            {content}
          </a>
        ) : onClick ? (
          <button
            type="button"
            className="ds-list__row ds-list__row--interactive"
            onClick={onClick}
          >
            {content}
          </button>
        ) : (
          <div className="ds-list__row">{content}</div>
        )}
        {meta && <span className="ds-list__meta">{meta}</span>}
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';
