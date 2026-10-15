import { useState, type ReactNode } from 'react';
import {
  Avatar,
  AvatarGroup,
  AvatarLabelGroup,
  Badge,
  Button,
  CommandMenu,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  FeaturedIcon,
  IconButton,
  InputField,
  Kbd,
  Logo,
  SideNav,
  type SideNavItem,
} from '@ds/react';
import {
  BarChart3,
  Building2,
  Calendar,
  ChevronsUpDown,
  Copy,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  LifeBuoy,
  Link2,
  LogOut,
  MessagesSquare,
  Package,
  QrCode,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  User,
  Users,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { members } from '../dashboard-data';
import { dashboards } from '../dashboards/registry';
import { go } from '../router';
import './app.css';

export type Promo = 'verify' | 'refer' | 'upgrade' | 'workshop' | 'none';

const groupIcon: Record<string, ReactNode> = {
  Analytics: <BarChart3 />,
  Customers: <Users />,
  Vendors: <Building2 />,
  Sales: <ShoppingBag />,
  Finance: <Wallet />,
  Profile: <User />,
};

const apps: SideNavItem[] = [
  { id: 'projects', label: 'Projects', href: '#/app/projects', icon: <FolderKanban />, badge: 4 },
  { id: 'messages', label: 'Messages', href: '#/app/messages', icon: <MessagesSquare />, badge: 3 },
  { id: 'calendar', label: 'Calendar', href: '#/app/calendar', icon: <Calendar /> },
  { id: 'orders', label: 'Orders', href: '#/app/orders', icon: <Package /> },
  { id: 'settings', label: 'Settings', href: '#/app/settings', icon: <Settings /> },
];

function PromoCard({ kind, onClose }: { kind: Promo; onClose: () => void }) {
  const close = (
    <IconButton
      icon={<X />}
      label="Dismiss"
      variant="secondary"
      appearance="ghost"
      size="xsmall"
      onClick={onClose}
      className="app__promo-close"
    />
  );
  if (kind === 'verify')
    return (
      <div className="app__promo">
        {close}
        <strong>Verify this device</strong>
        <span className="muted">Open the app and scan the code below to verify this device.</span>
        <div className="app__qr" aria-hidden="true">
          <QrCode />
        </div>
        <Button variant="secondary" appearance="outline" size="small" fullWidth>
          Verify another way
        </Button>
      </div>
    );
  if (kind === 'refer')
    return (
      <div className="app__promo">
        {close}
        <FeaturedIcon icon={<Link2 />} appearance="modern" size="small" shape="square" />
        <strong>Refer a friend</strong>
        <span className="muted">Earn 50% back for 12 months when someone uses your link.</span>
        <InputField
          label="Your referral link"
          hideLabel
          size="small"
          readOnly
          defaultValue="panda.io/4060020"
          iconEnd={<Copy />}
        />
      </div>
    );
  if (kind === 'upgrade')
    return (
      <div className="app__promo">
        {close}
        <FeaturedIcon icon={<Zap />} appearance="modern" size="small" shape="square" />
        <strong>
          Upgrade to PRO{' '}
          <Badge tone="gray" shape="modern" size="small">
            20% off
          </Badge>
        </strong>
        <span className="muted">Unlock 20+ integrations, 40 GB data and advanced reporting.</span>
        <Button size="small" fullWidth href="#/app/settings/billing">
          Upgrade now
        </Button>
      </div>
    );
  if (kind === 'workshop')
    return (
      <div className="app__promo">
        {close}
        <AvatarGroup label="Attendees" max={4} size="xsmall" onAdd={() => {}} addLabel="Invite">
          {members.slice(0, 7).map((m) => (
            <Avatar key={m.email} name={m.name} src={m.src} />
          ))}
        </AvatarGroup>
        <strong>
          Join our workshop{' '}
          <Badge tone="success" shape="modern" size="small" withDot>
            Live
          </Badge>
        </strong>
        <span className="muted">Learn how to get more out of your dashboards.</span>
        <span className="row">
          <Button appearance="text" variant="secondary" size="small" onClick={onClose}>
            Dismiss
          </Button>
          <Button appearance="text" size="small">
            Join now!
          </Button>
        </span>
      </div>
    );
  return null;
}

/**
 * The demo frame: sidebar (full or slim) with search, dashboards and apps, a promo card and
 * the account; the page in the middle; an optional rail on the end side.
 */
export function AppShell({
  current,
  children,
  slim = false,
  promo = 'none',
  rail,
}: {
  current: string;
  children: ReactNode;
  /** Icon-only sidebar. */
  slim?: boolean;
  /** Which card sits above the account. */
  promo?: Promo;
  /** A panel on the end side, e.g. cards or a chat. */
  rail?: ReactNode;
}) {
  const me = members[0];
  const [search, setSearch] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const groups = [...new Set(dashboards.map((d) => d.group))];
  const sections = [
    {
      title: 'Dashboards',
      items: groups.map((g) => ({
        id: `group-${g}`,
        label: g,
        icon: groupIcon[g],
        items: dashboards
          .filter((d) => d.group === g)
          .map((d) => ({ id: d.id, label: d.title, href: `#/dashboards/${d.id}` })),
      })),
    },
    { title: 'Apps', items: apps },
    { items: [{ id: 'support', label: 'Support', href: '#/dashboards/01', icon: <LifeBuoy /> }] },
  ];
  // The slim rail shows one icon per group, linking to its first dashboard.
  const currentGroup = dashboards.find((d) => d.id === current)?.group;
  const slimSections = [
    {
      items: [
        ...groups.map((g) => {
          const first = dashboards.find((d) => d.group === g)!;
          return {
            id: currentGroup === g ? current : `slim-${g}`,
            label: g,
            icon: groupIcon[g],
            href: `#/dashboards/${first.id}`,
          };
        }),
        ...apps,
      ],
    },
  ];

  return (
    <div
      className={['proto app', slim && 'app--slim', rail && 'app--rail'].filter(Boolean).join(' ')}
    >
      <aside className="app__side">
        <SideNav
          aria-label="Main"
          collapsed={slim}
          currentItem={current}
          header={
            slim ? (
              <Logo icon={<Sparkles />} name="Panda" hideName href="#/dashboards/01" />
            ) : (
              <div className="app__brand">
                <Logo icon={<Sparkles />} name="Panda" href="#/dashboards/01" />
                <Button
                  variant="secondary"
                  appearance="outline"
                  size="small"
                  fullWidth
                  iconStart={<Search />}
                  iconEnd={<Kbd>⌘K</Kbd>}
                  onClick={() => setSearch(true)}
                  className="app__search"
                >
                  Search
                </Button>
              </div>
            )
          }
          sections={slim ? slimSections : sections}
          footer={
            slim ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    appearance="text"
                    variant="secondary"
                    className="app__avatar-button"
                    aria-label={`Account: ${me.name}`}
                  >
                    <Avatar name={me.name} src={me.src} status="online" decorative />
                  </Button>
                </DropdownMenuTrigger>
                <AccountMenu />
              </DropdownMenu>
            ) : (
              <div className="app__footer">
                {showPromo && <PromoCard kind={promo} onClose={() => setShowPromo(false)} />}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      appearance="text"
                      variant="secondary"
                      fullWidth
                      className="app__account"
                      aria-label={`Account: ${me.name}`}
                    >
                      <AvatarLabelGroup
                        name={me.name}
                        src={me.src}
                        supportingText={me.email}
                        status="online"
                        size="small"
                      />
                      <ChevronsUpDown aria-hidden="true" className="app__account-icon" />
                    </Button>
                  </DropdownMenuTrigger>
                  <AccountMenu />
                </DropdownMenu>
              </div>
            )
          }
        />
        <CommandMenu
          open={search}
          onOpenChange={setSearch}
          label="Search Panda"
          groups={[
            {
              label: 'Dashboards',
              items: dashboards.map((d) => ({
                id: d.id,
                label: d.title,
                description: d.group,
                icon: <LayoutDashboard />,
                onSelect: () => go(`/dashboards/${d.id}`),
              })),
            },
            {
              label: 'Apps',
              items: apps.map((a) => ({
                id: a.id!,
                label: a.label,
                icon: a.icon,
                onSelect: () => go(a.href!.slice(1)),
              })),
            },
            {
              label: 'People',
              items: members.map((m) => ({
                id: m.email,
                label: m.name,
                description: m.role,
                icon: <User />,
                onSelect: () => go('/dashboards/19'),
              })),
            },
          ]}
        />
      </aside>
      <main className="app__main">{children}</main>
      {rail && <aside className="app__rail">{rail}</aside>}
    </div>
  );
}

function AccountMenu() {
  return (
    <DropdownMenuContent align="end" side="top">
      <DropdownMenuLabel>{members[0].name}</DropdownMenuLabel>
      <DropdownMenuItem icon={<User />} onSelect={() => go('/dashboards/19')}>
        View profile
      </DropdownMenuItem>
      <DropdownMenuItem icon={<CreditCard />} onSelect={() => go('/app/settings/billing')}>
        Billing
      </DropdownMenuItem>
      <DropdownMenuItem icon={<Settings />} onSelect={() => go('/app/settings')}>
        Settings
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="danger" icon={<LogOut />} onSelect={() => go('/dashboards/01')}>
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
