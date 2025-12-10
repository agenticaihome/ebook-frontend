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

                <div className="relative max-w-2xl mx-auto px-5 py-12 md:py-16">

                    {/* ========== SECTION 1: GUARANTEE + HOOK (ATTENTION) ========== */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        {/* Trust Badge - TOP PRIORITIZATION (Bezos Audit) */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-xs font-medium text-green-400">
                                <Shield size={12} />
                                30-Day Money-Back Guarantee
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-900/30 border border-amber-500/30 rounded-full text-xs font-medium text-amber-400">
                                <Users size={12} />
                                500+ Pioneers
                            </div>
                        </div>

                        {/* Emotional Hook (Blakely Audit) */}
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                            You Just Automated Your Mornings.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                                Now Automate Your Life.
                            </span>
                        </h1>

                        <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
                            Unlock the full army of 10 agents to handle your emails, meals, money, and admin—forever.
                        </p>

                        {/* Price Anchor (Bezos Audit) */}
                        <div className="mb-8 relative inline-block">
                            <div className="absolute -top-3 -right-6 rotate-12 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                                PRICE ↑ FEB 1
                            </div>
                            <div className="text-amber-400 font-bold text-xs tracking-wider uppercase mb-1">🚀 Early Adopter Pricing</div>
                            <div className="inline-flex items-baseline gap-2">
                                <span className="text-4xl font-black text-white">$39.99</span>
                                <span className="text-slate-500 line-through text-xl">$49.99</span>
                            </div>
                            <p className="text-slate-500 text-sm mt-1">One-time payment • Lifetime access</p>
                            <p className="text-amber-400/80 text-xs mt-1 font-medium">⏰ Becomes $49.99 on February 1st</p>
                        </div>

                        {/* Primary CTA */}
                        <Link
                            to="/payment-guide"
                            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-8 py-4 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="relative z-10">Get Full Access</span>
                            <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={24} />

                            {/* Glow pulse */}
                            <div className="absolute inset-0 rounded-2xl bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>

                        <div className="mt-4 text-xs text-slate-500">
                            Secure checkout • Instant access
                        </div>
                    </motion.section>

                    {/* ========== SECTION 2: THE FOUNDER STORY (Chesky Audit) ========== */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 border border-slate-700/50 relative overflow-hidden"
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-teal-400 font-bold text-sm tracking-wider uppercase mb-3">
                                👋 FROM THE CREATOR (DDS)
                            </h3>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                "I didn't set out to build this."
                            </h2>

                            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
                                <p>
                                    Like most people, I started using AI a couple years ago — summarizing research, studying for exams, sorting data. Then I discovered <strong>agents</strong> — AI that works <em>for</em> you while you live your life.
                                </p>
                                <p>
                                    I started tinkering. Building. Testing. It took a lot of late nights, but I assembled an army of agents that now handle my life logistics. And something unexpected happened: <strong className="text-white">my life got quieter</strong>.
                                </p>
                                <p>
                                    Not boring — <em>peaceful</em>. I was finally present with my family, not just physically, but mentally.
                                </p>
                                <p>
                                    Here's my confession: <strong className="text-teal-400">I have zero coding experience</strong>. This entire site was built with Claude, ChatGPT, Grok, and Gemini. I'm a dental resident and Army vet with two kids under 3. I just refused to quit.
                                </p>
                                <p className="font-medium text-white">
                                    If this helps even one person reclaim their peace, it was worth it.
                                </p>
                            </div>

                            <div className="mt-6 flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-xl">🦷</div>
                                <div>
                                    <div className="text-white font-bold">DDS</div>
                                    <div className="text-xs text-slate-500">Still in residency. Still learning. Finally at peace.</div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* ========== SECTION 3: WHAT YOU GET (Bezos/Jobs Audit) ========== */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-white text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                            <Lock className="text-purple-400" size={24} />
                            The 9 Agents You're Missing
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                            {premiumAgents.map((agent, i) => (
                                <div key={i} className="flex items-center gap-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl px-4 py-4 border border-slate-700/50 transition-colors group">
                                    <div className={`${agent.color} bg-slate-900 p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                                        {agent.icon}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">{agent.name}</div>
                                        <div className="text-slate-500 text-xs">{agent.benefit}</div>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Lock size={14} className="text-slate-600" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-left mt-8">
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                <div className="flex items-center gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                                </div>
                                <p className="text-slate-300 text-sm mb-3">"The Meal Planner alone saved me <span className="text-white font-bold">2 hours this Sunday</span>. It writes the list, I just shop."</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">SJ</div>
                                    <div>
                                        <div className="text-white text-xs font-bold">Sarah J.</div>
                                        <div className="text-slate-500 text-[10px]">Mom of 3</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                <div className="flex items-center gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                                </div>
                                <p className="text-slate-300 text-sm mb-3">"Email Triage is a lifesaver. I used to spend an hour a day. Now it's <span className="text-white font-bold">10 minutes</span>."</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">MT</div>
                                    <div>
                                        <div className="text-white text-xs font-bold">Mike T.</div>
                                        <div className="text-slate-500 text-[10px]">Small Biz Owner</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                <div className="flex items-center gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                                </div>
                                <p className="text-slate-300 text-sm mb-3">"I built the 'Never-Forget' agent in <span className="text-white font-bold">5 minutes</span>. My wife was impressed I remembered!"</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">DR</div>
                                    <div>
                                        <div className="text-white text-xs font-bold">David R.</div>
                                        <div className="text-slate-500 text-[10px]">Student</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* ========== SECTION 4: VALUE STACK & ROI (Bezos Audit) ========== */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <div className="bg-gradient-to-br from-teal-900/20 to-slate-900/50 rounded-3xl p-1 border border-teal-500/30">
                            <div className="bg-[#0a0a12]/80 backdrop-blur-xl rounded-[22px] p-6 md:p-8">
                                <h3 className="text-white font-bold text-xl text-center mb-6">✨ The Complete System</h3>

                                <div className="space-y-4 mb-8">
                                    {[
                                        { text: 'All 10 Chapters (Lifetime Access)', icon: '📚' },
                                        { text: '10 Ready-to-Copy Agent Templates', icon: '🤖' },
                                        { text: '5 Training Games & Tools', icon: '🎮' },
                                        { text: 'Future Updates Included', icon: '🚀' },
                                        { text: '30-Day Money-Back Guarantee', icon: '🛡️' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-base">
                                            <span className="text-2xl">{item.icon}</span>
                                            <span className="text-slate-200 font-medium">{item.text}</span>
                                            <CheckCircle className="text-teal-500 ml-auto shrink-0" size={20} />
                                        </div>
                                    ))}
                                </div>

                                {/* ROI Block */}
                                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Compare The Value</div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-slate-400">
                                            <span>Productivity Consultant</span>
                                            <span className="line-through decoration-red-500/50">$200+/hour</span>
                                        </div>
                                        <div className="flex justify-between text-slate-400">
                                            <span>Professional Course</span>
                                            <span className="line-through decoration-red-500/50">$199-499</span>
                                        </div>
                                        <div className="flex justify-between items-center text-white font-bold pt-3 border-t border-slate-700 mt-2">
                                            <span>Agentic AI Home</span>
                                            <div className="text-right">
                                                <span className="text-2xl text-teal-400">$39.99</span>
                                                <div className="text-xs text-amber-400/70 font-normal">until Feb 1</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* ========== SECTION 5: FINAL CTA ========== */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center"
                    >
                        <h2 className="text-white font-bold text-2xl mb-6">
                            Ready to Claim Your Freedom?
                        </h2>

                        <Link
                            to="/payment-guide"
                            className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-2xl font-black text-xl inline-flex items-center gap-2 transition-transform hover:scale-105"
                        >
                            Get Instant Access <Zap size={20} className="text-teal-600 fill-teal-600" />
                        </Link>

                        <div className="flex justify-center gap-6 mt-6 text-sm text-slate-500">
                            <span className="flex items-center gap-1"><Shield size={14} /> 30-Day Guarantee</span>
                            <span className="flex items-center gap-1"><Lock size={14} /> Secure Checkout</span>
                        </div>

                        {/* Crypto Option */}
                        <div className="mt-8 pt-6 border-t border-slate-800/50">
                            <Link to="/pay-ergo" className="inline-flex items-center gap-2 text-green-400/80 hover:text-green-400 text-sm font-medium transition-colors">
                                <span className="p-1 bg-green-900/30 rounded text-xs">ERG</span>
                                Pay $19.99 with Crypto (50% Off) →
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
                        Unlock All 10 Chapters — $39.99 (↑ Feb 1)
                    </Link>
                </div>
            </div>
        </WebbookLayout>
    );
};

export default PrePurchaseBridge;
