import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WebbookLayout from '../components/layout/WebbookLayout';
import CaptainHero from '../components/CaptainHero';

const NotFoundPage = () => {
    return (
        <WebbookLayout>
            <Helmet>
                <title>404 - Page Not Found | Agentic AI Home</title>
                <meta name="description" content="This page doesn't exist. Return home to explore AI automation for your daily life." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center px-6">
                <div className="max-w-2xl w-full text-center">
                    <CaptainHero
                        size="lg"
                        pose="thinking"
                        position="center"
                        message="This page doesn't exist. Unlike your 47 open browser tabs, which definitely do."
                    />

                    <div className="mt-12">
                        <h1 className="text-6xl font-bold text-slate-700 mb-4">404</h1>
                        <h2 className="text-2xl font-bold text-white mb-6">System Error: Page Not Found</h2>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/"
                                className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold transition-all"
                            >
                                Return to Base
                            </Link>
                            <Link
                                to="/part1"
                                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold transition-all border border-slate-600"
                            >
                                Start Part 1
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </WebbookLayout>
    );
};

export default NotFoundPage;
