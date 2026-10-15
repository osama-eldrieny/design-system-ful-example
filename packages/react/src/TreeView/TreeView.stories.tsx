import type { Meta, StoryObj } from '@storybook/react-vite';
import { File, Folder } from 'lucide-react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { TreeView, type TreeItem } from './TreeView';

const files: TreeItem[] = [
  {
    id: 'src',
    label: 'src',
    icon: <Folder />,
    children: [
      {
        id: 'components',
        label: 'components',
        icon: <Folder />,
        children: [
          { id: 'button', label: 'Button.tsx', icon: <File /> },
          { id: 'card', label: 'Card.tsx', icon: <File /> },
        ],
      },
      { id: 'app', label: 'App.tsx', icon: <File /> },
      { id: 'legacy', label: 'legacy.ts', icon: <File />, disabled: true },
    ],
  },
  { id: 'public', label: 'public', icon: <Folder />, children: [{ id: 'logo', label: 'logo.svg', icon: <File /> }] },
  { id: 'readme', label: 'README.md', icon: <File /> },
];

const meta = {
  title: 'Components/Navigation/TreeView',
  component: TreeView,
  tags: ['!autodocs'],
  args: {
    label: 'Files',
    items: files,
    defaultExpanded: ['src', 'components'],
    defaultSelected: 'button',
    size: 'medium',
    guides: false,
    onSelect: fn(),
  },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 280 }}><Story /></div>],
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <TreeView {...args} label="Small" size="small" />
      <TreeView {...args} label="Medium" size="medium" />
    </div>
  ),
};

export const Guides: Story = { args: { guides: true } };

export const States: Story = {
  args: { defaultExpanded: ['src', 'components'], defaultSelected: 'app' },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <TreeView
        {...args}
        label="الملفات"
        guides
        items={[
          { id: 'docs', label: 'المستندات', icon: <Folder />, children: [{ id: 'r', label: 'التقرير.pdf', icon: <File /> }] },
          { id: 'n', label: 'ملاحظات.txt', icon: <File /> },
        ]}
        defaultExpanded={['docs']}
        defaultSelected="r"
      />
    </div>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <TreeView {...args} label={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

export const Behavior: Story = {
  tags: ['test'],
  args: { defaultExpanded: [], defaultSelected: null },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const src = canvas.getByRole('treeitem', { name: /src/ });
    await expect(src).toHaveAttribute('aria-expanded', 'false');
    src.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(src).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(args.onSelect).toHaveBeenCalledWith('components');
  },
};
