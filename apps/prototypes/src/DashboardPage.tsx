import { useMemo, useState } from 'react';
import {
  Alert,
  AppsNotifications,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  ChooseCard,
  ChooseCardGroup,
  Container,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Footer,
  Grid,
  Inline,
  List,
  ListItem,
  Logo,
  MeetingCard,
  Navbar,
  Radio,
  RadioGroup,
  SearchField,
  Stack,
  Stat,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Table,
  Tabs,
  useToast,
  type TableColumn,
} from '@ds/react';
import {
  BarChart3,
  ChartLine,
  ChevronDown,
  DollarSign,
  Download,
  RefreshCw,
  SlidersHorizontal,
  Users,
} from 'lucide-react';

const kpis = [
  { label: 'Total revenue', value: '$124,567', change: '+12.5%' },
  { label: 'Active users', value: '8,432', change: '+8.2%' },
  { label: 'Transactions', value: '2,156', change: '+15.3%' },
  { label: 'Growth rate', value: '24.5%', change: '+3.1%' },
];

type MetricCategory = 'revenue' | 'users' | 'engagement';
interface Metric {
  id: string;
  category: MetricCategory;
  name: string;
  description: string;
  value: string;
  sortValue: number;
  status: 'On track' | 'Watch' | 'Below target';
}

const metrics: Metric[] = [
  {
    id: 'rev-total',
    category: 'revenue',
    name: 'Total revenue',
    description: 'All sources this month',
    value: '$124,567',
    sortValue: 124567,
    status: 'On track',
  },
  {
    id: 'rev-growth',
    category: 'revenue',
    name: 'Revenue growth',
    description: 'Month over month',
    value: '+$12,450',
    sortValue: 12450,
    status: 'On track',
  },
  {
    id: 'rev-user',
    category: 'revenue',
    name: 'Revenue per user',
    description: 'Average per account',
    value: '$15.80',
    sortValue: 15.8,
    status: 'Watch',
  },
  {
    id: 'users-active',
    category: 'users',
    name: 'Active users',
    description: 'Active on the platform now',
    value: '8,432',
    sortValue: 8432,
    status: 'On track',
  },
  {
    id: 'users-new',
    category: 'users',
    name: 'New users',
    description: 'Registered this month',
    value: '+1,245',
    sortValue: 1245,
    status: 'On track',
  },
  {
    id: 'users-geo',
    category: 'users',
    name: 'Countries',
    description: 'Where users are',
    value: '45',
    sortValue: 45,
    status: 'Watch',
  },
  {
    id: 'eng-session',
    category: 'engagement',
    name: 'Session duration',
    description: 'Average per session',
    value: '4m 32s',
    sortValue: 272,
    status: 'On track',
  },
  {
    id: 'eng-bounce',
    category: 'engagement',
    name: 'Bounce rate',
    description: 'Single-page sessions',
    value: '32.1%',
    sortValue: 32.1,
    status: 'Below target',
  },
  {
    id: 'eng-retention',
    category: 'engagement',
    name: 'Retention',
    description: 'Returning users',
    value: '68.5%',
    sortValue: 68.5,
    status: 'On track',
  },
];
const statusTone = { 'On track': 'success', Watch: 'warning', 'Below target': 'danger' } as const;
const columns: TableColumn<Metric>[] = [
  {
    key: 'name',
    header: 'Metric',
    sortable: true,
    render: (m) => (
      <Stack gap="none">
        <span>{m.name}</span>
        <span className="proto-muted">{m.description}</span>
      </Stack>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (m) => <Badge tone={statusTone[m.status]}>{m.status}</Badge>,
  },
  { key: 'value', header: 'Value', align: 'end', sortable: true, sortValue: (m) => m.sortValue },
];

const systemStatus = [
  {
    id: 1,
    title: 'Database: healthy',
    time: 'Uptime 99.99%',
    variant: 'success' as const,
    attendees: [
      { name: 'Osama', src: 'assets/avatar-1.png' },
      { name: 'Sarah', src: 'assets/avatar-2.png' },
    ],
  },
  {
    id: 2,
    title: 'API: slow responses',
    time: 'Latency 820 ms',
    variant: 'warning' as const,
    attendees: [
      { name: 'Sarah', src: 'assets/avatar-2.png' },
      { name: 'Maria', src: 'assets/avatar-3.png' },
    ],
  },
  {
    id: 3,
    title: 'Backup in progress',
    time: 'About 15 min left',
    variant: 'primary' as const,
    attendees: [
      { name: 'Maria', src: 'assets/avatar-3.png' },
      { name: 'James', src: 'assets/avatar-4.png' },
    ],
  },
];

const team = [
  { name: 'Osama', role: 'Admin', avatar: 'assets/avatar-1.png' },
  { name: 'Sarah', role: 'Editor', avatar: 'assets/avatar-2.png' },
  { name: 'Maria', role: 'Viewer', avatar: 'assets/avatar-3.png' },
  { name: 'James', role: 'Editor', avatar: 'assets/avatar-4.png' },
];

const integrations = [
  { id: 'google', name: 'Google', icon: 'assets/google.png' },
  { id: 'mixpanel', name: 'Mixpanel', icon: 'assets/linkedin.png' },
  { id: 'amplitude', name: 'Amplitude', icon: 'assets/behance.png', defaultEnabled: false },
  { id: 'segment', name: 'Segment', icon: 'assets/twitter.png' },
];

function DashboardPage() {
  const toast = useToast();
  const [period, setPeriod] = useState('month');
  const [realtime, setRealtime] = useState(true);
  const [tab, setTab] = useState<'all' | MetricCategory>('all');
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState('realtime');
  const [widgets, setWidgets] = useState({ charts: true, alerts: true, team: true });

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return metrics.filter(
      (m) => (tab === 'all' || m.category === tab) && (!q || m.name.toLowerCase().includes(q)),
    );
  }, [tab, query]);

  return (
    <div className="proto">
      <div className="proto-top">
        <Container size="full">
          <Navbar
            logo={<Logo icon={<ChartLine />} name="Analytics" href="#/dashboard" />}
            items={[
              { label: 'Products', href: '#/landing' },
              { label: 'Dashboard', href: '#/dashboard' },
              { label: 'Theme playground', href: '#/demo' },
            ]}
            currentItem="Dashboard"
            actions={
              <>
                <SearchField
                  label="Search metrics"
                  placeholder="Search metrics"
                  size="small"
                  shortcut="mod+k"
                  value={query}
                  onValueChange={setQuery}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="small"
                      appearance="outline"
                      variant="secondary"
                      iconStart={<SlidersHorizontal />}
                      iconEnd={<ChevronDown />}
                    >
                      Period
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setPeriod('week')}>
                      This week
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setPeriod('month')}>
                      This month
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setPeriod('year')}>
                      This year
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            }
          />
        </Container>
      </div>

      <Container as="main" size="full" className="proto-main">
        <h1 className="proto-title">Analytics overview</h1>
        <div className="proto-layout proto-layout--three">
          <Stack as="aside" gap="lg" aria-label="Filters and system status">
            <Card appearance="outlined" as="section" aria-labelledby="filters-title">
              <CardBody>
                <Stack gap="lg">
                  <h2 className="proto-subtitle" id="filters-title">
                    Filters
                  </h2>
                  <RadioGroup label="Time period" value={period} onValueChange={setPeriod}>
                    <Radio value="today" label="Today" />
                    <Radio value="week" label="This week" />
                    <Radio value="month" label="This month" />
                    <Radio value="year" label="This year" />
                  </RadioGroup>
                  <Switch
                    label="Real-time updates"
                    checked={realtime}
                    onCheckedChange={setRealtime}
                  />
                </Stack>
              </CardBody>
            </Card>
            <Stack as="section" gap="sm" aria-labelledby="status-title">
              <h2 className="proto-subtitle" id="status-title">
                System status
              </h2>
              {systemStatus.map((s) => (
                <MeetingCard
                  key={s.id}
                  title={s.title}
                  time={s.time}
                  variant={s.variant}
                  attendees={s.attendees}
                  attendeesLabel="On call"
                />
              ))}
            </Stack>
          </Stack>

          <Stack gap="xl">
            {realtime && widgets.alerts && (
              <Alert variant="success" title="Real-time data is on">
                Figures update every 30 seconds.
              </Alert>
            )}

            {widgets.charts && (
              <Grid minItemWidth="11rem" as="section" aria-label="Key figures">
                {kpis.map((k) => (
                  <Card key={k.label} appearance="outlined">
                    <CardBody>
                      <Stat
                        label={k.label}
                        value={k.value}
                        change={k.change}
                        trend="up"
                        help="vs last month"
                      />
                    </CardBody>
                  </Card>
                ))}
              </Grid>
            )}

            <Card as="section" aria-labelledby="metrics-title">
              <CardBody>
                <Stack gap="md">
                  <h2 className="proto-subtitle" id="metrics-title">
                    Metrics
                  </h2>
                  <Tabs value={tab} onValueChange={(v) => setTab(v as 'all' | MetricCategory)}>
                    <TabList label="Metric categories">
                      <Tab value="all" icon={<ChartLine />}>
                        All
                      </Tab>
                      <Tab value="revenue" icon={<DollarSign />}>
                        Revenue
                      </Tab>
                      <Tab value="users" icon={<Users />}>
                        Users
                      </Tab>
                      <Tab value="engagement" icon={<BarChart3 />}>
                        Engagement
                      </Tab>
                    </TabList>
                    <TabPanel value={tab}>
                      <Table
                        caption="Metrics"
                        hideCaption
                        columns={columns}
                        rows={rows}
                        empty="No metrics match your search."
                        striped
                      />
                    </TabPanel>
                  </Tabs>
                </Stack>
              </CardBody>
            </Card>

            <Card as="section" aria-labelledby="settings-title">
              <CardBody>
                <Stack gap="lg">
                  <Inline justify="between">
                    <h2 className="proto-subtitle" id="settings-title">
                      Dashboard settings
                    </h2>
                    <Inline gap="xs">
                      <Button
                        size="small"
                        appearance="outline"
                        variant="secondary"
                        iconStart={<RefreshCw />}
                        onClick={() => toast({ title: 'Data refreshed', tone: 'success' })}
                      >
                        Refresh
                      </Button>
                      <Button
                        size="small"
                        iconStart={<Download />}
                        onClick={() =>
                          toast({
                            title: 'Export started',
                            description: 'You’ll get an email when it’s ready.',
                          })
                        }
                      >
                        Export
                      </Button>
                    </Inline>
                  </Inline>
                  <Stack gap="xs">
                    <h3 className="proto-subtitle" id="refresh-title">
                      Data refresh
                    </h3>
                    <ChooseCardGroup
                      orientation="horizontal"
                      aria-labelledby="refresh-title"
                      value={refresh}
                      onValueChange={setRefresh}
                    >
                      <ChooseCard value="realtime" title="Real-time" description="Live updates" />
                      <ChooseCard value="5min" title="Every 5 min" description="Frequent" />
                      <ChooseCard value="15min" title="Every 15 min" description="Standard" />
                    </ChooseCardGroup>
                  </Stack>
                  <Stack gap="xs">
                    <h3 className="proto-subtitle">Widgets</h3>
                    <Switch
                      label="Show charts"
                      checked={widgets.charts}
                      onCheckedChange={(v) => setWidgets((w) => ({ ...w, charts: v }))}
                    />
                    <Switch
                      label="Show alerts"
                      checked={widgets.alerts}
                      onCheckedChange={(v) => setWidgets((w) => ({ ...w, alerts: v }))}
                    />
                    <Switch
                      label="Show team activity"
                      checked={widgets.team}
                      onCheckedChange={(v) => setWidgets((w) => ({ ...w, team: v }))}
                    />
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </Stack>

          <Stack as="aside" gap="lg" aria-label="Team and integrations">
            {widgets.team && (
              <Card appearance="outlined" as="section" aria-labelledby="team-title">
                <CardBody>
                  <Stack gap="sm">
                    <h2 className="proto-subtitle" id="team-title">
                      Team
                    </h2>
                    <List divided>
                      {team.map((m) => (
                        <ListItem
                          key={m.name}
                          icon={<Avatar name={m.name} src={m.avatar} decorative />}
                          title={m.name}
                          description={m.role}
                        />
                      ))}
                    </List>
                  </Stack>
                </CardBody>
              </Card>
            )}
            <AppsNotifications
              appearance="outlined"
              title="Connected apps"
              titleAs="h2"
              items={integrations}
            />
          </Stack>
        </div>
      </Container>

      <Container size="full">
        <Footer
          title={`© ${new Date().getFullYear()} Analytics. All rights reserved.`}
          links={[
            { label: 'Privacy', href: '#/dashboard/privacy' },
            { label: 'Terms', href: '#/dashboard/terms' },
            { label: 'Support', href: '#/dashboard/support' },
          ]}
        />
      </Container>
    </div>
  );
}

export default DashboardPage;
