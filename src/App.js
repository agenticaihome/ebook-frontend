import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Eager load only critical components (needed immediately)
import SalesPage from './SalesPage';

// Lazy load everything else (loaded on-demand)
const LoginPage = lazy(() => import('./LoginPage'));
const ErgoPaymentPage = lazy(() => import('./ErgoPaymentPage'));
const CreateAccountPage = lazy(() => import('./pages/CreateAccountPage'));
const Dashboard = lazy(() => import('./Dashboard'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Part1 = lazy(() => import('./pages/Part1'));
const Part2 = lazy(() => import('./pages/Part2'));
const Part3 = lazy(() => import('./pages/Part3'));
const Part4 = lazy(() => import('./pages/Part4'));
const Part5 = lazy(() => import('./pages/Part5'));
const HowToBuyErgo = lazy(() => import('./HowToBuyErgo'));
const WhyErgo = lazy(() => import('./WhyErgo'));
const HowToPay = lazy(() => import('./HowToPay'));
const WalletGuide = lazy(() => import('./WalletGuide'));
const FAQ = lazy(() => import('./FAQ'));

// Loading fallback component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #0f172a, #1e1b4b)',
    color: '#60a5fa'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid rgba(96, 165, 250, 0.2)',
        borderTop: '4px solid #60a5fa',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 16px'
      }} />
      <p style={{ fontSize: '18px', fontWeight: '600' }}>Loading...</p>
    </div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<SalesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pay-ergo" element={<ErgoPaymentPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/how-to-buy-ergo" element={<HowToBuyErgo />} />
          <Route path="/why-ergo" element={<WhyErgo />} />
          <Route path="/how-to-pay" element={<HowToPay />} />
          <Route path="/wallet-guide" element={<WalletGuide />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Webbook Chapters */}
          <Route path="/part1" element={<Part1 />} />
          <Route path="/part2" element={<Part2 />} />
          <Route path="/part3" element={<Part3 />} />
          <Route path="/part4" element={<Part4 />} />
          <Route path="/part5" element={<Part5 />} />

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
      </Suspense>
    </Router>
  );
}

export default App;
