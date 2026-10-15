import { useEffect, useState } from 'react';

/** Old Panda and admin addresses → the Orbit page that replaced them. */
const moved: [RegExp, string][] = [
  [/^\/app\/settings\/billing/, '/saas/commerce/billing'],
  [/^\/(app\/)?settings/, '/saas/profile'],
  [/^\/(app|admin)\/messages/, '/saas/support/chat'],
  [/^\/(app|admin)\/calendar/, '/saas/calendar'],
  [/^\/(app|admin)\/orders/, '/saas/commerce/invoices'],
  [/^\/(app|admin)\/projects/, '/saas/tasks/kanban'],
  [/^\/(app|admin)\/analytics/, '/saas/dashboards/analytics'],
  [/^\/(app|admin)\/finance/, '/saas/dashboards/finance'],
];

/**
 * Hash routes: #/saas/… (Orbit, the SaaS prototype and home page) and #/demo (theme
 * playground). Anything else, including links to the removed Panda dashboard, opens Orbit.
 */
export const routeFromHash = () => {
  const path = window.location.hash.replace(/^#/, '') || '/';
  if (path.startsWith('/saas') || path.startsWith('/demo')) return path;
  return moved.find(([re]) => re.test(path))?.[1] ?? '/saas';
};

export function useRoute() {
  const [route, setRoute] = useState(routeFromHash);
  useEffect(() => {
    const onChange = () => {
      setRoute(routeFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export const go = (path: string) => {
  window.location.hash = path;
};
