# ProductCard

> A product card shows one product in a grid or list: photo, name, short description, rating and price, with an optional sale price and actions. It is built from Card.

Status: stable · Category: Patterns · Since 0.2.0

```tsx
import { ProductCard } from '@ds/react';
```

## When to use
- In product grids and lists: catalogs, search results, recommendations.

## When not to use
- For the full product page. Use A page layout with the product details.
- For non-product content. Use Card.

## Appearance (`appearance`)
- `elevated`: Default, as Card.
- `outlined`: As Card.
- `filled`: As Card.

## States
- **Default**: At rest. (—)
- **On sale**: Has a lower current price. (oldPrice is set.)
- **Hover / focus**: Clickable product cards highlight. (href is set.)

## Props
### ProductCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` |  | Product name. |
| `description` | `string` |  | One or two lines about the product. |
| `imageUrl` | `string` |  | Product photo. Without it, the theme's placeholder shows. |
| `price` | `string` |  | Current price, formatted for display, e.g. "$299". |
| `oldPrice` | `string` |  | Previous price, shown crossed out and announced as “was”. |
| `rating` | `number` |  | Average rating from 0 to 5. Shown as stars and announced in words. |
| `reviews` | `string` |  | Review count label, e.g. "2,342 reviews". |
| `actions` | `ReactNode` |  | Buttons such as “Add to cart”. They stay clickable in a card with href. |
| `labels` | `{ rating?: ((rating: number) => string); was?: string; } \| undefined` | {} | Wording for translation. |
| `appearance` | `CardAppearance` |  | `elevated` (default) lifts the card with the shadow theme, `outlined` draws a border for dense layouts, `filled` tints it for grouping inside a surface. |
| `orientation` | `CardOrientation` |  | `vertical` stacks media above the body; `horizontal` puts media beside it. |
| `href` | `string` |  | Makes the whole card a link to this URL. The CardTitle becomes the link, and its hit area covers the card, so there's one clear, accessible target. |
| `as` | `ElementType` |  | Element to render: `article` (default) for standalone content, `div` or `li` otherwise. |

## Guidelines
- Do: Show the old price only for real discounts. Don’t: Cross out a made-up “original” price. Why: Fake discounts erode trust and may break consumer law.
- Do: Show ratings with their review count. Don’t: Show stars without saying how many reviews they’re based on. Why: Five stars from two reviews means little.
- Do: Link the whole card to the product page with href. Don’t: Add separate “View” links next to the title. Why: One link per card keeps keyboard and screen reader navigation short.

## Content
- Use the product’s real name; keep descriptions to one line in grids.

## Accessibility
- Role: article with a heading (Card).
- Tab: Reaches the card link and actions.
- `role="img" + aria-label on the stars`: Announces the rating and review count.
- `<del> with hidden “Was”`: Announces the old price as “Was $399”.
- Focus: As Card.
- WCAG 1.1.1 Non-text Content: The rating has a text alternative; the photo is decorative next to the name.
- WCAG 1.4.1 Use of Color: The old price is struck through, not only colored.
- WCAG 1.4.3 Contrast (Minimum): All text passes 4.5:1 in every theme.

## Examples
### Product
A product on sale with a rating.

```tsx
import { ProductCard } from '@ds/react';

<ProductCard
  title="Wireless headphones"
  description="Noise cancelling, 30-hour battery"
  imageUrl="/products/headphones.png"
  price="$299"
  oldPrice="$399"
  rating={4.5}
  reviews="2,342 reviews"
  href="/products/headphones"
/>
```

### With an action
An add-to-cart button in the footer.

```tsx
import { ProductCard, Button } from '@ds/react';

<ProductCard title="Smart watch" price="$199" actions={<Button size="small">Add to cart</Button>} />
```

### In another brand
Scope a theme to one card.

```tsx
import { ProductCard, ThemeProvider } from '@ds/react';

<ThemeProvider theme={{ brand: 'amber' }}>
  <ProductCard title="Leather bag" price="$149" />
</ThemeProvider>
```

Tokens: `--card-*` (values per theme in ai/components/product-card.json).
