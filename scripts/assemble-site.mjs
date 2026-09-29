// Assembles the deployable site/ folder from the workspace builds:
//   /                Storybook docs
//   /prototypes/     prototypes (#/admin, #/admin/orders, #/admin/team, #/settings, #/demo)
//   /ai/, /llms.txt  AI-readable files
// plus redirect stubs so links to the retired static docs keep working.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');

const copy = (from, to) => {
  const src = join(root, from);
  if (!existsSync(src)) throw new Error(`Missing build output: ${from}`);
  cpSync(src, join(site, to), { recursive: true });
};

/** Writes an HTML page at `file` (relative to site/) that redirects to `target`. */
const redirectFile = (file, target) => {
  mkdirSync(join(site, dirname(file)), { recursive: true });
  writeFileSync(
    join(site, file),
    `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)} + (${JSON.stringify(target)}.includes('#') ? '' : location.hash));</script>
</head>
<body><a href="${target}">This page has moved.</a></body>
</html>
`,
  );
};
const redirect = (path, target) => redirectFile(join(path, 'index.html'), target);

rmSync(site, { recursive: true, force: true });
mkdirSync(site);

copy('apps/docs/dist', '.');
// Storybook writes its own "<title>storybook - Storybook</title>"; the docs use the design
// system's name (set in apps/docs/.storybook/manager-head.html).
const docsIndex = join(site, 'index.html');
writeFileSync(
  docsIndex,
  readFileSync(docsIndex, 'utf8').replace(/<title>[^<]*Storybook<\/title>\s*/i, ''),
);
copy('apps/prototypes/dist', 'prototypes');
copy('ai', 'ai');
copy('ai/llms.txt', 'llms.txt');
copy('ai/llms-full.txt', 'llms-full.txt');

// Moved pages.
redirect('storybook', '../');
redirect('demo', '../prototypes/#/demo');
redirect('react-app-live', '../prototypes/');

// Retired static docs (before 1.0): each page points to its Storybook docs page.
const docs = (id) => `../?path=/docs/${id}`;
const contract = (id) => JSON.parse(readFileSync(join(root, 'ai/components', `${id}.json`), 'utf8'));
const componentPages = {
  alert: 'alert',
  'apps-notifications': 'apps-notifications',
  'notification-list-item': 'apps-notifications',
  avatar: 'avatar',
  button: 'button',
  card: 'card',
  'choose-card': 'choose-card',
  dropdown: 'dropdown-menu',
  footer: 'footer',
  header: 'header',
  'input-field': 'input-field',
  logo: 'logo',
  'meeting-card': 'meeting-card',
  navbar: 'navbar',
  pagination: 'pagination',
  'radio-button': 'radio-group',
  tabs: 'tabs',
  toggle: 'switch',
};
for (const [page, id] of Object.entries(componentPages)) {
  redirectFile(`components/${page}.html`, docs(new URL(contract(id).docs).searchParams.get('path').replace('/docs/', '')));
}
redirectFile('components/palettes.html', docs('foundations-colors--docs'));
const foundationPages = {
  'tokens-colors': 'foundations-colors--docs',
  'tokens-typography': 'foundations-typography--docs',
  'tokens-spacing': 'foundations-spacing-density--docs',
  'tokens-borders': 'foundations-radius--docs',
  'tokens-shadow': 'foundations-shadows-elevation--docs',
  'tokens-global': 'get-started-theming--docs',
};
for (const [page, id] of Object.entries(foundationPages)) redirectFile(`pages/${page}.html`, docs(id));

writeFileSync(join(site, '.nojekyll'), '');
console.log('Site assembled in site/');
