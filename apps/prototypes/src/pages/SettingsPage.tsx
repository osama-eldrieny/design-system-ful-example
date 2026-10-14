import { useState, type ReactNode } from 'react';
import {
  AvatarLabelGroup,
  Avatar,
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
} from '@ds/react';
import {
  Building2,
  Calendar,
  CreditCard,
  Download,
  HardDrive,
  Layers,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  Trash2,
  Zap,
} from 'lucide-react';
import { integrations, invoices, members } from '../dashboard-data';
import { go } from '../router';
import { AdminShell } from '../shell/AdminShell';

const tabs = [
  { id: 'details', label: 'My details' },
  { id: 'team', label: 'Team' },
  { id: 'billing', label: 'Billing' },
  { id: 'notifications', label: 'Notifications', count: 2 },
  { id: 'integrations', label: 'Integrations' },
];

/** One settings row: what it is on the start side, its fields on the end side. */
const Row = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) => (
  <div className="proto-setting">
    <div className="proto-setting__label">
      <strong>{title}</strong>
      {description && <span className="proto-muted">{description}</span>}
    </div>
    <div className="proto-setting__control">{children}</div>
  </div>
);

type Member = (typeof members)[number];
const memberColumns: TableColumn<Member>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (m) => (
      <AvatarLabelGroup name={m.name} src={m.src} supportingText={m.email} size="small" />
    ),
  },
  { key: 'role', header: 'Role', hideBelow: 'large' },
  { key: 'added', header: 'Date added', hideBelow: 'medium' },
  { key: 'active', header: 'Last active', hideBelow: 'small' },
  {
    key: 'actions',
    header: <span className="proto-visually-hidden">Actions</span>,
    width: 88,
    render: (m) => (
      <span className="proto-row-actions">
        <IconButton
          icon={<Trash2 />}
          label={`Remove ${m.name}`}
          variant="secondary"
          appearance="ghost"
          size="small"
        />
        <IconButton
          icon={<Pencil />}
          label={`Edit ${m.name}`}
          variant="secondary"
          appearance="ghost"
          size="small"
        />
      </span>
    ),
  },
];

type Invoice = (typeof invoices)[number];
const invoiceColumns: TableColumn<Invoice>[] = [
  { key: 'plan', header: 'Invoice', sortable: true },
  { key: 'amount', header: 'Amount', hideBelow: 'small' },
  { key: 'date', header: 'Date', hideBelow: 'medium' },
  {
    key: 'status',
    header: 'Status',
    render: (i) => (
      <Badge tone={i.status === 'Paid' ? 'success' : 'warning'} shape="modern" size="small" withDot>
        {i.status}
      </Badge>
    ),
  },
  {
    key: 'download',
    header: <span className="proto-visually-hidden">Download</span>,
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

const notificationRows = {
  general: [
    "I'm mentioned in a message",
    'Someone replies to any message',
    "I'm assigned a task",
    'A task is overdue',
    'A task status is updated',
  ],
  summary: ['Daily summary', 'Weekly summary', 'Monthly summary', 'Quarterly summary'],
};
const integrationIcon: Record<string, ReactNode> = {
  chat: <MessageSquare />,
  calendar: <Calendar />,
  storage: <HardDrive />,
  crm: <Building2 />,
};

/** Settings: account details, team, plan and billing, notifications and integrations. */
export default function SettingsPage({ section = 'details' }: { section?: string }) {
  const toast = useToast();
  const me = members[0];
  const current = tabs.some((t) => t.id === section) ? section : 'details';
  const [connected, setConnected] = useState(() =>
    Object.fromEntries(integrations.map((i) => [i.id, i.on])),
  );
  const save = () => toast({ title: 'Settings saved', tone: 'success' });
  const actions = (
    <>
      <Button variant="secondary" appearance="outline">
        Cancel
      </Button>
      <Button onClick={save}>Save</Button>
    </>
  );

  return (
    <AdminShell
      current="settings"
      trail={[{ label: 'Home', href: '#/admin' }, { label: 'Settings' }]}
    >
      <div className="proto-page">
        <PageHeader title="Settings" description="Manage your account, team and plan." />
        <Tabs
          appearance="segmented"
          value={current}
          onValueChange={(v) => go(v === 'details' ? '/settings' : `/settings/${v}`)}
        >
          <TabList label="Settings sections">
            {tabs.map((t) => (
              <Tab key={t.id} value={t.id} count={t.count}>
                {t.label}
              </Tab>
            ))}
          </TabList>

          <TabPanel value="details">
            <div className="proto-settings">
              <PageHeader
                size="small"
                titleAs="h2"
                title="Personal info"
                description="Update your photo and personal details."
                actions={actions}
                divider
              />
              <Row title="Name">
                <div className="proto-two">
                  <InputField label="First name" hideLabel defaultValue="Olivia" required />
                  <InputField label="Last name" hideLabel defaultValue="Rhye" required />
                </div>
              </Row>
              <Row title="Email address">
                <InputField
                  label="Email address"
                  hideLabel
                  type="email"
                  iconStart={<Mail />}
                  defaultValue={me.email}
                />
              </Row>
              <Row title="Your photo" description="Shown on your profile and in comments.">
                <div className="proto-photo">
                  <Avatar name={me.name} src={me.src} size="xlarge" decorative />
                  <FileUpload
                    id="photo-upload"
                    accept="image/*"
                    hint="SVG, PNG, JPG or GIF (max. 800×400px)"
                  />
                </div>
              </Row>
              <Row title="Role">
                <InputField label="Role" hideLabel defaultValue={me.role} />
              </Row>
              <Row title="Country">
                <Select label="Country" hideLabel defaultValue="au">
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
              </Row>
              <Row title="Timezone">
                <Select label="Timezone" hideLabel defaultValue="pst">
                  <SelectItem value="pst" supportingText="UTC−08:00">
                    Pacific Standard Time
                  </SelectItem>
                  <SelectItem value="gmt" supportingText="UTC±00:00">
                    Greenwich Mean Time
                  </SelectItem>
                  <SelectItem value="gst" supportingText="UTC+04:00">
                    Gulf Standard Time
                  </SelectItem>
                </Select>
              </Row>
              <Row title="Bio" description="Write a short introduction.">
                <Textarea
                  label="Bio"
                  hideLabel
                  maxLength={400}
                  showCount
                  defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialize in UX/UI design, brand strategy and design systems."
                />
              </Row>
              <Row title="Portfolio projects" description="Share a few snippets of your work.">
                <FileUpload
                  id="portfolio-upload"
                  multiple
                  hint="SVG, PNG, JPG or GIF (max. 800×400px)"
                >
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
              </Row>
            </div>
          </TabPanel>

          <TabPanel value="team">
            <div className="proto-settings">
              <PageHeader
                size="small"
                titleAs="h2"
                title="Team members"
                description="Manage your team members and their account permissions."
                actions={<Button iconStart={<Plus />}>Add team member</Button>}
                divider
              />
              <Row
                title="Admin users"
                description="Admins can add and remove users and manage organization settings."
              >
                <TableCard
                  title="Admins"
                  titleAs="h3"
                  badge={`${members.filter((m) => m.admin).length}`}
                >
                  <Table<Member>
                    caption="Admin users"
                    hideCaption
                    columns={memberColumns}
                    rows={members.filter((m) => m.admin)}
                    getRowId={(m) => m.email}
                  />
                </TableCard>
              </Row>
              <Row
                title="Account users"
                description="Account users can view and review data, but not change settings."
              >
                <TableCard
                  title="Members"
                  titleAs="h3"
                  badge={`${members.filter((m) => !m.admin).length}`}
                >
                  <Table<Member>
                    caption="Account users"
                    hideCaption
                    columns={memberColumns}
                    rows={members.filter((m) => !m.admin)}
                    getRowId={(m) => m.email}
                  />
                </TableCard>
              </Row>
            </div>
          </TabPanel>

          <TabPanel value="billing">
            <div className="proto-settings">
              <PageHeader
                size="small"
                titleAs="h2"
                title="Plan"
                description="Change your plan or payment details."
                divider
              />
              <Row title="Your plan" description="Billed monthly. Change any time.">
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
              </Row>
              <Row title="Payment method" description="Charged on the 1st of each month.">
                <div className="proto-payment">
                  <FeaturedIcon icon={<CreditCard />} appearance="modern" shape="square" />
                  <span className="proto-stack-text">
                    <strong>Visa ending in 1234</strong>
                    <span className="proto-muted">Expires 06/2028</span>
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
                  <Button
                    variant="secondary"
                    appearance="outline"
                    size="small"
                    iconStart={<Download />}
                  >
                    Download all
                  </Button>
                }
              >
                <Table<Invoice>
                  caption="Billing history"
                  hideCaption
                  columns={invoiceColumns}
                  rows={invoices}
                  selectable
                  rowLabel={(i) => `Select ${i.plan}`}
                />
              </TableCard>
            </div>
          </TabPanel>

          <TabPanel value="notifications">
            <div className="proto-settings">
              <PageHeader
                size="small"
                titleAs="h2"
                title="Notifications"
                description="Choose when and how you’re notified."
                divider
              />
              <Row
                title="General notifications"
                description="When something changes that involves you."
              >
                <ul className="proto-choices">
                  {notificationRows.general.map((label, i) => (
                    <li key={label} className="proto-choice">
                      <span>{label}</span>
                      <ButtonGroup
                        aria-label={label}
                        attached
                        defaultValue={i === 4 ? 'email' : 'app'}
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
              </Row>
              <Row
                title="Summary notifications"
                description="When summaries and reports are ready."
              >
                <ul className="proto-choices">
                  {notificationRows.summary.map((label) => (
                    <li key={label} className="proto-choice">
                      <span>{label}</span>
                      <ButtonGroup aria-label={label} attached defaultValue="email">
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
            </div>
          </TabPanel>

          <TabPanel value="integrations">
            <div className="proto-settings">
              <PageHeader
                size="small"
                titleAs="h2"
                title="Integrations"
                description="Connect the tools your team already uses."
                divider
              />
              <div className="proto-integrations">
                {integrations.map((i) => (
                  <article key={i.id} className="proto-card proto-integration">
                    <div className="proto-integration__head">
                      <FeaturedIcon
                        icon={integrationIcon[i.id]}
                        appearance="modern"
                        shape="square"
                      />
                      <Switch
                        aria-label={`Connect ${i.name}`}
                        checked={connected[i.id]}
                        onCheckedChange={(on) => setConnected((c) => ({ ...c, [i.id]: on }))}
                      />
                    </div>
                    <strong>{i.name}</strong>
                    <span className="proto-muted">{i.description}</span>
                    <Badge
                      tone={connected[i.id] ? 'success' : 'gray'}
                      shape="modern"
                      size="small"
                      withDot
                    >
                      {connected[i.id] ? 'Connected' : 'Not connected'}
                    </Badge>
                  </article>
                ))}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </AdminShell>
  );
}
