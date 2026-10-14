import {
  forwardRef,
  useId,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { Tooltip } from '../Tooltip';
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
  /** A count or short tag after the label, e.g. unread items or "New". */
  badge?: ReactNode;
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
  /**
   * Slim: icons only, labels in tooltips, for a collapsed sidebar. Nested groups show their
   * children only when expanded; give every top-level item an icon.
   */
  collapsed?: boolean;
  /** Above the sections, e.g. the product logo or a search field. */
  header?: ReactNode;
  /** Pinned to the bottom, e.g. settings links and the account (AvatarLabelGroup). */
  footer?: ReactNode;
}

const idOf = (item: SideNavItem) => item.id ?? item.label;
const contains = (item: SideNavItem, id?: string): boolean =>
  !!id && (idOf(item) === id || !!item.items?.some((child) => contains(child, id)));

function Item({
  item,
  current,
  depth,
  collapsed,
}: {
  item: SideNavItem;
  current?: string;
  depth: number;
  collapsed?: boolean;
}) {
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
      {item.badge !== undefined && <span className="ds-side-nav__badge">{item.badge}</span>}
    </>
  );
  const tip = (node: ReactElement) =>
    collapsed && depth === 0 ? (
      <Tooltip content={item.label} side="right">
        {node}
      </Tooltip>
    ) : (
      node
    );

  if (item.items?.length) {
    return (
      <li>
        {tip(
          <button
            type="button"
            className="ds-side-nav__item ds-side-nav__item--group"
            style={style}
            aria-expanded={open}
            aria-controls={listId}
            aria-label={collapsed ? item.label : undefined}
            onClick={(event) => {
              setOpen(!open);
              item.onClick?.(event);
            }}
          >
            {content}
            <ChevronDown className="ds-side-nav__chevron" aria-hidden="true" />
          </button>,
        )}
        <ul className="ds-side-nav__list" id={listId} hidden={!open}>
          {item.items.map((child) => (
            <Item
              key={idOf(child)}
              item={child}
              current={current}
              depth={depth + 1}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </li>
    );
  }
  return (
    <li>
      {tip(
        <a
          className="ds-side-nav__item"
          style={style}
          href={item.href}
          aria-current={idOf(item) === current ? 'page' : undefined}
          aria-label={collapsed && depth === 0 ? item.label : undefined}
          onClick={item.onClick}
        >
          {content}
        </a>,
      )}
    </li>
  );
}

/**
 * Vertical navigation for apps and docs with many pages: sections, icons, and nested groups
 * that expand. The current page is marked with aria-current.
 */
export const SideNav = forwardRef<HTMLElement, SideNavProps>(
  (
    {
      sections,
      currentItem,
      'aria-label': ariaLabel = 'Side',
      collapsed = false,
      header,
      footer,
      className,
      ...props
    },
    ref,
  ) => {
    const baseId = useId();
    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={['ds-side-nav', collapsed && 'ds-side-nav--collapsed', className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {header && <div className="ds-side-nav__header">{header}</div>}
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
                <Item
                  key={idOf(item)}
                  item={item}
                  current={currentItem}
                  depth={0}
                  collapsed={collapsed}
                />
              ))}
            </ul>
          </div>
        ))}
        {footer && <div className="ds-side-nav__footer">{footer}</div>}
      </nav>
    );
  },
);
SideNav.displayName = 'SideNav';
