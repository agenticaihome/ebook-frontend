import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SalesPage from './SalesPage';
import LoginPage from './LoginPage';
import ErgoPaymentPage from './ErgoPaymentPage';
import Dashboard from './Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Part1 from './pages/Part1';
import Part2 from './pages/Part2';
import HowToBuyErgo from './HowToBuyErgo';
import WhyErgo from './WhyErgo';

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
      <Routes>
        <Route path="/" element={<SalesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pay-ergo" element={<ErgoPaymentPage />} />
        <Route path="/how-to-buy-ergo" element={<HowToBuyErgo />} />
        <Route path="/why-ergo" element={<WhyErgo />} />

        {/* Webbook Chapters */}
        <Route path="/part1" element={<Part1 />} />
        <Route path="/part2" element={<Part2 />} />

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
}

export default App;
