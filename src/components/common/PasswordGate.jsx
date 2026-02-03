import React from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Sparkles, CreditCard, Coins, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { getStripePayment, getErgoPayment, getBetaAccess } from '../../utils/typedStorage';

const BENEFITS = [
    'Full course access with hands-on AI automation',
    'Build real agents that save you 5+ hrs/week',
    'Lifetime access — no subscriptions',
    '30-day money-back guarantee'
];

const PasswordGate = ({ children }) => {
    // Check if user has paid (Stripe or Ergo) or has beta access
    const checkAccess = () => {
        try {
            const stripePayment = getStripePayment();
            const ergoPayment = getErgoPayment();
            const betaAccess = getBetaAccess();
            
            if (stripePayment?.paid === true) return true;
            if (ergoPayment?.paid === true) return true;
            if (betaAccess === true) return true;
            
            // Legacy check
            if (localStorage.getItem('stripe_payment')) {
                const parsed = JSON.parse(localStorage.getItem('stripe_payment'));
                if (parsed?.paid === true) return true;
            }
            if (localStorage.getItem('ergo_payment')) {
                const parsed = JSON.parse(localStorage.getItem('ergo_payment'));
                if (parsed?.paid === true) return true;
            }
            
            return false;
        } catch (e) {
            return false;
        }
    };

    if (checkAccess()) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
            {/* Subtle background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px]" />
            </div>

            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/20">
                            <Lock className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Premium Content</h2>
                        <p className="text-slate-400 text-sm">
                            This chapter is part of the full course
                        </p>
                    </div>

                    {/* What's included */}
                    <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/30">
                        <p className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
                            <Sparkles size={16} className="text-amber-400" />
                            What's included:
                        </p>
                        <ul className="space-y-2.5">
                            {BENEFITS.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                                    <CheckCircle size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pricing - Clear and honest */}
                    <div className="text-center mb-6 py-4 border-y border-slate-700/30">
                        <p className="text-teal-400 text-xs font-semibold tracking-wider uppercase mb-2">
                            Launch Price
                        </p>
                        <div className="text-4xl font-black text-white mb-1">$39.99</div>
                        <p className="text-slate-500 text-sm">One-time payment • Lifetime access</p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                        <Link
                            to="/unlock"
                            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <CreditCard size={18} />
                            Get Full Access
                            <ArrowRight size={18} />
                        </Link>
                        
                        <Link
                            to="/why-ergo"
                            className="w-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white py-3 rounded-xl font-medium transition-all border border-slate-600/50 hover:border-slate-500 flex items-center justify-center gap-2 text-sm"
                        >
                            <Coins size={16} className="text-amber-400" />
                            Pay with Crypto — $19.99
                            <span className="text-xs text-amber-400 font-semibold ml-1">Save 50%</span>
                        </Link>
                    </div>

                    {/* Trust signals */}
                    <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-slate-700/30">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Shield size={14} className="text-green-500" />
                            Secure checkout
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <CheckCircle size={14} className="text-green-500" />
                            30-day guarantee
                        </div>
                    </div>

                    {/* Already purchased */}
                    <p className="text-center text-slate-500 text-xs mt-5">
                        Already purchased? <Link to="/claim-access" className="text-teal-400 font-medium hover:underline">Claim your access</Link>
                    </p>
                </div>
            </m.div>
        </div>
    );
};

export default PasswordGate;
