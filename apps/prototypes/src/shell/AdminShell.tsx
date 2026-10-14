import { useState, type ReactNode } from 'react';
import {
  ActivityFeed,
  AvatarLabelGroup,
  Badge,
  Breadcrumb,
  Button,
  CommandMenu,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  Inline,
  Logo,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ProgressCircle,
  SideNav,
  Stack,
} from '@ds/react';
import {
  BarChart3,
  Bell,
  ChartLine,
  ChevronsUpDown,
  CreditCard,
  House,
  LifeBuoy,
  LogOut,
  Package,
  Plus,
  Search,
  Settings,
  User,
  UserPlus,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { members } from '../dashboard-data';
import { go } from '../router';

const pages = [
  { id: 'dashboard', label: 'Dashboard', path: '/admin', icon: <House /> },
  { id: 'analytics', label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 /> },
  { id: 'customers', label: 'Customers', path: '/admin/customers', icon: <Users /> },
  { id: 'orders', label: 'Orders', path: '/admin/orders', icon: <Package /> },
  { id: 'finance', label: 'Finance', path: '/admin/finance', icon: <Wallet /> },
  { id: 'settings', label: 'Settings', path: '/settings', icon: <Settings /> },
];

/** Admin app layout: side navigation, top bar with breadcrumb, search, notifications, account. */
export function AdminShell({
  current,
  trail,
  children,
}: {
  current: string;
  trail: { label: string; href?: string }[];
  children: ReactNode;
}) {
  const me = members[0];
  const [commandOpen, setCommandOpen] = useState(false);
  const [promo, setPromo] = useState(true);
  const nav = (id: string) => {
    const page = pages.find((p) => p.id === id)!;
    return { id, label: page.label, href: `#${page.path}`, icon: page.icon };
  };

  return (
    <div className="proto proto-admin">
      <aside className="proto-admin__side">
        <SideNav
          aria-label="Admin"
          currentItem={current}
          header={
            <Stack gap="md">
              <Logo icon={<ChartLine />} name="Panda" href="#/admin" />
              <Button
                variant="secondary"
                appearance="outline"
                size="small"
                fullWidth
                iconStart={<Search />}
                onClick={() => setCommandOpen(true)}
                className="proto-search-button"
              >
                Search ⌘K
              </Button>
            </Stack>
          }
          sections={[
            {
              title: 'General',
              items: [
                nav('dashboard'),
                nav('analytics'),
                nav('customers'),
                { ...nav('orders'), badge: 8 },
                nav('finance'),
              ],
            },
            {
              title: 'Workspace',
              items: [
                nav('settings'),
                { id: 'support', label: 'Support', href: '#/admin', icon: <LifeBuoy /> },
              ],
            },
          ]}
          footer={
            <Stack gap="md">
              {promo && (
                <div className="proto-promo">
                  <Inline justify="between" align="start">
                    <ProgressCircle label="Storage used" hideLabel value={80} size="small" />
                    <IconButton
                      icon={<X />}
                      label="Dismiss storage notice"
                      variant="secondary"
                      appearance="ghost"
                      size="xsmall"
                      onClick={() => setPromo(false)}
                    />
                  </Inline>
                  <strong>Used space</strong>
                  <span className="proto-muted">
                    Your team has used 80% of the available space.
                  </span>
                  <Inline gap="sm">
                    <Button
                      appearance="text"
                      variant="secondary"
                      size="small"
                      onClick={() => setPromo(false)}
                    >
                      Dismiss
                    </Button>
                    <Button appearance="text" size="small" href="#/settings">
                      Upgrade plan
                    </Button>
                  </Inline>
                </div>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="proto-account"
                    appearance="text"
                    variant="secondary"
                    fullWidth
                    aria-label={`Account: ${me.name}`}
                  >
                    <AvatarLabelGroup
                      name={me.name}
                      src={me.src}
                      supportingText={me.email}
                      status="online"
                      size="small"
                    />
                    <ChevronsUpDown aria-hidden="true" className="proto-account__icon" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top">
                  <DropdownMenuLabel>{me.name}</DropdownMenuLabel>
                  <DropdownMenuItem icon={<User />} onSelect={() => go('/settings')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem icon={<CreditCard />} onSelect={() => go('/settings/billing')}>
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="danger"
                    icon={<LogOut />}
                    onSelect={() => go('/admin')}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Stack>
          }
        />
        <CommandMenu
          open={commandOpen}
          onOpenChange={setCommandOpen}
          label="Search the admin"
          groups={[
            {
              label: 'Pages',
              items: pages.map((p) => ({
                id: p.id,
                label: p.label,
                icon: p.icon,
                onSelect: () => go(p.path),
              })),
            },
            {
              label: 'Actions',
              items: [
                {
                  id: 'new-order',
                  label: 'Create order',
                  icon: <Plus />,
                  shortcut: ['⌘', 'N'],
                  onSelect: () => go('/admin/orders'),
                },
                {
                  id: 'invite',
                  label: 'Invite team member',
                  icon: <UserPlus />,
                  onSelect: () => go('/settings/team'),
                },
                {
                  id: 'billing',
                  label: 'Change plan',
                  icon: <CreditCard />,
                  keywords: ['upgrade'],
                  onSelect: () => go('/settings/billing'),
                },
              ],
            },
            {
              label: 'People',
              items: members.slice(0, 5).map((m) => ({
                id: m.email,
                label: m.name,
                description: m.email,
                icon: <User />,
                onSelect: () => go('/settings/team'),
              })),
            },
          ]}
        />
      </aside>

      <div className="proto-admin__main">
        <header className="proto-admin__bar">
          <Breadcrumb items={trail} homeIcon />
          <Inline gap="xs" justify="end">
            <Popover>
              <PopoverTrigger asChild>
                <span className="proto-badge-anchor">
                  <IconButton
                    icon={<Bell />}
                    label="Notifications, 3 new"
                    appearance="ghost"
                    variant="secondary"
                  />
                  <Badge
                    className="proto-badge-anchor__badge"
                    dot
                    tone="danger"
                    aria-hidden="true"
                  />
                </span>
              </PopoverTrigger>
              <PopoverContent title="Notifications" align="end">
                <ActivityFeed
                  aria-label="Notifications"
                  appearance="divided"
                  items={[
                    {
                      id: 1,
                      avatar: { name: 'Demi Wilkinson', src: members[3].src },
                      title: (
                        <>
                          <strong>Demi Wilkinson</strong> purchased Webflow 101
                        </>
                      ),
                      time: '2 min ago',
                      unread: true,
                    },
                    {
                      id: 2,
                      icon: <CreditCard />,
                      iconTone: 'warning',
                      title: (
                        <>
                          <strong>Payment failed</strong> for Stack3d Lab
                        </>
                      ),
                      time: '1 h ago',
                      unread: true,
                    },
                    {
                      id: 3,
                      icon: <UserPlus />,
                      iconTone: 'success',
                      title: (
                        <>
                          <strong>Natali Craig</strong> joined the team
                        </>
                      ),
                      time: 'Today',
                      unread: true,
                    },
                  ]}
                />
              </PopoverContent>
            </Popover>
          </Inline>
        </header>
        <main className="proto-admin__content">{children}</main>
      </div>
    </div>
  );
}
