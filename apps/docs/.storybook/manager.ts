import { addons } from 'storybook/manager-api';
import { docsTheme } from './docs-theme';

addons.setConfig({
  theme: docsTheme(),
  sidebar: { showRoots: true },
});

// Storybook titles each tab "<page> ⋅ Storybook"; show the design system's name instead.
const NAME = 'Panda Design System';
const retitle = () => {
  if (document.title.endsWith(NAME)) return;
  const page = document.title.replace(/\s*[⋅·-]\s*Storybook$/i, '').trim();
  const next = !page || /^storybook$/i.test(page) ? NAME : `${page} · ${NAME}`;
  if (document.title !== next) document.title = next;
};
retitle();
new MutationObserver(retitle).observe(document.querySelector('title') ?? document.head, {
  childList: true,
  subtree: true,
  characterData: true,
});
