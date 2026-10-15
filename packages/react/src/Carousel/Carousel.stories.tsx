import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Carousel } from './Carousel';

const slides = [
  <p key="a" style={{ margin: 0, padding: 32 }}>Ship the new dashboard in one click.</p>,
  <p key="b" style={{ margin: 0, padding: 32 }}>Invite your team and see their work together.</p>,
  <p key="c" style={{ margin: 0, padding: 32 }}>Export every report as a PDF or a spreadsheet.</p>,
];

const meta = {
  title: 'Components/Data display/Carousel',
  component: Carousel,
  tags: ['!autodocs'],
  args: { label: 'Highlights', slides, controls: 'both', onIndexChange: fn() },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 480 }}><Story /></div>],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Controls: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      <Carousel {...args} label="Arrows and dots" controls="both" />
      <Carousel {...args} label="Arrows only" controls="arrows" />
      <Carousel {...args} label="Dots only" controls="dots" />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <Carousel
        {...args}
        label="أبرز الميزات"
        slides={[<p key="a" style={{ margin: 0, padding: 32 }}>أطلق لوحة المعلومات الجديدة بنقرة واحدة.</p>, <p key="b" style={{ margin: 0, padding: 32 }}>ادعُ فريقك.</p>]}
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
            <Carousel {...args} label={`${brand} ${mode}`} />
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
    await userEvent.click(canvas.getByRole('button', { name: 'Next slide' }));
    await expect(args.onIndexChange).toHaveBeenCalledWith(1);
    await expect(canvas.getByRole('group', { name: '2 of 3' })).toBeInTheDocument();
  },
};
