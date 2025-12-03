import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Smartphone, CreditCard, ArrowRight, ExternalLink } from 'lucide-react';

const CryptoExplainerModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <m.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-[#131320] border border-green-500/30 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl shadow-green-900/20"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">How to Pay with Ergo (ERG)</h2>
                            <p className="text-slate-400">Get 50% off by using decentralized money. It takes ~15 minutes.</p>
                        </div>

                        <div className="space-y-6">
                            {/* Step 1 */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 font-bold text-white">1</div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Get a Wallet</h3>
                                    <p className="text-slate-400 text-sm mb-3">Download the Ergo Wallet App (Mobile) or Nautilus (Desktop).</p>
                                    <div className="flex gap-3">
                                        <a href="https://ergoplatform.org/en/get-erg/#Wallets" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-green-400 px-3 py-1.5 rounded-lg transition-colors">
                                            <Smartphone size={12} /> iOS / Android
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 font-bold text-white">2</div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Buy ERG</h3>
                                    <p className="text-slate-400 text-sm mb-3">Buy ~$22 worth of ERG (to cover fees) on an exchange.</p>
                                    <div className="flex gap-3">
                                        <a href="https://simpleswap.io/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1.5 rounded-lg transition-colors">
                                            <CreditCard size={12} /> SimpleSwap (No KYC)
                                        </a>
                                        <a href="https://www.kucoin.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1.5 rounded-lg transition-colors">
                                            <ExternalLink size={12} /> KuCoin / CoinEx
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 font-bold text-white">3</div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Send Payment</h3>
                                    <p className="text-slate-400 text-sm">
                                        Click "Pay with ERG" on this page. Scan the QR code with your wallet app. Done.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                            <p className="text-xs text-slate-500 mb-4">
                                Why do we do this? We believe in peer-to-peer commerce. We pass the savings (no Stripe fees) directly to you.
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold transition-colors w-full"
                            >
                                Got it, I'm ready
                            </button>
                        </div>
                    </div>
                </m.div>
            </div>
        </AnimatePresence>
    );
};

export default CryptoExplainerModal;
