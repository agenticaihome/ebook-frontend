import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles, Settings, Wrench, Lightbulb, HelpCircle, Zap, Eye } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 8 - CUSTOM AGENT BUILDER
// Build ANY agent you can imagine
// ============================================

// Import shared AI platforms data
import { AI_PLATFORMS } from '../../data/aiPlatforms';

const Chapter8 = () => {
    const [copied, setCopied] = useState(false);
    const [showExamples, setShowExamples] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [showExampleOutput, setShowExampleOutput] = useState(false);
    const [showFillInHelpers, setShowFillInHelpers] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `Help me create a custom AI agent.

MY AGENT IDEA:
- Problem: [WHAT FRUSTRATES ME OR TAKES TOO LONG]
- When it should run: [DAILY / WEEKLY / WHEN I ASK / SPECIFIC TIME / AFTER AN EVENT]
- Success looks like: [EXACT OUTPUT I WANT IN PLAIN ENGLISH]

CONTEXT (optional but helpful):
- Who it's for: [ME / FAMILY / TEAM]
- Tools I use: [CALENDAR, NOTES APP, EMAIL, ETC.]
- My style: [FAST + SIMPLE / DETAILED / JUST REMINDERS]
- Skill level: [BEGINNER / COMFORTABLE / ADVANCED]

YOUR JOB:
Ask me up to 3 clarifying questions only if needed.
Then produce:

A) The Agent Prompt (copy/paste ready)
Use this structure:
- ROLE: (who the agent is)
- GOAL: (what it's trying to accomplish)
- INPUTS: (what I must tell it each time, if anything)
- PROCESS: (3–5 steps it will follow)
- OUTPUT FORMAT: (exact headings or bullets)
- RULES: (keep it short, tone, boundaries)

B) Agent Name (1–3 options)
C) Make it better over time (3 upgrade ideas, simplest first)

Start by asking me for my Problem, When it should run, and what Success looks like.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        triggerDelight('copy');
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 8: Custom Agent Builder | Agentic AI Home</title>
                <meta name="description" content="Learn the framework to design any AI agent for any problem you have." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 8 of 10 • Advanced</span>
                        </div>
                    </motion.div>

                    {/* WHY THIS MATTERS */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-4">
                        <p className="text-slate-500 text-sm italic">
                            "The agent that solves YOUR unique problem? Only you can build it."
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Custom Agent Builder</span>
                        </h1>
                        <p className="text-slate-300 text-lg">Build ANY agent you can imagine.</p>
                        <p className="text-slate-400 text-sm mt-2">If you can describe the problem in one sentence, you can build an agent for it.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero size="md" pose="default" message="You've learned specific agents. Now you learn the FRAMEWORK. With this, you can solve any problem by designing your own agent from scratch." />
                        </Suspense>
                    </motion.div>

                    {/* THE FRAMEWORK */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Settings className="text-purple-400" size={20} />
                                The Agent Design Framework
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                                    <div><span className="text-white font-medium">Problem</span><p className="text-slate-300 text-sm">What specific pain point are you solving?</p></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                                    <div><span className="text-white font-medium">When</span><p className="text-slate-300 text-sm">When should this agent activate? (time, event, on request)</p></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                                    <div><span className="text-white font-medium">Output</span><p className="text-slate-300 text-sm">What specific result should you get?</p></div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">→</div>
                            <h3 className="text-white font-bold">Use this meta-prompt to design agents</h3>
                        </div>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-purple-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>
                            <button onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white'}`}>
                                {copied ? <><CheckCircle size={22} /> Copied!</> : <><Copy size={22} /> Copy These Instructions</>}
                            </button>

                            {/* See Example Output */}
                            <button
                                onClick={() => setShowExampleOutput(!showExampleOutput)}
                                className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                            >
                                <Eye size={16} />
                                {showExampleOutput ? 'Hide Example Output' : 'See What You\'ll Get'}
                                {showExampleOutput ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {showExampleOutput && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-3 bg-slate-900/80 rounded-xl p-4 border border-purple-500/20"
                                >
                                    <p className="text-purple-400 text-xs font-bold mb-2">🌱 EXAMPLE: Plant Watering Agent</p>
                                    <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-3">
                                        <p><strong className="text-white">You said:</strong> "I keep forgetting to take my vitamins"</p>
                                        <p><strong className="text-purple-300">Your AI designed:</strong></p>
                                        <div className="bg-purple-900/20 rounded-lg p-2 text-xs border border-purple-500/20">
                                            <p className="font-mono">"Be my Vitamin Reminder Agent.<br /><br />Every morning at 8am, send me a friendly reminder to take my vitamins. Ask if I took them. If I say no, remind me again at noon."</p>
                                        </div>
                                        <p className="text-slate-300">That's it! You just built a custom agent in 30 seconds.</p>
                                    </div>
                                    <p className="text-center text-slate-500 text-xs mt-3">👆 The framework works for ANY problem you have!</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.section>

                    {/* FILL-IN HELPERS */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mb-6">
                        <button
                            onClick={() => setShowFillInHelpers(!showFillInHelpers)}
                            className="w-full flex items-center justify-between py-3 px-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-500/30 text-left hover:from-purple-900/30 hover:to-pink-900/30 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-white text-sm font-medium">
                                <Sparkles size={16} className="text-purple-400" />
                                📝 See example agent designs
                            </span>
                            <ChevronDown size={16} className={`text-purple-400 transition-transform ${showFillInHelpers ? 'rotate-180' : ''}`} />
                        </button>

                        {showFillInHelpers && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-3 bg-slate-800/30 rounded-xl p-5 border border-slate-700/50 space-y-4"
                            >
                                <p className="text-slate-300 text-sm mb-3">Here's how to think through each section:</p>

                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-purple-400 text-xs font-bold mb-2 flex items-center gap-1"><Wrench size={14} /> PROBLEM EXAMPLES</p>
                                        <p className="text-slate-300 text-sm font-mono">"I forget to water my plants"</p>
                                        <p className="text-slate-300 text-sm font-mono">"I never know what to cook for dinner"</p>
                                        <p className="text-slate-300 text-sm font-mono">"I lose track of my kid's activities"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-pink-400 text-xs font-bold mb-2 flex items-center gap-1"><Settings size={14} /> WHEN EXAMPLES</p>
                                        <p className="text-slate-300 text-sm font-mono">"Every morning at 8am"</p>
                                        <p className="text-slate-300 text-sm font-mono">"When I say 'shopping time'"</p>
                                        <p className="text-slate-300 text-sm font-mono">"Every Sunday before the week starts"</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-amber-400 text-xs font-bold mb-2 flex items-center gap-1"><Lightbulb size={14} /> SUCCESS EXAMPLES</p>
                                        <p className="text-slate-300 text-sm font-mono">"A simple reminder with what to do"</p>
                                        <p className="text-slate-300 text-sm font-mono">"A list I can screenshot to the grocery store"</p>
                                        <p className="text-slate-300 text-sm font-mono">"A weekly calendar view of the family schedule"</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.section>

                    {/* EXAMPLE AGENTS */}
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
                        <button onClick={() => setShowExamples(!showExamples)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Lightbulb className="text-yellow-400" size={18} />Example agents you could build</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showExamples ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showExamples && (
                            <div className="mt-3 grid gap-3">
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">📚 Reading List Agent</p>
                                    <p className="text-slate-300 text-sm">"Track books I want to read, remind me weekly, and give me a summary of my progress."</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">🏠 Chore Agent</p>
                                    <p className="text-slate-300 text-sm">"Remind me and my spouse about household tasks. Keep score of who did what."</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">💡 Idea Capture Agent</p>
                                    <p className="text-slate-300 text-sm">"When I say 'capture this idea,' store it and give me a weekly summary of all ideas."</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">🎁 Gift Agent</p>
                                    <p className="text-slate-300 text-sm">"Track gift ideas for people when I mention them. Remind me 2 weeks before their birthday."</p>
                                </div>
                            </div>
                        )}
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
                        <button onClick={() => setShowTips(!showTips)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Zap className="text-amber-400" size={18} />Pro tips for agent design</span>
                            <ChevronDown className={`text-slate-300 transition-transform ${showTips ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTips && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">1</div><p className="text-slate-300 text-sm"><strong>Start specific:</strong> "Remind me to drink water" beats "Be my health agent."</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">2</div><p className="text-slate-300 text-sm"><strong>Define format:</strong> "Give me bullet points" or "One sentence max."</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">3</div><p className="text-slate-300 text-sm"><strong>Iterate fast:</strong> Test, tweak, repeat. Your first version won't be perfect.</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">4</div><p className="text-slate-300 text-sm"><strong>Fix vagueness:</strong> If your agent feels "meh," make the output more specific. Vagueness is the #1 reason agents disappoint.</p></div>
                            </div>
                        )}
                    </motion.section>

                    {/* AGENT COUNT */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.63 }} className="mb-6">
                        <div className="bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-amber-900/30 rounded-xl p-4 border border-purple-500/30">
                            <p className="text-white font-bold text-sm mb-1">🎯 Your Agent Squad: 8 <span className="text-slate-400 font-normal">down. 2 to go.</span></p>
                            <p className="text-slate-300 text-sm">Morning + Meal + Dates + Email + Money + Fitness + Work + Custom Builder</p>
                        </div>
                    </motion.section>

                    {/* SHARE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mb-6">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/30 rounded-xl" />}>
                            <ShareToX chapterNumber={8} />
                        </Suspense>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/30 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mb-4"><CheckCircle size={16} />Chapter 8 Complete!</div>
                            <h3 className="text-white font-bold text-xl mb-2">Ready to make agents work together?</h3>
                            <p className="text-slate-300 text-sm mb-4">Learn multi-agent coordination.</p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <Link to="/part3/chapter1" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">
                                    ← Back to Chapter 7
                                </Link>
                                <Link to="/part3/chapter3" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold rounded-xl transition-all">🎉 So close! On to Chapter 9<ArrowRight size={18} /></Link>
                            </div>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter8;
