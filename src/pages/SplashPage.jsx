import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Zap, Clock, Users, ArrowRight, Shield } from 'lucide-react';
import EmailCaptureForm from '../components/common/EmailCaptureForm';

const SplashPage = () => {
    return (
        <>
            <Helmet>
                <title>Agentic AI Home - Stop Doing Everything. Start Delegating to AI.</title>
                <meta name="description" content="Captain Efficiency guides you through 10 chapters to automate your life. Reclaim 5+ hours every week with AI agents." />
                {/* Preload critical hero assets for faster LCP */}
                <link rel="preload" as="image" href="/assets/captain-pointing-transparent.webp" />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0a1628] to-slate-950 flex flex-col items-center justify-between px-4 py-12 md:py-20 relative overflow-hidden">

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Animated gradient orbs - REDUCED OPACITY */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-[200px] sm:w-[300px] md:w-[600px] h-[200px] sm:h-[300px] md:h-[600px] bg-teal-500 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.05, 0.15, 0.05]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-1/4 right-1/4 w-[175px] sm:w-[280px] md:w-[500px] h-[175px] sm:h-[280px] md:h-[500px] bg-orange-500 rounded-full blur-[50px] sm:blur-[70px] md:blur-[100px]"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 text-center max-w-4xl flex-1 flex flex-col justify-center items-center w-full">

                    {/* Captain Efficiency Hero Video */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative mb-6 md:mb-8"
                    >
                        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
                            {/* Glow ring behind video */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/30 to-orange-500/30 blur-2xl animate-pulse" />

                            {/* Video container */}
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="relative w-full h-full object-cover rounded-full video-fade"
                                poster="/assets/captain-pointing-transparent.webp"
                                onPlaying={(e) => e.target.classList.add('video-playing')}
                            >
                                <source src="/assets/captain-splash-hero.mp4" type="video/mp4" />
                                {/* Fallback to image */}
                                <img
                                    src="/assets/captain-pointing-transparent.webp"
                                    alt="Captain Efficiency"
                                    className="w-full h-full object-cover"
                                    fetchpriority="high"
                                />
                            </video>

                            {/* Outer glow ring */}
                            <div className="absolute -inset-2 rounded-full border border-teal-500/20 animate-pulse" />
                        </div>

                        {/* Speech bubble */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm border border-teal-500/30 rounded-xl px-4 py-2 whitespace-nowrap"
                        >
                            <p className="text-sm md:text-base text-white font-medium">
                                Ready to reclaim your time? <span className="text-teal-400">It's easier than you think.</span>
                            </p>
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-slate-800/90" />
                        </motion.div>
                    </motion.div>

                    {/* Hero Headline - Punchy & Short */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-6 md:mb-8"
                    >
                        {/* Descriptor for instant understanding */}
                        <p className="text-teal-400 text-sm md:text-base font-medium mb-3 tracking-wide">
                            Step-by-step guide to freedom
                        </p>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
                            Your AI. Your Rules.
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Your Time Back.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Set up once. AI handles it daily. Reclaim <span className="text-white font-bold">5+ hours/week</span>.
                        </p>
                    </motion.div>

                    {/* Value Props - Condensed */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 text-sm md:text-base"
                    >
                        <div className="flex items-center gap-2 text-slate-300">
                            <Clock size={18} className="text-teal-400" />
                            <span><span className="text-white font-bold">5+ hours</span>/week saved</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <Zap size={18} className="text-amber-400" />
                            <span><span className="text-white font-bold">Zero</span> tech skills needed</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <Shield size={18} className="text-green-400" />
                            <span><span className="text-white font-bold">30-day</span> money-back</span>
                        </div>
                    </motion.div>

                    {/* Primary CTA - Big and Bold */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mb-6"
                    >
                        <Link
                            to="/start"
                            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 bg-[length:200%_100%] hover:bg-right text-white px-10 md:px-14 py-5 md:py-6 rounded-2xl font-bold text-xl md:text-2xl transition-all duration-500 shadow-2xl shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.02] active:scale-[0.98] border border-teal-400/50"
                        >
                            <span>Start Free</span>
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />

                            {/* Glow pulse */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                        </Link>
                        <p className="mt-3 text-slate-500 text-sm font-medium">✨ No credit card required</p>
                    </motion.div>

                    {/* Social Proof - Clean & Consolidated */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <div className="flex -space-x-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs text-white font-bold">
                                    {['S', 'M', 'J', 'A'][i]}
                                </div>
                            ))}
                        </div>
                        <span className="text-slate-300 text-sm">
                            <span className="text-yellow-400">★★★★★</span> <span className="text-white font-semibold">500+</span> people learning
                        </span>
                    </motion.div>

                    {/* Micro-testimonial for trust */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
                        className="mt-4 text-center"
                    >
                        <p className="text-slate-300 text-sm italic">
                            "I set up my first agent in 10 minutes. Now my mornings run themselves."
                            <span className="text-teal-400 font-medium not-italic ml-1">— Sarah M., working mom</span>
                        </p>
                    </motion.div>

                    {/* Secondary link - Minimal, for returning users only */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="mt-8"
                    >
                        <Link
                            to="/login"
                            className="text-slate-500 hover:text-teal-400 text-sm transition-colors py-3 px-6 rounded-lg -mx-6 active:bg-slate-800/50"
                        >
                            Already a member? Sign in →
                        </Link>
                    </motion.div>


                </div>



                {/* Footer Socials - Colorful */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="relative z-10 flex flex-col items-center gap-3 pb-4"
                >
                    <div className="flex items-center gap-4">
                        <a href="https://x.com/agenticaihome" target="_blank" rel="noopener noreferrer" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-white hover:scale-110 transition-all" aria-label="Follow us on X (Twitter)">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a href="https://www.tiktok.com/@agentic_ai_home" target="_blank" rel="noopener noreferrer" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-pink-400 hover:scale-110 transition-all" aria-label="Follow us on TikTok">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61584386536838" target="_blank" rel="noopener noreferrer" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-blue-400 hover:scale-110 transition-all" aria-label="Follow us on Facebook">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                        <a href="mailto:support@agenticaihome.com" className="hover:text-slate-400 transition-colors">support@agenticaihome.com</a>
                        <span>•</span>
                        <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
                        <span>•</span>
                        <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default SplashPage;
