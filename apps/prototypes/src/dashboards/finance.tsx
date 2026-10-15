import { useState } from 'react';
import {
  AreaChart,
  Avatar,
  Badge,
  BarChart,
  Button,
  ButtonGroup,
  DateRangePicker,
  FeaturedIcon,
  FileUpload,
  IconButton,
  InputField,
  LineChart,
  PageHeader,
  Progress,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableCard,
  Tabs,
  Textarea,
  datePresets,
  type BadgeColor,
  type TableColumn,
} from '@ds/react';
import {
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Filter,
  Home,
  MessagesSquare,
  Mic,
  Paperclip,
  Pencil,
  PiggyBank,
  Plane,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShoppingCart,
  Tv,
  UtensilsCrossed,
} from 'lucide-react';
import {
  avatars,
  balance,
  deposits,
  designers,
  fans,
  members,
  profileViews,
  receipts,
  spending,
  threeYears,
  transactions,
} from '../dashboard-data';
import { AppShell } from '../shell/AppShell';
import {
  BankCard,
  BigFigure,
  More,
  Panel,
  Periods,
  RankedList,
  Rings,
  TransactionsTable,
  Trend,
} from './kit';

const usd = (v: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(v);
const money = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);
const balanceBars = threeYears.map((m, i) => ({
  month: m.month,
  a: 30 + (i % 5) * 6,
  b: 22 + (i % 3) * 7,
  c: 18 + ((i * 7) % 16),
}));

const budgetsList = [
  { label: 'Subscriptions', left: 25, used: 75, icon: <Tv />, tone: 'blue' as const },
  {
    label: 'Food and dining',
    left: 120,
    used: 70,
    icon: <UtensilsCrossed />,
    tone: 'pink' as const,
  },
  { label: 'Groceries', left: 200, used: 60, icon: <ShoppingCart />, tone: 'indigo' as const },
];

const CardsRail = ({ tabs = false }: { tabs?: boolean }) => (
  <>
    <div className="dash-profile">
      <div className="dash-profile__cover" aria-hidden="true" />
      <Avatar
        name="Olivia Rhye"
        src={avatars[1]}
        size="xlarge"
        verified
        className="dash-profile__avatar"
      />
      <strong className="dash-h2">
        Olivia Rhye{' '}
        <Badge tone="primary" shape="modern" size="small" withDot>
          Premium
        </Badge>
      </strong>
      <span className="muted">olivia@panda.io</span>
    </div>
    <Panel
      title="My cards"
      actions={
        <Button appearance="text" size="small" iconStart={<Plus />}>
          Add card
        </Button>
      }
      className="kit-panel--plain"
    >
      <div className="kit-cards">
        <BankCard tone="light" />
        <BankCard tone="dark" number="5678" />
      </div>
      <Progress
        label="Spent this month"
        value={1240.4}
        max={2000}
        showValue
        formatValue={(v) => money(v)}
      />
    </Panel>
    {tabs ? null : (
      <Panel title="My budgets" menu className="kit-panel--plain">
        <ul className="kit-list" aria-label="Budgets">
          {budgetsList.map((b) => (
            <li key={b.label} className="dash-budget">
              <FeaturedIcon icon={b.icon} tone={b.tone} size="small" />
              <Progress
                label={b.label}
                value={b.used}
                showValue
                formatValue={() => `$${b.left} left`}
                size="small"
              />
            </li>
          ))}
        </ul>
      </Panel>
    )}
  </>
);

/** 12 · Personal finance: balance over time, transactions, a profile with cards and budgets. */
export function Dashboard12() {
  return (
    <AppShell current="12" slim rail={<CardsRail />}>
      <div className="dash">
        <div className="dash-toolbar">
          <BigFigure label="Your balance" value="$40,206.20" />
          <span className="dash-toolbar__end">
            <Periods options={['Personal', 'Business', 'Credit']} label="Account" />
          </span>
        </div>
        <AreaChart
          title="Balance and spending over the year"
          hideTitle
          data={balance}
          xKey="month"
          series={[
            { key: 'income', label: 'Balance' },
            { key: 'spending', label: 'Spending', color: 7 },
          ]}
          formatValue={usd}
          height={240}
          hideYAxis
        />
        <TransactionsTable
          actions={
            <>
              <DateRangePicker
                label="Transaction dates"
                size="small"
                presets={datePresets()}
                placeholder="Select dates"
              />
              <Button variant="secondary" appearance="outline" size="small" iconStart={<Filter />}>
                Apply filter
              </Button>
            </>
          }
        />
      </div>
    </AppShell>
  );
}

/** 13 · Banking: two accounts with rings, balance bars, cards with spending, recent deposits. */
export function Dashboard13() {
  return (
    <AppShell current="13" promo="upgrade">
      <div className="dash">
        <PageHeader
          title="Banking dashboard"
          description="Welcome back, Olivia!"
          actions={
            <>
              <Button variant="secondary" appearance="outline" iconStart={<DollarSign />}>
                Deposit
              </Button>
              <Button iconStart={<Send />}>Send funds</Button>
            </>
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
        <section className="dash-grid dash-grid--2" aria-label="Accounts">
          {[
            { name: 'Primary account', value: '$40,206.20', change: '3.4%', rings: [72, 54, 38] },
            { name: 'Secondary account', value: '$6,421.10', change: '2.0%', rings: [48, 30, 22] },
          ].map((a) => (
            <Panel key={a.name} menu title={a.name}>
              <div className="dash-account">
                <Rings label={`${a.name} balance split`} values={a.rings} center="" />
                <BigFigure
                  label="Current balance"
                  value={a.value}
                  trend={<Trend value={a.change} />}
                />
              </div>
            </Panel>
          ))}
        </section>
        <div className="dash-grid dash-grid--2-1">
          <div className="dash-stack">
            <Panel title="Balance over time" menu>
              <BarChart
                title="Balance by month"
                hideTitle
                stacked
                data={balanceBars}
                xKey="month"
                series={[
                  { key: 'a', label: 'Savings' },
                  { key: 'b', label: 'Checking', color: 7 },
                  { key: 'c', label: 'Credit', color: 8 },
                ]}
                height={220}
                hideYAxis
              />
            </Panel>
            <Panel
              title="Your cards"
              menu
              footer={
                <Button variant="secondary" appearance="outline" size="small">
                  Manage cards
                </Button>
              }
            >
              <div className="dash-grid dash-grid--3">
                {[
                  { tone: 'brand' as const, spent: 2840.4 },
                  { tone: 'dark' as const, spent: 1260.2 },
                ].map((c, i) => (
                  <div key={c.tone} className="dash-stack">
                    <BankCard tone={c.tone} number={i ? '5678' : '1234'} />
                    <Progress
                      label="Spending this month"
                      value={c.spent}
                      max={6000}
                      showValue
                      formatValue={(v) => money(v)}
                      size="small"
                    />
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          <Panel
            title="Recent deposits"
            menu
            footer={
              <Button appearance="text" size="small">
                Show more
              </Button>
            }
          >
            <ul className="kit-list" aria-label="Recent deposits">
              {deposits.map((d, i) => (
                <li key={i} className="kit-list__item">
                  <span className="kit-who">
                    <FeaturedIcon
                      icon={<CreditCard />}
                      appearance="modern"
                      size="small"
                      shape="square"
                    />
                    <span className="stack-text">
                      <strong className="text-sm">{d.from}</strong>
                      <span className="muted text-sm">{d.detail}</span>
                    </span>
                  </span>
                  <span className="kit-positive">+ {money(d.amount)}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

/** 14 · Card spending: a card stack with recent transactions, monthly spending rings, balance and spending charts. */
export function Dashboard14() {
  return (
    <AppShell current="14" slim>
      <div className="dash">
        <PageHeader
          title="Your cards"
          description="Welcome back, Olivia!"
          divider
          actions={
            <>
              <Button variant="secondary" appearance="outline" iconStart={<RefreshCw />}>
                Sync accounts
              </Button>
              <Button iconStart={<Plus />}>Add card</Button>
            </>
          }
        />
        <div className="dash-grid dash-grid--1-2">
          <div className="dash-stack">
            <div className="kit-card-stack">
              <BankCard tone="brand" />
              <BankCard tone="light" number="5678" />
            </div>
            <Panel
              title="Recent transactions"
              menu
              className="kit-panel--plain"
              footer={
                <Button appearance="text" size="small">
                  View all transactions
                </Button>
              }
            >
              <ul className="kit-list" aria-label="Recent transactions">
                {transactions.map((t) => (
                  <li key={t.id} className="kit-list__item">
                    <span className="stack-text">
                      <strong className="text-sm">{t.name}</strong>
                      <span
                        className={t.amount > 0 ? 'kit-positive text-sm' : 'muted text-sm'}
                      >{`${t.amount > 0 ? '+' : '−'} ${money(Math.abs(t.amount))}`}</span>
                    </span>
                    <span className="kit-list__value">{t.date}</span>
                    <IconButton
                      icon={<Pencil />}
                      label={`Edit ${t.name}`}
                      variant="secondary"
                      appearance="ghost"
                      size="small"
                    />
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
          <div className="dash-stack">
            <Panel
              title="Monthly spending"
              className="kit-panel--plain"
              actions={<Periods options={['This month', 'Last month']} custom label="Month" />}
            >
              <div className="dash-spend">
                <Rings
                  label="Spending by category"
                  values={[82, 64, 40]}
                  caption="Total"
                  center="$2,280"
                />
                <dl className="kit-legend-figures">
                  {spending.map((s) => (
                    <div key={s.label}>
                      <dt>
                        <Badge tone={s.tone as BadgeColor} shape="modern" size="small" withDot>
                          {s.label}
                        </Badge>
                      </dt>
                      <dd>{money(s.value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Panel>
            <Panel
              title="Balance over time"
              className="kit-panel--plain"
              actions={<Periods options={['12 months', '30 days', '7 days']} />}
            >
              <LineChart
                title="Balance of three accounts"
                hideTitle
                data={threeYears}
                xKey="month"
                series={[
                  { key: 'y2027', label: 'Primary' },
                  { key: 'y2026', label: 'Savings', color: 8 },
                  { key: 'y2025', label: 'Credit', color: 7 },
                ]}
                height={220}
                hideYAxis
              />
            </Panel>
            <Panel
              title="Spending over time"
              className="kit-panel--plain"
              actions={<Periods options={['12 months', '30 days', '7 days']} />}
            >
              <BarChart
                title="Spending by month"
                hideTitle
                stacked
                data={balanceBars}
                xKey="month"
                series={[
                  { key: 'a', label: 'Bills' },
                  { key: 'b', label: 'Living', color: 7 },
                  { key: 'c', label: 'Fun', color: 8 },
                ]}
                height={200}
                hideYAxis
              />
            </Panel>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

type Receipt = (typeof receipts)[number];
const receiptTone: Record<string, BadgeColor> = {
  Subscriptions: 'blue',
  Dining: 'pink',
  Groceries: 'indigo',
  Uncategorized: 'gray',
};

/** 15 · Card receipts: card overview tabs with balances, balance over time, receipts upload and list. */
export function Dashboard15() {
  const columns: TableColumn<Receipt>[] = [
    {
      key: 'merchant',
      header: 'Merchant',
      render: (r) => (
        <span className="kit-who">
          <FeaturedIcon icon={<FileText />} tone="danger" size="small" shape="square" />
          <span className="stack-text">
            <strong>{r.merchant}</strong>
            <span className="muted text-sm">{r.size}</span>
          </span>
        </span>
      ),
    },
    { key: 'amount', header: 'Amount', render: (r) => money(r.amount) },
    {
      key: 'category',
      header: 'Category',
      hint: 'Set automatically; change it with the pencil.',
      hideBelow: 'small',
      render: (r) => (
        <Badge tone={receiptTone[r.category]} shape="modern" size="small" withDot>
          {r.category}
        </Badge>
      ),
    },
    { key: 'card', header: 'Account', hideBelow: 'large' },
    {
      key: 'edit',
      header: <span className="visually-hidden">Edit</span>,
      width: 48,
      render: (r) => (
        <IconButton
          icon={<Pencil />}
          label={`Edit ${r.merchant}`}
          variant="secondary"
          appearance="ghost"
          size="small"
        />
      ),
    },
  ];
  return (
    <AppShell current="15">
      <div className="dash">
        <PageHeader
          title="Your cards"
          divider
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
        <div className="dash-grid dash-grid--1-2">
          <Panel
            title="Overview"
            description="Manage and track your card spending."
            className="kit-panel--plain"
            footer={
              <Button variant="secondary" appearance="outline" size="small">
                View full report
              </Button>
            }
          >
            <div className="kit-card-stack">
              <BankCard tone="light" holder="Lana Steiner" />
              <BankCard tone="brand" />
            </div>
            <Tabs appearance="line" defaultValue="overview">
              <TabList label="Card details">
                <Tab value="overview">Overview</Tab>
                <Tab value="budget">Budget</Tab>
                <Tab value="spending">Spending</Tab>
                <Tab value="rewards">Rewards</Tab>
              </TabList>
              <TabPanel value="overview">
                <dl className="kit-values">
                  <div>
                    <dt>Current balance</dt>
                    <dd>$1,440.40</dd>
                  </div>
                  <div>
                    <dt>Current limit</dt>
                    <dd>$15,000.00</dd>
                  </div>
                  <div>
                    <dt>Budget this month</dt>
                    <dd>$2,400.00</dd>
                  </div>
                </dl>
              </TabPanel>
              <TabPanel value="budget">$960 of $2,400 left this month.</TabPanel>
              <TabPanel value="spending">Most spending goes to dining and subscriptions.</TabPanel>
              <TabPanel value="rewards">1,240 points, worth $12.40.</TabPanel>
            </Tabs>
            <BarChart
              title="Balances over time"
              stacked
              data={balanceBars}
              xKey="month"
              series={[
                { key: 'a', label: 'Debit' },
                { key: 'b', label: 'Credit', color: 7 },
                { key: 'c', label: 'Other', color: 8 },
              ]}
              height={200}
              hideYAxis
              showLegend={false}
            />
          </Panel>
          <div className="dash-stack">
            <Panel
              title="Balance over time"
              description="Compare spending over time."
              menu
              className="kit-panel--plain"
              actions={<Periods options={['12 months', '30 days', '7 days']} />}
            >
              <AreaChart
                title="Card balance by month"
                hideTitle
                data={balance}
                xKey="month"
                series={[{ key: 'income', label: 'Balance' }]}
                formatValue={usd}
                height={220}
                hideYAxis
              />
            </Panel>
            <TableCard
              title="Receipts"
              titleAs="h2"
              actions={
                <>
                  <Button
                    variant="secondary"
                    appearance="outline"
                    size="small"
                    iconStart={<Download />}
                  >
                    Export
                  </Button>
                  <Button size="small" iconStart={<Plus />}>
                    Add
                  </Button>
                </>
              }
              toolbar={
                <FileUpload
                  id="receipts-upload"
                  hint="SVG, PNG, JPG or PDF (max. 10 MB)"
                  multiple
                />
              }
              footer={
                <Button variant="secondary" appearance="outline" size="small">
                  View full report
                </Button>
              }
            >
              <Table<Receipt>
                caption="Receipts"
                hideCaption
                columns={columns}
                rows={receipts}
                getRowId={(r) => r.merchant}
              />
            </TableCard>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/** 16 · Savings goals: total balance, goals with progress, transactions; cards and balances in the rail. */
export function Dashboard16() {
  const [filter, setFilter] = useState('all');
  const goals = [
    { label: 'Home deposit', value: '$64,240.60', progress: 57, icon: <Home /> },
    { label: 'Holiday', value: '$2,220.42', progress: 57, icon: <Plane /> },
    { label: 'Savings', value: '$41,382.80', progress: 57, icon: <PiggyBank /> },
  ];
  return (
    <AppShell
      current="16"
      slim
      rail={
        <>
          <Panel title="Your cards" menu className="kit-panel--plain">
            <div className="dash-card-hero">
              <BankCard tone="light" />
              <Progress
                label="This month"
                value={1240.4}
                max={2000}
                showValue
                formatValue={(v) => money(v)}
              />
            </div>
            <Tabs appearance="line" defaultValue="overview">
              <TabList label="Card details">
                <Tab value="overview">Overview</Tab>
                <Tab value="budget">Budget</Tab>
                <Tab value="spending">Spending</Tab>
              </TabList>
              <TabPanel value="overview">
                <dl className="kit-values">
                  <div>
                    <dt>Current balance</dt>
                    <dd>$1,240.40</dd>
                  </div>
                  <div>
                    <dt>Current limit</dt>
                    <dd>$15,000.00</dd>
                  </div>
                  <div>
                    <dt>Budget this month</dt>
                    <dd>$2,400.00</dd>
                  </div>
                </dl>
              </TabPanel>
              <TabPanel value="budget">$1,160 left this month.</TabPanel>
              <TabPanel value="spending">Groceries are up 12% this month.</TabPanel>
            </Tabs>
          </Panel>
          <Panel title="Balance over time" menu className="kit-panel--plain">
            <Periods options={['12 months', '30 days', '7 days']} />
            <BarChart
              title="Balance by month"
              hideTitle
              stacked
              data={balanceBars}
              xKey="month"
              series={[
                { key: 'a', label: 'Savings' },
                { key: 'b', label: 'Checking', color: 7 },
                { key: 'c', label: 'Credit', color: 8 },
              ]}
              height={200}
              hideYAxis
              showLegend={false}
            />
          </Panel>
        </>
      }
    >
      <div className="dash">
        <PageHeader
          title="Welcome back, Olivia"
          actions={
            <>
              <Button
                variant="secondary"
                appearance="outline"
                iconStart={<MessagesSquare />}
                href="#/app/messages"
              >
                Messages
              </Button>
              <Button iconStart={<RefreshCw />}>Sync</Button>
            </>
          }
        />
        <Panel
          title={
            <BigFigure label="Total balance" value="$107,843.82" trend={<Trend value="7.2%" />} />
          }
          actions={
            <Button variant="secondary" appearance="outline" size="small">
              View report
            </Button>
          }
        >
          <LineChart
            title="Total balance, this year and last"
            hideTitle
            data={balance}
            xKey="month"
            series={[
              { key: 'income', label: 'This year' },
              { key: 'spending', label: 'Last year', color: 7 },
            ]}
            formatValue={usd}
            height={220}
            hideYAxis
          />
        </Panel>
        <section className="dash-grid dash-grid--2" aria-label="Savings goals">
          {goals.map((g) => (
            <Panel key={g.label} className="dash-goal">
              <div className="dash-toolbar">
                <FeaturedIcon icon={g.icon} appearance="solid" size="small" shape="square" />
                <More label={`Options for ${g.label}`} />
              </div>
              <BigFigure label={g.label} value={g.value} />
              <Progress label={`${g.label} goal`} hideLabel value={g.progress} />
            </Panel>
          ))}
        </section>
        <TransactionsTable
          title="Recent transactions"
          actions={
            <>
              <Button
                variant="secondary"
                appearance="outline"
                size="small"
                iconStart={<Download />}
              >
                Download
              </Button>
              <Button variant="secondary" appearance="outline" size="small">
                View report
              </Button>
            </>
          }
          toolbar={
            <div className="dash-toolbar">
              <ButtonGroup
                aria-label="Transactions"
                attached
                value={filter}
                onValueChange={setFilter}
              >
                <Button value="all" variant="secondary" appearance="outline" size="small">
                  View all
                </Button>
                <Button value="monitored" variant="secondary" appearance="outline" size="small">
                  Monitored
                </Button>
                <Button value="unmonitored" variant="secondary" appearance="outline" size="small">
                  Unmonitored
                </Button>
              </ButtonGroup>
              <span className="dash-toolbar__end">
                <InputField
                  label="Search transactions"
                  hideLabel
                  size="small"
                  iconStart={<Search />}
                  shortcut="⌘K"
                  placeholder="Search"
                />
              </span>
            </div>
          }
        />
      </div>
    </AppShell>
  );
}

/** 19 · Creator stats: profile views, biggest fans, favorite designers and a chat in the rail. */
export function Dashboard19() {
  const [messages, setMessages] = useState([
    {
      me: true,
      text: 'Hey Olivia. We’re working on a dashboard prototype and love your work. Are you open to new projects?',
      time: 'Tuesday 4:32 am',
    },
    {
      me: false,
      text: 'Hey Anita, I have some capacity in a few weeks. Can you tell me more about the project?',
      time: 'Tuesday 12:32 pm',
    },
    {
      me: true,
      text: 'Great! We’ve drafted an outline here. Let me know if you have any questions!',
      time: 'Yesterday 8:32 pm',
    },
    {
      me: false,
      text: 'I’ll have a more thorough read and get back to you by tomorrow. Is that okay?',
      time: 'Yesterday 4:32 am',
    },
  ]);
  const [draft, setDraft] = useState('');
  return (
    <AppShell
      current="19"
      slim
      rail={
        <div className="dash-chat">
          <div className="dash-toolbar">
            <span className="stack-text">
              <strong>
                Anita Cruz{' '}
                <Badge tone="success" shape="modern" size="small" withDot>
                  Online
                </Badge>
              </strong>
              <span className="muted text-sm">Auckland, New Zealand</span>
            </span>
          </div>
          <ol className="dash-chat__thread" aria-label="Conversation with Anita Cruz">
            {messages.map((m, i) => (
              <li key={i} className={m.me ? 'dash-chat__msg dash-chat__msg--me' : 'dash-chat__msg'}>
                <span className="muted text-sm">
                  {m.me ? 'You' : 'Anita Cruz'} · {m.time}
                </span>
                <p className="dash-chat__bubble">{m.text}</p>
              </li>
            ))}
            <li className="dash-chat__msg">
              <span className="muted text-sm">Anita Cruz · Yesterday 12:32 am</span>
              <span className="dash-chat__bubble kit-who">
                <FeaturedIcon icon={<FileText />} tone="danger" size="small" shape="square" />
                <span className="stack-text">
                  <strong className="text-sm">Dashboard design brief.pdf</strong>
                  <span className="muted text-sm">800 KB</span>
                </span>
              </span>
            </li>
          </ol>
          <form
            className="dash-chat__composer"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              setMessages((list) => [...list, { me: false, text: draft.trim(), time: 'Just now' }]);
              setDraft('');
            }}
          >
            <Textarea
              label="Message Anita"
              hideLabel
              placeholder="Ask me anything…"
              rows={3}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className="dash-toolbar">
              <span className="row">
                <IconButton
                  icon={<Mic />}
                  label="Record a voice note"
                  variant="secondary"
                  appearance="ghost"
                  size="small"
                />
                <IconButton
                  icon={<Paperclip />}
                  label="Attach"
                  variant="secondary"
                  appearance="ghost"
                  size="small"
                />
              </span>
              <Button type="submit" size="small" iconEnd={<Send />}>
                Send
              </Button>
            </div>
          </form>
        </div>
      }
    >
      <div className="dash">
        <PageHeader
          title={`Stats for ${members[0].name}`}
          divider
          actions={
            <>
              <Button variant="secondary" appearance="outline" href="#/app/messages">
                Messages
              </Button>
              <Button>Edit</Button>
            </>
          }
        />
        <Panel
          title="Profile views"
          className="kit-panel--plain"
          actions={<Periods options={['12 months', '30 days', '7 days']} />}
        >
          <LineChart
            title="Profile views, likes and follows in July"
            hideTitle
            data={profileViews}
            xKey="day"
            series={[
              { key: 'views', label: 'Views' },
              { key: 'likes', label: 'Likes', color: 7 },
              { key: 'follows', label: 'Follows', color: 2 },
            ]}
            height={240}
            curved={false}
          />
        </Panel>
        <div className="dash-grid dash-grid--2">
          <Panel
            title="Biggest fans"
            menu
            className="kit-panel--plain"
            footer={
              <Button appearance="text" size="small">
                View all
              </Button>
            }
          >
            <RankedList label="Biggest fans" items={fans} />
          </Panel>
          <Panel
            title="Favorite designers"
            menu
            className="kit-panel--plain"
            footer={
              <Button appearance="text" size="small">
                View all
              </Button>
            }
          >
            <RankedList label="Favorite designers" items={designers} />
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
