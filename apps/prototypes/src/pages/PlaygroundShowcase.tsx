import { useId, useState, type Key, type ReactNode } from 'react';
import {
  Accordion,
  AccordionItem,
  Alert,
  AppsNotifications,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  ChooseCard,
  ChooseCardGroup,
  Combobox,
  EmptyState,
  FormField,
  Header,
  IconButton,
  Inline,
  InputField,
  List,
  ListItem,
  Logo,
  MeetingCard,
  Navbar,
  Pagination,
  ProductCard,
  Radio,
  RadioGroup,
  SearchField,
  Select,
  SelectItem,
  SideNav,
  Slider,
  Stack,
  Stat,
  Stepper,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Table,
  Tabs,
  Textarea,
  Tooltip,
} from '@ds/react';
import {
  ArrowRight,
  BarChart3,
  Bell,
  Download,
  Heart,
  House,
  Inbox,
  Lock,
  Mail,
  Package,
  Plus,
  SearchX,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Users,
} from 'lucide-react';
import { ar } from './playground-ar';

const variants = ['primary', 'secondary', 'success', 'danger', 'warning'] as const;
const appearances = ['filled', 'outline', 'ghost', 'text'] as const;
const tones = ['primary', 'success', 'warning', 'danger'] as const;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

type Translate = (text: string) => string;
// The gallery's language follows the theme: Arabic text when it's Arabic.
const translator =
  (lang: string): Translate =>
  (text) =>
    lang === 'ar' ? (ar[text] ?? text) : text;

const people = (tx: Translate) => [
  { name: tx('Osama Eldrieny'), src: 'assets/avatar-1.png' },
  { name: tx('Sarah Chen'), src: 'assets/avatar-2.png' },
  { name: tx('Maria Garcia'), src: 'assets/avatar-3.png' },
  { name: tx('James Wilson'), src: 'assets/avatar-4.png' },
];

const skills = (tx: Translate) => [
  { value: 'design', label: tx('Product design') },
  { value: 'research', label: tx('User research') },
  { value: 'systems', label: tx('Design systems') },
  { value: 'writing', label: tx('UX writing') },
];

const families = ['primary', 'secondary', 'neutral', 'success', 'warning', 'danger', 'base'];
const steps = (family: string) =>
  family === 'base'
    ? [100, 200, 300, 400, 500, 600]
    : [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

/** The brand's palettes, like the docs: a row per color family, a swatch per step with its hex. */
function ColorPalette({ brand }: { brand: string }) {
  // Palette steps are fixed hex values on the root, so they can be read while rendering.
  const styles = getComputedStyle(document.documentElement);
  const hex: Record<string, string> = {};
  for (const f of families)
    for (const n of steps(f))
      hex[`${f}-${n}`] = styles.getPropertyValue(`--color-${brand}-${f}-${n}`).trim();
  const dark = (value = '') => {
    const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(
      value.length === 4 ? value.replace(/^#(.)(.)(.)$/, '#$1$1$2$2$3$3') : value,
    );
    if (!m) return false;
    const [r, g, b] = m.slice(1).map((c) => parseInt(c, 16));
    return 0.299 * r + 0.587 * g + 0.114 * b < 150;
  };
  return (
    <div className="proto-palette-rows">
      {families.map((f) => (
        <div key={f} className="proto-palette-row">
          <span className="proto-palette-row__name">{f}</span>
          {steps(f).map((n) => (
            <span
              key={n}
              className="proto-palette-swatch"
              style={{
                backgroundColor: `var(--color-${brand}-${f}-${n})`,
                color: dark(hex[`${f}-${n}`])
                  ? `var(--color-${brand}-base-100)`
                  : `var(--color-${brand}-neutral-1000)`,
              }}
            >
              <span>{n}</span>
              <span className="proto-palette-swatch__hex">{hex[`${f}-${n}`]}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** One component: its name, then its variants. */
function Demo({
  name,
  children,
  wide = false,
  bare = false,
  hideName = false,
  area,
  fill = false,
}: {
  name: string;
  children: ReactNode;
  wide?: boolean;
  /** For components that are cards themselves: no card around them. */
  bare?: boolean;
  /** Hides the title visually; screen readers still hear it. */
  hideName?: boolean;
  /** Grid area inside the Patterns layout. */
  area?: string;
  /** Stretches to the end of its row, filling the space next to it. */
  fill?: boolean;
}) {
  const id = useId();
  const className = [
    'proto-demo',
    wide && 'proto-demo--wide',
    fill && 'proto-demo--fill',
    area && `proto-area--${area}`,
  ]
    .filter(Boolean)
    .join(' ');
  const heading = (
    <h3 className={hideName ? 'proto-visually-hidden' : 'proto-subtitle'} id={id}>
      {name}
    </h3>
  );
  if (bare) {
    return (
      <Stack as="section" gap="xl" aria-labelledby={id} className={className}>
        {heading}
        {children}
      </Stack>
    );
  }
  return (
    <Card as="section" aria-labelledby={id} className={className}>
      <CardBody>
        {/* More space under the title than between the variants. */}
        <Stack gap="xl">
          {heading}
          <Stack gap="lg">{children}</Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}

/** A labelled variant inside a Demo. */
function Variant({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Stack gap="xs">
      <span className="proto-variant-label">{label}</span>
      {children}
    </Stack>
  );
}

/** A category heading with its component demos in a two-column grid. */
function Category({
  title,
  children,
  masonry = false,
}: {
  title: string;
  children: ReactNode;
  /** Cards flow into columns, so short cards don't leave gaps. */
  masonry?: boolean;
}) {
  return (
    <Stack as="section" gap="md" aria-label={title}>
      <h2 className="proto-title">{title}</h2>
      <div className={masonry ? 'proto-masonry' : 'proto-demos'}>{children}</div>
    </Stack>
  );
}

/** The playground preview: every component with its variants, in the chosen theme. */
export function PlaygroundShowcase({
  lang = 'en',
  brand = 'diamond',
}: {
  lang?: string;
  brand?: string;
}) {
  const tx = translator(lang);
  const [page, setPage] = useState(3);
  const [selected, setSelected] = useState<Key[]>(['#1025']);

  return (
    <div className="proto-categories">
      <Category title={tx('Foundations')}>
        <Demo name={tx('Color palette')} wide>
          <ColorPalette brand={brand} />
        </Demo>
        <Demo name={tx('Button')} wide>
          <Variant label={tx('Variants × appearances')}>
            <div
              className="proto-palette"
              role="table"
              aria-label={tx('Button variants and appearances')}
            >
              <div role="row" className="proto-palette__row">
                <span role="columnheader" className="proto-palette__head" />
                {appearances.map((a) => (
                  <span key={a} role="columnheader" className="proto-palette__head">
                    {tx(cap(a))}
                  </span>
                ))}
              </div>
              {variants.map((v) => (
                <div key={v} role="row" className="proto-palette__row">
                  <span role="rowheader" className="proto-palette__head">
                    {tx(cap(v))}
                  </span>
                  {appearances.map((a) => (
                    <span key={a} role="cell">
                      <Button variant={v} appearance={a} size="small">
                        {tx(cap(v))}
                      </Button>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </Variant>
          <Variant label={tx('Sizes, icons and states')}>
            <Inline gap="sm" align="center">
              <Button size="small">{tx('Small')}</Button>
              <Button>{tx('Medium')}</Button>
              <Button size="large">{tx('Large')}</Button>
              <Button iconStart={<Plus />}>{tx('Icon start')}</Button>
              <Button iconEnd={<ArrowRight />} appearance="outline">
                {tx('Icon end')}
              </Button>
              <Button loading>{tx('Saving')}</Button>
              <Button disabled>{tx('Disabled')}</Button>
              <Tooltip content={tx('Like')}>
                <IconButton
                  icon={<Heart />}
                  label={tx('Like')}
                  appearance="outline"
                  variant="secondary"
                />
              </Tooltip>
              <Tooltip content={tx('Delete')}>
                <IconButton icon={<Trash2 />} label={tx('Delete')} variant="danger" />
              </Tooltip>
              <Button appearance="outline" variant="secondary" iconStart={<Download />}>
                {tx('Export')}
              </Button>
            </Inline>
          </Variant>
        </Demo>
      </Category>

      <Category title={tx('Patterns')}>
        <div className="proto-patterns proto-demo--wide">
          <Demo name={tx('Product card')} bare hideName area="products">
            <div className="proto-product-row">
              <ProductCard
                title={tx('Wireless Headphones Pro')}
                description={tx('Noise cancelling, 30-hour battery')}
                imageUrl="assets/card-image-diamond.png"
                price={tx('$299')}
                oldPrice={tx('$399')}
                rating={4.8}
                reviews={tx('2,342 reviews')}
              />
              <ProductCard
                title={tx('Wireless Headphones Pro')}
                description={tx('Noise cancelling, 30-hour battery')}
                imageUrl="assets/card-image-diamond.png"
                price={tx('$299')}
                rating={4.8}
                reviews={tx('2,342 reviews')}
                actions={
                  <Button size="small" iconStart={<ShoppingCart />}>
                    {tx('Add to cart')}
                  </Button>
                }
              />
            </div>
          </Demo>
          <Demo name={tx('Apps notifications')} area="apps">
            <AppsNotifications
              title={tx('Send me updates from')}
              items={[
                { id: 'google', name: tx('Google'), icon: 'assets/google.png' },
                { id: 'linkedin', name: tx('LinkedIn'), icon: 'assets/linkedin.png' },
                {
                  id: 'behance',
                  name: tx('Behance'),
                  icon: 'assets/behance.png',
                  defaultEnabled: false,
                },
                { id: 'x', name: tx('X (Twitter)'), icon: 'assets/twitter.png', disabled: true },
              ]}
            />
          </Demo>
          <Demo name={tx('Meeting card')} area="meetings">
            <Stack gap="sm">
              {tones.map((t) => (
                <MeetingCard
                  key={t}
                  variant={t}
                  title={
                    {
                      primary: tx('Design review'),
                      success: tx('Done: Standup'),
                      warning: tx('Starts in 5 min'),
                      danger: tx('Cancelled: Offsite'),
                    }[t]
                  }
                  time={tx('10:00 – 10:30')}
                  attendees={people(tx)}
                  maxAttendees={3}
                />
              ))}
            </Stack>
          </Demo>
          <Demo name={tx('Header')} bare area="header">
            <Stack gap="md">
              <Header
                avatar="assets/avatar-2.png"
                name={tx('Sarah Chen')}
                jobTitle={tx('Head of Products')}
                heading={tx('Building calm, accessible products')}
              />
              <Header
                layout="horizontal"
                name={tx('Osama Eldrieny')}
                jobTitle={tx('Design System Designer')}
                heading={tx('Portfolio')}
              />
            </Stack>
          </Demo>
        </div>
      </Category>

      <Category title={tx('Data display')}>
        <Demo name={tx('Table')} wide>
          <Table
            caption={tx('Orders')}
            selectable
            selected={selected}
            onSelectionChange={setSelected}
            rowLabel={(r) => `Select order ${r.id}`}
            columns={[
              { key: 'id', header: 'Order', sortable: true },
              {
                key: 'customer',
                header: 'Customer',
                sortable: true,
                render: (r) => (
                  <Inline gap="xs" wrap={false}>
                    <Avatar name={r.customer} size="small" decorative />
                    {r.customer}
                  </Inline>
                ),
              },
              {
                key: 'status',
                header: 'Status',
                render: (r) => <Badge tone={r.tone}>{r.status}</Badge>,
              },
              { key: 'date', header: tx('Date'), sortable: true },
              { key: 'payment', header: tx('Payment') },
              { key: 'total', header: 'Total', align: 'end', sortable: true },
            ]}
            rows={[
              {
                id: '#1024',
                date: '2026-09-28',
                payment: tx('Card'),
                customer: 'Lina Haddad',
                status: 'Paid',
                tone: 'success' as const,
                total: '$39',
              },
              {
                id: '#1025',
                date: '2026-09-27',
                payment: tx('Cash on delivery'),
                customer: 'Tom Becker',
                status: 'Pending',
                tone: 'warning' as const,
                total: '$112',
              },
              {
                id: '#1026',
                date: '2026-09-26',
                payment: tx('Apple Pay'),
                customer: 'Aisha Khan',
                status: 'Failed',
                tone: 'danger' as const,
                total: '$185',
              },
            ]}
          />
        </Demo>

        <Demo name={tx('Stat')}>
          <div className="proto-demos">
            <Stat
              label={tx('Revenue')}
              value="$124,567"
              change="+12.5%"
              trend="up"
              help={tx('vs last month')}
            />
            <Stat
              label={tx('Refund rate')}
              value="1.8%"
              change="+0.4%"
              trend="up"
              positive={false}
              help={tx('Up is bad here')}
            />
            <Stat
              label={tx('Costs')}
              value="$8,210"
              change="−4%"
              trend="down"
              positive
              help={tx('Down is good here')}
            />
            <Stat label={tx('Visitors')} value="48,210" />
          </div>
        </Demo>

        <Demo name={tx('Avatar group')}>
          <Variant label={tx('Group with overflow')}>
            <AvatarGroup label={tx('Team')} max={3}>
              {people(tx).map((p) => (
                <Avatar key={p.name} name={p.name} src={p.src} />
              ))}
            </AvatarGroup>
          </Variant>
          <Variant label={tx('Sizes and status')}>
            <Inline gap="sm" align="center">
              <Avatar
                name={tx('Sarah Chen')}
                src="assets/avatar-2.png"
                size="small"
                status="online"
              />
              <Avatar name={tx('Maria Garcia')} status="away" />
              <Avatar
                name={tx('James Wilson')}
                src="assets/avatar-4.png"
                size="large"
                status="busy"
              />
              <Avatar
                name={tx('Osama Eldrieny')}
                src="assets/avatar-1.png"
                size="xlarge"
                status="offline"
              />
            </Inline>
          </Variant>
        </Demo>

        <Demo name={tx('List')}>
          <Variant label={tx('Divided, with icons and meta')}>
            <List divided>
              <ListItem
                icon={<Inbox />}
                title={tx('Inbox')}
                description={tx('12 unread')}
                meta={<Badge tone="primary">12</Badge>}
              />
              <ListItem
                icon={<Bell />}
                title={tx('Notifications')}
                description={tx('Mentions and replies')}
              />
              <ListItem
                icon={<Settings />}
                title={tx('Settings')}
                description={tx('Profile and security')}
                href="#/demo"
              />
            </List>
          </Variant>
          <Variant label={tx('Ordered')}>
            <List ordered>
              <ListItem title={tx('Create an account')} />
              <ListItem title={tx('Invite your team')} />
              <ListItem title={tx('Publish your first page')} />
            </List>
          </Variant>
        </Demo>

        <Demo name={tx('Accordion')}>
          <Variant label={tx('Single')}>
            <Accordion type="single" collapsible defaultValue="a">
              <AccordionItem value="a" title={tx('How long does delivery take?')}>
                3–5 working days.
              </AccordionItem>
              <AccordionItem value="b" title={tx('Can I return an item?')}>
                {tx('Yes, within 30 days.')}
              </AccordionItem>
            </Accordion>
          </Variant>
          <Variant label={tx('Multiple')}>
            <Accordion type="multiple" defaultValue={['x', 'y']}>
              <AccordionItem value="x" title={tx('Shipping')}>
                {tx('Free over $50.')}
              </AccordionItem>
              <AccordionItem value="y" title={tx('Warranty')}>
                {tx('Two years on every product.')}
              </AccordionItem>
            </Accordion>
          </Variant>
        </Demo>
      </Category>

      <Category title={tx('Navigation')}>
        <Demo name={tx('Navbar')} wide bare>
          <Variant label={tx('With actions')}>
            <Navbar
              aria-label={tx('Example navigation')}
              logo={<Logo icon={<ShoppingBag />} name={tx('TechHub')} />}
              items={[
                { label: tx('Products'), static: true },
                { label: tx('Pricing'), static: true },
                { label: tx('Docs'), static: true },
              ]}
              actions={<Button size="small">{tx('Sign in')}</Button>}
            />
          </Variant>
          <Variant label={tx('With search')}>
            <Navbar
              aria-label={tx('Example navigation with search')}
              logo={<Logo icon={<ShoppingBag />} name={tx('Store')} />}
              items={[
                { label: tx('Audio'), static: true },
                { label: tx('Wearables'), static: true },
              ]}
              actions={
                <SearchField
                  label={tx('Search')}
                  hideLabel
                  placeholder={tx('Search')}
                  size="small"
                />
              }
            />
          </Variant>
        </Demo>

        <div className="proto-demos proto-demos--three proto-demo--wide">
          <Demo name={tx('Tabs')}>
            {(['enclosed', 'line'] as const).map((a) => (
              <Variant key={a} label={tx(cap(a))}>
                <Tabs defaultValue="overview" appearance={a}>
                  <TabList label={`${tx(cap(a))} tabs example`}>
                    <Tab value="overview">{tx('Overview')}</Tab>
                    <Tab value="activity">{tx('Activity')}</Tab>
                    <Tab value="settings">{tx('Settings')}</Tab>
                  </TabList>
                  <TabPanel value="overview">
                    <p className="proto-muted">{tx('Overview content.')}</p>
                  </TabPanel>
                  <TabPanel value="activity">
                    <p className="proto-muted">{tx('Activity content.')}</p>
                  </TabPanel>
                  <TabPanel value="settings">
                    <p className="proto-muted">{tx('Settings content.')}</p>
                  </TabPanel>
                </Tabs>
              </Variant>
            ))}
          </Demo>
          <Demo name={tx('Side nav')}>
            <SideNav
              aria-label={tx('Example side navigation')}
              currentItem="orders"
              sections={[
                {
                  items: [
                    { id: 'home', label: tx('Home'), href: '#/demo', icon: <House /> },
                    { id: 'orders', label: tx('Orders'), href: '#/demo', icon: <Package /> },
                    {
                      id: 'reports',
                      label: tx('Reports'),
                      icon: <BarChart3 />,
                      items: [
                        { id: 'sales', label: tx('Sales'), href: '#/demo' },
                        { id: 'traffic', label: tx('Traffic'), href: '#/demo' },
                      ],
                    },
                  ],
                },
                {
                  title: tx('Workspace'),
                  items: [
                    { id: 'team', label: tx('Team'), href: '#/demo', icon: <Users /> },
                    { id: 'settings', label: tx('Settings'), href: '#/demo', icon: <Settings /> },
                  ],
                },
              ]}
            />
          </Demo>
          <Demo name={tx('Stepper')}>
            <Variant label={tx('Horizontal')}>
              <Stepper
                aria-label={tx('Checkout example')}
                current={1}
                steps={[{ label: tx('Cart') }, { label: tx('Shipping') }, { label: tx('Payment') }]}
              />
            </Variant>
            <Variant label={tx('Vertical with an error')}>
              <Stepper
                aria-label={tx('Order example')}
                orientation="vertical"
                current={2}
                steps={[
                  { label: tx('Placed'), description: tx('Sept 28') },
                  { label: tx('Paid'), description: tx('Card declined'), error: true },
                  { label: tx('Shipped') },
                ]}
              />
            </Variant>
          </Demo>
        </div>
        <div className="proto-demos proto-demos--two proto-demo--wide">
          <Demo name={tx('Pagination')}>
            <Variant label={tx('Full')}>
              <Pagination
                currentPage={page}
                totalPages={12}
                onPageChange={setPage}
                label={tx('Full pagination example')}
              />
            </Variant>
            <Variant label={tx('Simple')}>
              <Pagination
                appearance="simple"
                currentPage={page}
                totalPages={12}
                onPageChange={setPage}
                label={tx('Simple pagination example')}
              />
            </Variant>
          </Demo>
          <Demo name={tx('Breadcrumb')}>
            <Variant label={tx('Default')}>
              <Breadcrumb
                items={[
                  { label: tx('Home'), href: '#/demo' },
                  { label: tx('Audio'), href: '#/demo' },
                  { label: tx('Headphones') },
                ]}
              />
            </Variant>
            <Variant label={tx('Collapsed (maxItems 3)')}>
              <Breadcrumb
                maxItems={3}
                items={[
                  { label: tx('Home'), href: '#/demo' },
                  { label: tx('Shop'), href: '#/demo' },
                  { label: tx('Audio'), href: '#/demo' },
                  { label: tx('Headphones'), href: '#/demo' },
                  { label: tx('Pro') },
                ]}
              />
            </Variant>
          </Demo>
        </div>
      </Category>

      <Category title={tx('Feedback')}>
        <Demo name={tx('Alert')} wide>
          {(['subtle', 'solid', 'outline'] as const).map((a) => (
            <Variant key={a} label={tx(cap(a))}>
              <div className="proto-demos proto-demos--four">
                {tones.map((t) => (
                  <Alert key={t} variant={t} appearance={a} title={tx(cap(t))}>
                    {
                      {
                        primary: tx('A new version is out.'),
                        success: tx('Changes saved.'),
                        warning: tx('Trial ends soon.'),
                        danger: tx('Payment failed.'),
                      }[t]
                    }
                  </Alert>
                ))}
              </div>
            </Variant>
          ))}
        </Demo>

        <div className="proto-fill-row proto-demo--wide">
          <Demo name={tx('Badge')}>
            <Variant label={tx('Subtle')}>
              <Inline gap="xs">
                {(['primary', 'secondary', 'success', 'warning', 'danger'] as const).map((t) => (
                  <Badge key={t} tone={t}>
                    {tx(cap(t))}
                  </Badge>
                ))}
              </Inline>
            </Variant>
            <Variant label={tx('Solid')}>
              <Inline gap="xs">
                {(['primary', 'secondary', 'success', 'warning', 'danger'] as const).map((t) => (
                  <Badge key={t} tone={t} appearance="solid">
                    {tx(cap(t))}
                  </Badge>
                ))}
              </Inline>
            </Variant>
            <Variant label={tx('Dot')}>
              <Inline gap="md">
                {(['primary', 'success', 'warning', 'danger'] as const).map((t) => (
                  <Inline key={t} gap="2xs">
                    <Badge tone={t} dot aria-hidden="true" />
                    <span>{tx(cap(t))}</span>
                  </Inline>
                ))}
              </Inline>
            </Variant>
          </Demo>
          <Demo name={tx('Empty state')} fill>
            <EmptyState
              icon={<SearchX />}
              titleAs="h4"
              title={tx('No results')}
              description={tx('Try other words or clear the filters.')}
              actions={<Button appearance="outline">{tx('Clear filters')}</Button>}
            />
          </Demo>
        </div>
      </Category>

      <Category title={tx('Forms')} masonry>
        <Demo name={tx('Input field')}>
          <Variant label={tx('Sizes')}>
            <Stack gap="sm">
              <InputField label={tx('Small')} size="small" placeholder={tx('Small field')} />
              <InputField label={tx('Medium')} placeholder={tx('Medium field')} />
              <InputField label={tx('Large')} size="large" placeholder={tx('Large field')} />
            </Stack>
          </Variant>
          <Variant label={tx('Icons, messages and states')}>
            <Stack gap="sm">
              <InputField
                label={tx('Email')}
                type="email"
                placeholder={tx('you@example.com')}
                iconStart={<Mail />}
                description={tx('We never share it.')}
              />
              <InputField label={tx('Username')} defaultValue="sarah" success={tx('Available')} />
              <InputField
                label={tx('Card number')}
                defaultValue="4242 42"
                error={tx('Enter all 16 digits.')}
              />
              <InputField
                label={tx('Account ID')}
                defaultValue="TH-2048"
                readOnly
                iconEnd={<Lock />}
              />
              <InputField label={tx('Disabled')} defaultValue="Not editable" disabled />
            </Stack>
          </Variant>
        </Demo>

        <Demo name={tx('Search field')}>
          <Variant label={tx('With a keyboard shortcut')}>
            <SearchField
              label={tx('Search')}
              placeholder={tx('Search products')}
              shortcut="mod+k"
            />
          </Variant>
          <Variant label={tx('Sizes')}>
            <Stack gap="sm">
              <SearchField label={tx('Small')} size="small" placeholder={tx('Small')} />
              <SearchField
                label={tx('Large')}
                size="large"
                placeholder={tx('Large')}
                defaultValue="headphones"
              />
            </Stack>
          </Variant>
        </Demo>

        <Demo name={tx('Select')}>
          <Variant label={tx('Sizes')}>
            <Stack gap="sm">
              {(['small', 'medium', 'large'] as const).map((s) => (
                <Select key={s} label={tx(cap(s))} size={s} defaultValue="pro">
                  <SelectItem value="free">{tx('Free')}</SelectItem>
                  <SelectItem value="pro">{tx('Pro')}</SelectItem>
                  <SelectItem value="team">{tx('Team')}</SelectItem>
                </Select>
              ))}
            </Stack>
          </Variant>
          <Variant label={tx('Placeholder, error and disabled')}>
            <Stack gap="sm">
              <Select label={tx('Country')} placeholder={tx('Choose a country')}>
                <SelectItem value="ae">{tx('United Arab Emirates')}</SelectItem>
                <SelectItem value="eg">{tx('Egypt')}</SelectItem>
              </Select>
              <Select
                label={tx('Plan')}
                error={tx('Choose a plan to continue.')}
                placeholder={tx('Choose a plan')}
              >
                <SelectItem value="pro">{tx('Pro')}</SelectItem>
              </Select>
              <Select label={tx('Region')} disabled defaultValue="eu">
                <SelectItem value="eu">{tx('Europe')}</SelectItem>
              </Select>
            </Stack>
          </Variant>
        </Demo>

        <Demo name={tx('Combobox')}>
          <Variant label={tx('Single')}>
            <Combobox label={tx('Skill')} placeholder={tx('Type a skill')} options={skills(tx)} />
          </Variant>
          <Variant label={tx('Multiple (chips)')}>
            <Combobox
              label={tx('Skills')}
              multiple
              defaultValue={['design', 'research']}
              options={skills(tx)}
            />
          </Variant>
          <Variant label={tx('Small and disabled')}>
            <Stack gap="sm">
              <Combobox
                label={tx('Small')}
                size="small"
                options={skills(tx)}
                defaultValue="systems"
              />
              <Combobox
                label={tx('Disabled')}
                disabled
                options={skills(tx)}
                defaultValue="writing"
              />
            </Stack>
          </Variant>
        </Demo>

        <Demo name={tx('Textarea')}>
          <Variant label={tx('With counter')}>
            <Textarea
              label={tx('Message')}
              rows={3}
              maxLength={200}
              showCount
              description={tx('We reply within a day.')}
            />
          </Variant>
          <Variant label={tx('Error and disabled')}>
            <Stack gap="sm">
              <Textarea label={tx('Reason')} rows={2} error={tx('Tell us why in a few words.')} />
              <Textarea label={tx('Notes')} rows={2} disabled defaultValue="Locked by an admin." />
            </Stack>
          </Variant>
        </Demo>

        <Demo name={tx('Checkbox')}>
          <Variant label={tx('States')}>
            <Stack gap="sm">
              <Checkbox label={tx('Unchecked')} />
              <Checkbox label={tx('Checked')} defaultChecked />
              <Checkbox label={tx('Indeterminate')} indeterminate />
              <Checkbox label={tx('Disabled')} disabled defaultChecked />
              <Checkbox
                label={tx('I accept the terms')}
                error={tx('Accept the terms to continue.')}
              />
            </Stack>
          </Variant>
          <Variant label={tx('Group, horizontal')}>
            <CheckboxGroup label={tx('Topics')} orientation="horizontal" defaultValue={['design']}>
              <Checkbox value="design" label={tx('Design')} />
              <Checkbox value="code" label={tx('Code')} />
              <Checkbox value="research" label={tx('Research')} />
            </CheckboxGroup>
          </Variant>
        </Demo>

        <Demo name={tx('Radio group')}>
          <Variant label={tx('Vertical with descriptions')}>
            <RadioGroup label={tx('Delivery')} defaultValue="standard">
              <Radio value="standard" label={tx('Standard')} description={tx('3–5 days, free')} />
              <Radio value="express" label={tx('Express')} description={tx('Next day, $12')} />
              <Radio
                value="pickup"
                label={tx('Pick up')}
                description={tx('From a store')}
                disabled
              />
            </RadioGroup>
          </Variant>
          <Variant label={tx('Horizontal and error')}>
            <RadioGroup label={tx('Size')} orientation="horizontal" error={tx('Choose a size.')}>
              <Radio value="s" label={tx('S')} />
              <Radio value="m" label={tx('M')} />
              <Radio value="l" label={tx('L')} />
            </RadioGroup>
          </Variant>
        </Demo>

        <Demo name={tx('Slider')}>
          <Variant label={tx('Single value')}>
            <Slider
              label={tx('Volume')}
              defaultValue={[60]}
              showValue
              formatValue={(v) => `${v}%`}
            />
          </Variant>
          <Variant label={tx('Range with marks')}>
            <Slider
              label={tx('Price')}
              min={0}
              max={500}
              step={10}
              defaultValue={[100, 300]}
              showValue
              formatValue={(v) => `$${v}`}
              marks={[{ value: 0 }, { value: 250 }, { value: 500 }]}
            />
          </Variant>
          <Variant label={tx('Disabled')}>
            <Slider label={tx('Locked')} defaultValue={[40]} disabled />
          </Variant>
        </Demo>

        <Demo name={tx('Form field')}>
          <Variant label={tx('Required, optional and help')}>
            <Stack gap="sm">
              <FormField
                label={tx('Company')}
                required
                description={tx('As it appears on invoices.')}
              >
                <InputField label={tx('Company')} hideLabel defaultValue="TechHub" />
              </FormField>
              <FormField label={tx('Phone')} optional>
                <InputField label={tx('Phone')} hideLabel placeholder={tx('+971 …')} />
              </FormField>
            </Stack>
          </Variant>
          <Variant label={tx('Group of switches')}>
            <FormField
              group
              label={tx('Email me about')}
              description={tx('Changes save automatically.')}
            >
              <Switch label={tx('New orders')} defaultChecked />
              <Switch label={tx('Weekly summary')} />
            </FormField>
          </Variant>
        </Demo>

        <Demo name={tx('Choose card')}>
          <Variant label={tx('Horizontal')}>
            <ChooseCardGroup aria-label={tx('Plan')} orientation="horizontal" defaultValue="pro">
              <ChooseCard
                value="free"
                title={tx('Free')}
                description={tx('1 project')}
                price={tx('$0')}
              />
              <ChooseCard
                value="pro"
                title={tx('Pro')}
                description={tx('Unlimited')}
                price={tx('$29')}
              />
            </ChooseCardGroup>
          </Variant>
          <Variant label={tx('Vertical')}>
            <ChooseCardGroup aria-label={tx('Delivery speed')} defaultValue="express">
              <ChooseCard
                value="standard"
                title={tx('Standard')}
                description={tx('3–5 working days')}
                price={tx('Free')}
              />
              <ChooseCard
                value="express"
                title={tx('Express')}
                description={tx('Next working day')}
                price={tx('$12')}
              />
            </ChooseCardGroup>
          </Variant>
        </Demo>
      </Category>
    </div>
  );
}
