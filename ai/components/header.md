# Header

> A page header that introduces a person and their page: avatar, name, job title and the page heading. Use it at the top of portfolio, profile or “about” pages.

Status: stable · Category: Patterns · Since 0.2.0

```tsx
import { Header } from '@ds/react';
```

## When to use
- At the top of a portfolio, profile or personal page.

## When not to use
- For the site’s navigation. Use Navbar.
- For a person in a list or card. Use Avatar with text.
- For a page not about a person. Use A plain h1.

## Heading level (`headingAs`)
- `h1`: Default: the header opens the page.
- `h2`: When the page already has an h1.
- `h3`: Inside a nested section.

## States
- **Default**: Static content. (—)

## Props
### Header

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` |  | The person's full name. Also gives the avatar its initials. |
| `jobTitle` | `ReactNode` |  | Their role or job title, e.g. "Design System Designer". |
| `heading` | `ReactNode` |  | The page heading under the person, e.g. the project's name. |
| `avatar` | `string` |  | Photo URL. Without it, initials show. |
| `headingAs` | `"h1" \| "h2" \| "h3"` | h1 | Heading level. Default h1, since this usually opens the page. |

## Guidelines
- Do: Keep one h1 per page: the Header’s heading or the page’s own, not both. Don’t: Leave headingAs at h1 when the page already has one. Why: One h1 gives screen reader users a clear starting point.
- Do: Pass the real name, even with a photo. Don’t: Pass a placeholder name. Why: The name gives the fallback initials and is the visible identity.
- Do: Use it once at the top. Don’t: Repeat it in each section. Why: It is the page’s banner landmark.

## Content
- Name: as the person writes it.
- Heading: what the page is about, e.g. the project name, in a few words.

## Accessibility
- Role: banner landmark (header) at the top level, with a heading.
- —: Not interactive.
- `aria-hidden avatar`: Always: the name follows it.
- Focus: None.
- WCAG 1.3.1 Info and Relationships: header landmark and a real heading.
- WCAG 2.4.6 Headings and Labels: The page heading describes the page.

## Examples
### Profile header
Photo, name, job title and page heading.

```tsx
import { Header } from '@ds/react';

<Header
  avatar="/me.png"
  name="Osama Eldrieny"
  jobTitle="Design System Designer"
  heading="Multi-theme design system"
/>
```

### Without a photo
Initials from the name.

```tsx
import { Header } from '@ds/react';

<Header name="Sarah Chen" jobTitle="Head of Products" heading="Portfolio" />
```

### Below an existing h1
Lower the heading level.

```tsx
import { Header } from '@ds/react';

<Header name="Sarah Chen" heading="About me" headingAs="h2" />
```

Tokens: `--header-*` (values per theme in ai/components/header.json).
