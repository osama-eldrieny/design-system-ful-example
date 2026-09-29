/**
 * Stylelint rule `ds/component-tokens-only`.
 *
 * A component's stylesheet may only use that component's own tokens:
 *   - every var(--x) must start with one of the component's token prefixes, or be a
 *     private helper (--_name) declared in the same stylesheet
 *   - no raw colors (hex, rgb(), hsl(), …)
 *   - no raw lengths other than 0 (px, rem, em, …)
 *
 * The component is inferred from the file name (Button.css → --button-*). Token prefixes
 * that differ from the file name are listed in `prefixes`.
 *
 * Options (secondary):
 *   prefixes: { [fileBaseName]: string[] }   extra/override token prefixes per file
 *   anyToken: true                            allow any token (for app CSS): only raw values are errors
 */
import stylelint from 'stylelint';
import { basename } from 'node:path';

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

export const ruleName = 'ds/component-tokens-only';

export const messages = ruleMessages(ruleName, {
  foreignToken: (token, allowed) =>
    `"${token}" isn't a token of this component. Use a component token (${allowed}) that points at it.`,
  rawColor: (value) =>
    `Raw color "${value}". Use a component token that points at a semantic color token.`,
  rawLength: (value) => `Raw length "${value}". Use a component token (spacing, size, radius…).`,
});

const kebab = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const RAW_COLOR = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/gi;
const RAW_LENGTH = /(?<![\w-])-?(?:\d*\.)?\d+(?:px|rem|em|vh|vw|pt)\b/gi;

const rule = (enabled, options = {}) => {
  return (root, result) => {
    const valid = validateOptions(result, ruleName, { actual: enabled, possible: [true] });
    if (!valid) return;

    const file = root.source?.input.file;
    if (!file) return;
    const base = basename(file, '.css');
    const prefixes = options.prefixes?.[base] ?? [kebab(base)];
    const allowed = prefixes.map((p) => `--${p}-*`).join(', ');

    // Private helpers (--_name) relay the component's own tokens inside its stylesheet,
    // e.g. a variant sets --_bg and the base rule reads it. Only ones declared here count.
    const privates = new Set();
    root.walkDecls(/^--_/, (decl) => privates.add(decl.prop));

    root.walkDecls((decl) => {
      for (const [, token] of options.anyToken ? [] : decl.value.matchAll(/var\(\s*(--[a-z0-9_-]+)/g)) {
        if (privates.has(token)) continue;
        // Runtime values that primitives libraries set on elements (e.g. Radix positioning).
        if (token.startsWith('--radix-')) continue;
        if (!prefixes.some((p) => token === `--${p}` || token.startsWith(`--${p}-`))) {
          report({
            ruleName,
            result,
            node: decl,
            word: token,
            message: messages.foreignToken(token, allowed),
          });
        }
      }
      // var() fallbacks are still raw values, so check the whole value.
      for (const [value] of decl.value.matchAll(RAW_COLOR)) {
        report({ ruleName, result, node: decl, word: value, message: messages.rawColor(value) });
      }
      for (const [value] of decl.value.matchAll(RAW_LENGTH)) {
        if (Number.parseFloat(value) === 0) continue;
        report({ ruleName, result, node: decl, word: value, message: messages.rawLength(value) });
      }
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;

export default createPlugin(ruleName, rule);
