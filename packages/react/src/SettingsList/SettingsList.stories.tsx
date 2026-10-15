import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Button } from '../Button';
import { Switch } from '../Switch';
import { ThemeProvider } from '../ThemeProvider';
import { SettingsList } from './SettingsList';

const items = [
  {
    id: 'password',
    title: 'Password',
    description: 'Last changed 3 months ago.',
    control: <Button size="small" variant="secondary" appearance="outline">Change</Button>,
  },
  {
    id: '2fa',
    title: 'Two-factor authentication',
    control: <Switch aria-label="Two-factor authentication" defaultChecked />,
  },
  {
    id: 'sessions',
    title: 'Active sessions',
    description: '3 devices: MacBook, iPhone, Chrome on Windows.',
    control: <Button size="small" variant="secondary" appearance="outline">Sign out all</Button>,
  },
];

const meta = {
  title: 'Components/Data display/SettingsList',
  component: SettingsList,
  tags: ['!autodocs'],
  args: { items, framed: false },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 560 }}><Story /></div>],
} satisfies Meta<typeof SettingsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Framed: Story = { args: { framed: true } };

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <div dir="rtl">
      <SettingsList
        {...args}
        items={[
          { id: 'pw', title: 'كلمة المرور', description: 'آخر تغيير منذ ٣ أشهر.', control: <Button size="small" variant="secondary" appearance="outline">تغيير</Button> },
          { id: 'tf', title: 'المصادقة الثنائية', control: <Switch aria-label="المصادقة الثنائية" defaultChecked /> },
        ]}
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
            <SettingsList {...args} framed />
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
    await expect(canvas.getByText('Two-factor authentication')).toBeInTheDocument();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
  },
};
