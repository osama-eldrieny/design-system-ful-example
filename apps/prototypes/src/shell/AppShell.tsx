import { useState, type ReactNode } from 'react';
import {
  AvatarLabelGroup,
  Button,
  CommandMenu,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Kbd,
  Logo,
  Progress,
  SideNav,
} from '@ds/react';
import {
  BarChart3,
  Calendar,
  ChevronsUpDown,
  CreditCard,
  FolderKanban,
  House,
  LifeBuoy,
  LogOut,
  MessagesSquare,
  Package,
  Plus,
  Search,
  Settings,
  Sparkles,
  User,
  UserPlus,
  Users,
  Wallet,
} from 'lucide-react';
import { members } from '../dashboard-data';
import { go } from '../router';
import './app.css';

const pages = [
  { id: 'overview', label: 'Overview', path: '/app', icon: <House /> },
  { id: 'analytics', label: 'Analytics', path: '/app/analytics', icon: <BarChart3 /> },
  { id: 'projects', label: 'Projects', path: '/app/projects', icon: <FolderKanban />, badge: 4 },
  { id: 'messages', label: 'Messages', path: '/app/messages', icon: <MessagesSquare />, badge: 3 },
  { id: 'calendar', label: 'Calendar', path: '/app/calendar', icon: <Calendar /> },
  { id: 'orders', label: 'Orders', path: '/app/orders', icon: <Package /> },
  { id: 'customers', label: 'Customers', path: '/app/customers', icon: <Users /> },
  { id: 'finance', label: 'Finance', path: '/app/finance', icon: <Wallet /> },
  { id: 'settings', label: 'Settings', path: '/app/settings', icon: <Settings /> },
];

const item = (id: string) => {
  const p = pages.find((page) => page.id === id)!;
  return { id: p.id, label: p.label, href: `#${p.path}`, icon: p.icon, badge: p.badge };
};

/** The app frame: sidebar with search, navigation, trial card and account; the page fills the rest. */
export function AppShell({ current, children }: { current: string; children: ReactNode }) {
  const me = members[0];
  const [search, setSearch] = useState(false);

  return (
    <div className="proto app">
      <aside className="app__side">
        <SideNav
          aria-label="Main"
          currentItem={current}
          header={
            <div className="app__brand">
              <Logo icon={<Sparkles />} name="Panda" href="#/app" />
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
          }
          sections={[
            {
              title: 'General',
              items: ['overview', 'analytics', 'projects', 'messages', 'calendar'].map(item),
            },
            { title: 'Commerce', items: ['orders', 'customers', 'finance'].map(item) },
            {
              title: 'Workspace',
              items: [
                item('settings'),
                { id: 'support', label: 'Support', href: '#/app', icon: <LifeBuoy /> },
              ],
            },
          ]}
          footer={
            <div className="app__footer">
              <div className="app__trial">
                <Progress
                  label="Free trial"
                  value={6}
                  max={30}
                  showValue
                  size="small"
                  formatValue={(v, m) => `${m - v} days left`}
                />
                <Button
                  variant="secondary"
                  appearance="outline"
                  size="small"
                  fullWidth
                  href="#/app/settings/billing"
                >
                  Upgrade now
                </Button>
              </div>
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
                <DropdownMenuContent align="end" side="top">
                  <DropdownMenuLabel>{me.name}</DropdownMenuLabel>
                  <DropdownMenuItem icon={<User />} onSelect={() => go('/app/profile')}>
                    View profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    icon={<CreditCard />}
                    onSelect={() => go('/app/settings/billing')}
                  >
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem icon={<Settings />} onSelect={() => go('/app/settings')}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="danger" icon={<LogOut />} onSelect={() => go('/app')}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
                  id: 'project',
                  label: 'New project',
                  icon: <Plus />,
                  shortcut: ['⌘', 'N'],
                  onSelect: () => go('/app/projects'),
                },
                {
                  id: 'invite',
                  label: 'Invite team member',
                  icon: <UserPlus />,
                  onSelect: () => go('/app/settings/team'),
                },
                {
                  id: 'event',
                  label: 'Add event',
                  icon: <Calendar />,
                  onSelect: () => go('/app/calendar'),
                },
              ],
            },
            {
              label: 'People',
              items: members.map((m) => ({
                id: m.email,
                label: m.name,
                description: m.role,
                icon: <User />,
                onSelect: () => go('/app/profile'),
              })),
            },
          ]}
        />
      </aside>
      <main className="app__main">{children}</main>
    </div>
  );
}
