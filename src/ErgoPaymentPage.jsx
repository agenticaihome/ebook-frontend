import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet, Copy, Check, AlertTriangle, ArrowRight,
    CheckCircle2, Clock, Smartphone, Loader2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { api } from './services/api';

const ErgoPaymentPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Start, 2: Payment Info
    const [isLoading, setIsLoading] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [ergPrice, setErgPrice] = useState(null);
    const [ergAmount, setErgAmount] = useState(null);
    const [ergoPayUrl, setErgoPayUrl] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('WAITING'); // WAITING, CHECKING, CONFIRMED
    const [error, setError] = useState('');

    // Initialize payment on mount
    useEffect(() => {
        initializePayment();
    }, []);

    // Auto-check for payment every 5 seconds (TokenJay is fast)
    useEffect(() => {
        if (step === 2 && paymentStatus === 'WAITING') {
            const interval = setInterval(() => {
                autoCheckPayment();
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [step, paymentStatus, accessCode]);

    const initializePayment = async () => {
        setIsLoading(true);
        try {
            const result = await api.initiateErgoPayment();

            if (result.success) {
                setAccessCode(result.accessCode);
                setWalletAddress(result.walletAddress);
                setErgAmount(result.ergAmount);
                setErgPrice(result.ergPriceUsd);
                setErgoPayUrl(result.ergoPayUrl);

                // Save to localStorage for persistence/recovery
                localStorage.setItem('ergo_payment', JSON.stringify({
                    accessCode: result.accessCode,
                    timestamp: Date.now(),
                    paid: false
                }));
            } else {
                setError('Failed to initialize payment: ' + result.error);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to payment server. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartPayment = () => {
        setStep(2);
    };

    const autoCheckPayment = async () => {
        if (!accessCode) return;

        try {
            const result = await api.checkRecentErgoPayment(accessCode);
            if (result.success && result.status === 'PAID') {
                confirmPayment(result.transactionId);
            }
        } catch (err) {
            console.error('Auto-check failed', err);
        }
    };

    const confirmPayment = (txId) => {
        setPaymentStatus('CONFIRMED');

        // Update localStorage
        const payment = JSON.parse(localStorage.getItem('ergo_payment') || '{}');
        payment.paid = true;
        payment.txId = txId;
        localStorage.setItem('ergo_payment', JSON.stringify(payment));

        console.log('✅ Payment confirmed! Redirecting to account creation...');

        // Redirect to account creation page after 2 seconds
        setTimeout(() => {
            navigate(`/create-account?payment_id=${accessCode}&type=ergo`);
        }, 2000);
    };

    const copyToClipboard = (text, setCopied) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                    <p className="text-white text-lg">Initializing secure payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Pay with <span className="text-cyan-400">ERG</span>
                    </h1>
                    <p className="text-xl text-slate-300">
                        ${(ergAmount * ergPrice)?.toFixed(2)} USD = {ergAmount?.toFixed(2)} ERG
                    </p>
                    <p className="text-sm text-slate-400 mt-2">
                        Tech Literacy Discount • 50% off vs Card Payment
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-8"
                        >
                            <div className="text-center">
                                <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Wallet className="w-10 h-10 text-cyan-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">Ready to Pay?</h2>
                                <p className="text-slate-300 mb-8">
                                    You'll get instant access after payment confirmation
                                </p>
                                <button
                                    onClick={handleStartPayment}
                                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-cyan-900/50 flex items-center gap-2 mx-auto"
                                >
                                    Continue to Payment
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && paymentStatus === 'WAITING' && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6"
                        >
                            {/* Step-by-Step Instructions */}
                            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 backdrop-blur-lg border-2 border-cyan-500/50 rounded-2xl p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            How to Complete Your Payment
                                        </h3>
                                        <p className="text-cyan-100 text-sm">
                                            Scan the QR code or click the button to pay securely via TokenJay/ErgoPay.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Mobile: ErgoPay Deep Link */}
                                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                            <Smartphone className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Mobile Payment</h3>
                                            <p className="text-sm text-slate-400">ErgoPay (Terminus, Nautilus)</p>
                                        </div>
                                    </div>
                                    <a
                                        href={ergoPayUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2"
                                    >
                                        <Wallet className="w-5 h-5" />
                                        Open Wallet App
                                    </a>
                                    <p className="text-xs text-slate-400 mt-3 text-center">
                                        Tap to open your Ergo wallet app automatically
                                    </p>
                                </div>

                                {/* Desktop: ErgoPay QR Code */}
                                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                                            <Wallet className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Scan to Pay</h3>
                                            <p className="text-sm text-slate-400">ErgoPay QR Code</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl">
                                        <QRCodeSVG value={ergoPayUrl || walletAddress} size={180} className="mx-auto" />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-3 text-center">
                                        Scan with mobile wallet to pay instantly
                                    </p>
                                </div>
                            </div>

                            {/* Auto-checking status */}
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-blue-300">
                                    <Clock className="w-5 h-5 animate-pulse" />
                                    <span className="text-sm">Waiting for payment confirmation... (Checking every 5s)</span>
                                </div>
                            </div>

                            {/* Manual Address Fallback */}
                            <div className="text-center">
                                <p className="text-slate-500 text-xs">
                                    Payment Request ID: <span className="font-mono text-slate-400">{accessCode}</span>
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {paymentStatus === 'CONFIRMED' && (
                        <motion.div
                            key="confirmed"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-lg border border-green-500/50 rounded-2xl p-12 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle2 className="w-12 h-12 text-green-400" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-white mb-4">Payment Confirmed!</h2>
                            <p className="text-green-300 text-lg mb-8">
                                Redirecting to account creation...
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 text-green-400 animate-spin" />
                                <span className="text-green-400">Loading...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ErgoPaymentPage;
