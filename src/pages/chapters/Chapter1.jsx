import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, Sparkles, Clock, Zap } from 'lucide-react';

// Lazy load Captain
const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// ULTRA-MINIMAL CHAPTER 1 - MASS ADOPTION VERSION
// Goal: Captain welcome + 1 prompt + 1 button
// Time to first win: 30 seconds
// ============================================

const Chapter1 = () => {
    const [copied, setCopied] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const quickWinPrompt = `I want to save time every morning. 

Ask me 3 quick questions about my morning routine, then create a simple "Morning Brief" that tells me:
- Weather for my location
- My top 3 priorities today  
- One thing I might forget

Keep it under 100 words.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(quickWinPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 1: Your First AI Win | Agentic AI Home</title>
                <meta name="description" content="Get your first AI win in under 2 minutes. Captain Efficiency shows you how." />
            </Helmet>

            <div className="min-h-screen bg-[#0f0f1a]">
                <div className="max-w-3xl mx-auto px-6 py-12">

                    {/* LIVE READER COUNT - Social proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-green-400 text-sm font-medium">
                                <span className="font-bold">23 others</span> reading Chapter 1 right now
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
                                message="Hey! You made it. I'm Captain Efficiency. In the next 2 minutes, I'm going to give you something actually useful—not theory, not stats. A real win. Ready?"
                            />
                        </Suspense>
                    </motion.div>

                    {/* VALUE PROPS - Quick reassurance */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4 mb-10 text-sm"
                    >
                        <div className="flex items-center gap-2 text-slate-400">
                            <Clock size={16} className="text-teal-400" />
                            <span><span className="text-white font-bold">2 min</span> to first win</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Zap size={16} className="text-amber-400" />
                            <span><span className="text-white font-bold">Zero</span> setup</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Sparkles size={16} className="text-purple-400" />
                            <span><span className="text-white font-bold">Free</span> tools only</span>
                        </div>
                    </motion.div>

                    {/* THE QUICK WIN - One prompt to try */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-10"
                    >
                        <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/20 rounded-2xl p-6 md:p-8 border-2 border-teal-500/50">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">
                                    YOUR FIRST WIN
                                </div>
                                <span className="text-slate-400 text-sm">Copy → Paste → Done</span>
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                                Try this in ChatGPT or Claude right now:
                            </h2>

                            {/* The Prompt */}
                            <div className="bg-slate-900/80 rounded-xl p-4 mb-4 border border-slate-700">
                                <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono">
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
                                        Copied! Now paste it in ChatGPT
                                    </>
                                ) : (
                                    <>
                                        <Copy size={20} />
                                        Copy This Prompt
                                    </>
                                )}
                            </button>

                            {/* Quick links to AI tools */}
                            <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm">
                                <span className="text-slate-500">Don't have an account?</span>
                                <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                                    ChatGPT (free) →
                                </a>
                                <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                                    Claude (free) →
                                </a>
                            </div>
                        </div>
                    </motion.section>

                    {/* WHAT JUST HAPPENED - Quick explanation */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-10"
                    >
                        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                            <h3 className="text-lg font-bold text-white mb-3">What just happened?</h3>
                            <p className="text-slate-300 mb-4">
                                You just created your first <span className="text-teal-400 font-bold">AI agent</span>.
                                It's not just answering questions—it's learning YOUR routine and working FOR you.
                            </p>
                            <p className="text-slate-400 text-sm">
                                That's the difference between a chatbot and an agent. Chatbots wait. <span className="text-white">Agents work.</span>
                            </p>
                        </div>
                    </motion.section>

                    {/* NEXT CHAPTER CTA - Big and obvious */}
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
                            Next: Build a real agent that runs automatically
                        </p>
                    </motion.section>

                    {/* WANT MORE? - Collapsible deep dive */}
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
                            {showMore ? 'Hide details' : 'Want to learn more about AI agents?'}
                        </button>

                        {showMore && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 space-y-6"
                            >
                                {/* What is Agentic AI */}
                                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                                    <h4 className="text-lg font-bold text-white mb-3">What is "Agentic AI"?</h4>
                                    <p className="text-slate-300 mb-4">
                                        <span className="text-teal-400 font-bold">"Agentic"</span> = AI that <span className="text-orange-400 font-bold">DOES things</span>, not just says things.
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        Think personal assistant, not search engine. Agentic AI can plan, execute, and adapt tasks on your behalf.
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                        <div className="text-2xl font-bold text-teal-400">$48B</div>
                                        <div className="text-xs text-slate-400">Agentic AI market by 2030</div>
                                    </div>
                                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                        <div className="text-2xl font-bold text-orange-400">51%</div>
                                        <div className="text-xs text-slate-400">Professionals using AI agents</div>
                                    </div>
                                </div>

                                {/* Key insight */}
                                <div className="bg-amber-900/20 rounded-xl p-4 border border-amber-500/30">
                                    <p className="text-amber-400 font-bold text-sm mb-1">The Shift:</p>
                                    <p className="text-slate-300">
                                        Chatbots answer questions. <span className="text-teal-400 font-bold">Agents eliminate the need to ask.</span>
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
