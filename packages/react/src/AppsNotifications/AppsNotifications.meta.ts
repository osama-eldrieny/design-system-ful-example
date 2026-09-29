import { defineMeta } from '../meta';

export default defineMeta({
  id: 'apps-notifications',
  name: 'AppsNotifications',
  category: 'Patterns',
  status: 'stable',
  since: '0.2.0',
  description:
    'A settings panel with one switch per app, to turn each app’s notifications on or off. Changes apply immediately. It is built from Card and Switch.',
  imports: [{ name: 'AppsNotifications', from: '@ds/react' }],
  whenToUse: [
    'In settings and sidebars, to turn notifications (or any per-app feature) on and off.',
    'When each change should apply right away, without a Save button.',
  ],
  whenNotToUse: [
    { text: 'When changes are applied with a Save button.', alternative: 'Checkbox in a form' },
    {
      text: 'For a list of the notifications themselves.',
      alternative: 'A list of Alerts or a notification feed',
    },
  ],
  anatomy: [
    { name: 'Panel', description: 'A Card, named by its heading.' },
    { name: 'Heading', description: 'Says what the switches control.' },
    { name: 'App row', description: 'Icon and name; the name labels the switch.' },
    { name: 'Switch', description: 'On or off for that app.' },
  ],
  options: [
    {
      prop: 'appearance',
      title: 'Appearance (from Card)',
      values: [
        { value: 'elevated', meaning: 'Default; a standalone panel.' },
        { value: 'outlined', meaning: 'Inside sidebars or other panels.' },
        { value: 'filled', meaning: 'Grouped inside a surface.' },
      ],
    },
  ],
  states: [
    { name: 'On / off', meaning: 'Each app’s switch.', trigger: 'enabled or defaultEnabled' },
    {
      name: 'Disabled',
      meaning: 'An app’s setting can’t be changed.',
      trigger: 'disabled on the item',
    },
  ],
  behavior: [
    {
      topic: 'Immediate',
      text: 'Each switch applies at once and calls onEnabledChange(id, enabled). Show an Alert if saving fails and switch it back.',
    },
    {
      topic: 'Controlled or not',
      text: 'Pass enabled per item to control it; otherwise defaultEnabled (default on) sets the starting state.',
    },
    { topic: 'Click target', text: 'Clicking the app name or icon also toggles the switch.' },
  ],
  content: [
    'Heading: what the switches control, e.g. “Email notifications”.',
    'Use the app’s own name and spelling.',
  ],
  guidelines: [
    {
      do: 'Apply each change immediately.',
      dont: 'Add a Save button under the switches.',
      why: 'Switches promise an instant effect; use checkboxes when changes are saved later.',
    },
    {
      do: 'Write a heading that says what is being switched.',
      dont: 'Use a vague heading like “Apps”.',
      why: 'The heading names the panel for screen readers and says what “on” means.',
    },
    {
      do: 'Handle failures by switching back and explaining.',
      dont: 'Leave a switch on when the change didn’t save.',
      why: 'The switch must reflect the real setting.',
    },
  ],
  accessibility: {
    role: 'region (section named by its heading) containing a list of switches.',
    keyboard: [
      { keys: 'Tab', action: 'Moves between switches.' },
      { keys: 'Space', action: 'Toggles the focused switch.' },
    ],
    aria: [
      { attribute: 'aria-labelledby on the panel', when: 'Set automatically to the heading.' },
      { attribute: 'role="switch" + aria-checked', when: 'From Switch; named by the app name.' },
    ],
    focus: 'Each switch shows its focus ring.',
    wcag: [
      { criterion: '4.1.2 Name, Role, Value', how: 'Real switches with the app name as label.' },
      { criterion: '2.1.1 Keyboard', how: 'Tab and Space operate every switch.' },
      {
        criterion: '1.1.1 Non-text Content',
        how: 'App icons are decorative (alt="") because the name is next to them.',
      },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Notification settings',
      description: 'Uncontrolled: all apps start on.',
      code: `import { AppsNotifications } from '@ds/react';

<AppsNotifications
  title="Notifications"
  items={[
    { id: 'google', name: 'Google', icon: '/icons/google.png' },
    { id: 'linkedin', name: 'LinkedIn', icon: '/icons/linkedin.png' },
    { id: 'behance', name: 'Behance', icon: '/icons/behance.png', defaultEnabled: false },
  ]}
  onEnabledChange={(id, enabled) => saveSetting(id, enabled)}
/>`,
    },
    {
      id: 'controlled',
      title: 'Controlled',
      description: 'Keep the settings in state.',
      code: `import { useState } from 'react';
import { AppsNotifications } from '@ds/react';

const [on, setOn] = useState({ slack: true, github: false });

<AppsNotifications
  title="Email notifications"
  items={[
    { id: 'slack', name: 'Slack', enabled: on.slack },
    { id: 'github', name: 'GitHub', enabled: on.github },
  ]}
  onEnabledChange={(id, enabled) => setOn((s) => ({ ...s, [id]: enabled }))}
/>`,
    },
    {
      id: 'sidebar',
      title: 'In a sidebar',
      description: 'Outlined, with a heading level that fits the page.',
      code: `import { AppsNotifications } from '@ds/react';

<AppsNotifications appearance="outlined" title="Connected apps" titleAs="h2" items={apps} />`,
    },
  ],
  tokenPrefixes: ['--app-notifications-'],
  related: [
    { id: 'switch', relation: 'Each row’s control.' },
    { id: 'card', relation: 'The panel.' },
  ],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Rebuilt from Card and Switch: real switches named by the app, keyboard support, a named panel.',
        'Items use name/icon/enabled/defaultEnabled; onEnabledChange(id, enabled) replaces per-item onChange.',
        'NotificationListItem is now the row of this pattern. The --toggle-* tokens were removed (use Switch).',
      ],
    },
  ],
});
