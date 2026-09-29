import { useEffect, useState } from 'react';

/** Hash routes: #/admin, #/admin/orders, #/admin/team, #/settings, #/demo. */
export const routeFromHash = () => {
  const path = window.location.hash.replace(/^#/, '') || '/';
  // Links from before the rebuild.
  // Pages that no longer exist open the admin overview.
  if (/^\/(landing|store|checkout)/.test(path)) return '/admin';
  if (path.startsWith('/dashboard')) return '/admin';
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
