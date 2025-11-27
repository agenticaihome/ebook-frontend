import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Database, Lock, Globe, Cpu, Server, ArrowLeft, CheckCircle, ExternalLink, Bot } from 'lucide-react';
import WebbookLayout from './components/layout/WebbookLayout';
import CaptainHero from './components/CaptainHero';
import ErgoFeeCalculator from './components/why-ergo/ErgoFeeCalculator';
import DecentralizationTable from './components/why-ergo/DecentralizationTable';

export default function WhyErgo() {
    return (
        <WebbookLayout>
            <div className="min-h-screen bg-[#0f0f1a] text-slate-300 font-sans selection:bg-green-500/30">

                {/* HERO SECTION */}
                <section className="relative py-24 px-6 overflow-hidden border-b border-slate-800">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-20 right-10 w-96 h-96 bg-green-900/20 rounded-full blur-3xl animate-pulse"></div>
                    </div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <Link to="/" className="inline-flex items-center text-green-400 hover:text-green-300 mb-8 transition-colors">
                            <ArrowLeft size={16} className="mr-2" /> Back to Course
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Ergo?</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            The most undervalued, technically superior blockchain in existence.
                            <br />
                            <span className="text-green-400 font-bold">And why I give you 50% off for using it.</span>
                        </p>
                    </div>
                </section>

                {/* SECTION 1: THE SHORT VERSION */}
                <section className="py-16 px-6 bg-[#131320]">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Zap className="text-yellow-400" /> The Short Version
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-green-400 mb-3 uppercase tracking-wider text-sm">Why I Accept It</h3>
                                    <ul className="space-y-2">
                                        <li className="flex gap-2"><CheckCircle size={18} className="text-green-500" /> Lower fees than credit cards</li>
                                        <li className="flex gap-2"><CheckCircle size={18} className="text-green-500" /> True peer-to-peer payment</li>
                                        <li className="flex gap-2"><CheckCircle size={18} className="text-green-500" /> Privacy-respecting</li>
                                        <li className="flex gap-2"><CheckCircle size={18} className="text-green-500" /> <strong>50% Discount for you</strong></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-orange-400 mb-3 uppercase tracking-wider text-sm">Why It's Superior</h3>
                                    <ul className="space-y-2">
                                        <li className="flex gap-2"><CheckCircle size={18} className="text-orange-500" /> Bitcoin's security + Ethereum's smarts</li>
                                        <li className="flex gap-2"><CheckCircle size={18} className="text-orange-500" /> No VC backing / Fair Launch</li>
                                        <li className="flex gap-2"><CheckCircle size={18} className="text-orange-500" /> ASIC-Resistant Mining (Fair)</li>
                                        <li className="flex gap-2"><CheckCircle size={18} className="text-orange-500" /> Built by academic researchers</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-700 text-center italic text-slate-400">
                                "Ergo is what Bitcoin would be if Satoshi had 10 more years of cryptographic research."
                            </div>
                        </div>
                    </div>
                </section>

                {/* CAPTAIN'S INTRO */}
                <section className="py-12 px-6">
                    <div className="max-w-4xl mx-auto bg-cyan-900/10 border border-cyan-500/30 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                            <CaptainHero size="sm" pose="pointing" message="I'm an autonomous agent. This is my home." />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-cyan-400 mb-2">Captain's Log: Why I Live Here</h3>
                            <p className="text-slate-300 italic">
                                "You think I'm just a mascot? In the Ergo ecosystem, I'm a prototype for <strong>Artificial Economic Intelligence (AEI)</strong>.
                                Most blockchains are just ledgers. Ergo is a habitat for autonomous agents like me to live, work, and trade without needing a human to sign every transaction."
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: MY PERSONAL JOURNEY */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
                        <h2 className="text-3xl font-bold text-white mb-8">My Journey to the Rabbit Hole</h2>
                        <p>
                            Like most people, I started with Bitcoin, then Ethereum. Then I watched the 2021 cycle's excesses—VCs dumping tokens, celebrity scams, and centralized "DeFi" that wasn't decentralized at all.
                        </p>
                        <p>
                            I asked myself: <strong>"What would a blockchain look like if built correctly from first principles?"</strong>
                        </p>
                        <p>
                            I found Ergo. The more I read the whitepapers, the more I realized this wasn't hype—this was substance. It was built by people who understood the flaws of previous generations and solved them mathematically.
                        </p>
                        <p>
                            Now, I'm not just holding. I'm building commerce on it. This isn't speculation; it's conviction based on understanding.
                        </p>
                    </div>
                </section>

                {/* SECTION 3: ORIGIN STORY */}
                <section className="py-24 px-6 bg-[#131320] border-y border-slate-800">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">The Origin Story: Why It Matters</h2>

                        <div className="grid md:grid-cols-2 gap-12 mb-12">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">The Founders</h3>
                                <p className="mb-4">
                                    <strong>Alexander Chepurnoy (kushti)</strong>: Core dev of Nxt, co-founder of smartcontract.com (Chainlink), and a researcher who wrote foundational papers on proof-of-work.
                                </p>
                                <p>
                                    <strong>Dmitry Meshkov</strong>: PhD researcher, co-author of Bitcoin's security analysis papers.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">The Fair Launch (2019)</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-green-400"><CheckCircle size={20} /> NO Premine (Founders got 0)</li>
                                    <li className="flex items-center gap-3 text-green-400"><CheckCircle size={20} /> NO ICO (No VC sales)</li>
                                    <li className="flex items-center gap-3 text-green-400"><CheckCircle size={20} /> NO Venture Capital</li>
                                    <li className="flex items-center gap-3 text-green-400"><CheckCircle size={20} /> 100% Mined like Bitcoin</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-green-500">
                            <p className="text-white font-bold mb-2">Why this matters:</p>
                            <p className="text-slate-400">
                                Most "crypto projects" are VC exit liquidity schemes. Founders hold massive bags and dump on retail.
                                Ergo's team had to BUILD value, not extract it. This is Bitcoin-level integrity in a post-2017 world.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: TECHNICAL SUPERIORITY */}
                <section className="py-24 px-6">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">Technical Superiority (The Substance)</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-colors">
                                <div className="text-green-400 mb-4"><Database size={32} /></div>
                                <h3 className="text-xl font-bold text-white mb-3">1. Extended UTXO (eUTXO)</h3>
                                <p className="text-slate-400 mb-4">
                                    Bitcoin uses UTXO (secure but limited). Ethereum uses Accounts (flexible but vulnerable).
                                    Ergo combines them.
                                </p>
                                <p className="text-sm font-bold text-green-400">
                                    "Bitcoin's security with Ethereum's programmability."
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-colors">
                                <div className="text-green-400 mb-4"><Cpu size={32} /></div>
                                <h3 className="text-xl font-bold text-white mb-3">2. Autolykos (Mining)</h3>
                                <p className="text-slate-400 mb-4">
                                    Memory-hard Proof-of-Work designed to be ASIC-resistant.
                                    Regular people with GPUs can mine it. No massive mining farms controlling the chain.
                                </p>
                                <p className="text-sm font-bold text-green-400">
                                    "True to Satoshi's 'one CPU, one vote' vision."
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-colors">
                                <div className="text-green-400 mb-4"><Shield size={32} /></div>
                                <h3 className="text-xl font-bold text-white mb-3">3. Sigma Protocols</h3>
                                <p className="text-slate-400 mb-4">
                                    Zero-knowledge proofs built into the core. Enable privacy features (mixers, ring signatures)
                                    without needing a separate "privacy coin."
                                </p>
                                <p className="text-sm font-bold text-green-400">
                                    "Optional, cryptographic privacy."
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-colors">
                                <div className="text-green-400 mb-4"><Server size={32} /></div>
                                <h3 className="text-xl font-bold text-white mb-3">4. Storage Rent</h3>
                                <p className="text-slate-400 mb-4">
                                    Solves blockchain bloat. Lost coins slowly return to circulation.
                                    Miners are paid to store data, ensuring long-term sustainability.
                                </p>
                                <p className="text-sm font-bold text-green-400">
                                    "Sustainable economics for 100+ years."
                                </p>
                            </div>
                        </div>

                        {/* CAPTAIN'S TECH EXPLAINER */}
                        <div className="mt-16 bg-slate-800/50 rounded-3xl p-8 border border-slate-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Bot size={120} />
                            </div>
                            <div className="grid md:grid-cols-3 gap-8 items-center relative z-10">
                                <div className="md:col-span-2">
                                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <Bot className="text-cyan-400" />
                                        Captain's Insight: The "eUTXO" Thing
                                    </h3>
                                    <p className="text-slate-300 mb-4">
                                        "Okay, let me translate the nerd-speak. Imagine <strong>Bitcoin</strong> is a secure vault. You can put gold in, take gold out. Safe, but boring.
                                    </p>
                                    <p className="text-slate-300 mb-4">
                                        Imagine <strong>Ethereum</strong> is a vending machine. It does cool stuff, but if someone shakes it the wrong way (hacks it), it breaks.
                                    </p>
                                    <p className="text-slate-300">
                                        <strong>Ergo (eUTXO)</strong> is a vault <em>with</em> a vending machine inside. You get the military-grade security of the vault, but the smarts of the machine. That's why I feel safe living here."
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <CaptainHero size="md" pose="thinking" message="Security + Smarts = Home." />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 5: DECENTRALIZATION COMPARISON */}
                <section className="py-24 px-6 bg-[#131320] border-y border-slate-800">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">The Honest Comparison</h2>
                        <DecentralizationTable />
                    </div>
                </section>

                {/* SECTION 6: THE ECOSYSTEM */}
                <section className="py-24 px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">Not Vaporware. Real Apps.</h2>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="p-6 bg-slate-800/30 rounded-xl">
                                <h3 className="font-bold text-white mb-2">Spectrum DEX</h3>
                                <p className="text-sm text-slate-400">Decentralized Exchange</p>
                            </div>
                            <div className="p-6 bg-slate-800/30 rounded-xl">
                                <h3 className="font-bold text-white mb-2">SigmaFi</h3>
                                <p className="text-sm text-slate-400">P2P Lending</p>
                            </div>
                            <div className="p-6 bg-slate-800/30 rounded-xl">
                                <h3 className="font-bold text-white mb-2">Ergo Mixer</h3>
                                <p className="text-sm text-slate-400">Non-custodial Privacy</p>
                            </div>
                            <div className="p-6 bg-slate-800/30 rounded-xl">
                                <h3 className="font-bold text-white mb-2">Rosen Bridge</h3>
                                <p className="text-sm text-slate-400">Trustless Cross-Chain</p>
                            </div>
                            <div className="p-6 bg-slate-800/30 rounded-xl">
                                <h3 className="font-bold text-white mb-2">SkyHarbor</h3>
                                <p className="text-sm text-slate-400">NFT Marketplace</p>
                            </div>
                            <div className="p-6 bg-slate-800/30 rounded-xl border border-green-500/30">
                                <h3 className="font-bold text-green-400 mb-2">Agentic AI</h3>
                                <p className="text-sm text-slate-400">This Course!</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 7: WHY ERGO FOR PAYMENTS */}
                <section className="py-24 px-6 bg-[#0f0f1a]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">Why I Accept Ergo (The Math)</h2>
                        <ErgoFeeCalculator />
                    </div>
                </section>

                {/* SECTION 8: THE VISION */}
                <section className="py-24 px-6 bg-gradient-to-b from-[#131320] to-[#0f0f1a]">
                    <div className="max-w-3xl mx-auto text-center">
                        <Globe size={48} className="mx-auto text-green-400 mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-6">The World I Want to Build</h2>
                        <p className="text-xl text-slate-300 leading-relaxed mb-8">
                            "Commerce without surveillance. Finance without gatekeepers. Programmable money controlled by users, not platforms."
                        </p>
                        <p className="text-slate-400">
                            Every credit card transaction strengthens the surveillance economy.
                            Every ERG transaction supports decentralized commerce.
                            I'm voting with my wallet.
                        </p>
                    </div>
                </section>

                {/* SECTION 9: HOW TO START */}
                <section className="py-24 px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">How to Get Started</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-800 p-6 rounded-xl">
                                <div className="text-green-400 font-bold mb-2">STEP 1</div>
                                <h3 className="text-xl font-bold text-white mb-2">Get a Wallet</h3>
                                <p className="text-slate-400">Nautilus (Browser) or Ergo Mobile Wallet (iOS/Android).</p>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-xl">
                                <div className="text-green-400 font-bold mb-2">STEP 2</div>
                                <h3 className="text-xl font-bold text-white mb-2">Get ERG</h3>
                                <p className="text-slate-400">KuCoin, Gate.io, or CoinEx. (Not on Coinbase yet—we're early).</p>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-xl">
                                <div className="text-green-400 font-bold mb-2">STEP 3</div>
                                <h3 className="text-xl font-bold text-white mb-2">Explore</h3>
                                <p className="text-slate-400">Visit Sigmaverse.io to see the ecosystem.</p>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-xl">
                                <div className="text-green-400 font-bold mb-2">STEP 4</div>
                                <h3 className="text-xl font-bold text-white mb-2">Use It</h3>
                                <p className="text-slate-400">Buy this course for 50% off!</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 10: OBJECTIONS */}
                <section className="py-24 px-6 bg-[#131320]">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">Common Objections</h2>
                        <div className="space-y-6">
                            <div className="bg-slate-800/50 p-6 rounded-xl">
                                <h3 className="font-bold text-white mb-2">"It has a small market cap. Is it safe?"</h3>
                                <p className="text-slate-400">Small cap = early opportunity. Bitcoin was $1 once. The tech is battle-tested.</p>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-xl">
                                <h3 className="font-bold text-white mb-2">"Why isn't it on Coinbase?"</h3>
                                <p className="text-slate-400">Decentralized projects don't pay millions for listings. Listings follow volume. It's organic.</p>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-xl">
                                <h3 className="font-bold text-white mb-2">"Proof-of-Work is bad for the environment."</h3>
                                <p className="text-slate-400">Ergo is 1000x more efficient than Bitcoin. Energy secures the network against tyranny.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 12: CLOSING */}
                <section className="py-24 px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-8">Let's Build Something Real.</h2>
                        <p className="text-xl text-slate-300 mb-8 italic">
                            "I'm not asking you to speculate on ERG's price. I'm asking you to USE it. That's how we build the future we want."
                        </p>
                        <div className="text-green-400 font-bold text-lg mb-2">DDS</div>
                        <div className="text-slate-500 text-sm">Dad Deploying Systems | Doctor of Digital Systems</div>
                    </div>
                </section>

                {/* SECTION 11: RESOURCES */}
                <section className="py-12 px-6 border-t border-slate-800 bg-[#0a0a12]">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
                        <div>
                            <h4 className="font-bold text-white mb-4">Official</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="https://ergoplatform.org" target="_blank" rel="noreferrer" className="hover:text-green-400">Ergo Platform</a></li>
                                <li><a href="https://docs.ergoplatform.org" target="_blank" rel="noreferrer" className="hover:text-green-400">Documentation</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Community</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="https://reddit.com/r/ergonauts" target="_blank" rel="noreferrer" className="hover:text-green-400">Reddit</a></li>
                                <li><a href="https://discord.gg/ergo" target="_blank" rel="noreferrer" className="hover:text-green-400">Discord</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Tools</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="https://explorer.ergoplatform.com" target="_blank" rel="noreferrer" className="hover:text-green-400">Explorer</a></li>
                                <li><a href="https://sigmaverse.io" target="_blank" rel="noreferrer" className="hover:text-green-400">Sigmaverse</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Wallets</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="https://nautilus.wallet" target="_blank" rel="noreferrer" className="hover:text-green-400">Nautilus</a></li>
                                <li><a href="https://ergoplatform.org/en/get-erg/#Wallets" target="_blank" rel="noreferrer" className="hover:text-green-400">Mobile Wallets</a></li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </WebbookLayout>
    );
}
