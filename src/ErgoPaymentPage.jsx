import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet, Copy, Check, AlertTriangle, ArrowRight,
    CheckCircle2, Clock, Smartphone, Loader2, Monitor, ExternalLink
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
    const [copiedAmount, setCopiedAmount] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('WAITING'); // WAITING, CHECKING, CONFIRMED
    const [error, setError] = useState('');
    const [nautilusConnected, setNautilusConnected] = useState(false);
    const [userWalletAddress, setUserWalletAddress] = useState('');

    // Initialize payment on mount
    useEffect(() => {
        initializePayment();
    }, []);

    // Poll for payment status
    useEffect(() => {
        if (step === 2 && paymentStatus === 'WAITING') {
            const interval = setInterval(() => {
                autoCheckPayment();
            }, 10000); // Check every 10 seconds

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

    const copyToClipboard = (text, setCopiedState) => {
        navigator.clipboard.writeText(text);
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 2000);
    };

    const connectNautilus = async () => {
        try {
            if (typeof window.ergo_request_read_access === 'undefined') {
                alert('Nautilus Wallet is not installed!');
                return;
            }

            const connected = await window.ergo_request_read_access();
            if (connected) {
                const addresses = await window.ergo.get_used_addresses();
                const address = addresses[0];
                setUserWalletAddress(address);
                setNautilusConnected(true);
            }
        } catch (err) {
            console.error('Nautilus connection failed:', err);
            alert('Failed to connect to Nautilus.');
        }
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
                        Amount Due: <span className="font-bold text-white text-2xl">$20.00 USD</span>
                        <span className="block text-sm text-slate-400 mt-1">(≈ {ergAmount?.toFixed(4)} ERG)</span>
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
                            {/* OPTION 1: Mobile Wallet */}
                            <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <Smartphone className="w-5 h-5 text-green-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">OPTION 1: Mobile Wallet (Ergo Wallet App)</h3>
                                </div>
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="bg-white p-4 rounded-xl">
                                        <QRCodeSVG value={ergoPayUrl} size={160} />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <p className="text-slate-300 mb-4">
                                            Scan with <strong>Ergo Wallet App</strong> or <strong>Terminus</strong> on iOS/Android.
                                            <br />
                                            <span className="text-xs text-slate-400">Your wallet will show approx. $20 USD.</span>
                                        </p>
                                        <a
                                            href={ergoPayUrl}
                                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Open in Wallet App
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* OPTION 2: Browser Wallet */}
                            <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <Monitor className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">OPTION 2: Browser Wallet</h3>
                                </div>
                                <div className="text-center md:text-left">
                                    {!nautilusConnected ? (
                                        <div className="flex flex-col md:flex-row items-center gap-4">
                                            <button
                                                onClick={connectNautilus}
                                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                                            >
                                                <Wallet className="w-5 h-5" />
                                                Connect Nautilus Wallet
                                            </button>
                                            <p className="text-sm text-slate-400">
                                                Connect to verify address, then send manually below.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                                            <p className="text-green-400 font-semibold flex items-center gap-2 mb-2">
                                                <CheckCircle2 className="w-5 h-5" />
                                                Nautilus Connected!
                                            </p>
                                            <p className="text-slate-300 text-sm">
                                                Your address: <span className="font-mono text-slate-400">{userWalletAddress.substring(0, 10)}...{userWalletAddress.substring(userWalletAddress.length - 5)}</span>
                                            </p>
                                            <p className="text-white mt-2">
                                                Now please use <strong>Option 3</strong> to send the exact amount manually.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* OPTION 3: Manual Transfer */}
                            <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                                        <Copy className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">OPTION 3: Manual Transfer</h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-slate-400 block mb-1">Send exactly:</label>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-slate-900 px-4 py-3 rounded-lg flex-1 border border-slate-700 flex flex-col justify-center">
                                                <span className="text-green-400 font-mono text-lg font-bold">$20.00 USD</span>
                                                <span className="text-slate-500 text-xs font-mono">≈ {ergAmount} ERG</span>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(ergAmount.toString(), setCopiedAmount)}
                                                className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg transition-colors"
                                                title="Copy Amount"
                                            >
                                                {copiedAmount ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-400 block mb-1">To address:</label>
                                        <div className="flex items-center gap-2">
                                            <code className="bg-slate-900 px-4 py-3 rounded-lg text-slate-300 font-mono text-sm break-all flex-1 border border-slate-700">
                                                {walletAddress}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(walletAddress, setCopiedAddress)}
                                                className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg transition-colors"
                                                title="Copy Address"
                                            >
                                                {copiedAddress ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-yellow-200">
                                            <strong>Important:</strong> Send the EXACT amount. Payment is detected automatically on the blockchain.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Status Footer */}
                            <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-700 p-4 z-50">
                                <div className="max-w-4xl mx-auto flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                                        <p className="text-slate-300">
                                            Payment Status: <span className="text-white font-bold">Waiting for payment...</span>
                                        </p>
                                    </div>
                                    <p className="text-xs text-slate-500 hidden md:block">
                                        Checking blockchain every 10s • ID: {accessCode?.substring(0, 8)}
                                    </p>
                                </div>
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
