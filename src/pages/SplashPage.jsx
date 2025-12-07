import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Rocket, Sparkles, Play } from 'lucide-react';

const SplashPage = () => {
    return (
        <>
            <Helmet>
                <title>Agentic AI Home - Learn to Build Your AI Agent Team</title>
                <meta name="description" content="Master AI agents that automate your daily life. Free interactive course to reclaim 10+ hours per week." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">

                {/* Ambient Background Effects - Enhanced */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
                </div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center max-w-xl"
                >
                    {/* Logo - New Design */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="relative inline-block">
                            <img
                                src="/assets/logo-new.png"
                                alt="Agentic AI Home"
                                className="w-36 h-36 md:w-44 md:h-44 mx-auto mb-6 drop-shadow-[0_0_50px_rgba(20,184,166,0.4)]"
                            />
                            {/* Glow ring */}
                            <div className="absolute inset-0 w-36 h-36 md:w-44 md:h-44 mx-auto rounded-full bg-gradient-to-r from-teal-500/20 to-orange-500/20 blur-xl -z-10" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Agentic AI <span className="text-teal-400">Home</span>
                        </h1>
                        <p className="text-white text-lg mt-2 font-medium">
                            Featuring <span className="text-orange-400">Captain Efficiency</span>
                        </p>
                    </motion.div>

                    {/* Tagline - Enhanced */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-10"
                    >
                        <p className="text-2xl md:text-3xl text-white font-medium mb-3 leading-tight">
                            Learn to build your <span className="text-teal-400">AI agent team</span>
                        </p>
                        <p className="text-slate-400 text-lg">
                            and reclaim <span className="text-amber-400 font-bold">10+ hours</span> every week
                        </p>
                    </motion.div>



                    {/* Primary CTA - More Prominent */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link
                            to="/welcome"
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-teal-500/40 hover:shadow-teal-500/60 hover:scale-105 border border-teal-400/30"
                        >
                            <Play size={24} className="group-hover:scale-110 transition-transform" />
                            Start Your Adventure
                            <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                        </Link>

                        <div className="flex items-center justify-center gap-4 mt-6 text-sm">
                            <span className="flex items-center gap-1 text-green-400">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                Free to start
                            </span>
                            <span className="text-slate-500">•</span>
                            <span className="text-slate-400">No sign-up required</span>
                        </div>
                    </motion.div>

                    {/* Secondary Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-10"
                    >
                        <Link
                            to="/dashboard"
                            className="text-slate-400 hover:text-teal-400 text-sm transition-colors inline-flex items-center gap-2"
                        >
                            Already started? Continue your journey
                            <Rocket size={14} />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 text-center"
                >
                    <p className="text-slate-500 text-sm">
                        Guided by <span className="text-orange-400 font-medium">Captain Efficiency</span> • Your AI Efficiency Coach
                    </p>
                </motion.div>
            </div>
        </>
    );
};

export default SplashPage;

