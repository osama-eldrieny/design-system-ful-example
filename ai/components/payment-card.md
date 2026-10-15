# PaymentCard

> An illustration of a payment card with the holder’s name, expiry and the last four digits. It never shows the full card number.

Status: stable · Category: Data display · Since 1.3.0

```tsx
import { PaymentCard } from '@ds/react';
```

## When to use
- To show a saved payment method in billing or checkout, e.g. "Visa ending in 1234".
- To preview the card a person is about to add.

## When not to use
- To list many payment methods in rows. Use ChooseCard.
- To collect card details. Use InputField.

## Colour (`tone`)
- `brand`: Default. Brand gradient, for the primary card.
- `dark`: Dark, for a second card or a premium look.
- `light`: Light with a border, for dense or light layouts.

## Size (`size`)
- `medium`: Default. Billing and checkout.
- `small`: Lists and side panels.

## States
- **Static**: A picture of a card; it is not interactive. (—)

## Props
### PaymentCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `holder` | `string` |  | Name on the card, e.g. "Maya Okafor". |
| `last4` | `string` |  | The last four digits, e.g. "1234". The rest is never shown. |
| `expiry` | `string` |  | Expiry as shown on the card, e.g. "06/28". |
| `brand` | `string` | Orbit | Card network or issuer name, e.g. "Orbit". |
| `tone` | `PaymentCardTone` | brand | Colour of the card. Default brand. |
| `size` | `PaymentCardSize` | medium | `medium` (default) in settings and checkout, `small` in lists. |

## Guidelines
- Do: Show only the last four digits. Don’t: Show or store the full card number on a page. Why: Full card numbers are sensitive; showing the last four is enough to identify a card.
- Do: Pair the card with actions such as "Make default" or "Remove" nearby. Don’t: Use the card as a button. Why: The card is a picture; the actions around it do the work.
- Do: Use the small size in lists. Don’t: Shrink the medium card until its text is unreadable. Why: Small cards keep their text readable at narrow widths.

## Content
- Show the card network and the last four digits, e.g. "Visa ending in 1234".
- Show the expiry as MM/YY.

## Accessibility
- Role: img with a label describing the card.
- —: No keyboard interaction; use the controls inside, if any.
- `aria-label`: Names the card: brand, last four digits, holder and expiry.
- Focus: Not focusable; the actions beside it take focus.
- WCAG 1.1.1 Non-text Content: The card is an image with a full text label.
- WCAG 1.4.3 Contrast: Card text passes AA on every colour in every theme.
- The visible text inside the card is hidden from assistive technology to avoid repeating the label.

## Examples
### Saved card
The default card in billing.

```tsx
import { PaymentCard } from '@ds/react';

<PaymentCard holder="Maya Okafor" last4="1234" expiry="06/28" brand="Orbit" />
```

### Dark card
A dark card for a second payment method.

```tsx
import { PaymentCard } from '@ds/react';

<PaymentCard tone="dark" holder="Maya Okafor" last4="9911" expiry="11/27" brand="Visa" />
```

### Small in a list
The small size beside its actions.

```tsx
import { PaymentCard } from '@ds/react';

<PaymentCard size="small" tone="light" holder="Maya Okafor" last4="4242" expiry="02/29" brand="Mastercard" />
```

Tokens: `--payment-card-*` (values per theme in ai/components/payment-card.json).
