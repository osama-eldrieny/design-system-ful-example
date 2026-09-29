import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  subcomponents: { CheckboxGroup },
  tags: ['!autodocs'],
  args: { label: 'Email me product updates', size: 'medium', onCheckedChange: fn() },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Checkbox {...args} size="small" label="Small" defaultChecked />
      <Checkbox {...args} size="medium" label="Medium" defaultChecked />
      <Checkbox {...args} size="large" label="Large" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Hover" id="checkbox-hover" />
      <Checkbox label="Focus" id="checkbox-focus" />
      <Checkbox
        label="Error"
        description="Required to create an account."
        error="Accept the terms to continue."
      />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled and checked" disabled defaultChecked />
    </div>
  ),
  parameters: { pseudo: { hover: ['#checkbox-hover'], focusVisible: ['#checkbox-focus'] } },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      <CheckboxGroup
        label="Topics"
        description="Pick as many as you like."
        defaultValue={['design']}
      >
        <Checkbox value="design" label="Design" />
        <Checkbox value="engineering" label="Engineering" />
        <Checkbox value="research" label="Research" description="Studies and interviews" />
      </CheckboxGroup>
      <CheckboxGroup label="Days" orientation="horizontal" required error="Pick at least one day.">
        <Checkbox value="mon" label="Mon" />
        <Checkbox value="tue" label="Tue" />
        <Checkbox value="wed" label="Wed" />
      </CheckboxGroup>
    </div>
  ),
};

const rows = ['Invoice 1024', 'Invoice 1025', 'Invoice 1026'];

const SelectAllDemo = () => {
  const [selected, setSelected] = useState<string[]>([rows[0]]);
  const all = selected.length === rows.length;
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox
        label="Select all invoices"
        checked={all}
        indeterminate={selected.length > 0 && !all}
        onCheckedChange={(on) => setSelected(on ? rows : [])}
      />
      <CheckboxGroup label="Invoices" hideLabel value={selected} onValueChange={setSelected}>
        {rows.map((row) => (
          <Checkbox key={row} value={row} label={row} />
        ))}
      </CheckboxGroup>
    </div>
  );
};

export const SelectAll: Story = { render: () => <SelectAllDemo /> };

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <CheckboxGroup label="المواضيع" defaultValue={['design']}>
      <Checkbox value="design" label="التصميم" />
      <Checkbox value="engineering" label="الهندسة" />
    </CheckboxGroup>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <CheckboxGroup
              label={`${brand} ${mode}`}
              orientation="horizontal"
              defaultValue={['on']}
              error="Error message."
            >
              <Checkbox value="off" label="Off" />
              <Checkbox value="on" label="On" />
              <Checkbox value="mixed" label="Mixed" indeterminate />
              <Checkbox value="disabled" label="Disabled" disabled />
            </CheckboxGroup>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Clicking the label toggles; the group reports its values; select-all is “mixed”. */
export const Interaction: Story = {
  tags: ['test'],
  render: () => <SelectAllDemo />,
  play: async ({ canvas }) => {
    const all = canvas.getByRole('checkbox', { name: 'Select all invoices' });
    await expect(all).toHaveProperty('indeterminate', true);
    await userEvent.click(canvas.getByText('Invoice 1025'));
    await userEvent.click(canvas.getByText('Invoice 1026'));
    await expect(all).toBeChecked();
    await expect(all).toHaveProperty('indeterminate', false);
    await userEvent.click(all);
    for (const row of rows) {
      await expect(canvas.getByRole('checkbox', { name: row })).not.toBeChecked();
    }
    await expect(canvas.getByRole('group', { name: 'Invoices' })).toBeInTheDocument();
  },
};
