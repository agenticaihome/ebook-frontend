import React, { Suspense, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle, Lock, ArrowRight, Shield, Clock, Zap,
    Mail, DollarSign, Dumbbell, Briefcase, Settings, Users, Crown,
    ChevronDown, Sparkles, Flame, Star, Gamepad2, Wrench
} from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';

const CaptainHero = React.lazy(() => import('../components/CaptainHero'));

// ============================================
// PRE-PURCHASE BRIDGE PAGE
// The bridge between free chapters and paywall
// Goal: Celebrate progress, show value, soft-sell
// ============================================

const PrePurchaseBridge = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:8080/api'
                : 'https://ebook-backend-production-8f68.up.railway.app/api';

            const response = await fetch(`${API_URL}/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, source: 'unlock_page' }),
            });
            if (response.ok) {
                setSubscribed(true);
            } else {
                throw new Error('Failed');
            }
        } catch (err) {
            alert('Oops! Something went wrong. Try again or email us at support@agenticaihome.com');
        } finally {
            setIsSubmitting(false);
        }
    };

    const completedAgents = [
        { name: 'Morning Agent', chapter: 1, icon: '☀️', result: 'Daily briefings' },
    ];

    const premiumAgents = [
        { name: 'Meal Planning Agent', chapter: 2, icon: <Mail size={18} />, desc: 'Weekly meal plans made easy', color: 'text-orange-400' },
        { name: 'Important Dates Agent', chapter: 3, icon: <Clock size={18} />, desc: 'Never forget birthdays again', color: 'text-pink-400' },
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
                <title>Your First Agent Complete! | Agentic AI Home</title>
                <meta name="description" content="You've built your first AI agent. See what's next in your journey to automate your life." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                {/* Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* CAPTAIN HERO - Emotional Hook */}
                    <motion.section
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center mb-10"
                    >
                        {/* Captain Video */}
                        <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-6">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/30 to-orange-500/30 blur-2xl animate-pulse" />
                            <Suspense fallback={
                                <div className="w-full h-full rounded-full bg-slate-800 animate-pulse" />
                            }>
                                <CaptainHero
                                    message="You did it! Now let me show you what's possible..."
                                    size="sm"
                                />
                            </Suspense>
                        </div>

                        {/* Vision Statement */}
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Imagine Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Whole Life</span> Automated
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-6">
                            You've automated 3 things. Now picture never worrying about emails, money, fitness, or forgetting anything—ever again.
                        </p>

                        {/* Quick Vision Cards */}
                        <div className="grid grid-cols-3 gap-3 text-center mb-8">
                            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                                <div className="text-2xl mb-1">📧</div>
                                <p className="text-xs text-slate-400">Inbox Zero</p>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                                <div className="text-2xl mb-1">💰</div>
                                <p className="text-xs text-slate-400">Money Tracked</p>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                                <div className="text-2xl mb-1">💪</div>
                                <p className="text-xs text-slate-400">Fitness Sorted</p>
                            </div>
                        </div>

                        {/* Early CTA for Eager Users */}
                        <Link
                            to="/payment-guide"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold transition-all shadow-lg shadow-teal-500/20"
                        >
                            Ready to unlock all 10? →
                        </Link>
                        <p className="text-slate-500 text-xs mt-2">or scroll to learn more ↓</p>
                    </motion.section>

                    {/* CELEBRATION HEADER */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/20 border border-green-500/40 mb-6">
                            <Sparkles className="text-green-400" size={18} />
                            <span className="text-green-400 font-bold">Chapter 1 Complete!</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            🎉 You Built <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">Your First Agent</span>
                        </h1>
                        <p className="text-slate-400 text-lg">
                            That's more than most people ever do. Ready to build your agent army?
                        </p>

                        {/* SHARE BUTTONS - Referral Discount Mechanic */}
                        <div className="mt-6 p-5 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-2xl border-2 border-amber-500/40">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <span className="text-2xl">🎁</span>
                                <p className="text-white font-bold text-lg">Share & Save $5</p>
                            </div>
                            <p className="text-amber-200 text-sm text-center mb-4">
                                Share with a friend → When they sign up, you BOTH get $5 off!
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("🤯 Just built 3 AI helpers in 15 minutes — they handle my morning briefings, meal planning & reminders automatically!\n\nNo coding needed. If I can do this, anyone can. Use my link for $5 off:")}&url=${encodeURIComponent("https://agenticaihome.com?ref=twitter")}&hashtags=AI,productivity`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-gray-900 text-white text-sm font-medium transition-colors"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                    Share on X
                                </a>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://agenticaihome.com?ref=facebook")}&quote=${encodeURIComponent("Just built 3 AI helpers in 15 minutes! No coding needed 🤖 Get $5 off with my link!")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166FE5] text-white text-sm font-medium transition-colors"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    Share
                                </a>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText('Check this out — I just built 3 AI helpers in 15 minutes! No coding needed. Get $5 off with my link: https://agenticaihome.com?ref=friend');
                                        alert('✅ Referral link copied! Send it to a friend and you BOTH save $5.');
                                    }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium transition-colors"
                                >
                                    🔗 Copy Referral Link
                                </button>
                            </div>
                            <p className="text-amber-400/70 text-xs text-center mt-3">3 friends = Full course FREE 🎉</p>
                        </div>

                        {/* EMAIL CAPTURE - Moved Higher */}
                        <div className="mt-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                            {subscribed ? (
                                <div className="text-center py-2">
                                    <p className="text-green-400 font-bold text-sm">✅ You're in!</p>
                                    <p className="text-slate-400 text-xs">Check your inbox for the AI Starter Checklist</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-white font-medium text-sm mb-1 text-center">📬 Not ready to buy yet?</p>
                                    <p className="text-slate-400 text-xs mb-3 text-center">
                                        Get a free "AI Starter Checklist" + weekly tips from Captain Efficiency
                                    </p>
                                    <form className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto" onSubmit={handleSubscribe}>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-600 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-sm transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Free Checklist'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>

                        {/* TRUST BADGE - Guarantee visible early (Bezos) */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-full bg-green-500/10 border border-green-500/30">
                            <Shield className="text-green-400" size={16} />
                            <span className="text-green-400 text-sm font-medium">30-Day Money-Back Guarantee</span>
                        </div>
                    </motion.div>

                    {/* URGENCY BANNER */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
                        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                            <Flame className="text-amber-400" size={18} />
                            <span className="text-amber-400 font-bold text-sm">🔥 Launch week special — 50% off ends soon!</span>
                        </div>
                    </motion.div>

                    {/* BEFORE/AFTER VISUAL - Emotional Impact */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.18 }} className="mb-8">
                        <img
                            src="/assets/before-after.png"
                            alt="Before: Drowning in tasks. After: AI agents handle it"
                            className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-700/50 shadow-2xl"
                        />
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
                            9 More Agents Waiting
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

                    {/* BONUS: GAMES HUB */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-8">
                        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-5 border border-purple-500/30">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-purple-500/20 rounded-xl">
                                    <Gamepad2 className="text-purple-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">🎮 Bonus: 5 Training Games</h3>
                                    <p className="text-purple-300 text-xs">Sharpen your AI skills while having fun</p>
                                </div>
                                <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">INCLUDED</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg">
                                    <span>🌊</span><span>Deep Work Dive</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg">
                                    <span>📧</span><span>Inbox Defense</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg">
                                    <span>📅</span><span>Calendar Defense</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg">
                                    <span>⚡</span><span>Focus Blitz</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg">
                                    <span>🖱️</span><span>Captain Click</span>
                                </div>
                                <div className="flex items-center gap-2 text-purple-400 bg-purple-500/10 px-3 py-2 rounded-lg">
                                    <span>🏆</span><span>Leaderboards</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* BONUS: TOOLS HUB */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }} className="mb-8">
                        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl p-5 border border-cyan-500/30">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-cyan-500/20 rounded-xl">
                                    <Wrench className="text-cyan-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">🛠️ Bonus: 10+ Interactive Tools</h3>
                                    <p className="text-cyan-300 text-xs">Assess your chaos before building agents</p>
                                </div>
                                <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">INCLUDED</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg">
                                    <span>🌅</span><span>Morning Chaos</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg">
                                    <span>📧</span><span>Email Chaos</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg">
                                    <span>🧠</span><span>Mental Load</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg">
                                    <span>💰</span><span>Financial Health</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg">
                                    <span>📅</span><span>Calendar Health</span>
                                </div>
                                <div className="flex items-center gap-2 text-cyan-400 bg-cyan-500/10 px-3 py-2 rounded-lg">
                                    <span>+5</span><span>more tools</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* CONSOLIDATED VALUE BOX */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
                        <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl p-6 border-2 border-green-500/40">
                            <h3 className="text-white font-bold mb-4 text-lg text-center">✨ What You Get for $39.99</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-white">
                                    <CheckCircle className="text-green-400" size={18} />
                                    <span><strong>10</strong> chapters (9 more)</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <CheckCircle className="text-green-400" size={18} />
                                    <span><strong>5</strong> training games</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <CheckCircle className="text-green-400" size={18} />
                                    <span><strong>10+</strong> interactive tools</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <CheckCircle className="text-green-400" size={18} />
                                    <span><strong>Lifetime</strong> access</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <Clock className="text-teal-400" size={18} />
                                    <span><strong>10+ hours</strong>/week saved</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <Shield className="text-green-400" size={18} />
                                    <span><strong>30-day</strong> money-back</span>
                                </div>
                            </div>

                            {/* Future-Proof Skill Callout */}
                            <div className="mt-4 pt-4 border-t border-green-500/30">
                                <div className="flex items-start gap-3 text-sm">
                                    <span className="text-2xl">🚀</span>
                                    <div>
                                        <p className="text-white font-bold">Plus: A skill you'll need anyway</p>
                                        <p className="text-slate-400 text-xs">AI is inevitable. Learn it now while saving time — get paid to learn the future.</p>
                                    </div>
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
                            <span className="text-green-400 text-sm font-medium"><span className="font-bold">547 people</span> unlocked this week</span>
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
                            <p className="text-slate-400 text-sm mb-2">One-time payment • No subscription</p>
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <span className="text-slate-500 line-through text-xl">$79.99</span>
                                <span className="text-4xl font-black text-white">$39.99</span>
                                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-bold">50% OFF</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-4">☕ Less than 2 coffees per month for lifetime access</p>

                            {/* ROI Mini-Calculator */}
                            <div className="bg-teal-900/20 rounded-xl p-4 border border-teal-500/30 text-left">
                                <p className="text-teal-400 font-bold text-sm mb-2">📊 Your ROI</p>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between text-slate-300">
                                        <span>Time saved per week:</span>
                                        <span className="font-bold text-white">10+ hours</span>
                                    </div>
                                    <div className="flex justify-between text-slate-300">
                                        <span>Your hourly value:</span>
                                        <span className="font-bold text-white">~$25</span>
                                    </div>
                                    <div className="flex justify-between text-slate-300">
                                        <span>Annual value saved:</span>
                                        <span className="font-bold text-green-400">$13,000+</span>
                                    </div>
                                    <div className="pt-2 border-t border-teal-500/30 flex justify-between">
                                        <span className="text-white font-medium">Your investment:</span>
                                        <span className="font-black text-teal-400">$39.99 once</span>
                                    </div>
                                </div>
                                <p className="text-center text-teal-400 text-xs mt-3 font-bold">That's a 325x return 🚀</p>
                            </div>
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

                        {/* CRYPTO OPTION - Simplified */}
                        <div className="text-center pt-4 border-t border-slate-700/50">
                            <p className="text-slate-400 text-sm mb-2">
                                💡 Want to save 50%?
                            </p>
                            <Link
                                to="/pay-ergo"
                                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                            >
                                Pay $19.99 with crypto →
                            </Link>
                            <p className="text-slate-500 text-xs mt-1">
                                (Bonus: Learn a future skill while you save)
                            </p>
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

                    {/* MINI-FAQ - Objection Handler (Gates) */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="mt-8">
                        <h3 className="text-white font-bold text-center mb-4">Quick Questions</h3>
                        <div className="space-y-3">
                            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                                <p className="text-white font-medium text-sm mb-1">Is this for beginners?</p>
                                <p className="text-slate-400 text-xs">Yes! You don't need any coding or AI experience. Just copy the prompts and paste them into ChatGPT (free) or any AI tool.</p>
                            </div>
                            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                                <p className="text-white font-medium text-sm mb-1">What if I get stuck?</p>
                                <p className="text-slate-400 text-xs">Each chapter has troubleshooting tips. Plus, email us at <a href="mailto:support@agenticaihome.com" className="text-teal-400 hover:underline">support@agenticaihome.com</a> — we actually respond!</p>
                            </div>
                            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                                <p className="text-white font-medium text-sm mb-1">Can I get a refund?</p>
                                <p className="text-slate-400 text-xs">100%. If you don't love it within 30 days, email us and we'll refund you—no questions asked.</p>
                            </div>
                        </div>
                    </motion.section>

                </div>

                {/* MOBILE STICKY CTA */}
                <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#0a0a12] via-[#0a0a12] to-transparent md:hidden z-50">
                    <Link
                        to="/payment-guide"
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-purple-500/30"
                    >
                        Unlock All 10 Chapters →
                    </Link>
                </div>
            </div >
        </WebbookLayout >
    );
};

export default PrePurchaseBridge;
