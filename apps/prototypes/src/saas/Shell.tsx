import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  ActivityFeed,
  AvatarLabelGroup,
  Badge,
  Breadcrumb,
  Button,
  CommandMenu,
  Drawer,
  DrawerContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  Kbd,
  Logo,
  PageHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SideNav,
  type SideNavSection,
  type Theme,
} from '@ds/react';
import {
  Bell,
  ChevronDown,
  Headset,
  Languages,
  LogOut,
  Menu,
  Moon,
  Orbit,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Sun,
  UserCircle,
} from 'lucide-react';
import { go } from '../router';
import { me, notifications } from './data';
import { allPages, navSections, pageFor } from './nav';
import './saas.css';

/** The theme, shared with every Orbit page (dark mode toggle, AI settings, language). */
export const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void } | null>(
  null,
);
export const useOrbitTheme = () => useContext(ThemeContext)!;

/** Path inside Orbit → hash link. */
export const to = (path: string) => `#/saas${path}`;

function sideSections(): SideNavSection[] {
  return navSections.map((s) => ({
    title: s.title,
    items: s.groups.map((g) =>
      g.pages
        ? {
            id: g.id,
            label: g.label,
            icon: g.icon,
            items: g.pages.map((pg) => ({
              id: pg.path || 'home',
              label: pg.label,
              href: to(pg.path),
            })),
          }
        : { id: g.path!, label: g.label, icon: g.icon, href: to(g.path!) },
    ),
  }));
}

/** The group holding a page; the sidebar remounts per group so that group opens. */
const groupOf = (path: string) =>
  navSections
    .flatMap((s) => s.groups)
    .find((g) => g.path === path || g.pages?.some((pg) => pg.path === path))?.id;

function Sidebar({ current, slim }: { current: string; slim?: boolean }) {
  return (
    <SideNav
      key={groupOf(current)}
      aria-label="Orbit"
      collapsed={slim}
      currentItem={current || 'home'}
      header={<Logo icon={<Orbit />} name="Orbit" hideName={slim} href={to('')} />}
      sections={sideSections()}
    />
  );
}

export type ShellLayout = 'full' | 'slim' | 'top' | 'dual' | 'boxed' | 'rail';

/**
 * Orbit's frame: sidebar (full or slim), top bar with search, theme, notifications and the
 * account; the sidebar becomes a drawer on small screens.
 */
export function Shell({
  path,
  layout = 'full',
  rail,
  children,
}: {
  path: string;
  layout?: ShellLayout;
  rail?: ReactNode;
  children: ReactNode;
}) {
  const { theme, setTheme } = useOrbitTheme();
  const [slim, setSlim] = useState(layout === 'slim');
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const sidebar = layout !== 'top' && layout !== 'dual';

  return (
    <div
      className={[
        'proto orbit',
        sidebar && 'orbit--side',
        slim && 'orbit--slim',
        layout === 'boxed' && 'orbit--boxed',
        rail && 'orbit--rail',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {sidebar && (
        <aside className="orbit__side">
          <Sidebar current={path} slim={slim} />
        </aside>
      )}

      <header className="orbit__bar">
        <IconButton
          icon={<Menu />}
          label="Open menu"
          variant="secondary"
          appearance="outline"
          className="orbit__menu"
          onClick={() => setMenu(true)}
        />
        {sidebar ? (
          <IconButton
            icon={slim ? <PanelLeftOpen /> : <PanelLeftClose />}
            label={slim ? 'Expand sidebar' : 'Collapse sidebar'}
            variant="secondary"
            appearance="outline"
            className="orbit__collapse"
            onClick={() => setSlim((s) => !s)}
          />
        ) : (
          <Logo icon={<Orbit />} name="Orbit" href={to('')} className="orbit__bar-logo" />
        )}
        <Button
          variant="secondary"
          appearance="outline"
          iconStart={<Search />}
          iconEnd={<Kbd>⌘K</Kbd>}
          className="orbit__search"
          aria-label="Search"
          onClick={() => setSearch(true)}
        >
          <span className="orbit__search-text">Search or type a command</span>
        </Button>
        <span className="orbit__bar-end">
          <IconButton
            icon={theme.mode === 'dark' ? <Sun /> : <Moon />}
            label={theme.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            variant="secondary"
            appearance="outline"
            onClick={() => setTheme({ ...theme, mode: theme.mode === 'dark' ? 'light' : 'dark' })}
          />
          <Popover>
            <PopoverTrigger asChild>
              <span className="orbit__bell">
                <IconButton
                  icon={<Bell />}
                  label="Notifications, 3 new"
                  variant="secondary"
                  appearance="outline"
                />
                <Badge
                  className="orbit__count"
                  appearance="solid"
                  tone="danger"
                  size="small"
                  count={3}
                  label="3 new"
                />
              </span>
            </PopoverTrigger>
            <PopoverContent title="Notifications" align="end">
              <ActivityFeed
                aria-label="Notifications"
                appearance="divided"
                items={notifications.map((n, i) => ({
                  id: i,
                  avatar: { name: n.who.name, src: n.who.src },
                  title: (
                    <>
                      <strong>{n.who.name}</strong> {n.text}
                    </>
                  ),
                  time: n.time,
                  unread: n.unread,
                }))}
              />
              <Button
                variant="secondary"
                appearance="outline"
                size="small"
                fullWidth
                href={to('/support/inbox')}
              >
                View all notifications
              </Button>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                appearance="text"
                variant="secondary"
                className="orbit__account"
                aria-label={`Account: ${me.name}`}
              >
                <AvatarLabelGroup name={me.name} src={me.src} status="online" size="small" />
                <ChevronDown aria-hidden="true" className="orbit__account-icon" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {me.name}
                <span className="muted text-sm"> · {me.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuItem icon={<UserCircle />} onSelect={() => go('/saas/profile')}>
                Edit profile
              </DropdownMenuItem>
              <DropdownMenuItem icon={<Settings />} onSelect={() => go('/saas/ai/settings')}>
                Account settings
              </DropdownMenuItem>
              <DropdownMenuItem icon={<Headset />} onSelect={() => go('/saas/support/tickets')}>
                Support
              </DropdownMenuItem>
              <DropdownMenuItem
                icon={<Languages />}
                onSelect={() =>
                  setTheme({ ...theme, language: theme.language === 'ar' ? 'en' : 'ar' })
                }
              >
                {theme.language === 'ar' ? 'English' : 'العربية'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="danger"
                icon={<LogOut />}
                onSelect={() => go('/saas/auth/sign-in')}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </header>

      {layout === 'dual' && (
        <nav className="orbit__tier" aria-label="Sections">
          {navSections[0].groups.slice(0, 6).map((g) => (
            <Button
              key={g.id}
              appearance="ghost"
              variant="secondary"
              size="small"
              iconStart={g.icon}
              href={to(g.path ?? g.pages![0].path)}
            >
              {g.label}
            </Button>
          ))}
        </nav>
      )}

      <main className="orbit__main">{children}</main>
      {rail && <aside className="orbit__rail">{rail}</aside>}

      <Drawer open={menu} onOpenChange={setMenu}>
        <DrawerContent title="Menu" side="start" size="small">
          <div
            className="orbit__drawer"
            onClickCapture={(e) => (e.target as HTMLElement).closest('a') && setMenu(false)}
          >
            <Sidebar current={path} />
          </div>
        </DrawerContent>
      </Drawer>

      <CommandMenu
        open={search}
        onOpenChange={setSearch}
        label="Search Orbit"
        placeholder="Search pages…"
        groups={navSections
          .flatMap((s) => s.groups)
          .map((g) => ({
            label: g.label,
            items: allPages
              .filter((pg) => pg.group === g.label)
              .map((pg) => ({
                id: pg.path || 'home',
                label: pg.label,
                icon: g.icon,
                onSelect: () => go(`/saas${pg.path}`),
              })),
          }))}
      />
    </div>
  );
}

/** A page inside the shell: breadcrumbs, title, description, actions, then the content. */
export function Page({
  path,
  title,
  description,
  actions,
  header,
  children,
}: {
  path: string;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Under the title row, e.g. tabs or filters. */
  header?: ReactNode;
  children: ReactNode;
}) {
  const pg = pageFor(path);
  const trail = [
    { label: 'Home', href: to('') },
    ...(pg && pg.group !== pg.label && path !== '' ? [{ label: pg.group }] : []),
    { label: pg?.label ?? 'Page' },
  ];
  return (
    <div className="orbit-page">
      <PageHeader
        breadcrumbs={<Breadcrumb homeIcon items={trail} />}
        title={title ?? pg?.label}
        description={description}
        actions={actions}
      >
        {header}
      </PageHeader>
      {children}
    </div>
  );
}
