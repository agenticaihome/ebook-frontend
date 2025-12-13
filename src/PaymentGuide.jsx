import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import {
    CreditCard, Coins, Check, ArrowRight, Shield, Zap,
    Lock, Globe, Clock, Sparkles, Loader2, AlertCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import WebbookLayout from './components/layout/WebbookLayout';
import CaptainHero from './components/CaptainHero';
import { api } from './services/api';
import { usePageTitle } from './hooks/usePageTitle';

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
            <div className="min-h-screen bg-[#0f0f1a] text-white font-sans selection:bg-teal-500/30">

                {/* HERO SECTION */}
                <section className="py-12 px-6 border-b border-slate-800 bg-[#131320]">
                    <div className="max-w-3xl mx-auto text-center">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                🚀 Start My <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Agent Army</span>
                            </h1>
                            <p className="text-lg text-slate-300 mb-2">
                                One payment. Lifetime access. 10 agents ready to serve.
                            </p>
                            <div className="flex items-center justify-center gap-3 text-sm text-slate-400">
                                <span className="flex items-center gap-1"><Shield size={14} className="text-green-400" /> 30-day guarantee</span>
                                <span>•</span>
                                <span>Instant access</span>
                            </div>
                        </m.div>
                    </div>
                </section>

                {/* PRIMARY PAYMENT: STRIPE */}
                <section className="py-12 px-6">
                    <div className="max-w-xl mx-auto">

                        {/* Main Card */}
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-teal-500/30 shadow-xl shadow-teal-500/5 relative overflow-hidden"
                        >
                            {/* Recommended Badge */}
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                                RECOMMENDED
                            </div>

                            {/* Price Section */}
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center gap-3 mb-2">
                                    <CreditCard className="text-teal-400" size={28} />
                                    <span className="text-xl font-bold">Credit/Debit Card</span>
                                </div>
                                <div className="flex items-baseline justify-center gap-2">
                                    <span className="text-5xl font-black text-white">$39.99</span>
                                    <span className="text-slate-400 line-through text-xl">$49.99</span>
                                </div>
                                <p className="text-teal-400 text-sm mt-1 font-medium">Launch pricing — limited time</p>
                            </div>

                            {/* What's Included */}
                            <div className="space-y-3 mb-8">
                                {[
                                    'All 10 chapters (lifetime access)',
                                    '10 ready-to-copy agent templates',
                                    '5 productivity training games',
                                    'Future updates included',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Check className="text-teal-400 shrink-0" size={18} />
                                        <span className="text-slate-200">{item}</span>
                                    </div>
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

                        {/* CRYPTO OPTION (Collapsed) */}
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6"
                        >
                            <button
                                onClick={() => setShowCrypto(!showCrypto)}
                                className="w-full flex items-center justify-between px-5 py-4 bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700 rounded-2xl transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <Coins className="text-green-400" size={20} />
                                    <span className="font-medium">
                                        💰 Save 50% with Crypto — <span className="text-green-400 font-bold">$19.99</span>
                                    </span>
                                </div>
                                {showCrypto ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
                                            className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-3.5 rounded-xl font-bold text-center transition-all"
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
                            <div className="flex items-center justify-center gap-6 text-slate-400 text-xs">
                                <span className="flex items-center gap-1"><Shield size={12} className="text-green-400" /> 30-day guarantee</span>
                                <span className="flex items-center gap-1"><Clock size={12} className="text-teal-400" /> Instant access</span>
                                <span className="flex items-center gap-1"><Sparkles size={12} className="text-amber-400" /> Lifetime updates</span>
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
