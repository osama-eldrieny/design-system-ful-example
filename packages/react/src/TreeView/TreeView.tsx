import {
  forwardRef,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { ChevronRight } from 'lucide-react';
import './TreeView.css';

export interface TreeItem {
  id: string;
  label: ReactNode;
  /** Icon before the label, e.g. a folder or file icon. */
  icon?: ReactNode;
  children?: TreeItem[];
  disabled?: boolean;
}

export type TreeViewSize = 'small' | 'medium';

export interface TreeViewProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  /** Names the tree, e.g. "Files". */
  label: string;
  items: TreeItem[];
  /** Ids of open branches (controlled). */
  expanded?: string[];
  /** Ids of branches open at first. */
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
  /** Id of the selected item (controlled). */
  selected?: string | null;
  defaultSelected?: string | null;
  onSelect?: (id: string) => void;
  /** `small` for dense sidebars, `medium` (default). */
  size?: TreeViewSize;
  /** Draws lines that connect children to their parent. */
  guides?: boolean;
}

interface Flat {
  item: TreeItem;
  level: number;
  parent: string | null;
}

/**
 * A hierarchy of items, like files in folders, that people expand, collapse and select.
 * Implements the WAI-ARIA tree pattern with a single tab stop and arrow-key navigation.
 */
export const TreeView = forwardRef<HTMLUListElement, TreeViewProps>(
  (
    {
      label,
      items,
      expanded,
      defaultExpanded = [],
      onExpandedChange,
      selected,
      defaultSelected = null,
      onSelect,
      size = 'medium',
      guides = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [ownExpanded, setOwnExpanded] = useState(defaultExpanded);
    const [ownSelected, setOwnSelected] = useState(defaultSelected);
    const open = expanded ?? ownExpanded;
    const current = selected === undefined ? ownSelected : selected;
    const [focusId, setFocusId] = useState<string | null>(null);
    const nodes = useRef(new Map<string, HTMLLIElement>());

    // Items visible on screen, in order: used for arrow-key movement.
    const visible = useMemo(() => {
      const out: Flat[] = [];
      const walk = (list: TreeItem[], level: number, parent: string | null) => {
        for (const item of list) {
          out.push({ item, level, parent });
          if (item.children?.length && open.includes(item.id)) walk(item.children, level + 1, item.id);
        }
      };
      walk(items, 1, null);
      return out;
    }, [items, open]);

    const tabStop =
      (focusId && visible.some((v) => v.item.id === focusId) && focusId) ||
      (current && visible.some((v) => v.item.id === current) && current) ||
      visible[0]?.item.id;

    const setOpen = (ids: string[]) => {
      setOwnExpanded(ids);
      onExpandedChange?.(ids);
    };
    const toggle = (id: string) => setOpen(open.includes(id) ? open.filter((x) => x !== id) : [...open, id]);
    const select = (item: TreeItem) => {
      if (item.disabled) return;
      setOwnSelected(item.id);
      onSelect?.(item.id);
    };
    const focus = (id: string | undefined) => {
      if (!id) return;
      setFocusId(id);
      nodes.current.get(id)?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLLIElement>, flat: Flat) => {
      const { item } = flat;
      const index = visible.findIndex((v) => v.item.id === item.id);
      const branch = !!item.children?.length;
      const isOpen = open.includes(item.id);
      const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
      const key =
        event.key === 'ArrowRight' ? (rtl ? 'in-' : 'in+') : event.key === 'ArrowLeft' ? (rtl ? 'in+' : 'in-') : event.key;
      let handled = true;
      switch (key) {
        case 'ArrowDown':
          focus(visible[index + 1]?.item.id);
          break;
        case 'ArrowUp':
          focus(visible[index - 1]?.item.id);
          break;
        case 'Home':
          focus(visible[0]?.item.id);
          break;
        case 'End':
          focus(visible[visible.length - 1]?.item.id);
          break;
        case 'in+':
          if (branch && !isOpen) toggle(item.id);
          else if (branch) focus(visible[index + 1]?.item.id);
          break;
        case 'in-':
          if (branch && isOpen) toggle(item.id);
          else if (flat.parent) focus(flat.parent);
          break;
        case 'Enter':
        case ' ':
          select(item);
          if (branch && key === 'Enter') toggle(item.id);
          break;
        default:
          handled = false;
      }
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const renderList = (list: TreeItem[], level: number, parent: string | null): ReactNode =>
      list.map((item) => {
        const branch = !!item.children?.length;
        const isOpen = branch && open.includes(item.id);
        const isSelected = current === item.id;
        const flat = { item, level, parent };
        return (
          <li
            key={item.id}
            ref={(el) => {
              if (el) nodes.current.set(item.id, el);
              else nodes.current.delete(item.id);
            }}
            role="treeitem"
            aria-level={level}
            aria-expanded={branch ? isOpen : undefined}
            aria-selected={isSelected}
            aria-disabled={item.disabled || undefined}
            tabIndex={tabStop === item.id ? 0 : -1}
            className="ds-tree-view__item"
            style={{ '--tree-view-level': level - 1 } as CSSProperties}
            onKeyDown={(e) => onKeyDown(e, flat)}
            onFocus={(e) => {
              if (e.target === e.currentTarget) setFocusId(item.id);
            }}
          >
            {/* Pointer target; the keyboard is handled on the treeitem itself. */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              className={[
                'ds-tree-view__row',
                isSelected && 'ds-tree-view__row--selected',
                item.disabled && 'ds-tree-view__row--disabled',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                if (item.disabled) return;
                setFocusId(item.id);
                select(item);
                if (branch) toggle(item.id);
              }}
            >
              <span className="ds-tree-view__toggle" aria-hidden="true">
                {branch && (
                  <ChevronRight
                    className={['ds-tree-view__chevron', isOpen && 'ds-tree-view__chevron--open'].filter(Boolean).join(' ')}
                  />
                )}
              </span>
              {item.icon && (
                <span className="ds-tree-view__icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className="ds-tree-view__label">{item.label}</span>
            </div>
            {isOpen && (
              <ul role="group" className="ds-tree-view__group">
                {renderList(item.children!, level + 1, item.id)}
              </ul>
            )}
          </li>
        );
      });

    return (
      <ul
        ref={ref}
        role="tree"
        aria-label={label}
        className={['ds-tree-view', `ds-tree-view--${size}`, guides && 'ds-tree-view--guides', className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {renderList(items, 1, null)}
      </ul>
    );
  },
);
TreeView.displayName = 'TreeView';
