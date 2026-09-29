import {
  forwardRef,
  useId,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { ChevronDown } from 'lucide-react';
import './SideNav.css';

export interface SideNavItem {
  /** Stable id; defaults to the label. Used for currentItem. */
  id?: string;
  label: string;
  href?: string;
  /** Decorative icon before the label. */
  icon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** Nested pages; the item becomes a button that shows and hides them. */
  items?: SideNavItem[];
}

export interface SideNavSection {
  /** Optional heading of the section. */
  title?: string;
  items: SideNavItem[];
}

export interface SideNavProps extends HTMLAttributes<HTMLElement> {
  /** Sections of links. Nested items expand and collapse. */
  sections: SideNavSection[];
  /** Id of the current page’s item. Its parents start expanded. */
  currentItem?: string;
  /** Names the navigation landmark. Default "Side". */
  'aria-label'?: string;
}

const idOf = (item: SideNavItem) => item.id ?? item.label;
const contains = (item: SideNavItem, id?: string): boolean =>
  !!id && (idOf(item) === id || !!item.items?.some((child) => contains(child, id)));

function Item({ item, current, depth }: { item: SideNavItem; current?: string; depth: number }) {
  const [open, setOpen] = useState(() => contains(item, current) && idOf(item) !== current);
  const listId = useId();
  const style = { ['--_depth' as string]: depth };
  const content = (
    <>
      {item.icon && (
        <span className="ds-side-nav__icon" aria-hidden="true">
          {item.icon}
        </span>
      )}
      <span className="ds-side-nav__label">{item.label}</span>
    </>
  );

  if (item.items?.length) {
    return (
      <li>
        <button
          type="button"
          className="ds-side-nav__item ds-side-nav__item--group"
          style={style}
          aria-expanded={open}
          aria-controls={listId}
          onClick={(event) => {
            setOpen(!open);
            item.onClick?.(event);
          }}
        >
          {content}
          <ChevronDown className="ds-side-nav__chevron" aria-hidden="true" />
        </button>
        <ul className="ds-side-nav__list" id={listId} hidden={!open}>
          {item.items.map((child) => (
            <Item key={idOf(child)} item={child} current={current} depth={depth + 1} />
          ))}
        </ul>
      </li>
    );
  }
  return (
    <li>
      <a
        className="ds-side-nav__item"
        style={style}
        href={item.href}
        aria-current={idOf(item) === current ? 'page' : undefined}
        onClick={item.onClick}
      >
        {content}
      </a>
    </li>
  );
}

/**
 * Vertical navigation for apps and docs with many pages: sections, icons, and nested groups
 * that expand. The current page is marked with aria-current.
 */
export const SideNav = forwardRef<HTMLElement, SideNavProps>(
  ({ sections, currentItem, 'aria-label': ariaLabel = 'Side', className, ...props }, ref) => {
    const baseId = useId();
    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={['ds-side-nav', className].filter(Boolean).join(' ')}
        {...props}
      >
        {sections.map((section, i) => (
          <div key={section.title ?? i} className="ds-side-nav__section">
            {section.title && (
              <span className="ds-side-nav__group-label" id={`${baseId}-${i}`}>
                {section.title}
              </span>
            )}
            <ul
              className="ds-side-nav__list"
              aria-labelledby={section.title ? `${baseId}-${i}` : undefined}
            >
              {section.items.map((item) => (
                <Item key={idOf(item)} item={item} current={currentItem} depth={0} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
    );
  },
);
SideNav.displayName = 'SideNav';
