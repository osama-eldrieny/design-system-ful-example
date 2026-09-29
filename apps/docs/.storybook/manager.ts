import { addons } from 'storybook/manager-api';
import { docsTheme } from './docs-theme';

addons.setConfig({
  theme: docsTheme(),
  sidebar: { showRoots: true },
});
