import { defineMeta } from '../meta';

export default defineMeta({
  id: 'pricing-card',
  name: 'PricingCard',
  category: 'Patterns',
  status: 'stable',
  since: '1.3.0',
  description:
    'A pricing plan: name, price, what it includes and one call to action. A featured plan gets a brand border and a label such as "Most popular".',
  imports: [{ name: 'PricingCard', from: '@ds/react' }],
  whenToUse: [
    'On a pricing page, one card per plan, side by side.',
    'To compare plans where the price and included features matter most.',
  ],
  whenNotToUse: [
    { text: 'For a single upgrade offer inside a page.', alternative: 'InlineCTA' },
    { text: 'For choosing a payment method.', alternative: 'PaymentCard' },
  ],
  anatomy: [
    { name: 'Name', description: 'The plan name.' },
    { name: 'Badge', description: 'A label such as "Most popular".', optional: true },
    { name: 'Price', description: 'The amount and billing period.' },
    { name: 'Description', description: 'Who the plan is for.', optional: true },
    { name: 'Features', description: 'What is included, one per line.' },
    { name: 'Action', description: 'The call to action, usually a Button.' },
  ],
  options: [
    {
      prop: 'featured',
      title: 'Featured',
      values: [
        { value: 'false', meaning: 'Default. A regular plan.' },
        { value: 'true', meaning: 'Highlighted with a brand border; use for one plan.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'A regular plan.', trigger: '—' },
    { name: 'Featured', meaning: 'The highlighted plan with a brand border.', trigger: 'featured is true.' },
  ],
  behavior: [
    { topic: 'Comparison', text: 'Keep the same feature order on every plan so the cards compare line by line.' },
    { topic: 'Right-to-left', text: 'Check marks and text align to the start in Arabic.' },
  ],
  content: [
    'Name plans by who they are for: "Starter", "Pro", "Team".',
    'Write features as short phrases, one per line.',
  ],
  guidelines: [
    {
      do: 'Feature one plan, the one most people should choose.',
      dont: 'Feature several plans at once.',
      why: 'A single highlight tells people which plan to start with.',
    },
    {
      do: 'Keep feature lists in the same order across plans.',
      dont: 'Reorder or rename features between plans.',
      why: 'Matching rows let people compare the plans at a glance.',
    },
    {
      do: 'Use one clear action per plan.',
      dont: 'Put two primary buttons on one plan.',
      why: 'Each plan should lead to one next step.',
    },
  ],
  accessibility: {
    role: 'article, named by the plan name.',
    keyboard: [{ keys: 'Tab', action: 'Moves to the action button.' }],
    aria: [{ attribute: 'aria-hidden', when: 'On the check marks, which are decorative.' }],
    focus: 'The action button shows its own focus ring.',
    wcag: [
      { criterion: '1.3.1 Info and Relationships', how: 'The plan name is a heading; features are a list.' },
      { criterion: '1.4.1 Use of Color', how: 'The featured plan is also marked by its label, not only by its border.' },
    ],
    notes: ['Price and period are read together so the amount is never separated from its billing period.'],
  },
  examples: [
    {
      id: 'pricing',
      title: 'Three plans',
      description: 'A regular plan, a featured plan and an enterprise plan.',
      code: `import { Button, PricingCard } from '@ds/react';

<PricingCard
  name="Pro"
  price="$29"
  period="per month"
  description="For growing teams."
  badge="Most popular"
  featured
  features={['Unlimited projects', 'Priority support']}
  action={<Button>Start free trial</Button>}
/>`,
    },
    {
      id: 'free',
      title: 'Free plan',
      description: 'A regular plan with an outlined action.',
      code: `import { Button, PricingCard } from '@ds/react';

<PricingCard name="Free" price="$0" features={['3 projects']} action={<Button variant="secondary" appearance="outline">Get started</Button>} />`,
    },
    {
      id: 'grid',
      title: 'In a grid',
      description: 'Plans side by side on a wide screen and stacked on a narrow one.',
      code: `import { PricingCard } from '@ds/react';

<div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))' }}>
  {plans.map((plan) => <PricingCard key={plan.name} {...plan} />)}
</div>`,
    },
  ],
  tokenPrefixes: ['--pricing-card-'],
  related: [
    { id: 'card', relation: 'The surface this builds on.' },
    { id: 'inline-cta', relation: 'For one upgrade offer inside a page.' },
  ],
  changelog: [{ version: '1.3.0', date: '2026-10-15', changes: ['New component.'] }],
});
