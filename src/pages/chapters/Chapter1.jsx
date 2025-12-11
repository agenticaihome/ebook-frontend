import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles, Bell, ExternalLink, Sun, Calendar, Brain, AlertCircle, HelpCircle, Smartphone, Eye, Shield } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ProgressTracker = React.lazy(() => import('../../components/common/ProgressTracker'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 1 - SIMPLE, EFFECTIVE, HELPFUL
// For everyday users who want this to actually work
// ============================================

const AI_PLATFORMS = [
    { name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'from-[#10a37f] to-[#1a7f5a]', recommended: true, logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" /></svg> },
    { name: 'Claude', url: 'https://claude.ai/', color: 'from-[#d97706] to-[#b45309]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg> },
    { name: 'Gemini', url: 'https://gemini.google.com/', color: 'from-[#4285f4] to-[#1a73e8]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg> },
    { name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'from-[#00bcf2] to-[#0078d4]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg> },
    { name: 'Meta AI', url: 'https://www.meta.ai/', color: 'from-[#0668E1] to-[#7B35F5]', logo: <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.77-3.92 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" /></svg> },
];

const Chapter1 = () => {
    const [copied, setCopied] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);
    const [showSetupTips, setShowSetupTips] = useState(false);
    const [showExampleOutput, setShowExampleOutput] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `Be my morning agent.

Every day when I wake up, send me:
- Weather for my location
- 3 things happening today
- One reminder I'll thank you for

Set this up now.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        // Trigger delightful feedback on copy
        triggerDelight('copy');
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
                            <span className="text-slate-300 text-sm font-medium">Chapter 1 of 10 • ~5 min • Free</span>
                        </div>
                    </motion.div>

                    {/* PROGRESS TRACKER */}
                    <Suspense fallback={<div className="h-16 animate-pulse bg-slate-800/30 rounded-xl mb-6" />}>
                        <ProgressTracker currentChapter={1} />
                    </Suspense>

                    {/* WHY THIS MATTERS */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-center mb-4"
                    >
                        <p className="text-slate-500 text-sm italic">
                            "You didn't wake up today to feel overwhelmed before breakfast."
                        </p>
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
                        <p className="text-slate-400 text-lg mb-2">
                            An AI that sends you a personalized briefing every morning.
                        </p>
                        <p className="text-slate-500 text-sm">
                            💡 "Agent" just means an AI helper that does tasks for you. Nothing technical!
                        </p>
                    </motion.div>

                    {/* OUTCOME BOX - What You'll Get */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-xl p-4 mb-6 text-center"
                    >
                        <p className="text-white text-sm md:text-base">
                            ✅ <span className="font-medium">By the end of this 5-minute chapter</span>, you'll have an AI that sends you a personalized morning briefing every day.
                        </p>
                    </motion.div>


                    {/* CAPTAIN */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="Most people wake up, check their phone for 20 minutes, and still don't know what matters today. Let's fix that in 3 minutes."
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
                                        className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-105 transition-all`}
                                    >
                                        {platform.recommended && (
                                            <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">
                                                POPULAR
                                            </span>
                                        )}
                                        {platform.logo}
                                        <span>{platform.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* STEP 2: THE PROMPT */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                            <h3 className="text-white font-bold">Copy These Instructions and paste it</h3>
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
                                    <><Copy size={22} /> Copy These Instructions</>
                                )}
                            </button>

                            {/* Reassurance for hesitant users */}
                            <p className="text-center text-slate-500 text-xs mt-2">
                                🛡️ Don't worry — you can't break anything. Just paste and chat!
                            </p>

                            {/* See Example Output */}
                            <button
                                onClick={() => setShowExampleOutput(!showExampleOutput)}
                                className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
                            >
                                <Eye size={16} />
                                {showExampleOutput ? 'Hide Example Output' : 'See What You\'ll Get'}
                                {showExampleOutput ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {showExampleOutput && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-3 bg-slate-900/80 rounded-xl p-4 border border-teal-500/20"
                                >
                                    <p className="text-teal-400 text-xs font-bold mb-2">📱 EXAMPLE OUTPUT:</p>
                                    <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-3">
                                        <p>☀️ <strong className="text-white">Weather:</strong> 72°F, partly cloudy in Austin. No umbrella needed!</p>
                                        <p>📅 <strong className="text-white">Today:</strong><br />• 9am: Team standup (Zoom)<br />• 2pm: Dentist appointment<br />• 6pm: Dinner with Sarah</p>
                                        <p>🔔 <strong className="text-white">Reminder:</strong> Mom's birthday is in 3 days - you mentioned wanting to order flowers.</p>
                                    </div>
                                    <p className="text-center text-slate-500 text-xs mt-3">👆 This is what YOUR morning agent will send you!</p>
                                </motion.div>
                            )}
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

                    {/* NEXT - Jobs/Bezos Exclusivity Framing */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mb-10">
                        <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-2xl p-6 border border-green-500/30 text-center mb-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mb-4">
                                <CheckCircle size={16} />
                                Chapter 1 Complete!
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">You just built your first AI agent. 🎉</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Most people never get past this point. You're already ahead.
                            </p>
                            <p className="text-teal-400 text-sm font-medium">
                                ✨ Now imagine 9 more handling your meals, emails, money, fitness...
                            </p>
                        </div>

                        {/* Share to X */}
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/30 rounded-xl" />}>
                            <ShareToX chapterNumber={1} />
                        </Suspense>

                        <Link
                            to="/unlock"
                            className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Continue Your Journey
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <div className="text-center mt-4 space-y-1">
                            <p className="text-slate-500 text-sm">
                                Reclaim 5+ hours every week — 10 agents, 10 chapters, lifetime access
                            </p>
                            <p className="text-green-400/80 text-xs flex items-center justify-center gap-1">
                                <Shield size={12} />
                                30-day money-back guarantee — no questions asked
                            </p>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter1;
