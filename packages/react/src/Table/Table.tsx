import {
  forwardRef,
  useMemo,
  useState,
  type HTMLAttributes,
  type Key,
  type ReactNode,
} from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Checkbox } from '../Checkbox';
import { Skeleton } from '../Skeleton';
import './Table.css';

export interface TableColumn<Row> {
  /** Id of the column; also the default field to read from each row. */
  key: string;
  /** Column heading. */
  header: ReactNode;
  /** Cell content. Default: row[key]. */
  render?: (row: Row) => ReactNode;
  /** Makes the column sortable by clicking its heading. */
  sortable?: boolean;
  /** Value used to sort. Default: row[key]. */
  sortValue?: (row: Row) => string | number;
  /** `end` for numbers and money, so digits line up. */
  align?: 'start' | 'center' | 'end';
  /** Width, e.g. "30%" or 120. */
  width?: string | number;
}

export interface TableSort {
  key: string;
  direction: 'ascending' | 'descending';
}

export interface TableProps<Row> extends Omit<HTMLAttributes<HTMLTableElement>, 'children'> {
  /** Names the table. Shown above it unless hideCaption. */
  caption: ReactNode;
  hideCaption?: boolean;
  columns: TableColumn<Row>[];
  rows: Row[];
  /** Stable id per row. Default: row.id. */
  getRowId?: (row: Row) => Key;
  /** Sort (controlled). Rows are sorted here unless manualSort. */
  sort?: TableSort | null;
  defaultSort?: TableSort | null;
  onSortChange?: (sort: TableSort | null) => void;
  /** Leave sorting to you (e.g. on the server); the table only shows the state. */
  manualSort?: boolean;
  /** Adds a checkbox per row and a select-all checkbox. */
  selectable?: boolean;
  /** Selected row ids (controlled). */
  selected?: Key[];
  defaultSelected?: Key[];
  onSelectionChange?: (selected: Key[]) => void;
  /** Accessible name of a row checkbox. Default "Select row {n}". */
  rowLabel?: (row: Row, index: number) => string;
  /** Keeps the header in view while scrolling within a height-limited wrapper. */
  stickyHeader?: boolean;
  /** Alternating row backgrounds. */
  striped?: boolean;
  /** Tighter rows. */
  compact?: boolean;
  /** Shows placeholder rows. */
  loading?: boolean;
  /** Shown in a full-width cell when there are no rows. */
  empty?: ReactNode;
}

const read = (row: unknown, key: string) => (row as Record<string, unknown>)[key];

/**
 * Rows and columns of data people compare: sortable columns, selectable rows, a sticky header,
 * loading and empty states. A real <table> with a caption.
 */
function TableInner<Row>(
  {
    caption,
    hideCaption = false,
    columns,
    rows,
    getRowId = (row) => read(row, 'id') as Key,
    sort,
    defaultSort = null,
    onSortChange,
    manualSort = false,
    selectable = false,
    selected,
    defaultSelected = [],
    onSelectionChange,
    rowLabel = (_row, i) => `Select row ${i + 1}`,
    stickyHeader = false,
    striped = false,
    compact = false,
    loading = false,
    empty = 'No data',
    className,
    ...props
  }: TableProps<Row>,
  ref: React.ForwardedRef<HTMLTableElement>,
) {
  const [uSort, setUSort] = useState<TableSort | null>(defaultSort);
  const currentSort = sort === undefined ? uSort : sort;
  const [uSelected, setUSelected] = useState<Key[]>(defaultSelected);
  const currentSelected = selected ?? uSelected;

  const sorted = useMemo(() => {
    if (!currentSort || manualSort) return rows;
    const column = columns.find((c) => c.key === currentSort.key);
    if (!column) return rows;
    const value = column.sortValue ?? ((row: Row) => read(row, column.key) as string | number);
    const factor = currentSort.direction === 'ascending' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const x = value(a);
      const y = value(b);
      return (
        (typeof x === 'number' && typeof y === 'number'
          ? x - y
          : String(x).localeCompare(String(y), undefined, { numeric: true })) * factor
      );
    });
  }, [rows, columns, currentSort, manualSort]);

  const changeSort = (key: string) => {
    const next: TableSort | null =
      currentSort?.key !== key
        ? { key, direction: 'ascending' }
        : currentSort.direction === 'ascending'
          ? { key, direction: 'descending' }
          : null;
    setUSort(next);
    onSortChange?.(next);
  };

  const ids = sorted.map(getRowId);
  const allSelected = ids.length > 0 && ids.every((id) => currentSelected.includes(id));
  const someSelected = !allSelected && ids.some((id) => currentSelected.includes(id));
  const setSelection = (next: Key[]) => {
    setUSelected(next);
    onSelectionChange?.(next);
  };

  const columnCount = columns.length + (selectable ? 1 : 0);

  return (
    <div
      className={['ds-table-wrap', stickyHeader && 'ds-table-wrap--sticky']
        .filter(Boolean)
        .join(' ')}
    >
      <table
        ref={ref}
        className={[
          'ds-table',
          striped && 'ds-table--striped',
          compact && 'ds-table--compact',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-busy={loading || undefined}
        {...props}
      >
        <caption
          className={
            hideCaption ? 'ds-table__caption ds-table__caption--hidden' : 'ds-table__caption'
          }
        >
          {caption}
        </caption>
        <thead className="ds-table__head">
          <tr>
            {selectable && (
              <th scope="col" className="ds-table__select">
                <Checkbox
                  aria-label="Select all rows"
                  size="small"
                  checked={allSelected}
                  indeterminate={someSelected}
                  onCheckedChange={(on) => setSelection(on ? ids : [])}
                />
              </th>
            )}
            {columns.map((column) => {
              const active = currentSort?.key === column.key ? currentSort.direction : undefined;
              return (
                <th
                  key={column.key}
                  scope="col"
                  className={`ds-table__header ds-table__cell--${column.align ?? 'start'}`}
                  style={{ inlineSize: column.width }}
                  aria-sort={column.sortable ? (active ?? 'none') : undefined}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className="ds-table__sort"
                      onClick={() => changeSort(column.key)}
                    >
                      {column.header}
                      {active === 'ascending' ? (
                        <ArrowUp
                          className="ds-table__sort-icon ds-table__sort-icon--active"
                          aria-hidden="true"
                        />
                      ) : active === 'descending' ? (
                        <ArrowDown
                          className="ds-table__sort-icon ds-table__sort-icon--active"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowUpDown className="ds-table__sort-icon" aria-hidden="true" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 3 }, (_, i) => (
              <tr key={i} className="ds-table__row">
                {Array.from({ length: columnCount }, (_, j) => (
                  <td key={j} className="ds-table__cell">
                    <Skeleton />
                  </td>
                ))}
              </tr>
            ))
          ) : sorted.length === 0 ? (
            <tr>
              <td className="ds-table__cell ds-table__empty" colSpan={columnCount}>
                {empty}
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => {
              const id = getRowId(row);
              const isSelected = currentSelected.includes(id);
              return (
                <tr
                  key={id}
                  className="ds-table__row"
                  aria-selected={selectable ? isSelected : undefined}
                >
                  {selectable && (
                    <td className="ds-table__cell ds-table__select">
                      <Checkbox
                        aria-label={rowLabel(row, i)}
                        size="small"
                        checked={isSelected}
                        onCheckedChange={(on) =>
                          setSelection(
                            on ? [...currentSelected, id] : currentSelected.filter((x) => x !== id),
                          )
                        }
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`ds-table__cell ds-table__cell--${column.align ?? 'start'}`}
                    >
                      {column.render ? column.render(row) : (read(row, column.key) as ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export const Table = forwardRef(TableInner) as <Row>(
  props: TableProps<Row> & { ref?: React.Ref<HTMLTableElement> },
) => ReturnType<typeof TableInner>;
