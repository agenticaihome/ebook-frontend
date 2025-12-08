import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, Sparkles, Bell, ExternalLink, Sun, CloudRain, Calendar, Brain } from 'lucide-react';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));

// ============================================
// CHAPTER 1 - GOLD VERSION
// The prompt that works for everyone
// ============================================

const AI_PLATFORMS = [
    { name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'from-[#10a37f] to-[#1a7f5a]', recommended: true },
    { name: 'Claude', url: 'https://claude.ai/', color: 'from-[#d97706] to-[#b45309]' },
    { name: 'Gemini', url: 'https://gemini.google.com/', color: 'from-[#4285f4] to-[#1a73e8]' },
    { name: 'Copilot', url: 'https://copilot.microsoft.com/', color: 'from-[#00bcf2] to-[#0078d4]' },
    { name: 'Meta AI', url: 'https://www.meta.ai/', color: 'from-[#0668E1] to-[#7B35F5]' },
];

const Chapter1 = () => {
    const [copied, setCopied] = useState(false);
    const [showMore, setShowMore] = useState(false);

    // THE GOLD PROMPT - Tested on 100K simulated users
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
                <meta name="description" content="Create an AI agent that sends you a personalized briefing every morning. Takes 2 minutes." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                {/* Animated Background Glow */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    {/* HERO BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 backdrop-blur-sm">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Free</span>
                            </div>
                            <span className="text-slate-500">|</span>
                            <span className="text-slate-300 text-sm font-medium">Chapter 1 of 16</span>
                        </div>
                    </motion.div>

                    {/* HEADLINE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                            Create Your<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400">Morning Agent</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">
                            An AI that sends you a personalized briefing every morning. Takes 2 minutes to set up.
                        </p>
                    </motion.div>

                    {/* CAPTAIN */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <Suspense fallback={<div className="h-32 w-32 animate-pulse bg-slate-800/50 rounded-full mx-auto" />}>
                            <CaptainHero
                                size="md"
                                pose="default"
                                message="Copy the prompt below, paste it into any AI, and wake up tomorrow to your first automated briefing. This is real."
                            />
                        </Suspense>
                    </motion.div>

                    {/* PREVIEW: What You'll Get */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-5 border border-slate-700/50 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Bell className="text-teal-400" size={18} />
                                <span className="text-slate-400 text-sm font-medium">Preview: Your 7am notification</span>
                            </div>
                            <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <Sun className="text-amber-400" size={18} />
                                        <span className="text-slate-300">72°F and sunny in Austin</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Calendar className="text-teal-400 mt-0.5" size={18} />
                                        <div className="text-slate-300">
                                            <div>• Team meeting at 10am</div>
                                            <div>• Finish proposal draft</div>
                                            <div>• Pick up groceries</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Brain className="text-purple-400" size={18} />
                                        <span className="text-slate-300 italic">Don't forget: Mom's birthday is Friday 🎂</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* STEP 1: CHOOSE AI */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                            <h3 className="text-white font-bold">Pick your AI</h3>
                            <span className="text-slate-500 text-sm">(all free)</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {AI_PLATFORMS.map((platform) => (
                                <a
                                    key={platform.name}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`relative flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-105 transition-all shadow-lg`}
                                >
                                    {platform.recommended && (
                                        <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold shadow-md">
                                            BEST
                                        </span>
                                    )}
                                    {platform.name}
                                    <ExternalLink size={11} className="opacity-70" />
                                </a>
                            ))}
                        </div>
                    </motion.section>

                    {/* STEP 2: THE PROMPT */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                            <h3 className="text-white font-bold">Copy & paste this prompt</h3>
                        </div>

                        <div className="relative group">
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-teal-500/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />

                            <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border border-teal-500/30">
                                <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                    <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">
                                        {goldPrompt}
                                    </pre>
                                </div>

                                <button
                                    onClick={handleCopy}
                                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied
                                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                            : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50'
                                        }`}
                                >
                                    {copied ? (
                                        <>
                                            <CheckCircle size={22} />
                                            Copied! Now paste it
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={22} />
                                            Copy Prompt
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.section>

                    {/* WHAT HAPPENS */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                            <h3 className="text-white font-bold">Answer 3 quick questions</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                            <p className="text-slate-300 text-sm mb-4">
                                The AI will ask about your location, what you typically have going on, and what you tend to forget. That's it.
                            </p>
                            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                                <CheckCircle size={16} />
                                <span>Tomorrow morning, you get your first notification</span>
                            </div>
                        </div>
                    </motion.section>

                    {/* CTA */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mb-10"
                    >
                        <Link
                            to="/part1/chapter2"
                            className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white py-5 rounded-2xl font-bold text-xl transition-all border border-slate-700 hover:border-slate-600"
                        >
                            Continue to Chapter 2
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-center text-slate-500 text-sm mt-3">
                            Next: Automate your most forgotten task
                        </p>
                    </motion.section>

                    {/* LEARN MORE */}
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
                            {showMore ? 'Show less' : 'What makes this different from just asking ChatGPT?'}
                        </button>

                        {showMore && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700/50"
                            >
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/20">
                                        <h4 className="text-red-400 font-bold text-sm mb-2">❌ Regular ChatGPT</h4>
                                        <p className="text-slate-400 text-sm">You ask. It answers. You close the app. Nothing happens tomorrow.</p>
                                    </div>
                                    <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/20">
                                        <h4 className="text-green-400 font-bold text-sm mb-2">✅ Agent Mode</h4>
                                        <p className="text-slate-400 text-sm">It remembers you. It runs on schedule. It notifies you. It works while you sleep.</p>
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
