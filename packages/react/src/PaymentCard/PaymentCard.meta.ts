import { defineMeta } from '../meta';

export default defineMeta({
  id: 'payment-card',
  name: 'PaymentCard',
  category: 'Data display',
  status: 'stable',
  since: '1.3.0',
  description:
    'An illustration of a payment card with the holder’s name, expiry and the last four digits. It never shows the full card number.',
  imports: [{ name: 'PaymentCard', from: '@ds/react' }],
  whenToUse: [
    'To show a saved payment method in billing or checkout, e.g. "Visa ending in 1234".',
    'To preview the card a person is about to add.',
  ],
  whenNotToUse: [
    { text: 'To list many payment methods in rows.', alternative: 'ChooseCard' },
    { text: 'To collect card details.', alternative: 'InputField' },
  ],
  anatomy: [
    { name: 'Brand', description: 'The card network or issuer name.' },
    { name: 'Chip and contactless', description: 'Decorative card features.' },
    { name: 'Number', description: 'The last four digits only.' },
    { name: 'Holder and expiry', description: 'The name on the card and its expiry.' },
  ],
  options: [
    {
      prop: 'tone',
      title: 'Colour',
      values: [
        { value: 'brand', meaning: 'Default. Brand gradient, for the primary card.' },
        { value: 'dark', meaning: 'Dark, for a second card or a premium look.' },
        { value: 'light', meaning: 'Light with a border, for dense or light layouts.' },
      ],
    },
    {
      prop: 'size',
      title: 'Size',
      values: [
        { value: 'medium', meaning: 'Default. Billing and checkout.' },
        { value: 'small', meaning: 'Lists and side panels.' },
      ],
    },
  ],
  states: [{ name: 'Static', meaning: 'A picture of a card; it is not interactive.', trigger: '—' }],
  behavior: [
    { topic: 'Privacy', text: 'Only the last four digits are shown; the rest of the number is never rendered.' },
    { topic: 'Read-out', text: 'The whole card reads as one image: brand, last four digits, holder and expiry.' },
  ],
  content: [
    'Show the card network and the last four digits, e.g. "Visa ending in 1234".',
    'Show the expiry as MM/YY.',
  ],
  guidelines: [
    {
      do: 'Show only the last four digits.',
      dont: 'Show or store the full card number on a page.',
      why: 'Full card numbers are sensitive; showing the last four is enough to identify a card.',
    },
    {
      do: 'Pair the card with actions such as "Make default" or "Remove" nearby.',
      dont: 'Use the card as a button.',
      why: 'The card is a picture; the actions around it do the work.',
    },
    {
      do: 'Use the small size in lists.',
      dont: 'Shrink the medium card until its text is unreadable.',
      why: 'Small cards keep their text readable at narrow widths.',
    },
  ],
  accessibility: {
    role: 'img with a label describing the card.',
    keyboard: [{ keys: '—', action: 'No keyboard interaction; use the controls inside, if any.' }],
    aria: [{ attribute: 'aria-label', when: 'Names the card: brand, last four digits, holder and expiry.' }],
    focus: 'Not focusable; the actions beside it take focus.',
    wcag: [
      { criterion: '1.1.1 Non-text Content', how: 'The card is an image with a full text label.' },
      { criterion: '1.4.3 Contrast', how: 'Card text passes AA on every colour in every theme.' },
    ],
    notes: ['The visible text inside the card is hidden from assistive technology to avoid repeating the label.'],
  },
  examples: [
    {
      id: 'billing',
      title: 'Saved card',
      description: 'The default card in billing.',
      code: `import { PaymentCard } from '@ds/react';

<PaymentCard holder="Maya Okafor" last4="1234" expiry="06/28" brand="Orbit" />`,
    },
    {
      id: 'dark',
      title: 'Dark card',
      description: 'A dark card for a second payment method.',
      code: `import { PaymentCard } from '@ds/react';

<PaymentCard tone="dark" holder="Maya Okafor" last4="9911" expiry="11/27" brand="Visa" />`,
    },
    {
      id: 'list',
      title: 'Small in a list',
      description: 'The small size beside its actions.',
      code: `import { PaymentCard } from '@ds/react';

<PaymentCard size="small" tone="light" holder="Maya Okafor" last4="4242" expiry="02/29" brand="Mastercard" />`,
    },
  ],
  tokenPrefixes: ['--payment-card-'],
  related: [
    { id: 'choose-card', relation: 'For choosing between payment methods.' },
    { id: 'description-list', relation: 'For the details of a payment.' },
  ],
  changelog: [{ version: '1.3.0', date: '2026-10-15', changes: ['New component.'] }],
});
