import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
    Sparkles, Zap, Clock, ArrowRight, Check, BookOpen,
    Rocket, Heart, Shield, Gamepad2, Bot, ChevronRight
} from 'lucide-react';

const OnboardingPage = () => {
    return (
        <>
            <Helmet>
                <title>Welcome to Agentic AI - Your Adventure Begins</title>
                <meta name="description" content="Captain Efficiency welcomes you to the Agentic AI world. Learn how AI agents will give you TIME back." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0a1628] to-slate-950 text-white overflow-hidden">

                {/* Cinematic Background */}
                <div className="fixed inset-0 pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500 rounded-full blur-[150px]"
                    />
                    <motion.div
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-500 rounded-full blur-[120px]"
                    />
                </div>

                {/* SECTION 1: Welcome Hero */}
                <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        {/* Captain Efficiency */}
                        <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto mb-8">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/30 to-orange-500/30 blur-2xl animate-pulse" />
                            <video
                                autoPlay loop muted playsInline
                                className="relative w-full h-full object-cover rounded-full"
                                poster="/assets/captain-pointing-transparent.webp"
                            >
                                <source src="/assets/captain-splash-hero.mp4" type="video/mp4" />
                            </video>

                            {/* Speech Bubble */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/90 backdrop-blur border border-teal-500/40 rounded-xl px-4 py-2 whitespace-nowrap"
                            >
                                <p className="text-sm md:text-base font-medium">
                                    Welcome, friend! <span className="text-teal-400">I'm Captain Efficiency.</span>
                                </p>
                            </motion.div>
                        </div>

                        {/* DDS Welcome */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/20 border border-amber-500/30 text-amber-400 text-sm font-bold mb-6">
                                🌍 WELCOME TO THE AGENTIC AI WORLD
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                                You're About to Get Your
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400"> TIME </span>
                                Back.
                            </h1>

                            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                                This isn't just a course. It's your personal journey to automate the boring stuff
                                so you can focus on <span className="text-white font-semibold">what actually matters</span>.
                            </p>
                        </motion.div>

                        {/* Scroll Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="mt-8"
                        >
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-slate-500 text-sm"
                            >
                                Scroll to begin ↓
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* SECTION 2: The Big Picture */}
                <section className="py-20 px-6 bg-slate-900/50">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-4xl font-bold mb-6">
                                Here's What's About to Happen
                            </h2>

                            <div className="grid md:grid-cols-3 gap-6 mt-10">
                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                                    <div className="text-4xl mb-4">📖</div>
                                    <h3 className="text-lg font-bold text-white mb-2">What Is This?</h3>
                                    <p className="text-slate-400 text-sm">
                                        An interactive AI adventure that teaches you to build <span className="text-teal-400">real agent systems</span>.
                                    </p>
                                </div>
                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                                    <div className="text-4xl mb-4">⏰</div>
                                    <h3 className="text-lg font-bold text-white mb-2">Why Does It Matter?</h3>
                                    <p className="text-slate-400 text-sm">
                                        You'll save <span className="text-amber-400">5+ hours every week</span> once you deploy your agents.
                                    </p>
                                </div>
                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                                    <div className="text-4xl mb-4">🚀</div>
                                    <h3 className="text-lg font-bold text-white mb-2">What Do I Do?</h3>
                                    <p className="text-slate-400 text-sm">
                                        Start Mission 1. Captain Efficiency will <span className="text-teal-400">guide you step-by-step</span>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 3: How It Works */}
                <section className="py-20 px-6">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-2xl md:text-4xl font-bold mb-4">How This Works</h2>
                            <p className="text-slate-400">4 simple steps to freedom</p>
                        </motion.div>

                        <div className="grid md:grid-cols-4 gap-4">
                            {[
                                { step: 1, icon: <BookOpen />, title: "Read", desc: "Short, fun chapters", color: "teal" },
                                { step: 2, icon: <Rocket />, title: "Deploy", desc: "Build small AI agents", color: "purple" },
                                { step: 3, icon: <Heart />, title: "Feel", desc: "Stress drops, time returns", color: "pink" },
                                { step: 4, icon: <Sparkles />, title: "Unlock", desc: "Deeper missions await", color: "amber" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative"
                                >
                                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 text-center h-full">
                                        <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-${item.color}-500/20 flex items-center justify-center text-${item.color}-400`}>
                                            {item.icon}
                                        </div>
                                        <div className="text-xs text-slate-500 mb-1">Step {item.step}</div>
                                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-slate-400 text-sm">{item.desc}</p>
                                    </div>
                                    {i < 3 && (
                                        <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-slate-600">
                                            <ChevronRight size={20} />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 4: Captain Efficiency Guide Mode */}
                <section className="py-20 px-6 bg-gradient-to-b from-transparent to-teal-900/10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/60 rounded-3xl p-8 md:p-12 border border-teal-500/20"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden">
                                        <img
                                            src="/assets/captain-pointing-transparent.webp"
                                            alt="Captain Efficiency"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-sm font-bold mb-4">
                                        <Bot size={14} /> GUIDE MODE ACTIVATED
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        I'll Be With You Every Step
                                    </h3>
                                    <ul className="space-y-2 text-slate-300">
                                        <li className="flex items-center gap-2">
                                            <Check size={16} className="text-teal-400" /> I'll highlight what to do next
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check size={16} className="text-teal-400" /> I'll explain things simply
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check size={16} className="text-teal-400" /> I'll celebrate your wins
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check size={16} className="text-teal-400" /> No overwhelm. No jargon. Just fun.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 5: Objection Handling */}
                <section className="py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { worry: "I'm bad with tech", answer: "No tech skills required. Seriously." },
                                { worry: "Is this too much work?", answer: "Each mission takes only minutes." },
                                { worry: "Will I actually use this?", answer: "Your first win happens fast." },
                                { worry: "I don't understand AI", answer: "That's exactly why we made this fun." },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50"
                                >
                                    <p className="text-slate-500 text-sm mb-1">"{item.worry}"</p>
                                    <p className="text-white font-medium">{item.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 6: Choose Your Path CTA */}
                <section className="py-20 px-6 bg-gradient-to-t from-slate-950 to-transparent">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                Ready to Begin?
                            </h2>
                            <p className="text-slate-400 mb-10">
                                Choose how you want to start your adventure.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
                                {/* Recommended Path */}
                                <Link to="/part1/chapter1" className="group block">
                                    <div className="relative bg-gradient-to-br from-teal-500/20 to-cyan-500/10 rounded-2xl p-6 border-2 border-teal-500/50 hover:border-teal-400 transition-all hover:-translate-y-1">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">
                                            ⭐ RECOMMENDED
                                        </div>
                                        <div className="text-4xl mb-3">🚀</div>
                                        <h3 className="text-xl font-bold text-white mb-2">Start Mission 1</h3>
                                        <p className="text-slate-400 text-sm mb-4">The full story experience. Best for first-timers.</p>
                                        <div className="flex items-center justify-center gap-2 text-teal-400 font-bold">
                                            Begin Adventure <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>

                                {/* Games Hub */}
                                <Link to="/games" className="group block">
                                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all hover:-translate-y-1">
                                        <div className="text-4xl mb-3">🎮</div>
                                        <h3 className="text-xl font-bold text-white mb-2">Games Hub</h3>
                                        <p className="text-slate-400 text-sm mb-4">Play fun mini-games while learning AI concepts.</p>
                                        <div className="flex items-center justify-center gap-2 text-purple-400 font-bold">
                                            Explore Games <Gamepad2 size={18} />
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Secondary Links */}
                            <div className="flex flex-wrap justify-center gap-4 text-sm">
                                <Link to="/dashboard" className="text-slate-500 hover:text-white transition-colors">
                                    Already started? Go to Dashboard →
                                </Link>
                                <Link to="/pricing" className="text-slate-500 hover:text-amber-400 transition-colors">
                                    View Pricing & Features →
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Social Proof Footer */}
                <section className="py-10 px-6 border-t border-slate-800/50">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <Shield size={16} className="text-green-400" />
                                Built using real systems The DDS uses daily
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap size={16} className="text-amber-400" />
                                Made for busy humans, parents, students
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles size={16} className="text-purple-400" />
                                There's nothing else like this
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default OnboardingPage;
