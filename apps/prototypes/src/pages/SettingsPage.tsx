import { useState, type ReactNode } from 'react';
import {
  Avatar,
  AvatarLabelGroup,
  Badge,
  Button,
  ButtonGroup,
  ChooseCard,
  ChooseCardGroup,
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
  Table,
  Textarea,
  useToast,
  type TableColumn,
  type Theme,
} from '@ds/react';
import {
  Bell,
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
  Palette,
  Plug,
  Plus,
  Trash2,
  User,
  Users,
  Zap,
} from 'lucide-react';
import { integrations, invoices, members } from '../dashboard-data';
import { AppShell } from '../shell/AppShell';
import { TopBar } from '../shell/TopBar';
import './settings.css';

const sections = [
  {
    id: 'details',
    label: 'My details',
    icon: <User />,
    description: 'Your name, photo and profile.',
  },
  {
    id: 'password',
    label: 'Password',
    icon: <KeyRound />,
    description: 'Change your password and sign-in security.',
  },
  {
    id: 'team',
    label: 'Team',
    icon: <Users />,
    description: 'Invite people and manage their roles.',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: <Palette />,
    description: 'How Panda looks for you.',
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: <CreditCard />,
    description: 'Your plan, payment method and invoices.',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell />,
    count: 2,
    description: 'When and how we reach you.',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: <Plug />,
    description: 'Tools connected to your workspace.',
  },
];

/** A settings card: title and description, the fields, then Cancel/Save. */
function Card({
  title,
  description,
  children,
  actions,
  save = true,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  save?: boolean;
}) {
  const toast = useToast();
  return (
    <section className="set-card" aria-label={title}>
      <PageHeader
        size="small"
        titleAs="h2"
        title={title}
        description={description}
        actions={actions}
      />
      <div className="set-card__body">{children}</div>
      {save && (
        <footer className="set-card__footer">
          <Button variant="secondary" appearance="outline" size="small">
            Cancel
          </Button>
          <Button size="small" onClick={() => toast({ title: `${title} saved`, tone: 'success' })}>
            Save changes
          </Button>
        </footer>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ sections */

function Details() {
  const me = members[0];
  return (
    <>
      <Card title="Personal info" description="Update your photo and personal details.">
        <div className="set-photo">
          <Avatar name={me.name} src={me.src} size="xlarge" />
          <FileUpload id="photo" accept="image/*" hint="SVG, PNG, JPG or GIF (max. 800×400px)" />
        </div>
        <div className="set-two">
          <InputField label="First name" required defaultValue="Olivia" />
          <InputField label="Last name" required defaultValue="Rhye" />
        </div>
        <InputField
          label="Email address"
          required
          type="email"
          iconStart={<Mail />}
          defaultValue={me.email}
        />
        <div className="set-two">
          <InputField label="Role" defaultValue="Product Designer" />
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
        </div>
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
      </Card>
      <Card title="Profile" description="This shows on your public profile.">
        <InputField label="Username" prefix="panda.io/" defaultValue="olivia" />
        <Textarea
          label="Bio"
          description="Write a short introduction."
          maxLength={400}
          showCount
          rows={4}
          defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy and design systems."
        />
      </Card>
      <Card title="Portfolio projects" description="Share a few snippets of your work.">
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
      </Card>
    </>
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
      <Card title="Change password" description="Enter your current password, then a new one.">
        <InputField label="Current password" type="password" autoComplete="current-password" />
        <InputField
          label="New password"
          type="password"
          autoComplete="new-password"
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
        <InputField label="Confirm new password" type="password" autoComplete="new-password" />
      </Card>
      <Card
        title="Two-factor authentication"
        description="Ask for a code from your phone when you sign in."
        save={false}
      >
        <ul className="set-list">
          <li>
            <span className="stack-text">
              <strong>Authenticator app</strong>
              <span className="muted text-sm">
                Use an app like 1Password or Google Authenticator.
              </span>
            </span>
            <Switch aria-label="Authenticator app" defaultChecked />
          </li>
          <li>
            <span className="stack-text">
              <strong>Text message</strong>
              <span className="muted text-sm">Send a code to •••• 4821.</span>
            </span>
            <Switch aria-label="Text message codes" />
          </li>
        </ul>
      </Card>
    </>
  );
}

type Member = (typeof members)[number];

function Team() {
  const toast = useToast();
  const [invites, setInvites] = useState(['', '']);
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
    { key: 'active', header: 'Last active', hideBelow: 'large' },
    {
      key: 'actions',
      header: <span className="visually-hidden">Actions</span>,
      width: 48,
      render: (m) => (
        <IconButton
          icon={<Trash2 />}
          label={`Remove ${m.name}`}
          variant="secondary"
          appearance="ghost"
          size="small"
        />
      ),
    },
  ];
  return (
    <>
      <Card
        title="Invite team members"
        description="Get your projects moving faster by inviting your team."
        save={false}
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
            size="small"
            iconStart={<Plus />}
            onClick={() => setInvites((l) => [...l, ''])}
          >
            Add another
          </Button>
          <Button
            size="small"
            iconStart={<Mail />}
            onClick={() => toast({ title: 'Invites sent', tone: 'success' })}
          >
            Send invites
          </Button>
        </div>
      </Card>
      <Card
        title="Team members"
        description="People with access to this workspace."
        save={false}
        actions={<Badge tone="gray" shape="modern">{`${members.length} people`}</Badge>}
      >
        <div className="set-table">
          <Table<Member>
            caption="Team members"
            hideCaption
            columns={columns}
            rows={members}
            getRowId={(m) => m.email}
          />
        </div>
      </Card>
    </>
  );
}

function Appearance({ theme, onThemeChange }: { theme: Theme; onThemeChange: (t: Theme) => void }) {
  const set = (patch: Partial<Theme>) => onThemeChange({ ...theme, ...patch });
  return (
    <Card
      title="Theme"
      description="Changes apply straight away, across the whole app."
      save={false}
    >
      <strong className="set-label">Brand</strong>
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
      <strong className="set-label">Mode</strong>
      <ChooseCardGroup
        aria-label="Mode"
        orientation="horizontal"
        value={theme.mode}
        onValueChange={(v) => set({ mode: v as Theme['mode'] })}
      >
        <ChooseCard value="light" title="Light" description="Bright surfaces" />
        <ChooseCard value="dark" title="Dark" description="Easy on the eyes at night" />
      </ChooseCardGroup>
      <ul className="set-list">
        <li>
          <span className="stack-text">
            <strong>Density</strong>
            <span className="muted text-sm">Compact fits more on screen.</span>
          </span>
          <ButtonGroup
            aria-label="Density"
            attached
            value={theme.density}
            onValueChange={(v) => set({ density: v as Theme['density'] })}
          >
            <Button value="comfortable" variant="secondary" appearance="outline" size="small">
              Comfortable
            </Button>
            <Button value="compact" variant="secondary" appearance="outline" size="small">
              Compact
            </Button>
          </ButtonGroup>
        </li>
        <li>
          <span className="stack-text">
            <strong>Corners</strong>
            <span className="muted text-sm">How round buttons, cards and fields are.</span>
          </span>
          <ButtonGroup
            aria-label="Corners"
            attached
            value={theme.radius}
            onValueChange={(v) => set({ radius: v as Theme['radius'] })}
          >
            <Button value="square" variant="secondary" appearance="outline" size="small">
              Square
            </Button>
            <Button value="round" variant="secondary" appearance="outline" size="small">
              Round
            </Button>
            <Button value="pills" variant="secondary" appearance="outline" size="small">
              Pills
            </Button>
          </ButtonGroup>
        </li>
        <li>
          <span className="stack-text">
            <strong>Language</strong>
            <span className="muted text-sm">Arabic switches the layout to right-to-left.</span>
          </span>
          <Select
            label="Language"
            hideLabel
            size="small"
            value={theme.language}
            onValueChange={(v) => set({ language: v as Theme['language'] })}
          >
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ar">العربية</SelectItem>
          </Select>
        </li>
      </ul>
    </Card>
  );
}

type Invoice = (typeof invoices)[number];

function Billing() {
  const columns: TableColumn<Invoice>[] = [
    { key: 'plan', header: 'Invoice' },
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
      <Card title="Plan" description="Billed monthly. Change any time.">
        <ChooseCardGroup aria-label="Plan" defaultValue="business">
          <ChooseCard
            value="basic"
            icon={<Layers />}
            title="Basic"
            description="Up to 10 users and 20 GB."
            price="$10/mo"
          />
          <ChooseCard
            value="business"
            icon={<Zap />}
            title="Business"
            description="Up to 20 users and 40 GB."
            price="$20/mo"
          />
          <ChooseCard
            value="enterprise"
            icon={<Building2 />}
            title="Enterprise"
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
      </Card>
      <Card title="Payment method" description="Charged on the 1st of each month." save={false}>
        <div className="set-method">
          <FeaturedIcon icon={<CreditCard />} appearance="modern" shape="square" />
          <span className="stack-text">
            <strong>Visa ending in 1234</strong>
            <span className="muted text-sm">Expires 06/2028</span>
          </span>
          <Button variant="secondary" appearance="outline" size="small">
            Edit
          </Button>
        </div>
      </Card>
      <Card
        title="Billing history"
        save={false}
        actions={
          <Button variant="secondary" appearance="outline" size="small" iconStart={<Download />}>
            Download all
          </Button>
        }
      >
        <div className="set-table">
          <Table<Invoice> caption="Billing history" hideCaption columns={columns} rows={invoices} />
        </div>
      </Card>
    </>
  );
}

function Notifications() {
  const groups = [
    {
      title: 'Activity',
      description: 'When something changes that involves you.',
      rows: [
        "I'm mentioned in a message",
        'Someone replies to my message',
        "I'm assigned a task",
        'A task is overdue',
      ],
    },
    {
      title: 'Summaries',
      description: 'Regular digests of your workspace.',
      rows: ['Daily summary', 'Weekly summary', 'Monthly report'],
    },
  ];
  return (
    <>
      {groups.map((g) => (
        <Card key={g.title} title={g.title} description={g.description}>
          <ul className="set-list">
            {g.rows.map((label, i) => (
              <li key={label}>
                <span>{label}</span>
                <ButtonGroup
                  aria-label={label}
                  attached
                  defaultValue={i % 2 ? 'email' : 'app'}
                  className="scroll-x"
                >
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
        </Card>
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
    <Card
      title="Connected apps"
      description="Turn an integration on to sync it with Panda."
      save={false}
    >
      <ul className="set-list">
        {integrations.map((i) => (
          <li key={i.id}>
            <span className="set-app">
              <FeaturedIcon icon={icon[i.id]} appearance="modern" shape="square" />
              <span className="stack-text">
                <strong>{i.name}</strong>
                <span className="muted text-sm">{i.description}</span>
              </span>
            </span>
            <Switch
              aria-label={`Connect ${i.name}`}
              checked={on[i.id]}
              onCheckedChange={(v) => setOn((s) => ({ ...s, [i.id]: v }))}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* --------------------------------------------------------------------- page */

/** Settings: a list of sections on the start side, the selected section's cards beside it. */
export default function SettingsPage({
  section = 'details',
  theme,
  onThemeChange,
}: {
  section?: string;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
}) {
  const current = sections.find((s) => s.id === section) ?? sections[0];
  const body: Record<string, ReactNode> = {
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
            { label: current.label },
          ]}
        />
        <PageHeader title="Settings" description="Manage your account, team and workspace." />
        <div className="settings__layout">
          <nav className="settings__nav" aria-label="Settings sections">
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <Button
                    appearance="text"
                    variant="secondary"
                    iconStart={s.icon}
                    href={s.id === 'details' ? '#/app/settings' : `#/app/settings/${s.id}`}
                    aria-current={s.id === current.id ? 'page' : undefined}
                    className="settings__link"
                  >
                    <span className="settings__label">{s.label}</span>
                    {s.count && (
                      <Badge
                        tone="primary"
                        size="small"
                        shape="modern"
                        count={s.count}
                        label={`${s.count} new`}
                      />
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="settings__content">
            <div className="stack-text">
              <h2 className="settings__title">{current.label}</h2>
              <span className="muted text-sm">{current.description}</span>
            </div>
            {body[current.id]}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
