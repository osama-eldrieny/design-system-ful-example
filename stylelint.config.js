export default {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['legacy/**', 'site/**', '**/dist/**', '**/node_modules/**'],
  rules: {
    // Components use BEM: block, block__element, block--modifier.
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)*$',
      { message: 'Use BEM class names (block__element--modifier)' },
    ],
    // Variant/state selectors are grouped per component, not ordered by specificity.
    'no-descending-specificity': null,
  },
};
