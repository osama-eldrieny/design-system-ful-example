import type { Meta, StoryObj } from '@storybook/react-vite';
import { Trash2 } from 'lucide-react';
import { expect, screen, userEvent, waitFor } from 'storybook/test';
import { IconButton } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Overlays/Tooltip',
  component: Tooltip,
  tags: ['!autodocs'],
  args: { content: 'Delete', side: 'top', children: <span /> },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ padding: 48 }}>{Story()}</div>],
  render: (args) => (
    <Tooltip {...args}>
      <IconButton icon={<Trash2 />} label="Delete" />
    </Tooltip>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Open: Story = { args: { defaultOpen: true } };

/** Top (default), end, bottom and start; arrows point at the trigger. */
export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: 96,
        padding: 64,
        justifyContent: 'center',
      }}
    >
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side} content={`On the ${side}`} side={side} arrow defaultOpen>
          <button type="button">{side}</button>
        </Tooltip>
      ))}
    </div>
  ),
};

/** A bold title above supporting text, with an arrow pointing at the trigger. */
export const WithTitle: Story = {
  args: {
    defaultOpen: true,
    arrow: true,
    title: 'Delete file',
    content: 'Files in the bin are removed after 30 days.',
  },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: { content: 'حذف', defaultOpen: true },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 56, paddingBlockStart: 32 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Tooltip content={`${brand} ${mode}`} defaultOpen side="right">
              <IconButton icon={<Trash2 />} label={`Delete ${brand} ${mode}`} />
            </Tooltip>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Shows on keyboard focus, describes the button, and hides on Escape. */
export const KeyboardFocus: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await userEvent.tab();
    const button = canvas.getByRole('button', { name: 'Delete' });
    await expect(button).toHaveFocus();
    const tip = await screen.findByRole('tooltip');
    await expect(tip).toHaveTextContent('Delete');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
  },
};
