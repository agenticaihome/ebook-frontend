import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles, Mail, Inbox, Clock, AlertCircle, HelpCircle, Zap, Eye } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 4 - EMAIL TRIAGE AGENT
// Inbox zero in 10 minutes a day
// ============================================

// Import shared AI platforms data
import { AI_PLATFORMS } from '../../data/aiPlatforms';

const Chapter4 = () => {
    const [copied, setCopied] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [showExampleOutput, setShowExampleOutput] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `Be my Email Triage Agent.

Every morning, help me process my inbox in 10 minutes:
1. Show me emails that need a response TODAY
2. Draft quick replies I can approve or edit
3. Tell me what can wait or be archived

Start by asking what email I use.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        triggerDelight('copy');
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 4: Email Triage Agent | Agentic AI Home</title>
                <meta name="description" content="Create an AI agent that helps you achieve inbox zero in just 10 minutes a day." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 4 of 10 • Premium</span>
                        </div>
                    </motion.div>

                    {/* WHY THIS MATTERS */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-4">
                        <p className="text-slate-500 text-sm italic">
                            "Your inbox should serve you. Not the other way around."
                        </p>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Email Triage Agent</span>
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Inbox zero in 10 minutes a day. No exceptions.
                        </p>
                    </motion.div>

                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="Your inbox is someone else's to-do list. Let's take it back. This agent will help you process 50+ emails in under 10 minutes."
                            />
                        </Suspense>
                    </motion.div>

                    {/* STEP 1 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                            <h3 className="text-white font-bold">Open your AI</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 mb-3">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {AI_PLATFORMS.map((platform) => (
                                    <a
                                        key={platform.name}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-[1.02] transition-all`}
                                    >
                                        {platform.recommended && (
                                            <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">POPULAR</span>
                                        )}
                                        {platform.logo}
                                        <span>{platform.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* STEP 2 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                            <h3 className="text-white font-bold">Copy These Instructions and paste it</h3>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-blue-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>
                            <button
                                onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white'
                                    }`}
                            >
                                {copied ? (
                                    <><CheckCircle size={22} /> Copied! Now paste it in your AI</>
                                ) : (
                                    <><Copy size={22} /> Copy These Instructions</>
                                )}
                            </button>

                            {/* See Example Output */}
                            <button
                                onClick={() => setShowExampleOutput(!showExampleOutput)}
                                className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                            >
                                <Eye size={16} />
                                {showExampleOutput ? 'Hide Example Output' : 'See What You\'ll Get'}
                                {showExampleOutput ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {showExampleOutput && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-3 bg-slate-900/80 rounded-xl p-4 border border-blue-500/20"
                                >
                                    <p className="text-blue-400 text-xs font-bold mb-2">📧 EXAMPLE OUTPUT:</p>
                                    <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-3">
                                        <p>🔴 <strong className="text-white">Respond Today (3):</strong><br />• Boss - "Project update needed" (sent 2 hrs ago)<br />• Client - "Quick question about invoice" <br />• Doctor's office - confirm appointment</p>
                                        <p>🟡 <strong className="text-white">Can Wait (8):</strong><br />• Team updates, newsletters, FYI emails<br />• LinkedIn notifications</p>
                                        <p>✅ <strong className="text-white">Safe to Archive (24):</strong><br />• Promotional emails, automated receipts</p>
                                        <p>✍️ <strong className="text-white">Draft Reply for Boss:</strong><br />"Hi [Name], here's a quick update on the project..."</p>
                                    </div>
                                    <p className="text-center text-slate-500 text-xs mt-3">👆 Your agent will organize YOUR inbox like this!</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.section>

                    {/* STEP 3 */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                            <h3 className="text-white font-bold">Tell your AI about your inbox</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                            <p className="text-slate-300 text-sm mb-3">
                                Your AI will ask what email you use. Just tell it (Gmail, Outlook, etc.) and describe your typical inbox chaos.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium">Gmail</span>
                                <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium">Outlook</span>
                                <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium">Apple Mail</span>
                                <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium">Work email</span>
                            </div>
                        </div>
                    </motion.section>

                    {/* WHAT YOU'LL GET */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-8">
                        <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl p-6 border border-blue-500/20">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Sparkles className="text-blue-400" size={20} />
                                What you'll get
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-0.5" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Priority inbox</span>
                                        <p className="text-slate-400 text-sm">Your AI identifies what actually needs your attention today</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-0.5" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Draft responses</span>
                                        <p className="text-slate-400 text-sm">Quick replies ready for you to approve, edit, or send</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-0.5" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Archive guidance</span>
                                        <p className="text-slate-400 text-sm">Know what's safe to ignore without reading it</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* MAKE IT BETTER */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mb-8">
                        <button
                            onClick={() => setShowTips(!showTips)}
                            className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors"
                        >
                            <span className="text-white font-bold flex items-center gap-2">
                                <Zap className="text-amber-400" size={18} />
                                Make it even better
                            </span>
                            <ChevronDown className={`text-slate-400 transition-transform ${showTips ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTips && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">1</div>
                                    <p className="text-slate-300 text-sm"><strong>Tell it your VIPs:</strong> "Emails from my boss, clients, and family are always priority 1."</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">2</div>
                                    <p className="text-slate-300 text-sm"><strong>Set your tone:</strong> "I like short, friendly replies. No fluff."</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">3</div>
                                    <p className="text-slate-300 text-sm"><strong>Define archive rules:</strong> "Newsletters, promos, and CC'd emails can usually wait."</p>
                                </div>
                            </div>
                        )}
                    </motion.section>

                    {/* TROUBLESHOOTING */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mb-8">
                        <button
                            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                            className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors"
                        >
                            <span className="text-white font-bold flex items-center gap-2">
                                <HelpCircle className="text-slate-400" size={18} />
                                Troubleshooting
                            </span>
                            <ChevronDown className={`text-slate-400 transition-transform ${showTroubleshooting ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTroubleshooting && (
                            <div className="mt-3 space-y-3">
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"Can my AI actually read my emails?"</p>
                                    <p className="text-slate-400 text-sm">Not directly. You copy/paste emails to it, or describe your inbox. For auto-access, look into ChatGPT plugins or Zapier integrations.</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"The draft replies don't sound like me"</p>
                                    <p className="text-slate-400 text-sm">Tell your AI: "Here are 3 emails I've sent before. Match this tone." It learns fast.</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"I have 1000+ unread emails"</p>
                                    <p className="text-slate-400 text-sm">Start fresh: "Help me triage just the last 7 days. Everything older gets archived."</p>
                                </div>
                            </div>
                        )}
                    </motion.section>

                    {/* SHARE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }} className="mb-6">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/30 rounded-xl" />}>
                            <ShareToX chapterNumber={4} />
                        </Suspense>
                    </motion.section>

                    {/* NEXT CHAPTER */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
                        <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-2xl p-6 border border-green-500/30 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mb-4">
                                <CheckCircle size={16} />
                                Chapter 4 Complete!
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">Ready for your Money Check-In Agent?</h3>
                            <p className="text-slate-400 text-sm mb-4">Get a weekly snapshot of your finances without the stress.</p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <Link to="/part1/chapter3" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">
                                    ← Back to Chapter 3
                                </Link>
                                <Link
                                    to="/part2/chapter2"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white font-bold rounded-xl transition-all"
                                >
                                    🎉 Awesome! On to Chapter 5
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter4;
