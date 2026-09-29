import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor } from 'storybook/test';
import { Button } from '../Button';
import { Checkbox, CheckboxGroup } from '../Checkbox';
import { ThemeProvider } from '../ThemeProvider';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from './Drawer';

const Filters = ({ side }: { side?: 'start' | 'end' | 'top' | 'bottom' }) => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button appearance="outline">{side ? `From ${side}` : 'Filters'}</Button>
    </DrawerTrigger>
    <DrawerContent side={side} title="Filters" description="Narrow down the product list.">
      <CheckboxGroup label="Category">
        <Checkbox value="audio" label="Audio" />
        <Checkbox value="wearables" label="Wearables" />
      </CheckboxGroup>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button>Show results</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

const meta = {
  title: 'Components/Overlays/Drawer',
  component: Drawer,
  tags: ['!autodocs'],
  parameters: { a11y: { test: 'error' } },
  render: () => <Filters />,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sides: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['start', 'end', 'top', 'bottom'] as const).map((side) => (
        <Filters key={side} side={side} />
      ))}
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <Drawer defaultOpen>
      <DrawerContent title="عوامل التصفية" closeLabel="إغلاق">
        المحتوى
      </DrawerContent>
    </Drawer>
  ),
};

/** Every theme, in the page flow (non-modal) so all six can be checked at once. */
export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Drawer defaultOpen modal={false}>
              <DrawerContent
                title={`${brand} ${mode}`}
                description="Description text."
                style={{ position: 'static', animation: 'none', marginBlock: 12 }}
              >
                Body
              </DrawerContent>
            </Drawer>
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** Opens named, traps focus, and closes on Escape back to the trigger. */
export const Focus: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Filters' });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('dialog', { name: 'Filters' });
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};
