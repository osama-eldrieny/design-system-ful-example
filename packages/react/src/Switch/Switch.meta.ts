import { defineMeta } from '../meta';

export default defineMeta({
  id: 'switch',
  name: 'Switch',
  category: 'Forms',
  status: 'stable',
  since: '0.2.0',
  description:
    'A switch turns a single setting on or off and applies the change immediately, like a light switch. It replaces the earlier Toggle with a real, labelled switch control.',
  imports: [{ name: 'Switch', from: '@ds/react' }],
  whenToUse: [
    'To turn a setting on or off that takes effect right away, e.g. "Email notifications".',
    'In settings lists where each row controls one independent option.',
  ],
  whenNotToUse: [
    {
      text: 'When the change only applies after pressing Save or Submit.',
      alternative: 'Checkbox',
    },
    { text: 'To choose one option from several.', alternative: 'RadioGroup' },
    { text: 'To trigger an action such as "Refresh".', alternative: 'Button' },
  ],
  anatomy: [
    {
      name: 'Track',
      description: 'The pill-shaped control; its color shows on (brand) or off (neutral).',
    },
    { name: 'Thumb', description: 'Slides to the end when on, to the start when off.' },
    {
      name: 'Label',
      description: 'Says what the switch controls; clicking it toggles the switch.',
    },
    { name: 'Description', description: 'Optional detail under the label.', optional: true },
  ],
  options: [
    {
      prop: 'labelPosition',
      title: 'Label position',
      values: [
        { value: 'end', meaning: 'Label after the switch. Default for standalone switches.' },
        {
          value: 'start',
          meaning: 'Label before the switch, aligned edge to edge in settings lists.',
        },
      ],
    },
  ],
  states: [
    { name: 'Off', meaning: 'The setting is off.', trigger: 'checked is false.' },
    { name: 'On', meaning: 'The setting is on.', trigger: 'checked is true.' },
    { name: 'Hover', meaning: 'Shows the switch responds to the pointer.', trigger: ':hover.' },
    {
      name: 'Focus',
      meaning: 'Shows keyboard focus.',
      trigger: ':focus-visible; adds the focus ring.',
    },
    {
      name: 'Disabled',
      meaning: 'The setting cannot be changed right now.',
      trigger: 'disabled prop.',
    },
  ],
  behavior: [
    {
      topic: 'Immediate effect',
      text: 'Changing a switch applies the setting at once; don’t pair switches with a Save button.',
    },
    {
      topic: 'Controlled or not',
      text: 'Pass checked and onCheckedChange to control it, or defaultChecked to let it manage its own state.',
    },
    { topic: 'Forms', text: 'With a name, it submits its value in native forms like a checkbox.' },
    {
      topic: 'Right-to-left',
      text: 'The thumb slides toward the start in Arabic, so "on" is always toward the end of the reading direction.',
    },
  ],
  content: [
    'Label the setting, not the action: "Email notifications", not "Turn on email notifications".',
    'Keep labels short and in sentence case.',
    'Don’t put on/off state words in the label; the switch shows the state.',
  ],
  guidelines: [
    {
      do: 'Use a switch for settings that apply immediately.',
      dont: 'Use a switch inside a form that is applied with a Save button.',
      why: 'People expect a switch to take effect at once; a delayed change is surprising.',
    },
    {
      do: 'Give every switch a visible label.',
      dont: 'Rely on surrounding text without connecting it to the switch.',
      why: 'The label is the accessible name, and clicking it should toggle the switch.',
    },
    {
      do: 'Label the setting positively, e.g. "Show preview".',
      dont: 'Use negative labels such as "Hide preview".',
      why: 'On should mean the thing is on; double negatives are hard to read.',
    },
  ],
  accessibility: {
    role: 'switch (a <button role="switch"> with aria-checked).',
    keyboard: [
      { keys: 'Tab / Shift+Tab', action: 'Moves focus to and from the switch.' },
      { keys: 'Space', action: 'Toggles the switch.' },
      { keys: 'Enter', action: 'Toggles the switch.' },
    ],
    aria: [
      { attribute: 'aria-checked', when: 'Set automatically from the on/off state.' },
      { attribute: 'aria-describedby', when: 'Points at the description when there is one.' },
      { attribute: 'aria-label', when: 'Required when there is no visible label.' },
    ],
    focus: 'A focus ring appears on the track when reached with the keyboard.',
    wcag: [
      {
        criterion: '1.3.1 Info and Relationships',
        how: 'The label is a real <label> tied to the switch; the description is linked with aria-describedby.',
      },
      {
        criterion: '1.4.11 Non-text Contrast',
        how: 'Track and thumb colors keep 3:1 against their surroundings.',
      },
      { criterion: '2.1.1 Keyboard', how: 'Focusable and toggled with Space or Enter.' },
      {
        criterion: '4.1.2 Name, Role, Value',
        how: 'Exposed as a switch with its label as the name and on/off as its value.',
      },
    ],
    notes: ['State is shown by position and color, never by color alone.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Setting switch',
      description: 'A controlled switch with a label.',
      code: `import { Switch } from '@ds/react';

<Switch label="Email notifications" checked={enabled} onCheckedChange={setEnabled} />`,
    },
    {
      id: 'description',
      title: 'With a description',
      description: 'Extra detail is announced as the switch’s description.',
      code: `import { Switch } from '@ds/react';

<Switch
  label="Real-time updates"
  description="Refreshes the dashboard every 30 seconds."
  defaultChecked
/>`,
    },
    {
      id: 'settings-list',
      title: 'Settings list',
      description: 'Labels at the start, switches aligned at the end.',
      code: `import { Switch } from '@ds/react';

<div style={{ display: 'grid', gap: 12 }}>
  <Switch label="KPI cards" labelPosition="start" defaultChecked />
  <Switch label="Data charts" labelPosition="start" defaultChecked />
</div>`,
    },
  ],
  tokenPrefixes: ['--switch-'],
  related: [
    { id: 'checkbox', relation: 'Use when the choice is applied with a Save button.' },
    { id: 'radio-group', relation: 'Use to pick one option from several.' },
  ],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Replaces Toggle: a real switch (role="switch") with a label, description and keyboard support.',
        'isActive/onChange became checked/onCheckedChange; RTL support.',
      ],
    },
  ],
});
