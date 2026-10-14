import { useState } from 'react';
import {
  ActivityFeed,
  AreaChart,
  AvatarLabelGroup,
  Badge,
  Button,
  ButtonGroup,
  DateRangePicker,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FeaturedIcon,
  IconButton,
  Link,
  MetricCard,
  PageHeader,
  Pagination,
  Sparkline,
  Table,
  TableCard,
  datePresets,
  useToast,
  type DateRange,
  type TableColumn,
} from '@ds/react';
import { ArrowUpRight, Download, Filter, MoreVertical, PenLine, UserPlus } from 'lucide-react';
import {
  kpis,
  members,
  mrr,
  periods,
  posts,
  purchases,
  recentOrders,
  salesCards,
  type OrderStatus,
  type Period,
} from '../dashboard-data';
import { AdminShell } from '../shell/AdminShell';

type Order = (typeof recentOrders)[number];
const statusTone: Record<OrderStatus, 'success' | 'gray' | 'warning'> = {
  Paid: 'success',
  Refunded: 'gray',
  Pending: 'warning',
};
const usd = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(v);

const More = ({ label }: { label: string }) => (
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
      <DropdownMenuItem>View details</DropdownMenuItem>
      <DropdownMenuItem>Export</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const orderColumns: TableColumn<Order>[] = [
  { key: 'id', header: 'Order', sortable: true },
  { key: 'date', header: 'Date', sortable: true, hideBelow: 'medium' },
  {
    key: 'status',
    header: 'Status',
    render: (o) => (
      <Badge tone={statusTone[o.status]} shape="modern" size="small" withDot>
        {o.status}
      </Badge>
    ),
  },
  {
    key: 'amount',
    header: 'Amount',
    align: 'end',
    sortable: true,
    render: (o) => `$${o.amount.toFixed(2)}`,
  },
  {
    key: 'customer',
    header: 'Customer',
    hideBelow: 'small',
    render: (o) => (
      <AvatarLabelGroup name={o.customer} src={o.src} supportingText={o.email} size="small" />
    ),
  },
  {
    key: 'actions',
    header: <span className="proto-visually-hidden">Actions</span>,
    width: 48,
    render: (o) => <More label={`Actions for order ${o.id}`} />,
  },
];

/** Dashboard: MRR with members, quick actions, sales, orders, posts, activity and top members. */
export default function AdminOverviewPage() {
  const toast = useToast();
  const [period, setPeriod] = useState<Period>('12m');
  const [range, setRange] = useState<DateRange>(() => datePresets()[5].range);
  const [filter, setFilter] = useState<'all' | OrderStatus>('all');
  const [page, setPage] = useState(1);
  const k = kpis[period];
  const shown = recentOrders.filter((o) => filter === 'all' || o.status === filter);

  return (
    <AdminShell
      current="dashboard"
      trail={[{ label: 'Home', href: '#/admin' }, { label: 'Dashboard' }]}
    >
      <div className="proto-page">
        <PageHeader
          title="Welcome back, Olivia"
          description="Your business summary for the period."
          actions={
            <>
              <DateRangePicker
                label="Report period"
                presets={datePresets()}
                value={range}
                onValueChange={setRange}
              />
              <Button variant="secondary" appearance="outline" iconStart={<Filter />}>
                Filters
              </Button>
              <Button
                variant="secondary"
                appearance="outline"
                iconStart={<Download />}
                onClick={() => toast({ title: 'Report exported', tone: 'success' })}
              >
                Export
              </Button>
            </>
          }
        >
          <ButtonGroup
            className="proto-scroll-x"
            aria-label="Period"
            attached
            value={period}
            onValueChange={(v) => setPeriod(v as Period)}
          >
            {periods.map((p) => (
              <Button
                key={p.value}
                value={p.value}
                variant="secondary"
                appearance="outline"
                size="small"
              >
                {p.label}
              </Button>
            ))}
          </ButtonGroup>
        </PageHeader>

        {/* Headline: MRR over the year, with member figures beside it */}
        <section className="proto-card proto-hero-chart" aria-label="Monthly recurring revenue">
          <div className="proto-hero-chart__main">
            <MetricCard
              className="proto-flat"
              label="MRR"
              value={k.mrr}
              change={k.mrrChange}
              trend="up"
              trendStyle="simple"
              comparison="vs last period"
            />
            <AreaChart
              title="Monthly recurring revenue, this year and last year"
              hideTitle
              data={mrr}
              xKey="month"
              series={[
                { key: 'mrr', label: 'This year' },
                { key: 'last', label: 'Last year', color: 8 },
              ]}
              formatValue={usd}
              height={240}
            />
          </div>
          <div className="proto-hero-chart__side">
            <MetricCard
              className="proto-flat"
              size="small"
              label="Total members"
              value={k.members}
              change="9.2%"
              trend="up"
              trendStyle="simple"
            />
            <MetricCard
              className="proto-flat"
              size="small"
              label="Paid members"
              value={k.paid}
              change="6.6%"
              trend="up"
              trendStyle="simple"
            />
            <MetricCard
              className="proto-flat"
              size="small"
              label="Email open rate"
              value={k.open}
              change="8.1%"
              trend="up"
              trendStyle="simple"
            />
          </div>
        </section>

        {/* Quick actions */}
        <section className="proto-section" aria-labelledby="start-title">
          <h2 className="proto-subtitle" id="start-title">
            Start creating content
          </h2>
          <div className="proto-actions-grid">
            <Link
              appearance="standalone"
              variant="secondary"
              className="proto-action-card"
              href="#/settings/team"
            >
              <FeaturedIcon icon={<UserPlus />} appearance="modern" shape="square" />
              <span className="proto-action-card__text">
                <strong>Create your first member</strong>
                <span className="proto-muted">Add yourself or import from CSV</span>
              </span>
            </Link>
            <Link
              appearance="standalone"
              variant="secondary"
              className="proto-action-card"
              href="#/admin"
            >
              <FeaturedIcon icon={<PenLine />} appearance="modern" shape="square" />
              <span className="proto-action-card__text">
                <strong>Create a new post</strong>
                <span className="proto-muted">Dive into the editor and start creating</span>
              </span>
            </Link>
          </div>
        </section>

        {/* Sales cards */}
        <section className="proto-metrics" aria-label="Sales">
          {salesCards.map((c) => (
            <MetricCard
              key={c.label}
              label={c.label}
              value={c.value}
              change={c.change}
              trend={c.trend}
              trendStyle="simple"
              chart={<Sparkline data={c.spark} tone="primary" />}
              actions={<More label={`More options for ${c.label}`} />}
            />
          ))}
        </section>

        <div className="proto-grid-2-1">
          <div className="proto-page">
            <TableCard
              title="Orders"
              titleAs="h2"
              badge={`${recentOrders.length} orders`}
              description="Orders placed in the selected period."
              actions={
                <ButtonGroup
                  className="proto-scroll-x"
                  aria-label="Order status"
                  attached
                  value={filter}
                  onValueChange={(v) => setFilter(v as typeof filter)}
                >
                  <Button value="all" variant="secondary" appearance="outline" size="small">
                    All orders
                  </Button>
                  <Button value="Paid" variant="secondary" appearance="outline" size="small">
                    Paid
                  </Button>
                  <Button value="Refunded" variant="secondary" appearance="outline" size="small">
                    Refunded
                  </Button>
                </ButtonGroup>
              }
              footer={
                <Pagination
                  currentPage={page}
                  totalPages={4}
                  onPageChange={setPage}
                  appearance="simple"
                  showArrowLabels
                  layout="spread"
                  label="Order pages"
                />
              }
            >
              <Table<Order>
                caption="Orders"
                hideCaption
                columns={orderColumns}
                rows={shown}
                selectable
                rowLabel={(o) => `Select order ${o.id}`}
                empty="No orders with this status."
              />
            </TableCard>

            <section className="proto-section" aria-labelledby="posts-title">
              <h2 className="proto-subtitle" id="posts-title">
                Recent posts
              </h2>
              <div className="proto-actions-grid">
                {posts.map((p) => (
                  <article key={p.title} className="proto-card proto-post">
                    <div className="proto-post__media" aria-hidden="true" />
                    <span className="proto-post__meta">
                      {p.author} • {p.date}
                    </span>
                    <Link
                      appearance="standalone"
                      variant="secondary"
                      className="proto-post__title"
                      href="#/admin"
                      icon={<ArrowUpRight />}
                    >
                      {p.title}
                    </Link>
                    <p className="proto-muted">{p.excerpt}</p>
                    <div className="proto-tags">
                      {p.tags.map((t) => (
                        <Badge key={t.label} tone={t.tone} shape="modern" size="small" withDot>
                          {t.label}
                        </Badge>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="proto-page">
            <section className="proto-card" aria-labelledby="activity-title">
              <PageHeader
                size="small"
                titleAs="h2"
                title={<span id="activity-title">Activity</span>}
                actions={
                  <Button appearance="text" size="small" href="#/admin/orders">
                    View all
                  </Button>
                }
              />
              <ActivityFeed
                aria-label="Recent purchases"
                appearance="plain"
                items={purchases.map((p, i) => ({
                  id: i,
                  avatar: { name: p.name, src: p.src },
                  title: (
                    <>
                      <strong>{p.name}</strong> purchased <strong>{p.product}</strong>
                    </>
                  ),
                  time: p.time,
                  unread: p.unread,
                }))}
              />
            </section>
            <section className="proto-card" aria-labelledby="members-title">
              <PageHeader
                size="small"
                titleAs="h2"
                title={<span id="members-title">Top members</span>}
              />
              <ul className="proto-people">
                {members.slice(0, 6).map((m) => (
                  <li key={m.email}>
                    <AvatarLabelGroup
                      name={m.name}
                      src={m.src}
                      supportingText={`Member since ${m.since}`}
                      status="online"
                      size="small"
                    />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
