import { useState } from 'react';
import {
  AreaChart,
  AvatarLabelGroup,
  Badge,
  BarChart,
  Breadcrumb,
  Button,
  DateRangePicker,
  Divider,
  DonutChart,
  FeaturedIcon,
  IconButton,
  InputField,
  LineChart,
  Link,
  MetricCard,
  PageHeader,
  Pagination,
  Progress,
  RadarChart,
  Select,
  SelectItem,
  Sparkline,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableCard,
  Tabs,
  datePresets,
  type TableColumn,
} from '@ds/react';
import {
  ArrowLeftRight,
  ArrowUpRight,
  Copy,
  DollarSign,
  Download,
  Eye,
  Filter,
  Lightbulb,
  Pencil,
  PenLine,
  Search,
  Sparkles,
  Trash2,
  UserPlus,
  UserRound,
  X,
} from 'lucide-react';
import {
  acquisition,
  countries,
  dailyTraffic,
  members,
  mrr,
  people,
  posts,
  sitePages,
  threeYears,
  weekdayTraffic,
} from '../dashboard-data';
import { AppShell } from '../shell/AppShell';
import { BigFigure, Panel, PeopleTable, Periods, Trend, More } from './kit';

const usd = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(v);
const filters = (
  <Button variant="secondary" appearance="outline" iconStart={<Filter />}>
    Filters
  </Button>
);

/** 01 · Membership: MRR with member figures, quick actions, recent posts and top members. */
export function Dashboard01() {
  return (
    <AppShell current="01" promo="workshop">
      <div className="dash">
        <PageHeader
          title="Dashboard"
          actions={
            <>
              <DateRangePicker
                label="Period"
                presets={datePresets()}
                defaultMonth={new Date(2026, 9, 1)}
              />
              {filters}
            </>
          }
        >
          <Periods />
        </PageHeader>
        <div className="dash-grid dash-grid--3-1">
          <div className="dash-stack">
            <BigFigure label="MRR" value="$18,880" trend={<Trend value="7.4%" />} />
            <AreaChart
              title="Monthly recurring revenue"
              hideTitle
              data={mrr}
              xKey="month"
              series={[{ key: 'mrr', label: 'MRR' }]}
              formatValue={usd}
              height={240}
              hideYAxis
              showGrid={false}
            />
          </div>
          <div className="dash-stack">
            <BigFigure label="Total members" value="4,862" trend={<Trend value="9.2%" />} />
            <BigFigure label="Paid members" value="2,671" trend={<Trend value="6.6%" />} />
            <BigFigure label="Email open rate" value="82%" trend={<Trend value="8.1%" />} />
          </div>
        </div>
        <div className="dash-grid dash-grid--3-1">
          <div className="dash-stack">
            <Panel title="Start creating content" menu className="kit-panel--plain">
              <div className="dash-grid dash-grid--2">
                {[
                  {
                    icon: <UserPlus />,
                    title: 'Create your first member',
                    text: 'Add yourself or import from CSV',
                  },
                  {
                    icon: <PenLine />,
                    title: 'Create a new post',
                    text: 'Dive into the editor and start creating',
                  },
                ].map((a) => (
                  <Link
                    key={a.title}
                    appearance="standalone"
                    variant="secondary"
                    href="#/dashboards/01"
                    className="dash-action"
                  >
                    <FeaturedIcon icon={a.icon} appearance="modern" shape="square" />
                    <span className="stack-text">
                      <strong>{a.title}</strong>
                      <span className="muted">{a.text}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </Panel>
            <Panel title="Recent posts" menu className="kit-panel--plain">
              <div className="dash-grid dash-grid--2">
                {posts.map((p, i) => (
                  <article key={p.title} className="dash-post">
                    <div
                      className={`dash-post__media dash-post__media--${i + 1}`}
                      aria-hidden="true"
                    />
                    <span className="dash-post__meta">
                      {p.author} • {p.date}
                    </span>
                    <Link
                      appearance="standalone"
                      variant="secondary"
                      href="#/dashboards/01"
                      icon={<ArrowUpRight />}
                      className="dash-post__title"
                    >
                      {p.title}
                    </Link>
                    <p className="muted">{p.excerpt}</p>
                    <span className="kit-tags">
                      {p.tags.map((t) => (
                        <Badge key={t.label} tone={t.tone} shape="modern" size="small" withDot>
                          {t.label}
                        </Badge>
                      ))}
                    </span>
                  </article>
                ))}
              </div>
            </Panel>
          </div>
          <Panel title="Top members" className="kit-panel--plain">
            <ul className="kit-list" aria-label="Top members">
              {members.slice(0, 8).map((m) => (
                <li key={m.email} className="kit-list__item">
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
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

type SitePage = (typeof sitePages)[number];
const pageColumns: TableColumn<SitePage>[] = [
  { key: 'path', header: 'Page', sortable: true },
  {
    key: 'sessions',
    header: 'Sessions',
    sortable: true,
    render: (p) => p.sessions.toLocaleString('en-US'),
  },
  { key: 'avg', header: 'Avg time', hideBelow: 'medium' },
  {
    key: 'share',
    header: '% of total',
    width: 220,
    sortable: true,
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
  {
    key: 'folder',
    header: 'Folder',
    hideBelow: 'large',
    render: (p) => (
      <Badge
        tone={
          p.folder === 'General'
            ? 'primary'
            : p.folder === 'Marketing'
              ? 'pink'
              : p.folder === 'Product'
                ? 'blue'
                : 'teal'
        }
        shape="modern"
        size="small"
        withDot
      >
        {p.folder}
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: <span className="visually-hidden">Actions</span>,
    width: 88,
    render: (p) => (
      <span className="kit-row-actions">
        <IconButton
          icon={<Trash2 />}
          label={`Delete ${p.path}`}
          variant="secondary"
          appearance="ghost"
          size="small"
        />
        <IconButton
          icon={<Pencil />}
          label={`Edit ${p.path}`}
          variant="secondary"
          appearance="ghost"
          size="small"
        />
      </span>
    ),
  },
];

/** 02 · Site traffic: segment tabs, three sparkline cards, pages and screens. */
export function Dashboard02() {
  const [page, setPage] = useState(1);
  return (
    <AppShell current="02">
      <div className="dash">
        <PageHeader
          title="Site traffic"
          actions={
            <>
              <Button
                variant="secondary"
                appearance="outline"
                iconStart={<ArrowLeftRight />}
                href="#/dashboards/17"
              >
                Switch dashboard
              </Button>
              <Button iconStart={<Download />}>Export report</Button>
            </>
          }
        >
          <Tabs appearance="segmented" defaultValue="all" className="scroll-x">
            <TabList label="Traffic segment">
              {[
                'All sessions',
                'Direct traffic',
                'Organic traffic',
                'Paid traffic',
                'Mobile users',
                'Returning users',
              ].map((t, i) => (
                <Tab key={t} value={i === 0 ? 'all' : t}>
                  {t}
                </Tab>
              ))}
            </TabList>
            {[
              'all',
              'Direct traffic',
              'Organic traffic',
              'Paid traffic',
              'Mobile users',
              'Returning users',
            ].map((v) => (
              <TabPanel key={v} value={v} className="visually-hidden">
                {`Showing ${v === 'all' ? 'all sessions' : v.toLowerCase()}`}
              </TabPanel>
            ))}
          </Tabs>
        </PageHeader>
        <section className="dash-grid dash-grid--3" aria-label="Traffic figures">
          <MetricCard
            label="Total sessions"
            value="526"
            change="2.4%"
            trend="up"
            trendStyle="simple"
            comparison="vs last month"
            chart={<Sparkline data={[30, 28, 29, 27, 26, 28, 29, 31]} tone="primary" />}
            actions={<More label="Options for total sessions" />}
          />
          <MetricCard
            label="Session duration"
            value="2:24"
            change="8.6%"
            trend="up"
            trendStyle="simple"
            comparison="vs last month"
            chart={<Sparkline data={[22, 26, 30, 29, 24, 22, 27, 25, 30]} tone="primary" />}
            actions={<More label="Options for session duration" />}
          />
          <MetricCard
            label="Pages per session"
            value="316"
            change="6.0%"
            trend="up"
            trendStyle="simple"
            comparison="vs last month"
            chart={<Sparkline data={[20, 19, 18, 24, 23, 22, 24, 26, 27]} tone="primary" />}
            actions={<More label="Options for pages per session" />}
          />
        </section>
        <TableCard
          title="Pages and screens"
          titleAs="h2"
          toolbar={
            <div className="dash-toolbar">
              <Tabs appearance="segmented" size="small" defaultValue="all">
                <TabList label="Page visibility">
                  <Tab value="all">View all</Tab>
                  <Tab value="public">Public</Tab>
                  <Tab value="private">Private</Tab>
                </TabList>
                <TabPanel value="all" className="visually-hidden">
                  All pages
                </TabPanel>
                <TabPanel value="public" className="visually-hidden">
                  Public pages
                </TabPanel>
                <TabPanel value="private" className="visually-hidden">
                  Private pages
                </TabPanel>
              </Tabs>
              <span className="dash-toolbar__end">
                <InputField
                  label="Search pages"
                  hideLabel
                  size="small"
                  iconStart={<Search />}
                  shortcut="⌘K"
                  placeholder="Search"
                />
                <Button
                  variant="secondary"
                  appearance="outline"
                  size="small"
                  iconStart={<Filter />}
                >
                  Filters
                </Button>
              </span>
            </div>
          }
          footer={
            <Pagination
              currentPage={page}
              totalPages={10}
              onPageChange={setPage}
              appearance="simple"
              showArrowLabels
              layout="spread"
              label="Page list pages"
            />
          }
        >
          <Table<SitePage>
            caption="Pages and screens"
            hideCaption
            columns={pageColumns}
            rows={sitePages}
            getRowId={(p) => p.path}
            selectable
            rowLabel={(p) => `Select ${p.path}`}
          />
        </TableCard>
      </div>
    </AppShell>
  );
}

/** 04 · Store revenue: selectable revenue cards, net revenue chart and customers. */
export function Dashboard04() {
  const [picked, setPicked] = useState('revenue');
  const cards = [
    {
      id: 'revenue',
      label: 'All revenue',
      value: '$8,746.22',
      change: '2.4%',
      icon: <DollarSign />,
    },
    { id: 'views', label: 'Page views', value: '12,440', change: '6.2%', icon: <Eye /> },
    { id: 'active', label: 'Active now', value: '96', change: '0.8%', icon: <UserRound /> },
  ];
  return (
    <AppShell current="04" promo="verify">
      <div className="dash">
        <PageHeader
          breadcrumbs={
            <Breadcrumb
              items={[
                { label: 'Warpspeed', href: '#/dashboards/04' },
                { label: 'Olivia Rhye', href: '#/dashboards/19' },
                { label: 'Dashboard' },
              ]}
            />
          }
          title="My dashboard"
          actions={
            <>
              <Button variant="secondary" appearance="outline" iconStart={<Sparkles />}>
                What’s new?
              </Button>
              <Button variant="secondary" appearance="outline" iconStart={<Copy />}>
                Copy link
              </Button>
              <Button variant="secondary" appearance="outline" iconEnd={<ArrowUpRight />}>
                Visit store
              </Button>
            </>
          }
        />
        <section className="dash-grid dash-grid--3" aria-label="Store figures">
          {cards.map((c) => (
            <Button
              key={c.id}
              appearance="text"
              variant="secondary"
              className={['dash-pick', picked === c.id && 'dash-pick--on']
                .filter(Boolean)
                .join(' ')}
              aria-pressed={picked === c.id}
              onClick={() => setPicked(c.id)}
            >
              <MetricCard
                label={c.label}
                value={c.value}
                change={c.change}
                trend="up"
                trendStyle="modern"
                icon={c.icon}
                layout="horizontal"
              />
            </Button>
          ))}
        </section>
        <div className="dash-toolbar">
          <BigFigure label="Net revenue" value="$7,804.16" trend={<Trend value="2.4%" />} />
          <span className="dash-toolbar__end">
            <Periods />
            {filters}
          </span>
        </div>
        <LineChart
          title="Net revenue, this year and last"
          hideTitle
          data={mrr}
          xKey="month"
          series={[
            { key: 'mrr', label: 'This year' },
            { key: 'last', label: 'Last year', color: 7 },
          ]}
          formatValue={usd}
          height={260}
          hideYAxis
        />
        <PeopleTable />
      </div>
    </AppShell>
  );
}

/** 05 · Recently active: site traffic columns, a filter builder and users with access tags. */
export function Dashboard05() {
  const [page, setPage] = useState(1);
  type P = (typeof people)[number];
  const columns: TableColumn<P>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (p) => (
        <AvatarLabelGroup name={p.name} src={p.src} supportingText={p.email} size="small" />
      ),
    },
    {
      key: 'access',
      header: 'Access',
      hideBelow: 'medium',
      render: (p) => (
        <span className="kit-tags">
          {p.name.length % 2 === 0 && (
            <Badge tone="purple" shape="modern" size="small" withDot>
              Admin
            </Badge>
          )}
          <Badge tone="blue" shape="modern" size="small" withDot>
            Data export
          </Badge>
          <Badge tone="success" shape="modern" size="small" withDot>
            Data import
          </Badge>
        </span>
      ),
    },
    { key: 'active', header: 'Last active', hideBelow: 'small', render: () => 'Jan 16, 2026' },
    {
      key: 'added',
      header: 'Date added',
      hideBelow: 'large',
      render: (p) =>
        `${['Oct 10', 'Aug 1', 'Jul 28', 'Sep 3', 'Jan 18', 'Jan 14', 'Dec 16'][people.indexOf(p)]}, 2024`,
    },
    {
      key: 'more',
      header: <span className="visually-hidden">Actions</span>,
      width: 48,
      render: (p) => <More label={`Actions for ${p.name}`} />,
    },
  ];
  return (
    <AppShell current="05" promo="workshop">
      <div className="dash">
        <PageHeader
          breadcrumbs={
            <Breadcrumb
              items={[{ label: 'Sienna Hewitt', href: '#/dashboards/19' }, { label: 'Dashboard' }]}
            />
          }
          title="Welcome back, Sienna"
          description="Here’s an overview of your site traffic and recently active users."
          actions={
            <AvatarLabelGroup
              name="Sienna Hewitt"
              supportingText="sienna@panda.io"
              status="online"
              size="small"
            />
          }
        />
        <div className="dash-toolbar">
          <h2 className="dash-h2">
            Site traffic <span className="kit-positive">+104%</span>
          </h2>
          <span className="dash-toolbar__end">
            <Periods />
            {filters}
          </span>
        </div>
        <BarChart
          title="Daily visits"
          hideTitle
          data={dailyTraffic}
          xKey="day"
          series={[{ key: 'visits', label: 'Visits' }]}
          height={220}
          hideYAxis
          showGrid={false}
        />
        <TableCard
          title="Recently active"
          titleAs="h2"
          actions={
            <InputField
              label="Search users"
              hideLabel
              size="small"
              iconStart={<Search />}
              shortcut="⌘K"
              placeholder="Search"
            />
          }
          toolbar={
            <div className="dash-filter-builder">
              <Select label="Field" hideLabel size="small" placeholder="Filter">
                <SelectItem value="access">Access</SelectItem>
                <SelectItem value="active">Last active</SelectItem>
              </Select>
              <Select label="Operator" hideLabel size="small" defaultValue="equals">
                <SelectItem value="equals">Equals</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
              </Select>
              <InputField label="Value" hideLabel size="small" placeholder="Enter a value" />
              <IconButton
                icon={<X />}
                label="Remove filter"
                variant="secondary"
                appearance="ghost"
                size="small"
              />
              <Button
                variant="secondary"
                appearance="outline"
                size="small"
                className="dash-toolbar__end"
              >
                Clear all
              </Button>
            </div>
          }
          footer={
            <Pagination
              currentPage={page}
              totalPages={10}
              onPageChange={setPage}
              showArrowLabels
              layout="spread"
              label="User pages"
            />
          }
        >
          <Table<P>
            caption="Recently active users"
            hideCaption
            columns={columns}
            rows={people}
            getRowId={(p) => p.email}
            selectable
            defaultSelected={[people[1].email, people[2].email, people[4].email]}
            rowLabel={(p) => `Select ${p.name}`}
          />
        </TableCard>
      </div>
    </AppShell>
  );
}

/** 17 · Website analytics: tabbed overview figures, traffic sources radar, acquisition, countries. */
export function Dashboard17() {
  const overview = [
    { key: 'users', label: 'Users', value: '8.8k', change: '7.4%', up: true },
    { key: 'sessions', label: 'Sessions', value: '10.2k', change: '7.4%', up: true },
    { key: 'bounce', label: 'Bounce rate', value: '46.2%', change: '0.2%', up: false },
    { key: 'duration', label: 'Session duration', value: '4m 4s', change: '7.4%', up: true },
  ];
  return (
    <AppShell current="17" slim>
      <div className="dash">
        <PageHeader
          title="Website analytics"
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
        />
        <div className="dash-grid dash-grid--2-1">
          <Panel
            title="Overview"
            menu
            className="kit-panel--plain"
            footer={
              <>
                <Periods options={['12 months', '30 days', '7 days']} custom />
                <Button
                  variant="secondary"
                  appearance="outline"
                  size="small"
                  className="dash-toolbar__end"
                >
                  Audience overview
                </Button>
              </>
            }
          >
            <Tabs appearance="line" defaultValue="users">
              <TabList label="Overview figures">
                {overview.map((o) => (
                  <Tab key={o.key} value={o.key}>
                    <span className="dash-tab-figure">
                      <span className="muted">{o.label}</span>
                      <span className="dash-tab-figure__value">
                        {o.value}{' '}
                        <Trend
                          value={o.change}
                          up={o.up}
                          good={o.key === 'bounce' ? false : undefined}
                        />
                      </span>
                    </span>
                  </Tab>
                ))}
              </TabList>
              {overview.map((o) => (
                <TabPanel key={o.key} value={o.key}>
                  <LineChart
                    title={`${o.label} over the year`}
                    hideTitle
                    data={threeYears}
                    xKey="month"
                    series={[
                      { key: 'y2027', label: 'This year' },
                      { key: 'y2026', label: 'Last year', color: 7 },
                      { key: 'y2025', label: '2025', color: 2 },
                    ]}
                    height={240}
                    hideYAxis
                  />
                </TabPanel>
              ))}
            </Tabs>
          </Panel>
          <Panel title="Traffic sources" menu className="kit-panel--plain">
            <RadarChart
              title="Visits by weekday and device"
              hideTitle
              axisKey="day"
              data={weekdayTraffic}
              series={[
                { key: 'desktop', label: 'Desktop' },
                { key: 'mobile', label: 'Mobile', color: 5 },
                { key: 'tablet', label: 'Tablet', color: 6 },
              ]}
              size={300}
            />
          </Panel>
        </div>
        <Divider />
        <div className="dash-grid dash-grid--2-1">
          <Panel
            title="How do you acquire users?"
            menu
            className="kit-panel--plain"
            footer={
              <>
                <Periods options={['12 months', '30 days', '7 days']} custom />
                <Button
                  variant="secondary"
                  appearance="outline"
                  size="small"
                  className="dash-toolbar__end"
                >
                  Audience overview
                </Button>
              </>
            }
          >
            <Tabs appearance="segmented" size="small" defaultValue="channel">
              <TabList label="Breakdown">
                <Tab value="channel">Traffic channel</Tab>
                <Tab value="source">Source</Tab>
                <Tab value="referrals">Referrals</Tab>
              </TabList>
              {['channel', 'source', 'referrals'].map((v) => (
                <TabPanel key={v} value={v}>
                  <BarChart
                    title={`New users by ${v}`}
                    hideTitle
                    stacked
                    data={acquisition}
                    xKey="month"
                    series={[
                      { key: 'referral', label: 'Referral' },
                      { key: 'organic', label: 'Organic search', color: 7 },
                      { key: 'direct', label: 'Direct', color: 8 },
                    ]}
                    height={220}
                    hideYAxis
                  />
                </TabPanel>
              ))}
            </Tabs>
          </Panel>
          <Panel title="Sessions by country" menu className="kit-panel--plain">
            <DonutChart
              title="Share of sessions by country"
              hideTitle
              data={countries.slice(0, 5)}
              formatValue={(v) => `${v}%`}
              size={200}
              thickness={0.2}
            />
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

/** 18 · Ad performance: sparkline KPIs, active users by country, acquisition bars and donut. */
export function Dashboard18() {
  const live = [
    { label: 'United States', value: 50 },
    { label: 'India', value: 30 },
    { label: 'United Kingdom', value: 20 },
    { label: 'Australia', value: 10 },
    { label: 'Canada', value: 10 },
  ];
  return (
    <AppShell current="18" promo="refer">
      <div className="dash">
        <PageHeader
          title="Welcome back, Olivia"
          description="Measure your advertising ROI and track website traffic."
          actions={
            <>
              <Button variant="secondary" appearance="outline" iconStart={<Download />}>
                Export
              </Button>
              <Button iconStart={<Lightbulb />}>Insights</Button>
            </>
          }
        >
          <div className="dash-toolbar">
            <Periods />
            <span className="dash-toolbar__end">
              <DateRangePicker label="Period" presets={datePresets()} />
              {filters}
            </span>
          </div>
        </PageHeader>
        <section className="dash-grid dash-grid--3" aria-label="Traffic figures">
          <MetricCard
            label="Users"
            value="20.8k"
            change="12%"
            trend="up"
            trendStyle="simple"
            comparison="vs last month"
            chart={<Sparkline data={[3, 4, 3, 5, 6, 5, 7, 6, 8, 9]} />}
            actions={<More label="Options for users" />}
          />
          <MetricCard
            label="Sessions"
            value="26.4k"
            change="2%"
            trend="down"
            trendStyle="simple"
            comparison="vs last month"
            chart={<Sparkline data={[9, 8, 9, 7, 8, 6, 7, 6, 5, 6]} />}
            actions={<More label="Options for sessions" />}
          />
          <MetricCard
            label="Session duration"
            value="3m 52s"
            change="2%"
            trend="up"
            trendStyle="simple"
            comparison="vs last month"
            chart={<Sparkline data={[4, 5, 4, 6, 5, 6, 7, 6, 7, 8]} />}
            actions={<More label="Options for session duration" />}
          />
        </section>
        <Panel
          title="Active users right now"
          actions={
            <Button variant="secondary" appearance="outline" size="small">
              Real-time report
            </Button>
          }
        >
          <div className="dash-grid dash-grid--2-1">
            <div className="dash-map" aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className={`dash-map__ping dash-map__ping--${i}`} />
              ))}
            </div>
            <div className="dash-stack">
              <BigFigure label="Active users" value="10.8k" />
              <ul className="kit-list" aria-label="Active users by country">
                {live.map((c) => (
                  <li key={c.label} className="dash-country">
                    <Progress label={c.label} value={c.value} showValue size="small" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Panel>
        <Panel
          title="How do you acquire users?"
          actions={
            <Button variant="secondary" appearance="outline" size="small">
              Location report
            </Button>
          }
        >
          <div className="dash-grid dash-grid--2-1">
            <BarChart
              title="New users by channel and month"
              hideTitle
              stacked
              data={acquisition}
              xKey="month"
              series={[
                { key: 'referral', label: 'Referral' },
                { key: 'organic', label: 'Organic', color: 7 },
                { key: 'direct', label: 'Direct', color: 8 },
              ]}
              height={240}
              hideYAxis
              showLegend={false}
            />
            <DonutChart
              title="Users by channel"
              hideTitle
              data={[
                { label: 'Organic', value: 38 },
                { label: 'Direct', value: 24 },
                { label: 'Referral', value: 18 },
                { label: 'Social', value: 12 },
                { label: 'Other', value: 8, color: 8 },
              ]}
              formatValue={(v) => `${v}%`}
              size={190}
              thickness={0.2}
            />
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
