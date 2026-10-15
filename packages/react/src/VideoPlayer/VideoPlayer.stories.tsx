import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { VideoPlayer } from './VideoPlayer';

const meta = {
  title: 'Components/Data display/VideoPlayer',
  component: VideoPlayer,
  tags: ['!autodocs'],
  args: { label: 'Product tour', aspectRatio: '16:9', onPlay: fn() },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 560 }}><Story /></div>],
} satisfies Meta<typeof VideoPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AspectRatios: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
      <VideoPlayer {...args} aspectRatio="16:9" label="16:9" />
      <VideoPlayer {...args} aspectRatio="4:3" label="4:3" />
      <VideoPlayer {...args} aspectRatio="1:1" label="1:1" />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <VideoPlayer {...args} label="جولة في المنتج" />
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
            <VideoPlayer {...args} label={`${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

export const Behavior: Story = {
  tags: ['test'],
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Play Product tour' }));
    await expect(args.onPlay).toHaveBeenCalled();
  },
};
