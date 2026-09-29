import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { ChooseCard, ChooseCardGroup } from './ChooseCard';

const Plans = (props: Partial<React.ComponentProps<typeof ChooseCardGroup>>) => (
  <ChooseCardGroup aria-label="Plan" defaultValue="pro" {...props}>
    <ChooseCard value="basic" title="Basic" description="For individuals" price="Free" />
    <ChooseCard value="pro" title="Pro" description="For professionals" price="$29 / month" />
    <ChooseCard value="team" title="Team" description="For large teams" price="Custom" />
  </ChooseCardGroup>
);

const meta = {
  title: 'Patterns/ChooseCard',
  component: ChooseCardGroup,
  subcomponents: { ChooseCard },
  tags: ['!autodocs'],
  args: { orientation: 'vertical', 'aria-label': 'Plan', children: null },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  render: (args) => (
    <div style={{ maxInlineSize: args.orientation === 'horizontal' ? 720 : 360 }}>
      <Plans orientation={args.orientation} />
    </div>
  ),
} satisfies Meta<typeof ChooseCardGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Orientation: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxInlineSize: 720 }}>
      <div style={{ maxInlineSize: 360 }}>
        <Plans />
      </div>
      <Plans orientation="horizontal" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <ChooseCardGroup aria-label="States" defaultValue="selected" style={{ maxInlineSize: 360 }}>
      <ChooseCard value="default" title="Default" description="Not selected" />
      <ChooseCard value="hover" id="choose-hover" title="Hover" description="Pointer over it" />
      <ChooseCard value="selected" title="Selected" description="The chosen option" />
      <ChooseCard value="focus" id="choose-focus" title="Focus" description="Keyboard focus" />
      <ChooseCard value="disabled" title="Disabled" description="Can’t be chosen" disabled />
    </ChooseCardGroup>
  ),
  parameters: { pseudo: { hover: ['#choose-hover'], focusVisible: ['#choose-focus'] } },
};

export const WithoutPrice: Story = {
  render: () => (
    <ChooseCardGroup aria-label="Data refresh" defaultValue="hourly" orientation="horizontal">
      <ChooseCard value="realtime" title="Real-time" description="Live updates" />
      <ChooseCard value="hourly" title="Hourly" description="Every hour" />
      <ChooseCard value="daily" title="Daily" description="Once a day" />
    </ChooseCardGroup>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <ChooseCardGroup aria-label="الخطة" defaultValue="pro" style={{ maxInlineSize: 360 }}>
      <ChooseCard value="basic" title="أساسي" description="للأفراد" price="مجاني" />
      <ChooseCard value="pro" title="احترافي" description="للمحترفين" price="29 $ / شهر" />
    </ChooseCardGroup>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Plans orientation="horizontal" aria-label={`Plan, ${brand} ${mode}`} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** One Tab stop; arrow keys move and select; each card is named by its title. */
export const Keyboard: Story = {
  tags: ['test'],
  render: () => <Plans />,
  play: async ({ canvas }) => {
    const pro = canvas.getByRole('radio', { name: 'Pro' });
    await expect(pro).toBeChecked();
    await expect(pro).toHaveAccessibleDescription('For professionals $29 / month');
    await userEvent.tab();
    await waitFor(() => expect(pro).toHaveFocus());
    // user-event releases the key before Radix moves focus, so select the focused card
    // with Space (in a browser, the arrow alone selects it).
    await userEvent.keyboard('{ArrowDown}');
    const team = canvas.getByRole('radio', { name: 'Team' });
    await waitFor(() => expect(team).toHaveFocus());
    await userEvent.keyboard(' ');
    await waitFor(() => expect(team).toBeChecked());
  },
};
