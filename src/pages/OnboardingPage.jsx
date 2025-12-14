import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
    Sparkles, Zap, Clock, ArrowRight, Check, BookOpen,
    Rocket, Heart, Shield, Gamepad2, Bot, ChevronRight
} from 'lucide-react';
import AgentEcosystem from '../components/common/AgentEcosystem';
import AIExperienceQuiz from '../components/AIExperienceQuiz';

const OnboardingPage = () => {
    return (
        <>
            <Helmet>
                <title>Get Started - Build Your First AI Agent in 5 Minutes</title>
                <meta name="description" content="Captain Efficiency welcomes you to the Agentic AI world. Learn how AI agents will give you TIME back." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0a1628] to-slate-950 text-white overflow-hidden">

                {/* Cinematic Background */}
                <div className="fixed inset-0 pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-[150px] sm:w-[250px] md:w-[500px] h-[150px] sm:h-[250px] md:h-[500px] bg-teal-500 rounded-full blur-[60px] sm:blur-[90px] md:blur-[150px]"
                    />
                    <motion.div
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-1/4 right-1/4 w-[120px] sm:w-[200px] md:w-[400px] h-[120px] sm:h-[200px] md:h-[400px] bg-orange-500 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]"
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
                                className="relative w-full h-full object-cover rounded-full video-fade"
                                poster="/assets/captain-pointing-transparent.webp"
                                onPlaying={(e) => e.target.classList.add('video-playing')}
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
                                Drowning in Admin?
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400"> Get Your Life Back.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                                Stop meal planning at midnight. Stop stressing over emails.
                                Build your own <span className="text-white font-bold">team of 10 AI agents</span> to handle it all for you.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="mt-8"
                        >
                            <motion.button
                                onClick={() => document.getElementById('section-big-picture')?.scrollIntoView({ behavior: 'smooth' })}
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-slate-500 text-sm hover:text-teal-400 transition-colors cursor-pointer"
                            >
                                Scroll to begin ↓
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </section>

                {/* SECTION 2: The Big Picture */}
                <section id="section-big-picture" className="py-20 px-6 bg-slate-900/50">
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
                                    <p className="text-slate-300 text-sm">
                                        An interactive webbook that teaches you to build <span className="text-teal-400">real AI agent systems</span>.
                                    </p>
                                </div>
                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                                    <div className="text-4xl mb-4">⏰</div>
                                    <h3 className="text-lg font-bold text-white mb-2">Why Does It Matter?</h3>
                                    <p className="text-slate-300 text-sm">
                                        You'll save <span className="text-amber-400">5+ hours every week</span> once you deploy your agents.
                                    </p>
                                </div>
                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                                    <div className="text-4xl mb-4">🚀</div>
                                    <h3 className="text-lg font-bold text-white mb-2">What Do I Do?</h3>
                                    <p className="text-slate-300 text-sm">
                                        Start Mission 1. Captain Efficiency will <span className="text-teal-400">guide you step-by-step</span>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Early CTA - Reduce scroll fatigue for eager users */}
                <section className="py-8 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-xl mx-auto text-center"
                    >
                        <div className="relative inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-teal-500/15 to-cyan-500/15 border-2 border-teal-500/50 rounded-2xl shadow-lg shadow-teal-500/10">
                            {/* Animated glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl animate-pulse -z-10" />

                            <div className="text-center sm:text-left">
                                <p className="text-white text-lg font-bold mb-1">🚀 Ready to start now?</p>
                                <p className="text-slate-400 text-sm">Skip the intro and jump right in</p>
                            </div>
                            <Link to="/part1/chapter1" className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-teal-500/30 hover:scale-[1.02] whitespace-nowrap">
                                Begin Chapter 1 <ArrowRight size={20} />
                            </Link>
                        </div>
                        <p className="text-slate-500 text-xs mt-4">Or keep scrolling to learn more ↓</p>
                    </motion.div>
                </section>

                {/* SECTION 2B: Who This Is For */}
                <section className="py-16 px-6">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-10"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-400 text-sm font-bold mb-4">
                                🌍 THIS IS FOR EVERYONE
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold">Curious, Skeptical, or Already Using AI?</h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                { emoji: '👶', title: 'Complete Beginners', desc: 'Never touched AI? Perfect. We start from zero.' },
                                { emoji: '👨‍👩‍👧‍👦', title: 'Busy Humans', desc: 'Parents, students, professionals—AI gives you back time.' },
                                { emoji: '🚀', title: 'AI Enthusiasts', desc: 'Already using ChatGPT? Go deeper with real systems.' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/80 transition-all"
                                >
                                    <span className="text-3xl mb-3 block">{item.emoji}</span>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 2B-2: AI Experience Quiz (FREE TOOL) */}
                <section className="py-16 px-6 bg-gradient-to-b from-purple-900/5 to-transparent">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold mb-3">
                                🎯 FREE TOOL
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                                What's Your AI Readiness Level?
                            </h2>
                            <p className="text-slate-300 text-sm">
                                Take this 60-second quiz to discover your starting point and get personalized recommendations.
                            </p>
                        </motion.div>

                        <AIExperienceQuiz />
                    </div>
                </section>

                {/* SECTION 2C: Why AI Feels Like Magic */}
                <section className="py-16 px-6 bg-gradient-to-b from-cyan-900/5 to-transparent">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-8 border border-cyan-500/20"
                        >
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold mb-3">
                                    ✨ THE MAGIC MOMENT
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold">Why AI Feels Like Having Superpowers</h2>
                            </div>

                            <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
                                <p>
                                    <span className="text-cyan-400 font-bold">That first time your AI handles a task for you...</span>
                                    <span className="text-slate-300"> it changes something.</span>
                                </p>
                                <p>
                                    You wake up to a <span className="text-white font-medium">perfectly organized inbox</span>.
                                    Your grocery list appears <span className="text-white font-medium">before you think about it</span>.
                                </p>
                                <p>
                                    This isn't sci-fi. This is <span className="text-amber-400 font-bold">what AI can do for you right now</span>.
                                </p>
                            </div>

                            {/* Emotional Journey */}
                            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-700/50">
                                <div className="text-center">
                                    <div className="text-2xl mb-1">😰</div>
                                    <div className="text-xs text-slate-500">Before</div>
                                    <div className="text-sm text-slate-300">Overwhelmed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-1">😌</div>
                                    <div className="text-xs text-slate-500">After Setup</div>
                                    <div className="text-sm text-slate-300">Calm</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-1">🚀</div>
                                    <div className="text-xs text-slate-500">Long-term</div>
                                    <div className="text-sm text-slate-300">In Control</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2D: The Agent Ecosystem (Jensen Huang Audit) */}
                <section className="py-20 px-6 bg-slate-900/30 border-y border-slate-800/50">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Meet Your New <span className="text-teal-400">Agent Army</span>
                            </h2>
                            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                                You are the CEO. They are your employees.
                                <br />
                                They work 24/7/365. They never complain. They don't need coffee.
                            </p>
                        </motion.div>

                        <AgentEcosystem />

                        <div className="mt-8 text-sm text-slate-500 italic">
                            * You will build every single one of these from scratch.
                        </div>
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
                            <p className="text-slate-300">4 simple steps to freedom</p>
                        </motion.div>

                        <div className="grid md:grid-cols-4 gap-4">
                            {[
                                { step: 1, icon: <BookOpen />, title: "Read", desc: "Short, fun chapters", color: "#14b8a6" },
                                { step: 2, icon: <Rocket />, title: "Deploy", desc: "Build small AI agents", color: "#a855f7" },
                                { step: 3, icon: <Heart />, title: "Feel", desc: "Stress drops, time returns", color: "#ec4899" },
                                { step: 4, icon: <Sparkles />, title: "Unlock", desc: "Deeper missions await", color: "#f59e0b" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative"
                                >
                                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 text-center h-full hover:border-slate-600 transition-all">
                                        <div
                                            className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                                            style={{ backgroundColor: `${item.color}20`, color: item.color }}
                                        >
                                            {item.icon}
                                        </div>
                                        <div className="text-xs text-slate-500 mb-1">Step {item.step}</div>
                                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-slate-300 text-sm">{item.desc}</p>
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
                                { worry: "Will I actually use this?", answer: "Your first win happens in minutes." },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/50 transition-colors"
                                >
                                    <p className="text-slate-500 text-sm mb-2 font-medium">"{item.worry}"</p>
                                    <p className="text-white text-lg font-bold">{item.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 5B: Who Made This (Trust Builder) */}
                <section className="py-16 px-6 bg-gradient-to-b from-transparent to-slate-900/30">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-700/50"
                        >
                            <div className="flex flex-col md:flex-row items-start gap-6">
                                <div className="flex-shrink-0 hidden md:block">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-2xl font-bold text-white">
                                        D
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-teal-400 font-medium mb-2">👋 Who Made This?</div>
                                    <p className="text-slate-300 mb-4 leading-relaxed">
                                        I'm a dental resident and Army vet with two kids under 3. I built this with <span className="text-white font-medium">zero coding experience</span> — just AI tools, late nights, and a refusal to quit.
                                    </p>
                                    <p className="text-slate-300 text-sm mb-4">
                                        The agents in this course are the same ones I use to manage my own chaotic life. If they can handle a 50+ hour clinical week plus toddlers, they can handle yours.
                                    </p>
                                    <Link
                                        to="/faq"
                                        className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
                                    >
                                        Read the full story in FAQ →
                                    </Link>
                                    <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-500">
                                        — DDS <span className="text-slate-600">(Dad Deploying Systems)</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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
                            <p className="text-slate-300 mb-10">
                                Choose how you want to start.
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
                                        <p className="text-slate-300 text-sm mb-4">The full story experience. Best for first-timers.</p>
                                        <div className="flex items-center justify-center gap-2 text-teal-400 font-bold">
                                            Start Learning <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>

                                {/* Games Hub - Secondary option */}
                                <Link to="/games" className="group block">
                                    <div className="bg-slate-800/30 rounded-2xl p-5 border border-slate-700/50 hover:border-purple-500/30 transition-all hover:-translate-y-1">
                                        <div className="text-3xl mb-2">🎮</div>
                                        <h3 className="text-lg font-bold text-white mb-1">Games Hub</h3>
                                        <p className="text-slate-500 text-xs mb-3">Learn AI through fun mini-games</p>
                                        <div className="flex items-center justify-center gap-2 text-purple-400 text-sm font-medium">
                                            Explore Games <Gamepad2 size={14} />
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Secondary Links */}
                            <div className="flex flex-wrap justify-center gap-4 text-sm">
                                <Link to="/dashboard" className="text-slate-500 hover:text-white transition-colors">
                                    Already started? Go to Dashboard →
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
                                Built using real systems the DDS uses daily
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

                {/* STICKY MOBILE CTA - Fixed bottom bar */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent md:hidden z-50">
                    <Link
                        to="/part1/chapter1"
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-teal-500/30"
                    >
                        Start Learning Free <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Bottom spacer for sticky CTA on mobile */}
                <div className="h-20 md:hidden" />
            </div>
        </>
    );
};

export default OnboardingPage;
