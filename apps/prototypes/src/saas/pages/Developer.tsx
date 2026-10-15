/**
 * Orbit's developer pages: API keys and integrations.
 */
import { useState, type ReactNode } from 'react';
import {
  Button,
  FeaturedIcon,
  IconButton,
  InputField,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  Select,
  SelectItem,
  Switch,
  Table,
  TableCard,
  useToast,
  type TableColumn,
} from '@ds/react';
import {
  Calendar,
  CheckSquare,
  Copy,
  KeyRound,
  LayoutList,
  Mail,
  MessageSquare,
  NotebookPen,
  Plus,
  RefreshCw,
  Send,
  Trash2,
  KanbanSquare,
  Video,
  Workflow,
} from 'lucide-react';
import { Page } from '../Shell';
import { Status } from '../ui';

/* --------------------------------------------------------------- API keys */

type Key = { id: string; name: string; key: string; on: boolean; created: string; used: string };

const mask = (k: string) => `${k.slice(0, 7)}••••••••${k.slice(-4)}`;
const newKey = () =>
  `sk_live_${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 10)}`;

function ApiKeys() {
  const toast = useToast();
  const [keys, setKeys] = useState<Key[]>([
    {
      id: 'prod',
      name: 'Production',
      key: 'sk_live_7f3k2m9q8x1v4b6n',
      on: false,
      created: '25 Jan 2026',
      used: 'Today, 10:45',
    },
    {
      id: 'dev',
      name: 'Development',
      key: 'sk_live_2h8j4k6l1z3x5c7v',
      on: true,
      created: '29 Dec 2025',
      used: 'Today, 00:40',
    },
    {
      id: 'legacy',
      name: 'Legacy',
      key: 'sk_live_9q1w3e5r7t2y4u6i',
      on: true,
      created: '12 Mar 2025',
      used: 'Yesterday, 23:45',
    },
  ]);
  const [name, setName] = useState('');
  const [regen, setRegen] = useState<Key | null>(null);

  const columns: TableColumn<Key>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (k) => (
        <span className="stack-text">
          <strong>{k.name} key</strong>
          <code className="muted text-sm">{mask(k.key)}</code>
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (k) => <Status>{k.on ? 'Active' : 'Disabled'}</Status>,
    },
    { key: 'created', header: 'Created', hideBelow: 'medium' },
    { key: 'used', header: 'Last used', hideBelow: 'large' },
    {
      key: 'on',
      header: 'Enabled',
      render: (k) => (
        <Switch
          aria-label={`Enable ${k.name} key`}
          checked={k.on}
          onCheckedChange={(v) =>
            setKeys((l) => l.map((x) => (x.id === k.id ? { ...x, on: v } : x)))
          }
        />
      ),
    },
    {
      key: 'actions',
      header: <span className="visually-hidden">Actions</span>,
      align: 'end',
      render: (k) => (
        <span className="row">
          <IconButton
            icon={<Copy />}
            label={`Copy ${k.name} key`}
            variant="secondary"
            appearance="ghost"
            size="small"
            onClick={() => {
              void navigator.clipboard?.writeText(k.key).catch(() => {});
              toast({ title: 'Key copied' });
            }}
          />
          <IconButton
            icon={<RefreshCw />}
            label={`Regenerate ${k.name} key`}
            variant="secondary"
            appearance="ghost"
            size="small"
            onClick={() => setRegen(k)}
          />
        </span>
      ),
    },
  ];

  return (
    <Page
      path="/pages/api-keys"
      description="API keys authenticate requests to the Orbit API. Keep them secret."
      actions={
        <Modal>
          <ModalTrigger asChild>
            <Button iconStart={<Plus />}>Add API key</Button>
          </ModalTrigger>
          <ModalContent
            icon={<KeyRound />}
            title="Generate an API key"
            description="Name the app that will use it, so you can recognise the key later."
          >
            <InputField
              label="Application name"
              placeholder="e.g. Billing sync"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="secondary" appearance="outline">
                  Close
                </Button>
              </ModalClose>
              <ModalClose asChild>
                <Button
                  disabled={!name.trim()}
                  onClick={() => {
                    setKeys((l) => [
                      { id: name, name, key: newKey(), on: true, created: 'Today', used: 'Never' },
                      ...l,
                    ]);
                    setName('');
                    toast({ title: 'API key generated', tone: 'success' });
                  }}
                >
                  Generate key
                </Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    >
      <TableCard title="Keys" titleAs="h2" badge={`${keys.length} keys`}>
        <Table<Key> caption="API keys" hideCaption columns={columns} rows={keys} />
      </TableCard>
      <Modal open={regen !== null} onOpenChange={(o) => !o && setRegen(null)}>
        {regen && (
          <ModalContent
            role="alertdialog"
            size="small"
            icon={<RefreshCw />}
            iconTone="warning"
            title={`Regenerate the ${regen.name} key?`}
            description="The current key stops working straight away. Apps using it need the new one."
          >
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="secondary" appearance="outline">
                  Cancel
                </Button>
              </ModalClose>
              <Button
                onClick={() => {
                  setKeys((l) =>
                    l.map((x) =>
                      x.id === regen.id ? { ...x, key: newKey(), created: 'Today' } : x,
                    ),
                  );
                  setRegen(null);
                  toast({ title: 'Key regenerated', tone: 'success' });
                }}
              >
                Regenerate
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </Page>
  );
}

/* ----------------------------------------------------------- integrations */

const apps: { id: string; name: string; description: string; icon: ReactNode; on: boolean }[] = [
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing and campaign automation.',
    icon: <Mail />,
    on: true,
  },
  {
    id: 'meet',
    name: 'Google Meet',
    description: 'Video calls from any meeting invite.',
    icon: <Video />,
    on: true,
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Virtual meetings and webinars.',
    icon: <Video />,
    on: false,
  },
  {
    id: 'loom',
    name: 'Loom',
    description: 'Record and share video messages.',
    icon: <Send />,
    on: false,
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Track issues and progress.',
    icon: <LayoutList />,
    on: true,
  },
  { id: 'gmail', name: 'Gmail', description: 'Send and manage email.', icon: <Mail />, on: true },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Boards and to-dos for every team.',
    icon: <KanbanSquare />,
    on: false,
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Docs, wikis and notes.',
    icon: <NotebookPen />,
    on: true,
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Issue tracking and project management.',
    icon: <CheckSquare />,
    on: false,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Alerts and updates in your channels.',
    icon: <MessageSquare />,
    on: true,
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    description: 'Sync meetings and due dates.',
    icon: <Calendar />,
    on: false,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automate work across 6,000+ apps.',
    icon: <Workflow />,
    on: false,
  },
];

function Credentials({ app }: { app?: string }) {
  return (
    <div className="orbit-form">
      <Select label="App" defaultValue={app} placeholder="Select an app">
        {apps.map((a) => (
          <SelectItem key={a.id} value={a.id}>
            {a.name}
          </SelectItem>
        ))}
      </Select>
      <InputField label="Client ID" />
      <InputField label="Client secret" type="password" />
      <InputField
        label="Authentication base URI"
        type="url"
        placeholder="https://"
        description="A full URI is shortened to its subdomain for display."
      />
    </div>
  );
}

function Integrations() {
  const toast = useToast();
  const [on, setOn] = useState(() => Object.fromEntries(apps.map((a) => [a.id, a.on])));
  const [remove, setRemove] = useState<(typeof apps)[number] | null>(null);
  return (
    <Page
      path="/pages/integrations"
      description="Connect Orbit to the tools your team already uses."
      actions={
        <Modal>
          <ModalTrigger asChild>
            <Button iconStart={<Plus />}>Add integration</Button>
          </ModalTrigger>
          <ModalContent
            title="Add an integration"
            description="Paste the credentials from the app’s developer settings."
          >
            <Credentials />
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="secondary" appearance="outline">
                  Close
                </Button>
              </ModalClose>
              <ModalClose asChild>
                <Button onClick={() => toast({ title: 'Integration added', tone: 'success' })}>
                  Add integration
                </Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    >
      <div className="orbit-grid orbit-grid--3">
        {apps.map((a) => (
          <article key={a.id} className="orbit-app">
            <div className="row row--between">
              <FeaturedIcon icon={a.icon} appearance="modern" shape="square" />
              <Switch
                aria-label={`Connect ${a.name}`}
                checked={on[a.id]}
                onCheckedChange={(v) => setOn((s) => ({ ...s, [a.id]: v }))}
              />
            </div>
            <h2 className="orbit-app__name">{a.name}</h2>
            <p className="muted text-sm orbit-app__text">{a.description}</p>
            <div className="orbit-app__foot">
              <Status>{on[a.id] ? 'Connected' : 'Inactive'}</Status>
              <span className="row">
                <Button
                  appearance="text"
                  variant="secondary"
                  size="small"
                  onClick={() => setRemove(a)}
                >
                  Remove
                </Button>
                <Modal>
                  <ModalTrigger asChild>
                    <Button
                      variant="secondary"
                      appearance="outline"
                      size="small"
                      aria-label={`Details for ${a.name}`}
                    >
                      Details
                    </Button>
                  </ModalTrigger>
                  <ModalContent
                    icon={a.icon}
                    title={`${a.name} settings`}
                    description={a.description}
                  >
                    <Credentials app={a.id} />
                    <ModalFooter>
                      <ModalClose asChild>
                        <Button variant="secondary" appearance="outline">
                          Close
                        </Button>
                      </ModalClose>
                      <ModalClose asChild>
                        <Button onClick={() => toast({ title: 'Changes saved', tone: 'success' })}>
                          Save changes
                        </Button>
                      </ModalClose>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </span>
            </div>
          </article>
        ))}
      </div>
      <Modal open={remove !== null} onOpenChange={(o) => !o && setRemove(null)}>
        {remove && (
          <ModalContent
            role="alertdialog"
            size="small"
            icon={<Trash2 />}
            iconTone="danger"
            title={`Remove ${remove.name}?`}
            description="Orbit stops syncing with it. You can connect it again later."
          >
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="secondary" appearance="outline">
                  No, cancel
                </Button>
              </ModalClose>
              <Button
                variant="danger"
                onClick={() => {
                  setOn((s) => ({ ...s, [remove.id]: false }));
                  setRemove(null);
                  toast({ title: `${remove.name} removed` });
                }}
              >
                Yes, remove
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </Page>
  );
}

export default function Developer({ path }: { path: string }) {
  return path.endsWith('integrations') ? <Integrations /> : <ApiKeys />;
}
