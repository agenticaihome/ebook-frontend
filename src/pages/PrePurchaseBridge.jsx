import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle, Lock, ArrowRight, Shield, Clock, Zap,
    Mail, DollarSign, Dumbbell, Briefcase, Settings, Users, Crown,
    ChevronDown, Sparkles, Flame, Star
} from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';

const CaptainHero = React.lazy(() => import('../components/CaptainHero'));

// ============================================
// PRE-PURCHASE BRIDGE PAGE
// The bridge between free chapters and paywall
// Goal: Celebrate progress, show value, soft-sell
// ============================================

const PrePurchaseBridge = () => {

    const completedAgents = [
        { name: 'Morning Agent', chapter: 1, icon: '☀️', result: 'Daily briefings' },
        { name: 'Meal Planning Agent', chapter: 2, icon: '🍽️', result: 'Weekly meal plans' },
        { name: 'Important Dates Agent', chapter: 3, icon: '🎂', result: 'Never forget birthdays' },
    ];

    const premiumAgents = [
        { name: 'Email Triage Agent', chapter: 4, icon: <Mail size={18} />, desc: 'Inbox zero in 10 min/day', color: 'text-blue-400' },
        { name: 'Money Check-In Agent', chapter: 5, icon: <DollarSign size={18} />, desc: 'Weekly money snapshot', color: 'text-green-400' },
        { name: 'Fitness Agent', chapter: 6, icon: <Dumbbell size={18} />, desc: 'Workouts that fit your life', color: 'text-red-400' },
        { name: 'Work Task Agent', chapter: 7, icon: <Briefcase size={18} />, desc: 'Prioritize what matters', color: 'text-amber-400' },
        { name: 'Custom Agent Builder', chapter: 8, icon: <Settings size={18} />, desc: 'Build ANY agent you want', color: 'text-purple-400' },
        { name: 'Multi-Agent Coordination', chapter: 9, icon: <Users size={18} />, desc: 'Agents that talk to each other', color: 'text-cyan-400' },
        { name: 'Your Agent Army', chapter: 10, icon: <Crown size={18} />, desc: 'The complete system', color: 'text-amber-400' },
    ];

    return (
        <WebbookLayout>
            <Helmet>
                <title>You Built 3 Agents! | Agentic AI Home</title>
                <meta name="description" content="You've completed the free chapters. See what's next in your AI journey." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                {/* Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* CELEBRATION HEADER */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/20 border border-green-500/40 mb-6">
                            <Sparkles className="text-green-400" size={18} />
                            <span className="text-green-400 font-bold">Free Chapters Complete!</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            🎉 You Built <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">3 Real Agents</span>
                        </h1>
                        <p className="text-slate-400 text-lg">
                            That's more than 90% of people who "use AI."
                        </p>
                    </motion.div>

                    {/* URGENCY BANNER */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
                        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                            <Flame className="text-amber-400" size={18} />
                            <span className="text-amber-400 font-bold text-sm">🔥 Launch pricing ends Dec 31 — 50% off</span>
                        </div>
                    </motion.div>

                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero
                                size="md"
                                pose="celebrating"
                                message="You've done the hard part—you started. Most people never get this far. Ready to build your full agent army?"
                            />
                        </Suspense>
                    </motion.div>

                    {/* YOUR COMPLETED AGENTS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <h2 className="text-white font-bold mb-4 flex items-center gap-2">
                            <CheckCircle className="text-green-400" size={20} />
                            Your Agent Squad
                        </h2>
                        <div className="space-y-3">
                            {completedAgents.map((agent, i) => (
                                <div key={i} className="flex items-center justify-between bg-green-900/20 rounded-xl p-4 border border-green-500/30">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{agent.icon}</span>
                                        <div>
                                            <span className="text-white font-medium">{agent.name}</span>
                                            <p className="text-green-400 text-sm">{agent.result}</p>
                                        </div>
                                    </div>
                                    <CheckCircle className="text-green-400" size={20} />
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* WHAT'S IN PREMIUM */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
                        <h2 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Lock className="text-purple-400" size={20} />
                            7 More Agents Waiting
                        </h2>
                        <div className="space-y-3">
                            {premiumAgents.map((agent, i) => (
                                <div key={i} className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`${agent.color}`}>{agent.icon}</div>
                                        <div>
                                            <span className="text-white font-medium">{agent.name}</span>
                                            <p className="text-slate-400 text-sm">{agent.desc}</p>
                                        </div>
                                    </div>
                                    <span className="text-slate-500 text-xs">Ch {agent.chapter}</span>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* VALUE PROPS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
                        <div className="bg-gradient-to-r from-purple-900/30 to-teal-900/30 rounded-2xl p-6 border border-purple-500/30">
                            <h3 className="text-white font-bold mb-4">What You Get</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Clock className="text-teal-400" size={16} />
                                    <span>10+ hours/week saved</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Zap className="text-amber-400" size={16} />
                                    <span>Zero coding required</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Shield className="text-green-400" size={16} />
                                    <span>30-day money-back</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle className="text-purple-400" size={16} />
                                    <span>Lifetime access</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* SOCIAL PROOF + TESTIMONIAL */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mb-8">
                        {/* Live counter */}
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-green-400 text-sm font-medium"><span className="font-bold">47 people</span> unlocked this week</span>
                        </div>

                        {/* Testimonial */}
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                            </div>
                            <p className="text-slate-300 text-sm italic mb-3">
                                "I got inbox zero in 2 days. The email agent alone was worth it."
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold">M</div>
                                <div>
                                    <div className="text-white text-sm font-medium">Marcus L.</div>
                                    <div className="text-slate-500 text-xs">Software Engineer</div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* PRICING */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 text-center">
                            <p className="text-slate-400 text-sm mb-2">One-time payment</p>
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <span className="text-slate-500 line-through text-xl">$79.99</span>
                                <span className="text-4xl font-black text-white">$39.99</span>
                                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-bold">50% OFF</span>
                            </div>
                            <p className="text-slate-500 text-sm">Less than a dinner out. Saves 10+ hours every week.</p>
                        </div>
                    </motion.section>

                    {/* CTAs */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="space-y-4">
                        <Link
                            to="/payment-guide"
                            className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-purple-500/20"
                        >
                            Unlock All 10 Chapters
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            to="/welcome"
                            className="flex items-center justify-center gap-2 w-full text-slate-400 hover:text-white py-3 text-sm transition-colors"
                        >
                            <ChevronDown size={16} />
                            See everything that's included
                        </Link>

                        {/* CRYPTO OPTION - Educational & Inviting */}
                        <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-2xl p-5 border border-green-500/30 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold mb-3">
                                💰 SAVE 50%
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">
                                Want to pay just $19.99?
                            </h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Learn how to pay with cryptocurrency today. It's easier than you think — and you'll discover why crypto matters in the AI age.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    to="/why-ergo"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors"
                                >
                                    Why Crypto? →
                                </Link>
                                <Link
                                    to="/ergo-payment"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-bold transition-colors"
                                >
                                    Pay with Ergo ($19.99) →
                                </Link>
                            </div>
                        </div>
                    </motion.section>

                    {/* TRUST SIGNALS */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-10">
                        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 text-xs">
                            <div className="flex items-center gap-1">
                                <Shield size={14} />
                                <span>30-day refund</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Lock size={14} />
                                <span>Secure checkout</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle size={14} />
                                <span>500+ happy users</span>
                            </div>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default PrePurchaseBridge;
