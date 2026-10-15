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
  Calendar,
  ChevronsUpDown,
  Copy,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  Link2,
  LogOut,
  MessagesSquare,
  Package,
  QrCode,
  Search,
  Settings,
  Sparkles,
  User,
  X,
  Zap,
} from 'lucide-react';
import { members } from '../dashboard-data';
import { go } from '../router';
import './app.css';

export type Promo = 'verify' | 'refer' | 'upgrade' | 'workshop' | 'none';

const pages: SideNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '#/dashboard', icon: <LayoutDashboard /> },
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
        <AvatarGroup label="Attendees" max={4} size="xsmall">
          {members.slice(0, 7).map((m) => (
            <Avatar key={m.email} name={m.name} src={m.src} />
          ))}
        </AvatarGroup>
        <strong>Join our workshop</strong>
        <span className="muted">Learn how to get more out of your dashboard.</span>
      </div>
    );
  return null;
}

/**
 * The app frame: sidebar (full or slim) with search, pages, a promo card and the account;
 * the page fills the rest; an optional rail on the end side.
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
  /** A panel on the end side. */
  rail?: ReactNode;
}) {
  const me = members[0];
  const [search, setSearch] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const sections = [{ title: slim ? undefined : 'General', items: pages }];

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
              <Logo icon={<Sparkles />} name="Panda" hideName href="#/dashboard" />
            ) : (
              <div className="app__brand">
                <Logo icon={<Sparkles />} name="Panda" href="#/dashboard" />
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
          sections={sections}
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
              label: 'Pages',
              items: pages.map((p) => ({
                id: p.id!,
                label: p.label,
                icon: p.icon,
                onSelect: () => go(p.href!.slice(1)),
              })),
            },
            {
              label: 'People',
              items: members.map((m) => ({
                id: m.email,
                label: m.name,
                description: m.role,
                icon: <User />,
                onSelect: () => go('/app/settings/team'),
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
      <DropdownMenuItem icon={<User />} onSelect={() => go('/app/settings')}>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem icon={<CreditCard />} onSelect={() => go('/app/settings/billing')}>
        Billing
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="danger" icon={<LogOut />} onSelect={() => go('/dashboard')}>
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
