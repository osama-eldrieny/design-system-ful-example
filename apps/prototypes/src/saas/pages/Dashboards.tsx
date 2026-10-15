/**
 * Orbit's other dashboards: eCommerce, Analytics, Marketing, CRM, Stocks, Logistics, AI, Sales
 * and Finance. Content and structure follow TailAdmin's dashboards; visuals are @ds/react.
 */
import { useState, type ReactNode } from 'react';
import {
  ActivityFeed,
  Alert,
  AreaChart,
  Avatar,
  AvatarGroup,
  AvatarLabelGroup,
  BarChart,
  Button,
  DonutChart,
  FeaturedIcon,
  InputField,
  LineChart,
  Link,
  MetricCard,
  Progress,
  ProgressCircle,
  Select,
  SelectItem,
  Sparkline,
  Stepper,
} from '@ds/react';
import {
  Box,
  Briefcase,
  CircleDollarSign,
  Download,
  Filter,
  FolderKanban,
  Package,
  PiggyBank,
  ShoppingBag,
  Star,
  Truck,
  Users,
  Wallet,
} from 'lucide-react';
import { BankCard } from '../../dashboards/kit';
import { countries, months, topPages, traffic, weekdayTraffic } from '../../dashboard-data';
import { people } from '../data';
import { Page, to } from '../Shell';
import { DataTable, Figure, More, Panel, RowMenu, Status, Toggle, Trend } from '../ui';

const series = (base: number, step: number, wobble: number, phase = 0) =>
  months.map((_, i) => Math.round(base + i * step + Math.sin(i / 1.6 + phase) * wobble));
const monthly = (fields: Record<string, number[]>) =>
  months.map((month, i) => ({
    month,
    ...Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v[i]])),
  }));
const spark = (seed: number) =>
  Array.from({ length: 12 }, (_, i) => 20 + Math.sin(i / 1.5 + seed) * 8 + i);
const usd = (v: number) => `$${v.toLocaleString('en-US')}`;
const k = (v: number) => (v >= 1000 ? `${Math.round(v / 100) / 10}K` : `${v}`);

/** Each dashboard's metric cards. */
function Kpis({
  items,
}: {
  items: {
    label: string;
    value: string;
    change: string;
    up?: boolean;
    good?: boolean;
    icon?: ReactNode;
    note?: string;
  }[];
}) {
  return (
    <section className="orbit-grid" aria-label="Key figures">
      {items.map((m, i) => (
        <MetricCard
          key={m.label}
          label={m.label}
          value={m.value}
          change={m.change}
          trend={m.up === false ? 'down' : 'up'}
          positive={m.good}
          comparison={m.note ?? 'vs last month'}
          icon={m.icon}
          chart={m.icon ? undefined : <Sparkline data={spark(i)} />}
          actions={<More label={`Options for ${m.label}`} />}
        />
      ))}
    </section>
  );
}

/* --------------------------------------------------------------- eCommerce */

const products = [
  {
    name: 'MacBook Pro 13”',
    variants: '2 variants',
    category: 'Laptop',
    price: '$2,399.00',
    status: 'Delivered',
  },
  {
    name: 'Apple Watch Ultra',
    variants: '1 variant',
    category: 'Watch',
    price: '$879.00',
    status: 'Pending',
  },
  {
    name: 'iPhone 15 Pro Max',
    variants: '2 variants',
    category: 'Smartphone',
    price: '$1,869.00',
    status: 'Delivered',
  },
  {
    name: 'iPad Pro 3rd Gen',
    variants: '2 variants',
    category: 'Electronics',
    price: '$1,699.00',
    status: 'Canceled',
  },
  {
    name: 'AirPods Pro 2nd Gen',
    variants: '1 variant',
    category: 'Accessories',
    price: '$240.00',
    status: 'Delivered',
  },
];

function Ecommerce() {
  return (
    <Page
      path="/dashboards/ecommerce"
      title="eCommerce"
      description="Orders, customers and this month’s target."
    >
      <div className="orbit-row">
        <div className="orbit-stack">
          <div className="orbit-row orbit-row--even">
            <MetricCard
              label="Customers"
              value="3,782"
              change="11.01%"
              trend="up"
              icon={<Users />}
              comparison="vs last month"
            />
            <MetricCard
              label="Orders"
              value="5,359"
              change="9.05%"
              trend="down"
              icon={<Box />}
              comparison="vs last month"
            />
          </div>
          <Panel title="Monthly sales" menu>
            <BarChart
              title="Sales by month"
              hideTitle
              data={monthly({ sales: series(160, 14, 90) })}
              xKey="month"
              series={[{ key: 'sales', label: 'Sales' }]}
              height={200}
            />
          </Panel>
        </div>
        <Panel title="Monthly target" description="Target you’ve set for each month." menu>
          <div className="orbit-center">
            <ProgressCircle
              label="Monthly target reached"
              hideLabel
              value={75.55}
              shape="half"
              size="large"
              caption="+10%"
              formatValue={(v) => `${v}%`}
            />
            <p className="muted text-sm orbit-center__note">
              You earned $3,287 today, higher than last month. Keep up the good work!
            </p>
          </div>
          <div className="orbit-figures orbit-figures--split">
            <Figure label="Target" value="$20K" change="2%" up={false} />
            <Figure label="Revenue" value="$20K" change="4%" />
            <Figure label="Today" value="$20K" change="3%" />
          </div>
        </Panel>
      </div>
      <Panel
        title="Statistics"
        description="Target you’ve set for each month."
        actions={<Toggle label="Statistics view" options={['Overview', 'Sales', 'Revenue']} />}
      >
        <AreaChart
          title="Sales and revenue by month"
          hideTitle
          data={monthly({ sales: series(180, 9, 30), revenue: series(40, 7, 25, 1) })}
          xKey="month"
          series={[
            { key: 'sales', label: 'Sales' },
            { key: 'revenue', label: 'Revenue', color: 3 },
          ]}
          height={260}
        />
      </Panel>
      <div className="orbit-row orbit-row--1-2">
        <Panel title="Customers demographic" description="Number of customers by country." menu>
          <WorldMap />
          <CountryBars
            rows={[
              { label: 'USA', value: 79, note: '2,379 customers' },
              { label: 'France', value: 23, note: '589 customers' },
            ]}
          />
        </Panel>
        <DataTable
          title="Recent orders"
          actions={
            <>
              <Button variant="secondary" appearance="outline" size="small" iconStart={<Filter />}>
                Filter
              </Button>
              <Button
                variant="secondary"
                appearance="outline"
                size="small"
                href={to('/commerce/products')}
              >
                See all
              </Button>
            </>
          }
          rows={products}
          rowId={(p) => p.name}
          columns={[
            {
              key: 'name',
              header: 'Products',
              render: (p) => (
                <span className="stack-text">
                  <strong>{p.name}</strong>
                  <span className="muted text-sm">{p.variants}</span>
                </span>
              ),
            },
            { key: 'category', header: 'Category', hideBelow: 'small' },
            { key: 'price', header: 'Price', align: 'end' },
            { key: 'status', header: 'Status', render: (p) => <Status>{p.status}</Status> },
          ]}
        />
      </div>
    </Page>
  );
}

/** Markets shown on the maps: name, longitude, latitude and relative size. */
const markets: [string, number, number, number][] = [
  ['San Francisco', -122.4, 37.8, 3],
  ['New York', -74, 40.7, 3],
  ['São Paulo', -46.6, -23.5, 2],
  ['London', -0.1, 51.5, 3],
  ['Lisbon', -9.1, 38.7, 2],
  ['Dubai', 55.3, 25.2, 2],
  ['Lagos', 3.4, 6.5, 1],
  ['Mumbai', 72.9, 19.1, 2],
  ['Singapore', 103.8, 1.35, 2],
  ['Tokyo', 139.7, 35.7, 3],
  ['Sydney', 151.2, -33.9, 2],
];

/**
 * A world map (land as dots, or filled outlines) with market markers. The map is a mask, so it
 * takes its color from tokens and follows the theme.
 */
export const WorldMap = ({
  label = 'Customers by region',
  variant = 'dots',
}: {
  label?: string;
  variant?: 'dots' | 'vector';
}) => {
  const src = `url(assets/${variant === 'dots' ? 'world-dots' : 'world'}.svg)`;
  return (
    // Geography doesn't mirror in right-to-left languages, so markers use physical left/top.
    <div
      className={`orbit-map orbit-map--${variant}`}
      dir="ltr"
      role="img"
      aria-label={`${label}: ${markets.map((m) => m[0]).join(', ')}`}
    >
      <span className="orbit-map__land" style={{ maskImage: src, WebkitMaskImage: src }} />
      {markets.map(([name, lon, lat, size]) => (
        <span
          key={name}
          className={`orbit-map__pin orbit-map__pin--${size}`}
          style={{ left: `${((lon + 180) / 360) * 100}%`, top: `${((84 - lat) / 142) * 100}%` }}
        />
      ))}
    </div>
  );
};

/** Countries (or sources) with a share bar each. */
export const CountryBars = ({
  rows,
}: {
  rows: { label: string; value: number; note?: string }[];
}) => (
  <ul className="orbit-bars">
    {rows.map((r) => (
      <li key={r.label}>
        <Progress
          label={
            <span className="stack-text">
              <strong>{r.label}</strong>
              {r.note && <span className="muted text-sm">{r.note}</span>}
            </span>
          }
          value={r.value}
          showValue
          valuePosition="end"
          size="small"
        />
      </li>
    ))}
  </ul>
);

/* --------------------------------------------------------------- Analytics */

function Analytics() {
  const [range, setRange] = useState('12 months');
  const data =
    range === '12 months'
      ? traffic
      : traffic.slice(
          -({ '30 days': 8, '7 days': 7, '24 hours': 6 } as Record<string, number>)[range],
        );
  return (
    <Page
      path="/dashboards/analytics"
      description="Visitors, pages and channels across your marketing site."
    >
      <Alert
        variant="primary"
        title="Orbit Analytics is now real-time"
        actions={
          <Button size="small" href={to('/pages/pricing')}>
            See plans
          </Button>
        }
      >
        Live visitor counts and session replays are included on the Business plan.
      </Alert>
      <Kpis
        items={[
          { label: 'Unique visitors', value: '24.7K', change: '20%' },
          { label: 'Total pageviews', value: '55.9K', change: '4%' },
          { label: 'Bounce rate', value: '54%', change: '1.59%', up: false, good: true },
          { label: 'Visit duration', value: '2m 56s', change: '7%' },
        ]}
      />
      <Panel
        title="Analytics"
        description="Visitor analytics over time."
        actions={
          <Toggle
            label="Analytics period"
            options={['12 months', '30 days', '7 days', '24 hours']}
            value={range}
            onChange={setRange}
          />
        }
      >
        <BarChart
          title="Visitors and sessions"
          hideTitle
          data={data}
          xKey="week"
          series={[
            { key: 'users', label: 'Visitors' },
            { key: 'sessions', label: 'Sessions', color: 3 },
          ]}
          formatValue={k}
          height={260}
        />
      </Panel>
      <div className="orbit-row orbit-row--even">
        <SourceTable
          title="Top channels"
          head="Source"
          valueHead="Visitors"
          rows={[
            ['Google', 4700],
            ['Facebook', 3400],
            ['Threads', 2900],
            ['LinkedIn', 1500],
            ['Newsletter', 1100],
          ]}
        />
        <SourceTable
          title="Top pages"
          head="Page"
          valueHead="Pageviews"
          rows={topPages.map((p) => [p.path, p.views])}
        />
      </div>
      <div className="orbit-row orbit-row--even">
        <Panel title="Active users" menu actions={<Status>Live</Status>}>
          <Figure label="Live visitors" value="364" />
          <AreaChart
            title="Active users in the last hour"
            hideTitle
            data={Array.from({ length: 20 }, (_, i) => ({
              t: `${i * 3}m`,
              users: 300 + Math.round(Math.sin(i / 2) * 60 + i * 3),
            }))}
            xKey="t"
            series={[{ key: 'users', label: 'Active users' }]}
            height={140}
            hideYAxis
          />
          <div className="orbit-figures orbit-figures--split">
            <Figure label="Avg. daily" value="224" />
            <Figure label="Avg. weekly" value="1.4K" />
            <Figure label="Avg. monthly" value="22.1K" />
          </div>
        </Panel>
        <Panel title="Acquisition channels" menu>
          <BarChart
            title="Visitors by channel and day"
            hideTitle
            stacked
            data={weekdayTraffic}
            xKey="day"
            series={[
              { key: 'desktop', label: 'Direct' },
              { key: 'mobile', label: 'Organic', color: 3 },
              { key: 'tablet', label: 'Referral', color: 5 },
            ]}
            height={240}
          />
        </Panel>
      </div>
      <div className="orbit-row orbit-row--even">
        <Panel title="Sessions by device" menu>
          <DonutChart
            title="Sessions by device"
            hideTitle
            data={[
              { label: 'Desktop', value: 58 },
              { label: 'Mobile', value: 34 },
              { label: 'Tablet', value: 8 },
            ]}
            formatValue={(v) => `${v}%`}
            centerValue="18.4K"
            centerLabel="Sessions"
            size={200}
          />
        </Panel>
        <Panel title="Customers demographic" description="Visitors by country." menu>
          <CountryBars rows={countries.slice(0, 5)} />
        </Panel>
      </div>
    </Page>
  );
}

function SourceTable({
  title,
  head,
  valueHead,
  rows,
}: {
  title: string;
  head: string;
  valueHead: string;
  rows: [string, number][];
}) {
  const max = Math.max(...rows.map((r) => r[1]));
  return (
    <DataTable
      title={title}
      actions={
        <Button variant="secondary" appearance="outline" size="small">
          Full report
        </Button>
      }
      rows={rows.map(([name, value]) => ({ name, value }))}
      rowId={(r) => r.name}
      columns={[
        { key: 'name', header: head },
        {
          key: 'value',
          header: valueHead,
          align: 'end',
          render: (r) => (
            <span className="orbit-cell-bar">
              <Progress
                label={`${r.name} share`}
                hideLabel
                value={r.value}
                max={max}
                size="small"
              />
              {k(r.value)}
            </span>
          ),
        },
      ]}
    />
  );
}

/* --------------------------------------------------------------- Marketing */

const campaigns = [
  { creator: people[0], name: 'Grow your brand by 30% this quarter', status: 'Success' },
  { creator: people[1], name: 'Make better ideas with Orbit AI', status: 'Pending' },
  { creator: people[2], name: 'Increase your website traffic', status: 'Success' },
  { creator: people[3], name: 'Digital marketing that converts', status: 'Failed' },
  { creator: people[4], name: 'Self-branding for founders', status: 'Success' },
  { creator: people[5], name: 'Webinar: pricing pages that sell', status: 'Success' },
];

function Marketing() {
  const [statsRange, setStatsRange] = useState('Week');
  return (
    <Page path="/dashboards/marketing" description="Campaigns, audience and traffic sources.">
      <Kpis
        items={[
          { label: 'Avg. client rating', value: '7.8/10', change: '20%', icon: <Star /> },
          {
            label: 'Instagram followers',
            value: '5,934',
            change: '3.59%',
            up: false,
            icon: <Users />,
          },
          { label: 'Total revenue', value: '$9,758', change: '15%', icon: <CircleDollarSign /> },
        ]}
      />
      <Panel title="Impressions & data traffic" description="Jun 1, 2025 – Dec 1, 2026" menu>
        <Figure label="Total revenue" value="$9,758.00" change="7.96%" />
        <AreaChart
          title="Impressions and clicks by month"
          hideTitle
          data={monthly({ impressions: series(4200, 180, 600), clicks: series(1600, 90, 300, 2) })}
          xKey="month"
          series={[
            { key: 'impressions', label: 'Impressions' },
            { key: 'clicks', label: 'Clicks', color: 3 },
          ]}
          formatValue={k}
          height={240}
        />
      </Panel>
      <div className="orbit-row">
        <DataTable
          title="Featured campaigns"
          actions={<More label="Options for featured campaigns" />}
          rows={campaigns}
          rowId={(c) => c.name}
          columns={[
            {
              key: 'creator',
              header: 'Creator',
              render: (c) => (
                <AvatarLabelGroup name={c.creator.name} src={c.creator.src} size="small" />
              ),
            },
            {
              key: 'name',
              header: 'Campaign',
              hideBelow: 'small',
              render: (c) => (
                <span className="stack-text">
                  <strong>{c.name}</strong>
                  <span className="muted text-sm">Ads campaign</span>
                </span>
              ),
            },
            { key: 'status', header: 'Status', render: (c) => <Status>{c.status}</Status> },
          ]}
        />
        <div className="orbit-stack">
          <Panel
            title="Traffic stats"
            actions={
              <Toggle
                label="Traffic period"
                options={['Today', 'Week', 'Month']}
                value={statsRange}
                onChange={setStatsRange}
              />
            }
          >
            <ul className="orbit-list">
              {[
                ['New subscribers', '567K', '3.85%', true],
                ['Conversion rate', '276K', '5.39%', false],
                ['Page bounce rate', '285', '12.74%', true],
              ].map(([label, value, change, up]) => (
                <li key={label as string} className="row row--between">
                  <Figure
                    label={label}
                    value={value}
                    change={change as string}
                    up={up as boolean}
                    note={`vs last ${statsRange.toLowerCase()}`}
                  />
                  <Sparkline data={spark(String(label).length)} />
                </li>
              ))}
            </ul>
          </Panel>
          <Panel
            title="Top traffic sources"
            menu
            footer={<Link href={to('/dashboards/analytics')}>View all</Link>}
          >
            <CountryBars
              rows={[
                { label: 'Google', value: 79 },
                { label: 'YouTube', value: 55 },
                { label: 'Facebook', value: 48 },
                { label: 'Instagram', value: 41 },
              ]}
            />
          </Panel>
        </div>
      </div>
    </Page>
  );
}

/* --------------------------------------------------------------------- CRM */

function Crm() {
  return (
    <Page path="/dashboards/crm" description="Deals, revenue and your sales pipeline.">
      <Kpis
        items={[
          { label: 'Active deals', value: '$120,369', change: '20%', icon: <Briefcase /> },
          { label: 'Revenue total', value: '$234,210', change: '9.0%', icon: <CircleDollarSign /> },
          {
            label: 'Closed deals',
            value: '874',
            change: '4.5%',
            up: false,
            icon: <FolderKanban />,
          },
        ]}
      />
      <div className="orbit-row">
        <Panel
          title="Statistics"
          actions={
            <Toggle label="Statistics period" options={['Monthly', 'Quarterly', 'Annually']} />
          }
        >
          <div className="orbit-figures">
            <Figure label="Avg. yearly profit" value="$212,142" change="23.2%" />
            <Figure label="Avg. yearly expense" value="$30,321" change="12.3%" up={false} good />
          </div>
          <LineChart
            title="Profit and expense by month"
            hideTitle
            data={monthly({ profit: series(15000, 600, 2400), expense: series(2400, 60, 500, 1) })}
            xKey="month"
            series={[
              { key: 'profit', label: 'Profit' },
              { key: 'expense', label: 'Expense', color: 5 },
            ]}
            formatValue={(v) => usd(v)}
            height={240}
          />
        </Panel>
        <Panel title="Estimated revenue" description="Target you’ve set for each month." menu>
          <div className="orbit-center">
            <ProgressCircle
              label="June goal reached"
              hideLabel
              value={72}
              size="large"
              caption="June goals"
            />
          </div>
          <CountryBars
            rows={[
              { label: 'Marketing', value: 85, note: '$30,569.00' },
              { label: 'Sales', value: 55, note: '$20,486.00' },
            ]}
          />
        </Panel>
      </div>
      <div className="orbit-row orbit-row--even">
        <Panel title="Sales category" menu>
          <DonutChart
            title="Products sold by sales category"
            hideTitle
            data={[
              { label: 'Affiliate program', value: 2040 },
              { label: 'Direct buy', value: 1402 },
              { label: 'Adsense', value: 510 },
            ]}
            centerValue="3,952"
            centerLabel="Products"
            size={200}
          />
        </Panel>
        <Panel title="Upcoming schedule" menu>
          <ul className="orbit-list">
            {[
              ['Wed, 11 Jan', '09:20 AM', 'Business analytics press', 6],
              ['Fri, 15 Feb', '10:35 AM', 'Business sprint', 2],
              ['Thu, 18 Mar', '01:15 PM', 'Customer review meeting', 8],
              ['Mon, 22 Mar', '04:00 PM', 'Quarterly pipeline review', 4],
            ].map(([day, time, title, more]) => (
              <li key={title as string} className="orbit-event">
                <span className="orbit-event__when">
                  <strong>{day}</strong>
                  <span className="muted text-sm">{time}</span>
                </span>
                <span className="stack-text">
                  <strong>{title}</strong>
                  <AvatarGroup label="Attendees" size="xsmall" max={3}>
                    {people.slice(0, (more as number) + 1).map((p) => (
                      <Avatar key={p.email} name={p.name} src={p.src} />
                    ))}
                  </AvatarGroup>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <DataTable
        title="Recent deals"
        actions={
          <Button variant="secondary" appearance="outline" size="small" iconStart={<Filter />}>
            Filter
          </Button>
        }
        rows={people.slice(0, 7).map((p, i) => ({
          id: `DE${124321 + i * 17}`,
          p,
          product: [
            'Software license',
            'Annual support',
            'Onboarding',
            'Seats ×20',
            'API add-on',
            'Enterprise SSO',
            'Training',
          ][i],
          value: usd(1850 + i * 940),
          date: `2026-0${(i % 9) + 1}-15`,
          status: [
            'Complete',
            'Complete',
            'Pending',
            'Complete',
            'Cancelled',
            'Pending',
            'Complete',
          ][i],
        }))}
        rowId={(r) => r.id}
        selectable
        rowLabel={(r) => `Select ${r.id}`}
        columns={[
          { key: 'id', header: 'Deal ID', hideBelow: 'medium' },
          {
            key: 'p',
            header: 'Customer',
            render: (r) => (
              <AvatarLabelGroup
                name={r.p.name}
                src={r.p.src}
                supportingText={r.p.email}
                size="small"
              />
            ),
          },
          { key: 'product', header: 'Product/Service', hideBelow: 'large' },
          { key: 'value', header: 'Deal value', align: 'end' },
          { key: 'date', header: 'Close date', hideBelow: 'medium' },
          { key: 'status', header: 'Status', render: (r) => <Status>{r.status}</Status> },
          {
            key: 'menu',
            header: <span className="visually-hidden">Actions</span>,
            width: 48,
            render: (r) => <RowMenu label={r.id} />,
          },
        ]}
      />
    </Page>
  );
}

/* ------------------------------------------------------------------ Stocks */

const tickers = [
  { sym: 'AAPL', name: 'Apple, Inc', price: '$232.40', change: '1.01%', up: true },
  { sym: 'PYPL', name: 'PayPal, Inc', price: '$65.12', change: '0.95%', up: false },
  { sym: 'TSLA', name: 'Tesla, Inc', price: '$192.53', change: '3.59%', up: true },
  { sym: 'AMZN', name: 'Amazon.com, Inc', price: '$186.20', change: '1.10%', up: true },
  { sym: 'SPOT', name: 'Spotify, Inc', price: '$342.80', change: '2.04%', up: false },
];

function Ticker({ t, actions }: { t: (typeof tickers)[number]; actions?: boolean }) {
  return (
    <article className="orbit-ticker">
      <div className="row row--between">
        <span className="row">
          <Avatar name={t.sym} size="small" />
          <span className="stack-text">
            <strong>{t.sym}</strong>
            <span className="muted text-sm">{t.name}</span>
          </span>
        </span>
        <Sparkline data={spark(t.sym.charCodeAt(0)).map((v, i) => (t.up ? v : 50 - v + i / 2))} />
      </div>
      <span className="orbit-figure__value">
        {t.price} <Trend value={t.change} up={t.up} />
      </span>
      {actions && (
        <span className="row">
          <Button variant="secondary" appearance="outline" size="small">
            Short
          </Button>
          <Button size="small">Buy</Button>
        </span>
      )}
    </article>
  );
}

function Stocks() {
  return (
    <Page path="/dashboards/stocks" description="Your portfolio, watchlist and latest trades.">
      <section className="orbit-grid" aria-label="Holdings">
        {tickers.slice(0, 4).map((t) => (
          <Ticker key={t.sym} t={t} />
        ))}
      </section>
      <div className="orbit-row">
        <Panel
          title="Portfolio performance"
          description="Your performance for each month."
          actions={
            <Toggle label="Portfolio period" options={['Monthly', 'Quarterly', 'Annually']} />
          }
        >
          <AreaChart
            title="Portfolio value by month"
            hideTitle
            data={monthly({ value: series(42000, 1300, 3000) })}
            xKey="month"
            series={[{ key: 'value', label: 'Portfolio value' }]}
            formatValue={usd}
            height={260}
          />
        </Panel>
        <Panel title="My watchlist" menu>
          <ul className="orbit-list">
            {[
              ['AAPL', 'Apple, Inc', '$4,008.65', '11.01%', true],
              ['SPOT', 'Spotify.com', '$11,689.00', '9.48%', false],
              ['ABNB', 'Airbnb, Inc', '$32,227.00', '0.29%', true],
              ['ENVT', 'Envato, Inc', '$13,895.00', '3.79%', false],
              ['QIWI', 'qiwi.com, Inc', '$4,008.65', '4.52%', true],
            ].map(([sym, name, value, change, up]) => (
              <li key={sym as string} className="row row--between">
                <span className="row">
                  <Avatar name={sym as string} size="small" />
                  <span className="stack-text">
                    <strong>{sym}</strong>
                    <span className="muted text-sm">{name}</span>
                  </span>
                </span>
                <span className="stack-text orbit-end">
                  <strong>{value}</strong>
                  <Trend value={change as string} up={up as boolean} />
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <section aria-labelledby="trending" className="orbit-stack">
        <h2 id="trending" className="orbit-h2">
          Trending stocks
        </h2>
        <div className="orbit-grid orbit-grid--5">
          {tickers.map((t) => (
            <Ticker key={t.sym} t={t} actions />
          ))}
        </div>
      </section>
      <div className="orbit-row orbit-row--1-2">
        <Panel title="Dividends" menu>
          <BarChart
            title="Dividends by quarter"
            hideTitle
            data={['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => ({ q, paid: [120, 180, 160, 240][i] }))}
            xKey="q"
            series={[{ key: 'paid', label: 'Dividends paid' }]}
            formatValue={usd}
            height={220}
          />
        </Panel>
        <DataTable
          title="Latest transactions"
          rows={[
            ['Bought PYPL', 'Nov 23, 01:00 PM', '$2,567.88', 'Finance', 'Success'],
            ['Bought AAPL', 'Nov 22, 09:00 PM', '$2,567.88', 'Technology', 'Pending'],
            ['Sold KKST', 'Oct 12, 03:54 PM', '$6,754.99', 'Finance', 'Success'],
            ['Bought META', 'Sep 09, 02:00 AM', '$1,445.41', 'Social media', 'Success'],
            ['Sold AMZN', 'Feb 25, 08:00 PM', '$5,698.55', 'E-commerce', 'Failed'],
            ['Bought SPOT', 'Feb 11, 10:30 AM', '$812.10', 'Media', 'Success'],
            ['Sold TSLA', 'Jan 30, 04:12 PM', '$3,140.00', 'Automotive', 'Success'],
          ].map(([name, date, price, category, status]) => ({
            name,
            date,
            price,
            category,
            status,
          }))}
          rowId={(r) => r.name + r.date}
          columns={[
            { key: 'name', header: 'Name', render: (r) => <strong>{r.name}</strong> },
            { key: 'date', header: 'Date', hideBelow: 'medium' },
            { key: 'price', header: 'Price', align: 'end' },
            { key: 'category', header: 'Category', hideBelow: 'large' },
            { key: 'status', header: 'Status', render: (r) => <Status>{r.status}</Status> },
            {
              key: 'menu',
              header: <span className="visually-hidden">Actions</span>,
              width: 48,
              render: (r) => <RowMenu label={r.name} />,
            },
          ]}
          pageSize={5}
        />
      </div>
    </Page>
  );
}

/* --------------------------------------------------------------- Logistics */

const deliveries = Array.from({ length: 14 }, (_, i) => ({
  id: `#${28745 + i * 13}`,
  category: ['Electronics', 'Furniture', 'Apparel', 'Groceries'][i % 4],
  company: ['DHL', 'FedEx', 'UPS', 'Aramex'][i % 4],
  arrival: `${8 + (i % 10)}:${i % 2 ? '30' : '05'} ${i % 3 ? 'AM' : 'PM'}`,
  route: ['Lisbon → Madrid', 'Berlin → Paris', 'Dubai → Riyadh', 'Austin → Denver'][i % 4],
  price: usd(120 + i * 37),
  status: ['Delivered', 'In transit', 'Pending', 'Processing'][i % 4],
}));

function Logistics() {
  const [tab, setTab] = useState('All');
  return (
    <Page path="/dashboards/logistics" description="Shipments, fleet and live deliveries.">
      <Kpis
        items={[
          { label: 'Total orders', value: '12,384', change: '20%', icon: <Package /> },
          { label: 'Orders in transit', value: '728', change: '20%', icon: <Truck /> },
          { label: 'Delivered this month', value: '9,258', change: '12%', icon: <Box /> },
        ]}
      />
      <div className="orbit-row">
        <Panel
          title="Delivery statistics"
          actions={<Toggle label="Delivery period" options={['Monthly', 'Yearly']} />}
        >
          <div className="orbit-figures">
            <Figure label="Total deliveries" value="70.5K" />
            <Figure label="Total revenue earned" value="$23,445,700" />
          </div>
          <BarChart
            title="Shipments and deliveries by month"
            hideTitle
            data={monthly({
              shipment: series(4800, 160, 700),
              delivery: series(4300, 170, 600, 1),
            })}
            xKey="month"
            series={[
              { key: 'shipment', label: 'Shipment' },
              { key: 'delivery', label: 'Delivery', color: 3 },
            ]}
            formatValue={k}
            height={240}
          />
        </Panel>
        <div className="orbit-stack">
          <Panel title="Delivery vehicles" description="Vehicles on the road right now." menu>
            <Figure label="On route" value="29" change="3.85%" note="than last week" />
            <Progress
              label="Fleet in use"
              value={29}
              max={36}
              showValue
              formatValue={(v, m) => `${v} of ${m}`}
            />
          </Panel>
          <Panel
            title="Tracking delivery"
            description="#28745-72809BJK"
            menu
            actions={<Status>In transit</Status>}
          >
            <Stepper
              aria-label="Delivery progress"
              orientation="vertical"
              marker="dot"
              size="small"
              current={1}
              steps={[
                { label: 'Picked up', description: '12:54 · Lisbon hub' },
                { label: 'In transit', description: '12:58 · on the A2' },
                { label: 'Delivered', description: 'Expected 16:30' },
              ]}
            />
            <AvatarLabelGroup name="David Walton" supportingText="Courier" size="small" />
          </Panel>
        </div>
      </div>
      <DataTable
        title="Delivery activities"
        toolbar={
          <div className="orbit-toolbar">
            <Toggle
              label="Delivery status"
              options={['All', 'Delivered', 'In transit', 'Pending', 'Processing']}
              value={tab}
              onChange={setTab}
            />
            <span className="row">
              <Select label="Category" hideLabel placeholder="Category" size="small">
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="apparel">Apparel</SelectItem>
              </Select>
              <Select label="Company" hideLabel placeholder="Company" size="small">
                <SelectItem value="dhl">DHL</SelectItem>
                <SelectItem value="fedex">FedEx</SelectItem>
                <SelectItem value="ups">UPS</SelectItem>
              </Select>
              <Button size="small">Apply</Button>
            </span>
          </div>
        }
        rows={deliveries.filter((d) => tab === 'All' || d.status === tab)}
        rowId={(d) => d.id}
        columns={[
          { key: 'id', header: 'Order ID' },
          { key: 'category', header: 'Category', hideBelow: 'large' },
          { key: 'company', header: 'Company', hideBelow: 'medium' },
          { key: 'arrival', header: 'Arrival', hideBelow: 'large' },
          { key: 'route', header: 'Route', hideBelow: 'medium' },
          { key: 'price', header: 'Price', align: 'end' },
          { key: 'status', header: 'Status', render: (d) => <Status>{d.status}</Status> },
        ]}
      />
    </Page>
  );
}

/* ---------------------------------------------------------------------- AI */

function Ai() {
  return (
    <Page path="/dashboards/ai" description="Usage, users and projects across Orbit AI.">
      <Kpis
        items={[
          { label: 'Users', value: '10,590', change: '3.52%', note: 'last 30 days' },
          { label: 'Projects', value: '15,682', change: '3.52%', note: 'last 30 days' },
          { label: 'Revenue', value: '$90,369', change: '14.8%', note: 'last 30 days' },
          { label: 'Paid users', value: '520', change: '9.05%', note: 'last 30 days' },
        ]}
      />
      <div className="orbit-row">
        <Panel
          title="Users & revenue"
          actions={<Toggle label="Period" options={['Monthly', 'Quarterly', 'Annually']} />}
        >
          <LineChart
            title="Users and revenue by month"
            hideTitle
            data={monthly({ users: series(600, 70, 120), revenue: series(4200, 380, 600, 1) })}
            xKey="month"
            series={[
              { key: 'users', label: 'Users' },
              { key: 'revenue', label: 'Revenue ($)', color: 3 },
            ]}
            height={260}
          />
        </Panel>
        <Panel
          title="API token usage"
          menu
          footer={<Link href={to('/pages/api-keys')}>View usage details</Link>}
        >
          <ul className="orbit-list">
            {[
              ['GPT', '2 API keys', 7, 10],
              ['Gemini', '1 API key', 2, 10],
              ['Claude', '2 API keys', 4.5, 10],
            ].map(([name, keys, used, max]) => (
              <li key={name as string}>
                <Progress
                  label={
                    <span className="stack-text">
                      <strong>{name}</strong>
                      <span className="muted text-sm">{keys}</span>
                    </span>
                  }
                  value={used as number}
                  max={max as number}
                  showValue
                  formatValue={(v, m) => `${v}M of ${m}M tokens`}
                  size="small"
                />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <div className="orbit-row orbit-row--even">
        <Panel title="User analytics" menu>
          <div className="orbit-split">
            <DonutChart
              title="Free and paid users"
              hideTitle
              data={[
                { label: 'Free users', value: 10070 },
                { label: 'Paid users', value: 520 },
              ]}
              centerValue="10,590"
              centerLabel="Users"
              size={170}
            />
            <div className="orbit-figures orbit-figures--column">
              <Figure label="This month" value="4,925" change="5.2%" />
              <Figure label="This year" value="12,489" change="12.4%" />
            </div>
          </div>
        </Panel>
        <Panel title="Projects analytics" menu>
          <div className="orbit-figures orbit-figures--split">
            <Figure label="Total projects" value="15,682" />
            <Figure label="Today" value="120" />
            <Figure label="Yesterday" value="392" />
          </div>
          <BarChart
            title="Projects created per month"
            hideTitle
            data={monthly({ projects: series(800, 60, 160) })}
            xKey="month"
            series={[{ key: 'projects', label: 'Projects' }]}
            height={170}
            hideYAxis
          />
        </Panel>
      </div>
      <DataTable
        title="Recent transactions"
        actions={
          <Button variant="secondary" appearance="outline" size="small" iconStart={<Filter />}>
            Filter
          </Button>
        }
        rows={people.map((p, i) => ({
          p,
          pkg: ['Starter', 'Pro', 'Team', 'Pro', 'Enterprise', 'Starter', 'Team', 'Pro'][i],
          price: ['$19', '$49', '$199', '$49', '$999', '$19', '$199', '$49'][i],
          date: `Oct ${14 - i}, 2026`,
          status: ['Paid', 'Paid', 'Pending', 'Paid', 'Paid', 'Failed', 'Paid', 'Refunded'][i],
        }))}
        rowId={(r) => r.p.email}
        columns={[
          {
            key: 'p',
            header: 'Paid by',
            render: (r) => (
              <AvatarLabelGroup
                name={r.p.name}
                src={r.p.src}
                supportingText={r.p.email}
                size="small"
              />
            ),
          },
          { key: 'pkg', header: 'Package', hideBelow: 'small' },
          { key: 'price', header: 'Price', align: 'end' },
          { key: 'date', header: 'Paid date', hideBelow: 'medium' },
          { key: 'status', header: 'Status', render: (r) => <Status>{r.status}</Status> },
          {
            key: 'menu',
            header: <span className="visually-hidden">Actions</span>,
            width: 48,
            render: (r) => <RowMenu label={r.p.name} />,
          },
        ]}
      />
    </Page>
  );
}

/* ------------------------------------------------------------------- Sales */

function Sales() {
  return (
    <Page
      path="/dashboards/sales"
      title="Sales dashboard"
      description="Track revenue, performance and sales growth in real time."
      actions={
        <>
          <Button variant="secondary" appearance="outline" size="small" iconStart={<Filter />}>
            Filter
          </Button>
          <Button size="small" iconStart={<Download />}>
            Export
          </Button>
        </>
      }
    >
      <Kpis
        items={[
          { label: 'Total revenue', value: '$10,590', change: '32%', icon: <CircleDollarSign /> },
          { label: 'Total sales', value: '1,320', change: '32%', icon: <ShoppingBag /> },
          { label: 'Conversion rate', value: '4.38%', change: '32%', icon: <Users /> },
          {
            label: 'Refund rate',
            value: '1.2%',
            change: '0.4%',
            up: false,
            good: true,
            icon: <Wallet />,
          },
        ]}
      />
      <Panel
        title="Users & revenue"
        description="Month-to-month progress and engagement."
        actions={<Toggle label="Period" options={['Daily', 'Weekly', 'Monthly']} />}
      >
        <AreaChart
          title="Users and revenue"
          hideTitle
          data={monthly({ revenue: series(6200, 300, 900), users: series(2600, 150, 500, 2) })}
          xKey="month"
          series={[
            { key: 'revenue', label: 'Revenue' },
            { key: 'users', label: 'Users', color: 3 },
          ]}
          height={260}
        />
      </Panel>
      <div className="orbit-grid orbit-grid--3">
        <Panel title="User retention" description="Engagement over time." menu>
          <Figure label="Retained" value="24%" change="3.2%" note="vs last week" />
          <BarChart
            title="Retention by week"
            hideTitle
            data={['W1', 'W2', 'W3', 'W4', 'W5', 'W6'].map((w, i) => ({
              w,
              r: [100, 62, 44, 33, 27, 24][i],
            }))}
            xKey="w"
            series={[{ key: 'r', label: 'Retained %' }]}
            height={160}
            hideYAxis
          />
        </Panel>
        <Panel title="Sales by channel" description="Channel performance." menu>
          <DonutChart
            title="Sales by channel"
            hideTitle
            data={[
              { label: 'Website', value: 35 },
              { label: 'Email', value: 25 },
              { label: 'Social media', value: 40 },
            ]}
            formatValue={(v) => `${v}%`}
            centerValue="75"
            centerLabel="Deals"
            size={170}
          />
        </Panel>
        <Panel title="Sales by country" description="Country-wise sales." menu>
          <CountryBars
            rows={[
              { label: 'USA', value: 79, note: '$20,594' },
              { label: 'Japan', value: 68, note: '$15,230' },
              { label: 'Germany', value: 72, note: '$16,450' },
              { label: 'France', value: 61, note: '$13,210' },
            ]}
          />
        </Panel>
      </div>
      <DataTable
        title="Top products"
        actions={
          <>
            <Button variant="secondary" appearance="outline" size="small" iconStart={<Filter />}>
              Filter
            </Button>
            <Button
              variant="secondary"
              appearance="outline"
              size="small"
              href={to('/commerce/products')}
            >
              See all
            </Button>
          </>
        }
        rows={[
          ['Classic denim jacket', '3 sizes', 'Jacket', 500, '$89.99', 100, 'In stock'],
          ['Slim fit chinos', '4 colors', 'Pants', 500, '$49.99', 80, 'In stock'],
          ['Organic cotton T-shirt', '5 colors', 'T-shirt', 220, '$25.00', 30, 'Low stock'],
          ['Leather ankle boots', '6 sizes', 'Footwear', 875, '$120.00', 12, 'Low stock'],
          ['Wool overcoat', '3 sizes', 'Coat', 140, '$210.00', 0, 'Out of stock'],
        ].map(
          ([name, variant, category, sales, earnings, stock, status]) =>
            ({ name, variant, category, sales, earnings, stock, status }) as {
              name: string;
              variant: string;
              category: string;
              sales: number;
              earnings: string;
              stock: number;
              status: string;
            },
        )}
        rowId={(r) => r.name}
        columns={[
          {
            key: 'name',
            header: 'Product',
            render: (r) => (
              <span className="row">
                <FeaturedIcon
                  icon={<ShoppingBag />}
                  size="small"
                  appearance="modern"
                  shape="square"
                />
                <span className="stack-text">
                  <strong>{r.name}</strong>
                  <span className="muted text-sm">{r.variant}</span>
                </span>
              </span>
            ),
          },
          { key: 'category', header: 'Category', hideBelow: 'large' },
          { key: 'sales', header: 'Sales', align: 'end', hideBelow: 'medium' },
          { key: 'earnings', header: 'Earnings', align: 'end' },
          { key: 'stock', header: 'Stock', align: 'end', hideBelow: 'medium' },
          { key: 'status', header: 'Status', render: (r) => <Status>{r.status}</Status> },
        ]}
      />
    </Page>
  );
}

/* ----------------------------------------------------------------- Finance */

function Finance() {
  const [currency, setCurrency] = useState('USD');
  const symbol = { USD: '$', EUR: '€', GBP: '£', JPY: '¥' }[currency];
  return (
    <Page path="/dashboards/finance" description="Balances, cash flow, spending and cards.">
      <div className="orbit-row">
        <Panel
          title="Total balance"
          description="Overview of your current funds."
          actions={
            <Toggle
              label="Currency"
              options={['USD', 'EUR', 'GBP', 'JPY']}
              value={currency}
              onChange={setCurrency}
            />
          }
        >
          <Figure
            label="Primary account •••• 5332"
            value={`${symbol}19,857.00`}
            change="3.2%"
            note="vs last month"
          />
          <div className="orbit-grid">
            <Figure label="Total balance" value={`${symbol}24,830`} change="3.2%" />
            <Figure label="Monthly income" value={`${symbol}5,200`} change="3.2%" />
            <Figure label="Total spent" value={`${symbol}3,831`} change="2.9%" up good={false} />
            <Figure label="Saving rate" value="26.1%" note="Goal 30% · 3.9% to go" />
          </div>
        </Panel>
        <Panel title="Quick send" menu>
          <AvatarGroup label="Recent recipients" size="small" max={7}>
            {people.map((p) => (
              <Avatar key={p.email} name={p.name} src={p.src} />
            ))}
          </AvatarGroup>
          <Select label="Send from" defaultValue="visa">
            <SelectItem value="visa" supportingText="•••• 3657">
              Visa
            </SelectItem>
            <SelectItem value="master" supportingText="•••• 4912">
              Mastercard
            </SelectItem>
          </Select>
          <InputField label="Amount" type="number" defaultValue="250" prefix="$" />
          <Button fullWidth iconStart={<PiggyBank />}>
            Send money
          </Button>
        </Panel>
      </div>
      <div className="orbit-row">
        <Panel title="Cash flow" menu>
          <Figure label="Total revenue" value="$9,758.00" change="7.96%" />
          <BarChart
            title="Income and expense by month"
            hideTitle
            data={monthly({ income: series(5200, 120, 700), expense: series(3400, 80, 500, 1) })}
            xKey="month"
            series={[
              { key: 'income', label: 'Income' },
              { key: 'expense', label: 'Expense', color: 5 },
            ]}
            formatValue={usd}
            height={240}
          />
        </Panel>
        <Panel
          title="Spending"
          actions={<Toggle label="Spending period" options={['Yearly', 'Monthly']} />}
        >
          <DonutChart
            title="Spending by category"
            hideTitle
            data={[
              { label: 'Online purchases', value: 3800 },
              { label: 'Groceries', value: 2900 },
              { label: 'Digital goods', value: 1900 },
              { label: 'Stationery', value: 950 },
              { label: 'Others', value: 1208 },
            ]}
            formatValue={usd}
            centerValue="$10,758"
            centerLabel="Total"
            size={180}
          />
        </Panel>
      </div>
      <div className="orbit-row orbit-row--1-2">
        <Panel
          title="My cards"
          actions={
            <Button variant="secondary" appearance="outline" size="small">
              Add card
            </Button>
          }
        >
          <BankCard holder="Maya Okafor" number="4983" expiry="09/29" brand="Orbit" />
          <BankCard tone="dark" holder="Maya Okafor" number="1234" expiry="12/28" brand="Orbit" />
        </Panel>
        <div className="orbit-stack">
          <Panel
            title="Virtual card · recent"
            footer={<Link href={to('/commerce/transactions')}>See all transactions</Link>}
          >
            <ActivityFeed
              aria-label="Virtual card transactions"
              appearance="divided"
              items={[
                ['Payment received', 'Cashback from Stellar Rewards', '+$120.00', 'Mar 20'],
                ['Netflix subscription', 'September subscription charge', '−$36.24', 'Sep 18'],
                ['Money received', 'Payment via PayPal', '+$590.00', 'Feb 12'],
                ['Google Ads', 'Ad credit refund', '+$236.24', 'Jan 28'],
              ].map(([title, desc, amount, date], i) => ({
                id: i,
                icon: <Wallet />,
                iconTone: amount.startsWith('+') ? 'success' : 'danger',
                title: (
                  <>
                    <strong>{title}</strong> · {amount}
                  </>
                ),
                description: desc,
                time: date,
              }))}
            />
          </Panel>
        </div>
      </div>
      <DataTable
        title="Recent transactions"
        actions={
          <Button variant="secondary" appearance="outline" size="small" iconStart={<Filter />}>
            Filter
          </Button>
        }
        rows={[
          ['NIV_034834', 'Hotel booking', '$9,234.87', '15 Mar 2026, 08:22', 'Completed'],
          ['NIV_034345', 'Online shopping', '$4,567.23', '28 Feb 2026, 09:15', 'Completed'],
          ['NIV_093854', 'Game purchase', '$2,101.76', '14 Feb 2026, 14:55', 'In progress'],
          ['NIV_005378', 'Utility bill', '$789.45', '02 Feb 2026, 18:30', 'Completed'],
          ['NIV_823930', 'Course enrollment', '$1,223.90', '22 Jan 2026, 11:02', 'Completed'],
          ['NIV_811201', 'Flight tickets', '$2,980.00', '12 Jan 2026, 07:40', 'Failed'],
          ['NIV_801177', 'Gym membership', '$89.00', '05 Jan 2026, 06:10', 'Completed'],
        ].map(([id, activity, price, date, status]) => ({ id, activity, price, date, status }))}
        rowId={(r) => r.id}
        columns={[
          { key: 'id', header: 'Order ID', hideBelow: 'medium' },
          { key: 'activity', header: 'Activity', render: (r) => <strong>{r.activity}</strong> },
          { key: 'price', header: 'Price', align: 'end' },
          { key: 'date', header: 'Date', hideBelow: 'large' },
          { key: 'status', header: 'Status', render: (r) => <Status>{r.status}</Status> },
          {
            key: 'menu',
            header: <span className="visually-hidden">Actions</span>,
            width: 48,
            render: (r) => <RowMenu label={r.id} />,
          },
        ]}
      />
    </Page>
  );
}

const boards: Record<string, () => ReactNode> = {
  ecommerce: Ecommerce,
  analytics: Analytics,
  marketing: Marketing,
  crm: Crm,
  stocks: Stocks,
  logistics: Logistics,
  ai: Ai,
  sales: Sales,
  finance: Finance,
};

export default function Dashboards({ path }: { path: string }) {
  const Board = boards[path.split('/')[2]] ?? Ecommerce;
  return <Board />;
}
