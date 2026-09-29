import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import ds from './packages/lint/eslint/index.js';

export default tseslint.config(
  { ignores: ['**/dist/**', 'site/**', '**/storybook-static/**', 'coverage/**'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    plugins: { 'react-hooks': reactHooks },
    languageOptions: { globals: globals.browser },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Props destructured only to keep them off the DOM element (e.g. `language` in Logo) are fine.
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    },
  },
  // Apps build UI from the design system: components, documented props, tokens.
  {
    files: ['apps/prototypes/**/*.{ts,tsx}'],
    ...ds.configs.recommended,
  },
  {
    files: ['**/*.{js,mjs}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
);
