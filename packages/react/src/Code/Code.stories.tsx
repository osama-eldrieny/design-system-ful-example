import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import { Code } from './Code';
import { ThemeProvider } from '../ThemeProvider';

const meta = {
  title: 'Components/Data display/Code',
  component: Code,
  tags: ['!autodocs'],
  args: { children: 'npm install @ds/react' },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Block: Story = {
  args: {
    block: true,
    language: 'tsx',
    children: `import { Button } from '@ds/react';\n\nexport const Save = () => <Button onClick={save}>Save changes</Button>;`,
  },
  decorators: [(Story) => <div style={{ maxInlineSize: 480 }}>{Story()}</div>],
};

export const Inline: Story = {
  render: () => (
    <p
      style={{ fontFamily: 'var(--font-family-body)', color: 'var(--color-fg-on-surface-primary)' }}
    >
      Run <Code>npm install</Code>, then open <Code>src/App.tsx</Code>.
    </p>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: { block: true, language: 'bash' },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Code block language="bash">{`npm run build # ${brand} ${mode}`}</Code>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** The copy button copies and announces it. */
export const Copy: Story = {
  tags: ['test'],
  args: { block: true, language: 'bash' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('group', { name: 'bash code' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Copy code' }));
    await waitFor(() => expect(canvas.getByRole('status')).toHaveTextContent(/Copied|^$/));
  },
};
