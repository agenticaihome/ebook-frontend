import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, Copy, Check, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from './services/api';

const ErgoPaymentPage = () => {
    const [step, setStep] = useState(1); // 1: Initiate, 2: Display Info
    const [isLoading, setIsLoading] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);
    const [error, setError] = useState('');

    const handleInitiate = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await api.initiateErgoPayment();
            if (data.success) {
                setPaymentInfo(data);
                setStep(2);
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

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-700">

                {/* Header */}
                <div className="p-8 text-center bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Wallet className="text-orange-500" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Pay with Ergo</h1>
                    <p className="text-slate-400 text-sm">Secure, private, and decentralized payment</p>
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
                                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-slate-400">Item</span>
                                        <span className="text-white font-medium">Agentic AI System</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Price</span>
                                        <span className="text-orange-400 font-bold text-lg">$40.00 USD</span>
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Click below to generate a unique payment address and your
                                    <span className="text-white font-semibold"> Secret Access Code</span>.
                                </p>
                            </div>

                            <button
                                onClick={handleInitiate}
                                disabled={isLoading}
                                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2"
                            >
                                {isLoading ? 'Generating...' : 'Generate Payment Info'}
                                {!isLoading && <ArrowRight size={20} />}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            {/* Access Code Warning */}
                            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3 items-start">
                                <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                                <div className="space-y-1">
                                    <h3 className="text-yellow-500 font-semibold text-sm">SAVE THIS CODE!</h3>
                                    <p className="text-yellow-200/80 text-xs">
                                        You MUST save this code. It is the only way to claim your system access after payment.
                                    </p>
                                </div>
                            </div>

                            {/* Access Code Display */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Secret Access Code</label>
                                <div className="bg-slate-900 border border-orange-500/30 rounded-xl p-4 flex items-center justify-between group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-orange-500/5 pointer-events-none" />
                                    <code className="text-orange-400 font-mono text-lg font-bold tracking-wide">
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

                            {/* Payment Details */}
                            <div className="space-y-4 pt-4 border-t border-slate-700">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Send Amount</label>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-white">{paymentInfo.ergAmount.toFixed(4)} ERG</span>
                                        <span className="text-slate-500 text-sm">($40.00 USD)</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">To Wallet Address</label>
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
                            </div>

                            {/* Next Steps */}
                            <div className="pt-6">
                                <Link
                                    to="/login"
                                    className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <ShieldCheck size={20} />
                                    I've Sent the Payment - Claim Now
                                </Link>
                                <p className="text-center text-slate-500 text-xs mt-3">
                                    Transaction confirmation may take a few minutes.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErgoPaymentPage;
