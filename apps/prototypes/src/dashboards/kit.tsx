/**
 * Building blocks shared by the demo dashboards: panels, period switchers, bank cards,
 * concentric rings and the common tables. Library components only; layout in kit.css.
 */
import { useState, type ReactNode } from 'react';
import {
  ActivityFeed,
  Avatar,
  AvatarGroup,
  AvatarLabelGroup,
  Badge,
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  InputField,
  PageHeader,
  Pagination,
  Progress,
  ProgressCircle,
  Table,
  TableCard,
  type BadgeColor,
  type TableColumn,
} from '@ds/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
  Wifi,
} from 'lucide-react';
import {
  avatars,
  categoryTone,
  companies,
  members,
  people,
  purchases,
  transactions,
  vendors,
  type CustomerStatus,
} from '../dashboard-data';
import './kit.css';

/* ------------------------------------------------------------------ layout */

export const More = ({ label }: { label: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <IconButton
        icon={<MoreVertical />}
        label={label}
        variant="secondary"
        appearance="ghost"
        size="small"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>View report</DropdownMenuItem>
      <DropdownMenuItem>Export</DropdownMenuItem>
      <DropdownMenuItem>Hide</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/** A titled card. `flush` removes the padding, e.g. around a table. */
export function Panel({
  title,
  description,
  actions,
  menu = false,
  footer,
  className,
  children,
}: {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  menu?: boolean;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={['kit-panel', className].filter(Boolean).join(' ')}>
      {title && (
        <PageHeader
          size="small"
          titleAs="h2"
          title={title}
          description={description}
          actions={
            (actions || menu) && (
              <>
                {actions}
                {menu && (
                  <More label={`Options for ${typeof title === 'string' ? title : 'this card'}`} />
                )}
              </>
            )
          }
        />
      )}
      {children}
      {footer && <div className="kit-panel__footer">{footer}</div>}
    </section>
  );
}

/** "12 months · 30 days · 7 days · 24 hours" as a toggle group. */
export function Periods({
  options = ['12 months', '30 days', '7 days', '24 hours'],
  custom = false,
  label = 'Period',
}: {
  options?: string[];
  custom?: boolean;
  label?: string;
}) {
  const [value, setValue] = useState(options[0]);
  return (
    <ButtonGroup
      className="scroll-x"
      aria-label={label}
      attached
      value={value}
      onValueChange={setValue}
    >
      {options.map((o) => (
        <Button key={o} value={o} variant="secondary" appearance="outline" size="small">
          {o}
        </Button>
      ))}
      {custom && (
        <Button
          value="custom"
          variant="secondary"
          appearance="outline"
          size="small"
          iconStart={<Plus />}
        >
          Custom
        </Button>
      )}
    </ButtonGroup>
  );
}

/** A trend shown as a small tinted badge, e.g. ↗ 7.4%. */
export const Trend = ({
  value,
  up = true,
  good,
}: {
  value: string;
  up?: boolean;
  good?: boolean;
}) => (
  <Badge
    tone={(good ?? up) ? 'success' : 'danger'}
    shape="modern"
    size="small"
    iconStart={up ? <ArrowUpRight /> : <ArrowDownRight />}
  >
    {value}
  </Badge>
);

/** A big figure with its label and trend, for headers like "Total balance $107,843.82 ↗ 7.2%". */
export const BigFigure = ({
  label,
  value,
  trend,
}: {
  label: ReactNode;
  value: ReactNode;
  trend?: ReactNode;
}) => (
  <div className="kit-figure">
    <span className="kit-figure__label">{label}</span>
    <span className="kit-figure__row">
      <span className="kit-figure__value">{value}</span>
      {trend}
    </span>
  </div>
);

/* --------------------------------------------------------------- visuals */

/** A payment card illustration. */
export const BankCard = ({
  tone = 'brand',
  holder = 'Olivia Rhye',
  number = '1234',
  expiry = '06/28',
  brand = 'Panda',
}: {
  tone?: 'brand' | 'dark' | 'light';
  holder?: string;
  number?: string;
  expiry?: string;
  brand?: string;
}) => (
  <div
    className={`kit-card kit-card--${tone}`}
    role="img"
    aria-label={`${brand} card ending in ${number}, ${holder}, expires ${expiry}`}
  >
    <span className="kit-card__brand">{brand}.</span>
    <Wifi className="kit-card__contactless" aria-hidden="true" />
    <span className="kit-card__holder">{holder}</span>
    <span className="kit-card__expiry">{expiry}</span>
    <span className="kit-card__number">1234 1234 1234 {number}</span>
    <span className="kit-card__chip" aria-hidden="true" />
  </div>
);

/** Concentric progress rings with a figure in the middle. */
export const Rings = ({
  label,
  values,
  center,
  caption,
}: {
  label: string;
  values: number[];
  center: ReactNode;
  caption?: ReactNode;
}) => (
  <div
    className="kit-rings"
    role="img"
    aria-label={`${label}: ${values.map((v) => `${v}%`).join(', ')}`}
  >
    {values.map((v, i) => (
      <ProgressCircle
        key={i}
        label={`${label} ${i + 1}`}
        hideLabel
        value={v}
        size="large"
        tone={(['primary', 'success', 'warning'] as const)[i % 3]}
        formatValue={() => ''}
        className={`kit-rings__ring kit-rings__ring--${i}`}
        aria-hidden="true"
      />
    ))}
    <span className="kit-rings__center">
      {caption && <span className="kit-rings__caption">{caption}</span>}
      <span className="kit-rings__value">{center}</span>
    </span>
  </div>
);

/** A list of people or products with a trailing figure, e.g. "Biggest fans · 24 likes". */
export const RankedList = ({
  items,
  label,
}: {
  items: { name: string; handle: string; likes: number }[];
  label: string;
}) => (
  <ul className="kit-list" aria-label={label}>
    {items.map((p, i) => (
      <li key={p.handle} className="kit-list__item">
        <AvatarLabelGroup
          name={p.name}
          src={avatars[i % avatars.length]}
          supportingText={p.handle}
          size="small"
        />
        <span className="kit-list__value">{p.likes} likes</span>
        <IconButton
          icon={<Pencil />}
          label={`Edit ${p.name}`}
          variant="secondary"
          appearance="ghost"
          size="small"
        />
      </li>
    ))}
  </ul>
);

/** "Demi Wilkinson purchased Webflow 101" feed. */
export const Purchases = ({ count = 5, columns = 1 }: { count?: number; columns?: 1 | 2 }) => {
  const extra = [
    'The Figma Dashboard Bundle',
    'The Design Handbook',
    'Phone Mockups',
    'SEO Masterclass',
  ];
  const names = [
    'Drew Cano',
    'Zahir Mays',
    'Rene Wells',
    'Joshua Wilson',
    'Lori Bryson',
    'Loki Bright',
  ];
  const items = Array.from({ length: count }, (_, i) =>
    i < purchases.length
      ? purchases[i]
      : {
          name: names[i % names.length],
          product: extra[i % extra.length],
          time: `${i - 1} hours ago`,
          src: avatars[i % 4],
          unread: false,
        },
  ).map((p, i) => ({
    id: i,
    avatar: { name: p.name, src: p.src },
    title: (
      <>
        <strong>{p.name}</strong> purchased <strong>{p.product}</strong>
      </>
    ),
    time: p.time,
    unread: p.unread,
  }));
  if (columns === 1)
    return <ActivityFeed aria-label="Recent purchases" appearance="plain" items={items} />;
  const half = Math.ceil(items.length / 2);
  return (
    <div className="kit-two">
      <ActivityFeed aria-label="Recent purchases" items={items.slice(0, half)} />
      <ActivityFeed aria-label="Earlier purchases" items={items.slice(half)} />
    </div>
  );
};

/* ---------------------------------------------------------------- tables */

const searchField = (label: string) => (
  <InputField
    label={label}
    hideLabel
    size="small"
    iconStart={<Search />}
    shortcut="⌘K"
    placeholder="Search"
  />
);

const rowActions = (name: string) => (
  <span className="kit-row-actions">
    <IconButton
      icon={<Trash2 />}
      label={`Delete ${name}`}
      variant="secondary"
      appearance="ghost"
      size="small"
    />
    <IconButton
      icon={<Pencil />}
      label={`Edit ${name}`}
      variant="secondary"
      appearance="ghost"
      size="small"
    />
  </span>
);

type Tx = (typeof transactions)[number];
/** Transactions with category and account. */
export function TransactionsTable({
  title = 'Transaction history',
  toolbar,
  actions,
  compact = false,
}: {
  title?: string;
  toolbar?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
}) {
  const [page, setPage] = useState(1);
  const columns: TableColumn<Tx>[] = [
    {
      key: 'name',
      header: 'Transaction',
      render: (t) => (
        <span className="kit-who">
          <Avatar name={t.name} size="small" decorative />
          <strong>{t.name}</strong>
        </span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (t) => (
        <span
          className={t.amount > 0 ? 'kit-positive' : undefined}
        >{`${t.amount > 0 ? '+' : '−'} $${Math.abs(t.amount).toFixed(2)}`}</span>
      ),
    },
    { key: 'date', header: 'Date', hideBelow: 'medium' },
    {
      key: 'category',
      header: 'Category',
      hideBelow: 'small',
      render: (t) => (
        <Badge tone={categoryTone[t.category] as BadgeColor} shape="modern" size="small" withDot>
          {t.category}
        </Badge>
      ),
    },
    ...(compact ? [] : [{ key: 'account', header: 'Account', hideBelow: 'large' as const }]),
    {
      key: 'edit',
      header: <span className="visually-hidden">Edit</span>,
      width: 48,
      render: (t: Tx) => (
        <IconButton
          icon={<Pencil />}
          label={`Edit ${t.name}`}
          variant="secondary"
          appearance="ghost"
          size="small"
        />
      ),
    },
  ];
  return (
    <TableCard
      title={title}
      titleAs="h2"
      badge={`${transactions.length} transactions`}
      actions={actions}
      toolbar={toolbar}
      footer={
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={setPage}
          showArrowLabels
          layout="spread"
          label={`${title} pages`}
        />
      }
    >
      <Table<Tx> caption={title} hideCaption columns={columns} rows={transactions} />
    </TableCard>
  );
}

type Company = (typeof companies)[number];
const statusTone: Record<CustomerStatus, BadgeColor> = {
  Customer: 'success',
  Churned: 'gray',
  Trial: 'blue',
};
/** Companies with status, about, users and license use. `licenseFirst` moves license use forward. */
export function CompaniesTable({
  title = 'Companies',
  toolbar,
  licenseFirst = false,
  plain = false,
}: {
  title?: string;
  toolbar?: ReactNode;
  licenseFirst?: boolean;
  plain?: boolean;
}) {
  const [page, setPage] = useState(1);
  const company: TableColumn<Company> = {
    key: 'name',
    header: 'Company',
    sortable: true,
    render: (c) => <AvatarLabelGroup name={c.name} supportingText={c.domain} size="small" />,
  };
  const license: TableColumn<Company> = {
    key: 'license',
    header: 'License use',
    width: 180,
    render: (c) => (
      <Progress label={`${c.name} license use`} hideLabel value={c.license} size="small" />
    ),
  };
  const status: TableColumn<Company> = {
    key: 'status',
    header: 'Status',
    render: (c) => (
      <Badge tone={statusTone[c.status]} shape="modern" size="small" withDot>
        {c.status}
      </Badge>
    ),
  };
  const users: TableColumn<Company> = {
    key: 'users',
    header: 'Users',
    hideBelow: 'medium',
    render: (c) => (
      <AvatarGroup label={`${c.users} users`} max={4} size="xsmall">
        {Array.from({ length: c.users }, (_, i) => (
          <Avatar key={i} name={members[i % members.length].name} src={avatars[i % 4]} />
        ))}
      </AvatarGroup>
    ),
  };
  const about: TableColumn<Company> = {
    key: 'about',
    header: 'About',
    hideBelow: 'large',
    render: (c) => (
      <span className="stack-text">
        <span>{c.about}</span>
        <span className="muted text-sm">{c.detail}</span>
      </span>
    ),
  };
  const actions: TableColumn<Company> = {
    key: 'actions',
    header: <span className="visually-hidden">Actions</span>,
    width: 88,
    render: (c) => rowActions(c.name),
  };
  const columns = licenseFirst
    ? [company, license, status, users, about, actions]
    : [company, status, about, users, license, actions];
  const table = (
    <Table<Company>
      caption={title}
      hideCaption
      columns={columns}
      rows={companies}
      getRowId={(c) => c.domain}
      selectable
      defaultSelected={['ephemeral.io', 'stack3dlab.com', 'getwarpspeed.com']}
      rowLabel={(c) => `Select ${c.name}`}
    />
  );
  const footer = (
    <Pagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
      appearance="simple"
      showArrowLabels
      layout="spread"
      label={`${title} pages`}
    />
  );
  if (plain)
    return (
      <div className="kit-plain-table">
        {toolbar}
        {table}
        {footer}
      </div>
    );
  return (
    <TableCard title={title} titleAs="h2" toolbar={toolbar} footer={footer}>
      {table}
    </TableCard>
  );
}

type Vendor = (typeof vendors)[number];
/** Vendors with security rating, change, last assessed and categories. */
export function VendorsTable({
  title = 'Vendor movements',
  description = 'Keep track of vendors and their security ratings.',
  actions,
  toolbar,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  toolbar?: ReactNode;
}) {
  const [page, setPage] = useState(1);
  const columns: TableColumn<Vendor>[] = [
    {
      key: 'name',
      header: 'Vendor',
      sortable: true,
      render: (v) => <AvatarLabelGroup name={v.name} supportingText={v.domain} size="small" />,
    },
    {
      key: 'rating',
      header: 'Rating',
      width: 240,
      render: (v) => (
        <span className="kit-rating">
          <Progress
            label={`${v.name} rating`}
            hideLabel
            value={v.rating}
            showValue
            formatValue={(x) => String(x)}
            valuePosition="end"
            size="small"
          />
          <Trend value={`${Math.abs(v.change)}%`} up={v.change > 0} />
        </span>
      ),
    },
    { key: 'assessed', header: 'Last assessed', hideBelow: 'medium' },
    {
      key: 'tags',
      header: 'Categories',
      hideBelow: 'large',
      render: (v) => (
        <span className="kit-tags">
          <Badge tone={v.active ? 'success' : 'gray'} shape="modern" size="small" withDot>
            {v.active ? 'Active' : 'Inactive'}
          </Badge>
          {v.tags.map(([t, tone]) => (
            <Badge key={t} tone={tone as BadgeColor} size="small">
              {t}
            </Badge>
          ))}
          {v.more > 0 && (
            <Badge tone="gray" size="small">
              {`+${v.more}`}
            </Badge>
          )}
        </span>
      ),
    },
    {
      key: 'actions',
      header: <span className="visually-hidden">Actions</span>,
      width: 88,
      render: (v) => rowActions(v.name),
    },
  ];
  return (
    <TableCard
      title={title}
      titleAs="h2"
      badge="240 vendors"
      description={description}
      actions={actions}
      toolbar={toolbar ?? searchField('Search vendors')}
      footer={
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={setPage}
          showArrowLabels
          layout="spread"
          label="Vendor pages"
        />
      }
    >
      <Table<Vendor>
        caption={title}
        hideCaption
        columns={columns}
        rows={[...vendors]}
        getRowId={(v) => v.domain}
        selectable
        defaultSelected={[
          'ephemeral.io',
          'stack3dlab.com',
          'getwarpspeed.com',
          'convergence.io',
          'sisyphus.com',
        ]}
        rowLabel={(v) => `Select ${v.name}`}
      />
    </TableCard>
  );
}

type Person = (typeof people)[number];
/** Customers with email, date, status and amount. */
export function PeopleTable({ title = 'Customers' }: { title?: string }) {
  const [page, setPage] = useState(1);
  const columns: TableColumn<Person>[] = [
    {
      key: 'name',
      header: 'Customer',
      sortable: true,
      render: (p) => (
        <AvatarLabelGroup name={p.name} src={p.src} supportingText={p.handle} size="small" />
      ),
    },
    { key: 'email', header: 'Email', hideBelow: 'large' },
    { key: 'date', header: 'Date', hideBelow: 'medium', render: () => 'Jan 16, 2026' },
    {
      key: 'status',
      header: 'Status',
      render: () => (
        <Badge tone="success" shape="modern" size="small" withDot>
          Paid
        </Badge>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      align: 'end',
      render: (p) => `$${(80 + p.name.length * 1.73).toFixed(2)}`,
    },
    {
      key: 'actions',
      header: <span className="visually-hidden">Actions</span>,
      width: 88,
      render: (p) => rowActions(p.name),
    },
  ];
  return (
    <TableCard
      title={title}
      titleAs="h2"
      actions={searchField('Search customers')}
      footer={
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={setPage}
          showArrowLabels
          layout="spread"
          label={`${title} pages`}
        />
      }
    >
      <Table<Person>
        caption={title}
        hideCaption
        columns={columns}
        rows={people}
        getRowId={(p) => p.email}
        selectable
        rowLabel={(p) => `Select ${p.name}`}
      />
    </TableCard>
  );
}

export { searchField };
