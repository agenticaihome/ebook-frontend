import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard, Coins, Check, Shield, Zap, Lock, Globe,
    Clock, Sparkles, Loader2, AlertCircle, ArrowRight, QrCode
} from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';
import CaptainHero from '../components/CaptainHero';
import { api } from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';
import { toast } from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';

export default function UnifiedCheckout() {
    usePageTitle('Checkout - Get Instant Access');
    const navigate = useNavigate();

    // Shared state
    const [email, setEmail] = useState('');
    const [activeTab, setActiveTab] = useState('stripe'); // 'stripe' or 'ergo'

    // Stripe state
    const [isStripeLoading, setIsStripeLoading] = useState(false);
    const [stripeError, setStripeError] = useState(null);

    // Ergo state
    const [ergoPayment, setErgoPayment] = useState({
        qrData: null,
        walletAddress: null,
        requestId: null,
        amountErg: null,
        status: 'idle' // idle | showing | polling | paid
    });
    const [ergoError, setErgoError] = useState(null);
    const [ergQuote, setErgQuote] = useState(null);

    // Fetch ERG quote when tab is active
    useEffect(() => {
        if (activeTab === 'ergo') {
            const fetchQuote = async () => {
                try {
                    const result = await api.getErgoQuote(19.99);
                    if (result.success) {
                        setErgQuote(result.ergAmount);
                    }
                } catch (err) {
                    console.error('Failed to fetch ERG quote:', err);
                }
            };
            fetchQuote();
            // Refresh every 60s
            const interval = setInterval(fetchQuote, 60000);
            return () => clearInterval(interval);
        }
    }, [activeTab]);

    // Auto-poll for Ergo payment
    useEffect(() => {
        if (ergoPayment.status === 'polling' && ergoPayment.requestId) {
            const interval = setInterval(async () => {
                try {
                    const result = await api.checkErgoPayment(ergoPayment.requestId);
                    if (result.success && result.status === 'PAID') {
                        setErgoPayment(prev => ({ ...prev, status: 'paid' }));
                        toast.success('Payment received! Creating your account...');
                        await autoCreateAccount(email, ergoPayment.requestId, 'ergo');
                    }
                } catch (err) {
                    console.error('Payment check failed:', err);
                }
            }, 5000); // Check every 5 seconds

            return () => clearInterval(interval);
        }
    }, [ergoPayment.status, ergoPayment.requestId, email]);

    // Stripe handler
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

    // Ergo handler
    const handleErgoPayment = async () => {
        if (!email || !email.includes('@')) {
            setErgoError("Please enter a valid email address.");
            return;
        }

        setErgoError(null);
        setErgoPayment(prev => ({ ...prev, status: 'showing' }));

        try {
            const result = await api.initiateErgoPayment();
            if (result.success) {
                setErgoPayment({
                    qrData: result.ergoPayUrl,
                    walletAddress: result.walletAddress,
                    requestId: result.accessCode, // Backend returns accessCode
                    amountErg: result.ergAmount, // Backend returns ergAmount
                    status: 'polling'
                });
            } else {
                setErgoError(result.error || "Failed to initialize payment.");
                setErgoPayment(prev => ({ ...prev, status: 'idle' }));
            }
        } catch (err) {
            console.error(err);
            setErgoError("Connection error. Please try again.");
            setErgoPayment(prev => ({ ...prev, status: 'idle' }));
        }
    };

    // Auto-create account after payment
    const autoCreateAccount = async (userEmail, paymentId, type) => {
        try {
            // Generate secure random password
            const password = generateSecurePassword();

            // Register user
            const result = await api.register({
                email: userEmail,
                password: password,
                paymentId: paymentId
            });

            if (result.success) {
                toast.success('Account created! Logging you in...');
                // JWT is already set in httpOnly cookie by backend
                // Navigate to dashboard
                setTimeout(() => {
                    navigate('/part1');
                }, 1500);
            } else {
                toast.error(result.error || 'Account creation failed. Please contact support.');
            }
        } catch (err) {
            console.error('Auto account creation failed:', err);
            toast.error('Payment successful but account creation failed. Please contact support with your payment ID.');
        }
    };

    // Generate secure password
    const generateSecurePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    return (
        <WebbookLayout>
            <div className="min-h-screen bg-[#0f0f1a] text-white font-sans selection:bg-cyan-500/30">

                {/* HERO SECTION */}
                <section className="py-16 px-6 border-b border-slate-800 bg-[#131320]">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Instant Access</span>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                                One checkout. Two options. Zero headaches.
                            </p>
                        </motion.div>

                        {/* Captain's Insight */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex gap-4 items-start">
                                <div className="hidden md:block flex-shrink-0">
                                    <CaptainHero size="sm" pose="pointing" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <Sparkles className="text-cyan-400" size={20} />
                                        Choose Your Path
                                    </h3>
                                    <p className="text-slate-400 text-sm">
                                        Stripe is instant and familiar. Ergo saves you 50% if you're tech-savvy.
                                        Both get you the same course immediately.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CHECKOUT SECTION */}
                <section className="py-16 px-6">
                    <div className="max-w-2xl mx-auto">

                        {/* Email Input (Shared) */}
                        <div className="mb-8">
                            <label className="block text-sm text-slate-400 mb-2">Your Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors backdrop-blur-sm text-lg"
                            />
                        </div>

                        {/* Tab Switcher */}
                        <div className="flex gap-2 mb-8 bg-slate-900/50 p-2 rounded-xl">
                            <button
                                onClick={() => setActiveTab('stripe')}
                                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${activeTab === 'stripe'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-transparent text-slate-400 hover:text-white'
                                    }`}
                            >
                                <CreditCard className="inline mr-2" size={20} />
                                Card Payment
                            </button>
                            <button
                                onClick={() => setActiveTab('ergo')}
                                className={`flex-1 py-3 rounded-lg font-semibold transition-all relative ${activeTab === 'ergo'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-transparent text-slate-400 hover:text-white'
                                    }`}
                            >
                                <Coins className="inline mr-2" size={20} />
                                Crypto (50% OFF)
                                <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                                    SAVE $20
                                </span>
                            </button>
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'stripe' && (
                                <motion.div
                                    key="stripe"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50"
                                >
                                    <div className="text-center mb-6">
                                        <div className="text-5xl font-bold mb-2">
                                            $39.99 <span className="text-lg text-slate-400 font-normal">USD</span>
                                        </div>
                                        <p className="text-slate-400">One-time payment • Instant access</p>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Check className="text-purple-400 flex-shrink-0" size={18} />
                                            <span>Instant access to full course</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Shield className="text-purple-400 flex-shrink-0" size={18} />
                                            <span>Secure payment via Stripe</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Clock className="text-purple-400 flex-shrink-0" size={18} />
                                            <span>30-day money-back guarantee</span>
                                        </div>
                                    </div>

                                    {stripeError && (
                                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg mb-4">
                                            <AlertCircle size={16} />
                                            {stripeError}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleStripePayment}
                                        disabled={isStripeLoading || !email}
                                        className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-slate-700 disabled:to-slate-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 text-center flex items-center justify-center gap-2"
                                    >
                                        {isStripeLoading ? <Loader2 className="animate-spin" /> : 'Pay $39.99 with Card'}
                                        {!isStripeLoading && <ArrowRight size={20} />}
                                    </button>
                                </motion.div>
                            )}

                            {activeTab === 'ergo' && (
                                <motion.div
                                    key="ergo"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30"
                                >


                                    // ... existing code ...

                                    <div className="text-center mb-6">
                                        <div className="text-5xl font-bold mb-2 text-green-400">
                                            $19.99 <span className="text-lg text-slate-400 font-normal">
                                                {ergQuote ? `(≈ ${ergQuote} ERG)` : 'in ERG'}
                                            </span>
                                        </div>
                                        <p className="text-slate-400">50% tech literacy discount applied</p>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Zap className="text-green-400 flex-shrink-0" size={18} />
                                            <span>Save $20 (50% off)</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Lock className="text-green-400 flex-shrink-0" size={18} />
                                            <span>Private payment (no card needed)</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Globe className="text-green-400 flex-shrink-0" size={18} />
                                            <span>Support decentralized tech</span>
                                        </div>
                                    </div>

                                    {ergoError && (
                                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg mb-4">
                                            <AlertCircle size={16} />
                                            {ergoError}
                                        </div>
                                    )}

                                    {ergoPayment.status === 'idle' && (
                                        <button
                                            onClick={handleErgoPayment}
                                            disabled={!email}
                                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-slate-700 disabled:to-slate-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-green-900/30 hover:shadow-green-900/50 text-center flex items-center justify-center gap-2"
                                        >
                                            <QrCode size={20} />
                                            Generate Payment QR Code
                                        </button>
                                    )}

                                    {(ergoPayment.status === 'showing' || ergoPayment.status === 'polling') && (
                                        <div className="bg-white p-6 rounded-xl">
                                            <div className="flex justify-center mb-4">
                                                <QRCodeSVG value={ergoPayment.qrData || ''} size={200} />
                                            </div>
                                            <p className="text-center text-slate-800 text-sm mb-2">
                                                Scan with Ergo wallet to pay <strong>{ergoPayment.amountErg} ERG</strong>
                                            </p>
                                            <p className="text-center text-slate-600 text-xs">
                                                {ergoPayment.status === 'polling' ? '⏳ Waiting for payment...' : 'Scan to complete purchase'}
                                            </p>
                                        </div>
                                    )}

                                    {ergoPayment.status === 'paid' && (
                                        <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 text-center">
                                            <Check className="text-green-400 mx-auto mb-2" size={48} />
                                            <p className="text-green-400 font-bold">Payment Received!</p>
                                            <p className="text-slate-400 text-sm">Creating your account...</p>
                                        </div>
                                    )}

                                    <p className="text-xs text-slate-500 text-center mt-4">
                                        First time with crypto? <a href="/ergo-guide" className="text-cyan-400 hover:underline">Check our guide</a>
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </section>

            </div>
        </WebbookLayout>
    );
}
