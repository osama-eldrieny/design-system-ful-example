import { defineMeta } from '../meta';

export default defineMeta({
  id: 'tooltip',
  name: 'Tooltip',
  category: 'Overlays',
  status: 'stable',
  since: '0.4.0',
  description:
    'A tooltip shows a short text hint for a control when it’s hovered or focused, such as the name of an icon button. It is dismissible with Escape and never contains links or buttons.',
  imports: [{ name: 'Tooltip', from: '@ds/react' }],
  whenToUse: [
    'To show the name of an icon-only button.',
    'To add a short, non-essential hint to a control.',
  ],
  whenNotToUse: [
    {
      text: 'For information people need to complete a task.',
      alternative: 'Visible help text (FormField description)',
    },
    { text: 'For interactive content.', alternative: 'Popover' },
  ],
  anatomy: [{ name: 'Bubble', description: 'Inverted colors, next to the control.' }],
  options: [
    {
      prop: 'side',
      title: 'Side',
      values: [
        { value: 'top', meaning: 'Default.' },
        { value: 'bottom / left / right', meaning: 'When top covers something important.' },
      ],
    },
  ],
  states: [
    {
      name: 'Shown',
      meaning: 'After the delay on hover, immediately on focus.',
      trigger: 'hover or focus',
    },
  ],
  behavior: [
    {
      topic: 'Showing',
      text: 'Appears after delayDuration on hover and on keyboard focus; hides on blur, pointer leave or Escape.',
    },
    {
      topic: 'Description',
      text: 'Adds the text as a description of the control (aria-describedby).',
    },
    { topic: 'Touch', text: 'Touch screens don’t hover; don’t rely on tooltips there.' },
  ],
  content: ['A few words; no full stop for labels. Don’t repeat the visible label.'],
  guidelines: [
    {
      do: 'Give icon buttons an aria-label and a tooltip with the same text.',
      dont: 'Rely on the tooltip as the only name.',
      why: 'The tooltip describes; the aria-label names the button.',
    },
    {
      do: 'Keep tooltips to plain text.',
      dont: 'Put links or buttons in a tooltip.',
      why: 'Tooltips disappear when focus moves, so their content can’t be reached.',
    },
    {
      do: 'Attach tooltips to focusable elements.',
      dont: 'Put a tooltip on plain text or a disabled button.',
      why: 'Keyboard users can’t focus them, so they’d never see it.',
    },
  ],
  accessibility: {
    role: 'tooltip; describes its trigger.',
    keyboard: [
      { keys: 'Tab', action: 'Focusing the trigger shows it.' },
      { keys: 'Escape', action: 'Hides it.' },
    ],
    aria: [{ attribute: 'aria-describedby', when: 'Set on the trigger while shown.' }],
    focus: 'Stays on the trigger.',
    wcag: [
      {
        criterion: '1.4.13 Content on Hover or Focus',
        how: 'Dismissible (Escape), hoverable and persistent.',
      },
      { criterion: '1.4.3 Contrast (Minimum)', how: 'Inverted text passes 4.5:1 in every theme.' },
      { criterion: '2.1.1 Keyboard', how: 'Shows on focus, not only hover.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'icon',
      title: 'Icon button',
      description: 'Names an icon.',
      code: `import { Tooltip, IconButton } from '@ds/react';
import { Trash2 } from 'lucide-react';

<Tooltip content="Delete">
  <IconButton icon={<Trash2 />} label="Delete" />
</Tooltip>`,
    },
    {
      id: 'side',
      title: 'Placement',
      description: 'Below the control.',
      code: `import { Tooltip, Button } from '@ds/react';

<Tooltip content="Last saved 2 minutes ago" side="bottom">
  <Button appearance="text">Saved</Button>
</Tooltip>`,
    },
    {
      id: 'delay',
      title: 'Faster',
      description: 'Shorter delay in dense toolbars.',
      code: `import { Tooltip, IconButton } from '@ds/react';

<Tooltip content="Bold" delayDuration={150}><IconButton icon={<Bold />} label="Bold" /></Tooltip>`,
    },
  ],
  tokenPrefixes: ['--tooltip-'],
  related: [
    { id: 'popover', relation: 'For interactive or longer content.' },
    { id: 'button', relation: 'IconButton needs a label and often a tooltip.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
