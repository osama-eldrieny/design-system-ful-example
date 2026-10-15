import { defineMeta } from '../meta';

export default defineMeta({
  id: 'settings-list',
  name: 'SettingsList',
  category: 'Data display',
  status: 'stable',
  since: '1.3.0',
  description:
    'A list of settings, each a title and optional description with a control at the end: a switch, a button or a select. Use it for account and security settings.',
  imports: [{ name: 'SettingsList', from: '@ds/react' }],
  whenToUse: [
    'For account, security and preference pages with several settings.',
    'When each setting has one control: on/off, or one action such as "Change".',
  ],
  whenNotToUse: [
    { text: 'For key–value details that are not editable.', alternative: 'DescriptionList' },
    { text: 'For a single on/off setting on its own.', alternative: 'Switch' },
    { text: 'For connecting apps.', alternative: 'IntegrationCard' },
  ],
  anatomy: [
    { name: 'Title', description: 'The setting, e.g. "Two-factor authentication".' },
    { name: 'Description', description: 'Current state or detail.', optional: true },
    { name: 'Control', description: 'A Switch, Button or Select at the end of the row.' },
  ],
  options: [
    {
      prop: 'framed',
      title: 'Frame',
      values: [
        { value: 'false', meaning: 'Default. Rows on the page, divided by lines.' },
        { value: 'true', meaning: 'Rows in a bordered card.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'Rows with their controls; each control has its own states.', trigger: '—' }],
  behavior: [
    { topic: 'Controls', text: 'Each control keeps its own behaviour: a Switch saves on change, a Button runs its action.' },
    { topic: 'Right-to-left', text: 'Text sits on the right and controls on the left in Arabic.' },
  ],
  content: [
    'Title each setting with the thing it controls, e.g. "Two-factor authentication".',
    'Show the current state in the description, e.g. "Last changed 3 months ago".',
  ],
  guidelines: [
    {
      do: 'Give every row one control.',
      dont: 'Put several controls in one row.',
      why: 'One control per row keeps the outcome of each setting clear.',
    },
    {
      do: 'Use a switch for settings that apply at once.',
      dont: 'Use a switch for settings that need a Save button.',
      why: 'A switch implies the change is already saved.',
    },
    {
      do: 'Describe the current state under the title.',
      dont: 'Hide the state until the control is opened.',
      why: 'People should see what is set before they change it.',
    },
  ],
  accessibility: {
    role: 'list of rows; each control keeps its own role and name.',
    keyboard: [{ keys: 'Tab', action: 'Moves through the controls in order.' }],
    aria: [{ attribute: 'aria-label', when: 'On switches without a visible name in the row.' }],
    focus: 'Each control shows its own focus ring.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'Rows are list items; the title is read before its control.' },
      { criterion: '2.4.6 Headings and Labels', how: 'Titles name each setting clearly.' },
    ],
    notes: ['Give each switch a name that matches its row title.'],
  },
  examples: [
    {
      id: 'security',
      title: 'Security settings',
      description: 'A switch, a button and a description.',
      code: `import { Button, SettingsList, Switch } from '@ds/react';

<SettingsList
  items={[
    { id: 'password', title: 'Password', description: 'Last changed 3 months ago.', control: <Button size="small" variant="secondary" appearance="outline">Change</Button> },
    { id: '2fa', title: 'Two-factor authentication', control: <Switch aria-label="Two-factor authentication" defaultChecked /> },
  ]}
/>`,
    },
    {
      id: 'framed',
      title: 'In a card',
      description: 'Framed as a settings card.',
      code: `import { SettingsList } from '@ds/react';

<SettingsList framed items={preferences} />`,
    },
    {
      id: 'toggles',
      title: 'Notification preferences',
      description: 'A list of switches.',
      code: `import { SettingsList, Switch } from '@ds/react';

<SettingsList items={channels.map((c) => ({ id: c.id, title: c.title, control: <Switch aria-label={c.title} checked={c.on} onCheckedChange={(v) => set(c.id, v)} /> }))} />`,
    },
  ],
  tokenPrefixes: ['--settings-list-'],
  related: [
    { id: 'switch', relation: 'The control for on/off settings.' },
    { id: 'description-list', relation: 'For details that are read, not changed.' },
  ],
  changelog: [{ version: '1.3.0', date: '2026-10-15', changes: ['New component.'] }],
});
