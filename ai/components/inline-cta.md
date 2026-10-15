# InlineCTA

> A call to action placed inside page content, such as between dashboard sections or at the end of an article: a title, a short description and one or two actions.

Status: stable · Category: Patterns · Since 1.2.0

```tsx
import { InlineCTA } from '@ds/react';
```

## When to use
- To suggest a next step in context, e.g. "Invite your team" under an empty member list.
- To promote an upgrade or feature within a page without interrupting it.

## When not to use
- For warnings, errors or system status. Use Alert.
- For a page-wide announcement at the top. Use PageHeader.
- When there is nothing yet on the page. Use EmptyState.

## Appearance (`appearance`)
- `subtle`: Default. A grey panel that sits quietly in content.
- `brand`: A brand-colored border and icon tile, for upgrades and new features.
- `outline`: Bordered, on the page background, for cards and dense layouts.

## Layout (`layout`)
- `horizontal`: Default. Actions at the end; they wrap below on narrow screens.
- `stacked`: Actions under the text, for sidebars and narrow columns.

## States
- **Default**: A static panel; its buttons have their own states. (—)

## Props
### InlineCTA

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  | The offer in a few words, e.g. "Upgrade to Pro". |
| `description` | `ReactNode` |  | One or two sentences on why. |
| `icon` | `ReactNode` |  | Icon or illustration at the start. |
| `actions` | `ReactNode` |  | One or two Buttons or Links. |
| `appearance` | `InlineCTAAppearance` | subtle | `subtle` (default) grey panel, `brand` tinted with the brand color, `outline` bordered. |
| `layout` | `InlineCTALayout` | horizontal | `horizontal` (default) puts actions at the end; `stacked` puts them under the text. Narrow screens always stack. |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | 3 | Heading level for the title. Default 3. |

## Guidelines
- Do: Use one InlineCTA per screen. Don’t: Stack several calls to action on the same page. Why: Competing offers dilute each other.
- Do: Pair one primary button with an optional secondary. Don’t: Add three or more actions. Why: A single clear next step converts better.
- Do: Use brand appearance for upgrades and new features. Don’t: Use the CTA to report errors. Why: Status messages belong in an Alert so they are announced and colored by tone.

## Content
- Write the title as the benefit or the action: "Invite your team".
- Use a verb on the primary button that matches the title.
- Keep the description to two lines.

## Accessibility
- Role: region-less section with a real heading, so it appears in the heading outline.
- Tab: Moves through the actions.
- `aria-hidden`: On the icon, which is decorative.
- Focus: Only the actions take focus.
- WCAG 1.3.1 Info and Relationships: The title is a heading at a configurable level.
- WCAG 1.4.3 Contrast: Text passes AA on every appearance in every theme.
- WCAG 1.4.10 Reflow: Actions wrap under the text at narrow widths.
- Use Buttons or Links for actions so they keep their own focus and states.

## Examples
### Invite your team
Subtle, with an icon and two actions.

```tsx
import { Button, InlineCTA } from '@ds/react';
import { Users } from 'lucide-react';

<InlineCTA
  icon={<Users />}
  title="Invite your team"
  description="Projects move faster together. Invite up to 5 people for free."
  actions={<><Button variant="secondary" appearance="outline">Later</Button><Button>Invite</Button></>}
/>
```

### Upgrade
Brand-tinted for an upgrade offer.

```tsx
import { Button, InlineCTA } from '@ds/react';

<InlineCTA appearance="brand" title="Unlock advanced reports" actions={<Button>Upgrade</Button>} />
```

### In a sidebar
Stacked layout for narrow columns.

```tsx
import { Button, InlineCTA } from '@ds/react';

<InlineCTA layout="stacked" appearance="outline" title="Need help?" description="Our team replies within an hour." actions={<Button>Contact support</Button>} />
```

Tokens: `--inline-cta-*` (values per theme in ai/components/inline-cta.json).
