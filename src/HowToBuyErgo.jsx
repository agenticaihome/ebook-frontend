import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Globe, CreditCard, Send, AlertCircle, Check, Shield, Smartphone, Monitor } from 'lucide-react';
import WebbookLayout from './components/layout/WebbookLayout';

export default function HowToBuyErgo() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <WebbookLayout>
            <div className="min-h-screen bg-[#0f0f1a] text-slate-300 font-sans selection:bg-green-500/30">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* Navigation */}
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center text-green-400 hover:text-green-300 font-bold mb-8 transition-colors uppercase tracking-wider text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </button>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            How to Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Ergo (ERG)</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Follow this simple guide to purchase Ergo and save 50% on the system.
                        </p>
                        <div className="mt-6 inline-block bg-green-900/20 border border-green-500/30 rounded-full px-6 py-2 text-green-400 text-sm font-bold">
                            Recommendation: Buy ~$25 USD worth of ERG.
                        </div>
                    </div>

                    {/* Step 0: Wallet Setup */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-white flex items-center mb-2">
                                <Shield className="w-6 h-6 mr-2 text-green-400" />
                                First: You Need a Wallet
                            </h3>
                            <p className="text-slate-400">
                                Before buying, you need a safe place to put your Ergo.
                            </p>
                        </div>
                        <Link
                            to="/wallet-guide"
                            className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-bold transition-all border border-slate-600 hover:border-slate-500 whitespace-nowrap"
                        >
                            Wallet Setup Guide →
                        </Link>
                    </div>

                    {/* US Users Section */}
                    <div className="bg-[#131320] rounded-2xl border border-slate-800 overflow-hidden mb-12">
                        <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 p-6 border-b border-slate-700">
                            <div className="flex items-center">
                                <CreditCard className="w-8 h-8 mr-4 text-blue-400" />
                                <div>
                                    <h2 className="text-2xl font-bold text-white">For US Users (Easiest Method)</h2>
                                    <p className="text-blue-200 text-sm">Buy directly within Nautilus Wallet via Banxa</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-900/30 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 border border-blue-500/30">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Install Nautilus Wallet</h3>
                                        <p className="text-slate-400 mb-3">
                                            Download the Nautilus Wallet extension for Chrome or Firefox. This is the most popular wallet for Ergo.
                                        </p>
                                        <a
                                            href="https://chromewebstore.google.com/detail/nautilus-wallet/gjlmehlldlphhljhpnlddaodbjjcchai?hl=en"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 font-bold hover:text-blue-300 flex items-center gap-2"
                                        >
                                            <Monitor size={16} /> Download Nautilus Wallet (Chrome)
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-900/30 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 border border-blue-500/30">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Use the "Buy" Feature</h3>
                                        <p className="text-slate-400">
                                            Open your Nautilus wallet and look for the <strong>"Buy"</strong> or <strong>"Fiat On-Ramp"</strong> button.
                                            This connects you to Banxa, a regulated service that lets you buy crypto with a card.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-900/30 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 border border-blue-500/30">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Complete Purchase</h3>
                                        <ul className="space-y-2 text-slate-400">
                                            <li className="flex items-center gap-2">
                                                <Check className="w-5 h-5 text-green-500" />
                                                Select <strong>Ergo (ERG)</strong>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Check className="w-5 h-5 text-green-500" />
                                                Enter amount (~$25 USD)
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Check className="w-5 h-5 text-green-500" />
                                                Complete ID verification if asked
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-blue-900/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
                                <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-200">
                                    <strong>Note:</strong> Banxa is available in most US states. If you live in NY, HI, or LA, you may need to use a different exchange like CoinEx.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Users Section */}
                    <div className="bg-[#131320] rounded-2xl border border-slate-800 overflow-hidden mb-12">
                        <div className="bg-gradient-to-r from-teal-900/50 to-emerald-900/50 p-6 border-b border-slate-700">
                            <div className="flex items-center">
                                <Smartphone className="w-8 h-8 mr-4 text-teal-400" />
                                <div>
                                    <h2 className="text-2xl font-bold text-white">For Mobile Users</h2>
                                    <p className="text-teal-200 text-sm">Terminus (iOS) & Ergo Wallet App (Android)</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <p className="text-slate-400 mb-6">
                                Prefer to use your phone? Download the best wallet for your device:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <a
                                    href="https://apps.apple.com/us/app/terminus-wallet-ergo/id1640042565"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-teal-500 transition-all group"
                                >
                                    <span className="font-bold text-lg text-white mb-1 group-hover:text-teal-400">iOS (iPhone)</span>
                                    <span className="text-sm text-slate-500">Download Terminus</span>
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=org.ergoplatform.android"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center bg-slate-800 border border-slate-700 p-6 rounded-xl hover:border-green-500 transition-all group"
                                >
                                    <span className="font-bold text-lg text-white mb-1 group-hover:text-green-400">Android</span>
                                    <span className="text-sm text-slate-500">Download Ergo Wallet App</span>
                                </a>
                            </div>
                            <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-xl p-4 mt-6">
                                <p className="text-sm text-yellow-200/80">
                                    <strong>Note:</strong> You cannot buy ERG directly inside these mobile apps. You will need to buy on an exchange (like CoinEx) and withdraw to your wallet address.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* International Users Section */}
                    <div className="bg-[#131320] rounded-2xl border border-slate-800 overflow-hidden mb-12">
                        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 border-b border-slate-700">
                            <div className="flex items-center">
                                <Globe className="w-8 h-8 mr-4 text-purple-400" />
                                <div>
                                    <h2 className="text-2xl font-bold text-white">For International Users</h2>
                                    <p className="text-purple-200 text-sm">Using CoinEx or KuCoin</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-900/30 text-purple-400 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 border border-purple-500/30">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Create an Account</h3>
                                        <p className="text-slate-400 mb-3">
                                            Sign up for <a href="https://www.coinex.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-bold hover:text-purple-300">CoinEx</a> or <a href="https://www.kucoin.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 font-bold hover:text-purple-300">KuCoin</a>. These exchanges support Ergo globally.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-900/30 text-purple-400 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 border border-purple-500/30">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Buy USDT (Tether)</h3>
                                        <p className="text-slate-400">
                                            Most exchanges pair Ergo with USDT. Use your credit card or bank transfer to buy USDT first.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-900/30 text-purple-400 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 border border-purple-500/30">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Trade USDT for ERG</h3>
                                        <p className="text-slate-400">
                                            Go to the "Spot Trading" section, search for <strong>ERG/USDT</strong>, and use your USDT to buy ERG.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sending to Wallet Section */}
                    <div className="bg-[#131320] rounded-2xl border border-slate-800 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 p-6 border-b border-slate-700">
                            <div className="flex items-center">
                                <Send className="w-8 h-8 mr-4 text-green-400" />
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Sending to Your Wallet</h2>
                                    <p className="text-green-200 text-sm">The final step to pay for your system</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <p className="text-slate-300 text-lg mb-8">
                                Once you have bought ERG on an exchange, you should withdraw it to your own wallet for safety and to make the payment.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                    <h4 className="font-bold text-white mb-2">1. Get Your Address</h4>
                                    <p className="text-slate-400 text-sm">
                                        Open Nautilus Wallet and click <strong>"Receive"</strong>. Copy your address (it starts with '9').
                                    </p>
                                </div>

                                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                                    <h4 className="font-bold text-white mb-2">2. Withdraw from Exchange</h4>
                                    <p className="text-slate-400 text-sm">
                                        Go to your exchange's "Withdraw" section. Select ERG, paste your address, and confirm.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-green-900/10 border border-green-500/20 rounded-xl p-6 text-center">
                                <h3 className="text-xl font-bold text-green-400 mb-3">Ready to Pay?</h3>
                                <p className="text-slate-400 mb-6">
                                    Once the ERG arrives in your wallet (usually 2-5 minutes), come back here and choose "Pay with Ergo" to get your discount!
                                </p>
                                <button
                                    onClick={handleBack}
                                    className="inline-block bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-900/20"
                                >
                                    Go Back to Payment
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </WebbookLayout>
    );
}
