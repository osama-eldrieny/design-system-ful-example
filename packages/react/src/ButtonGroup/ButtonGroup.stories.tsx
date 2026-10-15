import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { ButtonGroup } from './ButtonGroup';

const meta = {
  title: 'Components/Actions/ButtonGroup',
  component: ButtonGroup,
  tags: ['!autodocs'],
  args: { 'aria-label': 'Pages', orientation: 'horizontal', children: null },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button appearance="outline" variant="secondary">
        Previous
      </Button>
      <Button appearance="outline" variant="secondary">
        Next
      </Button>
    </ButtonGroup>
  ),
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Layouts: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, justifyItems: 'start' }}>
      <ButtonGroup aria-label="Spaced">
        <Button appearance="outline">Copy</Button>
        <Button appearance="outline">Paste</Button>
        <Button appearance="outline">Cut</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Vertical" orientation="vertical">
        <Button appearance="outline">Copy</Button>
        <Button appearance="outline">Paste</Button>
        <Button appearance="outline">Cut</Button>
      </ButtonGroup>
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <ButtonGroup aria-label="الصفحات">
      <Button variant="secondary" appearance="outline">
        السابق
      </Button>
      <Button variant="secondary" appearance="outline">
        التالي
      </Button>
    </ButtonGroup>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <ButtonGroup aria-label={`${brand} ${mode}`}>
              <Button>Primary</Button>
              <Button variant="secondary" appearance="outline">
                Secondary
              </Button>
            </ButtonGroup>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};
