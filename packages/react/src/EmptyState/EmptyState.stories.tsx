import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchX } from 'lucide-react';
import { expect } from 'storybook/test';
import { Button } from '../Button';
import { EmptyState } from './EmptyState';
import { ThemeProvider } from '../ThemeProvider';

const meta = {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
  tags: ['!autodocs'],
  args: {
    title: 'No orders yet',
    description: 'Orders appear here once customers buy.',
    actions: <Button>Create order</Button>,
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const NoResults: Story = {
  args: {
    icon: <SearchX />,
    title: 'No results',
    description: 'Try other words or clear the filters.',
    actions: <Button appearance="outline">Clear filters</Button>,
  },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    title: 'لا توجد طلبات بعد',
    description: 'ستظهر الطلبات هنا.',
    actions: <Button>إنشاء طلب</Button>,
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <EmptyState
              titleAs="h3"
              title={`${brand} ${mode}`}
              description="Description."
              actions={<Button>Action</Button>}
            />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** A heading names the empty area. */
export const Semantics: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 2, name: 'No orders yet' })).toBeVisible();
  },
};
