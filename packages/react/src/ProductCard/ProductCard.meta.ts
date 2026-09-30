import { defineMeta } from '../meta';

export default defineMeta({
  id: 'product-card',
  name: 'ProductCard',
  category: 'Patterns',
  status: 'stable',
  since: '0.2.0',
  description:
    'A product card shows one product in a grid or list: photo, name, short description, rating and price, with an optional sale price and actions. It is built from Card.',
  imports: [{ name: 'ProductCard', from: '@ds/react' }],
  whenToUse: ['In product grids and lists: catalogs, search results, recommendations.'],
  whenNotToUse: [
    { text: 'For the full product page.', alternative: 'A page layout with the product details' },
    { text: 'For non-product content.', alternative: 'Card' },
  ],
  anatomy: [
    { name: 'Photo', description: 'Product image; the theme’s placeholder shows without one.' },
    { name: 'Name', description: 'The product name; the link in a clickable card.' },
    { name: 'Rating', description: 'Stars plus review count, announced in words.', optional: true },
    { name: 'Price', description: 'Current price in the brand color.' },
    { name: 'Old price', description: 'Crossed out and announced as “was”.', optional: true },
  ],
  options: [
    {
      prop: 'appearance',
      title: 'Appearance',
      values: [
        { value: 'elevated', meaning: 'Default, as Card.' },
        { value: 'outlined', meaning: 'As Card.' },
        { value: 'filled', meaning: 'As Card.' },
      ],
    },
  ],
  states: [
    { name: 'Default', meaning: 'At rest.', trigger: '—' },
    { name: 'On sale', meaning: 'Has a lower current price.', trigger: 'oldPrice is set.' },
    {
      name: 'Hover / focus',
      meaning: 'Clickable product cards highlight.',
      trigger: 'href is set.',
    },
  ],
  behavior: [
    {
      topic: 'Rating',
      text: 'rating (0–5) is rounded to whole stars visually and announced exactly: “Rated 4.5 out of 5, 2,342 reviews”.',
    },
    {
      topic: 'Prices',
      text: 'Prices are strings, formatted by your app for its currency and locale.',
    },
    { topic: 'Brands', text: 'Wrap a card in ThemeProvider to show it in another brand.' },
  ],
  content: ['Use the product’s real name; keep descriptions to one line in grids.'],
  guidelines: [
    {
      do: 'Show the old price only for real discounts.',
      dont: 'Cross out a made-up “original” price.',
      why: 'Fake discounts erode trust and may break consumer law.',
    },
    {
      do: 'Show ratings with their review count.',
      dont: 'Show stars without saying how many reviews they’re based on.',
      why: 'Five stars from two reviews means little.',
    },
    {
      do: 'Link the whole card to the product page with href.',
      dont: 'Add separate “View” links next to the title.',
      why: 'One link per card keeps keyboard and screen reader navigation short.',
    },
  ],
  accessibility: {
    role: 'article with a heading (Card).',
    keyboard: [{ keys: 'Tab', action: 'Reaches the card link and actions.' }],
    aria: [
      {
        attribute: 'role="img" + aria-label on the stars',
        when: 'Announces the rating and review count.',
      },
      { attribute: '<del> with hidden “Was”', when: 'Announces the old price as “Was $399”.' },
    ],
    focus: 'As Card.',
    wcag: [
      {
        criterion: '1.1.1 Non-text Content',
        how: 'The rating has a text alternative; the photo is decorative next to the name.',
      },
      {
        criterion: '1.4.1 Use of Color',
        how: 'The old price is struck through, not only colored.',
      },
      { criterion: '1.4.3 Contrast (Minimum)', how: 'All text passes 4.5:1 in every theme.' },
    ],
    notes: [],
  },
  examples: [
    {
      id: 'basic',
      title: 'Product',
      description: 'A product on sale with a rating.',
      code: `import { ProductCard } from '@ds/react';

<ProductCard
  title="Wireless headphones"
  description="Noise cancelling, 30-hour battery"
  imageUrl="/products/headphones.png"
  price="$299"
  oldPrice="$399"
  rating={4.5}
  reviews="2,342 reviews"
  href="/products/headphones"
/>`,
    },
    {
      id: 'actions',
      title: 'With an action',
      description: 'An add-to-cart button in the footer.',
      code: `import { ProductCard, Button } from '@ds/react';

<ProductCard title="Smart watch" price="$199" actions={<Button size="small">Add to cart</Button>} />`,
    },
    {
      id: 'brand',
      title: 'In another brand',
      description: 'Scope a theme to one card.',
      code: `import { ProductCard, ThemeProvider } from '@ds/react';

<ThemeProvider theme={{ brand: 'amber' }}>
  <ProductCard title="Leather bag" price="$149" />
</ThemeProvider>`,
    },
  ],
  tokenPrefixes: ['--card-'],
  related: [{ id: 'card', relation: 'The container ProductCard is built from.' }],
  changelog: [
    {
      version: '0.2.0',
      date: '2026-09-29',
      changes: [
        'Split from the old Card: rating in words, old price announced as “was”, themed via ThemeProvider instead of hard-coded brand colors.',
      ],
    },
    {
      version: '1.1.0',
      date: '2026-09-30',
      changes: [
        'Rating now sits above the title; the price and the action share the last row (price at the start, action at the end).',
        'Keeps a steady width (--card-product-max-width) instead of stretching across wide columns.',
        'The old price sits under the price, so the action always stays on the same row.',
      ],
    },
  ],
});
