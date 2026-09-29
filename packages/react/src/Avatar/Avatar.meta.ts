import { defineMeta } from '../meta';

export default defineMeta({
  id: 'avatar',
  name: 'Avatar',
  category: 'Data display',
  status: 'stable',
  since: '0.2.0',
  description:
    'An avatar represents a person or team with their photo, or their initials when there’s no photo. It can show presence, and AvatarGroup stacks several with a count of the rest.',
  imports: [
    { name: 'Avatar', from: '@ds/react' },
    { name: 'AvatarGroup', from: '@ds/react' },
  ],
  whenToUse: [
    'Next to a person’s name in lists, comments, cards and headers.',
    'To show who is involved in something, e.g. meeting attendees (AvatarGroup).',
    'To show someone’s presence (online, away, busy) at a glance.',
  ],
  whenNotToUse: [
    { text: 'For product or brand images.', alternative: 'An image or Logo' },
    {
      text: 'As the only way to identify a person where names matter.',
      alternative: 'Avatar with the name as text',
    },
  ],
  anatomy: [
    { name: 'Frame', description: 'Holds the image; corners follow the radius theme.' },
    {
      name: 'Image or initials',
      description: 'The photo, or up to two initials when there is none or it fails to load.',
    },
    {
      name: 'Status dot',
      description: 'Optional presence indicator with a ring separating it from the photo.',
      optional: true,
    },
  ],
  options: [
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: '24px. Dense lists, table rows, stacked groups.' },
        { value: 'medium', meaning: '38px. Default for lists and cards.' },
        { value: 'large', meaning: '56px. Comments, contact cards.' },
        { value: 'xlarge', meaning: '80px. Profile headers.' },
      ],
    },
    {
      prop: 'status',
      title: 'Status',
      values: [
        { value: 'online', meaning: 'Available now.' },
        { value: 'away', meaning: 'Idle or temporarily away.' },
        { value: 'busy', meaning: 'Do not disturb.' },
        { value: 'offline', meaning: 'Not available.' },
      ],
    },
  ],
  states: [
    { name: 'Image', meaning: 'The photo is shown.', trigger: 'src loads.' },
    {
      name: 'Initials',
      meaning: 'No photo available.',
      trigger: 'No src, or the image fails to load.',
    },
    { name: 'Icon', meaning: 'No photo and no initials.', trigger: 'The name has no letters.' },
  ],
  behavior: [
    {
      topic: 'Fallback',
      text: 'If the image fails to load, the avatar switches to initials automatically.',
    },
    {
      topic: 'Accessible name',
      text: 'The name (and status) is announced. Set decorative when the name is already shown as text next to it.',
    },
    {
      topic: 'Groups',
      text: 'AvatarGroup shows up to max avatars, then “+N”, announced as “and N more”.',
    },
    { topic: 'Right-to-left', text: 'The status dot and overlap follow the reading direction.' },
  ],
  content: [
    'Pass the full name; initials are derived from the first two words.',
    'Label groups with what they represent: “Meeting attendees”, “Project members”.',
  ],
  guidelines: [
    {
      do: 'Show the person’s name next to the avatar where it matters.',
      dont: 'Rely on the photo alone to identify someone.',
      why: 'Faces are hard to tell apart at small sizes, and missing photos fall back to initials.',
    },
    {
      do: 'Mark the avatar decorative when the name is right next to it.',
      dont: 'Let screen readers read the same name twice.',
      why: 'Repetition makes lists slow to navigate.',
    },
    {
      do: 'Limit groups with max and show the count.',
      dont: 'Stack a dozen tiny avatars.',
      why: 'A few faces plus “+8” is easier to read than a crowded row.',
    },
  ],
  accessibility: {
    role: 'img with an aria-label (the name and status), or hidden when decorative.',
    keyboard: [
      {
        keys: '—',
        action: 'Not interactive. Wrap it in a link or button if it should do something.',
      },
    ],
    aria: [
      { attribute: 'role="img" + aria-label', when: 'Default: “Sarah Chen, Online”.' },
      { attribute: 'aria-hidden', when: 'decorative prop, when the name is shown as text.' },
      { attribute: 'role="group" + aria-label', when: 'AvatarGroup, from its label.' },
    ],
    focus: 'Avatars aren’t focusable on their own.',
    wcag: [
      {
        criterion: '1.1.1 Non-text Content',
        how: 'Every avatar has a text alternative (the name) or is marked decorative.',
      },
      {
        criterion: '1.4.1 Use of Color',
        how: 'Status is also announced in words, not only shown by dot color.',
      },
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Initials pass 4.5:1 on the fallback background.',
      },
    ],
    notes: ['Status colors are not the only cue: show the status in words where it matters.'],
  },
  examples: [
    {
      id: 'basic',
      title: 'Avatar with a photo',
      description: 'Falls back to initials if the photo is missing.',
      code: `import { Avatar } from '@ds/react';

<Avatar name="Sarah Chen" src="/avatars/sarah.png" status="online" />`,
    },
    {
      id: 'decorative',
      title: 'Next to a name',
      description: 'Hide it from screen readers when the name is shown as text.',
      code: `import { Avatar } from '@ds/react';

<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Avatar name="Sarah Chen" src="/avatars/sarah.png" size="small" decorative />
  <span>Sarah Chen</span>
</div>`,
    },
    {
      id: 'group',
      title: 'Group with a count',
      description: 'Show three, then +N.',
      code: `import { Avatar, AvatarGroup } from '@ds/react';

<AvatarGroup label="Meeting attendees" max={3}>
  {people.map((p) => <Avatar key={p.id} name={p.name} src={p.photo} />)}
</AvatarGroup>`,
    },
  ],
  tokenPrefixes: ['--avatar-'],
  related: [{ id: 'header', relation: 'Profile header pattern built with an xlarge Avatar.' }],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'name prop (accessible name and initials) replaces alt; initials and icon fallbacks; image error fallback.',
        'Sizes small, medium, large, xlarge; the radius prop was removed (corners follow the radius theme).',
        'Status dot and AvatarGroup with max and a “+N” count.',
      ],
    },
  ],
});
