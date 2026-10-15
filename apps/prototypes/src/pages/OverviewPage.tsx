import { useState } from 'react';
import {
  ActivityFeed,
  AreaChart,
  Avatar,
  AvatarGroup,
  AvatarLabelGroup,
  Badge,
  BadgeGroup,
  Button,
  ButtonGroup,
  DateRangePicker,
  DonutChart,
  FeaturedIcon,
  IconButton,
  Link,
  MetricCard,
  PageHeader,
  Progress,
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
  ArrowRight,
  CalendarClock,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  MoreVertical,
  Plus,
  Repeat,
  UserMinus,
  Users,
} from 'lucide-react';
import {
  avatars,
  invoiceOrders,
  meetings,
  members,
  periods,
  planMix,
  projects,
  revenueByMonth,
  type Period,
} from '../dashboard-data';
import { AppShell } from '../shell/AppShell';
import './overview.css';

const usd = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(v);

const kpis = [
  {
    label: 'Revenue',
    value: '$48,290',
    change: '12.4%',
    trend: 'up' as const,
    icon: <DollarSign />,
    spark: [31, 34, 33, 38, 40, 39, 44, 48],
  },
  {
    label: 'Subscribers',
    value: '2,671',
    change: '6.6%',
    trend: 'up' as const,
    icon: <Users />,
    spark: [21, 22, 22, 24, 25, 25, 26, 27],
  },
  {
    label: 'MRR',
    value: '$18,880',
    change: '7.4%',
    trend: 'up' as const,
    icon: <Repeat />,
    spark: [14, 15, 15, 16, 17, 17, 18, 19],
  },
  {
    label: 'Churn',
    value: '1.9%',
    change: '0.3%',
    trend: 'down' as const,
    positive: true,
    icon: <UserMinus />,
    spark: [2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2, 1.9],
  },
];

type Invoice = (typeof invoiceOrders)[number];
const invoiceTone = {
  Paid: 'success',
  Refunded: 'gray',
  Cancelled: 'danger',
  Pending: 'warning',
} as const;
const invoiceColumns: TableColumn<Invoice>[] = [
  {
    key: 'customer',
    header: 'Customer',
    render: (o) => (
      <AvatarLabelGroup
        name={o.customer.name}
        src={o.customer.src}
        supportingText={o.id}
        size="small"
      />
    ),
  },
  { key: 'date', header: 'Date', hideBelow: 'medium' },
  {
    key: 'status',
    header: 'Status',
    render: (o) => (
      <Badge tone={invoiceTone[o.status]} shape="modern" size="small" withDot>
        {o.status}
      </Badge>
    ),
  },
  {
    key: 'amount',
    header: 'Amount',
    align: 'end',
    render: (o) => `$${o.amount.toLocaleString('en-US')}`,
  },
];

/** Overview: KPIs, revenue, goal and plan mix, transactions, activity, projects and meetings. */
export default function OverviewPage() {
  const toast = useToast();
  const [period, setPeriod] = useState<Period>('12m');
  const [range, setRange] = useState<DateRange>(() => datePresets()[5].range);
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <AppShell current="overview">
      <div className="page">
        <PageHeader
          leading={<Avatar name={members[0].name} src={members[0].src} size="large" decorative />}
          title="Welcome back, Olivia"
          description={today}
          actions={
            <>
              <DateRangePicker
                label="Report period"
                presets={datePresets()}
                value={range}
                onValueChange={setRange}
              />
              <Button iconStart={<Plus />} href="#/app/projects">
                New project
              </Button>
            </>
          }
        >
          <div className="row row--between">
            <ButtonGroup
              className="scroll-x"
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
            <BadgeGroup badge="New" href="#/app/analytics">
              Real-time analytics are here
            </BadgeGroup>
          </div>
        </PageHeader>

        {/* KPI row */}
        <section className="grid-kpi" aria-label="Key figures">
          {kpis.map((k) => (
            <MetricCard
              key={k.label}
              label={k.label}
              value={k.value}
              change={k.change}
              trend={k.trend}
              positive={k.positive}
              comparison="vs last month"
              icon={k.icon}
              chart={
                <Sparkline
                  data={k.spark}
                  tone={(k.positive ?? k.trend === 'up') ? 'positive' : 'negative'}
                />
              }
            />
          ))}
        </section>

        <div className="bento">
          {/* Revenue */}
          <section className="panel span-8" aria-labelledby="revenue-title">
            <div className="row row--between">
              <div className="stack-text">
                <h2 className="overview__title" id="revenue-title">
                  Revenue
                </h2>
                <span className="overview__big">$482,190</span>
                <span className="text-sm muted">
                  <Badge tone="success" size="small" shape="modern" withDot>
                    +18.2%
                  </Badge>{' '}
                  vs last year
                </span>
              </div>
              <Button
                variant="secondary"
                appearance="outline"
                size="small"
                iconStart={<Download />}
                onClick={() => toast({ title: 'Revenue report exported', tone: 'success' })}
              >
                Export
              </Button>
            </div>
            <AreaChart
              title="Revenue and expenses by month"
              hideTitle
              data={revenueByMonth}
              xKey="month"
              series={[
                { key: 'revenue', label: 'Revenue' },
                { key: 'expenses', label: 'Expenses', color: 8 },
              ]}
              formatValue={usd}
              height={280}
            />
          </section>

          {/* Goal and plans */}
          <div className="stack span-4">
            <section className="panel" aria-labelledby="goal-title">
              <div className="row row--between">
                <h2 className="overview__title" id="goal-title">
                  Quarterly goal
                </h2>
                <IconButton
                  icon={<MoreVertical />}
                  label="Goal options"
                  variant="secondary"
                  appearance="ghost"
                  size="small"
                />
              </div>
              <div className="overview__center">
                <ProgressCircle
                  label="Quarterly revenue goal"
                  hideLabel
                  value={78}
                  shape="half"
                  size="large"
                  caption="of $600K"
                />
                <span className="text-sm muted">$132K to go · 46 days left</span>
              </div>
            </section>
            <section className="panel" aria-labelledby="plans-title">
              <h2 className="overview__title" id="plans-title">
                Plan mix
              </h2>
              <DonutChart
                title="Subscribers by plan"
                hideTitle
                data={planMix}
                formatValue={(v) => `${v}%`}
                centerValue="2,671"
                centerLabel="Subscribers"
                size={170}
              />
            </section>
          </div>

          {/* Transactions */}
          <div className="span-8">
            <TableCard
              title="Recent transactions"
              titleAs="h2"
              description="Payments from the last 7 days."
              actions={
                <Button
                  variant="secondary"
                  appearance="outline"
                  size="small"
                  href="#/app/orders"
                  iconEnd={<ArrowRight />}
                >
                  All orders
                </Button>
              }
            >
              <Table<Invoice>
                caption="Recent transactions"
                hideCaption
                columns={invoiceColumns}
                rows={invoiceOrders.slice(0, 6)}
              />
            </TableCard>
          </div>

          {/* Activity */}
          <section className="panel span-4" aria-labelledby="activity-title">
            <div className="row row--between">
              <h2 className="overview__title" id="activity-title">
                Activity
              </h2>
              <Button appearance="text" size="small" href="#/app/messages">
                View all
              </Button>
            </div>
            <ActivityFeed
              aria-labelledby="activity-title"
              items={[
                {
                  id: 1,
                  avatar: { name: 'Phoenix Baker', src: avatars[0] },
                  title: (
                    <>
                      <strong>Phoenix Baker</strong> added a file to <strong>Marketing site</strong>
                    </>
                  ),
                  time: 'Just now',
                  content: (
                    <span className="row text-sm">
                      <FileText aria-hidden="true" size={16} /> Tech requirements.pdf · 720 KB
                    </span>
                  ),
                  unread: true,
                },
                {
                  id: 2,
                  icon: <CreditCard />,
                  iconTone: 'success',
                  title: (
                    <>
                      <strong>Warpspeed</strong> upgraded to Business
                    </>
                  ),
                  time: '12 min ago',
                },
                {
                  id: 3,
                  avatar: { name: 'Candice Wu' },
                  title: (
                    <>
                      <strong>Candice Wu</strong> commented on <strong>Mobile app v2</strong>
                    </>
                  ),
                  time: '3 hours ago',
                  content: '“Can we ship the onboarding first?”',
                },
                {
                  id: 4,
                  icon: <CalendarClock />,
                  iconTone: 'orange',
                  title: (
                    <>
                      Invoice <strong>INV-3059</strong> is overdue
                    </>
                  ),
                  time: 'Yesterday',
                },
              ]}
            />
          </section>

          {/* Projects */}
          <section className="panel span-8" aria-labelledby="projects-title">
            <div className="row row--between">
              <h2 className="overview__title" id="projects-title">
                Projects in progress
              </h2>
              <Button appearance="text" size="small" href="#/app/projects">
                View all
              </Button>
            </div>
            <ul className="overview__projects">
              {projects.map((p) => (
                <li key={p.id} className="overview__project">
                  <div className="row row--between">
                    <Link
                      appearance="standalone"
                      variant="secondary"
                      className="overview__project-name"
                      href="#/app/projects"
                    >
                      {p.name}
                    </Link>
                    <Badge tone={p.tone} size="small" shape="modern" withDot>
                      {p.status}
                    </Badge>
                  </div>
                  <span className="text-sm muted">
                    {p.client} · Due {p.due}
                  </span>
                  <Progress
                    label={`${p.name} progress`}
                    hideLabel
                    value={p.progress}
                    showValue
                    valuePosition="end"
                    size="small"
                    tone={
                      p.tone === 'danger' ? 'danger' : p.tone === 'warning' ? 'warning' : 'primary'
                    }
                  />
                  <AvatarGroup label={`${p.name} team`} max={4} size="xsmall">
                    {p.team.map((i) => (
                      <Avatar key={i} name={members[i].name} src={members[i].src} />
                    ))}
                  </AvatarGroup>
                </li>
              ))}
            </ul>
          </section>

          {/* Meetings */}
          <section className="panel span-4" aria-labelledby="meetings-title">
            <div className="row row--between">
              <h2 className="overview__title" id="meetings-title">
                Upcoming
              </h2>
              <Button appearance="text" size="small" href="#/app/calendar">
                Calendar
              </Button>
            </div>
            <ul className="list-reset">
              {meetings.map((m) => (
                <li key={m.id} className="overview__meeting">
                  <FeaturedIcon
                    icon={<CalendarClock />}
                    tone={m.tone}
                    size="small"
                    shape="square"
                  />
                  <span className="stack-text">
                    <strong className="text-sm">{m.title}</strong>
                    <span className="text-sm muted">
                      {m.day} · {m.time} · {m.who}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
