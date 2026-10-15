import { useEffect, useState } from 'react';

/** Hash routes: #/dashboards/{01–19}, #/app/{projects,messages,calendar,orders,…}, #/app/settings/{section}, #/demo. Old #/admin… links still work. */
export const routeFromHash = () => {
  const path = window.location.hash.replace(/^#/, '') || '/';
  // Links from before the rebuild.
  // Pages that no longer exist open the admin overview.
  if (/^\/(landing|store|checkout)/.test(path)) return '/dashboards/01';
  if (
    path === '/' ||
    path === '/app' ||
    path === '/dashboard' ||
    path.startsWith('/admin/overview') ||
    path === '/admin'
  )
    return '/dashboards/01';
  if (path.startsWith('/dashboard/')) return path.replace('/dashboard/', '/dashboards/');
  if (path.startsWith('/admin/team')) return '/app/settings/team';
  const moved: Record<string, string> = { analytics: '17', customers: '06', finance: '12', profile: '19' };
  const section = path.split('/')[2];
  if (/^\/(admin|app)\//.test(path) && moved[section]) return `/dashboards/${moved[section]}`;
  if (path.startsWith('/admin/')) return path.replace('/admin/', '/app/');
  if (path.startsWith('/settings')) return `/app${path}`;
  return path;
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
