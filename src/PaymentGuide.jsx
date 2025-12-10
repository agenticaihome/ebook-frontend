import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import {
    CreditCard, Coins, Check, ArrowRight, Shield, Zap,
    Lock, Globe, Clock, Sparkles, Loader2, AlertCircle
} from 'lucide-react';
import WebbookLayout from './components/layout/WebbookLayout';
import CaptainHero from './components/CaptainHero';
import { api } from './services/api';
import { usePageTitle } from './hooks/usePageTitle';

export default function PaymentGuide() {
    usePageTitle('Payment Options');
    const [email, setEmail] = useState('');
    const [isStripeLoading, setIsStripeLoading] = useState(false);
    const [stripeError, setStripeError] = useState(null);

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
                <section className="py-16 px-6 border-b border-slate-800 bg-[#131320]">
                    <div className="max-w-5xl mx-auto">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">Payment Method</span>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                                Two ways to unlock full access. Both include everything. Pick what works for you.
                            </p>
                        </m.div>

                        {/* Captain's Insight */}
                        <div className="max-w-2xl mx-auto mb-12">
                            <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-6 flex gap-4 items-start">
                                <div className="hidden md:block flex-shrink-0">
                                    <CaptainHero size="sm" pose="pointing" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <Sparkles className="text-teal-400" size={20} />
                                        Captain's Insight
                                    </h3>
                                    <p className="text-slate-400 text-sm">
                                        Stripe is instant and familiar. Ergo gets you 50% off if you're willing to learn something new.
                                        Both paths lead to the same destination — a life with 10 extra hours per week.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* COMPARISON SECTION */}
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

                        {/* STRIPE CARD */}
                        <m.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-600/50 hover:border-purple-500/50 transition-all group relative overflow-hidden"
                        >
                            {/* Background Icon */}
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <CreditCard size={120} />
                            </div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30">
                                    <CreditCard className="text-purple-400" size={32} />
                                </div>

                                <h2 className="text-3xl font-bold mb-2">Standard Access</h2>
                                <div className="text-5xl font-bold mb-1">
                                    $39.99 <span className="text-lg text-slate-400 font-normal">USD</span>
                                </div>
                                <p className="text-xs text-amber-400/80 mb-6">⏰ Early adopter price — $49.99 after Feb 1</p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <Check className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <strong className="text-white">Instant Access</strong>
                                            <p className="text-slate-400 text-sm">Start learning immediately after payment</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Shield className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <strong className="text-white">Secure & Familiar</strong>
                                            <p className="text-slate-400 text-sm">Credit/debit card via Stripe (industry standard)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <strong className="text-white">2-Minute Checkout</strong>
                                            <p className="text-slate-400 text-sm">Email, card, done. No new accounts needed.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-2 text-left">Your Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            className="w-full bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-purple-500 transition-colors backdrop-blur-sm"
                                        />
                                    </div>

                                    {stripeError && (
                                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
                                            <AlertCircle size={16} />
                                            {stripeError}
                                        </div>
                                    )}

                                    <button
                                        disabled
                                        className="w-full bg-slate-700/50 text-slate-400 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-not-allowed"
                                    >
                                        Sales Paused
                                    </button>
                                    <p className="text-xs text-slate-400 text-center">
                                        30-day money-back guarantee • Secure payment via Stripe
                                    </p>
                                </div>
                            </div>
                        </m.div>

                        {/* ERGO CARD */}
                        <m.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30 hover:border-green-400/50 transition-all group relative overflow-hidden"
                        >
                            {/* 50% OFF Badge */}
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-xs font-bold px-6 py-2 rounded-bl-2xl shadow-lg">
                                50% OFF
                            </div>

                            {/* Background Icon */}
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Coins size={120} />
                            </div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 border border-green-500/30">
                                    <Coins className="text-green-400" size={32} />
                                </div>

                                <h2 className="text-3xl font-bold mb-2 text-green-400">Crypto Access</h2>
                                <div className="text-5xl font-bold mb-1">
                                    $19.99 <span className="text-lg text-slate-400 font-normal">in ERG</span>
                                </div>
                                <p className="text-xs text-amber-400/80 mb-6">⏰ Early adopter price — $24.99 after Feb 1</p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <Zap className="text-green-400 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <strong className="text-white">50% Tech Literacy Discount</strong>
                                            <p className="text-slate-400 text-sm">Save $20 for using decentralized tech</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Lock className="text-green-400 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <strong className="text-white">Private & Secure</strong>
                                            <p className="text-slate-400 text-sm">No sharing card info with payment processors</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Globe className="text-green-400 flex-shrink-0 mt-1" size={20} />
                                        <div>
                                            <strong className="text-white">Support Decentralization</strong>
                                            <p className="text-slate-400 text-sm">Help build the future of peer-to-peer commerce</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        to="/ergo-guide"
                                        className="block w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-semibold transition-all border border-white/10 text-center mb-2"
                                    >
                                        Complete Ergo Guide (15-20 min setup)
                                    </Link>
                                    <button
                                        disabled
                                        className="w-full bg-slate-700/50 text-slate-400 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-not-allowed"
                                    >
                                        Sales Paused
                                    </button>
                                    <p className="text-xs text-slate-400 text-center">
                                        First time? Follow the guide above • Still 30-day guarantee
                                    </p>
                                </div>
                            </div>
                        </m.div>

                    </div>
                </section>

                {/* QUICK COMPARISON */}
                <section className="py-16 px-6 bg-[#131320] border-t border-slate-800">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 text-center">Quick Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-600">
                                        <th className="py-4 px-4 text-slate-400 font-semibold">Feature</th>
                                        <th className="py-4 px-4 text-center text-purple-400 font-semibold">Stripe</th>
                                        <th className="py-4 px-4 text-center text-green-400 font-semibold">Ergo</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300">
                                    <tr className="border-b border-slate-800">
                                        <td className="py-4 px-4">Price (until Feb 1)</td>
                                        <td className="py-4 px-4 text-center">$39.99 <span className="text-xs text-slate-500">→ $49.99</span></td>
                                        <td className="py-4 px-4 text-center font-bold text-green-400">$19.99 <span className="text-xs text-slate-500">→ $24.99</span></td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-4 px-4">Setup Time</td>
                                        <td className="py-4 px-4 text-center font-bold text-purple-400">2 minutes</td>
                                        <td className="py-4 px-4 text-center">15-20 minutes</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-4 px-4">Payment Method</td>
                                        <td className="py-4 px-4 text-center">Credit/Debit Card</td>
                                        <td className="py-4 px-4 text-center">Cryptocurrency (ERG)</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-4 px-4">Privacy</td>
                                        <td className="py-4 px-4 text-center">Stripe processes data</td>
                                        <td className="py-4 px-4 text-center font-bold text-green-400">Fully private</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4">Refund Policy</td>
                                        <td className="py-4 px-4 text-center">30 days</td>
                                        <td className="py-4 px-4 text-center">30 days</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="py-16 pb-32 md:pb-16 px-6 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Still deciding?</h2>
                        <p className="text-slate-400 mb-8">
                            Both options get you the same course, same tools, same results. The only difference is price and payment method.
                        </p>
                        <Link
                            to="/faq"
                            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold transition-colors"
                        >
                            Check out our FAQ
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

            </div>
        </WebbookLayout>
    );
}
