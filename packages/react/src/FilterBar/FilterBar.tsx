import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '../Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../DropdownMenu';
import { Tag } from '../Tag';
import './FilterBar.css';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterDefinition {
  id: string;
  /** Shown on the trigger and the active chips, e.g. "Status". */
  label: string;
  options: FilterOption[];
}

/** Chosen values per filter id. */
export type FilterValue = Record<string, string[]>;

export interface FilterBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Names the toolbar, e.g. "Filter invoices". */
  label: string;
  filters: FilterDefinition[];
  /** Chosen values (controlled). */
  value?: FilterValue;
  defaultValue?: FilterValue;
  onValueChange?: (value: FilterValue) => void;
  /** Content at the start of the bar, usually a SearchField. */
  search?: ReactNode;
  /** Content at the end, e.g. a result count or a sort menu. */
  end?: ReactNode;
  /** Shows the chosen values as removable chips under the bar. Default true. */
  showChips?: boolean;
  /** Words for the clear button. Default "Clear all". */
  clearLabel?: string;
  /** Spoken name of a trigger with chosen values. Default "{filter}, {count} selected". */
  selectedLabel?: (filter: string, count: number) => string;
  /** Words for a chip's remove button. Default "Remove {filter}: {option}". */
  removeLabel?: (filter: string, option: string) => string;
}

/**
 * A toolbar for narrowing a list or table: an optional search, one menu per filter with
 * checkable options, and the chosen values as removable chips.
 */
export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      label,
      filters,
      value,
      defaultValue = {},
      onValueChange,
      search,
      end,
      showChips = true,
      clearLabel = 'Clear all',
      removeLabel = (f, o) => `Remove ${f}: ${o}`,
      selectedLabel = (f, n) => `${f}, ${n} selected`,
      className,
      ...props
    },
    ref,
  ) => {
    const [own, setOwn] = useState<FilterValue>(defaultValue);
    const current = value ?? own;
    const set = (next: FilterValue) => {
      setOwn(next);
      onValueChange?.(next);
    };
    const toggle = (id: string, option: string, on: boolean) => {
      const list = current[id] ?? [];
      set({ ...current, [id]: on ? [...list, option] : list.filter((v) => v !== option) });
    };
    const chips = filters.flatMap((f) =>
      (current[f.id] ?? []).map((v) => ({ filter: f, option: f.options.find((o) => o.value === v) ?? { value: v, label: v } })),
    );

    return (
      <div ref={ref} className={['ds-filter-bar', className].filter(Boolean).join(' ')} {...props}>
        <div className="ds-filter-bar__bar" role="toolbar" aria-label={label}>
          {search && <div className="ds-filter-bar__search">{search}</div>}
          <div className="ds-filter-bar__filters">
            {filters.map((f) => {
              const count = current[f.id]?.length ?? 0;
              return (
                <DropdownMenu key={f.id}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-label={count > 0 ? selectedLabel(f.label, count) : undefined}
                      className={['ds-filter-bar__trigger', count > 0 && 'ds-filter-bar__trigger--active']
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {f.label}
                      {count > 0 && (
                        <span className="ds-filter-bar__count" aria-hidden="true">
                          {count}
                        </span>
                      )}
                      <ChevronDown className="ds-filter-bar__chevron" aria-hidden="true" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {f.options.map((o) => (
                      <DropdownMenuCheckboxItem
                        key={o.value}
                        checked={(current[f.id] ?? []).includes(o.value)}
                        onCheckedChange={(on) => toggle(f.id, o.value, on)}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {o.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
          </div>
          {end && <div className="ds-filter-bar__end">{end}</div>}
        </div>
        {showChips && chips.length > 0 && (
          <div className="ds-filter-bar__chips">
            {chips.map(({ filter, option }) => (
              <Tag
                key={`${filter.id}:${option.value}`}
                size="small"
                appearance="subtle"
                onRemove={() => toggle(filter.id, option.value, false)}
                removeLabel={removeLabel(filter.label, option.label)}
              >
                {`${filter.label}: ${option.label}`}
              </Tag>
            ))}
            <Button size="small" appearance="text" variant="secondary" onClick={() => set({})}>
              {clearLabel}
            </Button>
          </div>
        )}
      </div>
    );
  },
);
FilterBar.displayName = 'FilterBar';
