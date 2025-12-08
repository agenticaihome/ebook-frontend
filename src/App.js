import React, { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { SoundProvider } from './context/SoundContext';
import { UserProvider } from './context/UserContext';
import ErrorBoundary from './components/common/ErrorBoundary';

import PageTransition from './components/layout/PageTransition';
import MobileBottomNav from './components/layout/MobileBottomNav';
import { Toaster, toast } from 'react-hot-toast';
import { routeConfig } from './config/routes';
import { initGA, logPageView } from './utils/analytics';

// Eager load SplashPage
import SplashPage from './pages/SplashPage';
import OnboardingPage from './pages/OnboardingPage';


// Lazy load ClaimAccessPage
const ClaimAccessPage = lazy(() => import('./pages/ClaimAccessPage'));
const GameLandingPage = lazy(() => import('./pages/GameLandingPage'));
const GamesPage = lazy(() => import('./pages/GamesPage'));
const HallOfFame = lazy(() => import('./pages/HallOfFame'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AgentWallet = lazy(() => import('./pages/AgentWallet'));
const PrePurchaseBridge = lazy(() => import('./pages/PrePurchaseBridge'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));

import Loading from './components/common/Loading';

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
  const prevLocationRef = React.useRef();

  // Personalization: Track progress with deduplication
  useEffect(() => {
    const currentPath = location.pathname + location.search;

    // Only log if path actually changed (prevents redirect double-counts)
    if (prevLocationRef.current !== currentPath) {
      logPageView(currentPath);
      prevLocationRef.current = currentPath;
    }

    // Preserve first-touch UTM parameters in sessionStorage for attribution
    const params = new URLSearchParams(location.search);
    const utmSource = params.get('utm_source');

    if (utmSource && !sessionStorage.getItem('initial_utm_source')) {
      sessionStorage.setItem('initial_utm_source', utmSource);
      sessionStorage.setItem('initial_utm_medium', params.get('utm_medium') || '');
      sessionStorage.setItem('initial_utm_campaign', params.get('utm_campaign') || '');
      sessionStorage.setItem('initial_utm_content', params.get('utm_content') || '');
      sessionStorage.setItem('initial_utm_term', params.get('utm_term') || '');
    }

    // Track last visited route for resume functionality
    if (location.pathname !== '/' && location.pathname !== '/welcome' && location.pathname !== '/success' && !location.pathname.includes('widget')) {
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
            <Route path="/" element={<PageTransition><SplashPage /></PageTransition>} />
            <Route path="/start" element={<Navigate to="/part1/chapter1" replace />} />
            <Route path="/onboarding" element={<PageTransition><OnboardingPage /></PageTransition>} />

            {/* Part Redirects - redirect to first chapter of each part */}
            <Route path="/part1" element={<Navigate to="/part1/chapter1" replace />} />
            <Route path="/part2" element={<Navigate to="/part2/chapter1" replace />} />
            <Route path="/part3" element={<Navigate to="/part3/chapter1" replace />} />
            <Route path="/part4" element={<Navigate to="/part4/chapter1" replace />} />

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

            <Route path="/success" element={<PageTransition><routeConfig.success.Component /></PageTransition>} />
            <Route path="/create-account" element={<PageTransition><routeConfig.createAccount.Component /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><routeConfig.dashboard.Component /></PageTransition>} />
            <Route path="/tools" element={
              <Suspense fallback={<Loading />}>
                <PageTransition><ToolsPage /></PageTransition>
              </Suspense>
            } />
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

            {/* Pre-Purchase Bridge - Between free chapters and paywall */}
            <Route path="/unlock" element={
              <Suspense fallback={<Loading />}>
                <PageTransition><PrePurchaseBridge /></PageTransition>
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

            {/* Hall of Fame - All-Time Leaderboards */}
            <Route path="/hall-of-fame" element={
              <Suspense fallback={<Loading />}>
                <PageTransition><HallOfFame /></PageTransition>
              </Suspense>
            } />

            {/* Agent Wallet / Deck */}
            <Route path="/deck" element={
              <Suspense fallback={<Loading />}>
                <PageTransition><AgentWallet /></PageTransition>
              </Suspense>
            } />

            {/* 404 Route */}
            <Route path="*" element={
              <Suspense fallback={<Loading />}>
                <PageTransition><NotFoundPage /></PageTransition>
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
    const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-QDYN0E69MT';

    // Initialize GA4 (React-GA4 handles the script injection)
    initGA(measurementId);

    // Auto-grant consent for now (TODO: Add cookie banner in future)
    // This allows tracking to start immediately after consent mode default
    if (window.grantAnalyticsConsent) {
      window.grantAnalyticsConsent();
    }
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <SoundProvider>
          <UserProvider>
            <Suspense fallback={<Loading />}>
              <ErrorBoundary>
                <AnimatedRoutes />
              </ErrorBoundary>
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
