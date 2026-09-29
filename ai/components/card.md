# Card

> A card groups content and actions about one subject, such as an article, a product or a person, into a single container. It can hold media, a title, text and actions, and can link to a detail page.

Status: stable · Category: Data display · Since 0.2.0

```tsx
import { Card } from '@ds/react';
import { CardMedia } from '@ds/react';
import { CardBody } from '@ds/react';
import { CardTitle } from '@ds/react';
import { CardDescription } from '@ds/react';
import { CardFooter } from '@ds/react';
```

## When to use
- To show a collection of similar items people scan and compare, e.g. products or articles in a grid.
- To group a summary and its actions, linking to a detail page.

## When not to use
- To lay out a whole page section. Use A section or Stack.
- For rows of data people compare column by column. Use Table.
- For a single message or status. Use Alert.

## Appearance (`appearance`)
- `elevated`: Shadow from the shadow theme. Default on page backgrounds.
- `outlined`: Border instead of shadow, for dense layouts and flat themes.
- `filled`: Tinted background, for grouping inside another surface.

## Orientation (`orientation`)
- `vertical`: Media above the body. Default for grids.
- `horizontal`: Media beside the body, for lists.

## States
- **Default**: At rest. (—)
- **Hover**: A clickable card highlights its border. (:hover on a card with href.)
- **Focus**: The whole card shows the focus ring when its link has focus. (:focus-within.)

## Props
### Card

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `appearance` | `CardAppearance` | elevated | `elevated` (default) lifts the card with the shadow theme, `outlined` draws a border for dense layouts, `filled` tints it for grouping inside a surface. |
| `orientation` | `CardOrientation` | vertical | `vertical` stacks media above the body; `horizontal` puts media beside it. |
| `href` | `string` |  | Makes the whole card a link to this URL. The CardTitle becomes the link, and its hit area covers the card, so there's one clear, accessible target. |
| `as` | `ElementType` | h3 | Element to render: `article` (default) for standalone content, `div` or `li` otherwise. |

### CardMedia

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `alt` | `string` |  | Describes the image. Use an empty string when the image is decorative, e.g. when the title already says what it shows. |

### CardBody

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### CardTitle

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `as` | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"` | h3 | Heading level that fits the page outline. Default h3. |

### CardDescription

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

### CardFooter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |

## Guidelines
- Do: Make the whole card clickable with href when it leads to one place. Don’t: Nest several links that all go to the same page. Why: Repeated links add Tab stops and noise for screen readers.
- Do: Keep cards in a grid consistent: same parts, same order. Don’t: Mix cards with and without media in one row. Why: Consistent cards are easier to scan and compare.
- Do: Use outlined cards when the shadow theme is flat. Don’t: Place flat, borderless cards on a background of the same color. Why: Without a shadow or border the card’s edges disappear.

## Content
- Keep titles short and front-load the important words.
- Keep descriptions to one or two lines in grids so cards stay the same height.

## Accessibility
- Role: article by default (or the element you choose with as).
- Tab: Reaches the card link (with href) and any footer actions.
- Enter: Follows the card link.
- `none needed`: The heading and link give the card its name.
- Focus: In a clickable card, the focus ring surrounds the whole card.
- WCAG 1.3.1 Info and Relationships: Cards use real headings and an article element.
- WCAG 2.4.4 Link Purpose: The card link is named by its title.
- WCAG 1.1.1 Non-text Content: CardMedia requires alt (empty when decorative).
- Avoid making a card clickable and also putting other links in its body.

## Examples
### Article card
Media, title and description.

```tsx
import { Card, CardMedia, CardBody, CardTitle, CardDescription } from '@ds/react';

<Card>
  <CardMedia src="/covers/tokens.png" alt="" />
  <CardBody>
    <CardTitle>Design tokens in practice</CardTitle>
    <CardDescription>How one CSS file themes three brands.</CardDescription>
  </CardBody>
</Card>
```

### Clickable card
The whole card links to the article.

```tsx
import { Card, CardBody, CardTitle, CardDescription } from '@ds/react';

<Card href="/articles/tokens" appearance="outlined">
  <CardBody>
    <CardTitle>Design tokens in practice</CardTitle>
    <CardDescription>8 min read</CardDescription>
  </CardBody>
</Card>
```

### With actions
Footer actions stay separate from the card.

```tsx
import { Card, CardBody, CardTitle, CardFooter, Button } from '@ds/react';

<Card>
  <CardBody>
    <CardTitle>Pro plan</CardTitle>
  </CardBody>
  <CardFooter>
    <Button size="small">Upgrade</Button>
  </CardFooter>
</Card>
```

Tokens: `--card-*` (values per theme in ai/components/card.json).
