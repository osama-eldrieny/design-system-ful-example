import designSystem from './packages/lint/stylelint/index.js';

// Component stylesheets written before the token rule existed. Phase 3 migrates each one to
// its own component tokens; remove a file from this list once it passes. Don't add to it.
export default {
  extends: ['stylelint-config-standard'],
  plugins: designSystem,
  ignoreFiles: ['site/**', '**/dist/**', '**/node_modules/**'],
  rules: {
    // Components use BEM: block, block__element, block--modifier.
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)*$',
      { message: 'Use BEM class names (block__element--modifier)' },
    ],
    // Kebab-case custom properties; a leading underscore marks a component's private helper.
    'custom-property-pattern': [
      '^_?[a-z0-9]+(-[a-z0-9]+)*$',
      { message: 'Use kebab-case custom properties (--_name for private helpers)' },
    ],
    // Variant/state selectors are grouped per component, not ordered by specificity.
    'no-descending-specificity': null,
  },
  overrides: [
    {
      // Every component stylesheet uses only its own component tokens.
      files: ['packages/react/src/**/*.css'],
      rules: {
        'ds/component-tokens-only': [
          true,
          {
            // Components whose token prefix differs from the file name.
            prefixes: {
              Alert: ['alerts'],
              AppsNotifications: ['app-notifications'],
              Dropdown: ['menu'],
              DropdownMenu: ['menu'],
              ProductCard: ['card'],
              RadioButton: ['radio'],
              RadioGroup: ['radio'],
            },
          },
        ],
      },
    },
  ],
};
