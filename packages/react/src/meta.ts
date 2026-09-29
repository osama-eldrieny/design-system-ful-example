/**
 * Component metadata: the single source for each component's documentation page and its
 * AI files (ai/components/{id}.json|md, llms.txt, MCP answers). Written next to the
 * component as {Component}.meta.ts and validated against this schema in tests.
 */
import { z } from 'zod';

const text = z.string().min(1);

export const componentMetaSchema = z.object({
  /** Stable kebab-case id, e.g. "button". Used in URLs, file names and AI lookups. */
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  /** Display name, e.g. "Button". */
  name: text,
  category: z.enum([
    'Actions',
    'Forms',
    'Feedback',
    'Overlays',
    'Navigation',
    'Data display',
    'Layout',
    'Patterns',
  ]),
  status: z.enum(['stable', 'beta', 'experimental', 'deprecated']),
  /** Library version the component (in its current form) shipped in. */
  since: text,
  /** One-paragraph purpose, written for someone deciding whether to use it. */
  description: text,
  /** What to import. */
  imports: z.array(z.object({ name: text, from: text })).min(1),
  whenToUse: z.array(text).min(1),
  whenNotToUse: z.array(z.object({ text, alternative: text.optional() })).min(1),
  /** Named parts, numbered in the anatomy diagram in this order. */
  anatomy: z
    .array(z.object({ name: text, description: text, optional: z.boolean().optional() }))
    .min(1),
  /** Each enumerated prop and what every value means. */
  options: z
    .array(
      z.object({
        prop: text,
        title: text,
        values: z.array(z.object({ value: text, meaning: text })).min(1),
      }),
    )
    .min(1),
  states: z.array(z.object({ name: text, meaning: text, trigger: text })).min(1),
  behavior: z.array(z.object({ topic: text, text })),
  content: z.array(text).min(1),
  guidelines: z
    .array(z.object({ do: text, dont: text, why: text }))
    .min(3, 'Give at least three do/don’t pairs, each with a why.'),
  accessibility: z.object({
    role: text,
    keyboard: z.array(z.object({ keys: text, action: text })).min(1),
    aria: z.array(z.object({ attribute: text, when: text })),
    focus: text,
    wcag: z.array(z.object({ criterion: text, how: text })).min(1),
    notes: z.array(text),
  }),
  /** Runnable examples (JSX). The first one is the quick-start example. */
  examples: z
    .array(z.object({ id: text, title: text, description: text, code: text }))
    .min(3, 'Give at least three runnable examples.'),
  /** Token prefix(es) this component is styled with, e.g. "--button-". */
  tokenPrefixes: z.array(z.string().regex(/^--[a-z0-9-]+-$/)).min(1),
  related: z.array(z.object({ id: text, relation: text })),
  changelog: z.array(z.object({ version: text, date: text, changes: z.array(text).min(1) })).min(1),
});

export type ComponentMeta = z.infer<typeof componentMetaSchema>;

/** Typed helper for writing a {Component}.meta.ts file. */
export const defineMeta = <const M extends ComponentMeta>(meta: M): M => meta;

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Storybook id of a component's docs page, e.g. "components-actions-button--docs" or
 * "patterns-productcard--docs". Mirrors the story titles: Components/{category}/{name}
 * and Patterns/{name}.
 */
export const docsId = (meta: Pick<ComponentMeta, 'name' | 'category'>) =>
  meta.category === 'Patterns'
    ? `patterns-${slug(meta.name)}--docs`
    : `components-${slug(meta.category)}-${slug(meta.name)}--docs`;
