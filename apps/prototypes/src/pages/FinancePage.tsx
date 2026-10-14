import { useState } from 'react';
import {
  AreaChart,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  DateRangePicker,
  FeaturedIcon,
  IconButton,
  MetricCard,
  PageHeader,
  Pagination,
  Progress,
  Table,
  TableCard,
  datePresets,
  type TableColumn,
} from '@ds/react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Filter,
  Pencil,
  PiggyBank,
  Plus,
  Wallet,
} from 'lucide-react';
import { balance, budgets, categoryTone, transactions } from '../dashboard-data';
import { AdminShell } from '../shell/AdminShell';

type Transaction = (typeof transactions)[number];
const money = (v: number) =>
  `${v < 0 ? '−' : '+'} ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(v))}`;

const columns: TableColumn<Transaction>[] = [
  {
    key: 'name',
    header: 'Transaction',
    render: (t) => (
      <span className="proto-company">
        <Avatar name={t.name} size="small" decorative />
        <strong>{t.name}</strong>
      </span>
    ),
  },
  {
    key: 'amount',
    header: 'Amount',
    align: 'end',
    sortable: true,
    render: (t) => (
      <span className={t.amount > 0 ? 'proto-positive' : undefined}>{money(t.amount)}</span>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    hideBelow: 'medium',
    render: (t) => (
      <Badge tone={categoryTone[t.category]} shape="modern" size="small" withDot>
        {t.category}
      </Badge>
    ),
  },
  { key: 'account', header: 'Account', hideBelow: 'large' },
  { key: 'date', header: 'Date', hideBelow: 'small' },
  {
    key: 'edit',
    header: <span className="proto-visually-hidden">Edit</span>,
    width: 48,
    render: (t) => (
      <IconButton
        icon={<Pencil />}
        label={`Edit ${t.name}`}
        variant="secondary"
        appearance="ghost"
        size="small"
      />
    ),
  },
];

/** Finance: balance over time, income and spending, transactions, cards and budgets. */
export default function FinancePage() {
  const [account, setAccount] = useState('personal');
  const [page, setPage] = useState(1);
  const usd = (v: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
    }).format(v);

  return (
    <AdminShell
      current="finance"
      trail={[{ label: 'Home', href: '#/admin' }, { label: 'Finance' }]}
    >
      <div className="proto-page">
        <PageHeader
          title="Finance"
          description="Balance, spending and budgets across your accounts."
          actions={
            <ButtonGroup
              className="proto-scroll-x"
              aria-label="Account"
              attached
              value={account}
              onValueChange={setAccount}
            >
              <Button value="personal" variant="secondary" appearance="outline" size="small">
                Personal
              </Button>
              <Button value="business" variant="secondary" appearance="outline" size="small">
                Business
              </Button>
              <Button value="credit" variant="secondary" appearance="outline" size="small">
                Credit
              </Button>
            </ButtonGroup>
          }
        />

        <section className="proto-metrics" aria-label="Accounts">
          <MetricCard
            label="Your balance"
            value="$40,206.20"
            change="4.2%"
            trend="up"
            comparison="vs last month"
            icon={<Wallet />}
          />
          <MetricCard
            label="Income"
            value="$12,480.00"
            change="8.1%"
            trend="up"
            comparison="vs last month"
            icon={<ArrowDownLeft />}
            iconTone="success"
            iconAppearance="light"
          />
          <MetricCard
            label="Spending"
            value="$7,932.60"
            change="2.4%"
            trend="up"
            positive={false}
            comparison="vs last month"
            icon={<ArrowUpRight />}
            iconTone="danger"
            iconAppearance="light"
          />
          <MetricCard
            label="Savings"
            value="$19,794.00"
            change="12%"
            trend="up"
            comparison="vs last month"
            icon={<PiggyBank />}
            iconTone="purple"
            iconAppearance="light"
          />
        </section>

        <div className="proto-grid-2-1">
          <div className="proto-page">
            <section className="proto-card" aria-labelledby="flow-title">
              <PageHeader
                size="small"
                titleAs="h2"
                title={<span id="flow-title">Income and spending</span>}
              />
              <AreaChart
                title="Income and spending by month"
                hideTitle
                data={balance}
                xKey="month"
                series={[
                  { key: 'income', label: 'Income', color: 3 },
                  { key: 'spending', label: 'Spending', color: 4 },
                ]}
                formatValue={usd}
                height={260}
              />
            </section>
            <TableCard
              title="Transaction history"
              titleAs="h2"
              actions={
                <>
                  <DateRangePicker
                    label="Transaction dates"
                    size="small"
                    presets={datePresets()}
                    placeholder="Select dates"
                  />
                  <Button
                    variant="secondary"
                    appearance="outline"
                    size="small"
                    iconStart={<Filter />}
                  >
                    Apply filter
                  </Button>
                </>
              }
              footer={
                <Pagination
                  currentPage={page}
                  totalPages={10}
                  onPageChange={setPage}
                  showArrowLabels
                  layout="spread"
                  label="Transaction pages"
                />
              }
            >
              <Table<Transaction>
                caption="Transactions"
                hideCaption
                columns={columns}
                rows={transactions}
              />
            </TableCard>
          </div>

          <div className="proto-page">
            <section className="proto-card" aria-labelledby="cards-title">
              <PageHeader
                size="small"
                titleAs="h2"
                title={<span id="cards-title">My cards</span>}
                actions={
                  <Button appearance="text" size="small" iconStart={<Plus />}>
                    Add card
                  </Button>
                }
              />
              <div className="proto-bank-card">
                <span className="proto-bank-card__brand">Panda</span>
                <CreditCard aria-hidden="true" />
                <span className="proto-bank-card__number">•••• •••• •••• 1234</span>
                <span className="proto-bank-card__meta">
                  <span>Olivia Rhye</span>
                  <span>06/28</span>
                </span>
              </div>
            </section>
            <section className="proto-card" aria-labelledby="budgets-title">
              <PageHeader
                size="small"
                titleAs="h2"
                title={<span id="budgets-title">My budgets</span>}
              />
              <ul className="proto-budgets">
                {budgets.map((b) => (
                  <li key={b.label} className="proto-budget">
                    <FeaturedIcon icon={<Wallet />} tone={b.tone} size="small" />
                    <Progress
                      label={b.label}
                      value={b.spent}
                      max={b.limit}
                      tone={b.tone === 'primary' ? 'primary' : b.tone}
                      showValue
                      formatValue={(v, m) => `$${m - v} left`}
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
