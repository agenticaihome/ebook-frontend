import React from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Sparkles, CreditCard, Coins, ArrowRight, CheckCircle } from 'lucide-react';
import { getStripePayment, getErgoPayment, getBetaAccess } from '../../utils/typedStorage';

// Section names for each part
const SECTION_NAMES = {
    1: 'Part 1: The Foundation',
    2: 'Part 2: Daily Operations',
    3: 'Part 3: Productivity',
    4: 'Part 4: Advanced Systems',
    5: 'Part 5: Mastery'
};

const BENEFITS = [
    '10 chapters of hands-on AI automation',
    'Build real agents that work for you',
    'Lifetime access + future updates',
    '30-day money-back guarantee'
];

const PasswordGate = ({ children, partNumber }) => {
    // Check if user has paid (Stripe or Ergo) or has beta access
    const checkAccess = () => {
        try {
            // Check for payment
            const stripePayment = getStripePayment();
            const ergoPayment = getErgoPayment();
            const betaAccess = getBetaAccess();
            
            if (stripePayment?.paid === true) return true;
            if (ergoPayment?.paid === true) return true;
            if (betaAccess === true) return true;
            
            // Legacy check for old localStorage format
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
            console.error('Error checking access:', e);
            return false;
        }
    };

    const hasAccess = checkAccess();
    const sectionName = SECTION_NAMES[partNumber] || `Part ${partNumber}`;

    if (hasAccess) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center p-4">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[150px] sm:w-[250px] md:w-[500px] h-[150px] sm:h-[250px] md:h-[500px] bg-teal-900/15 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[150px] sm:w-[250px] md:w-[500px] h-[150px] sm:h-[250px] md:h-[500px] bg-amber-900/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
            </div>

            <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
                            <Lock className="w-8 h-8 text-amber-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Unlock Full Access</h2>
                        <p className="text-slate-400 text-sm">
                            You're viewing <span className="text-amber-400 font-medium">{sectionName}</span>
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/50">
                        <p className="text-white font-semibold mb-3 text-sm">What you'll get:</p>
                        <ul className="space-y-2">
                            {BENEFITS.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                    <CheckCircle size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <span className="text-slate-500 line-through text-lg">$99</span>
                            <span className="text-3xl font-black text-white">$19.99</span>
                        </div>
                        <p className="text-amber-400 text-sm font-medium">Launch pricing — 80% off</p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3">
                        <Link
                            to="/unlock"
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <CreditCard size={18} />
                            Get Instant Access
                            <ArrowRight size={18} />
                        </Link>
                        
                        <Link
                            to="/why-ergo"
                            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white py-3 rounded-xl font-medium transition-all border border-slate-600/50 hover:border-slate-500 flex items-center justify-center gap-2 text-sm"
                        >
                            <Coins size={16} />
                            Pay with Crypto (Save 10%)
                        </Link>
                    </div>

                    {/* Already purchased */}
                    <p className="text-center text-slate-500 text-xs mt-6">
                        Already purchased? <Link to="/claim-access" className="text-teal-400 font-medium hover:underline">Claim your access</Link>
                    </p>
                </div>
            </m.div>
        </div>
    );
};

export default PasswordGate;
