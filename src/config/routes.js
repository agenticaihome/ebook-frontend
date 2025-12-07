import { lazy } from 'react';

// Helper to create route object with prefetch capability
const createRoute = (importFn) => {
    return {
        Component: lazy(importFn),
        prefetch: importFn
    };
};

export const routeConfig = {
    // Part 1 Chapters (No password gate)
    part1chapter1: createRoute(() => import('../pages/chapters/Chapter1')),
    part1chapter2: createRoute(() => import('../pages/chapters/Chapter2')),
    part1chapter3: createRoute(() => import('../pages/chapters/Chapter3')),

    // Part 2 Chapters (Password protected)
    part2chapter1: createRoute(() => import('../pages/chapters/Chapter4')),
    part2chapter2: createRoute(() => import('../pages/chapters/Chapter5')),
    part2chapter3: createRoute(() => import('../pages/chapters/Chapter6')),

    // Part 3 Chapters (Password protected)
    part3chapter1: createRoute(() => import('../pages/chapters/Chapter7')),
    part3chapter2: createRoute(() => import('../pages/chapters/Chapter8')),
    part3chapter3: createRoute(() => import('../pages/chapters/Chapter9')),

    // Part 4 Chapters (Password protected)
    part4chapter1: createRoute(() => import('../pages/chapters/Chapter10')),
    part4chapter2: createRoute(() => import('../pages/chapters/Chapter11')),
    part4chapter3: createRoute(() => import('../pages/chapters/Chapter12')),

    // Part 5 Chapters (Password protected)
    part5chapter1: createRoute(() => import('../pages/chapters/Chapter13')),
    part5chapter2: createRoute(() => import('../pages/chapters/Chapter14')),
    part5chapter3: createRoute(() => import('../pages/chapters/Chapter15')),
    part5chapter4: createRoute(() => import('../pages/chapters/Chapter16')),

    success: createRoute(() => import('../pages/SuccessPage')),
    createAccount: createRoute(() => import('../pages/CreateAccountPage')),
    login: createRoute(() => import('../LoginPage')),
    ergoPayment: createRoute(() => import('../ErgoPaymentPage')),
    dashboard: createRoute(() => import('../pages/Dashboard')),
    whyErgo: createRoute(() => import('../WhyErgo')),
    paymentGuide: createRoute(() => import('../PaymentGuide')),
    ergoGuide: createRoute(() => import('../ErgoGuide')),
    faq: createRoute(() => import('../FAQ')),
    games: createRoute(() => import('../pages/GamesPage')),
    hallOfFame: createRoute(() => import('../pages/HallOfFame')),

    notFound: createRoute(() => import('../pages/NotFoundPage')),
    // Tools
    infectionDiagnostic: createRoute(() => import('../components/tools/EmbeddableInfectionDiagnostic')),
};
