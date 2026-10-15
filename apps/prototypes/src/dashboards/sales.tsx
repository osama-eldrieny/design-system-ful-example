import { useState } from 'react';
import {
  AreaChart,
  Avatar,
  AvatarLabelGroup,
  Badge,
  BarChart,
  Breadcrumb,
  Button,
  ButtonGroup,
  DateRangePicker,
  InputField,
  LineChart,
  MetricCard,
  PageHeader,
  Pagination,
  Sparkline,
  Table,
  TableCard,
  datePresets,
  type TableColumn,
} from '@ds/react';
import { Download, Filter, Plus, Search, UserPlus } from 'lucide-react';
import { avatars, mrr, recentOrders, threeYears } from '../dashboard-data';
import { AppShell } from '../shell/AppShell';
import { BigFigure, More, Panel, Periods, Purchases, Trend } from './kit';

const usd = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(v);
const daily = Array.from({ length: 30 }, (_, i) => ({
  day: String(i + 1),
  sales: Math.round(220 + i * 6 + Math.sin(i / 2) * 30),
}));

type Order = (typeof recentOrders)[number];

/** 03 · Ecommerce: welcome with avatar, sales cards, a sales chart with its own periods, orders. */
export function Dashboard03() {
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const columns: TableColumn<Order>[] = [
    { key: 'id', header: 'Order', sortable: true },
    { key: 'date', header: 'Date', hideBelow: 'medium' },
    {
      key: 'status',
      header: 'Status',
      render: (o) => (
        <Badge
          tone={o.status === 'Paid' ? 'success' : o.status === 'Refunded' ? 'gray' : 'warning'}
          shape="modern"
          size="small"
          withDot
        >
          {o.status}
        </Badge>
      ),
    },
    { key: 'amount', header: 'Amount', render: (o) => `$${o.amount.toFixed(2)}` },
    {
      key: 'customer',
      header: 'Customer',
      hideBelow: 'small',
      render: (o) => (
        <AvatarLabelGroup name={o.customer} src={o.src} supportingText={o.email} size="small" />
      ),
    },
    {
      key: 'more',
      header: <span className="visually-hidden">Actions</span>,
      width: 48,
      render: (o) => <More label={`Actions for ${o.id}`} />,
    },
  ];
  return (
    <AppShell current="03">
      <div className="dash">
        <PageHeader
          leading={<Avatar name="Olivia Rhye" src={avatars[1]} size="large" decorative />}
          title="Welcome back, Olivia"
          description="16 January, 2026"
          actions={
            <InputField
              label="Search"
              hideLabel
              size="small"
              iconStart={<Search />}
              shortcut="⌘K"
              placeholder="Search"
            />
          }
        >
          <div className="dash-toolbar">
            <Periods options={['Custom', '12 months', '30 days', '7 days', '24 hours']} />
            <span className="dash-toolbar__end">
              <DateRangePicker label="Dates" presets={datePresets()} />
            </span>
          </div>
        </PageHeader>
        <section className="dash-grid dash-grid--3" aria-label="Sales figures">
          {[
            {
              label: 'Sales',
              value: '$2,114.40',
              change: '2.4%',
              spark: [10, 12, 11, 13, 14, 13, 15, 16, 18],
            },
            { label: 'Orders', value: '24', change: '8.6%', spark: [3, 5, 4, 6, 5, 7, 6, 8, 7] },
            {
              label: 'Average order value',
              value: '$88.10',
              change: '6.0%',
              spark: [80, 82, 79, 84, 83, 81, 85, 84, 90],
            },
          ].map((c) => (
            <MetricCard
              key={c.label}
              label={c.label}
              value={c.value}
              change={c.change}
              trend="up"
              trendStyle="simple"
              chart={<Sparkline data={c.spark} tone="primary" />}
              actions={<More label={`Options for ${c.label}`} />}
            />
          ))}
        </section>
        <Panel title="Sales">
          <div className="dash-toolbar">
            <BigFigure label="Last 30 days" value="$8,422.60" trend={<Trend value="3.2%" />} />
            <span className="dash-toolbar__end">
              <Periods />
            </span>
          </div>
          <BarChart
            title="Sales per day"
            hideTitle
            data={daily}
            xKey="day"
            series={[{ key: 'sales', label: 'Sales' }]}
            formatValue={usd}
            height={220}
            hideYAxis
          />
        </Panel>
        <TableCard
          title="Orders"
          titleAs="h2"
          description={
            <span className="row">
              <strong className="dash-h2">24</strong>
              <Trend value="8.6%" /> vs last 30 days
            </span>
          }
          actions={
            <ButtonGroup
              aria-label="Order status"
              attached
              value={status}
              onValueChange={setStatus}
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
            columns={columns}
            rows={recentOrders.filter((o) => status === 'all' || o.status === status)}
            selectable
            rowLabel={(o) => `Select ${o.id}`}
            empty="No orders with this status."
          />
        </TableCard>
      </div>
    </AppShell>
  );
}

/** 10 · Sales overview: saved views, today’s figures, sales and store traffic, an activity rail. */
export function Dashboard10() {
  const [view, setView] = useState('saved');
  const traffic = threeYears.map((m, i) => ({
    month: m.month,
    visitors: 400 + ((i * 97) % 300),
    buyers: 160 + ((i * 53) % 140),
  }));
  return (
    <AppShell
      current="10"
      rail={
        <Panel
          title="Activity"
          actions={
            <Button appearance="text" size="small">
              View all
            </Button>
          }
          className="kit-panel--plain"
        >
          <Purchases count={10} />
        </Panel>
      }
    >
      <div className="dash">
        <PageHeader
          title="Sales overview"
          description="Your current sales summary and activity."
          actions={
            <>
              <Button variant="secondary" appearance="outline" iconStart={<Download />}>
                Export report
              </Button>
              <Button iconStart={<UserPlus />}>Invite</Button>
            </>
          }
        >
          <div className="dash-toolbar">
            <ButtonGroup
              className="scroll-x"
              aria-label="View"
              attached
              value={view}
              onValueChange={setView}
            >
              <Button value="default" variant="secondary" appearance="outline" size="small">
                Default
              </Button>
              <Button value="saved" variant="secondary" appearance="outline" size="small">
                Saved view
              </Button>
              <Button value="sdr" variant="secondary" appearance="outline" size="small">
                SDR view
              </Button>
              <Button
                value="add"
                variant="secondary"
                appearance="outline"
                size="small"
                iconStart={<Plus />}
              >
                <span className="visually-hidden">Add view</span>
              </Button>
            </ButtonGroup>
            <span className="dash-toolbar__end">
              <DateRangePicker label="Dates" presets={datePresets()} />
              <Button variant="secondary" appearance="outline" iconStart={<Filter />}>
                Filters
              </Button>
            </span>
          </div>
        </PageHeader>
        <section className="dash-grid dash-grid--2" aria-label="Today">
          <MetricCard
            label="Today’s revenue"
            value="$1,280"
            change="10%"
            trend="up"
            trendStyle="modern"
            actions={<More label="Options for today’s revenue" />}
          />
          <MetricCard
            label="Today’s orders"
            value="14"
            change="12%"
            trend="up"
            trendStyle="modern"
            actions={<More label="Options for today’s orders" />}
          />
          <MetricCard
            label="Avg. order value"
            value="$91.42"
            change="2%"
            trend="down"
            trendStyle="modern"
            actions={<More label="Options for average order value" />}
          />
        </section>
        <Panel
          title="Sales report"
          actions={
            <Button variant="secondary" appearance="outline" size="small">
              View report
            </Button>
          }
        >
          <Periods options={['12 months', '3 months', '30 days', '7 days', '24 hours']} />
          <AreaChart
            title="Sales, this year and last"
            hideTitle
            data={mrr}
            xKey="month"
            series={[
              { key: 'mrr', label: 'This year' },
              { key: 'last', label: 'Last year', color: 7 },
            ]}
            formatValue={usd}
            height={220}
            hideYAxis
          />
        </Panel>
        <Panel
          title="Store traffic"
          actions={
            <Button variant="secondary" appearance="outline" size="small">
              View report
            </Button>
          }
        >
          <Periods options={['12 months', '3 months', '30 days', '7 days', '24 hours']} />
          <BarChart
            title="Visitors and buyers by month"
            hideTitle
            stacked
            data={traffic}
            xKey="month"
            series={[
              { key: 'buyers', label: 'Buyers' },
              { key: 'visitors', label: 'Visitors', color: 8 },
            ]}
            height={220}
            hideYAxis
          />
        </Panel>
      </div>
    </AppShell>
  );
}

/** 11 · Sales activity: three-year chart, today’s figures with markers, two-column activity. */
export function Dashboard11() {
  return (
    <AppShell current="11" slim>
      <div className="dash">
        <PageHeader
          breadcrumbs={
            <Breadcrumb
              homeIcon
              items={[
                { label: 'Home', href: '#/dashboards/01' },
                { label: 'Dashboard', href: '#/dashboards/11' },
                { label: 'Overview' },
              ]}
            />
          }
          title="Welcome back, Olivia"
          description="Your current sales summary and activity."
          actions={
            <InputField
              label="Search"
              hideLabel
              size="small"
              iconStart={<Search />}
              shortcut="⌘K"
              placeholder="Search"
            />
          }
        >
          <div className="dash-toolbar">
            <Periods />
            <span className="dash-toolbar__end">
              <DateRangePicker label="Dates" presets={datePresets()} />
              <Button variant="secondary" appearance="outline" iconStart={<Filter />}>
                Filters
              </Button>
            </span>
          </div>
        </PageHeader>
        <LineChart
          title="Sales by month, three years"
          hideTitle
          data={threeYears}
          xKey="month"
          series={[
            { key: 'y2027', label: '2027' },
            { key: 'y2026', label: '2026', color: 7 },
            { key: 'y2025', label: '2025', color: 2 },
          ]}
          height={240}
          hideYAxis
        />
        <section className="dash-grid dash-grid--3" aria-label="Today">
          <MetricCard
            label="Today’s revenue"
            value="$1,280"
            change="15%"
            trend="up"
            trendStyle="simple"
            comparison="last mth"
            chart={<Sparkline data={[2, 3, 2, 4, 3, 5, 4, 6, 7]} />}
            actions={<More label="Options for today’s revenue" />}
            layout="horizontal"
          />
          <MetricCard
            label="Today’s orders"
            value="14"
            change="10%"
            trend="down"
            trendStyle="simple"
            comparison="last mth"
            chart={<Sparkline data={[7, 6, 7, 5, 6, 4, 5, 3, 4]} />}
            actions={<More label="Options for today’s orders" />}
            layout="horizontal"
          />
          <MetricCard
            label="Avg. order value"
            value="$91.42"
            change="20%"
            trend="up"
            trendStyle="simple"
            comparison="last mth"
            chart={<Sparkline data={[2, 3, 3, 4, 3, 5, 6, 5, 7]} />}
            actions={<More label="Options for average order value" />}
            layout="horizontal"
          />
        </section>
        <Panel
          title="Recent activity"
          className="kit-panel--plain"
          actions={
            <>
              <Button variant="secondary" appearance="outline" size="small">
                Download
              </Button>
              <Button size="small">View all</Button>
            </>
          }
        >
          <Purchases count={14} columns={2} />
        </Panel>
      </div>
    </AppShell>
  );
}
