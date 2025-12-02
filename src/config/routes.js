import { lazy } from 'react';

// Helper to create route object with prefetch capability
const createRoute = (importFn) => {
    return {
        Component: lazy(importFn),
        prefetch: importFn
    };
};

export const routeConfig = {
    part1: createRoute(() => import('../pages/Part1')),
    part2: createRoute(() => import('../pages/Part2')),
    part3: createRoute(() => import('../pages/Part3')),
    part4: createRoute(() => import('../pages/Part4')),
    part5: createRoute(() => import('../pages/Part5')),
    success: createRoute(() => import('../pages/SuccessPage')),
    createAccount: createRoute(() => import('../pages/CreateAccountPage')),
    login: createRoute(() => import('../LoginPage')),
    ergoPayment: createRoute(() => import('../ErgoPaymentPage')),
    dashboard: createRoute(() => import('../pages/Dashboard')),
    whyErgo: createRoute(() => import('../WhyErgo')),
    paymentGuide: createRoute(() => import('../PaymentGuide')),
    ergoGuide: createRoute(() => import('../ErgoGuide')),
    faq: createRoute(() => import('../FAQ')),
    quickStart: createRoute(() => import('../pages/QuickStart')),

    notFound: createRoute(() => import('../pages/NotFoundPage')),
    // Tools
    infectionDiagnostic: createRoute(() => import('../components/tools/EmbeddableInfectionDiagnostic')),
};
