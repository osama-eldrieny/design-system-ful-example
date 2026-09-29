import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Header } from './Header';

const meta = {
  title: 'Patterns/Header',
  component: Header,
  tags: ['!autodocs'],
  args: {
    avatar: 'assets/avatar-1.png',
    name: 'Osama Eldrieny',
    jobTitle: 'Design System Designer',
    heading: 'Multi-theme design system',
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithoutPhoto: Story = {
  args: { avatar: undefined, name: 'Sarah Chen', jobTitle: 'Head of Products' },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    name: 'أسامة الدريني',
    jobTitle: 'مصمم أنظمة التصميم',
    heading: 'نظام تصميم متعدد السمات',
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          // Inside an article, so the six headers aren't six banner landmarks.
          <article key={`${brand}-${mode}`} aria-label={`${brand} ${mode}`}>
            <ThemeProvider theme={{ brand, mode }} className="ds-canvas">
              <Header {...args} headingAs="h2" heading={`${brand} ${mode}`} />
            </ThemeProvider>
          </article>
        )),
      )}
    </div>
  ),
};

/** A banner landmark with the page's h1; the avatar is hidden from screen readers. */
export const Semantics: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('banner')).toBeVisible();
    await expect(
      canvas.getByRole('heading', { level: 1, name: 'Multi-theme design system' }),
    ).toBeVisible();
    await expect(canvas.queryByRole('img')).toBeNull();
  },
};
