import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Search } from 'lucide-react';
import { Kbd } from '../Kbd';
import { usePortalThemeAttributes } from '../ThemeProvider';
import './CommandMenu.css';

export interface CommandMenuItem {
  id: string;
  label: string;
  /** Decorative icon before the label. */
  icon?: ReactNode;
  /** Secondary text, e.g. a page path or an email. */
  description?: string;
  /** Shortcut hint, e.g. ["⌘", "N"]. Decorative. */
  shortcut?: string[];
  /** Extra words that should match the search, e.g. synonyms. */
  keywords?: string[];
  /** Runs when the item is chosen; the menu then closes. */
  onSelect?: () => void;
  disabled?: boolean;
}

export interface CommandMenuGroup {
  /** Group heading, e.g. "Pages" or "Actions". */
  label: string;
  items: CommandMenuItem[];
}

export interface CommandMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Results, grouped. Filtered by the search text. */
  groups: CommandMenuGroup[];
  /** Names the dialog and the search field. Default "Command menu". */
  label?: string;
  /** Default "Search or type a command…". */
  placeholder?: string;
  /** Shown when nothing matches. Default "No results". */
  emptyText?: ReactNode;
  /** Opens the menu with ⌘K / Ctrl+K anywhere on the page. Default true. */
  hotkey?: boolean;
  /** Shows key hints at the bottom. Default true. */
  showFooter?: boolean;
  /** Called with the search text, e.g. to load results from a server. */
  onSearchChange?: (search: string) => void;
}

const matches = (item: CommandMenuItem, q: string) =>
  !q ||
  [item.label, item.description, ...(item.keywords ?? [])]
    .filter(Boolean)
    .some((text) => text!.toLowerCase().includes(q));

/**
 * A searchable list of pages and actions in a dialog, opened with ⌘K: type to filter, arrow
 * keys to move, Enter to run.
 */
export const CommandMenu = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  groups,
  label = 'Command menu',
  placeholder = 'Search or type a command…',
  emptyText = 'No results',
  hotkey = true,
  showFooter = true,
  onSearchChange,
}: CommandMenuProps) => {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = openProp ?? innerOpen;
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setInnerOpen(next);
    onOpenChange?.(next);
  };
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(0);
  const id = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const themeAttrs = usePortalThemeAttributes();

  useEffect(() => {
    if (!hotkey) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (openProp === undefined) setInnerOpen((o) => !o);
        onOpenChange?.(!open);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [hotkey, open, openProp, onOpenChange]);

  const q = search.trim().toLowerCase();
  const shown = useMemo(
    () =>
      groups
        .map((g) => ({ ...g, items: g.items.filter((item) => matches(item, q)) }))
        .filter((g) => g.items.length),
    [groups, q],
  );
  const flat = shown.flatMap((g) => g.items).filter((item) => !item.disabled);
  const current = flat[Math.min(active, flat.length - 1)];
  const optionId = (item: CommandMenuItem) => `${id}-option-${item.id}`;

  useEffect(() => {
    if (!current) return;
    document.getElementById(optionId(current))?.scrollIntoView?.({ block: 'nearest' });
  });

  const run = (item?: CommandMenuItem) => {
    if (!item || item.disabled) return;
    item.onSelect?.();
    setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActive(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setActive(flat.length - 1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      run(current);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setSearch('');
          setActive(0);
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="ds-command-menu__scrim" {...themeAttrs} />
        <Dialog.Content className="ds-command-menu" aria-describedby={undefined} {...themeAttrs}>
          <Dialog.Title className="ds-command-menu__hidden">{label}</Dialog.Title>
          <div className="ds-command-menu__search">
            <Search className="ds-command-menu__icon" aria-hidden="true" />
            <input
              className="ds-command-menu__input"
              role="combobox"
              aria-label={label}
              aria-expanded="true"
              aria-controls={`${id}-list`}
              aria-autocomplete="list"
              aria-activedescendant={current ? optionId(current) : undefined}
              placeholder={placeholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActive(0);
                onSearchChange?.(e.target.value);
              }}
              onKeyDown={onKeyDown}
            />
          </div>
          <div
            className="ds-command-menu__list"
            id={`${id}-list`}
            role="listbox"
            aria-label={label}
            ref={listRef}
          >
            {shown.length === 0 && <div className="ds-command-menu__empty">{emptyText}</div>}
            {shown.map((group, gi) => (
              <div key={group.label} role="group" aria-labelledby={`${id}-group-${gi}`}>
                <div className="ds-command-menu__group-label" id={`${id}-group-${gi}`}>
                  {group.label}
                </div>
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    id={optionId(item)}
                    role="option"
                    tabIndex={-1}
                    aria-selected={item === current}
                    aria-disabled={item.disabled || undefined}
                    className="ds-command-menu__item"
                    data-active={item === current ? '' : undefined}
                    onPointerMove={() => {
                      const i = flat.indexOf(item);
                      if (i >= 0 && i !== active) setActive(i);
                    }}
                    onClick={() => run(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') run(item);
                    }}
                  >
                    {item.icon && (
                      <span className="ds-command-menu__icon" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    <span className="ds-command-menu__label">{item.label}</span>
                    {item.description && (
                      <span className="ds-command-menu__description">{item.description}</span>
                    )}
                    {item.shortcut && (
                      <Kbd
                        keys={item.shortcut}
                        className="ds-command-menu__shortcut"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {showFooter && (
            <div className="ds-command-menu__footer" aria-hidden="true">
              <span>
                <Kbd>↑</Kbd> <Kbd>↓</Kbd> to move
              </span>
              <span>
                <Kbd>↵</Kbd> to select
              </span>
              <span>
                <Kbd>esc</Kbd> to close
              </span>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
CommandMenu.displayName = 'CommandMenu';

export const CommandMenuTrigger = Dialog.Trigger;
