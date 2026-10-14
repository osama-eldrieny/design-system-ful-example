import { defineMeta } from '../meta';

export default defineMeta({
  id: 'activity-feed',
  name: 'ActivityFeed',
  category: 'Data display',
  status: 'stable',
  since: '1.1.0',
  description:
    'A list of recent events, newest first: who did what and when, with an avatar or icon, optional content such as a comment or file, and an unread dot. As a timeline, a divided list or plain.',
  imports: [{ name: 'ActivityFeed', from: '@ds/react' }],
  whenToUse: [
    'Recent activity on a dashboard or a record’s detail page.',
    'Notification lists and audit trails.',
  ],
  whenNotToUse: [
    { text: 'For steps of a process.', alternative: 'Stepper' },
    { text: 'For data people sort and filter.', alternative: 'Table' },
  ],
  anatomy: [
    { name: 'Marker', description: 'Avatar or featured icon.', optional: true },
    { name: 'Title', description: 'What happened, names in bold.' },
    { name: 'Time', description: 'When.', optional: true },
    { name: 'Content', description: 'A comment, file or link in a box.', optional: true },
    { name: 'Unread dot', description: 'Marks new items.', optional: true },
    { name: 'Connector', description: 'Line joining markers (connected).', optional: true },
  ],
  options: [
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        { value: 'connected', meaning: 'A timeline line between markers. Default.' },
        { value: 'divided', meaning: 'A line between items, for notification lists.' },
        { value: 'plain', meaning: 'Neither, for compact cards.' },
      ],
    },
  ],
  states: [
    { name: 'Read', meaning: 'Seen.', trigger: 'Default.' },
    { name: 'Unread', meaning: 'New since the last visit.', trigger: 'item.unread' },
  ],
  behavior: [
    { topic: 'Order', text: 'Pass items newest first; the list is ordered as given.' },
    { topic: 'Right-to-left', text: 'Markers and the connector move to the right.' },
  ],
  content: [
    'Lead with the actor in bold, then the action: "Olivia Rhye uploaded 2 files".',
    'Use relative times for recent events ("2 hours ago") and dates for older ones.',
  ],
  guidelines: [
    {
      do: 'Bold names and objects with <strong>.',
      dont: 'Bold the whole sentence.',
      why: 'People scan for who and what.',
    },
    {
      do: 'Show the most recent 5–10 events with a link to the rest.',
      dont: 'Render hundreds of events on a dashboard.',
      why: 'Feeds are for recent context, not history.',
    },
    {
      do: 'Use an icon for system events.',
      dont: 'Invent avatars for automated actions.',
      why: 'An avatar implies a person did it.',
    },
  ],
  accessibility: {
    role: 'Ordered list (ol) of list items.',
    keyboard: [{ keys: 'Tab', action: 'Moves to links and buttons inside items.' }],
    aria: [
      {
        attribute: 'Hidden "Unread:" prefix',
        when: 'On unread items; translate with unreadLabel.',
      },
      { attribute: 'aria-hidden on avatars and icons', when: 'The title names the actor.' },
    ],
    focus: 'Only interactive content inside items is focusable.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'A real ordered list.' },
      { criterion: '1.4.1 Use of Color', how: 'Unread is also announced in words.' },
    ],
    notes: ['Give the list an aria-label when there are several feeds on a page.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Recent activity',
      description: 'Avatars, times and a comment.',
      code: `import { ActivityFeed } from '@ds/react';\n\n<ActivityFeed\n  aria-label="Recent activity"\n  items={[{ id: 1, avatar: { name: 'Olivia Rhye' }, title: <><strong>Olivia Rhye</strong> commented</>, time: '2 min ago', content: 'Looks great!' }]}\n/>`,
    },
    {
      id: 'icon',
      title: 'System event',
      description: 'An icon instead of an avatar.',
      code: `import { ActivityFeed } from '@ds/react';\nimport { Upload } from 'lucide-react';\n\n<ActivityFeed items={[{ id: 1, icon: <Upload />, title: 'Export finished', time: 'Mon' }]} />`,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Divided, with unread items.',
      code: `import { ActivityFeed } from '@ds/react';\n\n<ActivityFeed appearance="divided" items={notifications} />`,
    },
  ],
  tokenPrefixes: ['--activity-feed-'],
  related: [
    { id: 'avatar', relation: 'The marker for people.' },
    { id: 'featured-icon', relation: 'The marker for system events.' },
  ],
  changelog: [{ version: '1.1.0', date: '2026-10-15', changes: ['New component.'] }],
});
