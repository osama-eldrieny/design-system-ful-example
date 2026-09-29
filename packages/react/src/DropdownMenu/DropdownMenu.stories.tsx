import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowDownNarrowWide, Copy, Ellipsis, FolderInput, Pencil, Trash2 } from 'lucide-react';
import { useState, type ComponentProps } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Button, IconButton } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './DropdownMenu';

// Docs examples open by default and don't trap focus, so the page stays usable.
const showOpen = { defaultOpen: true, modal: false } as const;

const ActionsMenu = (props: ComponentProps<typeof DropdownMenu> & { onSelect?: () => void }) => (
  <DropdownMenu {...props}>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" appearance="outline">
        Options
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem icon={<Pencil />} shortcut="⌘E" onSelect={props.onSelect}>
        Rename
      </DropdownMenuItem>
      <DropdownMenuItem icon={<Copy />} shortcut="⌘D" onSelect={props.onSelect}>
        Duplicate
      </DropdownMenuItem>
      <DropdownMenuItem icon={<FolderInput />} onSelect={props.onSelect}>
        Move to…
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={<Trash2 />} variant="danger" onSelect={props.onSelect}>
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const meta = {
  title: 'Components/Overlays/DropdownMenu',
  component: DropdownMenu,
  tags: ['!autodocs'],
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ minBlockSize: 280 }}>{Story()}</div>],
  render: () => <ActionsMenu />,
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Press the button to open the menu. */
export const Playground: Story = {};

export const ItemVariants: Story = { render: () => <ActionsMenu {...showOpen} /> };

export const CheckboxAndRadioItems: Story = {
  render: function Render() {
    const [sort, setSort] = useState('newest');
    const [columns, setColumns] = useState({ price: true, rating: false });
    return (
      <DropdownMenu {...showOpen}>
        <DropdownMenuTrigger asChild>
          <Button appearance="outline" iconStart={<ArrowDownNarrowWide />}>
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rating">Rating</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Columns</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={columns.price}
            onCheckedChange={(v) => setColumns((c) => ({ ...c, price: v }))}
          >
            Price
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={columns.rating}
            onCheckedChange={(v) => setColumns((c) => ({ ...c, rating: v }))}
          >
            Rating
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const Submenu: Story = {
  render: () => (
    <DropdownMenu {...showOpen}>
      <DropdownMenuTrigger asChild>
        <IconButton
          icon={<Ellipsis />}
          label="More actions"
          variant="secondary"
          appearance="ghost"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={<FolderInput />}>Move to</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Design</DropdownMenuItem>
            <DropdownMenuItem>Marketing</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem disabled>Archive (unavailable)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const States: Story = {
  render: () => (
    <DropdownMenu {...showOpen}>
      <DropdownMenuTrigger asChild>
        <Button appearance="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>Default</DropdownMenuItem>
        <DropdownMenuItem data-highlighted="">Highlighted</DropdownMenuItem>
        <DropdownMenuCheckboxItem checked>Checked</DropdownMenuCheckboxItem>
        <DropdownMenuItem disabled>Disabled</DropdownMenuItem>
        <DropdownMenuItem variant="danger">Danger</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <DropdownMenu {...showOpen}>
      <DropdownMenuTrigger asChild>
        <Button appearance="outline">خيارات</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem icon={<Pencil />}>إعادة تسمية</DropdownMenuItem>
        <DropdownMenuItem icon={<Copy />}>تكرار</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<Trash2 />} variant="danger">
          حذف
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <ActionsMenu {...showOpen} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Open from the keyboard, move, choose; focus returns to the trigger. */
export const Keyboard: Story = {
  tags: ['test'],
  args: { onOpenChange: fn() },
  render: () => {
    const onSelect = fn();
    return <ActionsMenu onSelect={onSelect} />;
  },
  play: async ({ canvas, step }) => {
    const trigger = canvas.getByRole('button', { name: 'Options' });
    const body = within(document.body);
    await step('Enter opens the menu', async () => {
      trigger.focus();
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(body.getByRole('menu')).toBeInTheDocument());
    });
    await step('Arrow keys move; Escape closes and returns focus', async () => {
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(body.getByRole('menuitem', { name: /Duplicate/ })).toHaveFocus());
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(body.queryByRole('menu')).toBeNull());
      await expect(trigger).toHaveFocus();
    });
  },
};
