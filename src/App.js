import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SalesPage from './SalesPage';
import WhyErgo from './WhyErgo';
import HowToBuyErgo from './HowToBuyErgo';
import WalletGuide from './WalletGuide';
import LoginPage from './LoginPage';
import ErgoPaymentPage from './ErgoPaymentPage';
import Dashboard from './Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SalesPage />} />
        <Route path="/why-ergo" element={<WhyErgo />} />
        <Route path="/how-to-buy-ergo" element={<HowToBuyErgo />} />
        <Route path="/wallet-guide" element={<WalletGuide />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pay-ergo" element={<ErgoPaymentPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
