import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertTriangle, Bell, CheckCircle2, Mail, Trash2, Zap } from 'lucide-react';
import { expect } from 'storybook/test';
import { BADGE_HUES, BADGE_TONES } from '../Badge';
import { ThemeProvider } from '../ThemeProvider';
import { FeaturedIcon, type FeaturedIconAppearance, type FeaturedIconSize } from './FeaturedIcon';

const COLORS = [...BADGE_TONES, ...BADGE_HUES];
const APPEARANCES: FeaturedIconAppearance[] = ['light', 'solid', 'outline', 'modern'];
const SIZES: FeaturedIconSize[] = ['small', 'medium', 'large', 'xlarge'];
const row = { display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' } as const;

const meta = {
  title: 'Components/Data display/FeaturedIcon',
  component: FeaturedIcon,
  tags: ['!autodocs'],
  args: { icon: <Bell />, tone: 'primary', appearance: 'light', size: 'medium', shape: 'circle' },
  argTypes: { icon: { control: false } },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof FeaturedIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Light, solid, outline rings, or a neutral modern tile. */
export const Appearances: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 20 }}>
      {APPEARANCES.map((appearance) => (
        <div key={appearance} style={row}>
          {(['success', 'warning', 'danger', 'primary'] as const).map((tone) => (
            <FeaturedIcon
              key={tone}
              {...args}
              tone={tone}
              appearance={appearance}
              icon={
                {
                  success: <CheckCircle2 />,
                  warning: <AlertTriangle />,
                  danger: <Trash2 />,
                  primary: <Zap />,
                }[tone]
              }
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

/** Every meaning and category hue. */
export const Colors: Story = {
  render: (args) => (
    <div style={row}>
      {COLORS.map((tone) => (
        <FeaturedIcon key={tone} {...args} tone={tone} icon={<Mail />} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={row}>
      {SIZES.map((size) => (
        <FeaturedIcon key={size} {...args} size={size} />
      ))}
      {SIZES.map((size) => (
        <FeaturedIcon key={`sq-${size}`} {...args} size={size} shape="square" />
      ))}
    </div>
  ),
};

export const RightToLeft: Story = { globals: { language: 'ar' } };

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div style={row}>
              {APPEARANCES.flatMap((appearance) =>
                COLORS.map((tone) => (
                  <FeaturedIcon
                    key={tone + appearance}
                    icon={<Bell />}
                    tone={tone}
                    appearance={appearance}
                    size="small"
                  />
                )),
              )}
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** With a label the icon is announced; without, it is hidden. */
export const Labelled: Story = {
  tags: ['test'],
  args: { label: 'Notifications' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Notifications' })).toBeInTheDocument();
  },
};
