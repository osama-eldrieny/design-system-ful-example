import { defineMeta } from '../meta';

export default defineMeta({
  id: 'button',
  name: 'Button',
  category: 'Actions',
  status: 'stable',
  since: '0.1.0',
  description:
    'A button triggers an action in place: saving a form, opening a dialog, deleting an item. Variants signal what kind of action it is, appearances set how much attention it draws, and sizes fit it to the density of the surrounding UI. IconButton is the icon-only form for compact, well-known actions.',
  imports: [
    { name: 'Button', from: '@ds/react' },
    { name: 'IconButton', from: '@ds/react' },
  ],
  whenToUse: [
    'To trigger an action on the current page: submit, save, confirm, open, delete.',
    'To let people commit to a decision in a dialog or form.',
    'IconButton: for compact, widely recognized actions (close, edit, more) in toolbars, cards and table rows.',
  ],
  whenNotToUse: [
    { text: 'To navigate to another page or URL.', alternative: 'Link' },
    { text: 'To switch a setting on or off.', alternative: 'Switch' },
    { text: 'To pick one option from a small set of views.', alternative: 'Tabs or ButtonGroup' },
    {
      text: 'For an icon whose meaning is not obvious without text.',
      alternative: 'Button with iconStart and a label',
    },
  ],
  anatomy: [
    {
      name: 'Container',
      description:
        'The clickable area. Its fill, outline and corner radius come from the variant, appearance and radius theme.',
    },
    {
      name: 'Start icon',
      description: 'Optional icon before the label; replaced by the spinner while loading.',
      optional: true,
    },
    { name: 'Label', description: 'Short verb or verb phrase that says what happens.' },
    {
      name: 'End icon',
      description: 'Optional icon after the label, often a chevron or external-link arrow.',
      optional: true,
    },
    {
      name: 'Focus ring',
      description: 'Outline shown when the button is reached with the keyboard.',
    },
  ],
  options: [
    {
      prop: 'variant',
      title: 'Variant',
      values: [
        {
          value: 'primary',
          meaning: 'The main action on a screen or in a dialog. Use one per view.',
        },
        {
          value: 'secondary',
          meaning: 'Supporting actions next to a primary one, e.g. Cancel beside Save.',
        },
        {
          value: 'success',
          meaning: 'Confirms a positive, completing action, e.g. Approve or Publish.',
        },
        { value: 'danger', meaning: 'Destructive or irreversible actions, e.g. Delete account.' },
        {
          value: 'warning',
          meaning: 'Actions that need caution but are not destructive, e.g. Override.',
        },
      ],
    },
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        { value: 'filled', meaning: 'Highest emphasis. Solid fill in the variant color.' },
        {
          value: 'outline',
          meaning: 'Medium emphasis. Variant-colored outline and text, tinted on hover.',
        },
        {
          value: 'ghost',
          meaning: 'Low emphasis for toolbars and dense UI. No outline until hovered.',
        },
        {
          value: 'text',
          meaning: 'Lowest emphasis, link-like. Underlined text for inline actions.',
        },
      ],
    },
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'small', meaning: 'Dense UI: tables, toolbars, cards.' },
        { value: 'medium', meaning: 'Default for forms and dialogs.' },
        { value: 'large', meaning: 'Prominent calls to action, e.g. on a landing page hero.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'Ready to use.', trigger: 'At rest.' },
    {
      name: 'Hover',
      meaning: 'Shows the button responds to the pointer.',
      trigger: 'Pointer over the button (:hover).',
    },
    {
      name: 'Focus',
      meaning: 'Shows where keyboard focus is.',
      trigger: 'Reached with Tab (:focus-visible); adds the focus ring.',
    },
    {
      name: 'Pressed',
      meaning: 'Confirms the press.',
      trigger: 'While pressed with pointer or keyboard (:active).',
    },
    {
      name: 'Disabled',
      meaning: 'The action is not available right now.',
      trigger: 'disabled prop.',
    },
    {
      name: 'Loading',
      meaning: 'The action is running; clicks are ignored until it finishes.',
      trigger: 'loading prop.',
    },
  ],
  behavior: [
    {
      topic: 'Type',
      text: 'Defaults to type="button" so it never submits a form by accident. Pass type="submit" for a form’s submit button.',
    },
    {
      topic: 'Loading',
      text: 'The spinner replaces the start icon and the label stays, so the width does not jump. The button keeps focus and is announced as busy.',
    },
    {
      topic: 'Long labels',
      text: 'Labels do not wrap. Keep them short; in narrow layouts use fullWidth so the button fills its container.',
    },
    {
      topic: 'Right-to-left',
      text: 'Padding and icons use logical positions, so the start icon sits on the right in Arabic.',
    },
    {
      topic: 'Themes',
      text: 'Colors follow brand and mode, padding follows density, corners follow the radius theme.',
    },
  ],
  content: [
    'Start with a verb that says what happens: "Save changes", "Delete file", "Send invite".',
    'Keep labels to one to three words; use sentence case.',
    'Be specific: "Publish post" beats "OK" or "Submit".',
    'Match the words people saw earlier in the flow, e.g. "Delete" in the button of a "Delete project?" dialog.',
  ],
  guidelines: [
    {
      do: 'Use one filled primary button per view for the main action.',
      dont: 'Place several filled primary buttons side by side.',
      why: 'Competing primary actions make it unclear what to do next.',
    },
    {
      do: 'Pair a primary action with secondary or outline buttons for alternatives.',
      dont: 'Style Cancel as a filled primary button.',
      why: 'Visual weight should follow importance; the safe path should not look like the main action.',
    },
    {
      do: 'Use the danger variant for destructive actions and confirm them in a dialog.',
      dont: 'Use danger just to make a button stand out.',
      why: 'Red signals risk; overusing it teaches people to ignore it.',
    },
    {
      do: 'Give every IconButton a label that says what it does.',
      dont: 'Rely on an unfamiliar icon alone.',
      why: 'Screen readers announce the label, and sighted users see it as a tooltip.',
    },
    {
      do: 'Use a Link for navigation to another page.',
      dont: 'Use a Button to change the URL.',
      why: 'Links and buttons behave differently for keyboard, screen readers and "open in new tab".',
    },
  ],
  accessibility: {
    role: 'button (native <button> element).',
    keyboard: [
      { keys: 'Tab / Shift+Tab', action: 'Moves focus to and from the button.' },
      { keys: 'Enter', action: 'Activates the button.' },
      { keys: 'Space', action: 'Activates the button.' },
    ],
    aria: [
      { attribute: 'aria-busy="true"', when: 'Set automatically while loading.' },
      {
        attribute: 'aria-disabled="true"',
        when: 'Set automatically while loading, so the button stays focusable.',
      },
      { attribute: 'aria-label', when: 'Set automatically on IconButton from its label prop.' },
      {
        attribute: 'aria-hidden on icons',
        when: 'Icons are decorative; the label carries the meaning.',
      },
    ],
    focus:
      'A visible focus ring (brand accent, at least 3:1 against the background) appears when the button is reached with the keyboard. Disabled buttons are skipped by Tab; loading buttons keep focus.',
    wcag: [
      {
        criterion: '1.4.3 Contrast (Minimum)',
        how: 'Label text meets 4.5:1 in every variant, appearance, state, brand and mode (checked in CI).',
      },
      { criterion: '1.4.11 Non-text Contrast', how: 'Focus ring and outline strokes meet 3:1.' },
      {
        criterion: '2.1.1 Keyboard',
        how: 'Native button: reachable with Tab, activated with Enter and Space.',
      },
      { criterion: '2.4.7 Focus Visible', how: 'Focus ring on :focus-visible.' },
      { criterion: '2.5.8 Target Size (Minimum)', how: 'Every size is at least 24×24 px.' },
      {
        criterion: '4.1.2 Name, Role, Value',
        how: 'Label or aria-label names the button; busy and disabled states are exposed.',
      },
    ],
    notes: [
      'Do not put interactive elements inside a button.',
      'If a button opens a menu or dialog, the menu/dialog component sets aria-haspopup and aria-expanded.',
    ],
  },
  examples: [
    {
      id: 'basic',
      title: 'Primary action',
      description: 'The default button: filled, primary, medium.',
      code: `import { Button } from '@ds/react';

<Button onClick={save}>Save changes</Button>`,
    },
    {
      id: 'dialog-actions',
      title: 'Dialog actions',
      description: 'A destructive primary action with a secondary way out.',
      code: `import { Button } from '@ds/react';

<div style={{ display: 'flex', gap: 8 }}>
  <Button variant="secondary" appearance="outline" onClick={close}>Cancel</Button>
  <Button variant="danger" onClick={remove}>Delete project</Button>
</div>`,
    },
    {
      id: 'with-icon',
      title: 'With an icon',
      description: 'Icons support the label; they are hidden from screen readers.',
      code: `import { Button } from '@ds/react';
import { Download } from 'lucide-react';

<Button appearance="outline" iconStart={<Download />}>Download report</Button>`,
    },
    {
      id: 'loading',
      title: 'Loading',
      description: 'While saving, the button shows a spinner and ignores clicks.',
      code: `import { Button } from '@ds/react';

<Button loading={isSaving} onClick={save}>Save changes</Button>`,
    },
    {
      id: 'icon-button',
      title: 'Icon button',
      description: 'Icon-only; the label is its accessible name and tooltip.',
      code: `import { IconButton } from '@ds/react';
import { X } from 'lucide-react';

<IconButton icon={<X />} label="Close dialog" variant="secondary" appearance="ghost" />`,
    },
  ],
  tokenPrefixes: ['--button-'],
  related: [
    { id: 'icon-button', relation: 'Icon-only form of Button, exported alongside it.' },
    { id: 'link', relation: 'Use for navigation instead of a button.' },
    { id: 'button-group', relation: 'Groups related buttons.' },
    { id: 'switch', relation: 'Use for on/off settings.' },
  ],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'New variants success, danger and warning; new appearances outline and ghost; new size large.',
        'Renamed buttonStyle to appearance; removed the state prop in favor of real hover, focus and pressed states.',
        'Added iconStart, iconEnd, loading, fullWidth and the IconButton component.',
        'Defaults to type="button"; keyboard focus ring; WCAG AA contrast in every theme.',
      ],
    },
    {
      version: '0.1.0',
      date: '2025',
      changes: ['First version: primary and secondary, filled and text, small and medium.'],
    },
    {
      version: '1.1.0',
      date: '2026-09-30',
      changes: [
        'Filled buttons in dark mode use a darker fill with light text (new --color-bg-accent-{tone}-strong-* roles); AA contrast in every brand.',
      ],
    },
  ],
});
