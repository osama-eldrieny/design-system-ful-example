import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import { expect, fn, userEvent } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { ButtonGroup } from './ButtonGroup';

const meta = {
  title: 'Components/Actions/ButtonGroup',
  component: ButtonGroup,
  tags: ['!autodocs'],
  args: { 'aria-label': 'Pages', attached: false, orientation: 'horizontal', children: null },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button appearance="outline" variant="secondary">
        Previous
      </Button>
      <Button appearance="outline" variant="secondary">
        Next
      </Button>
    </ButtonGroup>
  ),
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, justifyItems: 'start' }}>
      <ButtonGroup aria-label="Spaced">
        <Button appearance="outline">Copy</Button>
        <Button appearance="outline">Paste</Button>
        <Button appearance="outline">Cut</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Attached" attached>
        <Button appearance="outline">Copy</Button>
        <Button appearance="outline">Paste</Button>
        <Button appearance="outline">Cut</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Vertical" attached orientation="vertical">
        <Button appearance="outline">Copy</Button>
        <Button appearance="outline">Paste</Button>
        <Button appearance="outline">Cut</Button>
      </ButtonGroup>
    </div>
  ),
};

export const Segmented: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, justifyItems: 'start' }}>
      <ButtonGroup aria-label="View" attached defaultValue="list">
        <Button value="list">List</Button>
        <Button value="grid">Grid</Button>
        <Button value="board">Board</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Text alignment" attached defaultValue="left">
        <Button value="left" size="small" iconStart={<AlignLeft />}>
          Left
        </Button>
        <Button value="center" size="small" iconStart={<AlignCenter />}>
          Center
        </Button>
        <Button value="right" size="small" iconStart={<AlignRight />}>
          Right
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <ButtonGroup aria-label="العرض" attached defaultValue="list">
      <Button value="list">قائمة</Button>
      <Button value="grid">شبكة</Button>
    </ButtonGroup>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <ButtonGroup aria-label={`${brand} ${mode}`} attached defaultValue="a">
              <Button value="a">Pressed</Button>
              <Button value="b">Not pressed</Button>
            </ButtonGroup>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Pressing a segment releases the others and reports its value. */
export const Selection: Story = {
  tags: ['test'],
  args: { 'aria-label': 'View', attached: true, defaultValue: 'list', onValueChange: fn() },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button value="list">List</Button>
      <Button value="grid">Grid</Button>
    </ButtonGroup>
  ),
  play: async ({ args, canvas }) => {
    await expect(canvas.getByRole('group', { name: 'View' })).toBeVisible();
    const list = canvas.getByRole('button', { name: 'List' });
    const grid = canvas.getByRole('button', { name: 'Grid' });
    await expect(list).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(grid);
    await expect(grid).toHaveAttribute('aria-pressed', 'true');
    await expect(list).toHaveAttribute('aria-pressed', 'false');
    await expect(args.onValueChange).toHaveBeenCalledWith('grid');
  },
};
