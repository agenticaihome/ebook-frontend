import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet, CreditCard, Send, CheckCircle, HelpCircle,
    Smartphone, Monitor, AlertTriangle, ChevronDown, ChevronUp,
    Copy, ExternalLink, ArrowRight, ShieldCheck
} from 'lucide-react';
import WebbookLayout from './components/layout/WebbookLayout';
import CaptainHero from './components/CaptainHero';
import SchematicPlaceholder from './components/SchematicPlaceholder';

export default function HowToPay() {
    const [device, setDevice] = useState('desktop'); // desktop, ios, android
    const [exchange, setExchange] = useState('coinex'); // coinex, kucoin, gate

    const DeviceButton = ({ type, icon: Icon, label }) => (
        <button
            onClick={() => setDevice(type)}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all w-full md:w-auto justify-center
                ${device === type
                    ? 'bg-green-500/20 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
                }`}
        >
            <Icon size={24} className={device === type ? 'text-green-400' : ''} />
            <span className="font-bold">{label}</span>
        </button>
    );

    const StepHeader = ({ number, title, time }) => (
        <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-400 font-bold text-xl">
                {number}
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <p className="text-slate-400 text-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                    Estimated time: {time}
                </p>
            </div>
        </div>
    );

    return (
        <WebbookLayout>
            <div className="min-h-screen bg-[#0f0f1a] text-slate-300 font-sans selection:bg-green-500/30">

                {/* HEADER */}
                <section className="py-16 px-6 border-b border-slate-800 bg-[#131320]">
                    <div className="max-w-4xl mx-auto">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                            <Link to="/payment-guide" className="hover:text-cyan-400 transition-colors">
                                Payment Guide
                            </Link>
                            <span>/</span>
                            <span className="text-green-400">Ergo Guide</span>
                        </div>

                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Complete Ergo Payment Guide
                                <span className="block text-2xl md:text-3xl text-green-400 mt-2 font-normal">Step-by-Step for Total Beginners</span>
                            </h1>
                            <p className="text-xl text-green-400 font-bold mb-8">
                                Save 50% on your purchase — we'll walk you through every click.
                            </p>

                            {/* REASSURANCE BOX */}
                            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 max-w-2xl mx-auto flex gap-6 items-start text-left">
                                <div className="hidden md:block flex-shrink-0">
                                    <CaptainHero size="sm" pose="pointing" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <ShieldCheck className="text-green-400" /> Never used crypto before?
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        Perfect — this guide is made for you. If you can send an email, you can do this.
                                        It takes about 15-20 minutes for the first setup, and you'll save $20 instantly.
                                        <br /><br />
                                        <span className="text-white font-bold">You can do this!</span>
                                    </p>
                                </div>
                            </div>

                            {/* Back to Payment Guide Button */}
                            <div className="text-center mt-8">
                                <Link
                                    to="/payment-guide"
                                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                                >
                                    <ArrowRight className="rotate-180 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    <span>Back to Payment Guide</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BEFORE WE START */}
                <section className="py-12 px-6">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider text-sm border-b border-slate-800 pb-2">
                            Before We Start: What You'll Need
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
                                <h4 className="font-bold text-white mb-4">Checklist</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500" /> Computer or Smartphone</li>
                                    <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500" /> Email Address</li>
                                    <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500" /> Credit/Debit Card</li>
                                    <li className="flex items-center gap-3"><CheckCircle size={18} className="text-green-500" /> ~20 Minutes</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
                                <h4 className="font-bold text-white mb-4">Cost Breakdown</h4>
                                <p className="text-sm text-slate-400 mb-4">
                                    Why buy $22-25 when the course is $20?
                                </p>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="flex justify-between border-b border-slate-700 pb-1">
                                        <span>Exchange Fee</span>
                                        <span className="text-white">~$0.50 - $1.00</span>
                                    </li>
                                    <li className="flex justify-between border-b border-slate-700 pb-1">
                                        <span>Network Fee</span>
                                        <span className="text-white">~$0.01</span>
                                    </li>
                                    <li className="flex justify-between border-b border-slate-700 pb-1">
                                        <span>Price Buffer</span>
                                        <span className="text-white">~$2.00</span>
                                    </li>
                                </ul>
                                <p className="text-xs text-slate-500 mt-3 italic">
                                    *Any leftover ERG stays in your wallet forever!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* STEP 1: GET A WALLET */}
                <section className="py-16 px-6 bg-[#131320] border-y border-slate-800">
                    <div className="max-w-3xl mx-auto">
                        <StepHeader number="1" title="Get a Wallet" time="5 Minutes" />

                        <p className="text-slate-400 mb-8">
                            A crypto wallet is like a bank account, but you control it. We recommend Nautilus for desktop users — it's the easiest option.
                        </p>

                        {/* DESKTOP - Nautilus (Primary Recommendation) */}
                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Monitor className="text-green-400" size={28} />
                                <h3 className="text-xl font-bold text-white">Desktop: Nautilus Wallet (Recommended)</h3>
                            </div>
                            <p className="text-slate-400 mb-6">
                                Browser extension for Chrome, Brave, or Firefox. Works like an ad blocker — lives in your toolbar.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-white mb-2">1. Install the Extension</h4>
                                    <p className="text-slate-400 mb-4">Click the button below to add Nautilus to your browser:</p>
                                    <a
                                        href="https://chrome.google.com/webstore/detail/nautilus-wallet/gjliphkhzpchgkoafmaapjekkbfkhhbl"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                                    >
                                        Get Nautilus for Chrome <ExternalLink size={18} className="ml-2" />
                                    </a>
                                    <p className="text-slate-500 text-sm mt-3">
                                        Firefox users: Search "Nautilus Wallet" in Firefox Add-ons
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2">2. Create Your Wallet</h4>
                                    <p className="text-slate-400 mb-4">
                                        Click the Nautilus icon in your toolbar → "Create Wallet" → Set a spending password (write it down!).
                                    </p>
                                </div>

                                <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl">
                                    <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                                        <AlertTriangle size={20} /> CRITICAL: Save Your Recovery Phrase
                                    </h4>
                                    <p className="text-slate-300 mb-4">
                                        You'll see <strong>15 random words</strong>. Write them on paper (not digitally).
                                    </p>
                                    <ul className="text-sm text-slate-400 space-y-2 mb-4">
                                        <li className="flex items-center gap-2"><span className="text-red-400">❌</span> Do not screenshot</li>
                                        <li className="flex items-center gap-2"><span className="text-red-400">❌</span> Do not email to yourself</li>
                                        <li className="flex items-center gap-2"><span className="text-green-400">✅</span> Write on paper and hide it safely</li>
                                    </ul>
                                    <p className="text-xs text-slate-500">
                                        This is the ONLY way to recover your funds if your computer breaks.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2">3. Find Your Address</h4>
                                    <p className="text-slate-400 mb-4">
                                        Once created, you'll see your wallet address starting with "9". Click the copy button.
                                    </p>
                                    <p className="text-green-400 text-sm font-bold">
                                        ✅ You're ready! This address is where you'll receive ERG in Step 2.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* MOBILE OPTIONS */}
                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                            <div className="flex items-center gap-3 mb-4">
                                <Smartphone className="text-cyan-400" size={28} />
                                <h3 className="text-xl font-bold text-white">Mobile: Ergo Wallet App</h3>
                            </div>
                            <p className="text-slate-400 mb-6">
                                For iOS or Android users. Download the official Ergo Wallet from your app store.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                        <span>📱</span> iOS (iPhone/iPad)
                                    </h4>
                                    <ol className="text-slate-400 text-sm space-y-2 list-decimal list-inside">
                                        <li>Open App Store</li>
                                        <li>Search "Ergo Wallet"</li>
                                        <li>Install & create wallet</li>
                                        <li>Save recovery phrase on paper</li>
                                    </ol>
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                        <span>🤖</span> Android
                                    </h4>
                                    <ol className="text-slate-400 text-sm space-y-2 list-decimal list-inside">
                                        <li>Open Play Store</li>
                                        <li>Search "Ergo Wallet"</li>
                                        <li>Install & create wallet</li>
                                        <li>Save recovery phrase on paper</li>
                                    </ol>
                                </div>
                            </div>

                            <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg mt-6">
                                <p className="text-yellow-200 text-sm">
                                    ⚠️ <strong>Mobile users:</strong> The same recovery phrase rules apply — write it on paper, never screenshot!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STEP 2: BUY ERG */}
                <section className="py-16 px-6">
                    <div className="max-w-3xl mx-auto">
                        <StepHeader number="2" title="Buy ERG" time="5-10 Minutes" />

                        {/* Location Notice */}
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 mb-8">
                            <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                                <AlertTriangle size={20} />
                                Important: Different Options by Location
                            </h4>
                            <p className="text-slate-300 text-sm">
                                Due to regulations, buying ERG depends on where you're located. Choose the option that applies to you below.
                            </p>
                        </div>

                        {/* US USERS - Banxa */}
                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl">🇺🇸</span>
                                <h3 className="text-xl font-bold text-white">For US Users: Buy via Banxa (Easiest)</h3>
                            </div>
                            <p className="text-slate-400 mb-6">
                                If you're in the United States, use Banxa directly through your Nautilus wallet. It's built-in and compliant with US regulations.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-white mb-2">1. Open Nautilus Wallet</h4>
                                    <p className="text-slate-400 mb-4">
                                        Click the Nautilus extension in your browser (the one you installed in Step 1).
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2">2. Click "Buy"</h4>
                                    <p className="text-slate-400 mb-4">
                                        In your wallet, look for the "Buy" button. This will open Banxa integration.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2">3. Enter Amount and Pay</h4>
                                    <p className="text-slate-400 mb-4">
                                        Enter <strong>$25</strong> worth of ERG. Follow Banxa's steps to pay with your card (takes ~5 minutes).
                                    </p>
                                    <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                                        <p className="text-green-200 text-sm font-bold">
                                            ✅ ERG will appear in your Nautilus wallet automatically — no need to withdraw!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* INTERNATIONAL USERS - Exchanges */}
                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl">🌍</span>
                                <h3 className="text-xl font-bold text-white">For International Users: Use an Exchange</h3>
                            </div>
                            <p className="text-slate-400 mb-6">
                                If you're outside the US, you can use CoinEx, KuCoin, or Gate.io. We recommend CoinEx (easiest, no ID for small amounts).
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-white mb-2">Recommended: CoinEx</h4>
                                    <p className="text-slate-400 text-sm mb-3">
                                        Alternatives: <a href="https://www.kucoin.com" target="_blank" rel="noreferrer" className="text-green-400 hover:underline">KuCoin</a> | <a href="https://www.gate.io" target="_blank" rel="noreferrer" className="text-green-400 hover:underline">Gate.io</a>
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2">1. Create Account</h4>
                                    <p className="text-slate-400 mb-4">Go to CoinEx.com and sign up with your email.</p>
                                    <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                                        <img
                                            src="/images/guide/guide-coinex-signup.png"
                                            alt="CoinEx Sign Up Page"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2">2. Buy Crypto</h4>
                                    <p className="text-slate-400 mb-4">
                                        Click "Buy Crypto", select <strong>ERG</strong>, and enter <strong>$25</strong>. Pay with your card.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg">
                                            <img
                                                src="/images/guide/guide-search-erg.jpg"
                                                alt="Search for ERG"
                                                className="w-full h-auto"
                                            />
                                            <p className="text-xs text-center p-2 bg-slate-900 text-slate-500">Search for "ERG"</p>
                                        </div>
                                        <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg">
                                            <img
                                                src="/images/guide/guide-buy-erg.png"
                                                alt="Buy ERG Interface"
                                                className="w-full h-auto"
                                            />
                                            <p className="text-xs text-center p-2 bg-slate-900 text-slate-500">Select Amount & Buy</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2">3. Withdraw to Your Wallet</h4>
                                    <p className="text-slate-400 mb-4">
                                        Go to "Assets" → "Withdraw". Select ERG. Paste <strong>YOUR</strong> wallet address (from Step 1).
                                    </p>
                                    <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg mb-4">
                                        <p className="text-yellow-200 text-sm font-bold">
                                            ⚠️ Triple-check the address! If you send to the wrong place, it's gone.
                                        </p>
                                    </div>
                                    <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg mb-4">
                                        <img
                                            src="/images/guide/guide-market-info.png"
                                            alt="CoinEx Market Info"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                    <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg">
                                        <img
                                            src="/images/guide/guide-withdraw.png"
                                            alt="Withdraw Funds Interface"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STEP 3: SEND PAYMENT */}
                <section className="py-16 px-6 bg-[#131320] border-y border-slate-800">
                    <div className="max-w-3xl mx-auto">
                        <StepHeader number="3" title="Send Payment" time="2 Minutes" />

                        <div className="space-y-8">
                            <div>
                                <h4 className="font-bold text-white mb-2">1. Get the Payment Details</h4>
                                <p className="text-slate-400 mb-4">
                                    On our checkout page, you'll see the <strong>Exact ERG Amount</strong> and our <strong>Wallet Address</strong>.
                                </p>
                                <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg max-w-sm mx-auto">
                                    <img
                                        src="/images/guide/guide-wallet-qr.jpg"
                                        alt="Wallet QR Code"
                                        className="w-full h-auto"
                                    />
                                    <p className="text-xs text-center p-2 bg-slate-900 text-slate-500">Scan to Send Payment</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-white mb-2">2. Send from Your Wallet</h4>
                                <p className="text-slate-400 mb-4">
                                    Open Nautilus (or your mobile app). Click "Send". Paste our address and the EXACT amount.
                                </p>
                                <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg max-w-sm mx-auto">
                                    <img
                                        src="/images/guide/guide-mobile-send.png"
                                        alt="Mobile Wallet Send Screen"
                                        className="w-full h-auto"
                                    />
                                    <p className="text-xs text-center p-2 bg-slate-900 text-slate-500">Enter Address & Amount</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-white mb-2">3. Confirm</h4>
                                <p className="text-slate-400 mb-4">
                                    Enter your spending password and click confirm. Done!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STEP 4: CONFIRMATION */}
                <section className="py-16 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                            <CheckCircle size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Step 4: You're Done!</h2>
                        <p className="text-slate-400 max-w-xl mx-auto mb-8">
                            Our system detects the payment automatically in about 2 minutes. You'll get instant access to the course and a confirmation email.
                        </p>
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 max-w-lg mx-auto">
                            <h4 className="font-bold text-white mb-2">Congratulations!</h4>
                            <p className="text-sm text-slate-400">
                                You just set up a non-custodial wallet, bought crypto, and made a peer-to-peer transaction.
                                <br />
                                <strong>Welcome to the future of money.</strong>
                            </p>
                        </div>

                        <div className="mt-12">
                            <Link
                                to="/pay-ergo"
                                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-green-500/25"
                            >
                                Ready? Go to Checkout
                                <ArrowRight size={20} />
                            </Link>
                            <p className="text-slate-500 text-sm mt-4">
                                Don't worry, the checkout page has instructions too.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-16 px-6 bg-[#0a0a12] border-t border-slate-800">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">Troubleshooting & FAQ</h2>
                        <div className="space-y-4">
                            <details className="bg-slate-800/30 rounded-xl border border-slate-700 group">
                                <summary className="p-6 cursor-pointer font-bold text-white flex justify-between items-center">
                                    I don't see ERG in my wallet yet
                                    <ChevronDown className="group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="px-6 pb-6 text-slate-400 text-sm">
                                    Exchanges can sometimes take 10-30 minutes to process withdrawals. Check your email to see if you need to confirm the withdrawal.
                                </div>
                            </details>
                            <details className="bg-slate-800/30 rounded-xl border border-slate-700 group">
                                <summary className="p-6 cursor-pointer font-bold text-white flex justify-between items-center">
                                    I sent the wrong amount
                                    <ChevronDown className="group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="px-6 pb-6 text-slate-400 text-sm">
                                    If you sent too little, you'll need to send the remainder. If you sent too much, contact agenticaiathome@gmail.com and we'll refund the difference.
                                </div>
                            </details>
                            <details className="bg-slate-800/30 rounded-xl border border-slate-700 group">
                                <summary className="p-6 cursor-pointer font-bold text-white flex justify-between items-center">
                                    Is this safe?
                                    <ChevronDown className="group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="px-6 pb-6 text-slate-400 text-sm">
                                    Yes. Ergo has never been hacked. As long as you keep your recovery phrase safe (on paper), your funds are secure.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>

            </div >
        </WebbookLayout >
    );
}
