/**
 * Orbit's support pages: chat, support tickets, ticket reply, inbox and message details.
 */
import { useState, type ReactNode } from 'react';
import {
  Avatar,
  AvatarLabelGroup,
  Badge,
  Button,
  Checkbox,
  Divider,
  FeaturedIcon,
  IconButton,
  InputField,
  MetricCard,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  Select,
  SelectItem,
  Tab,
  TabList,
  Tabs,
  Textarea,
  useToast,
  List,
  ListItem,
} from '@ds/react';
import {
  Archive,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Eye,
  File,
  FileText,
  Forward,
  HardDrive,
  Inbox as InboxIcon,
  Paperclip,
  Pencil,
  Phone,
  Reply,
  ReplyAll,
  Search,
  Send,
  ShieldAlert,
  Star,
  Tag,
  Ticket,
  Trash2,
  Video,
} from 'lucide-react';
import { go } from '../../router';
import { me, people } from '../data';
import { Page, to } from '../Shell';
import { DataTable, Panel, RowMenu, Status } from '../ui';

/* ------------------------------------------------------------------ chat */

const contacts = people.map((p, i) => ({
  ...p,
  title: [
    'Project manager',
    'Designer',
    'Engineer',
    'Marketing lead',
    'Founder',
    'Support',
    'Sales',
    'Data analyst',
  ][i],
  last: ['15 min', '30 min', '1 h', '3 h', 'Yesterday', 'Mon', 'Sun', '2 w'][i],
  online: i % 3 !== 2,
  unread: [2, 0, 1, 0, 0, 0, 0, 0][i],
}));

type Message = { from: 'me' | 'them'; text: ReactNode; time: string };

const seed: Message[] = [
  {
    from: 'them',
    text: 'Hi Maya, could we book a call tomorrow between 2:00 and 5:00 pm?',
    time: '2 h ago',
  },
  {
    from: 'me',
    text: 'Sure, 3:30 works for me. Is this about the onboarding flow?',
    time: '2 h ago',
  },
  {
    from: 'them',
    text: 'Yes, and I’d love more detail on the activation numbers before then.',
    time: '2 h ago',
  },
  { from: 'me', text: 'I’ll share the funnel export in a minute.', time: '1 h ago' },
  {
    from: 'them',
    text: (
      <span className="orbit-attachment">
        <FileText aria-hidden="true" /> Onboarding-v3.fig · 4.2 MB
      </span>
    ),
    time: '58 min ago',
  },
  { from: 'them', text: 'Please preview the new empty states when you can.', time: '57 min ago' },
];

function Chat() {
  const [active, setActive] = useState(1);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState(seed);
  const [draft, setDraft] = useState('');
  const c = contacts[active];
  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { from: 'me', text: draft, time: 'Just now' }]);
    setDraft('');
  };
  return (
    <Page path="/support/chat" description="Conversations with your team and customers.">
      <div className="orbit-chat">
        <aside className="panel orbit-chat__list" aria-label="Chats">
          <InputField
            label="Search chats"
            hideLabel
            iconStart={<Search />}
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
          />
          <List>
            {contacts
              .filter((x) => x.name.toLowerCase().includes(query.toLowerCase()))
              .map((x) => {
                const i = contacts.indexOf(x);
                return (
                  <ListItem
                    key={x.email}
                    current={i === active}
                    onClick={() => setActive(i)}
                    icon={
                      <Avatar
                        name={x.name}
                        src={x.src}
                        status={x.online ? 'online' : 'offline'}
                        size="small"
                        decorative
                      />
                    }
                    title={x.name}
                    description={x.title}
                    meta={
                      <>
                        {x.last}
                        {x.unread > 0 && (
                          <Badge
                            appearance="solid"
                            tone="primary"
                            size="small"
                            count={x.unread}
                            label={`${x.unread} unread`}
                          />
                        )}
                      </>
                    }
                  />
                );
              })}
          </List>
        </aside>
        <section className="panel orbit-chat__thread" aria-label={`Conversation with ${c.name}`}>
          <header className="row row--between">
            <AvatarLabelGroup
              name={c.name}
              src={c.src}
              supportingText={c.online ? 'Online' : 'Offline'}
              status={c.online ? 'online' : 'offline'}
            />
            <span className="row">
              <IconButton icon={<Phone />} label="Call" variant="secondary" appearance="ghost" />
              <IconButton
                icon={<Video />}
                label="Video call"
                variant="secondary"
                appearance="ghost"
              />
              <RowMenu label={c.name} />
            </span>
          </header>
          <Divider />
          <ol className="orbit-messages" aria-live="polite">
            {messages.map((m, i) => (
              <li key={i} className={`orbit-msg orbit-msg--${m.from}`}>
                {m.from === 'them' && <Avatar name={c.name} src={c.src} size="small" decorative />}
                <span className="orbit-msg__body">
                  <span className="orbit-msg__bubble">{m.text}</span>
                  <span className="muted text-sm">
                    {m.from === 'me' ? 'You' : c.name.split(' ')[0]} · {m.time}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <form
            className="orbit-composer"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <IconButton
              icon={<Paperclip />}
              label="Attach a file"
              variant="secondary"
              appearance="ghost"
            />
            <InputField
              label={`Message ${c.name}`}
              hideLabel
              placeholder="Type a message"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <IconButton type="submit" icon={<Send />} label="Send" />
          </form>
        </section>
      </div>
    </Page>
  );
}

/* --------------------------------------------------------------- tickets */

const tickets = Array.from({ length: 18 }, (_, i) => ({
  id: `#${346520 + i * 7}`,
  p: people[i % people.length],
  subject: [
    'Sidebar not responsive on mobile',
    'SSO login loops back to sign-in',
    'How do I add a custom report page?',
    'Invoice shows the wrong VAT rate',
    'Webhook retries keep failing',
    'Request: dark mode for exports',
  ][i % 6],
  category: ['Bug', 'Account', 'General support', 'Billing', 'API', 'Feature request'][i % 6],
  created: `${20 - (i % 19)} Oct 2026`,
  status: ['Pending', 'Solved', 'Pending', 'Solved', 'Solved', 'Pending'][i % 6],
}));
type TicketRow = (typeof tickets)[number];

function Tickets() {
  const [tab, setTab] = useState('all');
  const rows = tickets.filter((t) => tab === 'all' || t.status.toLowerCase() === tab);
  return (
    <Page
      path="/support/tickets"
      title="Support tickets"
      description="Your most recent support tickets."
    >
      <section className="orbit-grid" aria-label="Ticket counts">
        <MetricCard label="Total tickets" value="5,347" icon={<Ticket />} size="small" />
        <MetricCard
          label="Pending tickets"
          value="1,230"
          icon={<Clock />}
          iconTone="warning"
          size="small"
        />
        <MetricCard
          label="Solved tickets"
          value="4,117"
          icon={<CheckCircle2 />}
          iconTone="success"
          size="small"
        />
      </section>
      <DataTable
        title="Tickets"
        toolbar={
          <div className="orbit-toolbar">
            <Tabs panels={false} appearance="line" value={tab} onValueChange={setTab}>
              <TabList label="Ticket status">
                <Tab value="all">All</Tab>
                <Tab value="solved">Solved</Tab>
                <Tab value="pending">Pending</Tab>
              </TabList>
            </Tabs>
            <span className="row">
              <Select label="Category" hideLabel placeholder="Category" size="small">
                {['Bug', 'Account', 'Billing', 'API', 'Feature request'].map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </Select>
              <Select label="Company" hideLabel placeholder="Company" size="small">
                {people.slice(0, 5).map((p) => (
                  <SelectItem key={p.company} value={p.company}>
                    {p.company}
                  </SelectItem>
                ))}
              </Select>
              <Button size="small" variant="secondary" appearance="outline">
                Apply
              </Button>
            </span>
          </div>
        }
        rows={rows}
        rowId={(t: TicketRow) => t.id}
        pageSize={8}
        columns={[
          { key: 'id', header: 'Ticket', render: (t) => <strong>{t.id}</strong> },
          {
            key: 'p',
            header: 'Requested by',
            render: (t) => (
              <AvatarLabelGroup
                name={t.p.name}
                src={t.p.src}
                supportingText={t.p.email}
                size="small"
              />
            ),
          },
          { key: 'subject', header: 'Subject', hideBelow: 'medium' },
          { key: 'created', header: 'Created', hideBelow: 'large' },
          { key: 'status', header: 'Status', render: (t) => <Status>{t.status}</Status> },
          {
            key: 'open',
            header: <span className="visually-hidden">Open</span>,
            width: 48,
            render: (t) => (
              <IconButton
                icon={<Eye />}
                label={`Open ticket ${t.id}`}
                variant="secondary"
                appearance="ghost"
                size="small"
                onClick={() => go('/saas/support/ticket')}
              />
            ),
          },
        ]}
      />
    </Page>
  );
}

function Pager({ label }: { label: string }) {
  return (
    <span className="row">
      <span className="muted text-sm">4 of 120</span>
      <IconButton
        icon={<ChevronLeft />}
        label={`Previous ${label}`}
        variant="secondary"
        appearance="outline"
        size="small"
      />
      <IconButton
        icon={<ChevronRight />}
        label={`Next ${label}`}
        variant="secondary"
        appearance="outline"
        size="small"
      />
    </span>
  );
}

function TicketReply() {
  const toast = useToast();
  const customer = people[1];
  const [status, setStatus] = useState('progress');
  const [thread, setThread] = useState([
    {
      who: customer,
      time: 'Mon, 3:20 PM',
      text: 'The sidebar doesn’t collapse on phones: it pushes the page content below the fold. Is there an official way to make it a drawer?',
    },
    {
      who: { name: me.name, src: me.src, email: me.email },
      time: 'Mon, 3:41 PM',
      text: 'Thanks for the report! Below 1024 px the sidebar should move into a drawer behind the menu button. Could you tell me your browser and whether you’ve customised the layout?',
    },
    {
      who: customer,
      time: 'Mon, 4:02 PM',
      text: 'Safari on iOS 19, and yes, we added a second nav section. Screenshot attached.',
    },
  ]);
  const [reply, setReply] = useState('');
  return (
    <Page
      path="/support/ticket"
      title="Ticket #346520 · Sidebar not responsive on mobile"
      actions={
        <>
          <Button
            variant="secondary"
            appearance="outline"
            iconStart={<ArrowLeft />}
            href={to('/support/tickets')}
          >
            All tickets
          </Button>
          <Pager label="ticket" />
        </>
      }
    >
      <div className="orbit-row">
        <Panel title="Conversation">
          <ol className="orbit-thread">
            {thread.map((m, i) => (
              <li key={i}>
                <div className="row row--between">
                  <AvatarLabelGroup
                    name={m.who.name}
                    src={m.who.src}
                    supportingText={m.who.email}
                    size="small"
                  />
                  <span className="muted text-sm">{m.time}</span>
                </div>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
          <form
            className="orbit-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!reply.trim()) return;
              setThread((t) => [
                ...t,
                {
                  who: { name: me.name, src: me.src, email: me.email },
                  time: 'Just now',
                  text: reply,
                },
              ]);
              setReply('');
              toast({ title: 'Reply sent', tone: 'success' });
            }}
          >
            <Textarea
              label="Reply"
              rows={4}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply…"
            />
            <div className="orbit-toolbar">
              <span className="row">
                <Button
                  variant="secondary"
                  appearance="outline"
                  size="small"
                  iconStart={<Paperclip />}
                >
                  Attach
                </Button>
                <Select
                  label="Status"
                  hideLabel
                  size="small"
                  value={status}
                  onValueChange={setStatus}
                >
                  <SelectItem value="progress">In progress</SelectItem>
                  <SelectItem value="solved">Solved</SelectItem>
                  <SelectItem value="hold">On hold</SelectItem>
                </Select>
              </span>
              <Button type="submit" iconStart={<Send />}>
                Reply
              </Button>
            </div>
          </form>
        </Panel>
        <Panel title="Ticket details">
          <AvatarLabelGroup
            name={customer.name}
            src={customer.src}
            supportingText={customer.email}
          />
          <dl className="orbit-facts">
            <dt>Ticket</dt>
            <dd>#346520</dd>
            <dt>Category</dt>
            <dd>General support</dd>
            <dt>Created</dt>
            <dd>Mon, 12 Oct 2026</dd>
            <dt>Status</dt>
            <dd>
              <Status>
                {{ progress: 'In progress', solved: 'Solved', hold: 'Pending' }[status]!}
              </Status>
            </dd>
          </dl>
        </Panel>
      </div>
    </Page>
  );
}

/* ----------------------------------------------------------------- email */

const folders = [
  { id: 'inbox', label: 'Inbox', icon: <InboxIcon />, count: 3 },
  { id: 'sent', label: 'Sent', icon: <Send /> },
  { id: 'drafts', label: 'Drafts', icon: <Pencil /> },
  { id: 'spam', label: 'Spam', icon: <ShieldAlert />, count: 2 },
  { id: 'trash', label: 'Trash', icon: <Trash2 /> },
  { id: 'archive', label: 'Archive', icon: <Archive /> },
];

const mails = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  from: people[i % people.length],
  subject: [
    'Contact for “Website design”',
    'Your October invoice is ready',
    'Q4 roadmap review notes',
    'New sign-in from Chrome on Mac',
    'Partnership proposal',
    'Re: SSO rollout timeline',
  ][i % 6],
  preview: 'Hi Maya, following up on our conversation last week about the next steps…',
  time: ['10:24', '09:12', 'Yesterday', 'Yesterday', 'Mon', 'Sun'][i % 6],
  unread: i < 3,
  starred: i % 4 === 0,
  label: ['Work', 'Invoices', 'Work', 'Personal', 'Payments', 'Work'][i % 6],
}));

function MailSide({ current }: { current: string }) {
  const toast = useToast();
  return (
    <aside className="panel orbit-mail__side" aria-label="Mailboxes">
      <Modal>
        <ModalTrigger asChild>
          <Button fullWidth iconStart={<Pencil />}>
            Compose
          </Button>
        </ModalTrigger>
        <ModalContent title="New message" size="large">
          <div className="orbit-form">
            <InputField label="To" type="email" placeholder="name@company.com" />
            <InputField label="Subject" />
            <Textarea label="Message" rows={8} />
          </div>
          <ModalFooter>
            <ModalClose asChild>
              <Button variant="secondary" appearance="outline">
                Discard
              </Button>
            </ModalClose>
            <ModalClose asChild>
              <Button
                iconStart={<Send />}
                onClick={() => toast({ title: 'Message sent', tone: 'success' })}
              >
                Send
              </Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <nav aria-label="Folders">
        <List>
          {folders.map((f) => (
            <ListItem
              key={f.id}
              current={f.id === current}
              icon={f.icon}
              title={f.label}
              href={to('/support/inbox')}
              meta={
                f.count && (
                  <Badge
                    size="small"
                    shape="modern"
                    tone="gray"
                    count={f.count}
                    label={`${f.count} unread`}
                  />
                )
              }
            />
          ))}
        </List>
      </nav>
      <Divider />
      <span className="muted text-sm">Filters</span>
      <span className="row">
        <Badge tone="warning" shape="modern" iconStart={<Star />}>
          Starred
        </Badge>
        <Badge tone="danger" shape="modern" iconStart={<Tag />}>
          Important
        </Badge>
      </span>
      <span className="muted text-sm">Labels</span>
      <span className="row">
        {(['Personal', 'Work', 'Payments', 'Invoices'] as const).map((l, i) => (
          <Badge
            key={l}
            color={(['blue', 'purple', 'success', 'orange'] as const)[i]}
            shape="modern"
            withDot
          >
            {l}
          </Badge>
        ))}
      </span>
    </aside>
  );
}

function Inbox() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<number[]>([]);
  const rows = mails.filter(
    (m) => filter === 'all' || (filter === 'unread' ? m.unread : !m.unread),
  );
  return (
    <Page path="/support/inbox" description="Mail for maya@orbit.app">
      <div className="orbit-mail">
        <MailSide current="inbox" />
        <section className="panel panel--flush orbit-mail__list" aria-label="Messages">
          <div className="orbit-mail__toolbar">
            <span className="row">
              <Checkbox
                aria-label="Select all"
                checked={rows.length > 0 && selected.length === rows.length}
                indeterminate={selected.length > 0 && selected.length < rows.length}
                onCheckedChange={(v) => setSelected(v ? rows.map((r) => r.id) : [])}
              />
              <Tabs panels={false} appearance="segmented" value={filter} onValueChange={setFilter}>
                <TabList label="Show">
                  <Tab value="all">All</Tab>
                  <Tab value="read">Read</Tab>
                  <Tab value="unread">Unread</Tab>
                </TabList>
              </Tabs>
              {selected.length > 0 && (
                <>
                  <IconButton
                    icon={<Archive />}
                    label="Archive selected"
                    variant="secondary"
                    appearance="ghost"
                    size="small"
                  />
                  <IconButton
                    icon={<Trash2 />}
                    label="Delete selected"
                    variant="secondary"
                    appearance="ghost"
                    size="small"
                  />
                </>
              )}
            </span>
            <span className="muted text-sm">1–{rows.length} of 159</span>
          </div>
          <List divided>
            {rows.map((m) => (
              <ListItem
                key={m.id}
                unread={m.unread}
                selected={selected.includes(m.id)}
                start={
                  <>
                    <Checkbox
                      aria-label={`Select “${m.subject}”`}
                      checked={selected.includes(m.id)}
                      onCheckedChange={(v) =>
                        setSelected((s) => (v ? [...s, m.id] : s.filter((x) => x !== m.id)))
                      }
                    />
                    <IconButton
                      icon={<Star />}
                      label={m.starred ? 'Starred' : 'Star'}
                      variant="secondary"
                      appearance="ghost"
                      size="small"
                      aria-pressed={m.starred}
                      className={m.starred ? 'orbit-star orbit-star--on' : 'orbit-star'}
                    />
                  </>
                }
                title={m.from.name}
                description={`${m.subject} · ${m.preview}`}
                meta={m.time}
                href={to('/support/message')}
              />
            ))}
          </List>
        </section>
      </div>
    </Page>
  );
}

function MessageDetails() {
  const from = people[3];
  return (
    <Page path="/support/message" description="Mail for maya@orbit.app">
      <div className="orbit-mail">
        <MailSide current="inbox" />
        <article className="panel orbit-mail__read" aria-labelledby="mail-subject">
          <div className="orbit-toolbar">
            <span className="row">
              <IconButton
                icon={<ArrowLeft />}
                label="Back to inbox"
                variant="secondary"
                appearance="outline"
                size="small"
                onClick={() => go('/saas/support/inbox')}
              />
              <IconButton
                icon={<Archive />}
                label="Archive"
                variant="secondary"
                appearance="ghost"
                size="small"
              />
              <IconButton
                icon={<Trash2 />}
                label="Delete"
                variant="secondary"
                appearance="ghost"
                size="small"
              />
            </span>
            <Pager label="message" />
          </div>
          <h2 id="mail-subject" className="orbit-h2">
            Contact for “Website design”
          </h2>
          <div className="row row--between">
            <AvatarLabelGroup
              name={from.name}
              src={from.src}
              supportingText={`${from.email} · to me`}
            />
            <span className="muted text-sm">Today, 10:24</span>
          </div>
          <div className="orbit-prose">
            <p>Hi Maya,</p>
            <p>
              We’re planning a redesign of our marketing site for Q1 and would love Orbit’s help
              with the pricing and onboarding pages. Our goal is to lift trial starts by 20% without
              hurting activation.
            </p>
            <p>
              I’ve attached our brand guidelines and the current assets. Could we find 30 minutes
              next week to walk through scope and timing?
            </p>
            <p>
              Thanks,
              <br />
              {from.name}
            </p>
          </div>
          <span className="muted text-sm">2 attachments</span>
          <div className="orbit-files">
            {[
              { name: 'Guidelines.pdf', size: '2.4 MB', icon: <File /> },
              { name: 'Branding assets', size: 'Google Drive', icon: <HardDrive /> },
            ].map((f) => (
              <div key={f.name} className="orbit-file">
                <FeaturedIcon icon={f.icon} appearance="modern" shape="square" size="small" />
                <span className="stack-text">
                  <strong className="text-sm">{f.name}</strong>
                  <span className="muted text-sm">{f.size}</span>
                </span>
                <IconButton
                  icon={<Download />}
                  label={`Download ${f.name}`}
                  variant="secondary"
                  appearance="ghost"
                  size="small"
                />
              </div>
            ))}
          </div>
          <span className="row">
            <Button iconStart={<Reply />}>Reply</Button>
            <Button variant="secondary" appearance="outline" iconStart={<ReplyAll />}>
              Reply all
            </Button>
            <Button variant="secondary" appearance="outline" iconStart={<Forward />}>
              Forward
            </Button>
          </span>
        </article>
      </div>
    </Page>
  );
}

const pages: Record<string, () => ReactNode> = {
  chat: Chat,
  tickets: Tickets,
  ticket: TicketReply,
  inbox: Inbox,
  message: MessageDetails,
};

export default function Support({ path }: { path: string }) {
  const P = pages[path.split('/')[2]] ?? Tickets;
  return <P />;
}
