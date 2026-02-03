import React, { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { SoundProvider } from './context/SoundContext';
import { UserProvider } from './context/UserContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import RouteErrorBoundary from './components/common/RouteErrorBoundary';
import OfflineIndicator from './components/common/OfflineIndicator';
import CookieConsent from './components/common/CookieConsent';
import VersionCheckToast from './components/common/VersionCheckToast';
import DiagnosticsPanel from './components/common/DiagnosticsPanel';
import { getLastVisitedRoute, setLastVisitedRoute, getCookieConsent } from './utils/typedStorage';
import { installGlobalErrorHandlers } from './utils/logger';

import PageTransition from './components/layout/PageTransition';
import MobileBottomNav from './components/layout/MobileBottomNav';
import { Toaster, toast } from 'react-hot-toast';
import { routeConfig } from './config/routes';
import { initGA, logPageView } from './utils/analytics';
import PasswordGate from './components/common/PasswordGate';

// Install global error handlers immediately
installGlobalErrorHandlers();

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
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));

// Multi-course platform pages
const CourseCatalog = lazy(() => import('./pages/CourseCatalog'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));

// Business course chapters
const BusinessIntro = lazy(() => import('./pages/courses/business/Intro'));
const BusinessWeek1 = lazy(() => import('./pages/courses/business/Week1'));
const BusinessWeek2 = lazy(() => import('./pages/courses/business/Week2'));
const BusinessWeek3 = lazy(() => import('./pages/courses/business/Week3'));
const BusinessWeek4 = lazy(() => import('./pages/courses/business/Week4'));
const BusinessWeek5 = lazy(() => import('./pages/courses/business/Week5'));
const BusinessWeek6 = lazy(() => import('./pages/courses/business/Week6'));
const BusinessWeek7 = lazy(() => import('./pages/courses/business/Week7'));

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
      setLastVisitedRoute(location.pathname);
    }
  }, [location]);

  // Personalization: Resume prompt
  useEffect(() => {
    const lastRoute = getLastVisitedRoute();
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
            <Route path="/checkout" element={<Navigate to="/payment-guide" replace />} />
            <Route path="/onboarding" element={<PageTransition><OnboardingPage /></PageTransition>} />
            
            {/* Multi-Course Platform Routes */}
            <Route path="/courses" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><CourseCatalog /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />
            <Route path="/courses/:courseId" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><CourseDetail /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />

            {/* Business Course Routes */}
            <Route path="/courses/business" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><BusinessIntro /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />
            <Route path="/courses/business/week1" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><BusinessWeek1 /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />
            <Route path="/courses/business/week2" element={
              <PasswordGate partNumber={1}>
                <RouteErrorBoundary>
                  <Suspense fallback={<Loading />}>
                    <PageTransition><BusinessWeek2 /></PageTransition>
                  </Suspense>
                </RouteErrorBoundary>
              </PasswordGate>
            } />
            <Route path="/courses/business/week3" element={
              <PasswordGate partNumber={1}>
                <RouteErrorBoundary>
                  <Suspense fallback={<Loading />}>
                    <PageTransition><BusinessWeek3 /></PageTransition>
                  </Suspense>
                </RouteErrorBoundary>
              </PasswordGate>
            } />
            <Route path="/courses/business/week4" element={
              <PasswordGate partNumber={1}>
                <RouteErrorBoundary>
                  <Suspense fallback={<Loading />}>
                    <PageTransition><BusinessWeek4 /></PageTransition>
                  </Suspense>
                </RouteErrorBoundary>
              </PasswordGate>
            } />
            <Route path="/courses/business/week5" element={
              <PasswordGate partNumber={1}>
                <RouteErrorBoundary>
                  <Suspense fallback={<Loading />}>
                    <PageTransition><BusinessWeek5 /></PageTransition>
                  </Suspense>
                </RouteErrorBoundary>
              </PasswordGate>
            } />
            <Route path="/courses/business/week6" element={
              <PasswordGate partNumber={1}>
                <RouteErrorBoundary>
                  <Suspense fallback={<Loading />}>
                    <PageTransition><BusinessWeek6 /></PageTransition>
                  </Suspense>
                </RouteErrorBoundary>
              </PasswordGate>
            } />
            <Route path="/courses/business/week7" element={
              <PasswordGate partNumber={1}>
                <RouteErrorBoundary>
                  <Suspense fallback={<Loading />}>
                    <PageTransition><BusinessWeek7 /></PageTransition>
                  </Suspense>
                </RouteErrorBoundary>
              </PasswordGate>
            } />

            <Route path="/privacy" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><TermsOfServicePage /></PageTransition>} />

            {/* Intro - Before Chapter 1 */}
            <Route path="/intro" element={<PageTransition><routeConfig.intro.Component /></PageTransition>} />
            <Route path="/before-you-begin" element={<Navigate to="/intro" replace />} />

            {/* Part Redirects - redirect to first chapter of each part */}
            <Route path="/part1" element={<Navigate to="/part1/chapter1" replace />} />
            <Route path="/part2" element={<Navigate to="/part2/chapter1" replace />} />
            <Route path="/part3" element={<Navigate to="/part3/chapter1" replace />} />
            <Route path="/part4" element={<Navigate to="/part4/chapter1" replace />} />

            {/* Part 1 Chapters */}
            <Route path="/part1/chapter1" element={<PageTransition><routeConfig.part1chapter1.Component /></PageTransition>} />
            <Route path="/part1/chapter2" element={<PasswordGate partNumber={1}><PageTransition><routeConfig.part1chapter2.Component /></PageTransition></PasswordGate>} />
            <Route path="/part1/chapter3" element={<PasswordGate partNumber={1}><PageTransition><routeConfig.part1chapter3.Component /></PageTransition></PasswordGate>} />

            {/* Part 2 Chapters */}
            <Route path="/part2/chapter1" element={<PasswordGate partNumber={2}><PageTransition><routeConfig.part2chapter1.Component /></PageTransition></PasswordGate>} />
            <Route path="/part2/chapter2" element={<PasswordGate partNumber={2}><PageTransition><routeConfig.part2chapter2.Component /></PageTransition></PasswordGate>} />
            <Route path="/part2/chapter3" element={<PasswordGate partNumber={2}><PageTransition><routeConfig.part2chapter3.Component /></PageTransition></PasswordGate>} />

            {/* Part 3 Chapters */}
            <Route path="/part3/chapter1" element={<PasswordGate partNumber={3}><PageTransition><routeConfig.part3chapter1.Component /></PageTransition></PasswordGate>} />
            <Route path="/part3/chapter2" element={<PasswordGate partNumber={3}><PageTransition><routeConfig.part3chapter2.Component /></PageTransition></PasswordGate>} />
            <Route path="/part3/chapter3" element={<PasswordGate partNumber={3}><PageTransition><routeConfig.part3chapter3.Component /></PageTransition></PasswordGate>} />

            {/* Part 4 Chapters */}
            <Route path="/part4/chapter1" element={<PasswordGate partNumber={4}><PageTransition><routeConfig.part4chapter1.Component /></PageTransition></PasswordGate>} />

            {/* Bonus Chapter - Going Always-On */}
            <Route path="/bonus/chapter11" element={<PasswordGate partNumber={4}><PageTransition><routeConfig.chapter11.Component /></PageTransition></PasswordGate>} />
            <Route path="/chapter11" element={<Navigate to="/bonus/chapter11" replace />} />
            <Route path="/always-on" element={<Navigate to="/bonus/chapter11" replace />} />

            <Route path="/success" element={<PageTransition><routeConfig.success.Component /></PageTransition>} />
            <Route path="/create-account" element={<PageTransition><routeConfig.createAccount.Component /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><routeConfig.dashboard.Component /></PageTransition>} />
            <Route path="/tools" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><ToolsPage /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />
            <Route path="/chaos-quiz-widget" element={<routeConfig.infectionDiagnostic.Component />} />
            <Route path="/login" element={<PageTransition><routeConfig.login.Component /></PageTransition>} />
            <Route path="/pay-ergo" element={<PageTransition><routeConfig.ergoPayment.Component /></PageTransition>} />
            <Route path="/payment-guide" element={<PageTransition><routeConfig.paymentGuide.Component /></PageTransition>} />

            <Route path="/why-ergo" element={<PageTransition><routeConfig.whyErgo.Component /></PageTransition>} />
            <Route path="/ergo-guide" element={<PageTransition><routeConfig.ergoGuide.Component /></PageTransition>} />
            <Route path="/faq" element={<PageTransition><routeConfig.faq.Component /></PageTransition>} />

            {/* Password Reset Routes */}
            <Route path="/forgot-password" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><ForgotPasswordPage /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />
            <Route path="/reset-password" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><ResetPasswordPage /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />

            {/* Claim Access Route */}
            <Route path="/claim-access" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><ClaimAccessPage /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />

            {/* Pre-Purchase Bridge - Between free chapters and paywall */}
            <Route path="/unlock" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><PrePurchaseBridge /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />

            {/* Game Landing Page */}
            <Route path="/challenge" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><GameLandingPage /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />

            {/* Games Hub */}
            <Route path="/games" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><GamesPage /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />

            {/* Hall of Fame - All-Time Leaderboards */}
            <Route path="/hall-of-fame" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><HallOfFame /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />

            {/* Agent Wallet / Deck */}
            <Route path="/deck" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><AgentWallet /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />

            {/* Graduation Page - Commander Certificate */}
            <Route path="/graduation" element={<PageTransition><routeConfig.graduation.Component /></PageTransition>} />

            {/* Status Page - System Status & Troubleshooting */}
            <Route path="/status" element={<PageTransition><routeConfig.status.Component /></PageTransition>} />

            {/* 404 Route */}
            <Route path="*" element={
              <RouteErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <PageTransition><NotFoundPage /></PageTransition>
                </Suspense>
              </RouteErrorBoundary>
            } />
          </Routes>
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
};

// ... imports

function App() {
  const [analyticsEnabled, setAnalyticsEnabled] = React.useState(false);

  useEffect(() => {
    // Check if user has already consented (use typedStorage for safe access)
    const consent = getCookieConsent();
    if (consent === 'accepted') {
      initGA();
      setAnalyticsEnabled(true);
    }
  }, []);

  const handleCookieAccept = () => {
    initGA();
    setAnalyticsEnabled(true);
  };

  return (
    <HelmetProvider>
      <Router>
        <SoundProvider>
          <UserProvider>
            <Suspense fallback={<Loading />}>
              <ErrorBoundary>
                <OfflineIndicator />
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
              <CookieConsent onAccept={handleCookieAccept} />
              <VersionCheckToast />
              <DiagnosticsPanel />
            </Suspense>
          </UserProvider>
        </SoundProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
