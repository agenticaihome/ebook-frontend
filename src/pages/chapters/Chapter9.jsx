import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles, Users, MessageSquare, GitBranch, HelpCircle, Zap, Eye } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 9 - MULTI-AGENT COORDINATION
// Making your agents work together
// ============================================

// Import shared AI platforms data
import { AI_PLATFORMS } from '../../data/aiPlatforms';

const Chapter9 = () => {
    const [copied, setCopied] = useState(false);
    const [showExamples, setShowExamples] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [showExampleOutput, setShowExampleOutput] = useState(false);
    const [showFillInHelpers, setShowFillInHelpers] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `Be my Hub Agent - the "control center" for all my other AI agents.

MY CURRENT AGENTS:
- [LIST THE AGENTS YOU'VE SET UP, e.g.:
  - Meal Planning Agent (runs Sundays)
  - Email Triage Agent (runs mornings)
  - Work Task Agent (runs mornings)
  - Money Check-In Agent (runs Sundays)]

HOW I WANT THEM CONNECTED:
- Daily briefing time: [MORNING / EVENING / SPECIFIC TIME]
- Weekly review day: [SUNDAY / SATURDAY / OTHER]
- Format I prefer: [QUICK BULLETS / DETAILED / JUST FLAGS + ALERTS]

YOUR JOB:
1. Collect outputs from my other agents
2. Give me ONE unified view (no jumping between chats)
3. Flag conflicts or things that need my attention
4. Keep it under 60 seconds to read

Right now, help me set up my agent hub.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        triggerDelight('copy');
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 9: Multi-Agent Coordination | Agentic AI Home</title>
                <meta name="description" content="Learn how to make your AI agents work together as a unified team." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 9 of 10 • Advanced</span>
                        </div>
                    </motion.div>

                    {/* WHY THIS MATTERS */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-4">
                        <p className="text-slate-500 text-sm italic">
                            "One agent helps. Multiple agents working together? That's a system."
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Multi-Agent Coordination</span>
                        </h1>
                        <p className="text-slate-300 text-lg">Make your agents work as a team.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero size="md" pose="default" message="Individual agents are powerful. But agents that TALK to each other? That's when you become a true AI commander. Let's connect the dots." />
                        </Suspense>
                    </motion.div>

                    {/* THE CONCEPT */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/30">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <GitBranch className="text-cyan-400" size={20} />
                                How Multi-Agent Works
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                                    <div><span className="text-white font-medium">Hub Agent</span><p className="text-slate-300 text-sm">One "master" agent that collects info from the others</p></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                                    <div><span className="text-white font-medium">Feed it outputs</span><p className="text-slate-300 text-sm">Copy outputs from your other agents into the hub</p></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                                    <div><span className="text-white font-medium">Unified summary</span><p className="text-slate-300 text-sm">Get one integrated view of your entire AI system</p></div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">→</div>
                            <h3 className="text-white font-bold">Start with this coordination prompt</h3>
                        </div>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-cyan-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>
                            <button onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white'}`}>
                                {copied ? <><CheckCircle size={22} /> Copied!</> : <><Copy size={22} /> Copy These Instructions</>}
                            </button>

                            {/* See Example Output */}
                            <button
                                onClick={() => setShowExampleOutput(!showExampleOutput)}
                                className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                            >
                                <Eye size={16} />
                                {showExampleOutput ? 'Hide Example Output' : 'See What You\'ll Get'}
                                {showExampleOutput ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {showExampleOutput && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-3 bg-slate-900/80 rounded-xl p-4 border border-cyan-500/20"
                                >
                                    <p className="text-cyan-400 text-xs font-bold mb-2">📊 EXAMPLE UNIFIED MORNING BRIEFING:</p>
                                    <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-3">
                                        <p>☕ <strong className="text-white">Good morning! Here's your 60-second summary:</strong></p>
                                        <p>📅 <strong className="text-cyan-300">Calendar:</strong> 2 meetings today (10am standup, 3pm client call)</p>
                                        <p>📧 <strong className="text-cyan-300">Emails:</strong> 3 need replies today - boss asked about project timeline</p>
                                        <p>🎯 <strong className="text-cyan-300">Priority:</strong> Finish proposal before 3pm call</p>
                                        <p>☀️ <strong className="text-cyan-300">Weather:</strong> 68°F, sunny - good walking weather for lunch</p>
                                        <p>💰 <strong className="text-cyan-300">Money note:</strong> Rent auto-pays tomorrow, all good!</p>
                                    </div>
                                    <p className="text-center text-slate-500 text-xs mt-3">👆 All your agents working together in one view!</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.section>

                    {/* FILL-IN HELPERS */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mb-6">
                        <button
                            onClick={() => setShowFillInHelpers(!showFillInHelpers)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl border border-cyan-500/30 text-left hover:from-cyan-900/30 hover:to-blue-900/30 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-white text-sm font-medium">
                                <Sparkles size={16} className="text-cyan-400" />
                                📝 How to set up your agent hub
                            </span>
                            <ChevronDown size={16} className={`text-cyan-400 transition-transform ${showFillInHelpers ? 'rotate-180' : ''}`} />
                        </button>

                        {showFillInHelpers && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 space-y-4"
                            >
                                <p className="text-slate-300 text-sm mb-3">Example setup for your hub agent:</p>

                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-cyan-400 text-xs font-bold mb-2 flex items-center gap-1"><Users size={14} /> YOUR AGENT LIST</p>
                                        <p className="text-slate-300 text-sm font-mono">"I have 4 agents: Meal Planning (Sundays), Email Triage (mornings), Work Tasks (mornings), Money Check (Sundays)"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-blue-400 text-xs font-bold mb-2 flex items-center gap-1"><GitBranch size={14} /> CONNECTION STYLE</p>
                                        <p className="text-slate-300 text-sm font-mono">"Daily briefing at 7am, weekly review on Sunday evenings"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Quick bullets format - I want to read it in 60 seconds"</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* EXAMPLE WORKFLOWS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
                        <button onClick={() => setShowExamples(!showExamples)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><MessageSquare className="text-cyan-400" size={18} />Example coordination workflows</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showExamples ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showExamples && (
                            <div className="mt-3 grid gap-3">
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">🌅 Morning Dashboard</p>
                                    <p className="text-slate-300 text-sm">"Combine my calendar, email triage, and weather into one morning briefing. Show me in 60 seconds what matters today."</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">📊 Weekly Review</p>
                                    <p className="text-slate-300 text-sm">"Take my money check, fitness progress, and work accomplishments. Give me a weekly scorecard every Sunday."</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">🏠 Family Sync</p>
                                    <p className="text-slate-300 text-sm">"Combine everyone's calendars, meal plan, and chore assignments into one family dashboard for the week."</p>
                                </div>
                            </div>
                        )}
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
                        <button onClick={() => setShowTips(!showTips)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Zap className="text-amber-400" size={18} />Pro coordination tips</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showTips ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTips && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">1</div><p className="text-slate-300 text-sm"><strong>Use consistent formatting:</strong> Each agent's output should follow a template so the hub can parse it.</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">2</div><p className="text-slate-300 text-sm"><strong>Prioritize conflicts:</strong> "If email says urgent but calendar is booked, flag it for me to decide."</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">3</div><p className="text-slate-300 text-sm"><strong>Start small:</strong> Coordinate 2 agents first, then add more as you get comfortable.</p></div>
                            </div>
                        )}
                    </motion.section>

                    {/* SHARE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mb-6">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/30 rounded-xl" />}>
                            <ShareToX chapterNumber={9} />
                        </Suspense>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-6 border border-cyan-500/30 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mb-4"><CheckCircle size={16} />Chapter 9 Complete!</div>
                            <h3 className="text-white font-bold text-xl mb-2">Ready to build your complete system?</h3>
                            <p className="text-slate-300 text-sm mb-4">The final chapter: Your Agent Army.</p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <Link to="/part3/chapter2" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">
                                    ← Back to Chapter 8
                                </Link>
                                <Link to="/part4/chapter1" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all">🎉 Final chapter! Let's finish this<ArrowRight size={18} /></Link>
                            </div>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter9;
