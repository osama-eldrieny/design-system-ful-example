import {
  ActivityFeed,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  InputField,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@ds/react';
import { Bell, CreditCard, LogOut, Search, Settings, User, UserPlus, Zap } from 'lucide-react';
import { members } from '../dashboard-data';
import { go } from '../router';

/**
 * The header navigation across the top of a page: where you are on the start side; search,
 * upgrade, settings, notifications and the account on the end side.
 */
export function TopBar({ trail }: { trail: { label: string; href?: string }[] }) {
  const me = members[0];
  return (
    <header className="app-topbar">
      <Breadcrumb homeIcon items={trail} />
      <div className="app-topbar__end">
        <InputField
          label="Search"
          hideLabel
          size="small"
          iconStart={<Search />}
          shortcut="⌘K"
          placeholder="Search"
          className="app-topbar__search"
        />
        <Button
          variant="secondary"
          appearance="outline"
          size="small"
          iconStart={<Zap />}
          href="#/app/settings/billing"
        >
          Upgrade now
        </Button>
        <IconButton
          icon={<Settings />}
          label="Settings"
          variant="secondary"
          appearance="ghost"
          onClick={() => go('/app/settings')}
        />
        <Popover>
          <PopoverTrigger asChild>
            <span className="app-topbar__bell">
              <IconButton
                icon={<Bell />}
                label="Notifications, 3 new"
                variant="secondary"
                appearance="ghost"
              />
              <Badge
                className="app-topbar__count"
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              appearance="text"
              variant="secondary"
              className="app-topbar__avatar"
              aria-label={`Account: ${me.name}`}
            >
              <Avatar name={me.name} src={me.src} size="small" status="online" decorative />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{me.name}</DropdownMenuLabel>
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
        </DropdownMenu>
      </div>
    </header>
  );
}
