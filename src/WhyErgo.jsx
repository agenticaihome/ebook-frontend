import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Shield, Zap, Database, Lock, Globe, Cpu, Server, ArrowLeft, CheckCircle, ExternalLink, Bot, Users, Heart, Code, Pickaxe, BookOpen, MessageCircle, Scale, Eye, Flame } from 'lucide-react';
import WebbookLayout from './components/layout/WebbookLayout';
import CaptainHero from './components/CaptainHero';

// Official Ergo Resources
const ERGO_LINKS = {
    manifesto: 'https://ergoplatform.org/en/blog/2021-04-26-the-ergo-manifesto/',
    website: 'https://ergoplatform.org',
    docs: 'https://docs.ergoplatform.com',
    github: 'https://github.com/ergoplatform',
    telegram: 'https://t.me/ergoplatform',
    discord: 'https://discord.gg/ergo-platform-668903786361651200',
    twitter: 'https://x.com/Ergo_Platform',
    explorer: 'https://explorer.ergoplatform.com',
    sigmaverse: 'https://sigmaverse.io',
    nautilus: 'https://chromewebstore.google.com/detail/nautilus-wallet/gjlmehlldlphhljhpnlddaodbjjcchai',
    ergoWallet: 'https://ergoplatform.org/en/get-erg/#Wallets',
    mining: 'https://ergonaut.space/en/Guides/Mining',
    getErg: 'https://ergoplatform.org/en/get-erg/',
};


export default function WhyErgo() {
    return (
        <WebbookLayout>
            <Helmet>
                <title>Why We Chose Ergo - Honest Money for Ordinary People</title>
                <meta name="description" content="We chose Ergo because it's built on fairness, honesty, and real decentralization. No VCs. No pre-mine. Just research-grade technology designed for people like you." />
            </Helmet>
            <div className="min-h-screen bg-[#0f0f1a] text-slate-300 font-sans selection:bg-green-500/30">

                {/* HERO SECTION - The Opening */}
                <section className="relative py-24 px-6 overflow-hidden border-b border-slate-800">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-20 right-10 w-96 h-96 bg-green-900/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <Link to="/" className="inline-flex items-center text-green-400 hover:text-green-300 mb-8 transition-colors">
                            <ArrowLeft size={16} className="mr-2" /> Back to Course
                        </Link>

                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(34,197,94,0.2)] backdrop-blur-sm">
                                <img
                                    src="/assets/ergo-logo.png"
                                    alt="Ergo blockchain logo"
                                    className="w-12 h-12 object-contain invert opacity-90"
                                />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                            Why We Chose <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Ergo</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-4">
                            Honest technology. Fair from day one. Built for people, not profit.
                        </p>
                        <p className="text-lg text-slate-500 max-w-xl mx-auto">
                            In a world of hype and extraction, we chose the blockchain that kept its promises.
                        </p>
                    </div>
                </section>

                {/* SECTION 1: THE PROBLEM */}
                <section className="py-24 px-6 bg-[#131320] border-b border-slate-800">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <Flame className="text-orange-500" size={28} />
                            <h2 className="text-3xl font-bold text-white">What Went Wrong With Crypto</h2>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none">
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                Bitcoin promised liberation from banks. A peer-to-peer electronic cash system. No intermediaries. No permission required. For a moment, it felt like the beginning of something real.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                Then the venture capitalists arrived. Projects launched with massive pre-mines, insiders holding bags while retail provided exit liquidity. "Decentralized" became a marketing term for protocols controlled by foundations, VCs, and insiders.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                Celebrity pump-and-dumps. Exchange cartels. Tokens designed for speculation, not utility. Users became the product—data harvested, transactions surveilled, financial sovereignty quietly surrendered for convenience.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                The original dream didn't die. It just got buried under layers of extraction.
                            </p>
                        </div>

                        <div className="mt-12 grid md:grid-cols-2 gap-6">
                            <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-6">
                                <h4 className="font-bold text-red-400 mb-3">The Pattern of Extraction</h4>
                                <ul className="space-y-2 text-slate-400 text-sm">
                                    <li className="flex gap-2"><span className="text-red-500">×</span> ICOs and pre-mines enriching insiders</li>
                                    <li className="flex gap-2"><span className="text-red-500">×</span> VC-backed tokens with locked supplies</li>
                                    <li className="flex gap-2"><span className="text-red-500">×</span> Centralized "DeFi" with admin keys</li>
                                    <li className="flex gap-2"><span className="text-red-500">×</span> Marketing budgets larger than dev teams</li>
                                    <li className="flex gap-2"><span className="text-red-500">×</span> Users as products, not participants</li>
                                </ul>
                            </div>
                            <div className="bg-green-900/10 border border-green-500/20 rounded-xl p-6">
                                <h4 className="font-bold text-green-400 mb-3">What Should Have Been</h4>
                                <ul className="space-y-2 text-slate-400 text-sm">
                                    <li className="flex gap-2"><span className="text-green-500">✓</span> Fair distribution from block 1</li>
                                    <li className="flex gap-2"><span className="text-green-500">✓</span> Research-driven development</li>
                                    <li className="flex gap-2"><span className="text-green-500">✓</span> Tools that serve ordinary people</li>
                                    <li className="flex gap-2"><span className="text-green-500">✓</span> True censorship resistance</li>
                                    <li className="flex gap-2"><span className="text-green-500">✓</span> Long-term sustainability over hype</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: THE RESPONSE - ERGO'S DESIGN */}
                <section className="py-24 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <Scale className="text-green-500" size={28} />
                            <h2 className="text-3xl font-bold text-white">Ergo's First-Principles Response</h2>
                        </div>

                        {/* Kushti Quote - The Core Philosophy */}
                        <div className="bg-gradient-to-r from-green-900/20 to-transparent border-l-4 border-green-500 p-8 rounded-r-xl mb-12">
                            <blockquote className="text-xl md:text-2xl text-white italic leading-relaxed mb-4">
                                "Cryptocurrency should provide tools to enrich ordinary people. Small businesses struggling to make ends meet, not big depersonalized financial capital.
                                <br /><br />
                                <strong>This is what inspired me. This is my dream.</strong>"
                            </blockquote>
                            <cite className="text-green-400 font-medium">
                                — Alexander Chepurnoy (Kushti), Ergo Founder
                                <a href={ERGO_LINKS.manifesto} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-slate-500 hover:text-green-400">
                                    [The Ergo Manifesto]
                                </a>
                            </cite>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none mb-12">
                            <p className="text-lg text-slate-300 leading-relaxed">
                                Ergo was built by researchers who walked away from easier paths. Alexander Chepurnoy (Kushti), a core developer of NXT and co-founder of smartcontract.com (now Chainlink), spent years at IOHK publishing peer-reviewed cryptographic research. Instead of cashing in, he built the blockchain he believed should exist.
                            </p>
                        </div>

                        {/* The Fair Launch Box */}
                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600 mb-12">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Shield className="text-green-400" />
                                The Fair Launch (July 2019)
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3 text-green-400">
                                            <CheckCircle size={20} />
                                            <span><strong>NO Premine</strong> — Founders received 0 coins</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-green-400">
                                            <CheckCircle size={20} />
                                            <span><strong>NO ICO</strong> — No token sale, ever</span>
                                        </li>
                                        <li className="flex items-center gap-3 text-green-400">
                                            <CheckCircle size={20} />
                                            <span><strong>NO Venture Capital</strong></span>
                                        </li>
                                        <li className="flex items-center gap-3 text-green-400">
                                            <CheckCircle size={20} />
                                            <span><strong>100% Mined</strong> — Like Bitcoin</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                                    <p className="text-slate-400 text-sm mb-3">Foundation Treasury:</p>
                                    <p className="text-2xl font-bold text-white mb-2">4.37%</p>
                                    <p className="text-slate-500 text-sm">
                                        A small allocation, mined over time, to fund development. Not extracted. Not pre-allocated to insiders. <em>Earned.</em>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Why This Matters */}
                        <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-6">
                            <h4 className="font-bold text-amber-400 mb-3">Why This Matters</h4>
                            <p className="text-slate-400">
                                Most crypto projects are designed for extraction. Founders hold massive bags and dump on retail. VCs get discounted tokens and lock schedules that let them exit at your expense. Ergo's team had to <em>build value</em>, not extract it. This is Bitcoin-level integrity in a post-2017 world.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: WHY ERGO FEELS DIFFERENT */}
                <section className="py-24 px-6 bg-[#131320] border-y border-slate-800">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <Heart className="text-pink-500" size={28} />
                            <h2 className="text-3xl font-bold text-white">Why Ergo Feels Different</h2>
                        </div>

                        <p className="text-lg text-slate-400 mb-12 max-w-2xl">
                            You can sense it within minutes of joining the community. There's no marketing machine. No celebrity endorsements. No desperate shilling. Just researchers, builders, and believers.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Code className="text-green-400" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Founder Still Writes Code</h4>
                                        <p className="text-slate-400 text-sm">Kushti commits to the repo and answers questions on Telegram. No ivory towers.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Users className="text-green-400" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Community Debates Philosophy</h4>
                                        <p className="text-slate-400 text-sm">Discussions center on design, security, and mission—not just price.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Pickaxe className="text-green-400" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Miners as Equal Stakeholders</h4>
                                        <p className="text-slate-400 text-sm">ASIC-resistant mining means regular people with GPUs can participate.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Shield className="text-green-400" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">No Marketing Budget</h4>
                                        <p className="text-slate-400 text-sm">Ergo survives on merit. No paid influencers. No exchange listing bribes.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Eye className="text-green-400" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">100% Open Source</h4>
                                        <p className="text-slate-400 text-sm">Every line of code is auditable. No hidden contracts. No surprises.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Server className="text-green-400" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Run a Full Node on a Laptop</h4>
                                        <p className="text-slate-400 text-sm">True decentralization means anyone can verify the chain.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: TECHNICAL SUBSTANCE */}
                <section className="py-24 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Cpu className="text-teal-500" size={28} />
                            <h2 className="text-3xl font-bold text-white">The Technical Substance</h2>
                        </div>
                        <p className="text-slate-400 mb-12 max-w-2xl">
                            Ergo isn't vapor. It's research-grade cryptography, implemented and running in production since 2019.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Feature 1 */}
                            <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-600 hover:border-green-500/50 transition-colors">
                                <div className="text-green-400 mb-4"><Database size={32} /></div>
                                <h3 className="text-xl font-bold text-white mb-3">Extended UTXO (eUTXO)</h3>
                                <p className="text-slate-400 mb-4">
                                    Bitcoin's security model extended with smart contract capability. Each transaction is deterministic and predictable—no front-running, no sandwich attacks.
                                </p>
                                <p className="text-sm font-bold text-green-400">
                                    "Bitcoin's security with Ethereum's programmability."
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-600 hover:border-green-500/50 transition-colors">
                                <div className="text-green-400 mb-4"><Pickaxe size={32} /></div>
                                <h3 className="text-xl font-bold text-white mb-3">Autolykos (Mining)</h3>
                                <p className="text-slate-400 mb-4">
                                    Memory-hard Proof-of-Work designed to resist ASIC centralization. GPU miners can participate. No warehouse farms controlling consensus.
                                </p>
                                <p className="text-sm font-bold text-green-400">
                                    "True to Satoshi's 'one CPU, one vote' vision."
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-600 hover:border-green-500/50 transition-colors">
                                <div className="text-green-400 mb-4"><Lock size={32} /></div>
                                <h3 className="text-xl font-bold text-white mb-3">Sigma Protocols</h3>
                                <p className="text-slate-400 mb-4">
                                    Zero-knowledge proofs built into the core protocol. Enable privacy features (mixers, ring signatures) without needing a separate "privacy coin."
                                </p>
                                <p className="text-sm font-bold text-green-400">
                                    "Optional, cryptographic privacy."
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-600 hover:border-green-500/50 transition-colors">
                                <div className="text-green-400 mb-4"><Server size={32} /></div>
                                <h3 className="text-xl font-bold text-white mb-3">Storage Rent</h3>
                                <p className="text-slate-400 mb-4">
                                    Lost coins slowly return to circulation. Miners are incentivized to store data long-term. The chain stays sustainable for centuries.
                                </p>
                                <p className="text-sm font-bold text-green-400">
                                    "Sustainable economics for 100+ years."
                                </p>
                            </div>
                        </div>

                        {/* Captain's Translator Section */}
                        <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-600">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-shrink-0">
                                    <CaptainHero size="md" pose="thinking" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                                        <Bot size={20} />
                                        Captain's Translation
                                    </h3>
                                    <p className="text-slate-300 mb-3">
                                        "Okay, let me translate the tech-speak. Imagine <strong>Bitcoin</strong> is a secure vault. You can put gold in, take gold out. Safe, but boring.
                                    </p>
                                    <p className="text-slate-300 mb-3">
                                        Now imagine <strong>Ethereum</strong> is a vending machine. It does cool stuff, but if someone shakes it the wrong way (hacks it), it breaks.
                                    </p>
                                    <p className="text-slate-300">
                                        <strong>Ergo</strong> is a vault <em>with</em> a vending machine inside. Military-grade security of the vault, plus the smarts of the machine. Best of both worlds."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 5: THE VISION */}
                <section className="py-24 px-6 bg-gradient-to-b from-[#131320] to-[#0f0f1a]">
                    <div className="max-w-3xl mx-auto text-center">
                        <Globe size={48} className="mx-auto text-green-400 mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">What Ergo Could Become</h2>

                        <div className="prose prose-invert prose-lg mx-auto text-left mb-12">
                            <p className="text-slate-300 leading-relaxed">
                                In 5-15 years, the landscape will be clearer. Most of today's projects will be forgotten—either abandoned, rugged, or revealed as the extraction schemes they were.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                The ones that remain will be those built on solid foundations. Ergo is positioned to be the <strong>cleanest Layer 1 in crypto</strong>—no legacy baggage, no insider deals, no compromises.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                A neutral base layer for global commerce. Infrastructure for autonomous economic agents. Financial contracts accessible to the unbanked. Not the biggest chain, perhaps—but possibly the most honest one.
                            </p>
                        </div>

                        {/* Another Kushti Quote */}
                        <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700 text-left">
                            <blockquote className="text-lg text-white italic leading-relaxed mb-4">
                                "Too often, people sacrifice long-term growth for short-term excitement. Good times will come, and hard times will come. If Ergo is to endure, we must be principled and create value on solid foundations."
                            </blockquote>
                            <cite className="text-green-400 font-medium">
                                — The Ergo Manifesto
                            </cite>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: WHY SUPPORTING ERGO MATTERS */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <Heart className="text-red-500" size={28} />
                            <h2 className="text-3xl font-bold text-white">Why Supporting Ergo Matters</h2>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none mb-12">
                            <p className="text-slate-300 leading-relaxed">
                                You aren't just acquiring a token. You're taking a stance.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                Every ERG held is a vote against extraction capitalism. Every dApp used is proof that fair systems can work. Every node run is a declaration that decentralization isn't just a slogan.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                The alternative is surrender. Accept that platforms will own you—your data, your transactions, your financial life. Or choose to build something different.
                            </p>
                        </div>

                        {/* Final Manifesto Quote */}
                        <div className="bg-gradient-to-r from-green-900/20 to-transparent border-l-4 border-green-500 p-8 rounded-r-xl">
                            <blockquote className="text-xl text-white italic leading-relaxed mb-4">
                                "The goal of Ergonomic money is to create money and smart contracts for all people. Those at the bottom have the greatest need for the tooling we are building."
                            </blockquote>
                            <cite className="text-green-400 font-medium">
                                — The Ergo Manifesto
                            </cite>
                        </div>
                    </div>
                </section>

                {/* SECTION 7: HOW TO PARTICIPATE */}
                <section className="py-24 px-6 bg-[#131320]">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4 text-center">How to Participate</h2>
                        <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                            There's no sales pitch here. If Ergo aligns with your values, here's how to get involved.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Learn */}
                            <a href={ERGO_LINKS.manifesto} target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 p-6 rounded-xl border border-slate-600 hover:border-green-500/50 transition-all hover:-translate-y-1 group block">
                                <BookOpen className="text-green-400 mb-4" size={28} />
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Learn</h3>
                                <p className="text-slate-400 text-sm mb-3">Read the Ergo Manifesto. Understand the philosophy. Know what you're supporting.</p>
                                <span className="text-green-400 text-sm flex items-center gap-1">
                                    Read the Manifesto <ExternalLink size={14} />
                                </span>
                            </a>

                            {/* Get ERG */}
                            <a href={ERGO_LINKS.getErg} target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 p-6 rounded-xl border border-slate-600 hover:border-green-500/50 transition-all hover:-translate-y-1 group block">
                                <Zap className="text-amber-400 mb-4" size={28} />
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Acquire ERG</h3>
                                <p className="text-slate-400 text-sm mb-3">Get a wallet. Acquire ERG if it aligns with your values. Use the ecosystem.</p>
                                <span className="text-green-400 text-sm flex items-center gap-1">
                                    Get ERG <ExternalLink size={14} />
                                </span>
                            </a>

                            {/* Build */}
                            <a href={ERGO_LINKS.docs} target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 p-6 rounded-xl border border-slate-600 hover:border-green-500/50 transition-all hover:-translate-y-1 group block">
                                <Code className="text-teal-400 mb-4" size={28} />
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Build</h3>
                                <p className="text-slate-400 text-sm mb-3">ErgoScript is powerful. The docs are deep. Contribution is welcomed.</p>
                                <span className="text-green-400 text-sm flex items-center gap-1">
                                    Developer Docs <ExternalLink size={14} />
                                </span>
                            </a>

                            {/* Mine */}
                            <a href={ERGO_LINKS.mining} target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 p-6 rounded-xl border border-slate-600 hover:border-green-500/50 transition-all hover:-translate-y-1 group block">
                                <Pickaxe className="text-orange-400 mb-4" size={28} />
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Mine</h3>
                                <p className="text-slate-400 text-sm mb-3">Secure the network with your GPU. True proof-of-work, ASIC-resistant.</p>
                                <span className="text-green-400 text-sm flex items-center gap-1">
                                    Mining Guide <ExternalLink size={14} />
                                </span>
                            </a>

                            {/* Join Community */}
                            <a href={ERGO_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 p-6 rounded-xl border border-slate-600 hover:border-green-500/50 transition-all hover:-translate-y-1 group block">
                                <MessageCircle className="text-blue-400 mb-4" size={28} />
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Join the Community</h3>
                                <p className="text-slate-400 text-sm mb-3">Talk to real people. Ask questions. The community is welcoming.</p>
                                <span className="text-green-400 text-sm flex items-center gap-1">
                                    Telegram <ExternalLink size={14} />
                                </span>
                            </a>

                            {/* Explore Ecosystem */}
                            <a href={ERGO_LINKS.sigmaverse} target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 p-6 rounded-xl border border-slate-600 hover:border-green-500/50 transition-all hover:-translate-y-1 group block">
                                <Globe className="text-purple-400 mb-4" size={28} />
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">Explore dApps</h3>
                                <p className="text-slate-400 text-sm mb-3">DEXs, lending, NFTs, gaming—all on a fair blockchain.</p>
                                <span className="text-green-400 text-sm flex items-center gap-1">
                                    Sigmaverse <ExternalLink size={14} />
                                </span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* SECTION 8: RESOURCES */}
                <section className="py-16 px-6 border-t border-slate-800 bg-[#0a0a12]">
                    <div className="max-w-5xl mx-auto">
                        <h3 className="text-xl font-bold text-white mb-8 text-center">Official Resources</h3>
                        <div className="grid md:grid-cols-4 gap-8 text-sm">
                            <div>
                                <h4 className="font-bold text-white mb-4">Learn</h4>
                                <ul className="space-y-2 text-slate-400">
                                    <li><a href={ERGO_LINKS.website} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">Ergo Platform <ExternalLink size={12} /></a></li>
                                    <li><a href={ERGO_LINKS.docs} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">Documentation <ExternalLink size={12} /></a></li>
                                    <li><a href={ERGO_LINKS.manifesto} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">The Manifesto <ExternalLink size={12} /></a></li>
                                    <li><a href={ERGO_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">GitHub <ExternalLink size={12} /></a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-4">Community</h4>
                                <ul className="space-y-2 text-slate-400">
                                    <li><a href={ERGO_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">Telegram <ExternalLink size={12} /></a></li>
                                    <li><a href={ERGO_LINKS.discord} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">Discord <ExternalLink size={12} /></a></li>
                                    <li><a href={ERGO_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">Twitter/X <ExternalLink size={12} /></a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-4">Tools</h4>
                                <ul className="space-y-2 text-slate-400">
                                    <li><a href={ERGO_LINKS.explorer} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">Block Explorer <ExternalLink size={12} /></a></li>
                                    <li><a href={ERGO_LINKS.sigmaverse} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">Sigmaverse (dApps) <ExternalLink size={12} /></a></li>
                                    <li><a href={ERGO_LINKS.mining} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">Mining Guide <ExternalLink size={12} /></a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-4">Wallets</h4>
                                <ul className="space-y-2 text-slate-400">
                                    <li><a href={ERGO_LINKS.nautilus} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">Nautilus (Browser) <ExternalLink size={12} /></a></li>
                                    <li><a href={ERGO_LINKS.ergoWallet} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-1">Mobile Wallets <ExternalLink size={12} /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CLOSING */}
                <section className="py-16 pb-32 md:pb-16 px-6 text-center border-t border-slate-800">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-xl text-slate-300 italic mb-6">
                            "We built Ergo because we believed in the original vision—not the exit."
                        </p>
                        <p className="text-slate-500 text-sm">
                            This page contains no financial advice. DYOR. Ergo is open-source technology, not an investment product.
                        </p>
                    </div>
                </section>

            </div>
        </WebbookLayout>
    );
}
