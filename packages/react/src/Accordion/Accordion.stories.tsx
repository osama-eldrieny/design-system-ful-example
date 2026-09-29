import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Accordion, AccordionItem } from './Accordion';

const Faq = (props: { type?: 'single' | 'multiple'; prefix?: string }) =>
  props.type === 'multiple' ? (
    <Accordion type="multiple" defaultValue={['shipping']} style={{ maxInlineSize: 520 }}>
      <Items prefix={props.prefix} />
    </Accordion>
  ) : (
    <Accordion type="single" collapsible defaultValue="shipping" style={{ maxInlineSize: 520 }}>
      <Items prefix={props.prefix} />
    </Accordion>
  );

const Items = ({ prefix = '' }: { prefix?: string }) => (
  <>
    <AccordionItem value="shipping" title={`${prefix}How long does shipping take?`}>
      Orders arrive in 3–5 working days. Express delivery arrives the next working day.
    </AccordionItem>
    <AccordionItem value="returns" title={`${prefix}Can I return an item?`}>
      Yes, within 30 days, in its original packaging.
    </AccordionItem>
    <AccordionItem value="warranty" title={`${prefix}Is there a warranty?`} disabled>
      Two years on all electronics.
    </AccordionItem>
  </>
);

const meta = {
  title: 'Components/Data display/Accordion',
  component: Accordion,
  tags: ['!autodocs'],
  args: { type: 'single' },
  parameters: { a11y: { test: 'error' } },
  render: () => <Faq />,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Faq />
      <Faq type="multiple" prefix="Several open: " />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <Accordion type="single" collapsible defaultValue="a" style={{ maxInlineSize: 520 }}>
      <AccordionItem value="a" title="كم يستغرق الشحن؟">
        من 3 إلى 5 أيام عمل.
      </AccordionItem>
    </Accordion>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Faq prefix={`${brand} ${mode}: `} />
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Headings contain buttons that toggle their sections. */
export const Toggle: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    const returns = canvas.getByRole('button', { name: 'Can I return an item?' });
    await expect(
      canvas.getByRole('heading', { level: 3, name: 'Can I return an item?' }),
    ).toContainElement(returns);
    await expect(returns).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(returns);
    await expect(returns).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText(/within 30 days/)).toBeVisible();
  },
};
