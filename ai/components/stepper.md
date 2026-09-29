# Stepper

> A stepper shows progress through a task with several steps, such as checkout: which steps are done, which is current and what’s left. Completed steps can link back.

Status: stable · Category: Navigation · Since 0.4.0

```tsx
import { Stepper } from '@ds/react';
```

## When to use
- For tasks split into 3–6 ordered steps: checkout, onboarding, setup wizards.

## When not to use
- For progress of one operation. Use Progress.
- For switching between independent views. Use Tabs.
- For site location. Use Breadcrumb.

## Orientation (`orientation`)
- `horizontal`: A few short steps across the top. Default.
- `vertical`: Many or long steps, or narrow screens.

## States
- **Complete**: Filled with a tick. (index < current)
- **Current**: Outlined, bold label; aria-current="step". (index = current)
- **Upcoming**: Muted. (index > current)
- **Error**: Danger fill with a cross. (step.error)

## Props
### Stepper

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `steps` | `StepperStep[]` |  | The steps, in order. |
| `current` | `number` |  | Index of the current step (0-based). Earlier steps are complete. |
| `orientation` | `"horizontal" \| "vertical"` | horizontal | `horizontal` (default) for a few short steps; `vertical` for many or long ones. |
| `onStepClick` | `((index: number) => void)` |  | Lets people go back to a completed step by clicking it. |
| `statusLabels` | `Partial<Record<StepStatus, string>>` |  | Words announced for each status, for translation. |
| `aria-label` | `string` |  | Names the list, e.g. "Checkout steps". |

## Guidelines
- Do: Keep to 3–6 steps. Don’t: Show 12 steps. Why: Long steppers are hard to scan; group steps instead.
- Do: Let people revisit completed steps. Don’t: Let people jump ahead to steps that need earlier input. Why: Skipping ahead leads to errors.
- Do: Use vertical on narrow screens. Don’t: Squeeze long labels into a horizontal stepper on phones. Why: Labels get cut off.

## Content
- Labels: one or two words, nouns (“Shipping”, “Payment”).

## Accessibility
- Role: ordered list; the current item has aria-current="step".
- Tab / Enter: Reach and open completed steps (with onStepClick).
- `aria-label`: Names the list (“Checkout steps”).
- `aria-current="step"`: On the current step.
- `visually hidden status`: Each step says completed / current / not started.
- Focus: Focus ring on clickable steps.
- WCAG 1.3.1 Info and Relationships: An ordered, named list.
- WCAG 1.4.1 Use of Color: Ticks, crosses and hidden text convey status.
- WCAG 2.4.8 Location: Shows the current step.

## Examples
### Checkout
Second of three.

```tsx
import { Stepper } from '@ds/react';

<Stepper aria-label="Checkout steps" current={1} steps={[
  { label: 'Cart' }, { label: 'Shipping' }, { label: 'Payment' },
]} />
```

### Vertical with descriptions
Onboarding.

```tsx
import { Stepper } from '@ds/react';

<Stepper aria-label="Setup" orientation="vertical" current={2} steps={[
  { label: 'Account', description: 'Email and password' },
  { label: 'Team', description: 'Invite people' },
  { label: 'Billing', description: 'Choose a plan' },
]} />
```

### Going back
Completed steps are clickable.

```tsx
import { Stepper } from '@ds/react';

<Stepper aria-label="Checkout steps" current={step} steps={steps} onStepClick={setStep} />
```

Tokens: `--stepper-*` (values per theme in ai/components/stepper.json).
