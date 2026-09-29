import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Avatar, AvatarGroup, type AvatarSize, type AvatarStatus } from './Avatar';

const PHOTO = 'assets/avatar-2.png';
const SIZES: AvatarSize[] = ['small', 'medium', 'large', 'xlarge'];
const STATUSES: AvatarStatus[] = ['online', 'away', 'busy', 'offline'];
const PEOPLE = [
  { name: 'Osama Eldrieny', src: 'assets/avatar-1.png' },
  { name: 'Sarah Chen', src: 'assets/avatar-2.png' },
  { name: 'Maria Garcia', src: 'assets/avatar-3.png' },
  { name: 'James Wilson', src: 'assets/avatar-4.png' },
  { name: 'Lina Haddad' },
  { name: 'Omar Saleh' },
];

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>{children}</div>
);

const meta = {
  title: 'Components/Data display/Avatar',
  component: Avatar,
  subcomponents: { AvatarGroup },
  tags: ['!autodocs'],
  args: { name: 'Sarah Chen', src: PHOTO, size: 'large', decorative: false },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Row>
      {SIZES.map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </Row>
  ),
};

export const Fallbacks: Story = {
  render: (args) => (
    <Row>
      <Avatar {...args} />
      <Avatar {...args} src={undefined} />
      <Avatar {...args} src="missing.png" name="Broken Image" />
      <Avatar {...args} src={undefined} name="?" />
    </Row>
  ),
};

export const Status: Story = {
  render: (args) => (
    <Row>
      {STATUSES.map((status) => (
        <Avatar key={status} {...args} status={status} />
      ))}
    </Row>
  ),
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <AvatarGroup label="Meeting attendees" max={3}>
        {PEOPLE.map((p) => (
          <Avatar key={p.name} {...p} />
        ))}
      </AvatarGroup>
      <AvatarGroup label="Project members" size="medium">
        {PEOPLE.slice(0, 4).map((p) => (
          <Avatar key={p.name} {...p} />
        ))}
      </AvatarGroup>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <Row>
      <Avatar {...args} />
      <Avatar {...args} src={undefined} />
      <Avatar {...args} src={undefined} name="" />
    </Row>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <Row>
      <Avatar name="سارة خان" status="online" size="large" />
      <AvatarGroup label="الحضور" max={3}>
        {PEOPLE.map((p) => (
          <Avatar key={p.name} {...p} />
        ))}
      </AvatarGroup>
    </Row>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Row>
              {SIZES.map((size) => (
                <Avatar key={size} name={`${brand} ${mode}`} size={size} status="online" />
              ))}
              <AvatarGroup label={`${brand} ${mode} group`} max={2}>
                {PEOPLE.map((p) => (
                  <Avatar key={p.name} {...p} />
                ))}
              </AvatarGroup>
            </Row>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Names, status and the group count are announced. */
export const AccessibleNames: Story = {
  tags: ['test'],
  render: () => (
    <Row>
      <Avatar name="Sarah Chen" status="busy" />
      <AvatarGroup label="Attendees" max={2}>
        {PEOPLE.map((p) => (
          <Avatar key={p.name} {...p} />
        ))}
      </AvatarGroup>
    </Row>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'Sarah Chen, Busy' })).toBeInTheDocument();
    await expect(canvas.getByRole('group', { name: 'Attendees' })).toBeInTheDocument();
    await expect(canvas.getByRole('img', { name: 'and 4 more' })).toBeInTheDocument();
  },
};
