import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Rocket, Sparkles, Play, Users, Code, Twitter } from 'lucide-react';

const SplashPage = () => {
    return (
        <>
            <Helmet>
                <title>Agentic AI Home - Learn to Build Your AI Agent Team</title>
                <meta name="description" content="Master AI agents that automate your daily life. Free interactive course to reclaim 10+ hours per week." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-between px-4 py-8 md:py-12 relative overflow-x-hidden">

                {/* Ambient Background Effects - Enhanced */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-teal-500/15 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-orange-500/15 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
                </div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center max-w-xl flex-1 flex flex-col justify-center"
                >
                    {/* Logo - New Design */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-4 md:mb-8"
                    >
                        <div className="relative inline-block">
                            <img
                                src="/assets/logo-new.webp"
                                alt="Agentic AI Home"
                                width="176"
                                height="176"
                                className="w-28 h-28 md:w-44 md:h-44 mx-auto mb-4 md:mb-6 drop-shadow-[0_0_50px_rgba(20,184,166,0.4)]"
                            />
                            {/* Glow ring */}
                            <div className="absolute inset-0 w-28 h-28 md:w-44 md:h-44 mx-auto rounded-full bg-gradient-to-r from-teal-500/20 to-orange-500/20 blur-xl -z-10" />
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold text-white">
                            Agentic AI <span className="text-teal-400">Home</span>
                        </h1>
                        <p className="text-white text-base md:text-lg mt-1 md:mt-2 font-medium">
                            Featuring <span className="text-orange-400">Captain Efficiency</span>
                        </p>
                    </motion.div>

                    {/* Tagline - Enhanced */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6 md:mb-8"
                    >
                        <p className="text-xl md:text-3xl text-white font-medium mb-2 md:mb-3 leading-tight">
                            Learn to build your <span className="text-teal-400">AI agent team</span>
                        </p>
                        <p className="text-slate-400 text-base md:text-lg mb-3 md:mb-4">
                            and reclaim <span className="text-amber-400 font-bold">10+ hours</span> every week
                        </p>

                        {/* Content Preview */}
                        <p className="text-slate-500 text-xs md:text-sm">
                            16 chapters • Email, Calendar, Meal Planning & More
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
                            className="group inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-lg md:text-xl transition-all shadow-xl shadow-teal-500/40 hover:shadow-teal-500/60 hover:scale-105 border border-teal-400/30"
                        >
                            <Play size={20} className="group-hover:scale-110 transition-transform" />
                            Start Your Adventure
                            <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                        </Link>

                        <div className="flex items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6 text-xs md:text-sm flex-wrap">
                            <span className="flex items-center gap-1 text-green-400">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                Free to start
                            </span>
                            <span className="text-slate-500">•</span>
                            <span className="flex items-center gap-1 text-slate-400">
                                <Code size={12} />
                                No coding required
                            </span>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center justify-center gap-2 mt-3 md:mt-4">
                            <Users size={14} className="text-slate-500" />
                            <span className="text-slate-500 text-xs md:text-sm">
                                Trusted by <span className="text-white font-medium">50+ explorers</span>
                            </span>
                        </div>
                    </motion.div>

                    {/* Secondary Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-6 md:mt-10"
                    >
                        <Link
                            to="/dashboard"
                            className="text-slate-400 hover:text-teal-400 text-xs md:text-sm transition-colors inline-flex items-center gap-2"
                        >
                            Already started? Continue your journey
                            <Rocket size={12} />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Footer with Socials - Now in flow, not absolute */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="relative z-10 text-center mt-6 md:mt-8"
                >
                    <p className="text-slate-500 text-xs md:text-sm mb-2 md:mb-3">
                        Guided by <span className="text-orange-400 font-medium">Captain Efficiency</span>
                    </p>
                    <div className="flex items-center justify-center gap-5">
                        <a
                            href="https://x.com/agenticaihome"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-teal-400 transition-colors"
                            aria-label="Follow on X/Twitter"
                        >
                            <Twitter size={16} />
                        </a>
                        <a
                            href="https://www.tiktok.com/@agentic_ai_home"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-teal-400 transition-colors"
                            aria-label="Follow on TikTok"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=61584386536838"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-teal-400 transition-colors"
                            aria-label="Follow on Facebook"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default SplashPage;



