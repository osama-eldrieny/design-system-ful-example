import { defineMeta } from '../meta';

export default defineMeta({
  id: 'alert',
  name: 'Alert',
  category: 'Feedback',
  status: 'stable',
  since: '0.2.0',
  description:
    'An alert shows a message about the page or the result of an action: information, success, a warning or an error. It stays in place until the situation changes or people dismiss it.',
  imports: [{ name: 'Alert', from: '@ds/react' }],
  whenToUse: [
    'To explain the state of a page or section, e.g. "Your trial ends in 3 days".',
    'To report the result of an action that people need to notice, e.g. a failed payment.',
    'To show a form-level error summary above the fields.',
  ],
  whenNotToUse: [
    { text: 'For brief confirmations that don’t need to stay on screen.', alternative: 'Toast' },
    { text: 'For an error on a single field.', alternative: 'The field’s error message' },
    { text: 'For decisions people must make before continuing.', alternative: 'Dialog' },
  ],
  anatomy: [
    {
      name: 'Container',
      description: 'Background and border in the variant’s color; warning uses a dashed border.',
    },
    { name: 'Icon', description: 'Reinforces the variant; hidden from screen readers.' },
    { name: 'Title', description: 'The message in one short sentence.' },
    { name: 'Description', description: 'Optional detail or next step.', optional: true },
    { name: 'Dismiss button', description: 'Optional; removes the alert.', optional: true },
  ],
  options: [
    {
      prop: 'variant',
      title: 'Variant',
      values: [
        {
          value: 'primary',
          meaning: 'Neutral information, e.g. a feature announcement or status.',
        },
        { value: 'success', meaning: 'An action completed, e.g. "Payment received".' },
        { value: 'warning', meaning: 'Something needs attention soon but nothing failed yet.' },
        { value: 'danger', meaning: 'Something failed or is blocked and needs action.' },
      ],
    },
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        { value: 'subtle', meaning: 'Tinted background. Default for most messages.' },
        {
          value: 'solid',
          meaning: 'Filled with the variant color. For the one message that must not be missed.',
        },
        {
          value: 'outline',
          meaning: 'Surface background with a colored border, for busy or tinted areas.',
        },
      ],
    },
  ],
  states: [
    { name: 'Shown', meaning: 'The message applies.', trigger: 'Rendered.' },
    {
      name: 'Dismiss hover/focus',
      meaning: 'The dismiss button responds to the pointer and keyboard.',
      trigger: ':hover / :focus-visible on the button.',
    },
  ],
  behavior: [
    {
      topic: 'Announcements',
      text: 'Danger and warning alerts use role="alert" and are read out immediately when they appear; primary and success use role="status" and are read politely.',
    },
    {
      topic: 'Dismissing',
      text: 'With onDismiss, a dismiss button appears; remove the alert in the handler and move focus somewhere sensible.',
    },
    {
      topic: 'Actions',
      text: 'Put at most two actions in the actions slot, e.g. "Retry" and "View details".',
    },
    {
      topic: 'Width',
      text: 'The alert fills its container; place it at the top of the section it relates to.',
    },
  ],
  content: [
    'Lead with what happened, then what to do: "Payment failed. Update your card to keep your plan."',
    'Keep titles to one sentence; put detail in the description.',
    'Avoid blame and jargon; don’t show raw error codes as the main message.',
  ],
  guidelines: [
    {
      do: 'Match the variant to what happened.',
      dont: 'Use danger for a neutral announcement to get attention.',
      why: 'Colors carry meaning; misusing them trains people to ignore real problems.',
    },
    {
      do: 'Say how to fix the problem.',
      dont: 'Only state that something went wrong.',
      why: 'A message without a next step leaves people stuck.',
    },
    {
      do: 'Show one alert per situation, near what it’s about.',
      dont: 'Stack several alerts at the top of the page.',
      why: 'Many alerts compete for attention and get skipped.',
    },
  ],
  accessibility: {
    role: 'alert (danger, warning) or status (primary, success).',
    keyboard: [{ keys: 'Tab', action: 'Reaches actions and the dismiss button in order.' }],
    aria: [
      { attribute: 'role="alert"', when: 'Danger and warning: announced immediately.' },
      { attribute: 'role="status"', when: 'Primary and success: announced politely.' },
      { attribute: 'aria-label on dismiss', when: 'From dismissLabel (default "Dismiss").' },
      {
        attribute: 'aria-hidden on the icon',
        when: 'The icon is decorative; the text carries the meaning.',
      },
    ],
    focus:
      'The dismiss button and any actions show the focus ring; the alert itself isn’t focusable.',
    wcag: [
      {
        criterion: '1.4.1 Use of Color',
        how: 'Every variant has its own icon; warning also has a dashed border.',
      },
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Title and description pass 4.5:1 in every appearance and theme.',
      },
      { criterion: '4.1.3 Status Messages', how: 'Alerts are announced without moving focus.' },
    ],
    notes: [
      'Only render alerts that change dynamically with role="alert"; a page full of alerts on load is noisy for screen readers.',
    ],
  },
  examples: [
    {
      id: 'basic',
      title: 'Information',
      description: 'A subtle primary alert with a description.',
      code: `import { Alert } from '@ds/react';

<Alert title="Real-time data enabled.">Updates every 30 seconds.</Alert>`,
    },
    {
      id: 'error-action',
      title: 'Error with an action',
      description: 'Say what failed and offer the fix.',
      code: `import { Alert, Button } from '@ds/react';

<Alert
  variant="danger"
  title="Payment failed."
  actions={<Button size="small" variant="danger">Update card</Button>}
>
  Your card was declined. Update it to keep your plan.
</Alert>`,
    },
    {
      id: 'dismissible',
      title: 'Dismissible',
      description: 'Remove the alert when people dismiss it.',
      code: `import { Alert } from '@ds/react';

{visible && (
  <Alert variant="success" title="Profile updated." onDismiss={() => setVisible(false)} />
)}`,
    },
  ],
  tokenPrefixes: ['--alerts-'],
  related: [
    { id: 'toast', relation: 'Use for short confirmations that disappear on their own.' },
    { id: 'input-field', relation: 'Shows errors for a single field.' },
    { id: 'dialog', relation: 'Use when people must respond before continuing.' },
  ],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'New appearances solid and outline; description, actions slot and dismiss button.',
        'Lucide icons per variant; role="alert"/"status" for screen readers; full width.',
      ],
    },
  ],
});
