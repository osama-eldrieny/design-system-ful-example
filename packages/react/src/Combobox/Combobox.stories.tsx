import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState, type ComponentType } from 'react';
import { expect, fn, userEvent, waitFor } from 'storybook/test';
import { ThemeProvider } from '../ThemeProvider';
import { Combobox, type ComboboxOption, type ComboboxSingleProps } from './Combobox';

// Stories use the single-value props; Multiple renders its own.
const SingleCombobox = Combobox as ComponentType<ComboboxSingleProps>;

const countries: ComboboxOption[] = [
  'Algeria',
  'Argentina',
  'Australia',
  'Austria',
  'Belgium',
  'Brazil',
  'Canada',
  'Egypt',
  'France',
  'Germany',
  'India',
  'Italy',
  'Japan',
  'Jordan',
  'Morocco',
  'Netherlands',
  'Saudi Arabia',
  'Spain',
  'Sweden',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
].map((name) => ({ value: name.toLowerCase().replace(/\s+/g, '-'), label: name }));

const skills: ComboboxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'css', label: 'CSS' },
  { value: 'figma', label: 'Figma' },
  { value: 'a11y', label: 'Accessibility' },
  { value: 'cobol', label: 'COBOL (retired)', disabled: true },
];

const meta = {
  title: 'Components/Forms/Combobox',
  component: SingleCombobox,
  tags: ['!autodocs'],
  args: {
    label: 'Country',
    placeholder: 'Type a country',
    options: countries,
    description: 'Where you live now.',
    onValueChange: fn(),
  },
  argTypes: { options: { control: false } },
  parameters: { a11y: { test: 'error' } },
  decorators: [(Story) => <div style={{ maxInlineSize: 360, minBlockSize: 320 }}>{Story()}</div>],
} satisfies Meta<typeof SingleCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Multiple: Story = {
  render: () => (
    <Combobox
      multiple
      label="Skills"
      placeholder="Add a skill"
      options={skills}
      defaultValue={['react', 'css']}
    />
  ),
};

const AsyncDemo = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ComboboxOption[]>(countries);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(countries.filter((c) => c.label.toLowerCase().startsWith(query.toLowerCase())));
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);
  return (
    <Combobox
      label="Country (server search)"
      placeholder="Starts with…"
      options={results}
      filter={false}
      inputValue={query}
      onInputChange={(next) => {
        setQuery(next);
        setLoading(true);
      }}
      loading={loading}
    />
  );
};

export const Async: Story = { render: () => <AsyncDemo /> };

export const States: Story = {
  decorators: [(Story) => <div style={{ minBlockSize: 0 }}>{Story()}</div>],
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Combobox {...args} label="Selected" defaultValue="egypt" />
      <Combobox {...args} label="Error" required error="Choose your country." />
      <Combobox {...args} label="Disabled" disabled defaultValue="egypt" />
    </div>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  args: {
    label: 'الدولة',
    placeholder: 'اكتب اسم الدولة',
    description: undefined,
    options: [
      { value: 'eg', label: 'مصر' },
      { value: 'jo', label: 'الأردن' },
      { value: 'sa', label: 'السعودية' },
    ],
  },
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  decorators: [(Story) => <div style={{ display: 'grid', gap: 12 }}>{Story()}</div>],
  render: () => (
    <>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Combobox
              multiple
              label={`${brand} ${mode}`}
              options={skills}
              defaultValue={['react']}
              error="Error message."
            />
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** Type to filter, pick with the keyboard; the value is reported. */
export const Filtering: Story = {
  tags: ['test'],
  play: async ({ args, canvas }) => {
    const input = canvas.getByRole('combobox', { name: 'Country' });
    await expect(input).toHaveAccessibleDescription('Where you live now.');
    await userEvent.type(input, 'uni');
    const listbox = canvas.getByRole('listbox', { name: 'Country' });
    await waitFor(() => expect(canvas.getAllByRole('option')).toHaveLength(3));
    await expect(canvas.getByRole('status')).toHaveTextContent('3 results');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(input).toHaveValue('United Arab Emirates');
    await expect(args.onValueChange).toHaveBeenCalledWith('united-arab-emirates');
    await expect(listbox).not.toBeVisible();
  },
};

/** Chips are added and removed; disabled options can't be picked. */
export const Chips: Story = {
  tags: ['test'],
  render: () => <Combobox multiple label="Skills" options={skills} defaultValue={['react']} />,
  play: async ({ canvas }) => {
    const input = canvas.getByRole('combobox', { name: 'Skills' });
    await userEvent.type(input, 'type');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(canvas.getByRole('button', { name: 'Remove TypeScript' })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Remove React' }));
    await expect(canvas.queryByRole('button', { name: 'Remove React' })).toBeNull();
  },
};
