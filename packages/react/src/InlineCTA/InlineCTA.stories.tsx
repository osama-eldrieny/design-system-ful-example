import type { Meta, StoryObj } from '@storybook/react-vite';
import { LifeBuoy, Sparkles, Users } from 'lucide-react';
import { expect, within } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { InlineCTA } from './InlineCTA';

const actions = (
  <>
    <Button variant="secondary" appearance="outline">Later</Button>
    <Button>Invite</Button>
  </>
);

const meta = {
  title: 'Patterns/InlineCTA',
  component: InlineCTA,
  tags: ['!autodocs'],
  args: {
    icon: <Users />,
    title: 'Invite your team',
    description: 'Projects move faster together. Invite up to 5 people for free.',
    actions,
    appearance: 'subtle',
    layout: 'horizontal',
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof InlineCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Appearances: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <InlineCTA {...args} appearance="subtle" title="Subtle" />
      <InlineCTA {...args} appearance="brand" icon={<Sparkles />} title="Brand" actions={<Button>Upgrade</Button>} />
      <InlineCTA {...args} appearance="outline" title="Outline" />
    </div>
  ),
};

export const Layout: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <InlineCTA {...args} layout="horizontal" title="Horizontal" />
      <div style={{ maxInlineSize: 300 }}>
        <InlineCTA
          {...args}
          layout="stacked"
          appearance="outline"
          icon={<LifeBuoy />}
          title="Stacked"
          description="Our team replies within an hour."
          actions={<Button>Contact support</Button>}
        />
      </div>
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <InlineCTA
        {...args}
        title="ادعُ فريقك"
        description="تتقدم المشاريع أسرع معًا. ادعُ حتى 5 أشخاص مجانًا."
        actions={
          <>
            <Button variant="secondary" appearance="outline">لاحقًا</Button>
            <Button>ادعُ</Button>
          </>
        }
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
            <InlineCTA {...args} appearance="brand" title={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

export const Behavior: Story = {
  tags: ['test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 3, name: 'Invite your team' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Invite' })).toBeInTheDocument();
  },
};
