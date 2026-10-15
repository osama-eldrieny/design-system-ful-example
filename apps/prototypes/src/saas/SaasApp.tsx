import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { Alert, Link, Spinner, type Theme } from '@ds/react';
import { isBare, pageFor } from './nav';
import { Shell, ThemeContext, to, type ShellLayout } from './Shell';

type PageModule = LazyExoticComponent<ComponentType<{ path: string }>>;

/** Sign-in and system pages; also the 404 for any unknown address. */
const System = lazy(() => import('./pages/System'));

/** Path inside Orbit → its page, loaded on demand. Patterns match a path prefix. */
const routes: [RegExp, PageModule][] = [
  [/^$/, lazy(() => import('./pages/Overview'))],
  [/^\/dashboards\//, lazy(() => import('./pages/Dashboards'))],
  [/^\/commerce\//, lazy(() => import('./pages/Commerce'))],
  [/^\/support\//, lazy(() => import('./pages/Support'))],
  [/^\/pages\/(api-keys|integrations)$/, lazy(() => import('./pages/Developer'))],
  [/^\/ai\//, lazy(() => import('./pages/Ai'))],
  [/^\/(forms|tables|charts|maps|ui)\//, lazy(() => import('./pages/Showcase'))],
  [/^\/(auth\/|pages\/(404|coming-soon|maintenance|success)$)/, System],
  [/^\/(tasks\/|calendar$)/, lazy(() => import('./pages/Work'))],
  [/^\/(profile|pages\/(files|pricing|faq|blank))$/, lazy(() => import('./pages/Content'))],
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
      {layout && (
        <Alert
          variant="primary"
          title={`Layout ${layout}: ${pageFor(path)?.label}`}
          className="orbit-layout-note"
        >
          <span className="orbit-layout-note__links">
            The same overview inside a different app frame. Try:
            {Object.keys(layouts).map((n) => (
              <Link
                key={n}
                href={to(`/layouts/${n}`)}
                aria-current={n === layout ? 'page' : undefined}
              >
                {pageFor(`/layouts/${n}`)?.label}
              </Link>
            ))}
          </span>
        </Alert>
      )}
      {Found ? <Found path={path} /> : <System path="/pages/404" />}
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
