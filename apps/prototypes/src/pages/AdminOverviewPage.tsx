import { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  EmptyState,
  Grid,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  IconButton,
  Inline,
  Link,
  List,
  ListItem,
  MeetingCard,
  Progress,
  Skeleton,
  Stack,
  Stat,
  Switch,
  Tab,
  Table,
  TabList,
  Tabs,
  Tag,
  Tooltip,
  useToast,
} from '@ds/react';
import { ArrowRight, CircleCheck, Info, RefreshCw } from 'lucide-react';
import { money, orders, people, products, statusTone, type Order } from '../data';
import { AdminShell } from '../shell/AdminShell';

type Period = '7d' | '30d' | '90d';
const periodLabel: Record<Period, string> = {
  '7d': 'last week',
  '30d': 'last month',
  '90d': 'last quarter',
};
const statsByPeriod: Record<
  Period,
  { label: string; value: string; change: string; trend: 'up' | 'down'; positive?: boolean }[]
> = {
  '7d': [
    { label: 'Revenue', value: '$29,840', change: '+4.1%', trend: 'up' },
    { label: 'Orders', value: '312', change: '+2.6%', trend: 'up' },
    { label: 'Refund rate', value: '1.6%', change: '−0.2%', trend: 'down', positive: true },
    { label: 'Conversion', value: '3.6%', change: '+0.1%', trend: 'up' },
  ],
  '30d': [
    { label: 'Revenue', value: '$124,567', change: '+12.5%', trend: 'up' },
    { label: 'Orders', value: '1,284', change: '+8.2%', trend: 'up' },
    { label: 'Refund rate', value: '1.8%', change: '+0.4%', trend: 'up', positive: false },
    { label: 'Conversion', value: '3.4%', change: '−0.2%', trend: 'down' },
  ],
  '90d': [
    { label: 'Revenue', value: '$352,190', change: '+18.9%', trend: 'up' },
    { label: 'Orders', value: '3,702', change: '+11.4%', trend: 'up' },
    { label: 'Refund rate', value: '2.0%', change: '+0.3%', trend: 'up', positive: false },
    { label: 'Conversion', value: '3.3%', change: '−0.4%', trend: 'down' },
  ],
};
const channels = {
  revenue: [
    { label: 'Online store', share: 58, last: 54 },
    { label: 'Marketplace', share: 27, last: 29 },
    { label: 'Retail partners', share: 15, last: 17 },
  ],
  orders: [
    { label: 'Online store', share: 49, last: 47 },
    { label: 'Marketplace', share: 38, last: 36 },
    { label: 'Retail partners', share: 13, last: 17 },
  ],
};
const topSearches = ['headphones', 'usb-c hub', 'keyboard', 'webcam', 'power bank'];
const initialTasks = [
  { id: 'refunds', label: 'Review 3 refund requests', done: false },
  { id: 'restock', label: 'Reorder Webcam 4K', done: false },
  { id: 'banner', label: 'Schedule the autumn sale banner', done: true },
];

/** Admin overview: key figures, channels, orders, stock, today’s schedule, tasks and team. */
export default function AdminOverviewPage() {
  const toast = useToast();
  const [period, setPeriod] = useState<Period>('30d');
  const [loading, setLoading] = useState(true);
  const [metric, setMetric] = useState<'revenue' | 'orders'>('revenue');
  const [compare, setCompare] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [order, setOrder] = useState<Order | null>(null);

  const load = (then?: () => void) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      then?.();
    }, 700);
  };
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const lowStock = products
    .filter((p) => p.stock < 10)
    .map((p) => ({ id: p.id, name: p.title, stock: p.stock }));
  const done = tasks.filter((t) => t.done).length;

  return (
    <AdminShell
      current="overview"
      trail={[{ label: 'Admin', href: '#/admin' }, { label: 'Overview' }]}
    >
      <Stack gap="xl">
        {/* Page header: title, period and refresh */}
        <Inline justify="between" align="end">
          <Stack gap="2xs">
            <h1 className="proto-hero-title">Good morning, Sarah</h1>
            <p className="proto-muted">Here’s how the store is doing.</p>
          </Stack>
          <Inline gap="sm">
            <Tabs
              value={period}
              onValueChange={(v) => {
                setPeriod(v as Period);
                load();
              }}
              appearance="pill"
            >
              <TabList label="Period">
                <Tab value="7d">7 days</Tab>
                <Tab value="30d">30 days</Tab>
                <Tab value="90d">90 days</Tab>
              </TabList>
            </Tabs>
            <Tooltip content="Reload the figures">
              <Button
                appearance="outline"
                variant="secondary"
                iconStart={<RefreshCw />}
                loading={loading}
                onClick={() => load(() => toast({ title: 'Figures updated', tone: 'success' }))}
              >
                Refresh
              </Button>
            </Tooltip>
          </Inline>
        </Inline>

        {/* Key figures */}
        <Grid
          stretch
          minItemWidth="13rem"
          as="section"
          aria-label="Key figures"
          aria-busy={loading}
        >
          {statsByPeriod[period].map((s) => (
            <Card key={s.label} appearance="outlined">
              <CardBody>
                {loading ? (
                  <Skeleton lines={3} />
                ) : (
                  <Stat {...s} help={`vs ${periodLabel[period]}`} />
                )}
              </CardBody>
            </Card>
          ))}
        </Grid>

        {/* Main column + side column */}
        <div className="proto-dash">
          <Stack gap="xl">
            <Card as="section" aria-labelledby="channels-title">
              <CardBody>
                <Stack gap="md">
                  <Inline justify="between">
                    <h2 className="proto-subtitle" id="channels-title">
                      Sales by channel
                    </h2>
                    <ButtonGroup
                      aria-label="Measure"
                      attached
                      value={metric}
                      onValueChange={(v) => setMetric(v as 'revenue' | 'orders')}
                    >
                      <Button size="small" value="revenue">
                        Revenue
                      </Button>
                      <Button size="small" value="orders">
                        Orders
                      </Button>
                    </ButtonGroup>
                  </Inline>
                  {channels[metric].map((c) => (
                    <Stack key={c.label} gap="2xs">
                      <Progress label={c.label} value={c.share} showValue />
                      {compare && (
                        <Progress
                          label={`${c.label}, ${periodLabel[period]}`}
                          value={c.last}
                          showValue
                          tone="warning"
                          size="small"
                        />
                      )}
                    </Stack>
                  ))}
                  <Divider />
                  <Inline justify="between">
                    <Switch
                      label={`Compare with ${periodLabel[period]}`}
                      checked={compare}
                      onCheckedChange={setCompare}
                    />
                    <Progress
                      className="proto-target"
                      label="Monthly target"
                      value={82}
                      showValue
                      tone="success"
                    />
                  </Inline>
                </Stack>
              </CardBody>
            </Card>

            <Card as="section" aria-labelledby="activity-title">
              <CardBody>
                <Stack gap="md">
                  <Inline justify="between">
                    <h2 className="proto-subtitle" id="activity-title">
                      Latest orders
                    </h2>
                    <Link href="#/admin/orders" appearance="standalone" icon={<ArrowRight />}>
                      All orders
                    </Link>
                  </Inline>
                  <List divided>
                    {orders.slice(0, 5).map((o) => (
                      <ListItem
                        key={o.id}
                        title={`${o.id} · ${o.customer}`}
                        description={`${o.items} items · ${o.date}`}
                        meta={
                          <Inline gap="xs" wrap={false}>
                            <span>{money(o.total)}</span>
                            <Badge tone={statusTone[o.status]}>{o.status}</Badge>
                          </Inline>
                        }
                        onClick={() => setOrder(o)}
                      />
                    ))}
                  </List>
                </Stack>
              </CardBody>
            </Card>

            <Card as="section" aria-labelledby="stock-title">
              <CardBody>
                <Stack gap="md">
                  <Inline justify="between">
                    <h2 className="proto-subtitle" id="stock-title">
                      Low stock
                    </h2>
                    <Badge tone="warning">{`${lowStock.length} products`}</Badge>
                  </Inline>
                  <Table
                    caption="Low stock"
                    hideCaption
                    compact
                    columns={[
                      { key: 'name', header: 'Product' },
                      {
                        key: 'stock',
                        header: 'Left',
                        align: 'end',
                        render: (r) =>
                          r.stock === 0 ? <Badge tone="danger">Sold out</Badge> : r.stock,
                      },
                    ]}
                    rows={lowStock}
                  />
                  <Stack gap="xs">
                    <span className="proto-muted">Top searches this week</span>
                    <Inline gap="xs">
                      {topSearches.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </Inline>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </Stack>

          {/* Side column */}
          <Stack gap="xl">
            <Card as="section" aria-labelledby="schedule-title">
              <CardBody>
                <Stack gap="md">
                  <h2 className="proto-subtitle" id="schedule-title">
                    Today’s meetings
                  </h2>
                  <Stack gap="sm">
                    <MeetingCard
                      title="Weekly sales review"
                      time="10:00 – 10:30"
                      dateTime="2026-09-29T10:00"
                      attendees={people.map((p) => ({ name: p.name, src: p.avatar }))}
                      maxAttendees={3}
                    />
                    <MeetingCard
                      variant="warning"
                      title="Starts in 15 min: Supplier call"
                      time="11:00 – 11:45"
                      attendees={[{ name: people[0].name, src: people[0].avatar }]}
                    />
                    <MeetingCard variant="success" title="Done: Stock count" time="08:00 – 09:00" />
                  </Stack>
                </Stack>
              </CardBody>
            </Card>

            <Card as="section" aria-labelledby="tasks-title">
              <CardBody>
                <Stack gap="md">
                  <Inline justify="between">
                    <h2 className="proto-subtitle" id="tasks-title">
                      Your tasks
                    </h2>
                    <Tooltip content="Tasks assigned to you today">
                      <IconButton
                        icon={<Info />}
                        label="About tasks"
                        appearance="ghost"
                        variant="secondary"
                        size="small"
                      />
                    </Tooltip>
                  </Inline>
                  <Progress
                    label={`${done} of ${tasks.length} done`}
                    value={(done / tasks.length) * 100}
                  />
                  {done === tasks.length ? (
                    <EmptyState
                      icon={<CircleCheck />}
                      title="All done"
                      description="Nothing left for today."
                      actions={
                        <Button
                          appearance="outline"
                          size="small"
                          onClick={() => setTasks(initialTasks)}
                        >
                          Reset
                        </Button>
                      }
                    />
                  ) : (
                    <Stack gap="sm">
                      {tasks.map((t) => (
                        <Checkbox
                          key={t.id}
                          label={t.label}
                          checked={t.done}
                          onCheckedChange={(c) =>
                            setTasks((all) =>
                              all.map((x) => (x.id === t.id ? { ...x, done: c === true } : x)),
                            )
                          }
                        />
                      ))}
                    </Stack>
                  )}
                </Stack>
              </CardBody>
            </Card>

            <Card as="section" aria-labelledby="team-title">
              <CardBody>
                <Stack gap="md">
                  <Inline justify="between">
                    <h2 className="proto-subtitle" id="team-title">
                      Team
                    </h2>
                    <AvatarGroup label="Team members" max={3}>
                      {people.map((p) => (
                        <Avatar key={p.name} name={p.name} src={p.avatar} />
                      ))}
                    </AvatarGroup>
                  </Inline>
                  <ul className="proto-plain-list proto-team">
                    {people.map((p) => (
                      <li key={p.name}>
                        <Inline gap="sm" wrap={false}>
                          <Avatar name={p.name} src={p.avatar} status={p.status} />
                          <Stack gap="none">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Link href="#/admin">{p.name}</Link>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <Inline gap="sm" wrap={false}>
                                  <Avatar name={p.name} src={p.avatar} size="large" />
                                  <Stack gap="none">
                                    <strong>{p.name}</strong>
                                    <span className="proto-muted">{p.role}</span>
                                    <span className="proto-muted">Status: {p.status}</span>
                                  </Stack>
                                </Inline>
                              </HoverCardContent>
                            </HoverCard>
                            <span className="proto-muted">{p.role}</span>
                          </Stack>
                        </Inline>
                      </li>
                    ))}
                  </ul>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </div>
      </Stack>

      {/* Order details */}
      <Drawer open={order !== null} onOpenChange={(o) => !o && setOrder(null)}>
        {order && (
          <DrawerContent title={`Order ${order.id}`} description={order.date}>
            <Stack gap="md">
              <Inline justify="between">
                <strong>{order.customer}</strong>
                <Badge tone={statusTone[order.status]}>{order.status}</Badge>
              </Inline>
              <span className="proto-muted">{order.email}</span>
              <Divider />
              <dl className="proto-totals">
                <dt>Items</dt>
                <dd>{order.items}</dd>
                <dt className="proto-totals__total">Total</dt>
                <dd className="proto-totals__total">{money(order.total)}</dd>
              </dl>
            </Stack>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button appearance="outline" variant="secondary">
                  Close
                </Button>
              </DrawerClose>
              <Button onClick={() => (window.location.hash = '/admin/orders')}>
                Open in Orders
              </Button>
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
    </AdminShell>
  );
}
