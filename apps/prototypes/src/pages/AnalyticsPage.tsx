import { useState } from 'react';
import {
  BarChart,
  Badge,
  Button,
  ButtonGroup,
  DonutChart,
  LineChart,
  PageHeader,
  ProgressCircle,
  RadarChart,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableCard,
  Tabs,
  type TableColumn,
} from '@ds/react';
import { ArrowDownRight, ArrowUpRight, Users } from 'lucide-react';
import {
  acquisition,
  countries,
  periods,
  topPages,
  traffic,
  weekdayTraffic,
  type Period,
} from '../dashboard-data';
import { AdminShell } from '../shell/AdminShell';

const overview = [
  { key: 'users', label: 'Users', value: '8.8k', change: '7.4%', trend: 'up' as const },
  { key: 'sessions', label: 'Sessions', value: '10.2k', change: '7.4%', trend: 'up' as const },
  {
    key: 'bounce',
    label: 'Bounce rate',
    value: '46.2%',
    change: '0.2%',
    trend: 'down' as const,
    bad: true,
  },
  {
    key: 'duration',
    label: 'Session duration',
    value: '4m 4s',
    change: '10.8%',
    trend: 'up' as const,
  },
];

type PageRow = (typeof topPages)[number];
const pageColumns: TableColumn<PageRow>[] = [
  { key: 'path', header: 'Page' },
  {
    key: 'views',
    header: 'Views',
    align: 'end',
    sortable: true,
    render: (p) => p.views.toLocaleString('en-US'),
  },
  {
    key: 'change',
    header: 'Change',
    align: 'end',
    sortable: true,
    render: (p) => (
      <Badge
        tone={p.change >= 0 ? 'success' : 'danger'}
        size="small"
        iconStart={p.change >= 0 ? <ArrowUpRight /> : <ArrowDownRight />}
      >
        {`${Math.abs(p.change)}%`}
      </Badge>
    ),
  },
];

/** Website analytics: overview figures with a traffic chart, sources, acquisition, countries, pages. */
export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>('12m');
  const [metric, setMetric] = useState('users');

  return (
    <AdminShell
      current="analytics"
      trail={[{ label: 'Home', href: '#/admin' }, { label: 'Analytics' }]}
    >
      <div className="proto-page">
        <PageHeader
          title="Website analytics"
          description="Traffic, engagement and where your visitors come from."
          actions={
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
          }
        />

        <div className="proto-grid-2-1">
          {/* Overview: each figure is a tab that switches the chart */}
          <section className="proto-card" aria-labelledby="overview-title">
            <PageHeader
              size="small"
              titleAs="h2"
              title={<span id="overview-title">Overview</span>}
            />
            <Tabs
              appearance="line"
              value={metric}
              onValueChange={setMetric}
              className="proto-metric-tabs"
            >
              <TabList label="Overview figures">
                {overview.map((o) => (
                  <Tab key={o.key} value={o.key}>
                    <span className="proto-metric-tab">
                      <span className="proto-muted">{o.label}</span>
                      <span className="proto-metric-tab__value">
                        {o.value}
                        <Badge
                          tone={o.bad ? 'danger' : 'success'}
                          size="small"
                          iconStart={o.trend === 'up' ? <ArrowUpRight /> : <ArrowDownRight />}
                        >
                          {o.change}
                        </Badge>
                      </span>
                    </span>
                  </Tab>
                ))}
              </TabList>
              {overview.map((o) => (
                <TabPanel key={o.key} value={o.key}>
                  <LineChart
                    title={`${o.label} and sessions over time`}
                    hideTitle
                    data={traffic}
                    xKey="week"
                    series={[
                      { key: 'users', label: 'Users' },
                      { key: 'sessions', label: 'Sessions', color: 8 },
                    ]}
                    height={260}
                  />
                </TabPanel>
              ))}
            </Tabs>
          </section>

          <section className="proto-card" aria-labelledby="sources-title">
            <PageHeader
              size="small"
              titleAs="h2"
              title={<span id="sources-title">Traffic by weekday</span>}
            />
            <RadarChart
              title="Visits by device and weekday"
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
          </section>
        </div>

        <div className="proto-grid-2-1">
          <section className="proto-card" aria-labelledby="acquire-title">
            <PageHeader
              size="small"
              titleAs="h2"
              title={<span id="acquire-title">How do you acquire users?</span>}
            />
            <BarChart
              title="New users by channel and month"
              hideTitle
              stacked
              data={acquisition}
              xKey="month"
              series={[
                { key: 'organic', label: 'Organic search' },
                { key: 'direct', label: 'Direct', color: 2 },
                { key: 'referral', label: 'Referral', color: 7 },
              ]}
              height={260}
            />
          </section>

          <section className="proto-card" aria-labelledby="country-title">
            <PageHeader
              size="small"
              titleAs="h2"
              title={<span id="country-title">Sessions by country</span>}
            />
            <DonutChart
              title="Share of sessions by country"
              hideTitle
              data={countries}
              formatValue={(v) => `${v}%`}
              thickness={1}
              size={200}
            />
          </section>
        </div>

        <div className="proto-grid-2-1">
          <TableCard title="Top pages" titleAs="h2" description="Most viewed pages in the period.">
            <Table<PageRow>
              caption="Top pages"
              hideCaption
              columns={pageColumns}
              rows={topPages}
              getRowId={(p) => p.path}
            />
          </TableCard>
          <section className="proto-card" aria-labelledby="realtime-title">
            <PageHeader
              size="small"
              titleAs="h2"
              title={<span id="realtime-title">Right now</span>}
            />
            <div className="proto-center">
              <ProgressCircle
                label="Active users against the daily peak"
                value={64}
                caption="of peak"
                size="large"
                shape="half"
              />
              <Badge tone="success" shape="modern" withDot iconStart={<Users />}>
                316 active users
              </Badge>
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
