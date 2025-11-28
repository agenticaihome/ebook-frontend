import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet, Copy, Check, AlertTriangle, ArrowRight, ShieldCheck,
    CheckCircle2, Clock, Smartphone, ExternalLink, Loader2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

// Configuration
const ERGO_WALLET_ADDRESS = '9gxmJ4attdDx1NnZL7tWkN2U9iwZbPWWSEcfcPHbJXc7xsLq6QK';
const PRICE_USD = 20;
const EXPLORER_API = 'https://api.ergoplatform.com/api/v1';

// Helper: Generate unique access code
const generateAccessCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'ERGO-';
    for (let i = 0; i < 8; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
};

// Helper: Get ERG price from CoinGecko
const getErgPrice = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ergo&vs_currencies=usd');
        const data = await response.json();
        return data.ergo.usd;
    } catch (error) {
        console.error('Failed to fetch ERG price:', error);
        return 1.5; // Fallback price
    }
};

// Helper: Convert USD to nanoERG
const usdToNanoErg = (usd, ergPriceUsd) => {
    const erg = usd / ergPriceUsd;
    return Math.floor(erg * 1_000_000_000); // ERG to nanoERG
};

// Helper: Check recent transactions for payment
const checkErgoPayment = async (walletAddress, expectedAmount) => {
    try {
        // Get the timestamp when access code was created
        const paymentData = localStorage.getItem('ergo_payment');
        if (!paymentData) return null;

        const { timestamp: createdTimestamp } = JSON.parse(paymentData);

        const response = await fetch(`${EXPLORER_API}/addresses/${walletAddress}/transactions?limit=20`);
        const data = await response.json();

        // Look for transaction with matching amount (±5% tolerance) AND created AFTER access code
        const minAmount = expectedAmount * 0.95;
        const maxAmount = expectedAmount * 1.05;

        const payment = data.items.find(tx => {
            // CRITICAL FIX: Only check transactions created AFTER the access code
            // tx.timestamp is in milliseconds
            if (tx.timestamp <= createdTimestamp) {
                return false; // Ignore old transactions
            }

            return tx.outputs.some(output =>
                output.address === walletAddress &&
                output.value >= minAmount &&
                output.value <= maxAmount
            );
        });

        return payment ? payment.id : null;
    } catch (error) {
        console.error('Failed to check payment:', error);
        return null;
    }
};

const ErgoPaymentPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Start, 2: Payment Info
    const [isLoading, setIsLoading] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [ergPrice, setErgPrice] = useState(null);
    const [ergAmount, setErgAmount] = useState(null);
    const [nanoErgAmount, setNanoErgAmount] = useState(null);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);
    const [manualTxId, setManualTxId] = useState('');
    const [checkingPayment, setCheckingPayment] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('WAITING'); // WAITING, CHECKING, CONFIRMED
    const [error, setError] = useState('');

    // Initialize payment on mount
    useEffect(() => {
        initializePayment();
    }, []);

    // Auto-check for payment every 15 seconds
    useEffect(() => {
        if (step === 2 && paymentStatus === 'WAITING') {
            const interval = setInterval(() => {
                autoCheckPayment();
            }, 15000);

            return () => clearInterval(interval);
        }
    }, [step, paymentStatus, nanoErgAmount]);

    const initializePayment = async () => {
        setIsLoading(true);
        try {
            // Get current ERG price
            const price = await getErgPrice();
            const ergNeeded = PRICE_USD / price;
            const nanoErg = usdToNanoErg(PRICE_USD, price);

            setErgPrice(price);
            setErgAmount(ergNeeded);
            setNanoErgAmount(nanoErg);

            // Generate unique access code
            const code = generateAccessCode();
            setAccessCode(code);

            // Save to localStorage for persistence
            localStorage.setItem('ergo_payment', JSON.stringify({
                accessCode: code,
                timestamp: Date.now(),
                expectedAmount: nanoErg,
                paid: false
            }));

        } catch (err) {
            setError('Failed to initialize payment. Please refresh the page.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartPayment = () => {
        setStep(2);
    };

    const autoCheckPayment = async () => {
        if (!nanoErgAmount) return;

        const txId = await checkErgoPayment(ERGO_WALLET_ADDRESS, nanoErgAmount);
        if (txId) {
            confirmPayment(txId);
        }
    };

    const handleManualCheck = async () => {
        if (!manualTxId.trim()) {
            setError('Please enter a transaction ID');
            return;
        }

        setCheckingPayment(true);
        setError('');

        try {
            // For manual TX ID, just verify it exists on blockchain
            const response = await fetch(`${EXPLORER_API}/transactions/${manualTxId}`);

            if (response.ok) {
                const tx = await response.json();

                // Verify transaction sent to our wallet with correct amount
                const validOutput = tx.outputs.find(output =>
                    output.address === ERGO_WALLET_ADDRESS &&
                    output.value >= nanoErgAmount * 0.95 &&
                    output.value <= nanoErgAmount * 1.05
                );

                if (validOutput) {
                    confirmPayment(manualTxId);
                } else {
                    setError('Transaction does not match expected payment amount and address');
                }
            } else {
                setError('Transaction not found. Please check the TX ID');
            }
        } catch (err) {
            setError('Failed to verify transaction. Please try again.');
        } finally {
            setCheckingPayment(false);
        }
    };

    const confirmPayment = (txId) => {
        setPaymentStatus('CONFIRMED');

        // Update localStorage
        const payment = JSON.parse(localStorage.getItem('ergo_payment'));
        payment.paid = true;
        payment.txId = txId;
        payment.confirmedAt = Date.now();
        localStorage.setItem('ergo_payment', JSON.stringify(payment));
        localStorage.setItem('ergo_access_granted', 'true');

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    };

    const copyToClipboard = (text, setCopied) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Generate ErgoPay URI
    const ergoPayUri = `ergopay://payment?address=${ERGO_WALLET_ADDRESS}&amount=${nanoErgAmount}&description=Course%20Access%20${accessCode}`;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                    <p className="text-white text-lg">Initializing payment...</p>
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
                        ${PRICE_USD} USD = {ergAmount?.toFixed(2)} ERG
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
                            {/* Payment Methods */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Mobile: ErgoPay Deep Link */}
                                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                            <Smartphone className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Mobile Wallet</h3>
                                            <p className="text-sm text-slate-400">One-click payment</p>
                                        </div>
                                    </div>
                                    <a
                                        href={ergoPayUri}
                                        className="block w-full bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-center transition-all"
                                    >
                                        Open Wallet App
                                    </a>
                                    <p className="text-xs text-slate-400 mt-3 text-center">
                                        Works with Nautilus, SAFEW, Ergo Wallet
                                    </p>
                                </div>

                                {/* Desktop: QR Code */}
                                <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                                            <QRCodeSVG value={ergoPayUri} size={24} fgColor="#a78bfa" bgColor="transparent" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Desktop</h3>
                                            <p className="text-sm text-slate-400">Scan QR code</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl">
                                        <QRCodeSVG value={ergoPayUri} size={180} className="mx-auto" />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-3 text-center">
                                        Scan with mobile wallet
                                    </p>
                                </div>
                            </div>

                            {/* Manual Payment Info */}
                            <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Wallet className="w-5 h-5 text-cyan-400" />
                                    Manual Payment Details
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-slate-400 block mb-2">Wallet Address</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={ERGO_WALLET_ADDRESS}
                                                readOnly
                                                className="flex-1 bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm font-mono"
                                            />
                                            <button
                                                onClick={() => copyToClipboard(ERGO_WALLET_ADDRESS, setCopiedAddress)}
                                                className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-all"
                                            >
                                                {copiedAddress ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-400 block mb-2">Amount</label>
                                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white">
                                            {ergAmount?.toFixed(4)} ERG ({PRICE_USD} USD)
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm text-slate-400 block mb-2">Access Code</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={accessCode}
                                                readOnly
                                                className="flex-1 bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-cyan-400 text-lg font-mono font-bold text-center"
                                            />
                                            <button
                                                onClick={() => copyToClipboard(accessCode, setCopiedCode)}
                                                className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-all"
                                            >
                                                {copiedCode ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2">Save this code to verify your payment</p>
                                    </div>
                                </div>
                            </div>

                            {/* Smart Notification */}
                            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-lg border border-blue-500/30 rounded-xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-blue-400 animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                            Payment Sent? Here's What Happens Next
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <p className="text-blue-200">
                                                ⏱ <strong>Automatic Detection:</strong> We're checking the blockchain every 15 seconds.
                                                Your payment should be confirmed automatically within ~30 seconds.
                                            </p>
                                            <p className="text-purple-200">
                                                ⚡ <strong>Faster Option:</strong> Have your transaction ID?
                                                Enter it below for <span className="text-cyan-400 font-bold">instant verification</span>!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Manual TX ID Verification */}
                            <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                                    Manual Verification
                                </h3>
                                <p className="text-slate-400 text-sm mb-4">
                                    Skip the wait - verify instantly with your TX ID
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={manualTxId}
                                        onChange={(e) => setManualTxId(e.target.value)}
                                        placeholder="Enter transaction ID..."
                                        className="flex-1 bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500"
                                    />
                                    <button
                                        onClick={handleManualCheck}
                                        disabled={checkingPayment}
                                        className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 text-white px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2"
                                    >
                                        {checkingPayment ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Checking...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-4 h-4" />
                                                Verify
                                            </>
                                        )}
                                    </button>
                                </div>
                                {error && (
                                    <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
                                        <AlertTriangle className="w-4 h-4" />
                                        {error}
                                    </div>
                                )}
                            </div>

                            {/* Auto-checking status */}
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-blue-300">
                                    <Clock className="w-5 h-5 animate-pulse" />
                                    <span className="text-sm">Auto-checking for payment every 15 seconds...</span>
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
                                Redirecting to your dashboard...
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 text-green-400 animate-spin" />
                                <span className="text-green-400">Loading content...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ErgoPaymentPage;
