import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import WebbookLayout from '../../components/layout/WebbookLayout';
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, CheckCircle, ChevronDown, ChevronUp, Sparkles, Briefcase, Target, ListTodo, HelpCircle, Zap, Eye } from 'lucide-react';
import { useImmersion } from '../../hooks/useImmersion';

const CaptainHero = React.lazy(() => import('../../components/CaptainHero'));
const ShareToX = React.lazy(() => import('../../components/common/ShareToX'));

// ============================================
// CHAPTER 7 - WORK TASK AGENT
// Prioritize what actually matters
// ============================================

// Import shared AI platforms data
import { AI_PLATFORMS } from '../../data/aiPlatforms';

const Chapter7 = () => {
    const [copied, setCopied] = useState(false);
    const [showTroubleshooting, setShowTroubleshooting] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [showExampleOutput, setShowExampleOutput] = useState(false);
    const { triggerDelight } = useImmersion();

    const goldPrompt = `Be my Work Task Agent.

Every morning, help me plan my workday:
1. Ask what's on my plate today
2. Help me pick the ONE thing that matters most
3. Block out distractions and nice-to-haves

Be ruthless about priorities. Less is more.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(goldPrompt);
        setCopied(true);
        triggerDelight('copy');
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <WebbookLayout>
            <Helmet>
                <title>Chapter 7: Work Task Agent | Agentic AI Home</title>
                <meta name="description" content="An AI that helps you ruthlessly prioritize work tasks and focus on what matters." />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12]">
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative max-w-3xl mx-auto px-6 py-10">

                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-slate-300 text-sm font-medium">Chapter 7 of 10 • Premium</span>
                        </div>
                    </motion.div>

                    {/* WHY THIS MATTERS */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-4">
                        <p className="text-slate-500 text-sm italic">
                            "Busy isn't the same as impactful. Choose what matters."
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Work Task Agent</span>
                        </h1>
                        <p className="text-slate-400 text-lg">Stop doing everything. Start doing what matters.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-8">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/50 rounded-xl" />}>
                            <CaptainHero size="md" pose="default" message="Most people have 47 things on their to-do list and finish 3. This agent forces you to pick ONE thing that actually moves the needle." />
                        </Suspense>
                    </motion.div>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                            <h3 className="text-white font-bold">Open your AI</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {AI_PLATFORMS.map((platform) => (
                                    <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer"
                                        className={`relative flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-gradient-to-r ${platform.color} text-white font-bold text-sm hover:scale-[1.02] transition-all`}>
                                        {platform.recommended && <span className="absolute -top-2 -right-1 bg-amber-400 text-black text-[10px] px-2 py-0.5 rounded-full font-bold">POPULAR</span>}
                                        {platform.logo}<span>{platform.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                            <h3 className="text-white font-bold">Copy These Instructions</h3>
                        </div>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-5 border border-amber-500/30">
                            <div className="bg-slate-950 rounded-xl p-4 mb-4 border border-slate-800 font-mono">
                                <pre className="text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">{goldPrompt}</pre>
                            </div>
                            <button onClick={handleCopy}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white'}`}>
                                {copied ? <><CheckCircle size={22} /> Copied!</> : <><Copy size={22} /> Copy These Instructions</>}
                            </button>

                            {/* See Example Output */}
                            <button
                                onClick={() => setShowExampleOutput(!showExampleOutput)}
                                className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
                            >
                                <Eye size={16} />
                                {showExampleOutput ? 'Hide Example Output' : 'See What You\'ll Get'}
                                {showExampleOutput ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {showExampleOutput && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-3 bg-slate-900/80 rounded-xl p-4 border border-amber-500/20"
                                >
                                    <p className="text-amber-400 text-xs font-bold mb-2">🎯 EXAMPLE DAILY PRIORITIZATION:</p>
                                    <div className="bg-black/40 rounded-lg p-3 text-sm text-slate-300 space-y-3">
                                        <p>🎯 <strong className="text-white">Your ONE Thing Today:</strong><br />Finish the client proposal (due tomorrow) - this moves the needle most.</p>
                                        <p>⌛ <strong className="text-white">If Time Permits:</strong><br />• Reply to Sarah's email<br />• Review team slides</p>
                                        <p>🚫 <strong className="text-white">Move to Tomorrow:</strong><br />• Organize files (not urgent)<br />• Research new tools (nice-to-have)</p>
                                        <p>💭 <strong className="text-white">Reality Check:</strong><br />"You listed 12 tasks. That's 12 hours of work. You have 4 hours. I picked the ONE that matters."</p>
                                    </div>
                                    <p className="text-center text-slate-500 text-xs mt-3">👆 Clarity in 60 seconds. No more overwhelm.</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                            <h3 className="text-white font-bold">Do your daily brain dump</h3>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                            <p className="text-slate-300 text-sm">Every morning, dump everything in your head: meetings, emails to send, projects, random tasks. Let your AI sort the chaos.</p>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-8">
                        <div className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-2xl p-6 border border-amber-500/20">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Sparkles className="text-amber-400" size={20} />What you'll get</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3"><CheckCircle className="text-green-400 mt-0.5" size={18} /><div><span className="text-white font-medium">Your ONE thing</span><p className="text-slate-400 text-sm">The single task that matters most today</p></div></div>
                                <div className="flex items-start gap-3"><CheckCircle className="text-green-400 mt-0.5" size={18} /><div><span className="text-white font-medium">Distraction filter</span><p className="text-slate-400 text-sm">Your AI will push back on time-wasters</p></div></div>
                                <div className="flex items-start gap-3"><CheckCircle className="text-green-400 mt-0.5" size={18} /><div><span className="text-white font-medium">End-of-day review</span><p className="text-slate-400 text-sm">Did you do the thing? What blocked you?</p></div></div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mb-8">
                        <button onClick={() => setShowTips(!showTips)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><Zap className="text-amber-400" size={18} />Make it even better</span>
                            <ChevronDown className={`text-slate-400 transition-transform ${showTips ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTips && (
                            <div className="mt-3 p-4 bg-slate-800/20 rounded-xl border border-slate-700/30 space-y-3">
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">1</div><p className="text-slate-300 text-sm"><strong>Set your big goal:</strong> "I'm trying to launch my project by Friday. Filter tasks through that lens."</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">2</div><p className="text-slate-300 text-sm"><strong>Time block:</strong> "I have 4 hours of deep work time today. What fits?"</p></div>
                                <div className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">3</div><p className="text-slate-300 text-sm"><strong>Challenge yourself:</strong> Ask "What would happen if I didn't do this task at all?"</p></div>
                            </div>
                        )}
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mb-8">
                        <button onClick={() => setShowTroubleshooting(!showTroubleshooting)} className="w-full flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2"><HelpCircle className="text-slate-400" size={18} />Troubleshooting</span>
                            <ChevronDown className={`text-slate-400 transition-transform ${showTroubleshooting ? 'rotate-180' : ''}`} size={20} />
                        </button>
                        {showTroubleshooting && (
                            <div className="mt-3 space-y-3">
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"Everything feels urgent"</p>
                                    <p className="text-slate-400 text-sm">Tell your AI: "If I could only do ONE thing today and nothing else, which task would have the biggest impact in a week?"</p>
                                </div>
                                <div className="p-4 bg-slate-800/20 rounded-xl border border-slate-700/30">
                                    <p className="text-white font-medium text-sm mb-1">"I have too many meetings"</p>
                                    <p className="text-slate-400 text-sm">Ask: "Which of these meetings could be an email? Draft a message declining the non-essential ones."</p>
                                </div>
                            </div>
                        )}
                    </motion.section>

                    {/* SHARE */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }} className="mb-6">
                        <Suspense fallback={<div className="h-24 animate-pulse bg-slate-800/30 rounded-xl" />}>
                            <ShareToX chapterNumber={7} />
                        </Suspense>
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
                        <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-2xl p-6 border border-amber-500/30 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-bold text-sm mb-4"><CheckCircle size={16} />Chapter 7 Complete!</div>
                            <h3 className="text-white font-bold text-xl mb-2">Ready to build ANY agent you want?</h3>
                            <p className="text-slate-400 text-sm mb-4">Learn the Custom Agent Builder framework.</p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <Link to="/part2/chapter3" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">
                                    ← Back to Chapter 6
                                </Link>
                                <Link to="/part3/chapter2" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold rounded-xl transition-all">🎉 Amazing! On to Chapter 8<ArrowRight size={18} /></Link>
                            </div>
                        </div>
                    </motion.section>

                </div>
            </div>
        </WebbookLayout>
    );
};

export default Chapter7;
