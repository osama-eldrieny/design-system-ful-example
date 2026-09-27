import { useState } from 'react';
import ProductLandingPage from './ProductLandingPage';
import DashboardPage from './DashboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'product' | 'dashboard'>('product');

  return (
    <div>
      {currentPage === 'product' && (
        <ProductLandingPage onNavigate={() => setCurrentPage('dashboard')} />
      )}
      {currentPage === 'dashboard' && (
        <DashboardPage onNavigate={() => setCurrentPage('product')} />
      )}
    </div>
  );
}

export default App;
