import { useEffect, useState } from 'react';

/** Hash routes: #/app, #/app/{analytics,projects,messages,calendar,orders,customers,finance,profile}, #/app/settings/{section}, #/demo. Old #/admin… links still work. */
export const routeFromHash = () => {
  const path = window.location.hash.replace(/^#/, '') || '/';
  // Links from before the rebuild.
  // Pages that no longer exist open the admin overview.
  if (/^\/(landing|store|checkout|dashboard)/.test(path)) return '/app';
  if (path === '/' || path === '/admin' || path === '/admin/overview') return '/app';
  if (path.startsWith('/admin/team')) return '/app/settings/team';
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
