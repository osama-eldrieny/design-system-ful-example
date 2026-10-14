import { useState, type ReactElement } from 'react';
import {
  ActivityFeed,
  AreaChart,
  AvatarLabelGroup,
  Badge,
  BarChart,
  Button,
  ButtonGroup,
  DateRangePicker,
  DonutChart,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  MetricCard,
  PageHeader,
  Pagination,
  ProgressCircle,
  Sparkline,
  Table,
  TableCard,
  datePresets,
  useToast,
  type DateRange,
  type TableColumn,
} from '@ds/react';
import {
  DollarSign,
  Download,
  FileText,
  MoreVertical,
  Package,
  Percent,
  RotateCcw,
  ShoppingCart,
  UserPlus,
} from 'lucide-react';
import { money, orders, people, statusTone, type Order } from '../data';
import { AdminShell } from '../shell/AdminShell';

type Period = '7d' | '30d' | '90d';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const revenue = months.map((month, i) => ({
  month,
  revenue: Math.round(52000 + Math.sin(i / 1.6) * 9000 + i * 4200),
  target: Math.round(56000 + i * 3600),
}));
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
  day,
  online: [182, 204, 196, 221, 268, 312, 254][i],
  store: [64, 71, 69, 73, 92, 140, 118][i],
}));
const channels = [
  { label: 'Online store', value: 58 },
  { label: 'Marketplace', value: 27 },
  { label: 'Retail partners', value: 15 },
];

const metrics: Record<
  Period,
  {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    positive?: boolean;
    icon: ReactElement;
    spark: number[];
  }[]
> = {
  '7d': [
    {
      label: 'Revenue',
      value: '$29,840',
      change: '4.1%',
      trend: 'up',
      icon: <DollarSign />,
      spark: [3, 4, 4, 5, 4, 6, 7],
    },
    {
      label: 'Orders',
      value: '312',
      change: '2.6%',
      trend: 'up',
      icon: <ShoppingCart />,
      spark: [40, 42, 39, 45, 47, 46, 53],
    },
    {
      label: 'Refund rate',
      value: '1.6%',
      change: '0.2%',
      trend: 'down',
      positive: true,
      icon: <RotateCcw />,
      spark: [2.1, 2, 1.9, 1.8, 1.8, 1.7, 1.6],
    },
    {
      label: 'Conversion',
      value: '3.6%',
      change: '0.1%',
      trend: 'up',
      icon: <Percent />,
      spark: [3.4, 3.5, 3.4, 3.5, 3.6, 3.5, 3.6],
    },
  ],
  '30d': [
    {
      label: 'Revenue',
      value: '$124,567',
      change: '12.5%',
      trend: 'up',
      icon: <DollarSign />,
      spark: [8, 9, 11, 10, 12, 14, 15],
    },
    {
      label: 'Orders',
      value: '1,284',
      change: '8.2%',
      trend: 'up',
      icon: <ShoppingCart />,
      spark: [30, 34, 33, 38, 41, 40, 45],
    },
    {
      label: 'Refund rate',
      value: '1.8%',
      change: '0.4%',
      trend: 'up',
      positive: false,
      icon: <RotateCcw />,
      spark: [1.4, 1.5, 1.5, 1.6, 1.7, 1.8, 1.8],
    },
    {
      label: 'Conversion',
      value: '3.4%',
      change: '0.2%',
      trend: 'down',
      icon: <Percent />,
      spark: [3.7, 3.6, 3.6, 3.5, 3.5, 3.4, 3.4],
    },
  ],
  '90d': [
    {
      label: 'Revenue',
      value: '$352,190',
      change: '18.9%',
      trend: 'up',
      icon: <DollarSign />,
      spark: [20, 24, 23, 28, 31, 33, 38],
    },
    {
      label: 'Orders',
      value: '3,702',
      change: '11.4%',
      trend: 'up',
      icon: <ShoppingCart />,
      spark: [90, 95, 99, 104, 110, 112, 121],
    },
    {
      label: 'Refund rate',
      value: '2.0%',
      change: '0.3%',
      trend: 'up',
      positive: false,
      icon: <RotateCcw />,
      spark: [1.6, 1.7, 1.7, 1.8, 1.9, 2, 2],
    },
    {
      label: 'Conversion',
      value: '3.3%',
      change: '0.4%',
      trend: 'down',
      icon: <Percent />,
      spark: [3.8, 3.7, 3.6, 3.5, 3.5, 3.4, 3.3],
    },
  ],
};

const activity = [
  {
    id: 1,
    avatar: { name: 'Lina Haddad' },
    title: (
      <>
        <strong>Lina Haddad</strong> placed order <strong>#1059</strong>
      </>
    ),
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    avatar: { name: people[2].name, src: people[2].avatar },
    title: (
      <>
        <strong>{people[2].name}</strong> updated the autumn sale banner
      </>
    ),
    time: '1 hour ago',
    content: '“Moved the headline above the fold and added the 20% badge.”',
  },
  {
    id: 3,
    icon: <Package />,
    iconTone: 'warning' as const,
    title: (
      <>
        Stock low: <strong>Webcam 4K</strong> (3 left)
      </>
    ),
    time: 'Today, 09:12',
  },
  {
    id: 4,
    icon: <UserPlus />,
    iconTone: 'success' as const,
    title: (
      <>
        <strong>{people[3].name}</strong> joined the team
      </>
    ),
    time: 'Yesterday',
  },
  {
    id: 5,
    icon: <FileText />,
    iconTone: 'blue' as const,
    title: 'September sales report is ready',
    time: 'Mon',
  },
];

const statusBadge: Record<Order['status'], Parameters<typeof Badge>[0]['tone']> = statusTone;

const orderColumns: TableColumn<Order>[] = [
  { key: 'id', header: 'Order', sortable: true },
  {
    key: 'customer',
    header: 'Customer',
    sortable: true,
    render: (o) => <AvatarLabelGroup name={o.customer} supportingText={o.email} size="small" />,
  },
  { key: 'date', header: 'Date', sortable: true, hideBelow: 'medium' },
  {
    key: 'status',
    header: 'Status',
    render: (o) => (
      <Badge tone={statusBadge[o.status]} shape="modern" size="small" withDot>
        {o.status}
      </Badge>
    ),
  },
  { key: 'items', header: 'Items', align: 'end', hideBelow: 'large' },
  {
    key: 'total',
    header: 'Total',
    sortable: true,
    align: 'end',
    render: (o) => money(o.total),
  },
  {
    key: 'actions',
    header: <span className="proto-visually-hidden">Actions</span>,
    align: 'end',
    width: 48,
    render: (o) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton
            icon={<MoreVertical />}
            label={`Actions for order ${o.id}`}
            variant="secondary"
            appearance="ghost"
            size="small"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View order</DropdownMenuItem>
          <DropdownMenuItem>Send invoice</DropdownMenuItem>
          <DropdownMenuItem variant="danger">Refund</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const card = 'proto-card';

/** Admin overview: key figures with trends, revenue, channels, weekly orders, goal, orders, activity. */
export default function AdminOverviewPage() {
  const toast = useToast();
  const [period, setPeriod] = useState<Period>('30d');
  const [range, setRange] = useState<DateRange>(() => datePresets()[2].range);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const shownOrders = orders.slice((page - 1) * pageSize, page * pageSize);
  const usd = (v: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
    }).format(v);

  return (
    <AdminShell
      current="overview"
      trail={[{ label: 'Admin', href: '#/admin' }, { label: 'Overview' }]}
    >
      <div className="proto-page">
        <PageHeader
          title="Good morning, Sarah"
          description="Here’s how the store is doing."
          actions={
            <>
              <DateRangePicker
                label="Report period"
                presets={datePresets()}
                value={range}
                onValueChange={setRange}
              />
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
            aria-label="Compare with"
            attached
            value={period}
            onValueChange={(v) => setPeriod(v as Period)}
          >
            <Button value="7d" variant="secondary" appearance="outline" size="small">
              7 days
            </Button>
            <Button value="30d" variant="secondary" appearance="outline" size="small">
              30 days
            </Button>
            <Button value="90d" variant="secondary" appearance="outline" size="small">
              90 days
            </Button>
          </ButtonGroup>
        </PageHeader>

        <section className="proto-metrics" aria-label="Key figures">
          {metrics[period].map((m) => (
            <MetricCard
              key={m.label}
              label={m.label}
              value={m.value}
              change={m.change}
              trend={m.trend}
              positive={m.positive}
              comparison={`vs previous ${period === '7d' ? 'week' : period === '30d' ? 'month' : 'quarter'}`}
              icon={m.icon}
              chart={
                <Sparkline
                  data={m.spark}
                  tone={(m.positive ?? m.trend === 'up') ? 'positive' : 'negative'}
                />
              }
              actions={
                <IconButton
                  icon={<MoreVertical />}
                  label={`More options for ${m.label}`}
                  variant="secondary"
                  appearance="ghost"
                  size="small"
                />
              }
            />
          ))}
        </section>

        <div className="proto-grid-2-1">
          <section className={card}>
            <PageHeader
              size="small"
              titleAs="h2"
              title="Revenue"
              description="This year against the monthly target."
            />
            <AreaChart
              title="Revenue and target by month"
              hideTitle
              data={revenue}
              xKey="month"
              series={[
                { key: 'revenue', label: 'Revenue' },
                { key: 'target', label: 'Target', color: 8 },
              ]}
              formatValue={usd}
              height={280}
            />
          </section>
          <section className={card}>
            <PageHeader size="small" titleAs="h2" title="Sales by channel" />
            <DonutChart
              title="Share of revenue by channel"
              hideTitle
              data={channels}
              formatValue={(v) => `${v}%`}
              centerValue="$124.5K"
              centerLabel="Revenue"
              size={190}
            />
          </section>
        </div>

        <div className="proto-grid-2-1">
          <section className={card}>
            <PageHeader
              size="small"
              titleAs="h2"
              title="Orders by weekday"
              description="Saturdays bring the most orders, online and in store."
            />
            <BarChart
              title="Orders by weekday, online and in store"
              hideTitle
              stacked
              data={weekdays}
              xKey="day"
              series={[
                { key: 'online', label: 'Online' },
                { key: 'store', label: 'In store', color: 3 },
              ]}
              height={240}
            />
          </section>
          <section className={card}>
            <PageHeader size="small" titleAs="h2" title="Monthly goal" />
            <div className="proto-center">
              <ProgressCircle
                label="Revenue goal, $150K"
                value={83}
                shape="half"
                size="large"
                caption="of $150K"
              />
              <p className="proto-muted">$25.4K to go with 15 days left.</p>
            </div>
          </section>
        </div>

        <div className="proto-grid-2-1">
          <TableCard
            title="Recent orders"
            titleAs="h2"
            badge={`${orders.length} orders`}
            description="Orders from the last 30 days."
            actions={
              <Button size="small" variant="secondary" appearance="outline" href="#/admin/orders">
                View all
              </Button>
            }
            footer={
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(orders.length / pageSize)}
                onPageChange={setPage}
                showArrowLabels
                layout="spread"
                label="Order pages"
              />
            }
          >
            <Table<Order>
              caption="Recent orders"
              hideCaption
              columns={orderColumns}
              rows={shownOrders}
              selectable
              rowLabel={(o) => `Select order ${o.id}`}
            />
          </TableCard>
          <section className={card}>
            <PageHeader size="small" titleAs="h2" title="Activity" />
            <ActivityFeed aria-label="Recent activity" items={activity} />
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
