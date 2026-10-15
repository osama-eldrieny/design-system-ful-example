/**
 * The showcase tiles: each shows one component with a few of its variants, built only from
 * @ds/react. `t` translates visible strings when the page is in Arabic.
 */
import { useState, type ReactNode } from 'react';
import {
  Alert,
  Avatar,
  AvatarGroup,
  AvatarLabelGroup,
  Badge,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FeaturedIcon,
  IconButton,
  InputField,
  Kbd,
  List,
  ListItem,
  MetricCard,
  Progress,
  ProductCard,
  ProgressCircle,
  Radio,
  RadioGroup,
  SideNav,
  Sparkline,
  Switch,
  Tab,
  TabList,
  Table,
  TableCard,
  Tabs,
  Tag,
  Textarea,
  Tooltip,
  useToast,
  type TableColumn,
} from '@ds/react';
import {
  BarChart3,
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  FileText,
  FolderKanban,
  ImageIcon,
  Info,
  LayoutDashboard,
  ListTodo,
  Mail,
  Mic,
  Paperclip,
  Search,
  ShoppingCart,
  Sparkles,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { people } from '../saas/data';

export type T = (s: string) => string;

/** A tile: a titled card on the wall. */
export function Tile({
  title,
  children,
  wide,
}: {
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    // An elevated Card, so tiles follow the shadow and radius themes.
    <Card
      as="section"
      appearance="elevated"
      aria-label={title}
      className={wide ? 'sc-tile sc-tile--wide' : 'sc-tile'}
    >
      <h2 className="sc-tile__title">{title}</h2>
      <div className="sc-tile__body">{children}</div>
    </Card>
  );
}

const Stack = ({ children }: { children: ReactNode }) => <div className="sc-stack">{children}</div>;
const Row = ({ children }: { children: ReactNode }) => <div className="sc-row">{children}</div>;

export const Buttons = ({ t }: { t: T }) => (
  <Tile title={t('Buttons')}>
    <Stack>
      <Button>{t('Publish now')}</Button>
      <Button variant="secondary" appearance="outline">
        {t('Save as draft')}
      </Button>
      <Button variant="secondary" appearance="ghost">
        {t('Preview')}
      </Button>
      <Button loading>{t('Publishing')}</Button>
      <Button disabled>{t('Publish now')}</Button>
    </Stack>
  </Tile>
);

export const Destructive = ({ t }: { t: T }) => (
  <Tile title={t('Destructive')}>
    <Stack>
      <Button variant="danger" iconStart={<Trash2 />}>
        {t('Delete folder')}
      </Button>
      <Button variant="danger" appearance="outline">
        {t('Delete folder')}
      </Button>
      <Button variant="danger" appearance="text">
        {t('Delete folder')}
      </Button>
      <Button variant="danger" loading>
        {t('Deleting')}
      </Button>
      <Button variant="danger" disabled>
        {t('Delete folder')}
      </Button>
    </Stack>
  </Tile>
);

export const Badges = ({ t }: { t: T }) => (
  <Tile title={t('Badges')}>
    <div className="sc-badges">
      {(['primary', 'secondary', 'success', 'warning', 'danger'] as const).map((tone) => (
        <Badge key={tone} tone={tone} shape="modern" withDot>
          {t('Label')}
        </Badge>
      ))}
      {(['gray', 'blue', 'sky', 'indigo', 'purple', 'pink', 'orange', 'teal'] as const).map((h) => (
        <Badge key={h} color={h} withDot>
          {t('Label')}
        </Badge>
      ))}
    </div>
  </Tile>
);

export const Selection = ({ t }: { t: T }) => (
  <Tile title={t('Checkboxes, radios and toggles')}>
    <Row>
      <Checkbox aria-label={t('Unchecked')} />
      <Checkbox aria-label={t('Checked')} defaultChecked />
      <Checkbox aria-label={t('Indeterminate')} indeterminate />
      <Checkbox aria-label={t('Disabled')} disabled />
    </Row>
    <RadioGroup aria-label={t('Plan')} defaultValue="pro" orientation="horizontal">
      <Radio value="free" label={t('Free')} />
      <Radio value="pro" label={t('Pro')} />
    </RadioGroup>
    <Row>
      <Switch aria-label={t('Off')} />
      <Switch aria-label={t('On')} defaultChecked />
      <Switch aria-label={t('Small')} size="small" defaultChecked />
      <Switch aria-label={t('Disabled')} disabled />
    </Row>
    <Switch label={t('Email me updates')} description={t('Once a week')} defaultChecked />
  </Tile>
);

export const Inputs = ({ t }: { t: T }) => (
  <Tile title={t('Inputs')}>
    <InputField
      label={t('Team member')}
      required
      hint={t('Who works on this?')}
      iconStart={<Users />}
      placeholder={t('Select team member')}
    />
    <InputField
      label={t('Email')}
      type="email"
      iconStart={<Mail />}
      defaultValue="olivia@orbit.app"
      success={t('Looks good')}
    />
    <InputField
      label={t('Website')}
      prefix="https://"
      defaultValue="orbit"
      error={t('Enter a full address')}
    />
  </Tile>
);

/** A select shown open: a static list of options, like the dropdown under the trigger. */
export const PeoplePicker = ({ t }: { t: T }) => {
  const [chosen, setChosen] = useState(people[0].email);
  const me = people.find((p) => p.email === chosen)!;
  return (
    <Tile title={t('Select')}>
      <div className="sc-picker">
        <span className="sc-picker__label">{t('Team member')}</span>
        <div className="sc-picker__trigger" aria-hidden="true">
          <AvatarLabelGroup
            name={me.name}
            src={me.src}
            supportingText={`@${me.name.split(' ')[0].toLowerCase()}`}
            size="small"
          />
          <ChevronDown className="sc-icon" />
        </div>
        <List aria-label={t('Team member')}>
          {people.slice(0, 6).map((p) => (
            <ListItem
              key={p.email}
              icon={<Avatar name={p.name} src={p.src} size="xsmall" decorative />}
              title={p.name}
              description={`@${p.name.split(' ')[0].toLowerCase()}`}
              meta={
                p.email === chosen ? (
                  <Check className="sc-icon sc-icon--brand" aria-label={t('Selected')} />
                ) : undefined
              }
              onClick={() => setChosen(p.email)}
            />
          ))}
        </List>
      </div>
    </Tile>
  );
};

const spark = (seed: number) =>
  Array.from({ length: 14 }, (_, i) => 20 + Math.sin(i / 1.7 + seed) * 6 + i * 1.2);

export const Metrics = ({ t }: { t: T }) => (
  <Tile title={t('Metric cards')}>
    <MetricCard
      label={t('Total sessions')}
      value="526"
      change="2.4%"
      trend="up"
      comparison={t('vs last month')}
      chart={<Sparkline data={spark(1)} />}
      size="small"
    />
    <MetricCard
      label={t('Session duration')}
      value="2:24"
      change="8.6%"
      trend="up"
      comparison={t('vs last month')}
      chart={<Sparkline data={spark(3)} />}
      size="small"
    />
    <MetricCard
      label={t('Bounce rate')}
      value="38%"
      change="1.2%"
      trend="down"
      positive
      comparison={t('vs last month')}
      size="small"
    />
  </Tile>
);

export const Notification = ({ t }: { t: T }) => {
  const toast = useToast();
  const p = people[5];
  return (
    <Tile title={t('Notification')}>
      <div className="sc-notice">
        <Avatar name={p.name} src={p.src} status="online" />
        <div className="sc-notice__body">
          <span className="sc-notice__head">
            <strong>{p.name}</strong>
            <span className="sc-muted">{t('2 mins ago')}</span>
          </span>
          <span>{t('I’ve finished adding my notes!')}</span>
          <span className="sc-row sc-row--nowrap">
            <Button size="small" variant="secondary" appearance="text">
              {t('Dismiss')}
            </Button>
            <Button
              size="small"
              appearance="text"
              onClick={() => toast({ title: t('Reply sent'), tone: 'success' })}
            >
              {t('Reply')}
            </Button>
          </span>
        </div>
        <IconButton
          icon={<X />}
          label={t('Close')}
          variant="secondary"
          appearance="ghost"
          size="xsmall"
        />
      </div>
    </Tile>
  );
};

export const AiPrompt = ({ t }: { t: T }) => (
  <Tile title={t('AI prompt')}>
    <div className="sc-ai">
      <FeaturedIcon icon={<Sparkles />} />
      <p className="sc-ai__hi">
        {t('Hi Olivia,')}
        <br />
        <strong>{t('Welcome! How can I help?')}</strong>
      </p>
      <div className="sc-ai__chips">
        <Tag icon={<ImageIcon />}>{t('Create image')}</Tag>
        <Tag icon={<BarChart3 />}>{t('Analyze data')}</Tag>
        <Tag icon={<ListTodo />}>{t('Make a plan')}</Tag>
        <Tag icon={<FileText />}>{t('Summarize text')}</Tag>
      </div>
      <div className="sc-ai__box">
        <Textarea label={t('Prompt')} hideLabel rows={3} placeholder={t('Ask me anything…')} />
        <span className="sc-row sc-row--between">
          <AvatarLabelGroup name="Sienna" size="small" />
          <span className="sc-row">
            <IconButton
              icon={<Mic />}
              label={t('Voice')}
              variant="secondary"
              appearance="ghost"
              size="small"
            />
            <Button size="small" variant="secondary" appearance="outline" iconStart={<Paperclip />}>
              {t('Attach')}
            </Button>
          </span>
        </span>
      </div>
    </div>
  </Tile>
);

export const Navigation = ({ t }: { t: T }) => (
  <Tile title={t('Side navigation')}>
    <SideNav
      aria-label={t('Example navigation')}
      currentItem="dashboard"
      sections={[
        {
          title: t('General'),
          items: [
            { id: 'dashboard', label: t('Dashboard'), href: '#/demo', icon: <LayoutDashboard /> },
            {
              id: 'projects',
              label: t('Projects'),
              href: '#/demo',
              icon: <FolderKanban />,
              badge: 8,
            },
            { id: 'docs', label: t('Documents'), href: '#/demo', icon: <FileText /> },
            { id: 'calendar', label: t('Calendar'), href: '#/demo', icon: <CalendarIcon /> },
          ],
        },
        {
          title: t('Your teams'),
          items: [
            {
              id: 'catalog',
              label: 'Catalog',
              href: '#/demo',
              icon: <Avatar name="Catalog" size="xsmall" decorative />,
              badge: <Kbd>⌘1</Kbd>,
            },
            {
              id: 'warp',
              label: 'Warpspeed',
              href: '#/demo',
              icon: <Avatar name="Warpspeed" size="xsmall" decorative />,
              badge: <Kbd>⌘2</Kbd>,
            },
          ],
        },
      ]}
    />
  </Tile>
);

export const TabsTile = ({ t }: { t: T }) => (
  <Tile title={t('Tabs')}>
    {(['line', 'pill', 'segmented'] as const).map((a) => (
      <Tabs key={a} appearance={a} defaultValue="overview">
        <TabList label={`${a} ${t('tabs')}`} className="sc-scroll">
          <Tab value="overview">{t('Overview')}</Tab>
          <Tab value="activity" count={4}>
            {t('Activity')}
          </Tab>
          <Tab value="team">{t('Team')}</Tab>
        </TabList>
      </Tabs>
    ))}
    <ButtonGroup aria-label={t('Range')} attached defaultValue="week" className="sc-scroll">
      {['Day', 'Week', 'Month'].map((r) => (
        <Button
          key={r}
          value={r.toLowerCase()}
          size="small"
          variant="secondary"
          appearance="outline"
        >
          {t(r)}
        </Button>
      ))}
    </ButtonGroup>
  </Tile>
);

export const Avatars = ({ t }: { t: T }) => (
  <Tile title={t('Avatars')}>
    <Row>
      {(['xsmall', 'small', 'medium', 'large'] as const).map((s, i) => (
        <Avatar
          key={s}
          name={people[i].name}
          src={people[i].src}
          size={s}
          status={i === 3 ? 'online' : undefined}
        />
      ))}
      <Avatar name="Kristin Watson" size="large" verified />
    </Row>
    <AvatarGroup label={t('Team')} max={5}>
      {people.map((p) => (
        <Avatar key={p.email} name={p.name} src={p.src} />
      ))}
    </AvatarGroup>
    <AvatarLabelGroup
      name={people[0].name}
      src={people[0].src}
      supportingText={people[0].email}
      status="online"
    />
  </Tile>
);

export const ProgressTile = ({ t }: { t: T }) => (
  <Tile title={t('Progress')}>
    <Progress label={t('Uploading')} value={64} showValue />
    <Progress label={t('Storage')} value={88} tone="warning" showValue size="small" />
    <Row>
      <ProgressCircle label={t('Goal')} value={72} size="small" />
      <ProgressCircle
        label={t('Target')}
        value={78}
        shape="half"
        size="medium"
        caption={t('of $160K')}
      />
    </Row>
  </Tile>
);

export const Alerts = ({ t }: { t: T }) => (
  <Tile title={t('Alerts')}>
    <Alert variant="success" title={t('Changes saved')} onDismiss={() => {}}>
      {t('Your workspace is up to date.')}
    </Alert>
    <Alert
      variant="primary"
      appearance="solid"
      title={t('New version available')}
      actions={
        <Button size="small" variant="secondary" appearance="outline">
          {t('Update')}
        </Button>
      }
    >
      {t('Restart to get the latest features.')}
    </Alert>
  </Tile>
);

export const DateTile = ({ t, locale }: { t: T; locale: string }) => {
  const month = new Date(2026, 9, 1);
  const [range, setRange] = useState({
    start: new Date(2026, 9, 12),
    end: new Date(2026, 9, 18),
  } as { start: Date | null; end: Date | null });
  return (
    <Tile title={t('Date range')}>
      <Calendar
        mode="range"
        range={range}
        onRangeChange={setRange}
        defaultMonth={month}
        months={1}
        locale={locale}
        today={new Date(2026, 9, 15)}
      />
    </Tile>
  );
};

type Row3 = { id: string; name: string; status: string };
export const TableTile = ({ t }: { t: T }) => {
  const columns: TableColumn<Row3>[] = [
    { key: 'name', header: t('Invoice') },
    {
      key: 'status',
      header: t('Status'),
      render: (r) => (
        <Badge
          tone={r.status === 'Paid' ? 'success' : r.status === 'Pending' ? 'warning' : 'danger'}
          shape="modern"
          size="small"
          withDot
        >
          {t(r.status)}
        </Badge>
      ),
    },
  ];
  return (
    <Tile title={t('Table')}>
      <div className="sc-flush">
        <TableCard title={t('Recent invoices')} titleAs="h3" badge="3">
          <Table<Row3>
            caption={t('Recent invoices')}
            hideCaption
            columns={columns}
            rows={[
              { id: '1', name: '#3120', status: 'Paid' },
              { id: '2', name: '#3119', status: 'Pending' },
              { id: '3', name: '#3118', status: 'Failed' },
            ]}
          />
        </TableCard>
      </div>
    </Tile>
  );
};

/** A confirmation dialog drawn inline (not opened), to show its anatomy on the wall. */
export const DialogTile = ({ t }: { t: T }) => (
  <Tile title={t('Dialog')}>
    <div className="sc-dialog" role="group" aria-label={t('Delete project?')}>
      <FeaturedIcon icon={<Trash2 />} tone="danger" />
      <strong>{t('Delete project?')}</strong>
      <span className="sc-muted">{t('This removes it for everyone. It can’t be undone.')}</span>
      <span className="sc-row sc-row--end">
        <Button size="small" variant="secondary" appearance="outline">
          {t('Cancel')}
        </Button>
        <Button size="small" variant="danger">
          {t('Delete')}
        </Button>
      </span>
    </div>
  </Tile>
);

export const Overlays = ({ t }: { t: T }) => {
  const toast = useToast();
  return (
    <Tile title={t('Menus, tooltips and toasts')}>
      <Row>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" appearance="outline" iconEnd={<ChevronDown />}>
              {t('Options')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>{t('Rename')}</DropdownMenuItem>
            <DropdownMenuItem>{t('Duplicate')}</DropdownMenuItem>
            <DropdownMenuItem variant="danger">{t('Delete')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Tooltip content={t('Shows how this is calculated')} title="MRR" arrow>
          <IconButton
            icon={<Info />}
            label={t('About MRR')}
            variant="secondary"
            appearance="outline"
          />
        </Tooltip>
        <IconButton
          icon={<Search />}
          label={t('Search')}
          variant="secondary"
          appearance="outline"
        />
      </Row>
      <Row>
        {(['success', 'warning', 'danger'] as const).map((tone) => (
          <Button
            key={tone}
            size="small"
            variant={tone}
            appearance="outline"
            onClick={() =>
              toast({ title: t('Toast message'), description: t('This is how it looks.'), tone })
            }
          >
            {t('Show toast')}
          </Button>
        ))}
      </Row>
    </Tile>
  );
};

export const Product = ({ t }: { t: T }) => (
  <Tile title={t('Product card')}>
    <ProductCard
      title={t('AirPods Max 2, Experience Sound Differently')}
      rating={4.5}
      reviews={t('420 reviews')}
      price="$500"
      actions={
        <Button size="small" iconStart={<ShoppingCart />}>
          {t('Add to cart')}
        </Button>
      }
    />
  </Tile>
);
