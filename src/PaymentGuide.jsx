import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import {
    CreditCard, Coins, Check, ArrowRight, Shield, Zap,
    Lock, Globe, Clock, Sparkles, Loader2, AlertCircle, ChevronDown, ChevronUp,
    Star, Rocket
} from 'lucide-react';
import WebbookLayout from './components/layout/WebbookLayout';
import CaptainHero from './components/CaptainHero';
import { api } from './services/api';
import { usePageTitle } from './hooks/usePageTitle';

// Floating animation for premium feel
const floatingAnimation = {
    animate: {
        y: [0, -8, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// Sparkle component for premium accents
const FloatingSparkle = ({ delay = 0, size = 12, className = "" }) => (
    <m.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180]
        }}
        transition={{
            duration: 2,
            delay,
            repeat: Infinity,
            repeatDelay: 3
        }}
        className={`absolute ${className}`}
    >
        <Star size={size} className="text-amber-400/60 fill-amber-400/40" />
    </m.div>
);

export default function PaymentGuide() {
    usePageTitle('Start My Agent Army');
    const [email, setEmail] = useState('');
    const [isStripeLoading, setIsStripeLoading] = useState(false);
    const [stripeError, setStripeError] = useState(null);
    const [showCrypto, setShowCrypto] = useState(false);

    const handleStripePayment = async () => {
        if (!email || !email.includes('@')) {
            setStripeError("Please enter a valid email address.");
            return;
        }

        setIsStripeLoading(true);
        setStripeError(null);

        try {
            const result = await api.createStripeCheckout(email);
            if (result.success && result.checkoutUrl) {
                window.location.href = result.checkoutUrl;
            } else {
                setStripeError("Failed to initialize checkout. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setStripeError(err.message || "Connection error. Please try again.");
        } finally {
            setIsStripeLoading(false);
        }
    };

    return (
        <WebbookLayout>
            <div className="min-h-screen bg-[#0f0f1a] text-white font-sans selection:bg-teal-500/30 overflow-hidden">

                {/* Ambient Background Orbs */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] w-[200px] sm:w-[350px] md:w-[600px] h-[200px] sm:h-[350px] md:h-[600px] bg-teal-500/10 rounded-full blur-[60px] sm:blur-[90px] md:blur-[150px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[150px] sm:w-[250px] md:w-[500px] h-[150px] sm:h-[250px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[120px] sm:w-[200px] md:w-[400px] h-[120px] sm:h-[200px] md:h-[400px] bg-purple-500/5 rounded-full blur-[50px] sm:blur-[70px] md:blur-[100px]" />
                </div>

                {/* HERO SECTION */}
                <section className="py-12 px-6 border-b border-slate-800/50 bg-gradient-to-b from-[#131320] to-[#0f0f1a] relative">
                    {/* Floating Sparkles */}
                    <FloatingSparkle delay={0} size={14} className="top-8 left-[15%]" />
                    <FloatingSparkle delay={1} size={10} className="top-16 right-[20%]" />
                    <FloatingSparkle delay={2} size={12} className="bottom-12 left-[25%]" />

                    <div className="max-w-3xl mx-auto text-center relative z-10">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {/* Launch Badge */}
                            <m.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-4"
                            >
                                <Rocket size={14} className="text-amber-400" />
                                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Launch Pricing — Save 20%</span>
                            </m.div>

                            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                                <span className="block text-white">🚀 Start My</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 animate-gradient-x">Agent Army</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 mb-4 max-w-xl mx-auto">
                                One payment. <span className="text-white font-semibold">Lifetime access.</span> 10 agents ready to serve.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
                                <span className="flex items-center gap-1.5 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                                    <Shield size={14} className="text-green-400" /> 30-day guarantee
                                </span>
                                <span className="flex items-center gap-1.5 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                                    <Zap size={14} className="text-teal-400" /> Instant access
                                </span>
                            </div>
                        </m.div>
                    </div>
                </section>

                {/* PRIMARY PAYMENT: STRIPE */}
                <section className="py-12 px-6 relative z-10">
                    <div className="max-w-xl mx-auto">

                        {/* Main Card with Floating Animation */}
                        <m.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                            className="relative group"
                        >
                            {/* Outer Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/30 via-cyan-500/30 to-teal-500/30 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

                            <m.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-8 border border-teal-500/40 shadow-2xl shadow-teal-500/10 overflow-hidden"
                            >
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                {/* Recommended Badge */}
                                <div className="absolute top-0 right-0 overflow-hidden">
                                    <m.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold px-5 py-2 rounded-bl-2xl shadow-lg flex items-center gap-1.5"
                                    >
                                        <Sparkles size={12} />
                                        RECOMMENDED
                                    </m.div>
                                </div>

                                {/* Price Section with Glow */}
                                <div className="text-center mb-8 pt-4">
                                    <div className="flex items-center justify-center gap-3 mb-3">
                                        <div className="p-2.5 bg-teal-500/20 rounded-xl border border-teal-500/30">
                                            <CreditCard className="text-teal-400" size={24} />
                                        </div>
                                        <span className="text-xl font-bold text-white">Credit/Debit Card</span>
                                    </div>

                                    {/* Price with Pulsing Glow */}
                                    <div className="relative inline-block">
                                        <div className="absolute inset-0 bg-teal-500/20 blur-2xl rounded-full animate-pulse" />
                                        <div className="relative flex items-baseline justify-center gap-3">
                                            <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-100 to-white">$39.99</span>
                                            <span className="text-slate-500 line-through text-xl">$49.99</span>
                                        </div>
                                    </div>

                                    <m.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-teal-400 text-sm mt-2 font-semibold inline-flex items-center gap-1.5"
                                    >
                                        <Clock size={12} />
                                        Launch pricing — limited time
                                    </m.p>
                                </div>

                                {/* What's Included - with hover effects */}
                                <div className="space-y-3 mb-8">
                                    {[
                                        { text: 'All 10 chapters (lifetime access)', icon: '📚' },
                                        { text: '10 ready-to-copy agent templates', icon: '🤖' },
                                        { text: '5 productivity training games', icon: '🎮' },
                                        { text: 'Future updates included', icon: '✨' },
                                    ].map((item, i) => (
                                        <m.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            whileHover={{ x: 4 }}
                                            className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-teal-500/5 transition-colors cursor-default"
                                        >
                                            <div className="w-6 h-6 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm">
                                                {item.icon}
                                            </div>
                                            <span className="text-slate-200 font-medium">{item.text}</span>
                                            <Check className="text-teal-400 shrink-0 ml-auto" size={16} />
                                        </m.div>
                                    ))}
                                </div>

                                {/* Email Input */}
                                <div className="mb-4">
                                    <label className="block text-sm text-slate-300 mb-2">Your Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3.5 text-base text-white focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>

                                {/* Error */}
                                {stripeError && (
                                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg mb-4">
                                        <AlertCircle size={16} />
                                        {stripeError}
                                    </div>
                                )}

                                {/* CTA Button */}
                                <button
                                    disabled
                                    className="w-full bg-slate-700/50 text-slate-400 py-4 rounded-xl font-bold text-lg cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    Sales Paused
                                </button>

                                {/* Security Note */}
                                <p className="text-xs text-slate-400 text-center mt-3 flex items-center justify-center gap-1">
                                    <Lock size={10} className="text-green-400" />
                                    Secure checkout powered by Stripe • 256-bit encryption
                                </p>
                            </m.div>
                        </m.div>

                        {/* CRYPTO OPTION (Collapsed) */}
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6"
                        >
                            <button
                                onClick={() => setShowCrypto(!showCrypto)}
                                className="w-full flex items-center justify-between px-5 py-4 bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700 hover:border-green-500/50 rounded-2xl transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                                        <Coins className="text-green-400" size={18} />
                                    </div>
                                    <span className="font-medium">
                                        💰 Save 50% with Crypto — <span className="text-green-400 font-bold">$19.99</span>
                                    </span>
                                </div>
                                <m.div animate={{ rotate: showCrypto ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <ChevronDown size={20} className="text-slate-400" />
                                </m.div>
                            </button>

                            {showCrypto && (
                                <m.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-green-500/30"
                                >
                                    <div className="text-center mb-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full mb-3">
                                            50% OFF — CRYPTO DISCOUNT
                                        </div>
                                        <p className="text-slate-300 text-sm">
                                            Pay with Ergo (ERG) cryptocurrency and get half off. First time? Our complete guide walks you through it.
                                        </p>
                                    </div>

                                    {/* Benefits */}
                                    <div className="space-y-2 mb-6 text-sm">
                                        {[
                                            { icon: <Zap size={14} />, text: 'Save $20 — pay only $19.99' },
                                            { icon: <Lock size={14} />, text: 'Fully private — no card info shared' },
                                            { icon: <Globe size={14} />, text: 'Support decentralized commerce' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 text-slate-300">
                                                <span className="text-green-400">{item.icon}</span>
                                                {item.text}
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="space-y-3">
                                        <Link
                                            to="/ergo-guide"
                                            className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-3.5 rounded-xl font-bold text-center transition-all shadow-lg shadow-green-500/20"
                                        >
                                            Complete Ergo Guide (15-20 min)
                                        </Link>
                                        <button
                                            disabled
                                            className="w-full bg-slate-700/50 text-slate-400 py-3 rounded-xl font-medium cursor-not-allowed"
                                        >
                                            Sales Paused
                                        </button>
                                    </div>

                                    <p className="text-xs text-slate-500 text-center mt-3">
                                        Same 30-day money-back guarantee applies
                                    </p>
                                </m.div>
                            )}
                        </m.div>

                        {/* Trust Signals */}
                        <div className="mt-8 text-center">
                            <p className="text-slate-500 text-sm mb-4">Trusted by students learning AI automation</p>
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-slate-400 text-xs">
                                <span className="flex items-center gap-1.5 bg-green-500/10 px-3 py-1.5 rounded-full"><Shield size={12} className="text-green-400" /> 30-day guarantee</span>
                                <span className="flex items-center gap-1.5 bg-teal-500/10 px-3 py-1.5 rounded-full"><Clock size={12} className="text-teal-400" /> Instant access</span>
                                <span className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-full"><Sparkles size={12} className="text-amber-400" /> Lifetime updates</span>
                            </div>
                        </div>

                    </div>
                </section>

                {/* QUICK COMPARISON */}
                <section className="py-12 px-6 bg-[#131320] border-t border-slate-800">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold mb-6 text-center">Quick Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-slate-600">
                                        <th className="py-3 px-3 text-slate-400 font-medium"></th>
                                        <th className="py-3 px-3 text-center text-teal-400 font-bold">💳 Card</th>
                                        <th className="py-3 px-3 text-center text-green-400 font-bold">🪙 Crypto</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300">
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-3">Price</td>
                                        <td className="py-3 px-3 text-center">$39.99</td>
                                        <td className="py-3 px-3 text-center font-bold text-green-400">$19.99</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-3">Setup Time</td>
                                        <td className="py-3 px-3 text-center font-bold text-teal-400">2 min</td>
                                        <td className="py-3 px-3 text-center">15-20 min</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-3">Privacy</td>
                                        <td className="py-3 px-3 text-center">Standard</td>
                                        <td className="py-3 px-3 text-center font-bold text-green-400">Full privacy</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-3">Refund</td>
                                        <td className="py-3 px-3 text-center">30 days</td>
                                        <td className="py-3 px-3 text-center">30 days</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <section className="py-12 pb-32 md:pb-12 px-6 text-center">
                    <div className="max-w-xl mx-auto">
                        <p className="text-slate-400 mb-4">
                            Questions? <Link to="/faq" className="text-teal-400 hover:underline">Check our FAQ</Link> or email <a href="mailto:support@agenticaihome.com" className="text-teal-400 hover:underline">support@agenticaihome.com</a>
                        </p>
                    </div>
                </section>

            </div>
        </WebbookLayout>
    );
}
