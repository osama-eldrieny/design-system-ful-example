# Footer

> The page footer: a copyright line and secondary links such as Privacy, Terms and Help. It is the page’s content-info landmark.

Status: stable · Category: Patterns · Since 0.2.0

```tsx
import { Footer } from '@ds/react';
```

## When to use
- Once per page, at the bottom, for legal text and secondary links.

## When not to use
- For the main sections of the site. Use Navbar.
- For the end of an article or card. Use CardFooter.

## Link type (`links[].href`)
- `href set`: A link. Use for pages.
- `no href`: A button that runs onClick, e.g. “Cookie settings”.

## States
- **Default**: At rest. (—)
- **Hover**: Darker and underlined. (:hover)
- **Focus**: Focus ring. (:focus-visible)

## Props
### Footer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `ReactNode` |  | The footer line, usually the copyright, e.g. "© 2026 TechHub". |
| `links` | `FooterLink[]` | [] | Secondary links such as Privacy or Terms. |
| `linksLabel` | `string` | Footer | Names the links' navigation landmark. Default "Footer". |

## Guidelines
- Do: Use real links (href) for pages. Don’t: Use buttons that change location in JavaScript. Why: Links can be opened in new tabs and are announced as links.
- Do: Keep footer links secondary. Don’t: Repeat the whole Navbar in the footer. Why: Duplicate navigation adds noise for keyboard and screen reader users.
- Do: Use one Footer per page. Don’t: Add footers to every section. Why: Several contentinfo landmarks confuse landmark navigation.

## Content
- Text: “© 2026 Company”. Use the current year from code, not a hard-coded one.
- Links: short nouns — “Privacy”, “Terms”, “Help”.

## Accessibility
- Role: contentinfo landmark (footer) with a named navigation list.
- Tab / Enter: Reach and follow each link.
- `aria-label on the links’ nav`: From linksLabel; default “Footer”.
- Focus: Each link shows the focus ring.
- WCAG 1.3.1 Info and Relationships: footer + nav + list semantics.
- WCAG 1.4.3 Contrast (Minimum): Text and links pass 4.5:1 in every theme.
- WCAG 2.4.7 Focus Visible: Links show the focus ring.

## Examples
### Footer
Copyright and legal links.

```tsx
import { Footer } from '@ds/react';

<Footer
  title={`© ${new Date().getFullYear()} TechHub`}
  links={[
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Help', href: '/help' },
  ]}
/>
```

### With an in-page action
A link without href becomes a button.

```tsx
import { Footer } from '@ds/react';

<Footer
  title="© 2026 TechHub"
  links={[
    { label: 'Privacy', href: '/privacy' },
    { label: 'Cookie settings', onClick: openCookieSettings },
  ]}
/>
```

### Text only
Without links.

```tsx
import { Footer } from '@ds/react';

<Footer title="© 2026 TechHub" />
```

Tokens: `--footer-*` (values per theme in ai/components/footer.json).
