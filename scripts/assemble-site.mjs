// Assembles the deployable site/ folder from the workspace builds.
// Until the Storybook docs launch (Phase 8), the legacy static docs keep their URLs at the root.
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');

const copy = (from, to) => {
  const src = join(root, from);
  if (!existsSync(src)) throw new Error(`Missing build output: ${from}`);
  cpSync(src, join(site, to), { recursive: true });
};

const redirect = (path, target) => {
  mkdirSync(join(site, path), { recursive: true });
  writeFileSync(
    join(site, path, 'index.html'),
    `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)} + location.hash);</script>
</head>
<body><a href="${target}">This page has moved.</a></body>
</html>
`,
  );
};

rmSync(site, { recursive: true, force: true });
mkdirSync(site);

copy('legacy/index.html', 'index.html');
for (const dir of ['assets', 'components', 'pages', 'includes', 'demo']) copy(`legacy/${dir}`, dir);
copy('apps/prototypes/dist', 'prototypes');
// Storybook docs live at /storybook/ until they replace the legacy docs at launch (Phase 8).
copy('apps/docs/dist', 'storybook');
// AI-readable files: /ai/… and /llms.txt at the site root (llms.txt convention).
copy('ai', 'ai');
copy('ai/llms.txt', 'llms.txt');

// Old prototype URL from before the monorepo; keeps #/landing and #/dashboard links working.
redirect('react-app-live', '../prototypes/');

writeFileSync(join(site, '.nojekyll'), '');
console.log('Site assembled in site/');
