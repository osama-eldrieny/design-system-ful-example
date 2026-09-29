import { useEffect, useState } from 'react';
import { applyTheme, defaultTheme, ThemeProvider, ToastProvider, type Theme } from '@ds/react';
import ProductLandingPage from './ProductLandingPage';
import DashboardPage from './DashboardPage';
import DemoPage from './DemoPage';
import './prototype.css';

type Page = 'landing' | 'dashboard' | 'demo';

// Each page has its own URL: #/landing, #/dashboard and #/demo (theme playground).
const pageFromHash = (): Page =>
  window.location.hash.startsWith('#/dashboard')
    ? 'dashboard'
    : window.location.hash.startsWith('#/demo')
      ? 'demo'
      : 'landing';

const STORAGE_KEY = 'ds-prototype-theme';
const savedTheme = (): Theme => {
  try {
    return { ...defaultTheme, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') };
  } catch {
    return defaultTheme;
  }
};

function App() {
  const [page, setPage] = useState<Page>(pageFromHash);
  const [theme, setTheme] = useState<Theme>(savedTheme);

  useEffect(() => {
    const onHashChange = () => {
      setPage(pageFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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
        {page === 'landing' && <ProductLandingPage />}
        {page === 'dashboard' && <DashboardPage />}
        {page === 'demo' && (
          <DemoPage theme={theme} onThemeChange={setTheme} onReset={() => setTheme(defaultTheme)} />
        )}
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
