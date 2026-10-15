import { useState, type ReactNode } from 'react';
import {
  Avatar,
  AvatarLabelGroup,
  Badge,
  Button,
  ButtonGroup,
  ChooseCard,
  ChooseCardGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FeaturedIcon,
  FileUpload,
  FileUploadItem,
  IconButton,
  InputField,
  PageHeader,
  Progress,
  Select,
  SelectItem,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableCard,
  Tabs,
  Textarea,
  useToast,
  type TableColumn,
  type Theme,
} from '@ds/react';
import {
  Building2,
  Calendar,
  Check,
  Clock,
  CreditCard,
  Download,
  HardDrive,
  KeyRound,
  Layers,
  Mail,
  MessageSquare,
  MoreVertical,
  Plus,
  Zap,
} from 'lucide-react';
import { integrations, invoices, members } from '../dashboard-data';
import { go } from '../router';
import { AppShell } from '../shell/AppShell';
import { TopBar } from '../shell/TopBar';
import './settings.css';

const sections = [
  { id: 'details', label: 'My details' },
  { id: 'password', label: 'Password' },
  { id: 'team', label: 'Team' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'billing', label: 'Billing' },
  { id: 'notifications', label: 'Notifications', count: 2 },
  { id: 'integrations', label: 'Integrations' },
];

/** A settings row: what it is on the start side, its controls on the end side. */
function Row({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="set-row">
      <div className="set-row__label">
        <strong>{title}</strong>
        {description && <span className="muted">{description}</span>}
      </div>
      <div className="set-row__control">{children}</div>
    </div>
  );
}

/** The heading of a section, with optional actions. */
const Section = ({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
}) => (
  <PageHeader
    size="small"
    titleAs="h2"
    title={title}
    description={description}
    actions={actions}
    divider
  />
);

/* ------------------------------------------------------------------ sections */

function Details() {
  return (
    <div className="set-form">
      <div className="set-two">
        <InputField label="First name" required defaultValue="Olivia" />
        <InputField label="Last name" required defaultValue="Rhye" />
      </div>
      <InputField
        label="Email address"
        required
        type="email"
        iconStart={<Mail />}
        defaultValue={members[0].email}
      />
      <div className="set-photo">
        <Avatar name={members[0].name} src={members[0].src} size="large" decorative />
        <FileUpload id="photo" accept="image/*" hint="SVG, PNG, JPG or GIF (max. 800×400px)" />
      </div>
      <InputField label="Role" required defaultValue="Product Designer" />
      <Select label="Country" defaultValue="au">
        <SelectItem value="au" supportingText="AU">
          Australia
        </SelectItem>
        <SelectItem value="ae" supportingText="AE">
          United Arab Emirates
        </SelectItem>
        <SelectItem value="gb" supportingText="GB">
          United Kingdom
        </SelectItem>
        <SelectItem value="us" supportingText="US">
          United States
        </SelectItem>
      </Select>
      <Select label="Timezone" defaultValue="pst">
        <SelectItem value="pst" icon={<Clock />} supportingText="UTC−08:00">
          Pacific Standard Time
        </SelectItem>
        <SelectItem value="gmt" icon={<Clock />} supportingText="UTC±00:00">
          Greenwich Mean Time
        </SelectItem>
        <SelectItem value="gst" icon={<Clock />} supportingText="UTC+04:00">
          Gulf Standard Time
        </SelectItem>
      </Select>
      <Textarea
        label="Your bio"
        description="Write a short introduction."
        maxLength={400}
        showCount
        rows={5}
        defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialize in UX/UI design, brand strategy and design systems."
      />
      <div className="set-field">
        <strong className="set-field__label">Portfolio projects</strong>
        <span className="muted text-sm">Share a few snippets of your work.</span>
        <FileUpload id="portfolio" multiple hint="SVG, PNG, JPG or GIF (max. 800×400px)">
          <FileUploadItem
            name="Tech design requirements.pdf"
            size="200 KB"
            progress={100}
            onRemove={() => {}}
          />
          <FileUploadItem
            name="Dashboard recording.mp4"
            size="1 MB"
            progress={40}
            onRemove={() => {}}
          />
          <FileUploadItem
            name="Dashboard prototype FINAL.fig"
            size="4 MB"
            progress={80}
            onRemove={() => {}}
          />
        </FileUpload>
      </div>
    </div>
  );
}

function Password() {
  const [pw, setPw] = useState('');
  const rules = [
    { ok: pw.length >= 8, text: 'At least 8 characters' },
    { ok: /[A-Z]/.test(pw) && /[a-z]/.test(pw), text: 'Upper and lower case letters' },
    { ok: /\d/.test(pw), text: 'At least one number' },
  ];
  return (
    <>
      <Section title="Password" description="Please enter your current password to change it." />
      <Row title="Current password">
        <InputField label="Current password" hideLabel type="password" iconStart={<KeyRound />} />
      </Row>
      <Row title="New password" description="Your new password must meet these rules.">
        <InputField
          label="New password"
          hideLabel
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <ul className="set-rules" aria-label="Password rules">
          {rules.map((r) => (
            <li key={r.text} className={r.ok ? 'set-rules__ok' : undefined}>
              <Check aria-hidden="true" />
              {r.text}
              <span className="visually-hidden">{r.ok ? ' (met)' : ' (not met)'}</span>
            </li>
          ))}
        </ul>
      </Row>
      <Row title="Confirm new password">
        <InputField label="Confirm new password" hideLabel type="password" />
      </Row>
    </>
  );
}

type Member = (typeof members)[number];

function Team() {
  const toast = useToast();
  const [invites, setInvites] = useState(['', '', '']);
  const columns: TableColumn<Member>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (m) => (
        <AvatarLabelGroup name={m.name} src={m.src} supportingText={m.email} size="small" />
      ),
    },
    {
      key: 'admin',
      header: 'Role',
      render: (m) => (
        <Badge tone={m.admin ? 'primary' : 'gray'} shape="modern" size="small">
          {m.admin ? 'Admin' : 'Read-only'}
        </Badge>
      ),
    },
    { key: 'active', header: 'Last active', hideBelow: 'medium' },
    {
      key: 'actions',
      header: <span className="visually-hidden">Actions</span>,
      align: 'end',
      render: (m) => (
        <span className="row">
          <Button
            appearance="text"
            variant="secondary"
            size="small"
            aria-label={`Delete ${m.name}`}
          >
            Delete
          </Button>
          <Button appearance="text" size="small" aria-label={`Edit ${m.name}`}>
            Edit
          </Button>
        </span>
      ),
    },
  ];
  return (
    <>
      <Section
        title="Team management"
        description="Manage your team members and their account permissions."
      />
      <Row
        title="Invite team members"
        description="Get your projects up and running faster by inviting your team."
      >
        {invites.map((v, i) => (
          <div key={i} className="set-invite">
            <InputField
              label={`Email address ${i + 1}`}
              hideLabel
              type="email"
              iconStart={<Mail />}
              placeholder="you@example.com"
              value={v}
              onChange={(e) =>
                setInvites((list) => list.map((x, j) => (j === i ? e.target.value : x)))
              }
            />
            <Select label={`Role for invite ${i + 1}`} hideLabel defaultValue="read">
              <SelectItem value="read">Read only</SelectItem>
              <SelectItem value="edit">Editor</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </Select>
          </div>
        ))}
        <div className="set-actions">
          <Button
            appearance="text"
            variant="secondary"
            iconStart={<Plus />}
            onClick={() => setInvites((l) => [...l, ''])}
          >
            Add another
          </Button>
          <Button onClick={() => toast({ title: 'Invites sent', tone: 'success' })}>
            Send invites
          </Button>
        </div>
      </Row>
      <Row
        title="Team members"
        description="Manage your existing team and change roles and permissions."
      >
        <TableCard title="Members" titleAs="h3" badge={`${members.length} people`}>
          <Table<Member>
            caption="Team members"
            hideCaption
            columns={columns}
            rows={members}
            getRowId={(m) => m.email}
            selectable
            rowLabel={(m) => `Select ${m.name}`}
          />
        </TableCard>
      </Row>
    </>
  );
}

function Appearance({ theme, onThemeChange }: { theme: Theme; onThemeChange: (t: Theme) => void }) {
  const set = (patch: Partial<Theme>) => onThemeChange({ ...theme, ...patch });
  return (
    <>
      <Section
        title="Appearance"
        description="Change how Panda looks and feels. Changes apply right away."
      />
      <Row title="Brand" description="Pick the brand palette.">
        <ChooseCardGroup
          aria-label="Brand"
          orientation="horizontal"
          value={theme.brand}
          onValueChange={(v) => set({ brand: v as Theme['brand'] })}
        >
          <ChooseCard value="diamond" title="Diamond" description="Violet" />
          <ChooseCard value="amber" title="Amber" description="Warm" />
          <ChooseCard value="opal" title="Opal" description="Cool" />
        </ChooseCardGroup>
      </Row>
      <Row title="Display preference" description="Switch between light and dark mode.">
        <ChooseCardGroup
          aria-label="Mode"
          orientation="horizontal"
          value={theme.mode}
          onValueChange={(v) => set({ mode: v as Theme['mode'] })}
        >
          <ChooseCard value="light" title="Light mode" description="Bright surfaces" />
          <ChooseCard value="dark" title="Dark mode" description="Easy on the eyes at night" />
        </ChooseCardGroup>
      </Row>
      <Row title="Density" description="Compact fits more on screen.">
        <ButtonGroup
          aria-label="Density"
          attached
          value={theme.density}
          onValueChange={(v) => set({ density: v as Theme['density'] })}
        >
          <Button value="comfortable" variant="secondary" appearance="outline">
            Comfortable
          </Button>
          <Button value="compact" variant="secondary" appearance="outline">
            Compact
          </Button>
        </ButtonGroup>
      </Row>
      <Row title="Corners" description="How rounded buttons, cards and fields are.">
        <ButtonGroup
          aria-label="Corners"
          attached
          value={theme.radius}
          onValueChange={(v) => set({ radius: v as Theme['radius'] })}
        >
          <Button value="square" variant="secondary" appearance="outline">
            Square
          </Button>
          <Button value="round" variant="secondary" appearance="outline">
            Round
          </Button>
          <Button value="pills" variant="secondary" appearance="outline">
            Pills
          </Button>
        </ButtonGroup>
      </Row>
      <Row title="Language" description="Arabic switches the layout to right-to-left.">
        <Select
          label="Language"
          hideLabel
          value={theme.language}
          onValueChange={(v) => set({ language: v as Theme['language'] })}
        >
          <SelectItem value="en" supportingText="LTR">
            English
          </SelectItem>
          <SelectItem value="ar" supportingText="RTL">
            العربية
          </SelectItem>
        </Select>
      </Row>
    </>
  );
}

type Invoice = (typeof invoices)[number];

function Billing() {
  const columns: TableColumn<Invoice>[] = [
    { key: 'plan', header: 'Invoice', sortable: true },
    { key: 'amount', header: 'Amount', hideBelow: 'small' },
    { key: 'date', header: 'Date', hideBelow: 'medium' },
    {
      key: 'status',
      header: 'Status',
      render: (i) => (
        <Badge
          tone={i.status === 'Paid' ? 'success' : 'warning'}
          shape="modern"
          size="small"
          withDot
        >
          {i.status}
        </Badge>
      ),
    },
    {
      key: 'dl',
      header: <span className="visually-hidden">Download</span>,
      width: 48,
      render: (i) => (
        <IconButton
          icon={<Download />}
          label={`Download ${i.plan}`}
          variant="secondary"
          appearance="ghost"
          size="small"
        />
      ),
    },
  ];
  return (
    <>
      <Section title="Billing" description="Manage your plan, payment details and invoices." />
      <Row title="Current plan" description="Billed monthly. Change any time.">
        <ChooseCardGroup aria-label="Plan" defaultValue="business">
          <ChooseCard
            value="basic"
            icon={<Layers />}
            title="Basic plan"
            description="Up to 10 users, 20 GB data and every feature."
            price="$10/mo"
          />
          <ChooseCard
            value="business"
            icon={<Zap />}
            title="Business plan"
            description="Up to 20 users, 40 GB data and every feature."
            price="$20/mo"
          />
          <ChooseCard
            value="enterprise"
            icon={<Building2 />}
            title="Enterprise plan"
            description="Unlimited users and data."
            price="$40/mo"
          />
        </ChooseCardGroup>
        <Progress
          label="Seats used"
          value={14}
          max={20}
          showValue
          formatValue={(v, m) => `${v} of ${m}`}
        />
      </Row>
      <Row title="Payment method" description="Charged on the 1st of each month.">
        <div className="set-card">
          <FeaturedIcon icon={<CreditCard />} appearance="modern" shape="square" />
          <span className="stack-text">
            <strong>Visa ending in 1234</strong>
            <span className="muted text-sm">Expires 06/2028 · Updated Jan 22, 2026</span>
          </span>
          <Button variant="secondary" appearance="outline" size="small">
            Edit
          </Button>
        </div>
      </Row>
      <TableCard
        title="Billing history"
        titleAs="h3"
        actions={
          <Button variant="secondary" appearance="outline" size="small" iconStart={<Download />}>
            Download all
          </Button>
        }
      >
        <Table<Invoice>
          caption="Billing history"
          hideCaption
          columns={columns}
          rows={invoices}
          selectable
          rowLabel={(i) => `Select ${i.plan}`}
        />
      </TableCard>
    </>
  );
}

function Notifications() {
  const groups = [
    {
      title: 'General notifications',
      description: 'When something changes that involves you.',
      rows: [
        "I'm mentioned in a message",
        'Someone replies to any message',
        "I'm assigned a task",
        'A task is overdue',
      ],
    },
    {
      title: 'Summaries',
      description: 'When summaries and reports are ready.',
      rows: ['Daily summary', 'Weekly summary', 'Monthly summary'],
    },
  ];
  return (
    <>
      <Section title="Notifications" description="Choose when and how you’re notified." />
      {groups.map((g) => (
        <Row key={g.title} title={g.title} description={g.description}>
          <ul className="set-choices">
            {g.rows.map((label, i) => (
              <li key={label}>
                <span>{label}</span>
                <ButtonGroup aria-label={label} attached defaultValue={i % 2 ? 'email' : 'app'}>
                  <Button value="none" variant="secondary" appearance="outline" size="small">
                    None
                  </Button>
                  <Button value="app" variant="secondary" appearance="outline" size="small">
                    In-app
                  </Button>
                  <Button value="email" variant="secondary" appearance="outline" size="small">
                    Email
                  </Button>
                </ButtonGroup>
              </li>
            ))}
          </ul>
        </Row>
      ))}
    </>
  );
}

function Integrations() {
  const [on, setOn] = useState(() => Object.fromEntries(integrations.map((i) => [i.id, i.on])));
  const icon: Record<string, ReactNode> = {
    chat: <MessageSquare />,
    calendar: <Calendar />,
    storage: <HardDrive />,
    crm: <Building2 />,
  };
  return (
    <>
      <Section title="Integrations" description="Connect the tools your team already uses." />
      <div className="set-grid">
        {integrations.map((i) => (
          <article key={i.id} className="set-integration">
            <div className="row row--between">
              <FeaturedIcon icon={icon[i.id]} appearance="modern" shape="square" />
              <Switch
                aria-label={`Connect ${i.name}`}
                checked={on[i.id]}
                onCheckedChange={(v) => setOn((s) => ({ ...s, [i.id]: v }))}
              />
            </div>
            <strong>{i.name}</strong>
            <span className="muted text-sm">{i.description}</span>
            <div className="row row--between">
              <Badge tone={on[i.id] ? 'success' : 'gray'} shape="modern" size="small" withDot>
                {on[i.id] ? 'Connected' : 'Not connected'}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton
                    icon={<MoreVertical />}
                    label={`Options for ${i.name}`}
                    variant="secondary"
                    appearance="ghost"
                    size="small"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Configure</DropdownMenuItem>
                  <DropdownMenuItem variant="danger">Remove</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

/* --------------------------------------------------------------------- page */

/** Settings: a profile cover, section tabs and one section at a time. */
export default function SettingsPage({
  section = 'details',
  theme,
  onThemeChange,
}: {
  section?: string;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
}) {
  const toast = useToast();
  const me = members[0];
  const current = sections.some((s) => s.id === section) ? section : 'details';
  const label = sections.find((s) => s.id === current)!.label;
  const panels: Record<string, ReactNode> = {
    details: <Details />,
    password: <Password />,
    team: <Team />,
    appearance: <Appearance theme={theme} onThemeChange={onThemeChange} />,
    billing: <Billing />,
    notifications: <Notifications />,
    integrations: <Integrations />,
  };

  return (
    <AppShell current="settings">
      <div className="settings">
        <TopBar
          trail={[
            { label: 'Home', href: '#/dashboard' },
            { label: 'Settings', href: '#/app/settings' },
            { label },
          ]}
        />

        <div className="settings__cover" aria-hidden="true" />
        <div className="settings__head">
          <Avatar name={me.name} src={me.src} size="xlarge" verified className="settings__avatar" />
          <PageHeader
            title={me.name}
            description="@olivia · Product Designer"
            actions={
              <>
                <Button variant="secondary" appearance="outline">
                  Cancel
                </Button>
                <Button onClick={() => toast({ title: 'Settings saved', tone: 'success' })}>
                  Save
                </Button>
              </>
            }
          />
        </div>

        <Tabs
          appearance="line"
          value={current}
          onValueChange={(v) => go(v === 'details' ? '/app/settings' : `/app/settings/${v}`)}
        >
          <TabList label="Settings sections" className="settings__tabs">
            {sections.map((s) => (
              <Tab key={s.id} value={s.id} count={s.count}>
                {s.label}
              </Tab>
            ))}
          </TabList>
          {sections.map((s) => (
            <TabPanel key={s.id} value={s.id}>
              <div className="set-section">{s.id === current && panels[s.id]}</div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </AppShell>
  );
}
