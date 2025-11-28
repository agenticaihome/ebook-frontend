import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SoundProvider } from './context/SoundContext';
import PageTransition from './components/layout/PageTransition';
import MobileBottomNav from './components/layout/MobileBottomNav';
import { Toaster, toast } from 'react-hot-toast';

// Eager load SalesPage
import SalesPage from './SalesPage';

// Lazy load components
const Part1 = lazy(() => import('./pages/Part1'));
const Part2 = lazy(() => import('./pages/Part2'));
const Part3 = lazy(() => import('./pages/Part3'));
const Part4 = lazy(() => import('./pages/Part4'));
const Part5 = lazy(() => import('./pages/Part5'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));
const CreateAccountPage = lazy(() => import('./pages/CreateAccountPage'));
const EmbeddableInfectionDiagnostic = lazy(() => import('./components/tools/EmbeddableInfectionDiagnostic'));
const LoginPage = lazy(() => import('./LoginPage'));
const ErgoPaymentPage = lazy(() => import('./ErgoPaymentPage'));
const Dashboard = lazy(() => import('./Dashboard'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const HowToBuyErgo = lazy(() => import('./HowToBuyErgo'));
const WhyErgo = lazy(() => import('./WhyErgo'));
const HowToPay = lazy(() => import('./HowToPay'));
const WalletGuide = lazy(() => import('./WalletGuide'));
const FAQ = lazy(() => import('./FAQ'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Loading component
const Loading = () => (
  <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Wrapper for PageTransition to use useLocation hook
const AnimatedRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Personalization: Track progress
  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/success' && !location.pathname.includes('widget')) {
      localStorage.setItem('last_visited_route', location.pathname);
    }
  }, [location]);

  // Personalization: Resume prompt
  useEffect(() => {
    const lastRoute = localStorage.getItem('last_visited_route');
    const hasPrompted = sessionStorage.getItem('resume_prompted');

    if (lastRoute && lastRoute !== '/' && location.pathname === '/' && !hasPrompted) {
      toast((t) => (
        <div className="flex items-center gap-4">
          <span>Welcome back! Resume where you left off?</span>
          <button
            onClick={() => {
              navigate(lastRoute);
              toast.dismiss(t.id);
            }}
            className="bg-cyan-500 text-white px-3 py-1 rounded-md text-sm font-bold"
          >
            Resume
          </button>
        </div>
      ), { duration: 6000, position: 'bottom-right' });
      sessionStorage.setItem('resume_prompted', 'true');
    }
  }, [navigate, location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><SalesPage /></PageTransition>} />
        <Route path="/part1" element={<PageTransition><Part1 /></PageTransition>} />
        <Route path="/part2" element={<PageTransition><Part2 /></PageTransition>} />
        <Route path="/part3" element={<PageTransition><Part3 /></PageTransition>} />
        <Route path="/part4" element={<PageTransition><Part4 /></PageTransition>} />
        <Route path="/part5" element={<PageTransition><Part5 /></PageTransition>} />
        <Route path="/success" element={<PageTransition><SuccessPage /></PageTransition>} />
        <Route path="/create-account" element={<PageTransition><CreateAccountPage /></PageTransition>} />
        <Route path="/chaos-quiz-widget" element={<EmbeddableInfectionDiagnostic />} />

        {/* Other routes wrapped in PageTransition or not, depending on preference. 
            Keeping them simple for now but wrapped for consistency if they are main pages. */}
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/pay-ergo" element={<PageTransition><ErgoPaymentPage /></PageTransition>} />
        <Route path="/how-to-buy-ergo" element={<PageTransition><HowToBuyErgo /></PageTransition>} />
        <Route path="/why-ergo" element={<PageTransition><WhyErgo /></PageTransition>} />
        <Route path="/how-to-pay" element={<PageTransition><HowToPay /></PageTransition>} />
        <Route path="/wallet-guide" element={<PageTransition><WalletGuide /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageTransition><Dashboard /></PageTransition>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <SoundProvider>
        <ScrollToTop />
        <Suspense fallback={<Loading />}>
          <AnimatedRoutes />
          <MobileBottomNav />
          <Toaster
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
              },
            }}
          />
        </Suspense>
      </SoundProvider>
    </Router>
  );
}

export default App;
