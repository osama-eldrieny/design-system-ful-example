import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BarChart3,
  FilePlus,
  House,
  Package,
  Search,
  Settings,
  UserPlus,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { expect, fn, screen, userEvent, waitFor } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { CommandMenu, type CommandMenuGroup } from './CommandMenu';

const groups: CommandMenuGroup[] = [
  {
    label: 'Pages',
    items: [
      { id: 'home', label: 'Dashboard', icon: <House />, description: '/dashboard' },
      {
        id: 'orders',
        label: 'Orders',
        icon: <Package />,
        description: '/orders',
        keywords: ['sales'],
      },
      { id: 'reports', label: 'Reports', icon: <BarChart3 />, description: '/reports' },
      { id: 'team', label: 'Team', icon: <Users />, description: '/team' },
      { id: 'settings', label: 'Settings', icon: <Settings />, shortcut: ['⌘', ','] },
    ],
  },
  {
    label: 'Actions',
    items: [
      {
        id: 'invoice',
        label: 'New invoice',
        icon: <FilePlus />,
        shortcut: ['⌘', 'N'],
        onSelect: fn(),
      },
      {
        id: 'invite',
        label: 'Invite member',
        icon: <UserPlus />,
        shortcut: ['⌘', 'I'],
        onSelect: fn(),
      },
    ],
  },
];

const meta = {
  title: 'Components/Overlays/CommandMenu',
  component: CommandMenu,
  tags: ['!autodocs'],
  args: { groups, hotkey: true, showFooter: true },
  argTypes: { groups: { control: false } },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof CommandMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press ⌘K (Ctrl+K on Windows), or use the trigger. */
export const Playground: Story = {
  render: (args) => (
    <>
      <p>Press ⌘K or Ctrl+K anywhere to open the menu.</p>
      <CommandMenu {...args} />
    </>
  ),
};

/** Open by default, to see the layout. */
export const Open: Story = { args: { defaultOpen: true } };

/** Controlled: a search button opens it. */
const Controlled = (args: React.ComponentProps<typeof CommandMenu>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="secondary"
        appearance="outline"
        iconStart={<Search />}
        onClick={() => setOpen(true)}
      >
        Search…
      </Button>
      <CommandMenu {...args} open={open} onOpenChange={setOpen} hotkey={false} />
    </>
  );
};

export const WithTrigger: Story = { render: (args) => <Controlled {...args} /> };

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    defaultOpen: true,
    label: 'قائمة الأوامر',
    placeholder: 'ابحث أو اكتب أمرًا…',
    groups: [{ label: 'الصفحات', items: [{ id: 'home', label: 'لوحة التحكم', icon: <House /> }] }],
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Button>{`${brand} ${mode}`}</Button>
          </ThemeProvider>
        )),
      )}
      <ThemeProvider theme={{ brand: 'amber', mode: 'dark' }}>
        <CommandMenu groups={groups} defaultOpen hotkey={false} />
      </ThemeProvider>
    </div>
  ),
};

/** Typing filters; arrows move; Enter runs the action. */
export const Keyboard: Story = {
  tags: ['test'],
  args: { defaultOpen: true, hotkey: false },
  play: async () => {
    const input = await screen.findByRole('combobox', { name: 'Command menu' });
    await userEvent.type(input, 'inv');
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(2));
    await userEvent.keyboard('{ArrowDown}');
    await expect(screen.getByRole('option', { name: /Invite member/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  },
};
