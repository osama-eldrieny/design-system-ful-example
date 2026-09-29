/**
 * eslint-plugin-ds: keeps app code on the design system.
 *
 *   ds/no-raw-element          use <Button> from @ds/react, not <button> (and similar)
 *   ds/valid-props             only documented prop values, e.g. variant="primary"
 *   ds/require-accessible-name controls without a visible label need aria-label
 *   ds/no-deprecated           don't use deprecated components
 *   ds/no-raw-style-values     no hex colors or px values in style={{…}}; use tokens
 *
 * Component data (props and allowed values) is generated from the component contracts
 * by `npm run ai` into components.json next to this file.
 */
import components from './components.json' with { type: 'json' };
const SOURCE = '@ds/react';

/** Local JSX names imported from @ds/react, mapped to the component they import. */
const trackImports = () => {
  const names = new Map();
  return {
    names,
    ImportDeclaration(node) {
      if (node.source.value !== SOURCE) return;
      for (const s of node.specifiers) {
        if (s.type === 'ImportSpecifier') names.set(s.local.name, s.imported.name);
      }
    },
  };
};

const jsxName = (node) => (node.name.type === 'JSXIdentifier' ? node.name.name : null);
const attr = (node, name) =>
  node.attributes.find((a) => a.type === 'JSXAttribute' && a.name.name === name);
const stringValue = (a) => {
  if (!a?.value) return undefined;
  if (a.value.type === 'Literal') return typeof a.value.value === 'string' ? a.value.value : undefined;
  if (a.value.type === 'JSXExpressionContainer' && a.value.expression.type === 'Literal')
    return typeof a.value.expression.value === 'string' ? a.value.expression.value : undefined;
  return undefined;
};

const RAW = {
  button: 'Button (or IconButton)',
  textarea: 'Textarea',
  select: 'Select',
  table: 'Table',
  hr: 'Divider',
  progress: 'Progress',
  dialog: 'Modal',
  a: 'Link',
};
const INPUTS = {
  checkbox: 'Checkbox',
  radio: 'RadioGroup',
  range: 'Slider',
  search: 'SearchField',
  text: 'InputField',
  email: 'InputField',
  password: 'InputField',
  number: 'InputField',
  tel: 'InputField',
  url: 'InputField',
};

const noRawElement = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Use design-system components instead of raw HTML controls.' },
    messages: { raw: 'Use <{{component}}> from @ds/react instead of <{{element}}>.' },
    schema: [{ type: 'object', properties: { allow: { type: 'array', items: { type: 'string' } } } }],
  },
  create(context) {
    const allow = new Set(context.options[0]?.allow ?? []);
    return {
      JSXOpeningElement(node) {
        const name = jsxName(node);
        if (!name || allow.has(name)) return;
        let component = RAW[name];
        if (name === 'input') {
          const type = stringValue(attr(node, 'type')) ?? 'text';
          if (type === 'hidden') return;
          component = INPUTS[type];
        }
        if (component) context.report({ node, messageId: 'raw', data: { component, element: name } });
      },
    };
  },
};

const validProps = {
  meta: {
    type: 'problem',
    docs: { description: 'Only documented values for design-system props.' },
    messages: { value: '{{component}} {{prop}}="{{value}}" is not documented. Use one of: {{allowed}}.' },
    schema: [],
  },
  create(context) {
    const imports = trackImports();
    return {
      ImportDeclaration: imports.ImportDeclaration,
      JSXOpeningElement(node) {
        const name = jsxName(node);
        const component = name && imports.names.get(name);
        const data = component && components[component];
        if (!data) return;
        for (const a of node.attributes) {
          if (a.type !== 'JSXAttribute') continue;
          const allowed = data.props[a.name.name];
          const value = stringValue(a);
          if (!allowed || value === undefined || allowed.includes(value)) continue;
          context.report({
            node: a,
            messageId: 'value',
            data: { component, prop: a.name.name, value, allowed: allowed.join(', ') },
          });
        }
      },
    };
  },
};

/** Component → props of which at least one must name it. */
const NAMED_BY = {
  Checkbox: ['label', 'aria-label', 'aria-labelledby'],
  Switch: ['label', 'aria-label', 'aria-labelledby'],
  IconButton: ['label'],
  PopoverContent: ['title', 'aria-label', 'aria-labelledby'],
  ChooseCardGroup: ['aria-label', 'aria-labelledby'],
  Avatar: ['name'],
};

const requireAccessibleName = {
  meta: {
    type: 'problem',
    docs: { description: 'Design-system controls need an accessible name.' },
    messages: { missing: '<{{component}}> needs one of: {{props}}.' },
    schema: [],
  },
  create(context) {
    const imports = trackImports();
    return {
      ImportDeclaration: imports.ImportDeclaration,
      JSXOpeningElement(node) {
        const name = jsxName(node);
        const component = name && imports.names.get(name);
        const props = component && NAMED_BY[component];
        if (!props) return;
        if (node.attributes.some((a) => a.type === 'JSXSpreadAttribute')) return;
        if (props.some((p) => attr(node, p))) return;
        context.report({ node, messageId: 'missing', data: { component, props: props.join(', ') } });
      },
    };
  },
};

const noDeprecated = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Don’t use deprecated design-system components.' },
    messages: { deprecated: '{{component}} is deprecated. See its changelog for the replacement.' },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value !== SOURCE) return;
        for (const s of node.specifiers) {
          if (s.type === 'ImportSpecifier' && components[s.imported.name]?.status === 'deprecated') {
            context.report({ node: s, messageId: 'deprecated', data: { component: s.imported.name } });
          }
        }
      },
    };
  },
};

const RAW_COLOR = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|oklch)\(/i;
const RAW_LENGTH = /(?<![\w-])\d*\.?\d+(?:px|rem|em)\b/;
const LENGTH_PROPS = /^(margin|padding|gap|rowGap|columnGap|top|right|bottom|left|inset|width|height|minWidth|maxWidth|minHeight|maxHeight|inlineSize|blockSize|borderRadius|fontSize|lineHeight)/;

const noRawStyleValues = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Use design tokens in inline styles, not raw colors or lengths.' },
    messages: {
      color: 'Raw color "{{value}}" in style. Use a token, e.g. var(--color-fg-on-surface-primary).',
      length: 'Raw length "{{value}}" in style. Use a token, e.g. var(--spacing-md), or a layout component.',
    },
    schema: [],
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== 'style' || node.value?.type !== 'JSXExpressionContainer') return;
        const object = node.value.expression;
        if (object.type !== 'ObjectExpression') return;
        for (const p of object.properties) {
          if (p.type !== 'Property' || p.value.type !== 'Literal') continue;
          const key = p.key.name ?? p.key.value;
          const v = p.value.value;
          if (typeof v === 'string' && RAW_COLOR.test(v)) {
            context.report({ node: p, messageId: 'color', data: { value: v } });
          } else if (typeof v === 'string' && RAW_LENGTH.test(v)) {
            context.report({ node: p, messageId: 'length', data: { value: v } });
          } else if (typeof v === 'number' && v !== 0 && LENGTH_PROPS.test(String(key))) {
            context.report({ node: p, messageId: 'length', data: { value: `${v}px` } });
          }
        }
      },
    };
  },
};

const plugin = {
  meta: { name: 'eslint-plugin-ds', version: '0.1.0' },
  rules: {
    'no-raw-element': noRawElement,
    'valid-props': validProps,
    'require-accessible-name': requireAccessibleName,
    'no-deprecated': noDeprecated,
    'no-raw-style-values': noRawStyleValues,
  },
};

/** Flat config for apps using the design system. */
plugin.configs = {
  recommended: {
    plugins: { ds: plugin },
    rules: {
      'ds/no-raw-element': 'error',
      'ds/valid-props': 'error',
      'ds/require-accessible-name': 'error',
      'ds/no-deprecated': 'warn',
      'ds/no-raw-style-values': 'warn',
    },
  },
};

export default plugin;
