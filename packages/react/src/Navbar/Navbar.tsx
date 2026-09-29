import { forwardRef, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import './Navbar.css';

export interface NavbarItem {
  /** Stable id. Defaults to the label. */
  id?: string;
  /** Visible text; names the link. */
  label: string;
  /** Destination. Items with href are links; items without are buttons (for app views). */
  href?: string;
  /** Decorative icon before the label. */
  icon?: ReactNode;
  /** Called on click, e.g. to switch views in a single-page app. */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** Usually a Logo linking home. */
  logo?: ReactNode;
  /** The main destinations; keep to about five. */
  items: NavbarItem[];
  /** Id of the current page's item (controlled). */
  currentItem?: string;
  /** Initially current item when uncontrolled; clicking an item makes it current. */
  defaultCurrentItem?: string;
  /** Called with the item id when an item is clicked. */
  onCurrentItemChange?: (id: string) => void;
  /** Content at the end of the bar, e.g. a Button or an Avatar. */
  actions?: ReactNode;
  /** Names the navigation landmark. Default "Main". */
  'aria-label'?: string;
}

const itemId = (item: NavbarItem) => item.id ?? item.label;

/**
 * The site's main navigation bar: logo, links to the top-level pages, and optional
 * actions. The current page is marked with aria-current.
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      logo,
      items,
      currentItem,
      defaultCurrentItem,
      onCurrentItemChange,
      actions,
      'aria-label': ariaLabel = 'Main',
      className,
      ...props
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultCurrentItem);
    const current = currentItem ?? uncontrolled;

    const select = (item: NavbarItem, event: MouseEvent<HTMLElement>) => {
      const id = itemId(item);
      setUncontrolled(id);
      onCurrentItemChange?.(id);
      item.onClick?.(event);
    };

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={['ds-navbar', className].filter(Boolean).join(' ')}
        {...props}
      >
        {logo && <div className="ds-navbar__logo">{logo}</div>}
        <ul className="ds-navbar__list">
          {items.map((item) => {
            const id = itemId(item);
            const shared = {
              className: 'ds-navbar__item',
              'aria-current': id === current ? ('page' as const) : undefined,
              onClick: (event: MouseEvent<HTMLElement>) => select(item, event),
            };
            const content = (
              <>
                {item.icon && (
                  <span className="ds-navbar__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </>
            );
            return (
              <li key={id}>
                {item.href ? (
                  <a href={item.href} {...shared}>
                    {content}
                  </a>
                ) : (
                  <button type="button" {...shared}>
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        {actions && <div className="ds-navbar__actions">{actions}</div>}
      </nav>
    );
  },
);
Navbar.displayName = 'Navbar';
