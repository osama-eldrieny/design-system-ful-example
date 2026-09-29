import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import plugin from './index.js';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const tester = new RuleTester({
  languageOptions: { ecmaVersion: 2022, sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } },
});
const imp = "import { Button, Checkbox, IconButton } from '@ds/react';\n";

tester.run('no-raw-element', plugin.rules['no-raw-element'], {
  valid: ['<Button>Save</Button>', '<input type="hidden" />', '<div />'],
  invalid: [
    { code: '<button>Save</button>', errors: [{ messageId: 'raw' }] },
    { code: '<input type="checkbox" />', errors: [{ messageId: 'raw' }] },
    { code: '<input />', errors: [{ messageId: 'raw' }] },
  ],
});

tester.run('valid-props', plugin.rules['valid-props'], {
  valid: [imp + '<Button variant="danger" />', imp + '<Button variant={v} />', '<Button variant="nope" />'],
  invalid: [{ code: imp + '<Button variant="destructive" />', errors: [{ messageId: 'value' }] }],
});

tester.run('require-accessible-name', plugin.rules['require-accessible-name'], {
  valid: [imp + '<Checkbox label="Terms" />', imp + '<Checkbox aria-label="Select row" />', imp + '<Checkbox {...p} />'],
  invalid: [
    { code: imp + '<Checkbox />', errors: [{ messageId: 'missing' }] },
    { code: imp + '<IconButton icon={<X />} />', errors: [{ messageId: 'missing' }] },
  ],
});

tester.run('no-raw-style-values', plugin.rules['no-raw-style-values'], {
  valid: ["<div style={{ gap: 'var(--spacing-md)', flex: 1, opacity: 0 }} />"],
  invalid: [
    { code: "<div style={{ color: '#333' }} />", errors: [{ messageId: 'color' }] },
    { code: '<div style={{ padding: 12 }} />', errors: [{ messageId: 'length' }] },
    { code: "<div style={{ margin: '8px 0' }} />", errors: [{ messageId: 'length' }] },
  ],
});
