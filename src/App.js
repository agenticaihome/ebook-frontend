import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { SoundProvider } from './context/SoundContext';
import { UserProvider } from './context/UserContext';
import PageTransition from './components/layout/PageTransition';
import MobileBottomNav from './components/layout/MobileBottomNav';
import { Toaster, toast } from 'react-hot-toast';
import { routeConfig } from './config/routes';

// Eager load SalesPage
import SalesPage from './SalesPage';
import Dashboard from './pages/Dashboard';

// Lazy load ClaimAccessPage
const ClaimAccessPage = lazy(() => import('./pages/ClaimAccessPage'));

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
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><SalesPage /></PageTransition>} />
          <Route path="/part1" element={<PageTransition><routeConfig.part1.Component /></PageTransition>} />
          <Route path="/part2" element={<PageTransition><routeConfig.part2.Component /></PageTransition>} />
          <Route path="/part3" element={<PageTransition><routeConfig.part3.Component /></PageTransition>} />
          <Route path="/part4" element={<PageTransition><routeConfig.part4.Component /></PageTransition>} />
          <Route path="/part5" element={<PageTransition><routeConfig.part5.Component /></PageTransition>} />
          <Route path="/success" element={<PageTransition><routeConfig.success.Component /></PageTransition>} />
          <Route path="/create-account" element={<PageTransition><routeConfig.createAccount.Component /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/chaos-quiz-widget" element={<routeConfig.infectionDiagnostic.Component />} />
          <Route path="/login" element={<PageTransition><routeConfig.login.Component /></PageTransition>} />
          <Route path="/pay-ergo" element={<PageTransition><routeConfig.ergoPayment.Component /></PageTransition>} />
          <Route path="/why-ergo" element={<PageTransition><routeConfig.whyErgo.Component /></PageTransition>} />
          <Route path="/payment-guide" element={<PageTransition><routeConfig.paymentGuide.Component /></PageTransition>} />
          <Route path="/ergo-guide" element={<PageTransition><routeConfig.ergoGuide.Component /></PageTransition>} />
          <Route path="/faq" element={<PageTransition><routeConfig.faq.Component /></PageTransition>} />

          {/* Claim Access Route */}
          <Route path="/claim-access" element={
            <Suspense fallback={<Loading />}>
              <PageTransition><ClaimAccessPage /></PageTransition>
            </Suspense>
          } />

          {/* Legacy Redirects */}
          <Route path="/part1" element={<PageTransition><routeConfig.part1.Component /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </LazyMotion>
  );
};

function App() {
  return (
    <Router>
      <SoundProvider>
        <UserProvider>
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
        </UserProvider>
      </SoundProvider>
    </Router>
  );
}

export default App;
