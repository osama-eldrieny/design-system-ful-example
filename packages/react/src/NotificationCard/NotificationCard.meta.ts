import { defineMeta } from '../meta';

export default defineMeta({
  id: 'notification-card',
  name: 'NotificationCard',
  category: 'Feedback',
  status: 'stable',
  since: '1.3.0',
  description:
    'A single notice about something that happened, such as a reply or a system alert: who it is from or an icon, what it says, when, and the actions to take. Unread notices are tinted and marked with a dot.',
  imports: [{ name: 'NotificationCard', from: '@ds/react' }],
  whenToUse: [
    'In a notification list or feed, one card per event.',
    'For a notice with a clear next step, e.g. "Reply" or "View".',
  ],
  whenNotToUse: [
    { text: 'For a short confirmation after an action.', alternative: 'Toast' },
    { text: 'For a message in an ongoing conversation.', alternative: 'MessageThread' },
    { text: 'For a warning that stays on the page.', alternative: 'Alert' },
  ],
  anatomy: [
    { name: 'Avatar or icon', description: 'Who the notice is from, or the system icon.' },
    { name: 'Title', description: 'What happened, in a few words.' },
    { name: 'Time', description: 'When it happened.', optional: true },
    { name: 'Description', description: 'Optional detail.', optional: true },
    { name: 'Actions', description: 'Buttons such as Reply.', optional: true },
    { name: 'Dismiss', description: 'Closes the notice.', optional: true },
  ],
  options: [
    {
      prop: 'unread',
      title: 'Read state',
      values: [
        { value: 'false', meaning: 'Default. Already seen.' },
        { value: 'true', meaning: 'New: tinted, with a dot at the start.' },
      ],
    },
  ],
  states: [
    { name: 'Read', meaning: 'Seen; plain background.', trigger: 'unread is false.' },
    { name: 'Unread', meaning: 'New; tinted with a dot.', trigger: 'unread is true.' },
    { name: 'Focus', meaning: 'Focus rings on its actions.', trigger: ':focus-visible on a control.' },
  ],
  behavior: [
    { topic: 'Dismissing', text: 'Pressing the close button calls onDismiss; remove the card from the list in your handler.' },
    { topic: 'Right-to-left', text: 'The avatar and dismiss button swap sides in Arabic.' },
  ],
  content: [
    'Write the title as what happened: "Lana replied to your comment".',
    'Show the time in a short form, e.g. "2 min ago".',
  ],
  guidelines: [
    {
      do: 'Put the most important action first, as the primary button.',
      dont: 'Offer more than two actions.',
      why: 'One clear next step is easier to act on than a row of choices.',
    },
    {
      do: 'Mark notices as unread until they are seen.',
      dont: 'Tint every notice the same.',
      why: 'The mark tells people what is new since their last visit.',
    },
    {
      do: 'Use the avatar when a person is involved.',
      dont: 'Use the same generic icon for every notice.',
      why: 'A face makes a notice from a person easy to recognise.',
    },
  ],
  accessibility: {
    role: 'article, named by its title.',
    keyboard: [{ keys: 'Tab', action: 'Moves through the actions and the close button.' }],
    aria: [
      { attribute: 'aria-labelledby', when: 'Names the card by its title.' },
      { attribute: 'aria-label', when: 'On the close button, from dismissLabel.' },
    ],
    focus: 'Actions and the close button show their own focus rings.',
    wcag: [
      { criterion: '1.1.1 Non-text Content', how: 'Avatars are decorative beside a named title; icons are decorative.' },
      { criterion: '1.4.3 Contrast', how: 'Text passes AA on both the read and unread backgrounds.' },
      { criterion: '1.4.1 Use of Color', how: 'Unread state is also shown by the dot, not only by tint.' },
    ],
    notes: ['The unread dot is decorative; screen readers hear the title and time.'],
  },
  examples: [
    {
      id: 'reply',
      title: 'Reply',
      description: 'A person’s reply with two actions.',
      code: `import { Button, NotificationCard } from '@ds/react';

<NotificationCard
  unread
  avatar={{ name: 'Lana Steiner', status: 'online' }}
  title="Lana replied to your comment"
  description="I’ve finished adding my notes!"
  time="2 mins ago"
  actions={<><Button size="small" variant="secondary" appearance="outline">Dismiss</Button><Button size="small">Reply</Button></>}
/>`,
    },
    {
      id: 'system',
      title: 'System notice',
      description: 'An icon instead of an avatar, with a dismiss button.',
      code: `import { NotificationCard } from '@ds/react';
import { ShieldCheck } from 'lucide-react';

<NotificationCard icon={<ShieldCheck />} iconTone="success" title="Two-factor enabled" onDismiss={dismiss} />`,
    },
    {
      id: 'list',
      title: 'In a list',
      description: 'Cards stacked in a feed; the list is a plain list of articles.',
      code: `import { NotificationCard } from '@ds/react';

<div role="feed" aria-label="Notifications">
  {items.map((n) => <NotificationCard key={n.id} {...n} />)}
</div>`,
    },
  ],
  tokenPrefixes: ['--notification-card-'],
  related: [
    { id: 'toast', relation: 'For a brief confirmation that disappears.' },
    { id: 'activity-feed', relation: 'For a timeline of events.' },
  ],
  changelog: [{ version: '1.3.0', date: '2026-10-15', changes: ['New component.'] }],
});
