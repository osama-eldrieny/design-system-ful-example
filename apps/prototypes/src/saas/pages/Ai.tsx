/**
 * Orbit's AI assistant: text, image, code and video generators (one chat layout) and AI settings.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Code,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  FeaturedIcon,
  FileUpload,
  IconButton,
  InputField,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  Progress,
  Select,
  SelectItem,
  Slider,
  Spinner,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Textarea,
  useToast,
} from '@ds/react';
import {
  Bot,
  Calendar,
  Clapperboard,
  GitBranch,
  HardDrive,
  KeyRound,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Pencil,
  Plus,
  Search,
  Send,
  Share2,
  Sparkles,
  Star,
  Trash2,
} from 'lucide-react';
import { me } from '../data';
import { Page, useOrbitTheme } from '../Shell';
import { Panel } from '../ui';
import { Segmented } from '../../Segmented';

type Kind = 'text' | 'image' | 'code' | 'video';

const config: Record<
  Kind,
  {
    models: string[];
    history: [string, string[]][];
    placeholder: string;
    first: string;
    reply: (p: string) => ReactNode;
  }
> = {
  text: {
    models: ['Auto', 'Claude Opus 5.5', 'Claude Sonnet 5.5', 'GPT 5.5', 'Gemini 3 Pro', 'Grok 4'],
    history: [
      ['Starred', ['Welcome email for trial users', 'Churn survey questions']],
      ['Recent', ['Release notes for v4.2', 'Rewrite pricing FAQ', 'LinkedIn post: SOC 2']],
      ['Last week', ['Investor update, October', 'Onboarding checklist copy']],
    ],
    placeholder: 'Ask anything, or describe what to write…',
    first: 'Write a short welcome email for people who just started a trial.',
    reply: () => (
      <>
        <p>
          <strong>Subject: Welcome to Orbit, let’s get your first report live</strong>
        </p>
        <p>
          Hi there, thanks for starting your trial! Most teams see their first insight within 10
          minutes. Here’s the fastest path:
        </p>
        <ol>
          <li>Connect your billing tool under Integrations.</li>
          <li>Invite one teammate so you can share dashboards.</li>
          <li>Open the SaaS overview and pick your key metric.</li>
        </ol>
        <p>Reply to this email any time; a real person reads it.</p>
      </>
    ),
  },
  image: {
    models: ['Auto', 'Imagen 4', 'GPT Image 2', 'FLUX.2 Pro', 'Ideogram 3', 'Seedream 5'],
    history: [
      ['Starred', ['Minimalist building facade', 'Isometric data centre']],
      ['Recent', ['Hero image: calm workspace', 'Abstract gradient waves']],
      ['Last week', ['Product mockup on desk']],
    ],
    placeholder: 'Describe the image you want…',
    first: 'A minimalist building facade with vertical panels, greenery and a clear sky.',
    reply: () => (
      <>
        <p>
          Here are 2 variants at 16:9. The vertical panels catch soft morning light, with climbing
          plants on the lower floors.
        </p>
        <div className="orbit-gen-grid">
          <div
            className="orbit-gen orbit-gen--a"
            role="img"
            aria-label="Generated image 1: pale facade with vertical panels and greenery"
          />
          <div
            className="orbit-gen orbit-gen--b"
            role="img"
            aria-label="Generated image 2: the same facade at a lower angle against a clear sky"
          />
        </div>
      </>
    ),
  },
  code: {
    models: ['Auto', 'Claude Opus 5.5', 'Claude Sonnet 5.5', 'GPT 5.5 Codex', 'Gemini 3 Pro'],
    history: [
      ['Starred', ['Responsive login form', 'Warning-state modal']],
      ['Recent', ['Debounce hook in TypeScript', 'SQL: monthly churn']],
      ['Last week', ['Stripe webhook handler']],
    ],
    placeholder: 'Describe the code you need…',
    first: 'Write a SQL query for monthly churn rate.',
    reply: () => (
      <>
        <p>
          This counts subscriptions active at the start of each month and how many of those
          cancelled during it:
        </p>
        <Code block language="sql">{`select date_trunc('month', m) as month,
       count(*) filter (where cancelled_at < m + interval '1 month')::float
         / nullif(count(*), 0) as churn_rate
from generate_series('2026-01-01'::date, '2026-10-01', '1 month') m
join subscriptions s
  on s.started_at < m and (s.cancelled_at is null or s.cancelled_at >= m)
group by 1
order by 1;`}</Code>
      </>
    ),
  },
  video: {
    models: ['Auto', 'Veo 4', 'Sora 2', 'Runway Gen-5', 'Kling 3'],
    history: [
      ['Starred', ['Product teaser, 15 s']],
      ['Recent', ['Onboarding explainer', 'Slow pan across dashboard']],
      ['Last week', ['Logo reveal']],
    ],
    placeholder: 'Describe the scene, camera and mood…',
    first: 'A 10-second slow pan across a dashboard on a laptop, warm light.',
    reply: () => (
      <>
        <p>Your 10-second clip is ready (1080p, 24 fps).</p>
        <div
          className="orbit-gen orbit-gen--video"
          role="img"
          aria-label="Generated video preview: a laptop showing a dashboard in warm light"
        >
          <FeaturedIcon icon={<Clapperboard />} appearance="solid" />
        </div>
      </>
    ),
  },
};

type Msg = { from: 'me' | 'ai'; body: ReactNode };

function Generator({ kind }: { kind: Kind }) {
  const toast = useToast();
  const c = config[kind];
  const [model, setModel] = useState(c.models[1]);
  const [prompt, setPrompt] = useState('');
  const [busy, setBusy] = useState(false);
  const [web, setWeb] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'me', body: c.first },
    { from: 'ai', body: c.reply(c.first) },
  ]);
  const end = useRef<HTMLLIElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView?.({ block: 'nearest' });
  }, [msgs]);

  const send = () => {
    if (!prompt.trim() || busy) return;
    setMsgs((m) => [...m, { from: 'me', body: prompt }]);
    setPrompt('');
    setBusy(true);
    window.setTimeout(() => {
      setMsgs((m) => [...m, { from: 'ai', body: c.reply(prompt) }]);
      setBusy(false);
    }, 900);
  };

  return (
    <div className="orbit-ai">
      <aside className="panel orbit-ai__history" aria-label="Chat history">
        <Button iconStart={<Plus />} fullWidth onClick={() => setMsgs([])}>
          New chat
        </Button>
        <InputField
          label="Search chats"
          hideLabel
          iconStart={<Search />}
          placeholder="Search"
          size="small"
        />
        {c.history.map(([group, items]) => (
          <section key={group} className="orbit-stack" aria-label={group}>
            <span className="muted text-sm">
              {group === 'Starred' && <Star aria-hidden="true" className="orbit-inline-icon" />}{' '}
              {group}
            </span>
            <ul className="orbit-pick">
              {items.map((t, i) => (
                <li key={t} className="orbit-ai__chat">
                  <Button
                    appearance="text"
                    variant="secondary"
                    size="small"
                    className="orbit-pick__item"
                    aria-current={group === 'Starred' && i === 0 ? 'true' : undefined}
                  >
                    {t}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <IconButton
                        icon={<MoreHorizontal />}
                        label={`Options for ${t}`}
                        variant="secondary"
                        appearance="ghost"
                        size="xsmall"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem icon={<Pencil />}>Rename</DropdownMenuItem>
                      <DropdownMenuItem icon={<Star />}>Star</DropdownMenuItem>
                      <DropdownMenuItem icon={<Trash2 />} variant="danger">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </aside>

      <section className="panel orbit-ai__main" aria-label="Conversation">
        <header className="orbit-toolbar">
          <Select label="Model" hideLabel size="small" value={model} onValueChange={setModel}>
            {c.models.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </Select>
          <Modal>
            <ModalTrigger asChild>
              <Button variant="secondary" appearance="outline" size="small" iconStart={<Share2 />}>
                Share
              </Button>
            </ModalTrigger>
            <ModalContent
              icon={<Share2 />}
              title="Share this chat"
              description="Anyone with the link can read it."
            >
              <InputField label="Link" readOnly defaultValue="https://orbit.app/share/7Fq2xL" />
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="secondary" appearance="outline">
                    Cancel
                  </Button>
                </ModalClose>
                <ModalClose asChild>
                  <Button onClick={() => toast({ title: 'Link copied' })}>Copy link</Button>
                </ModalClose>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </header>

        <ol className="orbit-ai__thread" aria-live="polite">
          {msgs.length === 0 && (
            <li className="orbit-center orbit-ai__empty">
              <FeaturedIcon icon={<Sparkles />} size="large" />
              <strong>What shall we make?</strong>
            </li>
          )}
          {msgs.map((m, i) => (
            <li key={i} className={`orbit-ai__msg orbit-ai__msg--${m.from}`}>
              {m.from === 'ai' ? (
                <FeaturedIcon icon={<Bot />} size="small" label={model} />
              ) : (
                <Avatar name={me.name} src={me.src} size="small" decorative />
              )}
              <div className="orbit-ai__body">
                {m.from === 'ai' && (
                  <Badge tone="gray" shape="modern" size="small">
                    {model}
                  </Badge>
                )}
                {typeof m.body === 'string' ? <p>{m.body}</p> : m.body}
              </div>
            </li>
          ))}
          {busy && (
            <li className="orbit-ai__msg">
              <Spinner label="Generating" size="small" />
            </li>
          )}
          <li ref={end} aria-hidden="true" />
        </ol>

        <form
          className="orbit-ai__composer"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <Textarea
            label="Prompt"
            hideLabel
            rows={2}
            placeholder={c.placeholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <div className="orbit-toolbar">
            <span className="row">
              <IconButton
                icon={<Paperclip />}
                label="Upload a file"
                variant="secondary"
                appearance="outline"
                size="small"
              />
              {kind === 'text' || kind === 'code' ? (
                <>
                  <Switch label="Web search" size="small" checked={web} onCheckedChange={setWeb} />
                  <Switch label="Deep search" size="small" />
                </>
              ) : (
                <>
                  <Select label="Aspect ratio" hideLabel size="small" defaultValue="16:9">
                    {['16:9', '4:3', '1:1', '3:4', '9:16'].map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label={kind === 'image' ? 'Variants' : 'Length'}
                    hideLabel
                    size="small"
                    defaultValue={kind === 'image' ? '2' : '10'}
                  >
                    {(kind === 'image' ? ['1', '2', '3', '4'] : ['5', '10', '15']).map((r) => (
                      <SelectItem key={r} value={r}>
                        {kind === 'image' ? `${r} variant${r === '1' ? '' : 's'}` : `${r} s`}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select label="Resolution" hideLabel size="small" defaultValue="2k">
                    {['1080p', '2K', '4K'].map((r) => (
                      <SelectItem key={r} value={r.toLowerCase()}>
                        {r}
                      </SelectItem>
                    ))}
                  </Select>
                </>
              )}
            </span>
            <Button type="submit" iconStart={<Send />} loading={busy} disabled={!prompt.trim()}>
              {kind === 'text' || kind === 'code' ? 'Send' : 'Generate'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

/* --------------------------------------------------------------- settings */

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
    <li>
      <span className="stack-text">
        <strong>{title}</strong>
        {description && <span className="muted text-sm">{description}</span>}
      </span>
      <span className="row">{children}</span>
    </li>
  );
}

function AiSettings() {
  const toast = useToast();
  const { theme, setTheme } = useOrbitTheme();
  const [creativity, setCreativity] = useState([60]);
  const sections: [string, string, ReactNode][] = [
    [
      'account',
      'Account',
      <>
        <Panel title="Profile">
          <div className="row">
            <Avatar name={me.name} src={me.src} size="large" decorative />
            <FileUpload id="ai-avatar" accept="image/*" hint="PNG or JPG, at least 200×200 px" />
          </div>
          <div className="orbit-form__two">
            <InputField label="Full name" defaultValue={me.name} />
            <InputField label="Email" type="email" defaultValue={me.email} />
            <InputField label="Workspace name" defaultValue="Orbit Labs" />
          </div>
        </Panel>
        <Panel title="Security">
          <ul className="orbit-settings">
            <Row title="Password" description="Last changed 3 months ago.">
              <Button size="small" variant="secondary" appearance="outline">
                Change
              </Button>
            </Row>
            <Row title="Two-factor authentication">
              <Switch aria-label="Two-factor authentication" defaultChecked />
            </Row>
            <Row
              title="Active sessions"
              description="3 devices: MacBook, iPhone, Chrome on Windows."
            >
              <Button size="small" variant="secondary" appearance="outline">
                Sign out all
              </Button>
            </Row>
          </ul>
        </Panel>
      </>,
    ],
    [
      'general',
      'General',
      <Panel key="g" title="General">
        <ul className="orbit-settings">
          <Row title="Theme">
            <Segmented
              label="Theme"
              options={[
                ['light', 'Light'],
                ['dark', 'Dark'],
              ]}
              value={theme.mode}
              onChange={(mode) => setTheme({ ...theme, mode })}
            />
          </Row>
          <Row title="Language">
            <Select
              label="Language"
              hideLabel
              size="small"
              value={theme.language}
              onValueChange={(v) => setTheme({ ...theme, language: v as typeof theme.language })}
            >
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
            </Select>
          </Row>
          <Row title="Time format">
            <Select label="Time format" hideLabel size="small" defaultValue="24">
              <SelectItem value="24">24-hour</SelectItem>
              <SelectItem value="12">12-hour</SelectItem>
            </Select>
          </Row>
          <Row title="Activity and mentions">
            <Switch aria-label="Notify about activity and mentions" defaultChecked />
          </Row>
          <Row title="AI responses" description="Notify me when a long generation finishes.">
            <Switch aria-label="Notify when AI responses finish" defaultChecked />
          </Row>
          <Row title="Product updates">
            <Switch aria-label="Notify about product updates" />
          </Row>
        </ul>
      </Panel>,
    ],
    [
      'credits',
      'Credits & billing',
      <Panel
        key="c"
        title="Credits & billing"
        description="Pro plan · credits reset daily at 00:00 UTC"
      >
        <Progress
          label="Credits left today"
          value={50}
          max={200}
          showValue
          formatValue={(v, m) => `${v} of ${m}`}
        />
        <ul className="orbit-settings">
          <Row title="Plan" description="Pro · $20 per month">
            <Button size="small">Upgrade to Team</Button>
          </Row>
          <Row title="Payment method" description="Visa ending 4242">
            <Button size="small" variant="secondary" appearance="outline">
              Update
            </Button>
          </Row>
          {['Oct', 'Sep', 'Aug'].map((m) => (
            <Row key={m} title={`Invoice · 1 ${m} 2026`} description="$20.00 · Paid">
              <Button size="small" appearance="text">
                Download
              </Button>
            </Row>
          ))}
        </ul>
      </Panel>,
    ],
    [
      'personal',
      'Personalization',
      <Panel key="p" title="Personalization">
        <div className="orbit-form">
          <Select label="Response tone" defaultValue="friendly">
            {['Friendly', 'Professional', 'Concise', 'Playful'].map((t) => (
              <SelectItem key={t} value={t.toLowerCase()}>
                {t}
              </SelectItem>
            ))}
          </Select>
          <Slider
            label="Creativity"
            value={creativity}
            onValueChange={setCreativity}
            description={`${creativity[0]}%: higher is more surprising, lower is more predictable.`}
          />
          <Select label="Output length" defaultValue="medium">
            <SelectItem value="short">Short</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="long">Long</SelectItem>
          </Select>
          <Textarea
            label="Custom instructions"
            rows={3}
            maxLength={1500}
            showCount
            placeholder="How should Orbit AI respond?"
          />
          <div className="orbit-form__two">
            <InputField label="Nickname" defaultValue="Maya" />
            <InputField label="Occupation" defaultValue={me.role} />
          </div>
        </div>
      </Panel>,
    ],
    [
      'memory',
      'Memory',
      <Panel key="m" title="Memory">
        <ul className="orbit-settings">
          <Row title="Use memory" description="Let Orbit AI remember details across chats.">
            <Switch aria-label="Use memory" defaultChecked />
          </Row>
          <Row title="Save chat history">
            <Switch aria-label="Save chat history" defaultChecked />
          </Row>
          <Row title="Stored context" description="12 memories · 3 folders">
            <Button size="small" variant="secondary" appearance="outline">
              Import chats
            </Button>
            <Button size="small" variant="danger" appearance="outline">
              Clear all
            </Button>
          </Row>
        </ul>
      </Panel>,
    ],
    [
      'files',
      'Files & media',
      <Panel key="f" title="Files & media">
        <div className="orbit-form__two">
          <Select label="Maximum upload size" defaultValue="50">
            {['10', '25', '50', '100'].map((s) => (
              <SelectItem key={s} value={s}>{`${s} MB`}</SelectItem>
            ))}
          </Select>
          <InputField label="Allowed formats" defaultValue="PDF, DOCX, PNG, JPG, CSV, MP4" />
          <Select label="Default export format" defaultValue="png">
            {['PNG', 'JPG', 'WebP', 'PDF'].map((s) => (
              <SelectItem key={s} value={s.toLowerCase()}>
                {s}
              </SelectItem>
            ))}
          </Select>
          <Select label="Compression quality" defaultValue="high">
            {['Low', 'Medium', 'High', 'Lossless'].map((s) => (
              <SelectItem key={s} value={s.toLowerCase()}>
                {s}
              </SelectItem>
            ))}
          </Select>
        </div>
      </Panel>,
    ],
    [
      'models',
      'Models',
      <Panel key="mo" title="Models" description="Choose which models appear in the model menu.">
        <ul className="orbit-settings">
          {[...new Set(Object.values(config).flatMap((c) => c.models.slice(1)))].map((m) => (
            <Row key={m} title={m}>
              <Switch aria-label={`Show ${m}`} defaultChecked />
            </Row>
          ))}
        </ul>
      </Panel>,
    ],
    [
      'connectors',
      'Connectors',
      <Panel key="co" title="Connectors">
        <ul className="orbit-settings">
          {[
            ['Google Drive', <HardDrive key="d" />, true],
            ['GitHub', <GitBranch key="g" />, true],
            ['Calendar', <Calendar key="c" />, false],
            ['Slack', <MessageSquare key="s" />, false],
          ].map(([name, icon, on]) => (
            <li key={name as string}>
              <span className="row">
                <FeaturedIcon
                  icon={icon as ReactNode}
                  size="small"
                  appearance="modern"
                  shape="square"
                />
                <strong>{name}</strong>
              </span>
              <Button
                size="small"
                variant={on ? 'secondary' : 'primary'}
                appearance={on ? 'outline' : 'filled'}
              >
                {on ? 'Disconnect' : 'Connect'}
              </Button>
            </li>
          ))}
          <Row title="Production API key" description="sk_live_7f3k••••••••2b6n">
            <Button size="small" variant="secondary" appearance="outline" iconStart={<KeyRound />}>
              Rotate
            </Button>
            <Button size="small" variant="danger" appearance="outline">
              Revoke
            </Button>
          </Row>
        </ul>
      </Panel>,
    ],
    [
      'data',
      'Data controls',
      <Panel key="da" title="Data controls">
        <ul className="orbit-settings">
          <Row title="Keep chats for">
            <Select label="Retention period" hideLabel size="small" defaultValue="90">
              {['30', '90', '365'].map((d) => (
                <SelectItem key={d} value={d}>{`${d} days`}</SelectItem>
              ))}
            </Select>
          </Row>
          <Row title="Improve the model" description="Use anonymised chats to train future models.">
            <Switch aria-label="Use anonymised chats for training" />
          </Row>
          <Row title="Use location" description="For local information like weather and time.">
            <Switch aria-label="Use location" />
          </Row>
          <Row title="Export data" description="A ZIP of every chat and file.">
            <Button
              size="small"
              variant="secondary"
              appearance="outline"
              onClick={() => toast({ title: 'Export started. We’ll email you.' })}
            >
              Export
            </Button>
          </Row>
          <Row title="Delete all chats">
            <Button size="small" variant="danger">
              Delete
            </Button>
          </Row>
        </ul>
      </Panel>,
    ],
  ];
  return (
    <Page
      path="/ai/settings"
      description="How Orbit AI behaves, what it remembers and what it can reach."
    >
      <Tabs
        appearance="subtle"
        orientation="vertical"
        defaultValue="account"
        className="orbit-vtabs"
      >
        <TabList label="Settings sections">
          {sections.map(([id, label]) => (
            <Tab key={id} value={id}>
              {label}
            </Tab>
          ))}
        </TabList>
        {sections.map(([id, , body]) => (
          <TabPanel key={id} value={id}>
            <div className="orbit-stack">{body}</div>
          </TabPanel>
        ))}
      </Tabs>
    </Page>
  );
}

const titles: Record<Kind, string> = {
  text: 'Write, summarise and brainstorm with Orbit AI.',
  image: 'Create images from a description.',
  code: 'Generate, explain and fix code.',
  video: 'Turn a description into a short clip.',
};

export default function Ai({ path }: { path: string }) {
  const kind = path.split('/')[2];
  if (kind === 'settings') return <AiSettings />;
  const k = (kind in config ? kind : 'text') as Kind;
  return (
    <Page path={`/ai/${k}`} description={titles[k]}>
      <Generator key={k} kind={k} />
    </Page>
  );
}
