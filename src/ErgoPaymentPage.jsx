import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet, Copy, Check, AlertTriangle, ArrowRight, ShieldCheck,
    CheckCircle2, Clock, Smartphone, ExternalLink, Loader2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { api } from './services/api';

const ErgoPaymentPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Initiate, 2: Display Info & Auto-Detect
    const [isLoading, setIsLoading] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);
    const [error, setError] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('WAITING'); // WAITING, PENDING, PAID
    const [statusMessage, setStatusMessage] = useState('');
    const [detectedTxId, setDetectedTxId] = useState('');

    // Auto-polling for payment detection
    useEffect(() => {
        if (paymentInfo && paymentStatus !== 'PAID') {
            const interval = setInterval(() => {
                checkForPayment();
            }, 10000); // Poll every 10 seconds

            // Initial check immediately
            checkForPayment();

            return () => clearInterval(interval);
        }
    }, [paymentInfo, paymentStatus]);

    const checkForPayment = async () => {
        if (!paymentInfo?.accessCode) return;

        try {
            const data = await api.checkRecentErgoPayment(paymentInfo.accessCode);

            if (data.success) {
                setPaymentStatus(data.status);
                setStatusMessage(data.message || '');

                if (data.transactionId) {
                    setDetectedTxId(data.transactionId);
                }

                // Auto-login when payment is confirmed
                if (data.status === 'PAID' && data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('ergo_access_code', paymentInfo.accessCode);

                    // Show success briefly before redirecting
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2000);
                }
            }
        } catch (err) {
            console.error('Error checking payment:', err);
        }
    };

    const handleInitiate = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await api.initiateErgoPayment();
            if (data.success) {
                setPaymentInfo(data);
                setStep(2);
                setPaymentStatus('WAITING');
            } else {
                setError(data.error || 'Failed to initiate payment');
            }
        } catch (err) {
            setError(err.message || 'Connection failed');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text, setCopied) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const generateErgoPayUri = () => {
        if (!paymentInfo) return '';
        const nanoErg = Math.round(paymentInfo.ergAmount * 1000000000);
        return `ergopay://payment?address=${paymentInfo.walletAddress}&amount=${nanoErg}&description=Agentic AI System Access`;
    };

    const getStatusIcon = () => {
        switch (paymentStatus) {
            case 'WAITING':
                return <Clock className="animate-pulse" size={24} />;
            case 'PENDING':
                return <Loader2 className="animate-spin" size={24} />;
            case 'PAID':
                return <CheckCircle2 size={24} />;
            default:
                return <Clock size={24} />;
        }
    };

    const getStatusColor = () => {
        switch (paymentStatus) {
            case 'WAITING':
                return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
            case 'PENDING':
                return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
            case 'PAID':
                return 'text-green-400 border-green-500/30 bg-green-500/10';
            default:
                return 'text-slate-400 border-slate-700 bg-slate-900';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-700">

                {/* Header */}
                <div className="p-8 text-center bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-900/50">
                        <Wallet className="text-white" size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Pay with Ergo</h1>
                    <p className="text-slate-400">Secure, private, decentralized payment</p>
                    <div className="mt-3 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full">
                        <span className="text-green-400 font-semibold text-sm">Tech Literacy Discount: $20</span>
                        <span className="text-slate-500 line-through text-xs">$40</span>
                    </div>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {step === 1 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center space-y-6"
                        >
                            <div className="space-y-4">
                                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-slate-400">Item</span>
                                        <span className="text-white font-medium">Agentic AI System</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Price</span>
                                        <span className="text-orange-400 font-bold text-2xl">$20.00 USD</span>
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-left">
                                    <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                                        <ShieldCheck size={18} />
                                        Why Ergo?
                                    </h3>
                                    <ul className="text-blue-200/80 text-sm space-y-1">
                                        <li>✓ No personal information required</li>
                                        <li>✓ Direct peer-to-peer payment</li>
                                        <li>✓ Lower fees than traditional payment</li>
                                        <li>✓ Instant global transactions</li>
                                    </ul>
                                </div>
                            </div>

                            <button
                                onClick={handleInitiate}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-900/30 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        Generate Payment Info
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            {/* Status Banner */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={paymentStatus}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className={`border rounded-xl p-4 flex items-center gap-3 ${getStatusColor()}`}
                                >
                                    {getStatusIcon()}
                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {paymentStatus === 'WAITING' && 'Waiting for Payment'}
                                            {paymentStatus === 'PENDING' && 'Payment Detected!'}
                                            {paymentStatus === 'PAID' && 'Payment Confirmed!'}
                                        </h3>
                                        <p className="text-xs opacity-80 mt-0.5">
                                            {statusMessage || 'Monitoring blockchain for your transaction...'}
                                        </p>
                                        {detectedTxId && (
                                            <a
                                                href={`https://explorer.ergoplatform.com/en/transactions/${detectedTxId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs underline mt-1 inline-flex items-center gap-1 hover:opacity-80"
                                            >
                                                View on Explorer <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {paymentStatus !== 'PAID' && (
                                <>
                                    {/* Access Code Warning */}
                                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3 items-start">
                                        <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                                        <div className="space-y-1">
                                            <h3 className="text-yellow-500 font-semibold text-sm">SAVE THIS CODE!</h3>
                                            <p className="text-yellow-200/80 text-xs">
                                                You need this code to access your content. Save it securely!
                                            </p>
                                        </div>
                                    </div>

                                    {/* Access Code Display */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                            Secret Access Code
                                        </label>
                                        <div className="bg-slate-900 border border-orange-500/30 rounded-xl p-4 flex items-center justify-between group relative overflow-hidden">
                                            <div className="absolute inset-0 bg-orange-500/5 pointer-events-none" />
                                            <code className="text-orange-400 font-mono text-xl font-bold tracking-wide">
                                                {paymentInfo.accessCode}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(paymentInfo.accessCode, setCopiedCode)}
                                                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                                            >
                                                {copiedCode ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Payment Methods Grid */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* QR Code Method */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <Smartphone size={16} />
                                                <span className="text-sm font-medium">Scan with Mobile Wallet</span>
                                            </div>
                                            <div className="bg-white p-4 rounded-xl">
                                                <QRCodeSVG
                                                    value={paymentInfo.walletAddress}
                                                    size={200}
                                                    level="H"
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <span className="text-xl font-bold text-white">
                                                    {paymentInfo.ergAmount.toFixed(4)} ERG
                                                </span>
                                                <p className="text-slate-500 text-xs mt-1">
                                                    ≈ $20.00 USD
                                                </p>
                                            </div>
                                        </div>

                                        {/* Manual Method */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <Wallet size={16} />
                                                <span className="text-sm font-medium">Desktop Wallet</span>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                    Send Amount
                                                </label>
                                                <div className="bg-slate-900 border border-slate-700 rounded-xl p-3">
                                                    <div className="text-2xl font-bold text-white">
                                                        {paymentInfo.ergAmount.toFixed(4)} ERG
                                                    </div>
                                                    <div className="text-slate-500 text-sm">
                                                        ${paymentInfo.totalUsd.toFixed(2)} USD at ${paymentInfo.ergPriceUsd.toFixed(2)}/ERG
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                    To Wallet Address
                                                </label>
                                                <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 flex items-center justify-between">
                                                    <code className="text-slate-300 font-mono text-xs break-all pr-2">
                                                        {paymentInfo.walletAddress}
                                                    </code>
                                                    <button
                                                        onClick={() => copyToClipboard(paymentInfo.walletAddress, setCopiedAddress)}
                                                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white shrink-0"
                                                    >
                                                        {copiedAddress ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* ErgoPay Button */}
                                            <a
                                                href={generateErgoPayUri()}
                                                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                                            >
                                                <Smartphone size={18} />
                                                Pay with ErgoPay
                                            </a>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                                        <h3 className="text-white font-semibold mb-2 text-sm">Payment Instructions:</h3>
                                        <ol className="text-slate-400 text-xs space-y-1 list-decimal list-inside">
                                            <li>Save your access code (above)</li>
                                            <li>Send exactly {paymentInfo.ergAmount.toFixed(4)} ERG to the wallet address</li>
                                            <li>Wait for automatic confirmation (usually 2-10 minutes)</li>
                                            <li>You'll be logged in automatically when payment is confirmed</li>
                                        </ol>
                                    </div>
                                </>
                            )}

                            {paymentStatus === 'PAID' && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="text-green-500" size={48} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                                    <p className="text-slate-400 mb-4">Redirecting to your dashboard...</p>
                                    <Loader2 className="animate-spin text-orange-500 mx-auto" size={32} />
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* Footer */}
                {step === 2 && paymentStatus !== 'PAID' && (
                    <div className="p-4 bg-slate-900/50 border-t border-slate-700 text-center">
                        <p className="text-slate-500 text-xs">
                            Having trouble? You can also claim manually on the{' '}
                            <a href="/login" className="text-orange-400 hover:underline">login page</a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ErgoPaymentPage;
