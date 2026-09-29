import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Badge, type BadgeTone } from './Badge';

const TONES: BadgeTone[] = ['primary', 'secondary', 'success', 'warning', 'danger'];
const row = { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' } as const;

const meta = {
  title: 'Components/Feedback/Badge',
  component: Badge,
  tags: ['!autodocs'],
  args: { children: 'Paid', tone: 'success', appearance: 'subtle' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['subtle', 'solid'] as const).map((appearance) => (
        <div key={appearance} style={row}>
          {TONES.map((tone) => (
            <Badge key={tone} tone={tone} appearance={appearance}>
              {tone}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const CountsAndDots: Story = {
  render: () => (
    <div style={row}>
      <Badge appearance="solid" tone="danger" count={3} label="3 unread messages" />
      <Badge appearance="solid" tone="danger" count={128} label="128 unread messages" />
      <Badge dot tone="success" label="Online" />
      <Badge dot tone="warning" label="Away" />
    </div>
  ),
};

export const RightToLeft: Story = { globals: { language: 'ar' }, args: { children: 'مدفوع' } };

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div style={row}>
              {TONES.flatMap((tone) =>
                (['subtle', 'solid'] as const).map((appearance) => (
                  <Badge key={tone + appearance} tone={tone} appearance={appearance}>
                    {tone}
                  </Badge>
                )),
              )}
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Counts cap at max and are announced with their label. */
export const Labels: Story = {
  tags: ['test'],
  render: () => <Badge count={128} label="128 unread messages" />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('99+')).toHaveAttribute('aria-hidden', 'true');
    await expect(canvas.getByText('128 unread messages')).toBeInTheDocument();
  },
};
