/**
 * Small building blocks shared by Orbit's pages. Library components only.
 */
import { useState, type ReactNode } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  Pagination,
  Table,
  TableCard,
  type BadgeColor,
  type TableColumn,
} from '@ds/react';
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { Trend } from './kit';

export { More, Panel, Trend } from './kit';

const tones: Record<string, BadgeColor> = {
  active: 'success',
  complete: 'success',
  completed: 'success',
  connected: 'success',
  delivered: 'success',
  'in stock': 'success',
  paid: 'success',
  solved: 'success',
  success: 'success',
  pending: 'warning',
  'in progress': 'warning',
  'in transit': 'blue',
  'low stock': 'warning',
  processing: 'blue',
  open: 'blue',
  draft: 'gray',
  disabled: 'gray',
  inactive: 'gray',
  cancelled: 'danger',
  canceled: 'danger',
  failed: 'danger',
  overdue: 'danger',
  'out of stock': 'danger',
  refunded: 'gray',
};

/** A status word as a tinted badge with a dot; the tone follows the word. */
export const Status = ({ children }: { children: string }) => (
  <Badge tone={tones[children.toLowerCase()] ?? 'gray'} shape="modern" size="small" withDot>
    {children}
  </Badge>
);

/** The "…" menu on a row: View and Delete. */
export const RowMenu = ({
  label,
  onView,
  onDelete,
}: {
  label: string;
  onView?: () => void;
  onDelete?: () => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <IconButton
        icon={<MoreHorizontal />}
        label={`Actions for ${label}`}
        variant="secondary"
        appearance="ghost"
        size="small"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem icon={<Eye />} onSelect={onView}>
        View more
      </DropdownMenuItem>
      <DropdownMenuItem icon={<Trash2 />} variant="danger" onSelect={onDelete}>
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/** A labelled figure with an optional trend, e.g. "Avg. yearly profit $212,142 ↗ 23.2%". */
export const Figure = ({
  label,
  value,
  change,
  up = true,
  good,
  note,
}: {
  label: ReactNode;
  value: ReactNode;
  change?: string;
  up?: boolean;
  good?: boolean;
  note?: ReactNode;
}) => (
  <div className="orbit-figure">
    <span className="muted text-sm">{label}</span>
    <span className="orbit-figure__value">
      {value}
      {change && <Trend value={change} up={up} good={good} />}
    </span>
    {note && <span className="muted text-sm">{note}</span>}
  </div>
);

/** A single-choice set of small outline buttons, e.g. Monthly / Quarterly / Annually. */
export function Toggle({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
}) {
  const [own, setOwn] = useState(options[0]);
  return (
    <ButtonGroup
      className="scroll-x"
      aria-label={label}
      attached
      value={value ?? own}
      onValueChange={(v) => (onChange ?? setOwn)(v)}
    >
      {options.map((o) => (
        <Button key={o} value={o} variant="secondary" appearance="outline" size="small">
          {o}
        </Button>
      ))}
    </ButtonGroup>
  );
}

/** A table in a card with simple pagination, paging the rows it's given. */
export function DataTable<Row>({
  title,
  description,
  badge,
  actions,
  toolbar,
  columns,
  rows,
  rowId,
  pageSize = 6,
  selectable,
  rowLabel,
  empty = 'Nothing to show.',
}: {
  title: string;
  description?: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
  toolbar?: ReactNode;
  columns: TableColumn<Row>[];
  rows: Row[];
  rowId: (row: Row) => string;
  pageSize?: number;
  selectable?: boolean;
  rowLabel?: (row: Row) => string;
  empty?: ReactNode;
}) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pages);
  return (
    <TableCard
      title={title}
      titleAs="h2"
      description={description}
      badge={badge}
      actions={actions}
      toolbar={toolbar}
      footer={
        pages > 1 && (
          <Pagination
            currentPage={current}
            totalPages={pages}
            onPageChange={setPage}
            appearance="simple"
            showArrowLabels
            layout="spread"
            label={`${title} pages`}
          />
        )
      }
    >
      <Table<Row>
        caption={title}
        hideCaption
        columns={columns}
        rows={rows.slice((current - 1) * pageSize, current * pageSize)}
        getRowId={rowId}
        selectable={selectable}
        rowLabel={rowLabel}
        empty={empty}
      />
    </TableCard>
  );
}
