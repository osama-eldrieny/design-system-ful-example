import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Hash } from 'lucide-react';
import { expect, fn, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Tag, type TagTone } from './Tag';

const TONES: TagTone[] = ['secondary', 'primary', 'success', 'warning', 'danger'];
const row = { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' } as const;

const meta = {
  title: 'Components/Feedback/Tag',
  component: Tag,
  tags: ['!autodocs'],
  args: { children: 'Design', tone: 'secondary', appearance: 'subtle' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['subtle', 'solid'] as const).map((appearance) => (
        <div key={appearance} style={row}>
          {TONES.map((tone) => (
            <Tag key={tone} tone={tone} appearance={appearance} icon={<Hash />}>
              {tone}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  ),
};

const RemovableDemo = () => {
  const [tags, setTags] = useState(['Design', 'React', 'Accessibility']);
  return (
    <div style={row}>
      {tags.map((t) => (
        <Tag key={t} onRemove={() => setTags((all) => all.filter((x) => x !== t))}>
          {t}
        </Tag>
      ))}
    </div>
  );
};

export const Removable: Story = { render: () => <RemovableDemo /> };

const ChipsDemo = () => {
  const [on, setOn] = useState<Record<string, boolean>>({ 'On sale': true });
  return (
    <div style={row}>
      {['On sale', 'In stock', 'Free delivery'].map((t) => (
        <Tag key={t} selected={!!on[t]} onSelectedChange={(v) => setOn((s) => ({ ...s, [t]: v }))}>
          {t}
        </Tag>
      ))}
    </div>
  );
};

export const Selectable: Story = { render: () => <ChipsDemo /> };

export const States: Story = {
  render: () => (
    <div style={row}>
      <Tag onRemove={fn()}>Default</Tag>
      <Tag selected onSelectedChange={fn()}>
        Pressed
      </Tag>
      <Tag onRemove={fn()} disabled>
        Disabled
      </Tag>
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <Tag onRemove={fn()} removeLabel="إزالة التصميم">
      التصميم
    </Tag>
  ),
};

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
                  <Tag key={tone + appearance} tone={tone} appearance={appearance}>
                    {`${tone} ${appearance}`}
                  </Tag>
                )),
              )}
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Remove buttons are named per tag; chips toggle aria-pressed. */
export const Interaction: Story = {
  tags: ['test'],
  render: () => (
    <>
      <RemovableDemo />
      <ChipsDemo />
    </>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Remove React' }));
    await expect(canvas.queryByText('React')).toBeNull();
    const chip = canvas.getByRole('button', { name: 'In stock' });
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
  },
};
