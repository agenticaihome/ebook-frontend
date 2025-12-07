import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Rocket, Sparkles } from 'lucide-react';

const SplashPage = () => {
    return (
        <>
            <Helmet>
                <title>Agentic AI Home - Learn to Build Your AI Agent Team</title>
                <meta name="description" content="Master AI agents that automate your daily life. Free interactive course to reclaim 10+ hours per week." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">

                {/* Ambient Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
                </div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center max-w-lg"
                >
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6"
                    >
                        <img
                            src="/assets/logo.png"
                            alt="Agentic AI Home"
                            className="w-24 h-24 mx-auto mb-4 drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]"
                        />
                        <h1 className="text-2xl font-bold text-white">
                            Agentic AI <span className="text-teal-400">Home</span>
                        </h1>
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-slate-300 mb-8 leading-relaxed"
                    >
                        Learn to build your <span className="text-teal-400 font-medium">AI agent team</span>
                        <br />
                        <span className="text-slate-400 text-base">and reclaim 10+ hours every week</span>
                    </motion.p>

                    {/* Captain E Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-32 h-32 mx-auto"
                            style={{
                                filter: 'drop-shadow(0 0 20px rgba(251, 146, 60, 0.3))'
                            }}
                        >
                            <source src="/assets/captain-waving.webm" type="video/webm" />
                        </video>
                    </motion.div>

                    {/* Primary CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link
                            to="/welcome"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105"
                        >
                            <Rocket size={22} />
                            Start Learning — Free
                            <Sparkles size={18} />
                        </Link>

                        <p className="text-slate-500 text-sm mt-4">
                            Interactive course • No sign-up required
                        </p>
                    </motion.div>

                    {/* Secondary Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8"
                    >
                        <Link
                            to="/dashboard"
                            className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
                        >
                            Already started? Continue your journey →
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-6 text-center"
                >
                    <p className="text-slate-600 text-xs">
                        Guided by Captain E • Your AI Efficiency Coach
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default SplashPage;
