/**
 * Builds the publishable packages into packages/{tokens,react}/dist, each with its own
 * package.json (publish from dist). The monorepo itself keeps using the TypeScript sources.
 *
 * @ds/react: one ES module + type declarations per component, each importing its own CSS,
 * so bundlers tree-shake unused components and their styles (sideEffects: CSS only).
 */
import {
  cpSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

// CSS and the images it references (e.g. card placeholders in themes/images).
const copyCss = (from, to) => {
  for (const entry of readdirSync(from)) {
    const src = join(from, entry);
    if (statSync(src).isDirectory()) copyCss(src, join(to, entry));
    else if (/\.(css|png|jpe?g|svg|webp)$/.test(entry)) {
      mkdirSync(to, { recursive: true });
      cpSync(src, join(to, entry));
    }
  }
};
const pkg = (dir) => JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
const tsc = (project) => execFileSync('npx', ['tsc', '-p', project], { stdio: 'inherit' });

// @ds/tokens
{
  const dir = 'packages/tokens';
  rmSync(join(dir, 'dist'), { recursive: true, force: true });
  tsc(join(dir, 'tsconfig.build.json'));
  copyCss(join(dir, 'src'), join(dir, 'dist'));
  const source = pkg(dir);
  writeFileSync(
    join(dir, 'dist/package.json'),
    JSON.stringify(
      {
        name: source.name,
        version: source.version,
        description: source.description,
        type: 'module',
        exports: {
          '.': { types: './theme.d.ts', default: './theme.js' },
          './tokens.css': './tokens.css',
          './*.css': './*.css',
        },
        sideEffects: ['**/*.css'],
        dependencies: source.dependencies,
      },
      null,
      2,
    ) + '\n',
  );
}

// @ds/react
{
  const dir = 'packages/react';
  rmSync(join(dir, 'dist'), { recursive: true, force: true });
  tsc(join(dir, 'tsconfig.build.json'));
  copyCss(join(dir, 'src'), join(dir, 'dist'));
  cpSync('ai', join(dir, 'dist/ai'), { recursive: true });
  const source = pkg(dir);
  writeFileSync(
    join(dir, 'dist/package.json'),
    JSON.stringify(
      {
        name: source.name,
        version: source.version,
        description: source.description,
        type: 'module',
        exports: {
          '.': { types: './index.d.ts', default: './index.js' },
          './ai/*': './ai/*',
        },
        sideEffects: ['**/*.css'],
        peerDependencies: source.peerDependencies,
        dependencies: source.dependencies,
      },
      null,
      2,
    ) + '\n',
  );
}

const count = (dir, ext) =>
  readdirSync(dir, { recursive: true }).filter((f) => String(f).endsWith(ext)).length;
console.log(
  `Built @ds/tokens (${count('packages/tokens/dist', '.css')} CSS files) and @ds/react (${count('packages/react/dist', '.js')} modules, ${count('packages/react/dist', '.css')} CSS files).`,
);
