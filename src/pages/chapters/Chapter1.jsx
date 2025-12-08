import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, Sparkles, Clock, Zap, ExternalLink, Bell } from 'lucide-react';

// Lazy load Captain
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// CHAPTER 1 - THE REAL DEAL
// ChatGPT CAN schedule, notify, and act as an agent
// ============================================

const AI_PLATFORMS = [
    { name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'from-green-500 to-emerald-600', recommended: true },
    { name: 'Claude', url: 'https://claude.ai/', color: 'from-orange-500 to-amber-600' },
    { name: 'Gemini', url: 'https://gemini.google.com/', color: 'from-blue-500 to-indigo-600' },
    { name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'from-cyan-500 to-blue-600' },
    { name: 'Meta AI', url: 'https://www.meta.ai/', color: 'from-blue-600 to-purple-600' },
];

const Chapter1 = () => {
    const [copied, setCopied] = useState(false);
    const [showMore, setShowMore] = useState(false);

    // THE REAL PROMPT - This actually works
    const quickWinPrompt = `I want you to be my Morning Briefing Agent.

Every morning at 7am, send me a notification with:
- Today's weather for my location
- My top 3 priorities
- One thing I might forget

First, ask me a few questions to personalize this. Then set up the daily schedule.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(quickWinPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 1: Create Your First AI Agent | Agentic AI Home</title>
                <meta name="description" content="Set up a real AI agent that sends you daily notifications. Takes 2 minutes." />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-3xl mx-auto px-6 py-12">

                    {/* CHAPTER BADGE */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30">
                            <Sparkles size={14} className="text-teal-400" />
                            <span className="text-teal-400 text-sm font-medium">
                                Chapter 1 of 16 • Free
                            </span>
                        </div>
                    </motion.div>

                    {/* CAPTAIN WELCOME */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="lg"
                                pose="default"
                                message="In the next 2 minutes, you're going to create a REAL AI agent that sends you a notification every morning. Not a toy—an actual automated assistant. Let's do this."
                            />
                        </Suspense>
                    </motion.div>

                    {/* WHAT YOU'RE ABOUT TO DO */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 rounded-xl p-4 mb-8 border border-green-500/30"
                    >
                        <div className="flex items-center gap-3">
                            <Bell className="text-green-400" size={24} />
                            <div>
                                <p className="text-white font-bold">What you're creating:</p>
                                <p className="text-green-400 text-sm">An AI agent that notifies you every morning at 7am with weather, priorities & reminders</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* STEP 1: CHOOSE YOUR AI */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6"
                    >
                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                                Step 1: Open Your AI (ChatGPT recommended for scheduling)
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {AI_PLATFORMS.map((platform) => (
                                    <a
                                        key={platform.name}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:opacity-90 transition-opacity`}
                                    >
                                        {platform.recommended && (
                                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                                                Best
                                            </span>
                                        )}
                                        {platform.name}
                                        <ExternalLink size={12} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* STEP 2: THE PROMPT */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/20 rounded-2xl p-6 md:p-8 border-2 border-teal-500/50">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                                Step 2: Copy & Paste This
                            </h3>

                            <div className="bg-slate-900/80 rounded-xl p-4 mb-4 border border-slate-700">
                                <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                                    {quickWinPrompt}
                                </pre>
                            </div>

                            <button
                                onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${copied
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                        : 'bg-teal-500 hover:bg-teal-400 text-white'
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <CheckCircle size={20} />
                                        Copied! Now paste it in ChatGPT
                                    </>
                                ) : (
                                    <>
                                        <Copy size={20} />
                                        Copy This Prompt
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.section>

                    {/* WHAT HAPPENS NEXT */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8"
                    >
                        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                            <h3 className="text-lg font-bold text-white mb-3">What happens next:</h3>
                            <ul className="space-y-3 text-slate-300 text-sm">
                                <li className="flex items-start gap-3">
                                    <span className="bg-teal-500/20 text-teal-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                    <span>ChatGPT asks you a few questions about your routine</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-teal-500/20 text-teal-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                    <span>It sets up a <strong className="text-white">scheduled task</strong> to run every morning</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="bg-teal-500/20 text-teal-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                    <span>Tomorrow at 7am, you get a <strong className="text-white">push notification</strong> with your briefing</span>
                                </li>
                            </ul>

                            <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                                <p className="text-green-400 text-sm font-bold flex items-center gap-2">
                                    <Bell size={14} />
                                    Pro tip: Enable ChatGPT notifications on your phone to get the morning alert
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* THIS IS REAL */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mb-8"
                    >
                        <div className="bg-amber-900/20 rounded-xl p-6 border border-amber-500/30">
                            <h3 className="text-amber-400 font-bold mb-2">Yes, this is real automation.</h3>
                            <p className="text-slate-300 text-sm">
                                ChatGPT can now run scheduled tasks, send notifications, and act as a true background agent.
                                You just created something that will work for you <strong className="text-white">every single day</strong> without you doing anything.
                            </p>
                        </div>
                    </motion.section>

                    {/* NEXT CHAPTER CTA */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mb-10"
                    >
                        <Link
                            to="/part1/chapter2"
                            className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
                        >
                            Continue to Chapter 2
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-center text-slate-500 text-sm mt-3">
                            Next: Create agents for email, calendar & more
                        </p>
                    </motion.section>

                    {/* WANT MORE? */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="w-full flex items-center justify-center gap-2 py-3 text-slate-400 hover:text-white transition-colors text-sm"
                        >
                            <ChevronDown size={16} className={`transition-transform ${showMore ? 'rotate-180' : ''}`} />
                            {showMore ? 'Hide' : 'What else can AI agents do?'}
                        </button>

                        {showMore && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 space-y-4"
                            >
                                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                                    <h4 className="text-lg font-bold text-white mb-4">Agents you can create:</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        {[
                                            '📧 Email Sorter Agent',
                                            '📅 Calendar Manager',
                                            '💰 Finance Tracker',
                                            '🏋️ Fitness Coach',
                                            '📚 Study Buddy',
                                            '🛒 Grocery Planner',
                                            '👨‍👩‍👧 Family Scheduler',
                                            '📈 Stock Watcher',
                                        ].map((agent, i) => (
                                            <div key={i} className="bg-slate-900/50 rounded-lg p-3 text-slate-300">
                                                {agent}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter1;
