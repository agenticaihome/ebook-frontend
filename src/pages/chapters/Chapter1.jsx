import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, Sparkles, Clock, Zap, ExternalLink } from 'lucide-react';

// Lazy load Captain
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// ULTRA-MINIMAL CHAPTER 1 - TRUTHFUL VERSION
// Goal: Captain welcome + 1 honest prompt + platform links
// ============================================

// AI Platform links - direct to chat/new conversation
const AI_PLATFORMS = [
    { name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'from-green-500 to-emerald-600', free: true },
    { name: 'Claude', url: 'https://claude.ai/', color: 'from-orange-500 to-amber-600', free: true },
    { name: 'Gemini', url: 'https://gemini.google.com/', color: 'from-blue-500 to-indigo-600', free: true },
    { name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'from-cyan-500 to-blue-600', free: true },
    { name: 'Meta AI', url: 'https://www.meta.ai/', color: 'from-blue-600 to-purple-600', free: true },
];

const Chapter1 = () => {
    const [copied, setCopied] = useState(false);
    const [showMore, setShowMore] = useState(false);

    // PROMPT - ChatGPT can get live weather now
    const quickWinPrompt = `I want to simplify my mornings.

Ask me 3 quick questions about my morning routine. Then create a personalized "Morning Brief" that includes:
- Today's weather for my location
- My top 3 priorities for the day
- One thing I commonly forget

Keep it short and practical. Remember my preferences so we can do this every morning.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(quickWinPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 1: Your First AI Win | Agentic AI Home</title>
                <meta name="description" content="Get your first AI win in under 2 minutes. Captain Efficiency shows you how." />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-3xl mx-auto px-6 py-12">

                    {/* HONEST SOCIAL PROOF - Based on real data */}
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

                    {/* CAPTAIN WELCOME - First thing they see */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="lg"
                                pose="default"
                                message="Hey! I'm Captain Efficiency. In the next 2 minutes, you'll have your first useful AI conversation. No tricks, no hype—just copy the prompt below, paste it into any AI, and see what happens. Ready?"
                            />
                        </Suspense>
                    </motion.div>

                    {/* VALUE PROPS - Honest */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4 mb-10 text-sm"
                    >
                        <div className="flex items-center gap-2 text-slate-400">
                            <Clock size={16} className="text-teal-400" />
                            <span><span className="text-white font-bold">2 min</span> to try</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Zap size={16} className="text-amber-400" />
                            <span><span className="text-white font-bold">Zero</span> signup if you have an AI</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Sparkles size={16} className="text-purple-400" />
                            <span><span className="text-white font-bold">All free</span> AI tools work</span>
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
                                Step 1: Pick Your AI (all free)
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {AI_PLATFORMS.map((platform) => (
                                    <a
                                        key={platform.name}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:opacity-90 transition-opacity`}
                                    >
                                        {platform.name}
                                        <ExternalLink size={12} />
                                    </a>
                                ))}
                            </div>
                            <p className="text-slate-500 text-xs text-center mt-3">
                                Don't have an account? Any of these takes 30 seconds to sign up.
                            </p>
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
                                Step 2: Copy & Paste This Prompt
                            </h3>

                            {/* The Prompt */}
                            <div className="bg-slate-900/80 rounded-xl p-4 mb-4 border border-slate-700">
                                <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                                    {quickWinPrompt}
                                </pre>
                            </div>

                            {/* Copy Button */}
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
                                        Copied! Now paste it in your AI
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

                    {/* WHAT TO EXPECT - Honest */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8"
                    >
                        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                            <h3 className="text-lg font-bold text-white mb-3">What will happen?</h3>
                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                                    <span>The AI will ask you 3 questions about your morning</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                                    <span>You'll answer in plain English (no special format needed)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                                    <span>It creates a personalized Morning Brief template for you</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                                    <span>The AI remembers your preferences for next time</span>
                                </li>
                            </ul>

                            <div className="mt-4 p-3 bg-amber-900/20 rounded-lg border border-amber-500/30">
                                <p className="text-amber-400 text-xs">
                                    <strong>Heads up:</strong> This is just your first taste. Right now you're having a conversation.
                                    In later chapters, we'll turn this into an automated system that runs without you.
                                </p>
                            </div>
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
                            Next: Delegate a real task to AI
                        </p>
                    </motion.section>

                    {/* WANT MORE? - Collapsible */}
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
                            {showMore ? 'Hide' : 'What is "Agentic AI" anyway?'}
                        </button>

                        {showMore && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 space-y-4"
                            >
                                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                                    <h4 className="text-lg font-bold text-white mb-3">The simple version:</h4>
                                    <p className="text-slate-300 mb-4">
                                        <span className="text-teal-400 font-bold">Regular AI:</span> You ask a question, it answers. Done.
                                    </p>
                                    <p className="text-slate-300">
                                        <span className="text-orange-400 font-bold">Agentic AI:</span> It remembers your preferences, takes action on your behalf, and gets smarter the more you use it. Like a personal assistant that learns.
                                    </p>
                                </div>

                                <div className="bg-amber-900/20 rounded-xl p-4 border border-amber-500/30">
                                    <p className="text-amber-400 font-bold text-sm mb-1">Where we're heading:</p>
                                    <p className="text-slate-300 text-sm">
                                        By Chapter 16, you'll have AI handling email, calendar, reminders, and more—automatically.
                                    </p>
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
