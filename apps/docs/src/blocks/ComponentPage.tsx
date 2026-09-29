import type { ComponentType, ReactNode } from 'react';
import { ArgTypes, Canvas, Controls, Heading, Subheading } from '@storybook/addon-docs/blocks';
import type { ComponentMeta } from '../../../../packages/react/src/meta';
import { Accessibility } from './Accessibility';
import { Anatomy, type AnatomyTarget } from './Anatomy';
import {
  Behavior,
  Changelog,
  ComponentHeader,
  ContentGuidelines,
  DoDont,
  Examples,
  OptionTable,
  Related,
  StatesTable,
  WhenToUse,
} from './Guidance';
import { ThemeBar } from './ThemeBar';
import { ThemeMatrix } from './ThemeMatrix';
import { TokenTable } from './TokenTable';

// A CSF story export (kept loose: blocks only pass it through to Canvas/Controls).
type StoryExport = Parameters<typeof Canvas>[0]['of'];

export interface ComponentPageProps {
  meta: ComponentMeta;
  /** The stories module: `import * as Stories from '…/X.stories'`. */
  stories: Record<string, unknown>;
  /** Components whose props are documented in the API reference. */
  components: ComponentType<never>[];
  /** Numbered live example. Leave out for overlays that can't render inline: parts table only. */
  anatomy?: { targets: AnatomyTarget[]; example: ReactNode };
  /** For each option in meta.options, the story that shows its values. */
  optionStories?: Record<string, string>;
  /** Extra examples shown after the options, e.g. "With icons". */
  extras?: { title: string; story: string; text?: string }[];
  /** Story forcing hover/focus/pressed side by side. */
  statesStory?: string;
  /** Story shown with behavior, e.g. right-to-left. */
  behaviorStory?: string;
  dodont?: Record<number, { do: ReactNode; dont: ReactNode }>;
  /**
   * Rendered once per brand × mode in the theme matrix. Leave out for overlays that can't
   * render inline; the page then points to the AllThemes test story.
   */
  matrix?: ReactNode;
  statesText?: string;
}

const story = (stories: Record<string, unknown>, name?: string) =>
  name && stories[name] ? (stories[name] as StoryExport) : undefined;

/**
 * The standard component page: the same 18 sections, in the same order, for every
 * component. Content comes from {Component}.meta.ts and the component's stories.
 */
export function ComponentPage({
  meta,
  stories,
  components,
  anatomy,
  optionStories = {},
  extras = [],
  statesStory = 'States',
  behaviorStory,
  dodont,
  matrix,
  statesText = 'Hover, focus and pressed are real browser states (:hover, :focus-visible, :active), not props. This example forces them so you can compare them side by side.',
}: ComponentPageProps) {
  const playground = story(stories, 'Playground');
  const states = story(stories, statesStory);
  const behavior = story(stories, behaviorStory);
  return (
    <>
      <ComponentHeader meta={meta} />
      <ThemeBar />

      {playground && (
        <>
          <Heading>Playground</Heading>
          <Canvas of={playground} />
          <Controls of={playground} />
        </>
      )}

      <Heading>Overview</Heading>
      <WhenToUse meta={meta} />

      <Heading>Anatomy</Heading>
      <Anatomy meta={meta} targets={anatomy?.targets ?? []}>
        {anatomy?.example}
      </Anatomy>

      {meta.options.map((option) => {
        const s = story(stories, optionStories[option.prop]);
        return (
          <div key={option.prop}>
            <Heading>{option.title}</Heading>
            {s && <Canvas of={s} />}
            <OptionTable meta={meta} prop={option.prop} />
          </div>
        );
      })}

      {extras.map((extra) => {
        const s = story(stories, extra.story);
        return s ? (
          <div key={extra.story}>
            <Subheading>{extra.title}</Subheading>
            {extra.text && <p>{extra.text}</p>}
            <Canvas of={s} />
          </div>
        ) : null;
      })}

      <Heading>States</Heading>
      {states && (
        <>
          <p>{statesText}</p>
          <Canvas of={states} />
        </>
      )}
      <StatesTable meta={meta} />

      <Heading>Behavior</Heading>
      <Behavior meta={meta} />
      {behavior && <Canvas of={behavior} />}

      <Heading>Content guidelines</Heading>
      <ContentGuidelines meta={meta} />

      <Heading>Do and don’t</Heading>
      <DoDont meta={meta} visuals={dodont} />

      <Heading>Accessibility</Heading>
      <Accessibility meta={meta} />

      <Heading>Design tokens</Heading>
      <p>
        {meta.name} is styled only with these tokens. Values follow the theme picked above or in the
        toolbar.
      </p>
      <TokenTable prefixes={meta.tokenPrefixes} />

      <Heading>API reference</Heading>
      {components.map((c) => (
        <div key={(c as { displayName?: string }).displayName}>
          {components.length > 1 && (
            <Subheading>{(c as { displayName?: string }).displayName}</Subheading>
          )}
          <ArgTypes of={c} />
        </div>
      ))}

      <Heading>Code examples</Heading>
      <Examples meta={meta} />

      <Heading>Theme matrix</Heading>
      {matrix ? (
        <>
          <p>Every variant in each brand and mode.</p>
          <ThemeMatrix>{matrix}</ThemeMatrix>
        </>
      ) : (
        <p>
          This component opens over the page, so it can’t be shown inline here. Its AllThemes test
          story renders it in every brand and mode and checks each with axe.
        </p>
      )}

      <Heading>Related components</Heading>
      <Related meta={meta} />

      <Heading>Changelog</Heading>
      <Changelog meta={meta} />
    </>
  );
}
