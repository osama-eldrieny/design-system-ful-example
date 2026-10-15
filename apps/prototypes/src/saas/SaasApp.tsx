import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { Button, EmptyState, Spinner, type Theme } from '@ds/react';
import { Construction } from 'lucide-react';
import { isBare, pageFor } from './nav';
import { Page, Shell, ThemeContext, to, type ShellLayout } from './Shell';

type PageModule = LazyExoticComponent<ComponentType<{ path: string }>>;

/** Path inside Orbit → its page, loaded on demand. Patterns match a path prefix. */
const routes: [RegExp, PageModule][] = [
  [/^$/, lazy(() => import('./pages/Overview'))],
  [/^\/dashboards\//, lazy(() => import('./pages/Dashboards'))],
  [/^\/commerce\//, lazy(() => import('./pages/Commerce'))],
  [/^\/support\//, lazy(() => import('./pages/Support'))],
  [/^\/pages\/(api-keys|integrations)$/, lazy(() => import('./pages/Developer'))],
];

/** Layout demos reuse the overview inside a different frame. */
const layouts: Record<string, ShellLayout> = {
  '1': 'full',
  '2': 'slim',
  '3': 'top',
  '4': 'dual',
  '5': 'boxed',
  '6': 'rail',
};

function NotYet({ path }: { path: string }) {
  const pg = pageFor(path);
  return (
    <Page path={path}>
      <EmptyState
        icon={<Construction />}
        title={pg ? `${pg.label} is on its way` : 'Page not found'}
        description={
          pg
            ? 'This page is part of the Orbit build plan and arrives in a later batch.'
            : 'There’s no Orbit page at this address.'
        }
        actions={<Button href={to('')}>Back to overview</Button>}
      />
    </Page>
  );
}

/** Orbit, the SaaS prototype at #/saas. */
export default function SaasApp({
  route,
  theme,
  setTheme,
}: {
  route: string;
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  const path = route.replace(/^\/saas/, '').replace(/\/$/, '');
  const layout = path.match(/^\/layouts\/(\d)$/)?.[1];
  const Found = layout ? routes[0][1] : routes.find(([re]) => re.test(path))?.[1];
  const content = (
    <Suspense
      fallback={
        <div className="orbit-loading">
          <Spinner label="Loading page" />
        </div>
      }
    >
      {Found ? <Found path={path} /> : <NotYet path={path} />}
    </Suspense>
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {isBare(path) ? (
        <div className="proto orbit-bare">{content}</div>
      ) : (
        <Shell
          key={layout ?? 'app'}
          path={path}
          layout={layout ? layouts[layout] : 'full'}
          rail={layout === '6' ? <p className="muted text-sm">Side panel</p> : undefined}
        >
          {content}
        </Shell>
      )}
    </ThemeContext.Provider>
  );
}
