/**
 * A small live preview for each component on the Introduction catalog, built with the real
 * components. Overlays (menus, dialogs, tooltips, toasts) are drawn in their open state with
 * static parts, since they can't open inline. Keyed by component id.
 */
import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionItem,
  ActivityFeed,
  Alert,
  AreaChart,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardDescription,
  CardTitle,
  Checkbox,
  ChooseCard,
  ChooseCardGroup,
  Code,
  Divider,
  EmptyState,
  FeaturedIcon,
  FileUpload,
  IconButton,
  InputField,
  Kbd,
  Link,
  List,
  ListItem,
  Logo,
  MetricCard,
  Pagination,
  Progress,
  ProgressCircle,
  ProductCard,
  Radio,
  RadioGroup,
  SearchField,
  SideNav,
  Skeleton,
  Slider,
  Sparkline,
  Spinner,
  Stat,
  Stepper,
  Switch,
  Tab,
  TabList,
  Tabs,
  Tag,
  Textarea,
  VerificationCodeInput,
  ColorPicker,
  FilterBar,
  InlineCTA,
  MessageThread,
  Rating,
  TreeView,
  PromptInput,
  NotificationCard,
  Attachment,
  DescriptionList,
  PaymentCard,
  PricingCard,
  IntegrationCard,
  SettingsList,
  KanbanBoard,
  EventCalendar,
  Carousel,
  VideoPlayer,
  Countdown,
} from '@ds/react';
import {
  Bell,
  Bold,
  Calendar,
  ChevronDown,
  Copy,
  FileText,
  Folder,
  Home,
  Italic,
  LayoutDashboard,
  Mail,
  Search,
  Settings,
  Sparkles,
  Trash2,
  Underline,
  User,
  X,
  Zap,
} from 'lucide-react';

const people = ['Olivia Rhye', 'Phoenix Baker', 'Lana Steiner', 'Demi Wilkinson'];
const spark = Array.from({ length: 12 }, (_, i) => 10 + Math.sin(i / 1.6) * 4 + i);

/** A static panel standing in for an open overlay. */
const Panel = ({ children, wide }: { children: ReactNode; wide?: boolean }) => (
  <div className={wide ? 'docs-preview-panel docs-preview-panel--wide' : 'docs-preview-panel'}>
    {children}
  </div>
);

export const previews: Record<string, ReactNode> = {
  accordion: (
    <Accordion type="single" defaultValue="a" collapsible className="docs-preview-fill">
      <AccordionItem value="a" title="Do I get free updates?">
        Yes, every plan includes them.
      </AccordionItem>
      <AccordionItem value="b" title="Can I change plans?">
        Any time.
      </AccordionItem>
    </Accordion>
  ),
  'activity-feed': (
    <ActivityFeed
      aria-label="Activity"
      className="docs-preview-fill"
      items={[
        {
          id: 1,
          avatar: { name: people[0] },
          title: (
            <>
              <strong>Olivia</strong> invited Lana
            </>
          ),
          time: '2m',
        },
        {
          id: 2,
          icon: <FileText />,
          title: (
            <>
              <strong>Report.pdf</strong> uploaded
            </>
          ),
          time: '1h',
        },
      ]}
    />
  ),
  alert: (
    <Alert variant="success" title="Changes saved" className="docs-preview-fill">
      Your workspace is up to date.
    </Alert>
  ),
  'apps-notifications': (
    <Panel>
      <div className="docs-preview-row">
        <Avatar name={people[1]} size="small" status="online" decorative />
        <span className="docs-preview-text">
          <strong>Phoenix Baker</strong> mentioned you
        </span>
      </div>
      <div className="docs-preview-row">
        <Avatar name={people[2]} size="small" decorative />
        <span className="docs-preview-text">
          <strong>Lana</strong> shared a file
        </span>
      </div>
    </Panel>
  ),
  avatar: (
    <div className="docs-preview-row">
      <AvatarGroup label="Team" max={3}>
        {people.map((n) => (
          <Avatar key={n} name={n} />
        ))}
      </AvatarGroup>
      <Avatar name="Kristin Watson" status="online" />
    </div>
  ),
  badge: (
    <div className="docs-preview-row">
      <Badge tone="success" shape="modern" withDot>
        Active
      </Badge>
      <Badge tone="secondary" shape="modern" withDot>
        Archived
      </Badge>
      <Badge color="purple">New</Badge>
    </div>
  ),
  breadcrumb: (
    <Breadcrumb
      homeIcon
      items={[{ label: 'Home', href: '#' }, { label: 'Projects', href: '#' }, { label: 'Billing' }]}
    />
  ),
  button: (
    <div className="docs-preview-row">
      <Button variant="secondary" appearance="outline" size="small">
        Stage for publish
      </Button>
      <Button size="small" iconStart={<Zap />}>
        Publish now
      </Button>
    </div>
  ),
  'button-group': (
    <ButtonGroup aria-label="Text style">
      <IconButton
        icon={<Bold />}
        label="Bold"
        variant="secondary"
        appearance="outline"
        size="small"
      />
      <IconButton
        icon={<Italic />}
        label="Italic"
        variant="secondary"
        appearance="outline"
        size="small"
      />
      <IconButton
        icon={<Underline />}
        label="Underline"
        variant="secondary"
        appearance="outline"
        size="small"
      />
    </ButtonGroup>
  ),
  card: (
    <Card appearance="outlined" className="docs-preview-card">
      <CardBody>
        <CardTitle>Design systems</CardTitle>
        <CardDescription>A practical guide with examples.</CardDescription>
      </CardBody>
    </Card>
  ),
  charts: (
    <div className="docs-preview-fill">
      <AreaChart
        title="Revenue"
        hideTitle
        data={spark.map((v, i) => ({ m: `${i + 1}`, v }))}
        xKey="m"
        series={[{ key: 'v', label: 'Revenue' }]}
        height={90}
        hideYAxis
        showGrid={false}
        showLegend={false}
      />
    </div>
  ),
  checkbox: (
    <Checkbox
      label="Remember me"
      description="Save my login details for next time."
      defaultChecked
    />
  ),
  'choose-card': (
    <ChooseCardGroup aria-label="Plan" defaultValue="basic" className="docs-preview-fill">
      <ChooseCard value="basic" title="Basic plan" description="Up to 10 users" price="$10/mo" />
    </ChooseCardGroup>
  ),
  code: <Code>npm install @ds/react</Code>,
  combobox: (
    <Panel>
      <InputField
        label="Assignee"
        hideLabel
        size="small"
        iconStart={<Search />}
        defaultValue="Oli"
      />
      <List aria-label="Matches">
        <ListItem icon={<Avatar name={people[0]} size="xsmall" decorative />} title="Olivia Rhye" />
        <ListItem
          icon={<Avatar name="Oliver Hart" size="xsmall" decorative />}
          title="Oliver Hart"
        />
      </List>
    </Panel>
  ),
  'command-menu': (
    <Panel wide>
      <InputField
        label="Search"
        hideLabel
        size="small"
        iconStart={<Search />}
        placeholder="Search or type a command…"
      />
      <List aria-label="Commands">
        <ListItem icon={<LayoutDashboard />} title="Dashboard" meta={<Kbd>⌘D</Kbd>} />
        <ListItem icon={<Settings />} title="Settings" meta={<Kbd>⌘,</Kbd>} />
      </List>
    </Panel>
  ),
  container: (
    <div className="docs-preview-frame">
      <div className="docs-preview-frame__inner">Content</div>
    </div>
  ),
  'date-picker': (
    <Button variant="secondary" appearance="outline" size="small" iconStart={<Calendar />}>
      Jan 6 – Jan 13, 2026
    </Button>
  ),
  divider: (
    <div className="docs-preview-fill">
      <Divider label="or" />
    </div>
  ),
  drawer: (
    <div className="docs-preview-frame docs-preview-frame--drawer">
      <div className="docs-preview-frame__side">
        <strong>Order #3120</strong>
        <Skeleton lines={3} />
      </div>
    </div>
  ),
  'dropdown-menu': (
    <Panel>
      <List aria-label="Menu">
        <ListItem icon={<User />} title="View profile" meta={<Kbd>⌘P</Kbd>} />
        <ListItem icon={<Settings />} title="Settings" meta={<Kbd>⌘S</Kbd>} />
        <ListItem icon={<Copy />} title="Duplicate" />
      </List>
    </Panel>
  ),
  'empty-state': (
    <EmptyState
      size="small"
      titleAs="h4"
      title="No projects yet"
      description="Create one to get started."
    />
  ),
  'featured-icon': (
    <div className="docs-preview-row">
      <FeaturedIcon icon={<Sparkles />} />
      <FeaturedIcon icon={<Mail />} appearance="modern" />
      <FeaturedIcon icon={<Trash2 />} tone="danger" appearance="solid" />
    </div>
  ),
  'file-upload': (
    <div className="docs-preview-fill">
      <FileUpload id="catalog-upload" hint="PNG or JPG, up to 10 MB" />
    </div>
  ),
  footer: (
    <div className="docs-preview-frame docs-preview-frame--footer">
      <span className="docs-preview-text">© 2026 Panda</span>
      <span className="docs-preview-text">Privacy · Terms</span>
    </div>
  ),
  'form-field': (
    <InputField
      label="Email"
      required
      iconStart={<Mail />}
      defaultValue="olivia@panda.io"
      description="We never share it."
    />
  ),
  grid: (
    <div className="docs-preview-grid">
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  ),
  header: (
    <div className="docs-preview-frame docs-preview-frame--bar">
      <Logo icon={<Sparkles />} name="Panda" />
      <Avatar name={people[0]} size="small" />
    </div>
  ),
  'hover-card': (
    <Panel>
      <div className="docs-preview-row">
        <Avatar name={people[0]} />
        <span className="docs-preview-text">
          <strong>Olivia Rhye</strong>
          <br />
          Product designer
        </span>
      </div>
    </Panel>
  ),
  inline: (
    <div className="docs-preview-row">
      <Tag>Design</Tag>
      <Tag>Growth</Tag>
      <Tag>Billing</Tag>
    </div>
  ),
  'input-field': (
    <InputField label="Email" required iconStart={<Mail />} defaultValue="olivia@panda.io" />
  ),
  kbd: (
    <div className="docs-preview-row">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  ),
  link: (
    <Link href="#" appearance="standalone">
      View all projects
    </Link>
  ),
  list: (
    <List divided aria-label="Files" className="docs-preview-fill">
      <ListItem icon={<FileText />} title="Report.pdf" meta="Today" />
      <ListItem icon={<FileText />} title="Brief.docx" meta="Mon" />
    </List>
  ),
  logo: <Logo icon={<Sparkles />} name="Panda" />,
  'meeting-card': (
    <Card appearance="outlined" className="docs-preview-card">
      <CardBody>
        <CardTitle>Design review</CardTitle>
        <CardDescription>Today · 14:00 – 15:00</CardDescription>
        <AvatarGroup label="Attendees" size="xsmall" max={3}>
          {people.map((n) => (
            <Avatar key={n} name={n} />
          ))}
        </AvatarGroup>
      </CardBody>
    </Card>
  ),
  'metric-card': (
    <MetricCard
      label="Total sessions"
      value="526"
      change="2.4%"
      trend="up"
      chart={<Sparkline data={spark} />}
      size="small"
      className="docs-preview-card"
    />
  ),
  modal: (
    <Panel>
      <div className="docs-preview-row docs-preview-row--between">
        <FeaturedIcon icon={<Trash2 />} tone="danger" size="small" />
        <X className="docs-preview-icon" aria-hidden="true" />
      </div>
      <strong className="docs-preview-text">Delete project?</strong>
      <div className="docs-preview-row docs-preview-row--end">
        <Button size="xsmall" variant="secondary" appearance="outline">
          Cancel
        </Button>
        <Button size="xsmall" variant="danger">
          Delete
        </Button>
      </div>
    </Panel>
  ),
  navbar: (
    <div className="docs-preview-frame docs-preview-frame--bar">
      <Logo icon={<Sparkles />} name="Panda" />
      <span className="docs-preview-text">Docs · Pricing · Blog</span>
    </div>
  ),
  'page-header': (
    <div className="docs-preview-fill">
      <Breadcrumb homeIcon items={[{ label: 'Home', href: '#' }, { label: 'Team' }]} />
      <strong className="docs-preview-title">Team members</strong>
    </div>
  ),
  pagination: (
    <Pagination currentPage={2} totalPages={4} onPageChange={() => {}} label="Example pagination" />
  ),
  popover: (
    <Panel>
      <strong className="docs-preview-text">Share report</strong>
      <InputField label="Link" hideLabel size="small" readOnly defaultValue="panda.io/r/8k2" />
    </Panel>
  ),
  'product-card': (
    <ProductCard
      className="docs-preview-card"
      title="AirPods Max 2"
      rating={4.5}
      reviews="420 reviews"
      price="$500"
    />
  ),
  progress: (
    <div className="docs-preview-row docs-preview-fill">
      <div className="docs-preview-grow">
        <Progress label="Uploading" hideLabel value={80} showValue valuePosition="end" />
      </div>
      <ProgressCircle label="Goal" hideLabel value={72} size="small" />
    </div>
  ),
  'radio-group': (
    <RadioGroup aria-label="Plan" defaultValue="basic">
      <Radio value="basic" label="Basic plan" description="Up to 10 users" />
      <Radio value="business" label="Business plan" description="Up to 20 users" />
    </RadioGroup>
  ),
  'search-field': <SearchField label="Search" hideLabel placeholder="Search projects" />,
  select: (
    <Panel>
      <div className="docs-preview-select">
        <Avatar name={people[0]} size="xsmall" decorative />
        <span className="docs-preview-text">Olivia Rhye @olivia</span>
        <ChevronDown className="docs-preview-icon" aria-hidden="true" />
      </div>
      <List aria-label="Options">
        <ListItem
          icon={<Avatar name={people[1]} size="xsmall" decorative />}
          title="Phoenix Baker"
        />
        <ListItem
          icon={<Avatar name={people[2]} size="xsmall" decorative />}
          title="Lana Steiner"
        />
      </List>
    </Panel>
  ),
  'side-nav': (
    <SideNav
      aria-label="Example"
      currentItem="home"
      className="docs-preview-fill"
      sections={[
        {
          title: 'General',
          items: [
            { id: 'home', label: 'Dashboard', href: '#', icon: <Home /> },
            { id: 'inbox', label: 'Inbox', href: '#', icon: <Bell />, badge: 8 },
          ],
        },
      ]}
    />
  ),
  skeleton: (
    <div className="docs-preview-row docs-preview-fill">
      <Skeleton variant="circle" width={40} height={40} />
      <div className="docs-preview-grow">
        <Skeleton lines={2} />
      </div>
    </div>
  ),
  slider: (
    <div className="docs-preview-fill">
      <Slider label="Price" hideLabel defaultValue={[0, 75]} />
    </div>
  ),
  spinner: <Spinner label="Loading" />,
  stack: (
    <div className="docs-preview-stack">
      <span />
      <span />
      <span />
    </div>
  ),
  stat: <Stat label="Revenue" value="$48,210" change="12%" trend="up" />,
  stepper: (
    <Stepper
      aria-label="Steps"
      current={1}
      size="small"
      steps={[{ label: 'Details' }, { label: 'Billing' }, { label: 'Done' }]}
    />
  ),
  switch: <Switch label="Email updates" description="Once a week" defaultChecked />,
  table: (
    <Panel wide>
      {[
        ['#3120', 'Paid'],
        ['#3119', 'Pending'],
      ].map(([id, s]) => (
        <div key={id} className="docs-preview-row docs-preview-row--between">
          <span className="docs-preview-text">{id}</span>
          <Badge tone={s === 'Paid' ? 'success' : 'warning'} shape="modern" size="small" withDot>
            {s}
          </Badge>
        </div>
      ))}
    </Panel>
  ),
  tabs: (
    <Tabs appearance="segmented" size="small" defaultValue="all" panels={false}>
      <TabList label="Filter">
        <Tab value="all">View all</Tab>
        <Tab value="active">Active</Tab>
        <Tab value="archived">Archived</Tab>
      </TabList>
    </Tabs>
  ),
  tag: (
    <div className="docs-preview-row">
      <Tag tone="primary" count={4}>
        Design
      </Tag>
      <Tag onRemove={() => {}}>Olivia Rhye</Tag>
    </div>
  ),
  textarea: (
    <div className="docs-preview-fill">
      <Textarea label="Description" rows={2} defaultValue="A little about the company." />
    </div>
  ),
  toast: (
    <Panel>
      <div className="docs-preview-row">
        <FeaturedIcon icon={<Sparkles />} tone="success" size="small" />
        <span className="docs-preview-text">
          <strong>Invoice sent</strong>
          <br />
          To olivia@panda.io
        </span>
      </div>
    </Panel>
  ),
  tooltip: (
    <div className="docs-preview-tooltip">
      <span className="docs-preview-tooltip__bubble">Copies the link</span>
      <IconButton
        icon={<Copy />}
        label="Copy link"
        variant="secondary"
        appearance="outline"
        size="small"
      />
    </div>
  ),
  'verification-code-input': (
    <VerificationCodeInput label="Code" length={4} size="small" defaultValue="12" />
  ),
  rating: <Rating label="Average rating" value={4.5} readOnly showValue />,
  'tree-view': (
    <TreeView
      label="Files"
      size="small"
      defaultExpanded={['src']}
      defaultSelected="app"
      style={{ inlineSize: 180 }}
      items={[
        {
          id: 'src',
          label: 'src',
          icon: <Folder />,
          children: [
            { id: 'app', label: 'App.tsx', icon: <FileText /> },
            { id: 'main', label: 'main.tsx', icon: <FileText /> },
          ],
        },
        { id: 'readme', label: 'README.md', icon: <FileText /> },
      ]}
    />
  ),
  'color-picker': (
    <ColorPicker
      label="Label color"
      size="small"
      allowCustom
      defaultValue="#2563eb"
      swatches={[
        { value: '#2563eb', name: 'Blue' },
        { value: '#7c3aed', name: 'Purple' },
        { value: '#db2777', name: 'Pink' },
        { value: '#16a34a', name: 'Green' },
        { value: '#facc15', name: 'Yellow' },
      ]}
    />
  ),
  'message-thread': (
    <MessageThread
      label="Conversation"
      density="compact"
      style={{ inlineSize: 240 }}
      messages={[
        { id: '1', author: { name: 'Lana' }, content: 'Is the report ready?' },
        { id: '2', author: { name: 'You' }, own: true, content: 'Sending it now.', status: 'Read' },
      ]}
    />
  ),
  'inline-cta': (
    <InlineCTA
      appearance="brand"
      layout="stacked"
      icon={<Sparkles />}
      title="Upgrade to Pro"
      actions={<Button size="small">Upgrade</Button>}
      style={{ inlineSize: 220 }}
    />
  ),
  'filter-bar': (
    <FilterBar
      label="Filters"
      defaultValue={{ status: ['paid'] }}
      filters={[
        { id: 'status', label: 'Status', options: [{ value: 'paid', label: 'Paid' }] },
        { id: 'owner', label: 'Owner', options: [{ value: 'lana', label: 'Lana' }] },
      ]}
    />
  ),
  'prompt-input': (
    <PromptInput label="Message" placeholder="Ask me anything…" size="small" rows={2} defaultValue="Summarise this report" />
  ),
  'notification-card': (
    <NotificationCard title="Lana replied" description="Ready for review?" time="2m" avatar={{ name: 'Lana Steiner' }} unread />
  ),
  attachment: <Attachment name="Guidelines.pdf" detail="2.4 MB" icon={<FileText />} size="small" />,
  'description-list': (
    <DescriptionList
      divided
      items={[
        { term: 'Subtotal', description: '$1,100' },
        { term: 'Total', description: '$1,210', emphasis: true },
      ]}
    />
  ),
  'payment-card': <PaymentCard holder="Maya Okafor" last4="1234" expiry="06/28" brand="Orbit" size="small" />,
  'pricing-card': (
    <PricingCard
      name="Pro"
      price="$29"
      period="/mo"
      featured
      features={['Unlimited projects']}
      action={<Button size="small">Start</Button>}
    />
  ),
  'integration-card': <IntegrationCard name="Slack" description="Post updates." icon={<Zap />} connected />,
  'settings-list': (
    <SettingsList items={[{ id: '2fa', title: 'Two-factor', control: <Switch aria-label="Two-factor" defaultChecked /> }]} />
  ),
  'kanban-board': (
    <KanbanBoard label="Board" columns={[{ id: 'todo', title: 'To do', items: [{ id: '1', title: 'Write brief' }] }]} />
  ),
  'event-calendar': (
    <EventCalendar
      label="Calendar"
      month={new Date(2026, 9, 1)}
      defaultSelectedDate={new Date(2026, 9, 14)}
      events={[{ id: '1', title: 'Launch', date: new Date(2026, 9, 14), tone: 'success' }]}
    />
  ),
  carousel: <Carousel label="Highlights" slides={['Ship faster.', 'Invite your team.']} />,
  'video-player': <VideoPlayer label="Product tour" />,
  countdown: <Countdown label="Launch in" to={new Date(Date.now() + 2 * 86400000)} size="small" />,
};
