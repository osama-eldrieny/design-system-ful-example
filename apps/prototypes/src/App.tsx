import { useEffect, useState } from 'react';
import ProductLandingPage from './ProductLandingPage';
import DashboardPage from './DashboardPage';

type Page = 'landing' | 'dashboard';

// Each prototype has its own URL: #/landing and #/dashboard
const pageFromHash = (): Page => (window.location.hash === '#/dashboard' ? 'dashboard' : 'landing');

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(pageFromHash);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(pageFromHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div>
      {currentPage === 'landing' && <ProductLandingPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
    </div>
  );
}

export default App;
