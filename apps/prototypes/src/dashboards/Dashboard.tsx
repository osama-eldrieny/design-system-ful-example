import { useState } from 'react';
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
  MetricCard,
  PageHeader,
  Pagination,
  Progress,
  ProgressCircle,
  Sparkline,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableCard,
  Tabs,
  datePresets,
  useToast,
  type TableColumn,
} from '@ds/react';
import {
  DollarSign,
  Download,
  Filter,
  Plus,
  Share2,
  ShoppingCart,
  Users,
  Zap,
  Activity,
} from 'lucide-react';
import { mrr, purchases, recentOrders, sitePages, threeYears } from '../dashboard-data';
import { AppShell } from '../shell/AppShell';
import { TopBar } from '../shell/TopBar';
import { More, Panel, Periods, Trend } from './kit';
import './dashboard.css';

const usd = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(v);

const kpis = [
  {
    label: 'Revenue',
    value: '$124,567',
    change: '12.4%',
    trend: 'up' as const,
    icon: <DollarSign />,
    spark: [31, 34, 33, 38, 40, 39, 44, 48],
  },
  {
    label: 'Orders',
    value: '1,284',
    change: '8.2%',
    trend: 'up' as const,
    icon: <ShoppingCart />,
    spark: [21, 22, 24, 23, 25, 26, 25, 28],
  },
  {
    label: 'Customers',
    value: '2,420',
    change: '20%',
    trend: 'up' as const,
    icon: <Users />,
    spark: [14, 15, 15, 16, 17, 18, 18, 20],
  },
  {
    label: 'Active now',
    value: '316',
    change: '2%',
    trend: 'down' as const,
    icon: <Activity />,
    spark: [9, 8, 9, 7, 8, 7, 6, 7],
  },
];

const overview = [
  { key: 'revenue', label: 'Revenue', value: '$482k', change: '18.2%', up: true, series: 'mrr' },
  { key: 'orders', label: 'Orders', value: '14.8k', change: '9.6%', up: true, series: 'last' },
  { key: 'aov', label: 'Avg. order', value: '$91.42', change: '2.1%', up: false, series: 'mrr' },
];

const traffic = threeYears.map((m, i) => ({
  month: m.month,
  organic: 1800 + ((i * 310) % 1200),
  direct: 1400 + ((i * 230) % 900),
  referral: 700 + ((i * 170) % 600),
}));

const countries = [
  { label: 'United States', value: 50 },
  { label: 'India', value: 30 },
  { label: 'United Kingdom', value: 20 },
  { label: 'Germany', value: 12 },
];

type Order = (typeof recentOrders)[number];
type Page = (typeof sitePages)[number];

/**
 * The Panda dashboard: one page bringing together the strongest patterns of the 19 reference
 * dashboards — sparkline KPIs, tabbed figures over a revenue chart, channel mix, acquisition,
 * plan usage, orders with status filters, live purchases, top pages and live countries.
 */
export function Dashboard() {
  const toast = useToast();
  const [status, setStatus] = useState('all');
  const [view, setView] = useState('overview');
  const [page, setPage] = useState(1);

  const orderColumns: TableColumn<Order>[] = [
    { key: 'id', header: 'Order', sortable: true },
    {
      key: 'customer',
      header: 'Customer',
      render: (o) => (
        <AvatarLabelGroup name={o.customer} src={o.src} supportingText={o.email} size="small" />
      ),
    },
    { key: 'date', header: 'Date', hideBelow: 'large' },
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
    {
      key: 'amount',
      header: 'Amount',
      align: 'end',
      sortable: true,
      render: (o) => `$${o.amount.toFixed(2)}`,
    },
    {
      key: 'more',
      header: <span className="visually-hidden">Actions</span>,
      width: 48,
      render: (o) => <More label={`Actions for ${o.id}`} />,
    },
  ];

  const pageColumns: TableColumn<Page>[] = [
    { key: 'path', header: 'Page' },
    {
      key: 'sessions',
      header: 'Sessions',
      align: 'end',
      render: (p) => p.sessions.toLocaleString('en-US'),
    },
    {
      key: 'share',
      header: '% of total',
      width: 200,
      hideBelow: 'small',
      render: (p) => (
        <Progress
          label={`${p.path} share`}
          hideLabel
          value={p.share}
          showValue
          valuePosition="end"
          size="small"
          formatValue={(v) => `${v}%`}
        />
      ),
    },
  ];

  return (
    <AppShell current="dashboard" promo="upgrade">
      <div className="dash">
        <TopBar trail={[{ label: 'Home', href: '#/dashboard' }, { label: 'Dashboard' }]} />

        <PageHeader
          title="Welcome back, Olivia"
          description="Your sales, customers and traffic at a glance."
          divider
          actions={
            <>
              <Button
                variant="secondary"
                appearance="outline"
                iconStart={<Download />}
                onClick={() => toast({ title: 'Report exported', tone: 'success' })}
              >
                Export
              </Button>
              <Button variant="secondary" appearance="outline" iconStart={<Share2 />}>
                Share
              </Button>
              <Button iconStart={<Plus />} href="#/app/orders">
                New order
              </Button>
            </>
          }
        />

        <div className="dash-subnav">
          <Tabs
            appearance="line"
            value={view}
            onValueChange={setView}
            className="dash-subnav__tabs"
          >
            <TabList label="Dashboard views">
              <Tab value="overview">Overview</Tab>
              <Tab value="sales">Sales</Tab>
              <Tab value="customers" count={12}>
                Customers
              </Tab>
              <Tab value="traffic">Traffic</Tab>
              <Tab value="reports">Reports</Tab>
            </TabList>
            {['overview', 'sales', 'customers', 'traffic', 'reports'].map((v) => (
              <TabPanel key={v} value={v} className="visually-hidden">
                {`Showing the ${v} view`}
              </TabPanel>
            ))}
          </Tabs>
          <span className="dash-toolbar__end">
            <Periods />
            <DateRangePicker label="Report period" presets={datePresets()} size="small" />
            <Button variant="secondary" appearance="outline" size="small" iconStart={<Filter />}>
              Filters
            </Button>
          </span>
        </div>

        {/* KPIs */}
        <section className="dash-kpis" aria-label="Key figures">
          {kpis.map((k) => (
            <MetricCard
              key={k.label}
              label={k.label}
              value={k.value}
              change={k.change}
              trend={k.trend}
              trendStyle="simple"
              comparison="vs last month"
              icon={k.icon}
              chart={<Sparkline data={k.spark} />}
              actions={<More label={`Options for ${k.label}`} />}
            />
          ))}
        </section>

        {/* Revenue with tabbed figures + channel mix */}
        <div className="dash-row dash-row--2-1">
          <Panel title="Performance" menu>
            <Tabs appearance="line" defaultValue="revenue">
              <TabList label="Figures">
                {overview.map((o) => (
                  <Tab key={o.key} value={o.key}>
                    <span className="dash-tab-figure">
                      <span className="muted">{o.label}</span>
                      <span className="dash-tab-figure__value">
                        {o.value} <Trend value={o.change} up={o.up} />
                      </span>
                    </span>
                  </Tab>
                ))}
              </TabList>
              {overview.map((o) => (
                <TabPanel key={o.key} value={o.key}>
                  <AreaChart
                    title={`${o.label} this year and last`}
                    hideTitle
                    data={mrr}
                    xKey="month"
                    series={[
                      { key: o.series, label: 'This year' },
                      { key: o.series === 'mrr' ? 'last' : 'mrr', label: 'Last year', color: 8 },
                    ]}
                    formatValue={usd}
                    height={280}
                  />
                </TabPanel>
              ))}
            </Tabs>
          </Panel>
          <Panel
            title="Sales by channel"
            menu
            footer={
              <Button variant="secondary" appearance="outline" size="small">
                View report
              </Button>
            }
          >
            <DonutChart
              title="Share of sales by channel"
              hideTitle
              data={[
                { label: 'Online store', value: 52 },
                { label: 'Marketplace', value: 28 },
                { label: 'Retail', value: 20 },
              ]}
              formatValue={(v) => `${v}%`}
              centerValue="$124.5k"
              centerLabel="This month"
              size={200}
            />
          </Panel>
        </div>

        {/* Acquisition + plan usage */}
        <div className="dash-row dash-row--2-1">
          <Panel
            title="How do you acquire customers?"
            menu
            actions={
              <Periods options={['12 months', '30 days', '7 days']} label="Acquisition period" />
            }
          >
            <BarChart
              title="New customers by channel and month"
              hideTitle
              stacked
              data={traffic}
              xKey="month"
              series={[
                { key: 'organic', label: 'Organic' },
                { key: 'direct', label: 'Direct', color: 7 },
                { key: 'referral', label: 'Referral', color: 3 },
              ]}
              height={260}
            />
          </Panel>
          <Panel
            title="Monthly goal"
            description="You’ve reached 78% of this month’s target."
            menu
            footer={
              <Button variant="secondary" appearance="outline" size="small" iconStart={<Zap />}>
                Raise target
              </Button>
            }
          >
            <div className="dash-center">
              <ProgressCircle
                label="Monthly revenue goal"
                hideLabel
                value={78}
                shape="half"
                size="large"
                caption="of $160k"
              />
              <span className="muted text-sm">$35k to go · 12 days left</span>
            </div>
          </Panel>
        </div>

        {/* Orders + live purchases */}
        <div className="dash-row dash-row--2-1">
          <TableCard
            title="Recent orders"
            titleAs="h2"
            badge={`${recentOrders.length} orders`}
            actions={
              <ButtonGroup
                className="scroll-x"
                aria-label="Order status"
                attached
                value={status}
                onValueChange={setStatus}
              >
                <Button value="all" variant="secondary" appearance="outline" size="small">
                  All
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
              caption="Recent orders"
              hideCaption
              columns={orderColumns}
              rows={recentOrders.filter((o) => status === 'all' || o.status === status).slice(0, 6)}
              selectable
              rowLabel={(o) => `Select ${o.id}`}
              empty="No orders with this status."
            />
          </TableCard>
          <Panel
            title="Live purchases"
            actions={
              <Button appearance="text" size="small" href="#/app/orders">
                View all
              </Button>
            }
          >
            <ActivityFeed
              aria-label="Live purchases"
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
          </Panel>
        </div>

        {/* Top pages + live countries */}
        <div className="dash-row dash-row--1-1">
          <TableCard title="Top pages" titleAs="h2" description="Where visitors spend their time.">
            <Table<Page>
              caption="Top pages"
              hideCaption
              columns={pageColumns}
              rows={sitePages.slice(0, 5)}
              getRowId={(p) => p.path}
            />
          </TableCard>
          <Panel
            title="Active users right now"
            actions={
              <Badge tone="success" shape="modern" withDot>
                10.8k live
              </Badge>
            }
          >
            <div className="dash-live">
              <div className="dash-map" aria-hidden="true">
                {Array.from({ length: 6 }, (_, i) => (
                  <span key={i} className={`dash-map__ping dash-map__ping--${i}`} />
                ))}
              </div>
              <ul className="kit-list" aria-label="Active users by country">
                {countries.map((c) => (
                  <li key={c.label} className="dash-country">
                    <Progress label={c.label} value={c.value} showValue size="small" />
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
