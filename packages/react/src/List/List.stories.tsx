import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText, Image } from 'lucide-react';
import { expect } from 'storybook/test';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { List, ListItem } from './List';
import { ThemeProvider } from '../ThemeProvider';

const Files = (props: { divided?: boolean }) => (
  <List {...props} style={{ maxInlineSize: 420 }}>
    <ListItem
      icon={<FileText />}
      title="Quarterly report.pdf"
      description="2.4 MB"
      meta="Today"
      href="#1"
    />
    <ListItem
      icon={<Image />}
      title="Banner.png"
      description="820 KB"
      meta={<Badge tone="warning">Draft</Badge>}
      href="#2"
    />
    <ListItem icon={<FileText />} title="Notes.txt" description="4 KB" meta="Sep 12" href="#3" />
  </List>
);

const meta = {
  title: 'Components/Data display/List',
  component: List,
  tags: ['!autodocs'],
  args: { children: null, divided: true },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { render: (args) => <Files divided={args.divided} /> };

export const Divided: Story = { render: () => <Files divided /> };

export const People: Story = {
  render: () => (
    <List style={{ maxInlineSize: 420 }}>
      <ListItem
        icon={<Avatar name="Sarah Chen" src="assets/avatar-2.png" decorative />}
        title="Sarah Chen"
        description="Head of Products"
      />
      <ListItem
        icon={<Avatar name="James Wilson" decorative />}
        title="James Wilson"
        description="Engineering Director"
      />
    </List>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <List divided style={{ maxInlineSize: 420 }}>
      <ListItem
        icon={<FileText />}
        title="التقرير الفصلي"
        description="2.4 ميغابايت"
        meta="اليوم"
        href="#1"
      />
    </List>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Files divided />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** A list of linked rows. */
export const Semantics: Story = {
  tags: ['test'],
  render: () => <Files divided />,
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
    await expect(canvas.getByRole('link', { name: /Quarterly report/ })).toHaveAttribute(
      'href',
      '#1',
    );
  },
};
