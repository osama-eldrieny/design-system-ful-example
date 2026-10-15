import { lazy, Suspense, useEffect, useState } from 'react';
import { applyTheme, defaultTheme, ThemeProvider, ToastProvider, type Theme } from '@ds/react';
import { useRoute } from './router';
import Showcase from './showcase/Showcase';
import './prototype.css';

const SaasApp = lazy(() => import('./saas/SaasApp'));

const STORAGE_KEY = 'ds-prototype-theme';
const savedTheme = (): Theme => {
  try {
    return { ...defaultTheme, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') };
  } catch {
    return defaultTheme;
  }
};

function Page({
  route,
  theme,
  setTheme,
}: {
  route: string;
  theme: Theme;
  setTheme: (t: Theme) => void;
}) {
  if (route.startsWith('/demo'))
    return (
      <Showcase theme={theme} onThemeChange={setTheme} onReset={() => setTheme(defaultTheme)} />
    );
  // Orbit is the prototypes' home page.
  return (
    <Suspense fallback={null}>
      <SaasApp route={route} theme={theme} setTheme={setTheme} />
    </Suspense>
  );
}

/** The prototypes app: Orbit (SaaS), the theme showcase, toasts and the saved theme. */
function App() {
  const route = useRoute();
  const [theme, setTheme] = useState<Theme>(savedTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch {
      // Storage unavailable (private mode): the theme just isn't remembered.
    }
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Page route={route} theme={theme} setTheme={setTheme} />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
