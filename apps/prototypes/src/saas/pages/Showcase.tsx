/**
 * Orbit's reference pages: forms, tables, charts, maps and UI elements, each rendered with the
 * design system's own components (the TailAdmin equivalents of a component gallery).
 */
import { useState, type ReactNode } from 'react';
import {
  Alert,
  AreaChart,
  Avatar,
  AvatarGroup,
  AvatarLabelGroup,
  Badge,
  BarChart,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
  Checkbox,
  Combobox,
  DatePicker,
  DonutChart,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  FileUpload,
  IconButton,
  InputField,
  LineChart,
  Link,
  List,
  ListItem,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  ProgressCircle,
  Radio,
  RadioGroup,
  RadarChart,
  Select,
  SelectItem,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Table,
  Tabs,
  Tag,
  Textarea,
  Tooltip,
  VerificationCodeInput,
  useToast,
  type TableColumn,
} from '@ds/react';
import {
  ArrowRight,
  Bell,
  Bold,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Eye,
  Info,
  Italic,
  Lock,
  Mail,
  Pencil,
  Play,
  Search,
  Settings,
  Share2,
  Trash2,
  Underline,
  User,
} from 'lucide-react';
import { months, people } from '../data';
import { Page, to } from '../Shell';
import { DataTable, Panel, RowMenu, Status } from '../ui';
import { CountryBars, WorldMap } from './Dashboards';

const Demo = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) => (
  <Panel title={title} description={description}>
    {children}
  </Panel>
);
const Row = ({ children }: { children: ReactNode }) => (
  <div className="orbit-demo-row">{children}</div>
);
const Grid = ({ children }: { children: ReactNode }) => (
  <div className="orbit-row orbit-row--even">{children}</div>
);

/* ----------------------------------------------------------------- forms */

function FormElements() {
  const [range, setRange] = useState([30, 70]);
  return (
    <>
      <Grid>
        <div className="orbit-stack">
          <Demo title="Inputs">
            <div className="orbit-form">
              <InputField label="Name" placeholder="Jane Cooper" />
              <InputField
                label="Email"
                type="email"
                iconStart={<Mail />}
                placeholder="jane@company.com"
              />
              <InputField
                label="Password"
                type="password"
                iconStart={<Lock />}
                description="At least 8 characters."
              />
              <InputField label="Website" prefix="https://" placeholder="orbit.app" />
              <InputField label="Price" type="number" prefix="$" suffix="USD" />
              <InputField label="Disabled" disabled defaultValue="Can’t change this" />
              <InputField
                label="With error"
                defaultValue="maya@"
                error="Enter a full email address."
              />
              <InputField
                label="Success"
                defaultValue="orbit-labs"
                success="That workspace name is free."
              />
            </div>
          </Demo>
          <Demo title="Textarea">
            <Textarea label="Description" rows={4} maxLength={240} showCount />
          </Demo>
          <Demo title="File input">
            <FileUpload id="fe-file" hint="PNG, JPG or PDF, up to 10 MB" />
          </Demo>
        </div>
        <div className="orbit-stack">
          <Demo title="Select & combobox">
            <div className="orbit-form">
              <Select label="Country" placeholder="Select a country">
                {['Portugal', 'United Arab Emirates', 'United States', 'Japan'].map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </Select>
              <Combobox
                label="Assignee"
                options={people.map((p) => ({ value: p.email, label: p.name }))}
              />
              <Combobox
                label="Tags"
                multiple
                defaultValue={['design']}
                options={['design', 'growth', 'billing', 'api', 'mobile'].map((t) => ({
                  value: t,
                  label: t,
                }))}
              />
              <DatePicker label="Due date" />
            </div>
          </Demo>
          <Demo title="Checkboxes, radios & switches">
            <div className="orbit-form">
              <Checkbox label="Email me about new features" defaultChecked />
              <Checkbox label="Weekly digest" description="Every Monday at 09:00." />
              <Checkbox label="Disabled" disabled />
              <RadioGroup label="Plan" defaultValue="pro" orientation="horizontal">
                <Radio value="free" label="Free" />
                <Radio value="pro" label="Pro" />
                <Radio value="team" label="Team" />
              </RadioGroup>
              <Switch label="Dark mode" />
              <Switch label="Two-factor authentication" description="Recommended" defaultChecked />
            </div>
          </Demo>
          <Demo title="Slider & code">
            <Slider
              label="Price range"
              value={range}
              onValueChange={setRange}
              min={0}
              max={100}
              description={`$${range[0]} – $${range[1]}`}
            />
            <div className="scroll-x">
              <VerificationCodeInput label="Verification code" separatorAfter={3} size="small" />
            </div>
          </Demo>
        </div>
      </Grid>
    </>
  );
}

function FormLayout() {
  const toast = useToast();
  return (
    <Grid>
      <Demo title="Contact form">
        <form
          className="orbit-form"
          onSubmit={(e) => {
            e.preventDefault();
            toast({ title: 'Message sent', tone: 'success' });
          }}
        >
          <div className="orbit-form__two">
            <InputField label="First name" required />
            <InputField label="Last name" required />
          </div>
          <InputField label="Email" type="email" required />
          <Select label="Subject" placeholder="Choose a topic">
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="press">Press</SelectItem>
          </Select>
          <Textarea label="Message" rows={4} required />
          <Checkbox label="I agree to the privacy policy" />
          <Button type="submit">Send message</Button>
        </form>
      </Demo>
      <div className="orbit-stack">
        <Demo title="Sign in">
          <form className="orbit-form" onSubmit={(e) => e.preventDefault()}>
            <InputField label="Email" type="email" iconStart={<Mail />} />
            <InputField label="Password" type="password" iconStart={<Lock />} />
            <div className="row row--between">
              <Checkbox label="Remember me" />
              <Link href={to('/auth/reset')}>Forgot password?</Link>
            </div>
            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </form>
        </Demo>
        <Demo title="Billing address">
          <form className="orbit-form" onSubmit={(e) => e.preventDefault()}>
            <InputField label="Street address" />
            <div className="orbit-form__three">
              <InputField label="City" />
              <InputField label="Postcode" />
              <Select label="Country" defaultValue="pt">
                <SelectItem value="pt">Portugal</SelectItem>
                <SelectItem value="es">Spain</SelectItem>
              </Select>
            </div>
            <div className="row">
              <Button variant="secondary" appearance="outline">
                Cancel
              </Button>
              <Button type="submit">Save address</Button>
            </div>
          </form>
        </Demo>
      </div>
    </Grid>
  );
}

/* ---------------------------------------------------------------- tables */

const rows = people.map((p, i) => ({
  p,
  project: [
    'Billing revamp',
    'Mobile app',
    'SSO',
    'Onboarding',
    'Pricing test',
    'API v3',
    'Help centre',
    'Data export',
  ][i],
  budget: [3.9, 24.9, 12.7, 2.8, 4.5, 18.2, 6.1, 9.4][i],
  progress: [72, 35, 90, 18, 54, 61, 100, 40][i],
  status: ['Active', 'Pending', 'Active', 'Cancelled', 'Active', 'Pending', 'Complete', 'Active'][
    i
  ],
}));
type R = (typeof rows)[number];

const baseColumns: TableColumn<R>[] = [
  {
    key: 'p',
    header: 'User',
    render: (r) => (
      <AvatarLabelGroup name={r.p.name} src={r.p.src} supportingText={r.p.company} size="small" />
    ),
  },
  { key: 'project', header: 'Project', hideBelow: 'medium' },
  { key: 'budget', header: 'Budget', align: 'end', sortable: true, render: (r) => `$${r.budget}K` },
  { key: 'status', header: 'Status', render: (r) => <Status>{r.status}</Status> },
];

function Tables({ data }: { data?: boolean }) {
  const [q, setQ] = useState('');
  if (!data)
    return (
      <>
        <Demo title="Basic table">
          <div className="orbit-table">
            <Table<R>
              caption="Projects"
              hideCaption
              columns={baseColumns}
              rows={rows.slice(0, 5)}
              getRowId={(r) => r.p.email}
            />
          </div>
        </Demo>
        <Demo title="Striped, compact">
          <div className="orbit-table">
            <Table<R>
              caption="Projects, compact"
              hideCaption
              striped
              compact
              columns={baseColumns}
              rows={rows}
              getRowId={(r) => r.p.email}
            />
          </div>
        </Demo>
        <Demo title="Loading and empty">
          <Grid>
            <div className="orbit-table">
              <Table<R>
                caption="Loading table"
                hideCaption
                loading
                columns={baseColumns}
                rows={[]}
                getRowId={(r) => r.p.email}
              />
            </div>
            <div className="orbit-table">
              <Table<R>
                caption="Empty table"
                hideCaption
                columns={baseColumns}
                rows={[]}
                getRowId={(r) => r.p.email}
                empty="No projects yet."
              />
            </div>
          </Grid>
        </Demo>
      </>
    );
  const filtered = rows.filter((r) =>
    `${r.p.name} ${r.project}`.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <DataTable
      title="Projects"
      badge={`${filtered.length} projects`}
      actions={
        <Button variant="secondary" appearance="outline" size="small" iconStart={<Download />}>
          Export
        </Button>
      }
      toolbar={
        <InputField
          label="Search projects"
          hideLabel
          size="small"
          iconStart={<Search />}
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      }
      rows={filtered}
      rowId={(r) => r.p.email}
      selectable
      rowLabel={(r) => `Select ${r.project}`}
      pageSize={5}
      empty="No projects match your search."
      columns={[
        ...baseColumns.slice(0, 3),
        {
          key: 'progress',
          header: 'Progress',
          hideBelow: 'large',
          sortable: true,
          render: (r) => (
            <Progress label={`${r.project} progress`} hideLabel value={r.progress} size="small" />
          ),
        },
        baseColumns[3],
        {
          key: 'menu',
          header: <span className="visually-hidden">Actions</span>,
          width: 48,
          render: (r) => <RowMenu label={r.project} />,
        },
      ]}
    />
  );
}

/* ---------------------------------------------------------------- charts */

const sample = months.map((month, i) => ({
  month,
  sales: Math.round(180 + i * 12 + Math.sin(i / 1.4) * 40),
  revenue: Math.round(90 + i * 9 + Math.cos(i / 1.6) * 30),
  costs: Math.round(70 + i * 4 + Math.sin(i / 2) * 20),
}));

function Charts({ kind }: { kind: string }) {
  if (kind === 'line')
    return (
      <Grid>
        <Demo title="Line chart">
          <LineChart
            title="Sales and revenue"
            hideTitle
            data={sample}
            xKey="month"
            series={[
              { key: 'sales', label: 'Sales' },
              { key: 'revenue', label: 'Revenue', color: 3 },
            ]}
          />
        </Demo>
        <Demo title="Area chart">
          <AreaChart
            title="Sales and revenue, filled"
            hideTitle
            data={sample}
            xKey="month"
            series={[
              { key: 'sales', label: 'Sales' },
              { key: 'revenue', label: 'Revenue', color: 3 },
            ]}
          />
        </Demo>
        <Demo title="Straight lines with dots">
          <LineChart
            title="Costs"
            hideTitle
            curved={false}
            showDots
            data={sample}
            xKey="month"
            series={[{ key: 'costs', label: 'Costs', color: 5 }]}
          />
        </Demo>
        <Demo title="Stacked area">
          <AreaChart
            title="Stacked"
            hideTitle
            stacked
            data={sample}
            xKey="month"
            series={[
              { key: 'sales', label: 'Sales' },
              { key: 'revenue', label: 'Revenue', color: 3 },
              { key: 'costs', label: 'Costs', color: 5 },
            ]}
          />
        </Demo>
      </Grid>
    );
  if (kind === 'bar')
    return (
      <Grid>
        <Demo title="Bar chart">
          <BarChart
            title="Sales by month"
            hideTitle
            data={sample}
            xKey="month"
            series={[{ key: 'sales', label: 'Sales' }]}
          />
        </Demo>
        <Demo title="Grouped bars">
          <BarChart
            title="Sales and revenue"
            hideTitle
            data={sample.slice(0, 6)}
            xKey="month"
            series={[
              { key: 'sales', label: 'Sales' },
              { key: 'revenue', label: 'Revenue', color: 3 },
            ]}
          />
        </Demo>
        <Demo title="Stacked bars">
          <BarChart
            title="Stacked"
            hideTitle
            stacked
            data={sample}
            xKey="month"
            series={[
              { key: 'sales', label: 'Sales' },
              { key: 'revenue', label: 'Revenue', color: 3 },
              { key: 'costs', label: 'Costs', color: 5 },
            ]}
          />
        </Demo>
        <Demo title="Horizontal bars">
          <BarChart
            title="Top channels"
            hideTitle
            orientation="horizontal"
            data={['Google', 'Direct', 'LinkedIn', 'Newsletter', 'Partners'].map((c, i) => ({
              c,
              v: [4700, 3400, 2900, 1500, 900][i],
            }))}
            xKey="c"
            series={[{ key: 'v', label: 'Visitors' }]}
          />
        </Demo>
      </Grid>
    );
  if (kind === 'pie')
    return (
      <Grid>
        <Demo title="Donut chart">
          <DonutChart
            title="Plan mix"
            hideTitle
            data={[
              { label: 'Free', value: 62 },
              { label: 'Pro', value: 28 },
              { label: 'Team', value: 10 },
            ]}
            formatValue={(v) => `${v}%`}
            centerValue="9.5K"
            centerLabel="Users"
          />
        </Demo>
        <Demo title="Many segments">
          <DonutChart
            title="Traffic by source"
            hideTitle
            data={['Google', 'Direct', 'LinkedIn', 'X', 'Newsletter', 'Partners'].map(
              (label, i) => ({ label, value: [38, 22, 14, 11, 9, 6][i] }),
            )}
            formatValue={(v) => `${v}%`}
          />
        </Demo>
      </Grid>
    );
  if (kind === 'radar')
    return (
      <Grid>
        <Demo title="Radar chart">
          <RadarChart
            title="Product scores"
            hideTitle
            data={['Speed', 'Design', 'Support', 'Price', 'Features', 'Docs'].map((a, i) => ({
              a,
              orbit: [8, 9, 7, 6, 8, 9][i],
              rival: [6, 7, 8, 8, 6, 5][i],
            }))}
            axisKey="a"
            max={10}
            series={[
              { key: 'orbit', label: 'Orbit' },
              { key: 'rival', label: 'Competitor', color: 3 },
            ]}
          />
        </Demo>
      </Grid>
    );
  return (
    <Grid>
      <Demo title="Radial progress">
        <div className="orbit-demo-row">
          <ProgressCircle label="Storage" value={72} />
          <ProgressCircle label="Seats" value={45} tone="success" />
          <ProgressCircle label="Budget" value={91} tone="danger" />
        </div>
      </Demo>
      <Demo title="Gauge">
        <div className="orbit-center">
          <ProgressCircle
            label="Monthly target"
            value={75}
            shape="half"
            size="large"
            caption="of $160K"
          />
        </div>
      </Demo>
    </Grid>
  );
}

/* ------------------------------------------------------------------ maps */

function Maps({ vector }: { vector?: boolean }) {
  const regions = [
    { label: 'North America', value: 42, note: '18,240 users' },
    { label: 'Europe', value: 31, note: '13,460 users' },
    { label: 'Middle East', value: 12, note: '5,210 users' },
    { label: 'Asia Pacific', value: 11, note: '4,780 users' },
    { label: 'Latin America', value: 4, note: '1,740 users' },
  ];
  return (
    <div className="orbit-row">
      <Demo
        title={vector ? 'Users by region' : 'Live sessions'}
        description={
          vector
            ? 'Markers show your largest markets; bigger means more users.'
            : 'Each dot is a market with active sessions.'
        }
      >
        <div>
          <WorldMap
            label={vector ? 'Map of users by region' : 'Map of live sessions'}
            variant={vector ? 'vector' : 'dots'}
          />
        </div>
      </Demo>
      <Demo title="Regions">
        <CountryBars rows={regions} />
      </Demo>
    </div>
  );
}

/* ----------------------------------------------------------- UI elements */

const tones = ['primary', 'success', 'warning', 'danger'] as const;

function Carousel() {
  const slides = ['Plan your quarter', 'Ship every week', 'Learn from every user'];
  const [i, setI] = useState(0);
  return (
    <section className="orbit-carousel" aria-roledescription="carousel" aria-label="Highlights">
      <div
        className={`orbit-carousel__slide orbit-carousel__slide--${i}`}
        aria-roledescription="slide"
        aria-label={`${i + 1} of ${slides.length}`}
      >
        <strong className="orbit-h2">{slides[i]}</strong>
      </div>
      <div className="orbit-carousel__controls">
        <IconButton
          icon={<ChevronLeft />}
          label="Previous slide"
          variant="secondary"
          appearance="outline"
          size="small"
          onClick={() => setI((i + slides.length - 1) % slides.length)}
        />
        <span className="muted text-sm" aria-live="polite">
          {i + 1} / {slides.length}
        </span>
        <IconButton
          icon={<ChevronRight />}
          label="Next slide"
          variant="secondary"
          appearance="outline"
          size="small"
          onClick={() => setI((i + 1) % slides.length)}
        />
      </div>
    </section>
  );
}

function Ui({ kind }: { kind: string }) {
  const toast = useToast();
  const [page, setPage] = useState(3);
  const blocks: Record<string, ReactNode> = {
    alerts: (
      <>
        {tones.map((t) => (
          <Alert key={t} variant={t} title={`${t[0].toUpperCase()}${t.slice(1)} message`}>
            A short explanation with what to do next.
          </Alert>
        ))}
        <Alert
          variant="primary"
          appearance="solid"
          title="Solid alert"
          actions={
            <Button size="small" variant="secondary" appearance="outline">
              Learn more
            </Button>
          }
          onDismiss={() => {}}
        >
          With an action and a dismiss button.
        </Alert>
      </>
    ),
    avatars: (
      <>
        <Demo title="Sizes">
          <Row>
            {(['xsmall', 'small', 'medium', 'large', 'xlarge'] as const).map((s) => (
              <Avatar key={s} name={people[0].name} src={people[0].src} size={s} />
            ))}
          </Row>
        </Demo>
        <Demo title="Status, initials and verified">
          <Row>
            <Avatar name={people[1].name} src={people[1].src} status="online" size="large" />
            <Avatar name={people[2].name} status="offline" size="large" />
            <Avatar name={people[3].name} src={people[3].src} verified size="large" />
          </Row>
        </Demo>
        <Demo title="Group and label">
          <AvatarGroup label="Team" max={5}>
            {people.map((p) => (
              <Avatar key={p.email} name={p.name} src={p.src} />
            ))}
          </AvatarGroup>
          <AvatarLabelGroup
            name={people[0].name}
            src={people[0].src}
            supportingText={people[0].email}
          />
        </Demo>
      </>
    ),
    badges: (
      <>
        <Demo title="Tones">
          <Row>
            {[...tones, 'secondary'].map((t) => (
              <Badge key={t} tone={t as 'primary'}>
                {t}
              </Badge>
            ))}
          </Row>
        </Demo>
        <Demo title="Hues, shapes and dots">
          <Row>
            {(['gray', 'blue', 'sky', 'indigo', 'purple', 'pink', 'orange', 'teal'] as const).map(
              (h) => (
                <Badge key={h} color={h} shape="modern" withDot>
                  {h}
                </Badge>
              ),
            )}
          </Row>
          <Row>
            <Badge appearance="solid" tone="primary">
              Solid
            </Badge>
            <Badge shape="pill">Pill</Badge>
            <Badge shape="rounded">Rounded</Badge>
            <Badge size="large">Large</Badge>
            <Badge appearance="solid" tone="danger" count={8} label="8 new" />
          </Row>
        </Demo>
        <Demo title="Tags">
          <Row>
            <Tag>Design</Tag>
            <Tag tone="primary" count={12}>
              Growth
            </Tag>
            <Tag image={people[0].src}>{people[0].name}</Tag>
            <Tag onRemove={() => toast({ title: 'Tag removed' })}>Removable</Tag>
          </Row>
        </Demo>
      </>
    ),
    breadcrumb: (
      <>
        <Breadcrumb
          items={[
            { label: 'Home', href: to('') },
            { label: 'Projects', href: to('/tasks/list') },
            { label: 'Billing revamp' },
          ]}
        />
        <Breadcrumb
          homeIcon
          separator="slash"
          items={[
            { label: 'Home', href: to('') },
            { label: 'Settings', href: to('/ai/settings') },
            { label: 'Members' },
          ]}
        />
        <Breadcrumb
          appearance="button"
          items={[
            { label: 'Workspace', href: to('') },
            { label: 'Reports', href: to('/dashboards/analytics') },
            { label: 'Q4' },
          ]}
        />
        <Breadcrumb
          maxItems={3}
          items={['Home', 'Clients', 'Northwind', 'Contracts', '2026', 'MSA'].map(
            (label, i, a) => ({ label, href: i < a.length - 1 ? to('') : undefined }),
          )}
        />
      </>
    ),
    buttons: (
      <>
        {(['filled', 'outline', 'ghost', 'text'] as const).map((a) => (
          <Demo key={a} title={`${a[0].toUpperCase()}${a.slice(1)}`}>
            <Row>
              {(['primary', 'secondary', 'success', 'warning', 'danger'] as const).map((v) => (
                <Button key={v} variant={v} appearance={a}>
                  {v[0].toUpperCase() + v.slice(1)}
                </Button>
              ))}
            </Row>
          </Demo>
        ))}
        <Demo title="Sizes, icons and states">
          <Row>
            {(['xsmall', 'small', 'medium', 'large'] as const).map((s) => (
              <Button key={s} size={s}>
                {s}
              </Button>
            ))}
          </Row>
          <Row>
            <Button iconStart={<Download />}>Download</Button>
            <Button iconEnd={<ArrowRight />} variant="secondary" appearance="outline">
              Continue
            </Button>
            <IconButton icon={<Settings />} label="Settings" />
            <Button loading>Saving</Button>
            <Button disabled>Disabled</Button>
          </Row>
        </Demo>
      </>
    ),
    'button-groups': (
      <>
        <Row>
          <ButtonGroup aria-label="Range" attached defaultValue="week">
            {['Day', 'Week', 'Month'].map((v) => (
              <Button key={v} value={v.toLowerCase()} variant="secondary" appearance="outline">
                {v}
              </Button>
            ))}
          </ButtonGroup>
        </Row>
        <Row>
          <ButtonGroup aria-label="Text style" attached defaultValue="bold">
            <IconButton
              value="bold"
              icon={<Bold />}
              label="Bold"
              variant="secondary"
              appearance="outline"
            />
            <IconButton
              value="italic"
              icon={<Italic />}
              label="Italic"
              variant="secondary"
              appearance="outline"
            />
            <IconButton
              value="underline"
              icon={<Underline />}
              label="Underline"
              variant="secondary"
              appearance="outline"
            />
          </ButtonGroup>
        </Row>
        <Row>
          <ButtonGroup aria-label="Actions" attached className="scroll-x">
            <Button variant="secondary" appearance="outline" iconStart={<Eye />}>
              View
            </Button>
            <Button variant="secondary" appearance="outline" iconStart={<Pencil />}>
              Edit
            </Button>
            <Button variant="secondary" appearance="outline" iconStart={<Share2 />}>
              Share
            </Button>
          </ButtonGroup>
        </Row>
      </>
    ),
    cards: (
      <div className="orbit-grid orbit-grid--3">
        {[
          'Design systems that scale',
          'Pricing pages that convert',
          'Onboarding that activates',
        ].map((t, i) => (
          <Card key={t} appearance={i === 1 ? 'outlined' : 'elevated'}>
            <CardMedia alt="" />
            <CardBody>
              <CardTitle>{t}</CardTitle>
              <CardDescription>
                A practical guide with examples from teams using Orbit every day.
              </CardDescription>
            </CardBody>
            <CardFooter>
              <Button size="small" variant="secondary" appearance="outline">
                Read more
              </Button>
            </CardFooter>
          </Card>
        ))}
        <Card orientation="horizontal" appearance="outlined">
          <CardMedia alt="" />
          <CardBody>
            <CardTitle>Horizontal card</CardTitle>
            <CardDescription>Media beside the body.</CardDescription>
          </CardBody>
        </Card>
      </div>
    ),
    carousel: <Carousel />,
    dropdowns: (
      <Row>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" appearance="outline" iconEnd={<ChevronDown />}>
              Options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Signed in as Maya</DropdownMenuLabel>
            <DropdownMenuItem icon={<User />}>Profile</DropdownMenuItem>
            <DropdownMenuItem icon={<Settings />}>Settings</DropdownMenuItem>
            <DropdownMenuItem icon={<Copy />}>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Trash2 />} variant="danger">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <RowMenu label="this row" />
      </Row>
    ),
    images: (
      <div className="orbit-grid orbit-grid--3">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <figure key={n} className="orbit-figure-img">
            <div
              className={`orbit-gen ${n % 2 ? 'orbit-gen--b' : ''}`}
              role="img"
              aria-label={`Sample image ${n + 1}`}
            />
            <figcaption className="muted text-sm">Image {n + 1}</figcaption>
          </figure>
        ))}
      </div>
    ),
    links: (
      <>
        <p>
          Read the <Link href={to('/pages/faq')}>FAQ</Link> or the{' '}
          <Link href="https://www.w3.org/WAI/" external>
            accessibility guidelines
          </Link>
          .
        </p>
        <Row>
          <Link href={to('')} appearance="standalone" icon={<ArrowRight />}>
            Standalone link
          </Link>
          <Link href={to('')} appearance="standalone" variant="secondary">
            Secondary link
          </Link>
        </Row>
      </>
    ),
    lists: (
      <Grid>
        <List divided aria-label="Team">
          {people.slice(0, 4).map((p) => (
            <ListItem
              key={p.email}
              icon={<Avatar name={p.name} src={p.src} size="small" decorative />}
              title={p.name}
              description={p.email}
              meta={<Badge size="small">{p.company}</Badge>}
            />
          ))}
        </List>
        <List ordered aria-label="Setup steps">
          {[
            'Create a workspace',
            'Connect billing',
            'Invite your team',
            'Pick your key metric',
          ].map((t) => (
            <ListItem key={t} title={t} />
          ))}
        </List>
      </Grid>
    ),
    modals: (
      <Row>
        <Modal>
          <ModalTrigger asChild>
            <Button>Open modal</Button>
          </ModalTrigger>
          <ModalContent title="Invite a teammate" description="They’ll get an email with a link.">
            <InputField label="Email" type="email" />
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="secondary" appearance="outline">
                  Cancel
                </Button>
              </ModalClose>
              <ModalClose asChild>
                <Button>Send invite</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal>
          <ModalTrigger asChild>
            <Button variant="danger" appearance="outline">
              Confirm delete
            </Button>
          </ModalTrigger>
          <ModalContent
            role="alertdialog"
            size="small"
            icon={<Trash2 />}
            iconTone="danger"
            align="center"
            title="Delete project?"
            description="This can’t be undone."
          >
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="secondary" appearance="outline">
                  Cancel
                </Button>
              </ModalClose>
              <ModalClose asChild>
                <Button variant="danger">Delete</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Row>
    ),
    notifications: (
      <Row>
        {tones.map((t) => (
          <Button
            key={t}
            variant={t}
            appearance="outline"
            iconStart={<Bell />}
            onClick={() =>
              toast({
                title: `${t[0].toUpperCase()}${t.slice(1)} notification`,
                description: 'This is how a toast looks.',
                tone: t,
              })
            }
          >
            Show {t}
          </Button>
        ))}
        <Button
          onClick={() =>
            toast({
              title: 'Invoice deleted',
              action: { label: 'Undo', onClick: () => {}, altText: 'Undo delete' },
            })
          }
        >
          With action
        </Button>
      </Row>
    ),
    pagination: (
      <>
        <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />
        <Pagination
          currentPage={page}
          totalPages={12}
          onPageChange={setPage}
          appearance="simple"
          showArrowLabels
          layout="spread"
          label="Simple pagination"
        />
      </>
    ),
    popovers: (
      <Row>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" appearance="outline">
              Open popover
            </Button>
          </PopoverTrigger>
          <PopoverContent title="Share report">
            <InputField label="Link" readOnly defaultValue="orbit.app/r/8k2" />
          </PopoverContent>
        </Popover>
      </Row>
    ),
    progress: (
      <>
        {tones.map((t, i) => (
          <Progress key={t} label={`${t} progress`} value={25 + i * 20} tone={t} showValue />
        ))}
        <Progress label="Uploading" />
        <Progress
          label="Small, value at the end"
          value={64}
          size="small"
          showValue
          valuePosition="end"
        />
      </>
    ),
    ribbons: (
      <div className="orbit-grid orbit-grid--3">
        {['New', 'Popular', 'Sale'].map((r, i) => (
          <article key={r} className="orbit-plan orbit-ribbon-card">
            <span className={`orbit-ribbon orbit-ribbon--${i}`}>{r}</span>
            <strong>Card with a “{r}” ribbon</strong>
            <span className="muted text-sm">Ribbons flag a card without adding another row.</span>
          </article>
        ))}
      </div>
    ),
    spinners: (
      <>
        <Row>
          <Spinner size="small" label="Loading small" />
          <Spinner label="Loading" />
          <Spinner size="large" label="Loading large" />
          <Button loading>Saving</Button>
        </Row>
        <Skeleton variant="circle" width={48} height={48} />
        <Skeleton lines={3} />
        <Skeleton variant="rect" height={120} />
      </>
    ),
    tabs: (
      <>
        {(['line', 'enclosed', 'pill', 'segmented', 'subtle'] as const).map((a) => (
          <Tabs key={a} appearance={a} defaultValue="overview">
            <TabList label={`${a} tabs`} className="scroll-x">
              <Tab value="overview">Overview</Tab>
              <Tab value="activity" count={4}>
                Activity
              </Tab>
              <Tab value="settings">Settings</Tab>
            </TabList>
            <TabPanel value="overview">
              <p className="muted text-sm">“{a}” tabs · overview panel.</p>
            </TabPanel>
            <TabPanel value="activity">
              <p className="muted text-sm">Four new events.</p>
            </TabPanel>
            <TabPanel value="settings">
              <p className="muted text-sm">Settings panel.</p>
            </TabPanel>
          </Tabs>
        ))}
      </>
    ),
    tooltips: (
      <Row>
        <Tooltip content="Copies the link">
          <IconButton icon={<Copy />} label="Copy link" variant="secondary" appearance="outline" />
        </Tooltip>
        <Tooltip
          content="Shows how this number is calculated."
          title="Monthly recurring revenue"
          arrow
        >
          <IconButton icon={<Info />} label="About MRR" variant="secondary" appearance="outline" />
        </Tooltip>
        <Tooltip content="Opens in the editor">
          <Button variant="secondary" appearance="outline">
            Hover or focus me
          </Button>
        </Tooltip>
      </Row>
    ),
    videos: (
      <div className="orbit-grid">
        {['16 / 9', '4 / 3', '1 / 1'].map((r) => (
          <figure key={r} className="orbit-figure-img">
            <div
              className="orbit-video"
              style={{ aspectRatio: r }}
              role="img"
              aria-label={`Video placeholder, ${r.replace(/ /g, '')}`}
            >
              <IconButton icon={<Play />} label="Play video" />
            </div>
            <figcaption className="muted text-sm">{r.replace(/ /g, '')}</figcaption>
          </figure>
        ))}
      </div>
    ),
  };
  return <div className="orbit-stack">{blocks[kind] ?? blocks.alerts}</div>;
}

/* ------------------------------------------------------------------ page */

export default function Showcase({ path }: { path: string }) {
  const [, group, kind] = path.split('/');
  const body =
    group === 'forms' ? (
      kind === 'layout' ? (
        <FormLayout />
      ) : (
        <FormElements />
      )
    ) : group === 'tables' ? (
      <Tables data={kind === 'data'} />
    ) : group === 'charts' ? (
      <Charts kind={kind} />
    ) : group === 'maps' ? (
      <Maps vector={kind === 'vector'} />
    ) : (
      <Ui kind={kind} />
    );
  return (
    <Page path={path} description="Built with the design system’s components and tokens.">
      {body}
    </Page>
  );
}
