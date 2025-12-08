import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, Sparkles, Bell, ExternalLink, Sun, Calendar, Brain, AlertCircle, HelpCircle, Smartphone } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// CHAPTER 1 - SIMPLE, EFFECTIVE, HELPFUL
// For everyday users who want this to actually work
// ============================================

const AI_PLATFORMS = [
    { name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'from-[#10a37f] to-[#1a7f5a]', recommended: true, note: 'Best for scheduling' },
    { name: 'Claude', url: 'https://claude.ai/', color: 'from-[#d97706] to-[#b45309]', note: 'Great for detailed responses' },
    { name: 'Gemini', url: 'https://gemini.google.com/', color: 'from-[#4285f4] to-[#1a73e8]', note: 'Works with Google Calendar' },
    { name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'from-[#00bcf2] to-[#0078d4]', note: 'Built into Windows' },
    { name: 'Meta AI', url: 'https://www.meta.ai/', color: 'from-[#0668E1] to-[#7B35F5]', note: 'Built into WhatsApp/Instagram' },
];

const Chapter1 = () => {
    const [copied, setCopied] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);
    const [showSetupTips, setShowSetupTips] = useState(false);

    const goldPrompt = `Be my morning agent.

Every day when I wake up, send me:
- Weather for my location
- 3 things happening today
- One reminder I'll thank you for

Quick setup: just answer 3 questions and you're set for life.

Let's go.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 1: Your Morning Agent | Agentic AI Home</title>
                <meta name="description" content="Create an AI agent that sends you a personalized briefing every morning. Step-by-step guide." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 1 of 16 • Free</span>
                        </div>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400"> Morning Agent</span>
                        </h1>
                        <p className="text-slate-400 text-lg">
                            An AI that sends you a personalized briefing every morning.
                        </p>
                    </motion.div>

                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="I'm Captain Efficiency. This is the first agent you'll create—it'll check in with you every morning so you never start the day lost. Takes about 3 minutes to set up, and tomorrow you'll wake up to your first notification."
                            />
                        </Suspense>
                    </motion.div>

                    {/* WHAT YOU'LL GET */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Bell className="text-teal-400" size={18} />
                                What you'll get every morning:
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <Sun className="text-amber-400 mt-1" size={18} />
                                    <div>
                                        <span className="text-white font-medium">Weather check</span>
                                        <p className="text-slate-400 text-sm">So you know if you need an umbrella or jacket</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <Calendar className="text-teal-400 mt-1" size={18} />
                                    <div>
                                        <span className="text-white font-medium">3 things happening today</span>
                                        <p className="text-slate-400 text-sm">Meetings, appointments, or tasks you mentioned</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3">
                                    <Brain className="text-purple-400 mt-1" size={18} />
                                    <div>
                                        <span className="text-white font-medium">One reminder</span>
                                        <p className="text-slate-400 text-sm">Something you told it you tend to forget</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* STEP 1: PICK AI */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                            <h3 className="text-white font-bold">Pick your AI</h3>
                        </div>

                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 mb-3">
                            <p className="text-slate-300 text-sm mb-3">
                                Don't have any of these? <strong className="text-teal-400">ChatGPT is the easiest to start with.</strong> It's free and takes 30 seconds to sign up with your Google or Apple account.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {AI_PLATFORMS.map((platform) => (
                                    <a
                                        key={platform.name}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative flex flex-col items-center justify-center px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-105 transition-all`}
                                    >
                                        {platform.recommended && (
                                            <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                BEST
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            {platform.name}
                                            <ExternalLink size={10} className="opacity-70" />
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* STEP 2: THE PROMPT */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                            <h3 className="text-white font-bold">Copy this prompt and paste it</h3>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-teal-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>

                            <button
                                onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white'
                                    }`}
                            >
                                {copied ? (
                                    <><CheckCircle size={22} /> Copied! Now paste it in your AI</>
                                ) : (
                                    <><Copy size={22} /> Copy This Prompt</>
                                )}
                            </button>
                        </div>
                    </motion.section>

                    {/* STEP 3: WHAT HAPPENS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                            <h3 className="text-white font-bold">Answer 3 questions</h3>
                        </div>

                        <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                            <p className="text-slate-300 text-sm mb-4">The AI will ask you:</p>
                            <ul className="space-y-2 text-sm mb-4">
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-teal-400 font-bold">1.</span>
                                    <span><strong className="text-white">Where are you?</strong> - So it can get your weather</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-teal-400 font-bold">2.</span>
                                    <span><strong className="text-white">What's on your plate this week?</strong> - Work, appointments, etc.</span>
                                </li>
                                <li className="flex items-start gap-2 text-slate-300">
                                    <span className="text-teal-400 font-bold">3.</span>
                                    <span><strong className="text-white">What do you usually forget?</strong> - Keys, vitamins, calling mom, etc.</span>
                                </li>
                            </ul>
                            <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/30">
                                <p className="text-green-400 text-sm flex items-start gap-2">
                                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    <span><strong>That's it!</strong> Tomorrow morning, you'll get a notification with your first briefing.</span>
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* NOTIFICATIONS TIP */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mb-6">
                        <div className="bg-amber-900/20 rounded-xl p-4 border border-amber-500/30">
                            <div className="flex items-start gap-3">
                                <Smartphone className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
                                <div>
                                    <p className="text-amber-400 font-bold text-sm mb-1">Important: Turn on notifications</p>
                                    <p className="text-slate-300 text-sm">
                                        For this to work, you need ChatGPT notifications enabled on your phone.
                                        Go to Settings → Notifications → ChatGPT → Allow.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* TROUBLESHOOTING */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mb-8">
                        <button
                            onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-slate-800/30 rounded-xl border border-slate-700/50 text-left hover:bg-slate-800/50 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                                <HelpCircle size={16} className="text-slate-400" />
                                Not working? Common questions
                            </span>
                            <ChevronDown size={16} className={`text-slate-400 transition-transform ${showTroubleshooting ? 'rotate-180' : ''}`} />
                        </button>

                        {showTroubleshooting && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 space-y-4"
                            >
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">"The AI didn't offer to send daily notifications"</p>
                                    <p className="text-slate-400 text-sm">Say: <span className="text-teal-400">"Can you set this up as a scheduled task that sends me a notification every day?"</span></p>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">"I don't see scheduling options"</p>
                                    <p className="text-slate-400 text-sm">This feature is mainly on ChatGPT. Claude and others may need you to start a new chat each morning (still useful, just manual).</p>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1">"The AI didn't remember my info"</p>
                                    <p className="text-slate-400 text-sm">Say: <span className="text-teal-400">"Please remember this for next time"</span> - ChatGPT has a memory feature that stores your preferences.</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* NEXT */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mb-10">
                        <Link
                            to="/part1/chapter2"
                            className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-teal-500/20"
                        >
                            Continue to Chapter 2
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-center text-slate-500 text-sm mt-3">
                            Next: Create a Meal Planning Agent
                        </p>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter1;
