import { useEffect, useState } from 'react';
import { applyTheme, defaultTheme, ThemeProvider, ToastProvider, type Theme } from '@ds/react';
import { useRoute } from './router';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminOverviewPage from './pages/AdminOverviewPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CustomersPage from './pages/CustomersPage';
import FinancePage from './pages/FinancePage';
import DemoPage from './pages/DemoPage';
import SettingsPage from './pages/SettingsPage';
import './prototype.css';

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
  if (route.startsWith('/admin/orders')) return <AdminOrdersPage />;
  if (route.startsWith('/admin/team')) return <SettingsPage section="team" />;
  if (route.startsWith('/admin/analytics')) return <AnalyticsPage />;
  if (route.startsWith('/admin/customers')) return <CustomersPage />;
  if (route.startsWith('/admin/finance')) return <FinancePage />;
  if (route.startsWith('/admin')) return <AdminOverviewPage />;
  if (route.startsWith('/settings'))
    return <SettingsPage section={route.split('/')[2] ?? 'details'} />;
  if (route.startsWith('/demo'))
    return (
      <DemoPage theme={theme} onThemeChange={setTheme} onReset={() => setTheme(defaultTheme)} />
    );
  // The admin overview is the prototypes' home page.
  return <AdminOverviewPage />;
}

/** The prototypes app: the TechHub admin, the theme playground, toasts and the saved theme. */
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
