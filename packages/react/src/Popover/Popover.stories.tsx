import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const meta = {
  title: 'Components/Overlays/Popover',
  component: Popover,
  tags: ['!autodocs'],
  parameters: { a11y: { test: 'error' } },
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button appearance="outline">Shipping</Button>
      </PopoverTrigger>
      <PopoverContent title="Shipping">Free delivery on orders over $50.</PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sides: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, padding: 80, justifyContent: 'center' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button appearance="outline">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side} showClose={false} aria-label={`Placed ${side}`}>
            Placed {side}.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button appearance="outline">الشحن</Button>
      </PopoverTrigger>
      <PopoverContent title="الشحن" closeLabel="إغلاق">
        توصيل مجاني للطلبات فوق 50 دولارًا.
      </PopoverContent>
    </Popover>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 96 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Popover defaultOpen modal={false}>
              <PopoverTrigger asChild>
                <Button appearance="outline">{`${brand} ${mode}`}</Button>
              </PopoverTrigger>
              <PopoverContent side="right" title={`${brand} ${mode}`}>
                Content.
              </PopoverContent>
            </Popover>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Opens from its button, moves focus in, and returns it on Escape. */
export const Focus: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Shipping' });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const dialog = await screen.findByRole('dialog');
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};
