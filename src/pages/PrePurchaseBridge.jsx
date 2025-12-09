import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle, Lock, ArrowRight, Shield, Clock, Zap,
    Mail, DollarSign, Dumbbell, Briefcase, Settings, Users, Crown,
    Sparkles, Star, Calendar, UtensilsCrossed
} from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';

// ============================================
// OPTIMIZED PRE-PURCHASE BRIDGE
// Structure: PAS + AIDA Framework
// Target: ~250 lines, one clear CTA
// ============================================

const PrePurchaseBridge = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState(null);

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
            if (response.ok) setSubscribed(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const premiumAgents = [
        { icon: <UtensilsCrossed size={16} />, name: 'Meal Planning', benefit: 'Weekly menus on autopilot', color: 'text-orange-400' },
        { icon: <Calendar size={16} />, name: 'Important Dates', benefit: 'Never forget birthdays', color: 'text-pink-400' },
        { icon: <Mail size={16} />, name: 'Email Triage', benefit: 'Inbox zero daily', color: 'text-blue-400' },
        { icon: <DollarSign size={16} />, name: 'Money Check-In', benefit: 'Weekly financial clarity', color: 'text-green-400' },
        { icon: <Dumbbell size={16} />, name: 'Fitness', benefit: 'Workouts that fit your life', color: 'text-red-400' },
        { icon: <Briefcase size={16} />, name: 'Work Tasks', benefit: 'Always know what\'s next', color: 'text-amber-400' },
        { icon: <Settings size={16} />, name: 'Custom Builder', benefit: 'Create any agent you want', color: 'text-purple-400' },
        { icon: <Users size={16} />, name: 'Multi-Agent', benefit: 'Agents that coordinate', color: 'text-cyan-400' },
        { icon: <Crown size={16} />, name: 'Agent Army', benefit: 'Your complete system', color: 'text-yellow-400' },
    ];

    const faqs = [
        { q: 'Do I need coding skills?', a: 'Nope! Just copy-paste prompts into ChatGPT. If you can send an email, you can do this.' },
        { q: 'What if I get stuck?', a: 'Each chapter has troubleshooting tips. Plus email us at support@agenticaihome.com — we actually respond!' },
        { q: 'Can I get a refund?', a: '100%. If you don\'t love it within 30 days, email us and we\'ll refund you — no questions asked.' },
    ];

    return (
        <WebbookLayout>
            <Helmet>
                <title>Unlock Your Agent Army | Agentic AI Home</title>
                <meta name="description" content="You built your first AI agent. Now unlock 9 more to automate your entire life." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                {/* Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-teal-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]" />
                </div>

                <div className="relative max-w-2xl mx-auto px-5 py-8">

                    {/* ========== SECTION 1: CELEBRATION + HOOK (ATTENTION) ========== */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        {/* Success Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/40 mb-4">
                            <Sparkles className="text-green-400" size={16} />
                            <span className="text-green-400 font-bold text-sm">Chapter 1 Complete!</span>
                        </div>

                        {/* Emotional Hook */}
                        <h1 className="text-2xl md:text-3xl font-black text-white mb-3">
                            You Just Automated Your Mornings. 🎉
                        </h1>
                        <p className="text-slate-400 text-lg mb-4">
                            What if you could do that for <span className="text-white font-semibold">everything else</span>?
                        </p>

                        {/* Before/After Emotional Contrast */}
                        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                            <div className="bg-red-900/20 rounded-xl p-3 border border-red-500/20">
                                <div className="text-xl mb-1">😰</div>
                                <div className="text-xs text-red-300">Before: Overwhelmed</div>
                            </div>
                            <div className="bg-green-900/20 rounded-xl p-3 border border-green-500/20">
                                <div className="text-xl mb-1">😌</div>
                                <div className="text-xs text-green-300">After: In control</div>
                            </div>
                        </div>
                    </motion.section>

                    {/* ========== SECTION 2: WHAT'S NEXT (INTEREST) ========== */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
                            <Lock className="text-purple-400" size={18} />
                            9 More Agents Ready to Deploy
                        </h2>

                        <div className="grid grid-cols-1 gap-2">
                            {premiumAgents.map((agent, i) => (
                                <div key={i} className="flex items-center gap-3 bg-slate-800/40 rounded-lg px-4 py-3 border border-slate-700/50">
                                    <div className={agent.color}>{agent.icon}</div>
                                    <span className="text-white font-medium text-sm">{agent.name}</span>
                                    <span className="text-slate-500 text-xs ml-auto">{agent.benefit}</span>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* ========== SECTION 3: VALUE STACK (DESIRE) ========== */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="bg-gradient-to-br from-teal-900/30 to-slate-800/50 rounded-2xl p-5 border border-teal-500/30">
                            <h3 className="text-white font-bold mb-4 text-center">✨ Everything You Get</h3>

                            <div className="space-y-2 mb-4">
                                {[
                                    { text: '10 chapters (9 more to unlock)', icon: '📚' },
                                    { text: '10 ready-to-use AI agents', icon: '🤖' },
                                    { text: '5 training games + 10 tools', icon: '🎮' },
                                    { text: 'Lifetime access (no subscription)', icon: '♾️' },
                                    { text: '30-day money-back guarantee', icon: '🛡️' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm">
                                        <span>{item.icon}</span>
                                        <span className="text-slate-200">{item.text}</span>
                                        <CheckCircle className="text-green-400 ml-auto" size={16} />
                                    </div>
                                ))}
                            </div>

                            {/* ROI Comparison */}
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                <div className="text-xs text-slate-500 mb-2">Compare the value:</div>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between text-slate-400">
                                        <span>Typical AI course</span>
                                        <span className="line-through">$199-499</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Productivity coaching</span>
                                        <span className="line-through">$150/hr</span>
                                    </div>
                                    <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-700">
                                        <span>This entire system</span>
                                        <span className="text-teal-400">$39.99 once</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* ========== SECTION 4: SOCIAL PROOF ========== */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                            <div className="flex gap-1 mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                            </div>
                            <p className="text-slate-300 text-sm italic mb-3">
                                "I got inbox zero in 2 days. The email agent alone was worth the entire price."
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">M</div>
                                <div>
                                    <div className="text-white text-sm font-medium">Marcus L.</div>
                                    <div className="text-slate-500 text-xs">Software Engineer</div>
                                </div>
                            </div>
                        </div>

                        {/* Live counter */}
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-slate-400 text-sm"><span className="text-green-400 font-bold">547 people</span> joined this week</span>
                        </div>
                    </motion.section>

                    {/* ========== SECTION 5: PRICING + CTA (ACTION) ========== */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        {/* Price Display */}
                        <div className="text-center mb-4">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <span className="text-slate-500 line-through text-xl">$79.99</span>
                                <span className="text-4xl font-black text-white">$39.99</span>
                                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-bold">50% OFF</span>
                            </div>
                            <p className="text-slate-500 text-sm">One-time payment • Lifetime access</p>
                        </div>

                        {/* Main CTA */}
                        <Link
                            to="/payment-guide"
                            className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02]"
                        >
                            Unlock All 10 Chapters
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-4 mt-4 text-slate-500 text-xs">
                            <div className="flex items-center gap-1">
                                <Shield size={12} />
                                <span>30-day refund</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Lock size={12} />
                                <span>Secure checkout</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Zap size={12} />
                                <span>Instant access</span>
                            </div>
                        </div>

                        {/* Crypto Option - Subtle */}
                        <div className="text-center mt-4 pt-4 border-t border-slate-800">
                            <Link to="/pay-ergo" className="text-green-400/70 hover:text-green-400 text-sm">
                                💡 Pay $19.99 with crypto →
                            </Link>
                        </div>
                    </motion.section>

                    {/* ========== SECTION 6: FAQ ========== */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <h3 className="text-white font-bold text-center mb-4">Quick Questions</h3>
                        <div className="space-y-2">
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
                                    <button
                                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                        className="w-full px-4 py-3 text-left flex items-center justify-between"
                                    >
                                        <span className="text-white font-medium text-sm">{faq.q}</span>
                                        <span className="text-slate-500">{expandedFaq === i ? '−' : '+'}</span>
                                    </button>
                                    {expandedFaq === i && (
                                        <div className="px-4 pb-3 text-slate-400 text-sm">{faq.a}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* ========== SECTION 7: EMAIL CAPTURE (hesitant users) ========== */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-20"
                    >
                        {subscribed ? (
                            <div className="text-center p-4 bg-green-900/20 rounded-xl border border-green-500/30">
                                <p className="text-green-400 font-medium text-sm">✅ Check your inbox for the AI Starter Checklist!</p>
                            </div>
                        ) : (
                            <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                                <p className="text-slate-400 text-sm text-center mb-3">
                                    📬 Not ready yet? Get free AI tips + a starter checklist
                                </p>
                                <form className="flex gap-2" onSubmit={handleSubscribe}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm transition-colors"
                                    >
                                        {isSubmitting ? '...' : 'Send'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </motion.section>

                </div>

                {/* MOBILE STICKY CTA */}
                <div className="fixed bottom-0 left-0 right-0 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/95 to-transparent md:hidden z-50">
                    <Link
                        to="/payment-guide"
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-teal-500/30"
                    >
                        Unlock All 10 Chapters — $39.99
                    </Link>
                </div>
            </div>
        </WebbookLayout>
    );
};

export default PrePurchaseBridge;
