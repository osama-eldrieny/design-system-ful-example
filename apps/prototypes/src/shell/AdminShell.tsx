import { useState, type ReactNode } from 'react';
import {
  ActivityFeed,
  Avatar,
  AvatarLabelGroup,
  CommandMenu,
  Badge,
  Button,
  Breadcrumb,
  Container,
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
  SideNav,
  Stack,
} from '@ds/react';
import {
  BarChart3,
  Bell,
  ChartLine,
  CreditCard,
  House,
  LogOut,
  Package,
  Plus,
  Search,
  Settings,
  UserPlus,
  User,
  Users,
} from 'lucide-react';
import { people } from '../data';
import { go } from '../router';

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
  const me = people[1];
  const [commandOpen, setCommandOpen] = useState(false);
  return (
    <div className="proto proto-admin">
      <aside className="proto-admin__side">
        <Stack gap="lg">
          <Logo icon={<ChartLine />} name="TechHub Admin" href="#/admin" />
          <SideNav
            aria-label="Admin"
            currentItem={current}
            sections={[
              {
                items: [
                  { id: 'overview', label: 'Overview', href: '#/admin', icon: <House /> },
                  {
                    id: 'orders',
                    label: 'Orders',
                    href: '#/admin/orders',
                    icon: <Package />,
                    badge: 12,
                  },
                  {
                    id: 'reports',
                    label: 'Reports',
                    icon: <BarChart3 />,
                    items: [
                      { id: 'sales', label: 'Sales', href: '#/admin' },
                      { id: 'traffic', label: 'Traffic', href: '#/admin' },
                    ],
                  },
                ],
              },
              {
                title: 'Workspace',
                items: [
                  { id: 'team', label: 'Team', href: '#/admin/team', icon: <Users /> },
                  { id: 'settings', label: 'Settings', href: '#/settings', icon: <Settings /> },
                ],
              },
            ]}
            footer={
              <AvatarLabelGroup
                name={me.name}
                src={me.avatar}
                supportingText={me.role}
                status={me.status}
                size="small"
              />
            }
          />
        </Stack>
      </aside>

      <div className="proto-admin__main">
        <header className="proto-admin__bar">
          <Breadcrumb items={trail} />
          <Inline gap="xs" justify="end">
            <Button
              variant="secondary"
              appearance="outline"
              size="small"
              iconStart={<Search />}
              onClick={() => setCommandOpen(true)}
            >
              Search ⌘K
            </Button>
            <CommandMenu
              open={commandOpen}
              onOpenChange={setCommandOpen}
              label="Search the admin"
              groups={[
                {
                  label: 'Pages',
                  items: [
                    {
                      id: 'overview',
                      label: 'Overview',
                      icon: <House />,
                      onSelect: () => go('/admin'),
                    },
                    {
                      id: 'orders',
                      label: 'Orders',
                      icon: <Package />,
                      keywords: ['sales'],
                      onSelect: () => go('/admin/orders'),
                    },
                    {
                      id: 'team',
                      label: 'Team',
                      icon: <Users />,
                      onSelect: () => go('/admin/team'),
                    },
                    {
                      id: 'settings',
                      label: 'Settings',
                      icon: <Settings />,
                      onSelect: () => go('/settings'),
                    },
                  ],
                },
                {
                  label: 'Actions',
                  items: [
                    {
                      id: 'order',
                      label: 'Create order',
                      icon: <Plus />,
                      onSelect: () => go('/admin/orders'),
                    },
                    {
                      id: 'invite',
                      label: 'Invite member',
                      icon: <UserPlus />,
                      onSelect: () => go('/admin/team'),
                    },
                  ],
                },
              ]}
            />
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
                      avatar: { name: 'Lina Haddad' },
                      title: (
                        <>
                          <strong>New order</strong> #1059 from Lina Haddad
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
                          <strong>Refund requested</strong> for #1041
                        </>
                      ),
                      time: '1 h ago',
                      unread: true,
                    },
                    {
                      id: 3,
                      icon: <Package />,
                      iconTone: 'danger',
                      title: (
                        <>
                          <strong>Stock low:</strong> Webcam 4K
                        </>
                      ),
                      time: 'Today',
                      unread: true,
                    },
                  ]}
                />
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  appearance="text"
                  variant="secondary"
                  size="small"
                  aria-label={`Account: ${me.name}`}
                >
                  <Avatar
                    name={me.name}
                    src={me.avatar}
                    size="small"
                    status={me.status}
                    decorative
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{me.name}</DropdownMenuLabel>
                <DropdownMenuItem icon={<User />} onSelect={() => go('/settings')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem icon={<CreditCard />} onSelect={() => go('/settings')}>
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="danger" icon={<LogOut />} onSelect={() => go('/')}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Inline>
        </header>
        <main className="proto-admin__content">
          <Container>{children}</Container>
        </main>
      </div>
    </div>
  );
}
