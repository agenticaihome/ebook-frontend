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

                        <div className="mb-8">
                            <p className="text-slate-400 mb-4">Choose your device to see specific instructions:</p>
                            <div className="flex flex-col md:flex-row gap-4">
                                <DeviceButton type="desktop" icon={Monitor} label="I'm on a Computer" />
                                <DeviceButton type="ios" icon={Smartphone} label="I'm on iPhone" />
                                <DeviceButton type="android" icon={Smartphone} label="I'm on Android" />
                            </div>
                        </div>

                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                            {device === 'desktop' && (
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4">Option A: Nautilus Wallet (Recommended)</h3>
                                        <p className="text-slate-400 mb-4">
                                            Nautilus is a browser extension (like an ad blocker) that lives in your Chrome, Brave, or Firefox browser.
                                        </p>
                                        <a
                                            href="https://chrome.google.com/webstore/detail/nautilus-wallet/gjliphkhzpchgkoafmaapjekkbfkhhbl"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-bold transition-colors mb-6"
                                        >
                                            Get Nautilus for Chrome <ExternalLink size={18} className="ml-2" />
                                        </a>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-white mb-2">1. Install the Extension</h4>
                                        <p className="text-slate-400 mb-4">Click "Add to Chrome" and confirm the popup.</p>
                                        <SchematicPlaceholder type="browser" label="Chrome Web Store" subLabel="Click 'Add to Chrome'" />
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-white mb-2">2. Create Your Wallet</h4>
                                        <p className="text-slate-400 mb-4">Click the Nautilus icon in your toolbar and select "Create Wallet". Set a spending password (write it down!).</p>
                                        <SchematicPlaceholder type="browser" label="Nautilus Wallet" subLabel="Create New Wallet" />
                                    </div>

                                    <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl">
                                        <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                                            <AlertTriangle size={20} /> CRITICAL STEP: The Recovery Phrase
                                        </h4>
                                        <p className="text-slate-300 mb-4">
                                            You will see 15 random words. <strong>Write them down on paper.</strong>
                                        </p>
                                        <ul className="text-sm text-slate-400 space-y-2 mb-4">
                                            <li className="flex items-center gap-2"><span className="text-red-400">❌</span> Do not screenshot</li>
                                            <li className="flex items-center gap-2"><span className="text-red-400">❌</span> Do not email to yourself</li>
                                            <li className="flex items-center gap-2"><span className="text-green-400">✅</span> Write on paper and hide it</li>
                                        </ul>
                                        <p className="text-xs text-slate-500">
                                            This is the ONLY way to recover your money if your computer breaks.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-white mb-2">3. Find Your Address</h4>
                                        <p className="text-slate-400 mb-4">
                                            Once created, you'll see your address starting with "9". Click the copy button.
                                        </p>
                                        <SchematicPlaceholder type="browser" label="Wallet Dashboard" subLabel="Copy Address (Starts with '9')" />
                                    </div>
                                </div>
                            )}

                            {device === 'ios' && (
                                <div className="space-y-8">
                                    <h3 className="text-xl font-bold text-white mb-4">Option B: Ergo Mobile Wallet (iOS)</h3>
                                    <p className="text-slate-400">Instructions for iOS...</p>
                                    <SchematicPlaceholder type="mobile" label="App Store" subLabel="Search 'Ergo Wallet'" />
                                    {/* Add iOS specific steps here similar to desktop */}
                                </div>
                            )}

                            {device === 'android' && (
                                <div className="space-y-8">
                                    <h3 className="text-xl font-bold text-white mb-4">Option C: Ergo Mobile Wallet (Android)</h3>
                                    <p className="text-slate-400">Instructions for Android...</p>
                                    <SchematicPlaceholder type="mobile" label="Play Store" subLabel="Search 'Ergo Wallet'" />
                                    {/* Add Android specific steps here similar to desktop */}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* STEP 2: BUY ERG */}
                <section className="py-16 px-6">
                    <div className="max-w-3xl mx-auto">
                        <StepHeader number="2" title="Buy ERG" time="5-10 Minutes" />

                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">Recommended: CoinEx (Easiest)</h3>
                            <p className="text-slate-400 mb-6">
                                We recommend CoinEx because it doesn't require ID verification for small amounts and accepts credit cards.
                            </p>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-bold text-white mb-2">1. Create Account</h4>
                                    <p className="text-slate-400 mb-4">Go to CoinEx.com and sign up with your email.</p>
                                    <SchematicPlaceholder type="browser" label="CoinEx Exchange" subLabel="Sign Up Page" />
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2">2. Buy Crypto</h4>
                                    <p className="text-slate-400 mb-4">
                                        Click "Buy Crypto", select <strong>ERG</strong>, and enter <strong>$25</strong>. Pay with your card.
                                    </p>
                                    <SchematicPlaceholder type="card" label="Buy Crypto" subLabel="Select ERG + Credit Card" />
                                </div>

                                <div>
                                    <h4 className="font-bold text-white mb-2">3. Withdraw to Your Wallet</h4>
                                    <p className="text-slate-400 mb-4">
                                        Go to "Assets" -&gt; "Withdraw". Select ERG. Paste <strong>YOUR</strong> wallet address (from Step 1).
                                    </p>
                                    <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg mb-4">
                                        <p className="text-yellow-200 text-sm font-bold">
                                            ⚠️ Triple-check the address! If you send to the wrong place, it's gone.
                                        </p>
                                    </div>
                                    <SchematicPlaceholder type="browser" label="Withdraw Funds" subLabel="Paste YOUR Wallet Address" />
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
                                <SchematicPlaceholder type="qr" label="Checkout Page" subLabel="Scan QR or Copy Address" />
                            </div>

                            <div>
                                <h4 className="font-bold text-white mb-2">2. Send from Your Wallet</h4>
                                <p className="text-slate-400 mb-4">
                                    Open Nautilus (or your mobile app). Click "Send". Paste our address and the EXACT amount.
                                </p>
                                <SchematicPlaceholder type="mobile" label="Send Transaction" subLabel="Paste Address + Exact Amount" />
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
                                    If you sent too little, you'll need to send the remainder. If you sent too much, contact support@agentic.ai and we'll refund the difference.
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
