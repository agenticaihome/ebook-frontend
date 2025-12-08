import React, { Suspense } from 'react';
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
                                    size="medium"
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
                            <span className="text-green-400 font-bold">Free Chapters Complete!</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            🎉 You Built <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">3 Real Agents</span>
                        </h1>
                        <p className="text-slate-400 text-lg">
                            That's more than 90% of people who "use AI."
                        </p>

                        {/* SHARE BUTTONS - Viral Loop (Zuckerberg) */}
                        <div className="flex items-center justify-center gap-3 mt-4">
                            <span className="text-slate-500 text-sm">Share your progress:</span>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("🎉 Just built 3 AI agents in 15 minutes! Check out @AgenticAIHome")}&url=${encodeURIComponent("https://agenticaihome.com")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                            >
                                𝕏 Share
                            </a>
                            <button
                                onClick={() => { navigator.clipboard.writeText('https://agenticaihome.com'); alert('Link copied!'); }}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                            >
                                📋 Copy Link
                            </button>
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
                                    <span><strong>10</strong> chapters (7 more)</span>
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

                        <Link
                            to="/welcome"
                            className="flex items-center justify-center gap-2 w-full text-slate-400 hover:text-white py-3 text-sm transition-colors"
                        >
                            <ChevronDown size={16} />
                            See everything that's included
                        </Link>

                        {/* CRYPTO OPTION - Double Future-Proofing */}
                        <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-2xl p-5 border-2 border-green-500/40 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm font-bold mb-3">
                                🎓 SMART SAVER'S CHOICE
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">
                                Save 50% + Learn a Future Skill
                            </h3>
                            <div className="bg-black/30 rounded-xl p-4 mb-4 text-left">
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">✓</span>
                                        <span className="text-white"><strong>Save 50%</strong> — pay just $19.99</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">✓</span>
                                        <span className="text-white"><strong>Learn AI</strong> — the skill everyone needs</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-400">✓</span>
                                        <span className="text-white"><strong>Learn Crypto</strong> — another future skill</span>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-xs mt-3 text-center">
                                    You'll need both skills eventually. Pay less to learn more.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    to="/why-ergo"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors"
                                >
                                    Why Crypto? →
                                </Link>
                                <Link
                                    to="/pay-ergo"
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-bold transition-all shadow-lg shadow-green-500/20"
                                >
                                    🎓 Pay $19.99 & Learn Both →
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
                                <p className="text-slate-400 text-xs">Each chapter has troubleshooting tips. Plus, you can email us anytime—we actually respond.</p>
                            </div>
                            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                                <p className="text-white font-medium text-sm mb-1">Can I get a refund?</p>
                                <p className="text-slate-400 text-xs">100%. If you don't love it within 30 days, email us and we'll refund you—no questions asked.</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* EMAIL CAPTURE FOR HESITATERS */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8 mb-10">
                        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 text-center">
                            <h3 className="text-white font-bold mb-2">Not ready yet?</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Get a reminder when you have more time. We'll send you one email—that's it.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Email captured! (Demo)'); }}>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
                                >
                                    Remind Me Later
                                </button>
                            </form>
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
