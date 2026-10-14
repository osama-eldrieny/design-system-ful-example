import type { Meta, StoryObj } from '@storybook/react-vite';
import { Download, Plus, Search } from 'lucide-react';
import { expect } from 'storybook/test';
import { Avatar } from '../Avatar';
import { Breadcrumb } from '../Breadcrumb';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { Tab, TabList, TabPanel, Tabs } from '../Tabs';
import { ThemeProvider } from '../ThemeProvider';
import { PageHeader } from './PageHeader';

const actions = (
  <>
    <Button variant="secondary" appearance="outline" iconStart={<Download />}>
      Export
    </Button>
    <Button iconStart={<Plus />}>Add product</Button>
  </>
);

const meta = {
  title: 'Components/Layout/PageHeader',
  component: PageHeader,
  tags: ['!autodocs'],
  args: {
    title: 'Products',
    description: 'Manage your catalog, prices and stock.',
    actions,
    size: 'medium',
    divider: false,
  },
  argTypes: {
    actions: { control: false },
    breadcrumbs: { control: false },
    leading: { control: false },
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Breadcrumbs above, a search field and tabs under the title row. */
export const Full: Story = {
  render: (args) => (
    <PageHeader
      {...args}
      divider
      breadcrumbs={
        <Breadcrumb
          homeIcon
          items={[
            { label: 'Home', href: '#' },
            { label: 'Store', href: '#' },
            { label: 'Products' },
          ]}
        />
      }
    >
      <Tabs appearance="line" defaultValue="all">
        <TabList label="Product status">
          <Tab value="all" count={240}>
            All
          </Tab>
          <Tab value="active">Active</Tab>
          <Tab value="draft">Drafts</Tab>
        </TabList>
        <TabPanel value="all">All products</TabPanel>
        <TabPanel value="active">Active products</TabPanel>
        <TabPanel value="draft">Draft products</TabPanel>
      </Tabs>
    </PageHeader>
  ),
};

/** A profile header with an avatar, and a small section header. */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <PageHeader
        title="Olivia Rhye"
        description="olivia@untitled.com"
        leading={<Avatar name="Olivia Rhye" src="assets/avatar-2.png" size="large" decorative />}
        actions={
          <Button variant="secondary" appearance="outline">
            Edit profile
          </Button>
        }
      />
      <PageHeader
        size="small"
        titleAs="h2"
        title="Recent orders"
        description="The last 30 days."
        actions={
          <div style={{ minInlineSize: 200 }}>
            <InputField
              label="Search orders"
              hideLabel
              size="small"
              iconStart={<Search />}
              placeholder="Search"
            />
          </div>
        }
        divider
      />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    title: 'المنتجات',
    description: 'إدارة الكتالوج والأسعار والمخزون.',
    actions: <Button>إضافة منتج</Button>,
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <PageHeader {...args} titleAs="h2" title={`${brand} ${mode}`} divider />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** The title is a heading at the chosen level. */
export const Heading: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 1, name: 'Products' })).toBeInTheDocument();
  },
};
