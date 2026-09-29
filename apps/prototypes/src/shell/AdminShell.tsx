import type { ReactNode } from 'react';
import {
  Avatar,
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
  List,
  ListItem,
  Logo,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SearchField,
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
  Settings,
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
                  { id: 'orders', label: 'Orders', href: '#/admin/orders', icon: <Package /> },
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
          />
        </Stack>
      </aside>

      <div className="proto-admin__main">
        <header className="proto-admin__bar">
          <Breadcrumb items={trail} />
          <Inline gap="xs" justify="end">
            <SearchField
              label="Search the admin"
              placeholder="Search"
              size="small"
              shortcut="mod+k"
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
                <List divided>
                  <ListItem
                    title="New order #1059"
                    description="Lina Haddad · 2 min ago"
                    href="#/admin/orders"
                  />
                  <ListItem
                    title="Refund requested"
                    description="Order #1041 · 1 h ago"
                    href="#/admin/orders"
                  />
                  <ListItem
                    title="Stock low: Webcam 4K"
                    description="3 left · today"
                    href="#/admin"
                  />
                </List>
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
