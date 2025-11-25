import { ArrowLeft, Globe, CreditCard, Send, AlertCircle, Check, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowToBuyErgo() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Navigation */}
                <Link
                    to="/"
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        How to Get <span className="text-green-600">Ergo (ERG)</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Follow this simple guide to purchase Ergo and save 50% on your ebook.
                        <br />
                        <span className="text-sm font-semibold text-purple-600 mt-2 block">
                            Recommendation: Buy ~$25 USD worth of ERG. Send $20 for the book and keep $5 in your wallet!
                        </span>
                    </p>
                </div>

                {/* Step 0: Wallet Setup */}
                <div className="bg-indigo-50 border-2 border-indigo-100 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold text-indigo-900 flex items-center">
                            <Shield className="w-6 h-6 mr-2" />
                            First: You Need a Wallet
                        </h3>
                        <p className="text-indigo-800 mt-1">
                            Before buying, you need a safe place to put your Ergo.
                        </p>
                    </div>
                    <Link
                        to="/wallet-guide"
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md whitespace-nowrap"
                    >
                        Wallet Setup Guide →
                    </Link>
                </div>

                {/* US Users Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                        <div className="flex items-center">
                            <CreditCard className="w-8 h-8 mr-4" />
                            <h2 className="text-2xl font-bold">For US Users (Easiest Method)</h2>
                        </div>
                        <p className="mt-2 text-blue-100">Buy directly within Nautilus Wallet via Banxa</p>
                    </div>

                    <div className="p-8">
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Install Nautilus Wallet</h3>
                                    <p className="text-gray-600 mb-3">
                                        Download the Nautilus Wallet extension for Chrome or Firefox. This is the most popular wallet for Ergo.
                                    </p>
                                    <a
                                        href="https://chromewebstore.google.com/detail/nautilus-wallet/gjlmehlldlphhljhpnlddaodbjjcchai?hl=en"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        Download Nautilus Wallet (Chrome) →
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Use the "Buy" Feature</h3>
                                    <p className="text-gray-600">
                                        Open your Nautilus wallet and look for the <strong>"Buy"</strong> or <strong>"Fiat On-Ramp"</strong> button.
                                        This connects you to Banxa, a regulated service that lets you buy crypto with a card.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Purchase</h3>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-start">
                                            <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                                            Select <strong>Ergo (ERG)</strong> as the coin to buy.
                                        </li>
                                        <li className="flex items-start">
                                            <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                                            Enter the amount (approx $20-25 USD to cover fees).
                                        </li>
                                        <li className="flex items-start">
                                            <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                                            Follow the prompts to verify your ID (KYC) if requested.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                            <AlertCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-800">
                                <strong>Note:</strong> Banxa is available in most US states. If you live in NY, HI, or LA, you may need to use a different exchange like CoinEx (see below).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mobile Users Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-6 text-white">
                        <div className="flex items-center">
                            <CreditCard className="w-8 h-8 mr-4" />
                            <h2 className="text-2xl font-bold">For Mobile Users</h2>
                        </div>
                        <p className="mt-2 text-teal-100">Terminus (iOS) & Ergo Wallet App (Android)</p>
                    </div>

                    <div className="p-8">
                        <div className="space-y-6">
                            <p className="text-gray-700">
                                Prefer to use your phone? Download the best wallet for your device:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <a
                                    href="https://apps.apple.com/us/app/terminus-wallet-ergo/id1640042565"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center bg-black text-white p-4 rounded-xl hover:bg-gray-800 transition text-center"
                                >
                                    <span className="font-bold text-lg mb-1">iOS (iPhone)</span>
                                    <span className="text-sm text-gray-300">Download Terminus</span>
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=org.ergoplatform.android"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition text-center"
                                >
                                    <span className="font-bold text-lg mb-1">Android</span>
                                    <span className="text-sm text-green-100">Download Ergo Wallet App</span>
                                </a>
                            </div>
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                                <p className="text-sm text-yellow-800">
                                    <strong>Note:</strong> You cannot buy ERG directly inside these mobile apps. You will need to buy on an exchange (like CoinEx) and withdraw to your wallet address.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* International Users Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                        <div className="flex items-center">
                            <Globe className="w-8 h-8 mr-4" />
                            <h2 className="text-2xl font-bold">For International Users</h2>
                        </div>
                        <p className="mt-2 text-purple-100">Using CoinEx or KuCoin</p>
                    </div>

                    <div className="p-8">
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Create an Account</h3>
                                    <p className="text-gray-600 mb-3">
                                        Sign up for <a href="https://www.coinex.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold hover:underline">CoinEx</a> or <a href="https://www.kucoin.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold hover:underline">KuCoin</a>. These exchanges support Ergo globally.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Buy USDT (Tether)</h3>
                                    <p className="text-gray-600">
                                        Most exchanges pair Ergo with USDT. Use your credit card or bank transfer to buy USDT first.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Trade USDT for ERG</h3>
                                    <p className="text-gray-600">
                                        Go to the "Spot Trading" section, search for <strong>ERG/USDT</strong>, and use your USDT to buy ERG.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sending to Wallet Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                        <div className="flex items-center">
                            <Send className="w-8 h-8 mr-4" />
                            <h2 className="text-2xl font-bold">Sending to Your Wallet</h2>
                        </div>
                        <p className="mt-2 text-green-100">The final step to pay for your ebook</p>
                    </div>

                    <div className="p-8">
                        <div className="space-y-6">
                            <p className="text-gray-700 text-lg">
                                Once you have bought ERG on an exchange, you should withdraw it to your own wallet for safety and to make the payment.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="border-2 border-gray-100 rounded-xl p-6">
                                    <h4 className="font-bold text-gray-900 mb-2">1. Get Your Address</h4>
                                    <p className="text-gray-600 text-sm">
                                        Open Nautilus Wallet and click <strong>"Receive"</strong>. Copy your address (it starts with '9').
                                    </p>
                                </div>

                                <div className="border-2 border-gray-100 rounded-xl p-6">
                                    <h4 className="font-bold text-gray-900 mb-2">2. Withdraw from Exchange</h4>
                                    <p className="text-gray-600 text-sm">
                                        Go to your exchange's "Withdraw" section. Select ERG, paste your address, and confirm.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-xl p-6 mt-6">
                                <h3 className="text-xl font-bold text-green-800 mb-3">Ready to Pay?</h3>
                                <p className="text-green-900 mb-4">
                                    Once the ERG arrives in your wallet (usually 2-5 minutes), come back here and choose "Pay with Ergo" to get your discount!
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md"
                                >
                                    Go to Payment Page
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
