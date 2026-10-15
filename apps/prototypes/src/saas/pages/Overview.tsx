import { useState } from 'react';
import {
  ActivityFeed,
  AreaChart,
  Badge,
  BarChart,
  Button,
  ButtonGroup,
  Link,
  LineChart,
  MetricCard,
  Progress,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableCard,
  Tabs,
  AvatarLabelGroup,
  type TableColumn,
} from '@ds/react';
import { DollarSign, Filter, HeartHandshake, Megaphone, Users } from 'lucide-react';
import { More, Panel, Trend } from '../../dashboards/kit';
import {
  activities,
  churn,
  funnel,
  productPerformance,
  recentInvoices,
  saasKpis,
  userGrowth,
  type Range,
} from '../data';
import { Page, to } from '../Shell';

type Invoice = (typeof recentInvoices)[number];

const statusTone = { Complete: 'success', Pending: 'warning', Cancelled: 'danger' } as const;

const invoiceColumns: TableColumn<Invoice>[] = [
  { key: 'id', header: 'Serial no.' },
  { key: 'closed', header: 'Close date', hideBelow: 'medium' },
  {
    key: 'person',
    header: 'User',
    render: (i) => <AvatarLabelGroup name={i.person.name} src={i.person.src} size="small" />,
  },
  { key: 'amount', header: 'Amount', align: 'end' },
  {
    key: 'status',
    header: 'Status',
    render: (i) => (
      <Badge tone={statusTone[i.status]} shape="modern" size="small" withDot>
        {i.status}
      </Badge>
    ),
  },
];

const kpiIcons = [
  <DollarSign key="r" />,
  <Users key="u" />,
  <HeartHandshake key="l" />,
  <Megaphone key="c" />,
];

/** The SaaS overview: Orbit's home page. */
export default function Overview() {
  const [range, setRange] = useState<Range>('monthly');
  const top = funnel[0].count;

  return (
    <Page
      path=""
      title="SaaS overview"
      description="Revenue, users and retention across your subscription business."
      actions={
        <>
          <ButtonGroup
            aria-label="Range"
            attached
            value={range}
            onValueChange={(v) => setRange(v as Range)}
          >
            <Button value="weekly" variant="secondary" appearance="outline" size="small">
              Weekly
            </Button>
            <Button value="monthly" variant="secondary" appearance="outline" size="small">
              Monthly
            </Button>
            <Button value="yearly" variant="secondary" appearance="outline" size="small">
              Yearly
            </Button>
          </ButtonGroup>
          <Button variant="secondary" appearance="outline" size="small" iconStart={<Filter />}>
            Filter
          </Button>
        </>
      }
    >
      <section className="orbit-grid" aria-label="Key figures">
        {saasKpis[range].map((k, i) => (
          <MetricCard
            key={k.label}
            label={k.label}
            value={k.value}
            change={k.change}
            trend={k.up ? 'up' : 'down'}
            positive={k.good}
            comparison="vs last period"
            icon={kpiIcons[i]}
            actions={<More label={`Options for ${k.label}`} />}
          />
        ))}
      </section>

      <div className="orbit-row orbit-row--1-2">
        <Panel
          title="Churn rate"
          description="Share of subscribers who cancelled."
          menu
          footer={<Link href={to('/pages/pricing')}>Downgrade options: Free plan</Link>}
        >
          <div className="orbit-figure">
            <span className="orbit-figure__value">
              4.26% <Trend value="0.31%" up={false} good />
            </span>
            <span className="muted text-sm">vs last week</span>
          </div>
          <LineChart
            title="Monthly churn rate"
            hideTitle
            data={churn}
            xKey="month"
            series={[{ key: 'churn', label: 'Churn', color: 5 }]}
            formatValue={(v) => `${v}%`}
            height={150}
            hideYAxis
          />
        </Panel>
        <Panel
          title="User growth"
          description="New signups from the website and mobile."
          menu
          actions={<Trend value="3.85%" />}
        >
          <div className="orbit-figure">
            <span className="orbit-figure__value">3,768</span>
            <span className="muted text-sm">new users this week</span>
          </div>
          <AreaChart
            title="New signups by month and source"
            hideTitle
            stacked
            data={userGrowth}
            xKey="month"
            series={[
              { key: 'web', label: 'Website' },
              { key: 'mobile', label: 'Mobile', color: 3 },
            ]}
            height={220}
          />
        </Panel>
      </div>

      <div className="orbit-row orbit-row--1-2">
        <Panel
          title="Conversion funnel"
          description="From first visit to renewal, last 30 days."
          menu
        >
          <ol className="orbit-funnel">
            {funnel.map((f) => (
              <li key={f.stage}>
                <Progress
                  label={f.stage}
                  value={f.count}
                  max={top}
                  showValue
                  formatValue={(v) =>
                    `${v.toLocaleString('en-US')} · ${Math.round((v / top) * 1000) / 10}%`
                  }
                />
              </li>
            ))}
          </ol>
        </Panel>
        <TableCard
          title="Recent invoices"
          titleAs="h2"
          badge={`${recentInvoices.length} invoices`}
          actions={
            <Button
              variant="secondary"
              appearance="outline"
              size="small"
              href={to('/commerce/invoices')}
            >
              See all
            </Button>
          }
        >
          <Table<Invoice>
            caption="Recent invoices"
            hideCaption
            columns={invoiceColumns}
            rows={recentInvoices}
            getRowId={(i) => i.id}
          />
        </TableCard>
      </div>

      <div className="orbit-row">
        <Panel title="Product performance" menu>
          <Tabs appearance="segmented" defaultValue="daily">
            <TabList label="Performance view" className="scroll-x">
              {Object.entries(productPerformance).map(([key, v]) => (
                <Tab key={key} value={key}>
                  {v.label}
                </Tab>
              ))}
            </TabList>
            {Object.entries(productPerformance).map(([key, v]) => (
              <TabPanel key={key} value={key}>
                <div className="orbit-figures">
                  {v.figures.map((f) => (
                    <div key={f.label} className="orbit-figure">
                      <span className="muted text-sm">{f.label}</span>
                      <span className="orbit-figure__value">{f.value}</span>
                    </div>
                  ))}
                  <div className="orbit-figure">
                    <span className="muted text-sm">{v.total.label}</span>
                    <span className="orbit-figure__value">
                      {v.total.value} <Trend value={v.total.change} />
                    </span>
                  </div>
                </div>
                <BarChart
                  title={`${v.label} by day`}
                  hideTitle
                  data={v.bars}
                  xKey="day"
                  series={[
                    { key: 'digital', label: v.figures[0].label },
                    { key: 'physical', label: v.figures[1].label, color: 3 },
                  ]}
                  height={220}
                />
              </TabPanel>
            ))}
          </Tabs>
        </Panel>
        <Panel title="Activities" menu>
          <ActivityFeed
            aria-label="Recent account activity"
            items={activities.map((a, i) => ({
              id: i,
              avatar: { name: a.who.name, src: a.who.src },
              title: (
                <>
                  <strong>{a.who.name}</strong> {a.action} <strong>{a.ref}</strong>
                </>
              ),
              time: a.time,
            }))}
          />
        </Panel>
      </div>
    </Page>
  );
}
