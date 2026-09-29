import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Search } from 'lucide-react';
import { InputField, type InputFieldProps } from '../InputField';
import './SearchField.css';

export interface SearchFieldProps extends Omit<
  InputFieldProps,
  'type' | 'label' | 'iconStart' | 'iconEnd' | 'clearable' | 'onClear'
> {
  /** Names the field. Default "Search"; hidden unless showLabel is set. */
  label?: ReactNode;
  /** Shows the label above the field. By default the search icon and placeholder carry it. */
  showLabel?: boolean;
  /**
   * Key that focuses the field from anywhere on the page, e.g. "/" or "mod+k" (⌘K on Mac,
   * Ctrl+K elsewhere). Shown as a hint and exposed with aria-keyshortcuts.
   */
  shortcut?: string;
  /** Called with the query when Enter is pressed. */
  onSearch?: (query: string) => void;
  /** Called with the new query as people type or clear. */
  onValueChange?: (query: string) => void;
}

const isMac = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

const parseShortcut = (shortcut: string) => {
  const parts = shortcut.toLowerCase().split('+');
  return { mod: parts.includes('mod'), key: parts[parts.length - 1] };
};

/**
 * A field for searching: search icon, clear button and an optional keyboard shortcut.
 * Built on InputField.
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      label = 'Search',
      showLabel = false,
      shortcut,
      onSearch,
      onValueChange,
      value,
      defaultValue,
      onChange,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const [uncontrolled, setUncontrolled] = useState(String(defaultValue ?? ''));
    const query = value !== undefined ? String(value) : uncontrolled;

    const update = (next: string) => {
      setUncontrolled(next);
      onValueChange?.(next);
    };

    useEffect(() => {
      if (!shortcut) return;
      const { mod, key } = parseShortcut(shortcut);
      const handler = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement | null;
        const typing =
          target?.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName ?? '');
        const modPressed = isMac() ? event.metaKey : event.ctrlKey;
        if (event.key.toLowerCase() !== key || mod !== modPressed || (!mod && typing)) return;
        event.preventDefault();
        inputRef.current?.focus();
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [shortcut]);

    const shortcutParts = shortcut ? parseShortcut(shortcut) : undefined;
    const hint = shortcutParts
      ? `${shortcutParts.mod ? (isMac() ? '⌘' : 'Ctrl ') : ''}${shortcutParts.key.toUpperCase()}`
      : undefined;
    const ariaShortcut = shortcutParts
      ? `${shortcutParts.mod ? (isMac() ? 'Meta+' : 'Control+') : ''}${shortcutParts.key.toUpperCase()}`
      : undefined;

    return (
      <InputField
        ref={inputRef}
        type="search"
        label={label}
        hideLabel={!showLabel}
        iconStart={<Search />}
        iconEnd={
          hint && !query ? <kbd className="ds-search-field__shortcut">{hint}</kbd> : undefined
        }
        clearable
        onClear={() => update('')}
        value={query}
        aria-keyshortcuts={ariaShortcut}
        onChange={(event) => {
          update(event.target.value);
          onChange?.(event);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSearch?.(query);
          if (event.key === 'Escape' && query) {
            event.preventDefault();
            update('');
          }
          onKeyDown?.(event);
        }}
        {...props}
      />
    );
  },
);
SearchField.displayName = 'SearchField';
