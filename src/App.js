import React, { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { SoundProvider } from './context/SoundContext';
import { UserProvider } from './context/UserContext';
import PageTransition from './components/layout/PageTransition';
import MobileBottomNav from './components/layout/MobileBottomNav';
import { Toaster, toast } from 'react-hot-toast';
import { routeConfig } from './config/routes';
import { initGA, logPageView } from './utils/analytics';

// Eager load SalesPage
import SalesPage from './SalesPage';


// Lazy load ClaimAccessPage
const ClaimAccessPage = lazy(() => import('./pages/ClaimAccessPage'));
const GameLandingPage = lazy(() => import('./pages/GameLandingPage'));
const GamesPage = lazy(() => import('./pages/GamesPage'));

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
    logPageView(location.pathname + location.search);
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
      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><SalesPage /></PageTransition>} />

            {/* Part Redirects - redirect to first chapter of each part */}
            <Route path="/part1" element={<Navigate to="/part1/chapter1" replace />} />
            <Route path="/part2" element={<Navigate to="/part2/chapter1" replace />} />
            <Route path="/part3" element={<Navigate to="/part3/chapter1" replace />} />
            <Route path="/part4" element={<Navigate to="/part4/chapter1" replace />} />
            <Route path="/part5" element={<Navigate to="/part5/chapter1" replace />} />

            {/* Part 1 Chapters */}
            <Route path="/part1/chapter1" element={<PageTransition><routeConfig.part1chapter1.Component /></PageTransition>} />
            <Route path="/part1/chapter2" element={<PageTransition><routeConfig.part1chapter2.Component /></PageTransition>} />
            <Route path="/part1/chapter3" element={<PageTransition><routeConfig.part1chapter3.Component /></PageTransition>} />

            {/* Part 2 Chapters */}
            <Route path="/part2/chapter1" element={<PageTransition><routeConfig.part2chapter1.Component /></PageTransition>} />
            <Route path="/part2/chapter2" element={<PageTransition><routeConfig.part2chapter2.Component /></PageTransition>} />
            <Route path="/part2/chapter3" element={<PageTransition><routeConfig.part2chapter3.Component /></PageTransition>} />

            {/* Part 3 Chapters */}
            <Route path="/part3/chapter1" element={<PageTransition><routeConfig.part3chapter1.Component /></PageTransition>} />
            <Route path="/part3/chapter2" element={<PageTransition><routeConfig.part3chapter2.Component /></PageTransition>} />
            <Route path="/part3/chapter3" element={<PageTransition><routeConfig.part3chapter3.Component /></PageTransition>} />

            {/* Part 4 Chapters */}
            <Route path="/part4/chapter1" element={<PageTransition><routeConfig.part4chapter1.Component /></PageTransition>} />
            <Route path="/part4/chapter2" element={<PageTransition><routeConfig.part4chapter2.Component /></PageTransition>} />
            <Route path="/part4/chapter3" element={<PageTransition><routeConfig.part4chapter3.Component /></PageTransition>} />

            {/* Part 5 Chapters */}
            <Route path="/part5/chapter1" element={<PageTransition><routeConfig.part5chapter1.Component /></PageTransition>} />
            <Route path="/part5/chapter2" element={<PageTransition><routeConfig.part5chapter2.Component /></PageTransition>} />
            <Route path="/part5/chapter3" element={<PageTransition><routeConfig.part5chapter3.Component /></PageTransition>} />

            <Route path="/success" element={<PageTransition><routeConfig.success.Component /></PageTransition>} />
            <Route path="/create-account" element={<PageTransition><routeConfig.createAccount.Component /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><routeConfig.dashboard.Component /></PageTransition>} />
            <Route path="/chaos-quiz-widget" element={<routeConfig.infectionDiagnostic.Component />} />
            <Route path="/login" element={<PageTransition><routeConfig.login.Component /></PageTransition>} />
            <Route path="/pay-ergo" element={<PageTransition><routeConfig.ergoPayment.Component /></PageTransition>} />
            <Route path="/payment-guide" element={<PageTransition><routeConfig.paymentGuide.Component /></PageTransition>} />

            <Route path="/why-ergo" element={<PageTransition><routeConfig.whyErgo.Component /></PageTransition>} />
            <Route path="/ergo-guide" element={<PageTransition><routeConfig.ergoGuide.Component /></PageTransition>} />
            <Route path="/faq" element={<PageTransition><routeConfig.faq.Component /></PageTransition>} />

            {/* Claim Access Route */}
            <Route path="/claim-access" element={
              <Suspense fallback={<Loading />}>
                <PageTransition><ClaimAccessPage /></PageTransition>
              </Suspense>
            } />

            {/* Game Landing Page */}
            <Route path="/challenge" element={
              <Suspense fallback={<Loading />}>
                <PageTransition><GameLandingPage /></PageTransition>
              </Suspense>
            } />

            {/* Games Hub */}
            <Route path="/games" element={
              <Suspense fallback={<Loading />}>
                <PageTransition><GamesPage /></PageTransition>
              </Suspense>
            } />
          </Routes>
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
};

// ... imports

function App() {
  useEffect(() => {
    initGA(process.env.REACT_APP_GA_MEASUREMENT_ID);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <SoundProvider>
          <UserProvider>
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
    </HelmetProvider>
  );
}

export default App;
