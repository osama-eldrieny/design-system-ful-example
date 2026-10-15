# PricingCard

> A pricing plan: name, price, what it includes and one call to action. A featured plan gets a brand border and a label such as "Most popular".

Status: stable · Category: Patterns · Since 1.3.0

```tsx
import { PricingCard } from '@ds/react';
```

## When to use
- On a pricing page, one card per plan, side by side.
- To compare plans where the price and included features matter most.

## When not to use
- For a single upgrade offer inside a page. Use InlineCTA.
- For choosing a payment method. Use PaymentCard.

## Featured (`featured`)
- `false`: Default. A regular plan.
- `true`: Highlighted with a brand border; use for one plan.

## States
- **Default**: A regular plan. (—)
- **Featured**: The highlighted plan with a brand border. (featured is true.)

## Props
### PricingCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `ReactNode` |  | The plan name, e.g. "Pro". |
| `price` | `ReactNode` |  | The price, e.g. "$29". |
| `period` | `ReactNode` |  | The billing period, e.g. "per month". |
| `description` | `ReactNode` |  | One or two lines on who the plan is for. |
| `features` | `ReactNode[]` |  | What is included, one item per line. |
| `action` | `ReactNode` |  | The call to action, usually a Button. |
| `badge` | `ReactNode` |  | A label such as "Most popular". |
| `featured` | `boolean` | false | Highlights the plan with a brand border. |

## Guidelines
- Do: Feature one plan, the one most people should choose. Don’t: Feature several plans at once. Why: A single highlight tells people which plan to start with.
- Do: Keep feature lists in the same order across plans. Don’t: Reorder or rename features between plans. Why: Matching rows let people compare the plans at a glance.
- Do: Use one clear action per plan. Don’t: Put two primary buttons on one plan. Why: Each plan should lead to one next step.

## Content
- Name plans by who they are for: "Starter", "Pro", "Team".
- Write features as short phrases, one per line.

## Accessibility
- Role: article, named by the plan name.
- Tab: Moves to the action button.
- `aria-hidden`: On the check marks, which are decorative.
- Focus: The action button shows its own focus ring.
- WCAG 1.3.1 Info and Relationships: The plan name is a heading; features are a list.
- WCAG 1.4.1 Use of Color: The featured plan is also marked by its label, not only by its border.
- Price and period are read together so the amount is never separated from its billing period.

## Examples
### Three plans
A regular plan, a featured plan and an enterprise plan.

```tsx
import { Button, PricingCard } from '@ds/react';

<PricingCard
  name="Pro"
  price="$29"
  period="per month"
  description="For growing teams."
  badge="Most popular"
  featured
  features={['Unlimited projects', 'Priority support']}
  action={<Button>Start free trial</Button>}
/>
```

### Free plan
A regular plan with an outlined action.

```tsx
import { Button, PricingCard } from '@ds/react';

<PricingCard name="Free" price="$0" features={['3 projects']} action={<Button variant="secondary" appearance="outline">Get started</Button>} />
```

### In a grid
Plans side by side on a wide screen and stacked on a narrow one.

```tsx
import { PricingCard } from '@ds/react';

<div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))' }}>
  {plans.map((plan) => <PricingCard key={plan.name} {...plan} />)}
</div>
```

Tokens: `--pricing-card-*` (values per theme in ai/components/pricing-card.json).
