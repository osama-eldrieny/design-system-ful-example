import type { Meta, StoryObj } from '@storybook/react-vite';
import { Laptop, LayoutGrid, ShoppingBag } from 'lucide-react';
import { expect, userEvent, waitFor } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Tab, TabList, TabPanel, Tabs, type TabsAppearance } from './Tabs';

const APPEARANCES: TabsAppearance[] = ['enclosed', 'pill', 'line'];

const Example = (props: Partial<React.ComponentProps<typeof Tabs>>) => (
  <Tabs defaultValue="overview" {...props}>
    <TabList label="Project">
      <Tab value="overview">Overview</Tab>
      <Tab value="activity">Activity</Tab>
      <Tab value="settings">Settings</Tab>
    </TabList>
    <TabPanel value="overview">Project summary, goals and status.</TabPanel>
    <TabPanel value="activity">Recent changes and comments.</TabPanel>
    <TabPanel value="settings">Members and permissions.</TabPanel>
  </Tabs>
);

const meta = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  subcomponents: { TabList, Tab, TabPanel },
  tags: ['!autodocs'],
  args: { appearance: 'enclosed', defaultValue: 'overview', children: null },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  render: (args) => <Example appearance={args.appearance} defaultValue={args.defaultValue} />,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Appearances: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {APPEARANCES.map((a) => (
        <Example key={a} appearance={a} />
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="all" appearance="pill">
      <TabList label="Product categories">
        <Tab value="all" icon={<LayoutGrid />}>
          All products
        </Tab>
        <Tab value="electronics" icon={<Laptop />}>
          Electronics
        </Tab>
        <Tab value="accessories" icon={<ShoppingBag />}>
          Accessories
        </Tab>
      </TabList>
      <TabPanel value="all">All products</TabPanel>
      <TabPanel value="electronics">Electronics</TabPanel>
      <TabPanel value="accessories">Accessories</TabPanel>
    </Tabs>
  ),
};

export const States: Story = {
  render: () => (
    <Tabs defaultValue="selected">
      <TabList label="States">
        <Tab value="default">Default</Tab>
        <Tab value="hover" id="tab-hover">
          Hover
        </Tab>
        <Tab value="selected">Selected</Tab>
        <Tab value="focus" id="tab-focus">
          Focus
        </Tab>
        <Tab value="disabled" disabled>
          Disabled
        </Tab>
      </TabList>
      <TabPanel value="selected">Panel for the selected tab.</TabPanel>
    </Tabs>
  ),
  parameters: { pseudo: { hover: ['#tab-hover'], focusVisible: ['#tab-focus'] } },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <Tabs defaultValue="a" appearance="line">
      <TabList label="المشروع">
        <Tab value="a">نظرة عامة</Tab>
        <Tab value="b">النشاط</Tab>
        <Tab value="c">الإعدادات</Tab>
      </TabList>
      <TabPanel value="a">ملخص المشروع.</TabPanel>
    </Tabs>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div style={{ display: 'grid', gap: 8 }}>
              {APPEARANCES.map((a) => (
                <Example key={a} appearance={a} />
              ))}
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Arrow keys move and select; the panel follows. */
export const Keyboard: Story = {
  tags: ['test'],
  play: async ({ canvas, step }) => {
    const overview = canvas.getByRole('tab', { name: 'Overview' });
    await step('Arrow Right selects the next tab and shows its panel', async () => {
      overview.focus();
      await userEvent.keyboard('{ArrowRight}');
      const activity = canvas.getByRole('tab', { name: 'Activity' });
      await waitFor(() => expect(activity).toHaveAttribute('aria-selected', 'true'));
      await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Recent changes');
    });
    await step('End jumps to the last tab', async () => {
      await userEvent.keyboard('{End}');
      await waitFor(() =>
        expect(canvas.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
          'aria-selected',
          'true',
        ),
      );
    });
  },
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="profile" appearance="line" orientation="vertical">
      <TabList label="Settings">
        <Tab value="profile">Profile</Tab>
        <Tab value="notifications">Notifications</Tab>
        <Tab value="security">Security</Tab>
      </TabList>
      <TabPanel value="profile">Your photo, name and bio.</TabPanel>
      <TabPanel value="notifications">What we email you about.</TabPanel>
      <TabPanel value="security">Two-step verification and devices.</TabPanel>
    </Tabs>
  ),
};
