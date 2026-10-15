/**
 * Orbit's content pages: user profile, file manager, pricing, FAQ and a blank page.
 */
import { useState, type ReactNode } from 'react';
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  DonutChart,
  EmptyState,
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
  Switch,
  Textarea,
  useToast,
  Card,
  PricingCard,
  SettingsList,
} from '@ds/react';
import {
  AppWindow,
  AtSign,
  Download,
  FileText,
  Film,
  Folder,
  Globe,
  Image,
  Link2,
  LogOut,
  Mail,
  MapPin,
  Music,
  Pencil,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react';
import { me } from '../data';
import { Page, to } from '../Shell';
import { DataTable, Panel, RowMenu } from '../ui';
import { Segmented } from '../../Segmented';

/* ---------------------------------------------------------------- profile */

function EditModal({
  title,
  children,
  onSave,
}: {
  title: string;
  children: ReactNode;
  onSave: () => void;
}) {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button
          variant="secondary"
          appearance="outline"
          size="small"
          iconStart={<Pencil />}
          aria-label={`Edit ${title.toLowerCase()}`}
        >
          Edit
        </Button>
      </ModalTrigger>
      <ModalContent
        title={`Edit ${title.toLowerCase()}`}
        description="Update your details to keep your profile up to date."
        size="large"
      >
        <div className="orbit-form">{children}</div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary" appearance="outline">
              Close
            </Button>
          </ModalClose>
          <ModalClose asChild>
            <Button onClick={onSave}>Save changes</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function Facts({ items }: { items: [string, string][] }) {
  return (
    <dl className="orbit-grid-facts">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt className="muted text-sm">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Profile() {
  const toast = useToast();
  const saved = () => toast({ title: 'Profile updated', tone: 'success' });
  const [twoFa, setTwoFa] = useState(false);
  const [first, last] = me.name.split(' ');
  return (
    <Page path="/profile" title="My profile">
      <Card as="section" appearance="outlined" className="orbit-profile">
        <Avatar name={me.name} src={me.src} size="xlarge" verified />
        <span className="stack-text orbit-profile__who">
          <strong className="orbit-h2">{me.name}</strong>
          <span className="muted">
            {me.role} · <MapPin aria-hidden="true" className="orbit-inline-icon" /> {me.location}
          </span>
        </span>
        <span className="row">
          {[
            ['Website', <Globe key="g" />],
            ['X', <AtSign key="x" />],
            ['LinkedIn', <Link2 key="l" />],
            ['Email', <Mail key="m" />],
          ].map(([label, icon]) => (
            <IconButton
              key={label as string}
              icon={icon}
              label={label as string}
              variant="secondary"
              appearance="outline"
              size="small"
            />
          ))}
        </span>
      </Card>
      <Panel
        title="Personal information"
        actions={
          <EditModal title="Personal information" onSave={saved}>
            <div className="row">
              <Avatar name={me.name} src={me.src} size="large" decorative />
              <FileUpload
                id="avatar"
                accept="image/png,image/jpeg"
                hint="Square JPG or PNG, at least 200×200 px"
              />
            </div>
            <div className="orbit-form__two">
              <InputField label="First name" defaultValue={first} />
              <InputField label="Last name" defaultValue={last} />
              <InputField label="Email address" type="email" defaultValue={me.email} />
              <InputField label="Phone" type="tel" defaultValue="+351 912 345 678" />
            </div>
            <Textarea label="Bio" rows={3} defaultValue={`${me.role} at Orbit.`} />
            <div className="orbit-form__two">
              <InputField label="Website" type="url" defaultValue="https://maya.design" />
              <InputField label="X" defaultValue="@mayaokafor" />
              <InputField label="LinkedIn" defaultValue="linkedin.com/in/mayaokafor" />
              <InputField label="Instagram" defaultValue="@maya.makes" />
            </div>
          </EditModal>
        }
      >
        <Facts
          items={[
            ['First name', first],
            ['Last name', last],
            ['Email address', me.email],
            ['Phone', '+351 912 345 678'],
            ['Bio', me.role],
          ]}
        />
      </Panel>
      <Panel
        title="Address"
        actions={
          <EditModal title="Address" onSave={saved}>
            <div className="orbit-form__two">
              <Select label="Country" defaultValue="pt">
                <SelectItem value="pt">Portugal</SelectItem>
                <SelectItem value="ae">United Arab Emirates</SelectItem>
                <SelectItem value="us">United States</SelectItem>
              </Select>
              <InputField label="City / state" defaultValue="Lisbon" />
              <InputField label="Postal code" defaultValue="1100-053" />
              <InputField label="Tax ID" defaultValue="PT 509 123 456" />
            </div>
          </EditModal>
        }
      >
        <Facts
          items={[
            ['Country', 'Portugal'],
            ['City / state', 'Lisbon'],
            ['Postal code', '1100-053'],
            ['Tax ID', 'PT 509 123 456'],
          ]}
        />
      </Panel>
      <Panel title="Security">
        <SettingsList
          items={[
            {
              id: 'password',
              title: 'Password',
              description: 'Last changed 3 months ago.',
              control: (
                <Button variant="secondary" appearance="outline" size="small">
                  Change password
                </Button>
              ),
            },
            {
              id: '2fa',
              title: 'Two-factor authentication',
              description: 'Ask for a code from your phone when you sign in.',
              control: (
                <Switch
                  aria-label="Two-factor authentication"
                  checked={twoFa}
                  onCheckedChange={setTwoFa}
                />
              ),
            },
            {
              id: 'alerts',
              title: 'Real-time alerts',
              description: 'Email me about sign-ins from new devices.',
              control: <Switch aria-label="Real-time alerts" defaultChecked />,
            },
          ]}
        />
      </Panel>
      <Panel title="Danger zone">
        <SettingsList
          items={[
            {
              id: 'sign-out',
              title: 'Sign out of every device',
              description: 'Ends every active session, including this one.',
              control: (
                <Button
                  variant="secondary"
                  appearance="outline"
                  size="small"
                  iconStart={<LogOut />}
                >
                  Sign out everywhere
                </Button>
              ),
            },
            {
              id: 'delete',
              title: 'Delete account',
              description: 'Removes your account and data for good.',
              control: (
                <Modal>
                  <ModalTrigger asChild>
                    <Button variant="danger" size="small" iconStart={<Trash2 />}>
                      Delete account
                    </Button>
                  </ModalTrigger>
                  <ModalContent
                    role="alertdialog"
                    size="small"
                    icon={<Trash2 />}
                    iconTone="danger"
                    title="Delete your account?"
                    description="Your workspaces, files and history are deleted. This can’t be undone."
                  >
                    <ModalFooter>
                      <ModalClose asChild>
                        <Button variant="secondary" appearance="outline">
                          Cancel
                        </Button>
                      </ModalClose>
                      <ModalClose asChild>
                        <Button variant="danger">Delete account</Button>
                      </ModalClose>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              ),
            },
          ]}
        />
      </Panel>
    </Page>
  );
}

/* ----------------------------------------------------------- file manager */

const kinds = [
  {
    label: 'Images',
    icon: <Image />,
    used: 17,
    files: 245,
    size: '26.4 GB',
    tone: 'primary' as const,
  },
  {
    label: 'Videos',
    icon: <Film />,
    used: 22,
    files: 112,
    size: '34.1 GB',
    tone: 'warning' as const,
  },
  {
    label: 'Audio',
    icon: <Music />,
    used: 24,
    files: 380,
    size: '12.6 GB',
    tone: 'success' as const,
  },
  {
    label: 'Apps',
    icon: <AppWindow />,
    used: 46,
    files: 58,
    size: '61.2 GB',
    tone: 'danger' as const,
  },
  {
    label: 'Docs',
    icon: <FileText />,
    used: 18,
    files: 940,
    size: '8.3 GB',
    tone: 'primary' as const,
  },
  {
    label: 'Downloads',
    icon: <Download />,
    used: 16,
    files: 211,
    size: '14.9 GB',
    tone: 'success' as const,
  },
];

function Files() {
  return (
    <Page
      path="/pages/files"
      description="Everything your workspace has uploaded."
      actions={
        <Modal>
          <ModalTrigger asChild>
            <Button iconStart={<Upload />}>Upload file</Button>
          </ModalTrigger>
          <ModalContent title="Upload files" size="large">
            <FileUpload id="files" multiple hint="Up to 2 GB per file" />
            <ModalFooter>
              <ModalClose asChild>
                <Button>Done</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    >
      <section className="orbit-grid orbit-grid--5" aria-label="Storage by type">
        {kinds.map((k) => (
          <Card key={k.label}>
            <div className="row row--between">
              <FeaturedIcon icon={k.icon} appearance="modern" shape="square" />
              <span className="muted text-sm">{k.used}% used</span>
            </div>
            <strong>{k.label}</strong>
            <Progress
              label={`${k.label} storage`}
              hideLabel
              value={k.used}
              size="small"
              tone={k.tone}
            />
            <span className="muted text-sm">
              {k.files} files · {k.size}
            </span>
          </Card>
        ))}
      </section>
      <div className="orbit-row">
        <section className="orbit-stack" aria-labelledby="folders">
          <h2 id="folders" className="orbit-h2">
            Folders
          </h2>
          <div className="orbit-grid">
            {[
              ['Brand assets', 345, '26.4 GB'],
              ['Contracts', 130, '2.1 GB'],
              ['Product shots', 812, '48.0 GB'],
              ['Exports', 96, '5.7 GB'],
            ].map(([name, files, size]) => (
              <Card key={name as string}>
                <div className="row row--between">
                  <FeaturedIcon
                    icon={<Folder />}
                    appearance="modern"
                    shape="square"
                    tone="warning"
                  />
                  <RowMenu label={name as string} />
                </div>
                <strong>{name}</strong>
                <span className="muted text-sm">
                  {files} files · {size}
                </span>
              </Card>
            ))}
          </div>
        </section>
        <Panel title="Storage" description="585 GB free of 1 TB" menu>
          <DonutChart
            title="Storage used by type"
            hideTitle
            data={kinds.map((k) => ({ label: k.label, value: parseFloat(k.size) }))}
            formatValue={(v) => `${v} GB`}
            centerValue="157 GB"
            centerLabel="Used"
            size={180}
          />
        </Panel>
      </div>
      <DataTable
        title="Recent files"
        actions={
          <Button variant="secondary" appearance="outline" size="small" href={to('/pages/files')}>
            View all
          </Button>
        }
        rows={[
          ['Launch-video-final.mp4', 'Video', '89 MB', '12 Oct 2026'],
          ['Team-offsite.jpeg', 'Image', '5 MB', '11 Oct 2026'],
          ['MSA-Northwind.pdf', 'Document', '1.2 MB', '10 Oct 2026'],
          ['Demo-recording.mp4', 'Video', '489 MB', '8 Oct 2026'],
          ['Hero-mountain.png', 'Image', '8 MB', '6 Oct 2026'],
          ['Q3-board-deck.pdf', 'Document', '12 MB', '2 Oct 2026'],
          ['Podcast-ep-14.mp3', 'Audio', '64 MB', '29 Sep 2026'],
        ].map(([name, kind, size, date]) => ({ name, kind, size, date }))}
        rowId={(r) => r.name}
        selectable
        rowLabel={(r) => `Select ${r.name}`}
        columns={[
          {
            key: 'name',
            header: 'File name',
            render: (r) => (
              <span className="row">
                <FeaturedIcon
                  icon={
                    r.kind === 'Video' ? (
                      <Film />
                    ) : r.kind === 'Image' ? (
                      <Image />
                    ) : r.kind === 'Audio' ? (
                      <Music />
                    ) : (
                      <FileText />
                    )
                  }
                  size="small"
                  appearance="modern"
                  shape="square"
                />
                <strong>{r.name}</strong>
              </span>
            ),
          },
          { key: 'kind', header: 'Category', hideBelow: 'medium' },
          { key: 'size', header: 'Size', align: 'end' },
          { key: 'date', header: 'Modified', hideBelow: 'large' },
          {
            key: 'menu',
            header: <span className="visually-hidden">Actions</span>,
            width: 48,
            render: (r) => <RowMenu label={r.name} />,
          },
        ]}
      />
    </Page>
  );
}

/* ---------------------------------------------------------------- pricing */

const features = [
  'Unlimited projects',
  'Custom domains',
  'Free SSL',
  'Unlimited traffic',
  '30-day version history',
  'Sharing permissions',
  'Admin tools',
  'SCIM user provisioning',
  'Advanced security',
];

function PlanCard({
  name,
  price,
  period,
  blurb,
  count,
  cta,
  badge,
  featured,
}: {
  name: string;
  price: string;
  period?: string;
  blurb: string;
  count: number;
  cta: ReactNode;
  badge?: string;
  featured?: boolean;
}) {
  return (
    <PricingCard
      name={name}
      price={price}
      period={period}
      description={blurb}
      features={features.slice(0, count)}
      action={cta}
      badge={badge}
      featured={featured}
    />
  );
}

function Pricing() {
  const [annual, setAnnual] = useState(false);
  const p = (m: number) => (annual ? `$${m * 10}` : `$${m}`);
  const per = annual ? '/ year' : '/ month';
  return (
    <Page
      path="/pages/pricing"
      title="Pricing"
      description="Plans that grow with you. Switch or cancel any time."
    >
      <section className="orbit-stack" aria-labelledby="recurring">
        <div className="orbit-toolbar">
          <h2 id="recurring" className="orbit-h2">
            Subscriptions
          </h2>
          <Segmented
            label="Billing period"
            options={[
              ['monthly', 'Monthly'],
              ['annual', 'Annually · save 17%'],
            ]}
            value={annual ? 'annual' : 'monthly'}
            onChange={(v) => setAnnual(v === 'annual')}
          />
        </div>
        <div className="orbit-grid orbit-grid--3">
          <PlanCard
            name="Starter"
            price={p(19)}
            period={per}
            blurb="For individuals getting started."
            count={4}
            cta={
              <Button variant="secondary" appearance="outline" fullWidth>
                Choose Starter
              </Button>
            }
          />
          <PlanCard
            name="Growth"
            price={p(49)}
            period={per}
            blurb="For small teams shipping every week."
            count={6}
            badge="Most popular"
            featured
            cta={<Button fullWidth>Choose Growth</Button>}
          />
          <PlanCard
            name="Scale"
            price={p(99)}
            period={per}
            blurb="For companies with many workspaces."
            count={7}
            cta={
              <Button variant="secondary" appearance="outline" fullWidth>
                Choose Scale
              </Button>
            }
          />
        </div>
      </section>
      <section className="orbit-stack" aria-labelledby="lifetime">
        <h2 id="lifetime" className="orbit-h2">
          Lifetime licences
        </h2>
        <div className="orbit-grid orbit-grid--3">
          <PlanCard
            name="Personal"
            price="$59"
            period="once"
            blurb="One seat, forever."
            count={4}
            cta={
              <Button variant="secondary" appearance="outline" fullWidth>
                Choose Personal
              </Button>
            }
          />
          <PlanCard
            name="Professional"
            price="$199"
            period="once"
            blurb="Up to 5 seats, forever."
            count={6}
            cta={
              <Button variant="secondary" appearance="outline" fullWidth>
                Choose Professional
              </Button>
            }
          />
          <PlanCard
            name="Enterprise"
            price="$599"
            period="once"
            blurb="Unlimited seats, forever."
            count={8}
            cta={
              <Button variant="secondary" appearance="outline" fullWidth>
                Choose Enterprise
              </Button>
            }
          />
        </div>
      </section>
      <section className="orbit-stack" aria-labelledby="teams">
        <h2 id="teams" className="orbit-h2">
          For teams
        </h2>
        <div className="orbit-grid">
          <PlanCard
            name="Free"
            price="$0"
            period="forever"
            blurb="For trying Orbit out."
            count={2}
            badge="Current plan"
            cta={
              <Button variant="secondary" appearance="outline" fullWidth disabled>
                Current plan
              </Button>
            }
          />
          <PlanCard
            name="Professional"
            price="$99"
            period="/ year"
            blurb="Adds version history."
            count={5}
            cta={
              <Button variant="secondary" appearance="outline" fullWidth>
                Try for free
              </Button>
            }
          />
          <PlanCard
            name="Team"
            price="$299"
            period="/ year"
            blurb="Adds sharing and admin tools."
            count={7}
            badge="Recommended"
            featured
            cta={<Button fullWidth>Try for free</Button>}
          />
          <PlanCard
            name="Enterprise"
            price="Custom"
            blurb="Adds SCIM and advanced security."
            count={9}
            cta={
              <Button variant="secondary" appearance="outline" fullWidth href={to('/support/chat')}>
                Contact sales
              </Button>
            }
          />
        </div>
      </section>
    </Page>
  );
}

/* -------------------------------------------------------------------- FAQ */

const faqs: [string, [string, string][]][] = [
  [
    'Getting started',
    [
      [
        'Do I get free updates?',
        'Yes. Every plan includes product updates for as long as your subscription is active; lifetime licences include them forever.',
      ],
      [
        'Can I customise Orbit to suit my needs?',
        'Yes. Themes, navigation, dashboards and fields are all configurable from Settings, and the API covers the rest.',
      ],
      [
        'What does “unlimited projects” mean?',
        'You can create as many projects as you like on any paid plan. Storage limits still apply.',
      ],
    ],
  ],
  [
    'Plans & billing',
    [
      [
        'Which licence suits me?',
        'Choose a subscription if you want to pay as you go; choose a lifetime licence to pay once.',
      ],
      [
        'What are “seats” on the pricing page?',
        'A seat is one person who can sign in. Guests and viewers are free.',
      ],
      [
        'Can I upgrade to a higher plan later?',
        'Any time. We credit what’s left of your current plan against the new one.',
      ],
      ['Do you offer refunds?', 'Yes, within 30 days of any payment, no questions asked.'],
    ],
  ],
  [
    'Product',
    [
      [
        'Are there dark and light modes?',
        'Yes. Switch with the moon icon in the top bar or follow your system setting.',
      ],
      [
        'Is Orbit available in Arabic?',
        'Yes. Choose العربية from your account menu; the layout switches to right-to-left.',
      ],
      [
        'Where is my data stored?',
        'In the EU by default, with US and Middle East regions on Enterprise.',
      ],
    ],
  ],
];

function Faq() {
  return (
    <Page
      path="/pages/faq"
      title="Frequently asked questions"
      description="Answers to what people ask us most."
    >
      <div className="orbit-row orbit-row--1-2">
        <Panel title="Still stuck?" description="Our team replies within a few hours.">
          <Button href={to('/support/chat')} fullWidth>
            Chat with support
          </Button>
          <Button variant="secondary" appearance="outline" href={to('/support/tickets')} fullWidth>
            Open a ticket
          </Button>
        </Panel>
        <div className="orbit-stack">
          {faqs.map(([group, qs]) => (
            <Panel key={group} title={group}>
              <Accordion type="single" collapsible defaultValue={`${group}-0`}>
                {qs.map(([q, a], i) => (
                  <AccordionItem key={q} value={`${group}-${i}`} title={q} headingLevel={3}>
                    <p className="muted">{a}</p>
                  </AccordionItem>
                ))}
              </Accordion>
            </Panel>
          ))}
        </div>
      </div>
    </Page>
  );
}

/* ------------------------------------------------------------------ blank */

function Blank() {
  return (
    <Page path="/pages/blank" title="Blank page" description="A starting point for a new page.">
      <Card as="section" appearance="outlined">
        <EmptyState
          size="large"
          icon={<Plus />}
          title="Nothing here yet"
          description="Start building: add cards, tables and charts from the component library."
          actions={
            <>
              <Button href="../" variant="secondary" appearance="outline">
                Browse components
              </Button>
              <Button href={to('')}>Back to overview</Button>
            </>
          }
        />
      </Card>
    </Page>
  );
}

const pages: Record<string, () => ReactNode> = {
  '/profile': Profile,
  '/pages/files': Files,
  '/pages/pricing': Pricing,
  '/pages/faq': Faq,
  '/pages/blank': Blank,
};

export default function Content({ path }: { path: string }) {
  const P = pages[path] ?? Blank;
  return <P />;
}
