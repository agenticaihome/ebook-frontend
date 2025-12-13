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
    const [showFillInHelpers, setShowFillInHelpers] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `Be my Email Triage Agent.

MY EMAIL SETUP:
- Email provider: [GMAIL / OUTLOOK / APPLE MAIL / OTHER]
- I check email [X] times per day
- My biggest email pain: [TOO MANY / HARD TO PRIORITIZE / SLOW TO RESPOND / OTHER]

VIP SENDERS (always priority):
- [BOSS NAME / ROLE]
- [KEY CLIENTS OR CONTACTS]
- [FAMILY MEMBERS]

MY RESPONSE STYLE:
- Tone: [PROFESSIONAL / CASUAL / SHORT & DIRECT]
- Typical reply length: [1-2 SENTENCES / A FEW LINES / DETAILED]

Every morning when I come to you:
1. Sort my emails into: Respond Today, Can Wait, Safe to Archive
2. Draft quick replies for urgent ones (I'll approve/edit before sending)
3. Tell me what to archive without reading

Right now, help me fill in the blanks above so you know my preferences.`;

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
                        <p className="text-slate-300 text-lg">
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
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                            <h3 className="text-white font-bold">Fill in your preferences</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                            <p className="text-slate-300 text-sm mb-3">
                                Your AI will help you fill in each section. Just answer naturally!
                            </p>
                            <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/30">
                                <p className="text-green-400 text-sm flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    <span><strong>Make it a daily habit:</strong> In ChatGPT, use "Scheduled Tasks" to get a morning reminder. Or set a phone alarm for "Email triage time."</span>
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* FILL-IN HELPERS */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mb-6">
                        <button
                            onClick={() => setShowFillInHelpers(!showFillInHelpers)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/30 text-left hover:from-blue-900/30 hover:to-purple-900/30 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-white text-sm font-medium">
                                <Sparkles size={16} className="text-blue-400" />
                                📝 Not sure what to type? See examples
                            </span>
                            <ChevronDown size={16} className={`text-blue-400 transition-transform ${showFillInHelpers ? 'rotate-180' : ''}`} />
                        </button>

                        {showFillInHelpers && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 space-y-4"
                            >
                                <p className="text-slate-300 text-sm mb-3">Here's how to fill in each section:</p>

                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-blue-400 text-xs font-bold mb-2 flex items-center gap-1"><Mail size={14} /> EMAIL SETUP</p>
                                        <p className="text-slate-300 text-sm font-mono">"Gmail, I check it 3-4 times a day"</p>
                                        <p className="text-slate-300 text-sm font-mono">"My biggest pain: I get 100+ emails and can't tell what's urgent"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-amber-400 text-xs font-bold mb-2 flex items-center gap-1"><AlertCircle size={14} /> VIP SENDERS</p>
                                        <p className="text-slate-300 text-sm font-mono">"My boss Sarah, anyone from @companyname.com"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Mom and Dad, my wife Lisa"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Key clients: John at Acme Corp, Mary at XYZ Inc"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-purple-400 text-xs font-bold mb-2 flex items-center gap-1"><Inbox size={14} /> RESPONSE STYLE</p>
                                        <p className="text-slate-300 text-sm font-mono">"Professional but friendly, 2-3 sentences max"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Casual with coworkers, formal with clients"</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* DAILY USAGE GUIDE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.68 }} className="mb-6">
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-5 border border-slate-700/50">
                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                ☀️ Your 10-Minute Morning Routine
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <span className="text-blue-400 font-bold mt-0.5">1</span>
                                    <div>
                                        <span className="text-white font-medium">Open AI + inbox side by side:</span>
                                        <p className="text-slate-300">Say <span className="text-blue-400 font-mono">"Let's triage my inbox"</span> and paste or describe your unread emails</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <span className="text-blue-400 font-bold mt-0.5">2</span>
                                    <div>
                                        <span className="text-white font-medium">Get your sorted list:</span>
                                        <p className="text-slate-300">AI tells you: <span className="text-blue-400 font-mono">"3 need response today, 5 can wait, 20 safe to archive"</span></p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <span className="text-blue-400 font-bold mt-0.5">3</span>
                                    <div>
                                        <span className="text-white font-medium">Approve the drafts:</span>
                                        <p className="text-slate-300">Say <span className="text-blue-400 font-mono">"Draft a reply for the boss email"</span> — edit and send!</p>
                                    </div>
                                </div>
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
                                        <p className="text-slate-300 text-sm">Your AI identifies what actually needs your attention today</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-0.5" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Draft responses</span>
                                        <p className="text-slate-300 text-sm">Quick replies ready for you to approve, edit, or send</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-400 mt-0.5" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Archive guidance</span>
                                        <p className="text-slate-300 text-sm">Know what's safe to ignore without reading it</p>
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
                            <ChevronDown className={`text-slate-300 transition-transform ${showTips ? 'rotate-180' : ''}`} size={20} />
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
                                <HelpCircle className="text-slate-300" size={18} />
                                Troubleshooting
                            </span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showTroubleshooting ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTroubleshooting && (
                            <div className="mt-3 space-y-3">
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"Can my AI actually read my emails?"</p>
                                    <p className="text-slate-300 text-sm">Not directly. You copy/paste emails to it, or describe your inbox. For auto-access, look into ChatGPT plugins or Zapier integrations.</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"The draft replies don't sound like me"</p>
                                    <p className="text-slate-300 text-sm">Tell your AI: "Here are 3 emails I've sent before. Match this tone." It learns fast.</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"I have 1000+ unread emails"</p>
                                    <p className="text-slate-300 text-sm">Start fresh: "Help me triage just the last 7 days. Everything older gets archived."</p>
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
                            <p className="text-slate-300 text-sm mb-4">Get a weekly snapshot of your finances without the stress.</p>
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
