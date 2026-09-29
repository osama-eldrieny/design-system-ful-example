import { defineMeta } from '../meta';

export default defineMeta({
  id: 'stepper',
  name: 'Stepper',
  category: 'Navigation',
  status: 'stable',
  since: '0.4.0',
  description:
    'A stepper shows progress through a task with several steps, such as checkout: which steps are done, which is current and what’s left. Completed steps can link back.',
  imports: [{ name: 'Stepper', from: '@ds/react' }],
  whenToUse: ['For tasks split into 3–6 ordered steps: checkout, onboarding, setup wizards.'],
  whenNotToUse: [
    { text: 'For progress of one operation.', alternative: 'Progress' },
    { text: 'For switching between independent views.', alternative: 'Tabs' },
    { text: 'For site location.', alternative: 'Breadcrumb' },
  ],
  anatomy: [
    { name: 'Indicator', description: 'Number, tick (complete) or cross (error).' },
    { name: 'Label', description: 'Step name; bold when current.' },
    { name: 'Description', description: 'Short detail.', optional: true },
    { name: 'Connector', description: 'Line to the next step; filled when complete.' },
  ],
  options: [
    {
      prop: 'orientation',
      title: 'Orientation',
      values: [
        { value: 'horizontal', meaning: 'A few short steps across the top. Default.' },
        { value: 'vertical', meaning: 'Many or long steps, or narrow screens.' },
      ],
    },
  ],
  states: [
    { name: 'Complete', meaning: 'Filled with a tick.', trigger: 'index < current' },
    {
      name: 'Current',
      meaning: 'Outlined, bold label; aria-current="step".',
      trigger: 'index = current',
    },
    { name: 'Upcoming', meaning: 'Muted.', trigger: 'index > current' },
    { name: 'Error', meaning: 'Danger fill with a cross.', trigger: 'step.error' },
  ],
  behavior: [
    { topic: 'Going back', text: 'With onStepClick, completed steps become buttons.' },
    {
      topic: 'Announcements',
      text: 'Each step’s status is read after its label (“Shipping, completed”).',
    },
  ],
  content: ['Labels: one or two words, nouns (“Shipping”, “Payment”).'],
  guidelines: [
    {
      do: 'Keep to 3–6 steps.',
      dont: 'Show 12 steps.',
      why: 'Long steppers are hard to scan; group steps instead.',
    },
    {
      do: 'Let people revisit completed steps.',
      dont: 'Let people jump ahead to steps that need earlier input.',
      why: 'Skipping ahead leads to errors.',
    },
    {
      do: 'Use vertical on narrow screens.',
      dont: 'Squeeze long labels into a horizontal stepper on phones.',
      why: 'Labels get cut off.',
    },
  ],
  accessibility: {
    role: 'ordered list; the current item has aria-current="step".',
    keyboard: [
      { keys: 'Tab / Enter', action: 'Reach and open completed steps (with onStepClick).' },
    ],
    aria: [
      { attribute: 'aria-label', when: 'Names the list (“Checkout steps”).' },
      { attribute: 'aria-current="step"', when: 'On the current step.' },
      {
        attribute: 'visually hidden status',
        when: 'Each step says completed / current / not started.',
      },
    ],
    focus: 'Focus ring on clickable steps.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'An ordered, named list.' },
      { criterion: '1.4.1 Use of Color', how: 'Ticks, crosses and hidden text convey status.' },
      { criterion: '2.4.8 Location', how: 'Shows the current step.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'checkout',
      title: 'Checkout',
      description: 'Second of three.',
      code: `import { Stepper } from '@ds/react';

<Stepper aria-label="Checkout steps" current={1} steps={[
  { label: 'Cart' }, { label: 'Shipping' }, { label: 'Payment' },
]} />`,
    },
    {
      id: 'vertical',
      title: 'Vertical with descriptions',
      description: 'Onboarding.',
      code: `import { Stepper } from '@ds/react';

<Stepper aria-label="Setup" orientation="vertical" current={2} steps={[
  { label: 'Account', description: 'Email and password' },
  { label: 'Team', description: 'Invite people' },
  { label: 'Billing', description: 'Choose a plan' },
]} />`,
    },
    {
      id: 'back',
      title: 'Going back',
      description: 'Completed steps are clickable.',
      code: `import { Stepper } from '@ds/react';

<Stepper aria-label="Checkout steps" current={step} steps={steps} onStepClick={setStep} />`,
    },
  ],
  tokenPrefixes: ['--stepper-'],
  related: [
    { id: 'progress', relation: 'For one operation.' },
    { id: 'tabs', relation: 'For independent views.' },
  ],
  changelog: [{ version: '0.4.0', date: '2026-09-29', changes: ['New component.'] }],
});
